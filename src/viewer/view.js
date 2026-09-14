/**
 * Image Annotator Public Frontend JS
 * Handles Instagram-style smooth sliding carousel, desktop click-and-drag hand gesture swiping,
 * exact database ID badge extraction (arwai-annotation-id), instant OSD save REST API sync,
 * card list re-fetching on modal close, local viewer timezone timestamps, & author full name toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ArwaiAziViewerConfig === 'undefined') {
        return;
    }

    const { rest_url, nonce, osd_options, card_styles, tag_colors, user_can_edit } = ArwaiAziViewerConfig;

    // Build Tag-to-Color map
    const tagColorMap = {};
    if (Array.isArray(tag_colors)) {
        tag_colors.forEach(rule => {
            if (rule.tag) {
                tagColorMap[rule.tag.toLowerCase().trim()] = rule;
            }
        });
    }

    // Global In-Memory Cache for Attachment Annotations (Key: attachmentId, Value: Array)
    const annotationCache = new Map();

    function fetchAnnotationsForAttachment(attachmentId, forceRefresh = false) {
        if (!attachmentId) return Promise.resolve([]);
        const cacheKey = String(attachmentId);

        if (!forceRefresh && annotationCache.has(cacheKey)) {
            return Promise.resolve(annotationCache.get(cacheKey));
        }

        return fetch(`${rest_url}annotations/attachment/${attachmentId}`)
            .then(res => res.json())
            .then(data => {
                const list = Array.isArray(data) ? data : [];
                list.forEach((item, idx) => {
                    if (!item.db_id) item._index = idx + 1;
                });
                annotationCache.set(cacheKey, list);
                return list;
            })
            .catch(err => {
                console.error('Error loading annotations for attachment:', attachmentId, err);
                return [];
            });
    }

    // --- Username Click-to-Toggle Full Name & Parentheses Helper ---
    document.addEventListener('click', (e) => {
        // Do not deselect anything if click occurred inside OSD modal or Annotorious elements
        if (
            e.target.closest('.arwai-aziv-osd-modal') ||
            e.target.closest('.r6o-editor') ||
            e.target.closest('.r6o-widget') ||
            e.target.closest('.r6o-comment-dropdown-menu') ||
            e.target.closest('.r6o-popup-menu') ||
            e.target.closest('.r6o-btn') ||
            e.target.closest('.openseadragon-container') ||
            e.target.closest('.a9s-annotation')
        ) {
            // Check username toggle inside OSD modal or widgets if clicked
            const target = e.target.closest('.arwai-aziv-user-name');
            if (target) {
                const display = target.getAttribute('data-display') || target.textContent;
                const login = target.getAttribute('data-login');
                const fullname = target.getAttribute('data-fullname');
                const currentText = target.textContent;
                if (fullname && fullname !== display && currentText === display) {
                    target.textContent = `${display} (${fullname})`;
                } else if (login && login !== display && !currentText.includes(`(${login})`)) {
                    target.textContent = `${display} (${login})`;
                } else {
                    target.textContent = display;
                }
            }
            return;
        }

        // Deselect card and annotation if clicking outside cards and viewers
        if (!e.target.closest('.arwai-aziv-annotation-card-item') && !e.target.closest('.arwai-aziv-frontend-wrap')) {
            document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
            window.dispatchEvent(new CustomEvent('image-annotator:cancel-selected'));
        }

        const target = e.target.closest('.arwai-aziv-user-name');
        if (target) {
            const display = target.getAttribute('data-display') || target.textContent;
            const login = target.getAttribute('data-login');
            const fullname = target.getAttribute('data-fullname');

            const currentText = target.textContent;

            if (fullname && fullname !== display && currentText === display) {
                target.textContent = `${display} (${fullname})`;
            } else if (login && login !== display && !currentText.includes(`(${login})`)) {
                target.textContent = `${display} (${login})`;
            } else {
                target.textContent = display;
            }
        }
    });



    // --- History Widget for Annotorious Popup ---
    const PopupHistoryWidget = (args) => {
        let annotationId = null;
        if (args.annotation) {
            annotationId = args.annotation.id || args.annotation['@id'] || null;
            if (!annotationId && Array.isArray(args.annotation.body)) {
                const idBody = args.annotation.body.find(b => b.purpose === 'arwai-annotation-id' || b.purpose === 'arwai-AnnotationID' || b.purpose === 'arwai-azi-viewer-ID');
                if (idBody && idBody.value) {
                    annotationId = idBody.value;
                }
            }
            if (!annotationId && args.annotation.db_id) {
                annotationId = args.annotation.db_id;
            }
        }

        const container = document.createElement('div');
        container.className = 'r6o-widget arwai-aziv-popup-history-widget';
        container.addEventListener('click', (e) => e.stopPropagation());
        container.addEventListener('mousedown', (e) => e.stopPropagation());

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'r6o-btn arwai-aziv-history-toggle-btn';
        button.innerHTML = '<span>🕒 View History</span>';
        button.style.cssText = 'width: 100%; text-align: left; background: #ffffff; color: #334155; border-top: 1px solid #e2e8f0; border-bottom: none; border-left: none; border-right: none; padding: 10px 14px; font-size: 13px; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 6px;';

        const historyBox = document.createElement('div');
        historyBox.className = 'arwai-aziv-history-box';
        historyBox.style.cssText = 'display: none; padding: 14px; background: #ffffff; border-top: 1px solid #e2e8f0; max-height: 160px; overflow-y: auto; font-size: 12px; color: #334155;';

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (historyBox.style.display === 'block') {
                historyBox.style.display = 'none';
                button.innerHTML = '<span>🕒 View History</span>';
                return;
            }

            historyBox.style.display = 'block';
            button.innerHTML = '<span>^ Hide History</span>';

            if (!annotationId) {
                historyBox.innerHTML = '<div style="color: #94a3b8; text-align: center;">No history record found (unsaved draft).</div>';
                return;
            }

            historyBox.innerHTML = '<div style="text-align:center; padding: 8px; color: #64748b;">Loading history...</div>';

            fetch(`${rest_url}annotations/history/${encodeURIComponent(annotationId)}`)
                .then(res => res.json())
                .then(data => {
                    if (data && Array.isArray(data.history) && data.history.length > 0) {
                        let html = '';
                        data.history.forEach(item => {
                            const dateStr = new Date(item.timestamp).toLocaleString();
                            const userName = item.user_name || 'arwai';
                            const userLogin = item.user_login || userName;
                            const fullName = item.full_name || userName;
                            const diffText = item.action_type || 'Updated annotation';

                            html += `
                                <div style="margin-bottom: 12px; text-align: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
                                    <strong class="arwai-aziv-user-name" data-display="${escapeHTML(userName)}" data-login="${escapeHTML(userLogin)}" data-fullname="${escapeHTML(fullName)}" style="color: #0073aa; cursor: pointer; font-size: 13px;">${escapeHTML(userName)}</strong>
                                    <div style="color: #94a3b8; font-size: 11px; margin-top: 2px;">${dateStr}</div>
                                    <div style="margin-top: 4px; color: #1e293b; font-weight: 500;">${escapeHTML(diffText)}</div>
                                </div>
                            `;
                        });
                        historyBox.innerHTML = html;
                    } else {
                        historyBox.innerHTML = '<div style="color: #94a3b8; text-align: center;">No history record found.</div>';
                    }
                })
                .catch(() => {
                    historyBox.innerHTML = '<div style="color: #ef4444; text-align: center;">Error loading history.</div>';
                });
        });

        container.appendChild(button);
        container.appendChild(historyBox);
        return container;
    };

    // --- Main Frontend Viewers Instantiation ---
    const wraps = document.querySelectorAll('.arwai-aziv-frontend-wrap');
    wraps.forEach(wrap => initFrontendViewer(wrap));

    function initFrontendViewer(wrap) {
        // --- Circular ID Badge Formatter (Extracts arwai-annotation-id / arwai-AnnotationID) ---
        const idBadgeAndColorFormatter = (annotation) => {
            let badgeNum = annotation.db_id || annotation._index || 1;
            let matchedTagColor = null;

            if (Array.isArray(annotation.body)) {
                const idBody = annotation.body.find(b => b.purpose === 'arwai-annotation-id' || b.purpose === 'arwai-AnnotationID' || b.purpose === 'arwai-azi-viewer-ID');
                if (idBody && idBody.value) {
                    badgeNum = idBody.value;
                }

                annotation.body.forEach(b => {
                    if (b.purpose === 'tagging' && b.value) {
                        const tagLower = b.value.toLowerCase().trim();
                        if (tagColorMap[tagLower]) {
                            matchedTagColor = tagColorMap[tagLower];
                        }
                    }
                });
            }

            const getOverride = (attr, defaultVal) => wrap.hasAttribute(attr) && wrap.getAttribute(attr) !== '' ? wrap.getAttribute(attr) : defaultVal;

            const fillColor = matchedTagColor && matchedTagColor.fill_color ? matchedTagColor.fill_color : getOverride('data-override-default-fill-color', card_styles.default_fill_color || 'rgba(0,0,0,0.2)');
            const borderColor = matchedTagColor && matchedTagColor.border_color ? matchedTagColor.border_color : getOverride('data-override-default-border-color', card_styles.default_border_color || card_styles.badge_bg || '#2563eb');
            const badgeBg = matchedTagColor && matchedTagColor.badge_bg ? matchedTagColor.badge_bg : getOverride('data-override-badge-bg', card_styles.badge_bg || '#2563eb');
            const badgeTextCol = (matchedTagColor && matchedTagColor.badge_text_color) ? matchedTagColor.badge_text_color : getOverride('data-override-badge-text-color', card_styles.badge_text_color || '#ffffff');

            const hoverFill = matchedTagColor && matchedTagColor.hover_fill_color ? matchedTagColor.hover_fill_color : getOverride('data-override-hover-fill-color', card_styles.default_hover_fill_color || 'rgba(0,0,0,0.3)');
            const selectedFill = matchedTagColor && matchedTagColor.selected_fill_color ? matchedTagColor.selected_fill_color : getOverride('data-override-selected-fill-color', card_styles.default_selected_fill_color || 'rgba(0,0,0,0.3)');
            const hoverBorder = getOverride('data-override-hover-border-color', card_styles.default_hover_border_color || '#3b82f6');
            const selectedBorder = getOverride('data-override-selected-border-color', card_styles.default_selected_border_color || '#1d4ed8');

            const hoverBadge = badgeBg;
            const selectedBadge = badgeBg;
            const hoverBadgeText = badgeTextCol;
            const selectedBadgeText = badgeTextCol;

            const badgeShadow = getOverride('data-override-badge-shadow', card_styles.default_badge_shadow || '0 2px 6px rgba(0, 0, 0, 0.15)');
            const hoverBadgeShadow = getOverride('data-override-hover-badge-shadow', card_styles.default_hover_badge_shadow || '0 4px 12px rgba(0, 0, 0, 0.25)');
            const selectedBadgeShadow = getOverride('data-override-selected-badge-shadow', card_styles.default_selected_badge_shadow || '0 4px 12px rgba(0, 0, 0, 0.25)');

            const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            foreignObject.setAttribute('width', '28');
            foreignObject.setAttribute('height', '28');
            foreignObject.setAttribute('style', 'transform: translate(-14px, -14px); overflow: visible; pointer-events: none;');

            const label = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            label.className = 'arwai-aziv-circular-badge';
            label.textContent = String(badgeNum);
            label.style.backgroundColor = badgeBg;
            label.style.color = badgeTextCol;
            label.style.borderColor = borderColor;
            label.style.boxShadow = badgeShadow;
            label.style.pointerEvents = 'none';

            foreignObject.appendChild(label);

            const safeTagName = matchedTagColor ? matchedTagColor.tag.replace(/[^a-z0-9-_]/gi, '') : '';

            return {
                element: foreignObject,
                className: matchedTagColor ? `arwai-aziv-tag-custom arwai-aziv-tag-${safeTagName}` : '',
                style: `--tag-fill:${fillColor}; --tag-hover-fill:${hoverFill}; --tag-selected-fill:${selectedFill}; --tag-border:${borderColor}; --tag-badge-bg:${badgeBg}; --tag-badge-color:${badgeTextCol}; --tag-badge-shadow:${badgeShadow}; --tag-hover-border:${hoverBorder}; --tag-hover-badge:${hoverBadge}; --tag-hover-badge-text:${hoverBadgeText}; --tag-hover-badge-shadow:${hoverBadgeShadow}; --tag-selected-border:${selectedBorder}; --tag-selected-badge-shadow:${selectedBadgeShadow}; stroke: var(--tag-border); stroke-width: 2px; cursor: pointer;`,
                'data-id': annotation.id
            };
        };
        const wrapId = wrap.id;
        const stageEl = wrap.querySelector('.arwai-aziv-display-stage');
        const carouselTrack = document.getElementById(`${wrapId}-track`);


        const viewerId = wrap.getAttribute('data-viewer-id');

        function getActionToolbarForViewer() {
            if (viewerId) {
                const targeted = Array.from(document.querySelectorAll('.arwai-aziv-action-toolbar-wrap')).filter(p => {
                    const target = p.getAttribute('data-target-viewer-id');
                    return target && target.trim() === viewerId;
                });
                if (targeted.length > 0) return targeted[0];
            }

            const untargeted = Array.from(document.querySelectorAll('.arwai-aziv-action-toolbar-wrap')).filter(p => {
                const target = p.getAttribute('data-target-viewer-id');
                return !target || target.trim() === '';
            });

            if (untargeted.length === 0) return null;
            if (untargeted.length === 1) return untargeted[0];

            const allNodes = Array.from(document.querySelectorAll('.arwai-aziv-frontend-wrap, .arwai-aziv-action-toolbar-wrap'));
            const myIndex = allNodes.indexOf(wrap);

            let nearest = untargeted[0];
            let minDistance = Infinity;

            untargeted.forEach(tb => {
                const tbIndex = allNodes.indexOf(tb);
                if (tbIndex !== -1 && myIndex !== -1) {
                    const dist = Math.abs(myIndex - tbIndex);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearest = tb;
                    }
                }
            });

            return nearest;
        }

        function getToolbarsForViewer() {
            if (viewerId) {
                const targeted = Array.from(document.querySelectorAll('.arwai-aziv-standalone-sequence-toolbar')).filter(p => {
                    const target = p.getAttribute('data-target-viewer-id');
                    return target && target.trim() === viewerId;
                });
                if (targeted.length > 0) return targeted;
            }

            const untargeted = Array.from(document.querySelectorAll('.arwai-aziv-standalone-sequence-toolbar')).filter(p => {
                const target = p.getAttribute('data-target-viewer-id');
                return !target || target.trim() === '';
            });

            if (untargeted.length === 0) return [];
            if (untargeted.length === 1) return untargeted;

            const allNodes = Array.from(document.querySelectorAll('.arwai-aziv-frontend-wrap, .arwai-aziv-standalone-sequence-toolbar'));
            const myIndex = allNodes.indexOf(wrap);

            let nearest = untargeted[0];
            let minDistance = Infinity;

            untargeted.forEach(tb => {
                const tbIndex = allNodes.indexOf(tb);
                if (tbIndex !== -1 && myIndex !== -1) {
                    const dist = Math.abs(myIndex - tbIndex);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearest = tb;
                    }
                }
            });

            return [nearest];
        }

        function getFilmstripsForViewer() {
            if (viewerId) {
                const targeted = Array.from(document.querySelectorAll('.arwai-aziv-standalone-sequence-filmstrip')).filter(f => {
                    const target = f.getAttribute('data-target-viewer-id');
                    return target && target.trim() === viewerId;
                });
                if (targeted.length > 0) return targeted;
            }

            const untargeted = Array.from(document.querySelectorAll('.arwai-aziv-standalone-sequence-filmstrip')).filter(f => {
                const target = f.getAttribute('data-target-viewer-id');
                return !target || target.trim() === '';
            });

            if (untargeted.length === 0) return [];
            if (untargeted.length === 1) return untargeted;

            const allNodes = Array.from(document.querySelectorAll('.arwai-aziv-frontend-wrap, .arwai-aziv-standalone-sequence-filmstrip'));
            const myIndex = allNodes.indexOf(wrap);

            let nearest = untargeted[0];
            let minDistance = Infinity;

            untargeted.forEach(fs => {
                const fsIndex = allNodes.indexOf(fs);
                if (fsIndex !== -1 && myIndex !== -1) {
                    const dist = Math.abs(myIndex - fsIndex);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearest = fs;
                    }
                }
            });

            return [nearest];
        }

        const actionToolbarWrap = getActionToolbarForViewer();
        const btnNotes = actionToolbarWrap ? actionToolbarWrap.querySelector('.arwai-aziv-btn-notes') : null;
        const btnEnlarge = actionToolbarWrap ? actionToolbarWrap.querySelector('.arwai-aziv-btn-enlarge') : null;
        const btnInfo = actionToolbarWrap ? actionToolbarWrap.querySelector('.arwai-aziv-btn-info') : null;
        const infoPopup = document.getElementById(`${wrapId}-info-popup`);
        const osdModal = document.getElementById(`${wrapId}-osd-modal`);
        const simpleLoader = document.getElementById(`${wrapId}-loader`);
        const osdLoader = document.getElementById(`${wrapId}-osd-loader`);

        let images = [];
        try {
            images = JSON.parse(wrap.getAttribute('data-images'));
        } catch (e) {
            console.error('Invalid images JSON:', e);
            return;
        }

        if (images.length === 0) return;

        // Nav toolbars and filmstrips (embedded + standalone) are wired below via getToolbarsForViewer() / getFilmstripsForViewer()

        let activeIndex = 0;
        let mainAnno = null;
        let osdViewer = null;
        let osdAnno = null;
        let notesVisible = false;

        function getActiveImageEl() {
            if (!carouselTrack) return null;
            const activeSlide = carouselTrack.children[activeIndex];
            return activeSlide ? activeSlide.querySelector('img.arwai-aziv-target-img') : null;
        }

        function initMainAnnotorious() {
            if (mainAnno) {
                try { mainAnno.destroy(); } catch (e) { }
                mainAnno = null;
            }

            if (typeof Annotorious === 'undefined') return;

            const activeImg = getActiveImageEl();
            if (!activeImg) return;

            if (simpleLoader) simpleLoader.style.display = 'block';

            const setupAnno = () => {
                if (simpleLoader) simpleLoader.style.display = 'none';
                mainAnno = Annotorious.init({
                    image: activeImg,
                    readOnly: true,
                    disableEditor: true,
                    fragmentUnit: 'percent',
                    adapter: Annotorious.W3CImageAdapter,
                    formatters: [idBadgeAndColorFormatter],
                    widgets: ['COMMENT', 'TAG'],
                });
                mainAnno.setVisible(notesVisible);

                mainAnno.on('selectAnnotation', (annotation) => {
                    document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
                    const cardEl = document.querySelector(`.arwai-aziv-annotation-card-item[data-annotation-id="${annotation.id}"]`);
                    if (cardEl) {
                        cardEl.classList.add('arwai-aziv-selected-card');
                        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });

                mainAnno.on('cancelSelected', () => {
                    document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
                });

                loadMainAnnotations(images[activeIndex].attachment_id);
            };

            if (activeImg.complete && activeImg.naturalWidth > 0) {
                setupAnno();
            } else {
                activeImg.addEventListener('load', setupAnno, { once: true });
            }
        }

        function getActionNotesBtn() {
            const currentToolbar = getActionToolbarForViewer();
            return currentToolbar ? currentToolbar.querySelector('.arwai-aziv-btn-notes') : btnNotes;
        }

        function updateNotesButtonsState(count) {
            const hasAnnos = typeof count === 'number' && count > 0;
            const osdBtnNotes = document.getElementById(`${wrapId}-osd-notes`);
            const notesButton = getActionNotesBtn();

            [notesButton, osdBtnNotes].forEach(btn => {
                if (!btn) return;
                btn.disabled = false;
                btn.style.opacity = hasAnnos ? '' : '0.6';
                btn.style.cursor = 'pointer';
                btn.style.pointerEvents = 'auto';
                btn.setAttribute('title', notesVisible ? 'Hide Annotations' : 'Show Annotations');

                const iconEyeOpen = btn.querySelector('.arwai-aziv-icon-eye-open');
                const iconEyeOff = btn.querySelector('.arwai-aziv-icon-eye-off');
                if (iconEyeOpen && iconEyeOff) {
                    iconEyeOpen.style.display = notesVisible ? 'none' : 'inline-block';
                    iconEyeOff.style.display = notesVisible ? 'inline-block' : 'none';
                }
                const textSpan = btn.querySelector('span');
                if (textSpan) {
                    textSpan.textContent = notesVisible ? 'Hide Annotations' : 'Show Annotations';
                }
                btn.classList.toggle('active', notesVisible);
                btn.setAttribute('aria-pressed', notesVisible ? 'true' : 'false');
            });
        }

        function setNotesVisibility(visible) {
            notesVisible = visible;
            if (mainAnno) {
                mainAnno.setVisible(notesVisible);
                if (notesVisible) {
                    const currentAnnos = mainAnno.getAnnotations();
                    if (Array.isArray(currentAnnos) && currentAnnos.length > 0) {
                        mainAnno.setAnnotations(currentAnnos);
                    }
                }
                const svgLayer = wrap.querySelector('.a9s-annotation-layer');
                if (svgLayer) {
                    svgLayer.style.display = notesVisible ? '' : 'none';
                }
            }
            if (osdAnno) {
                osdAnno.setVisible(notesVisible);
                if (notesVisible) {
                    const currentAnnos = osdAnno.getAnnotations();
                    if (Array.isArray(currentAnnos) && currentAnnos.length > 0) {
                        osdAnno.setAnnotations(currentAnnos);
                    }
                }
            }
            toggleCardsVisibility(notesVisible);

            const osdBtnNotes = document.getElementById(`${wrapId}-osd-notes`);
            const notesButton = getActionNotesBtn();

            [notesButton, osdBtnNotes].forEach(btn => {
                if (!btn) return;
                const iconEyeOpen = btn.querySelector('.arwai-aziv-icon-eye-open');
                const iconEyeOff = btn.querySelector('.arwai-aziv-icon-eye-off');
                if (iconEyeOpen && iconEyeOff) {
                    iconEyeOpen.style.display = notesVisible ? 'none' : 'inline-block';
                    iconEyeOff.style.display = notesVisible ? 'inline-block' : 'none';
                }
                const textSpan = btn.querySelector('span');
                if (textSpan) {
                    textSpan.textContent = notesVisible ? 'Hide Annotations' : 'Show Annotations';
                }
                btn.classList.toggle('active', notesVisible);
                btn.setAttribute('title', notesVisible ? 'Hide Annotations' : 'Show Annotations');
                btn.setAttribute('aria-pressed', notesVisible ? 'true' : 'false');
            });
        }

        function loadMainAnnotations(attachmentId) {
            if (!mainAnno || !attachmentId) return;

            fetchAnnotationsForAttachment(attachmentId)
                .then(data => {
                    if (!mainAnno) return;
                    mainAnno.clearAnnotations();
                    mainAnno.setAnnotations(data);
                    mainAnno.setVisible(notesVisible);
                    const svgLayer = wrap.querySelector('.a9s-annotation-layer');
                    if (svgLayer) {
                        svgLayer.style.display = notesVisible ? '' : 'none';
                    }
                    updateNotesButtonsState(data.length);
                })
                .catch(err => {
                    console.error('Error displaying main annotations:', err);
                    updateNotesButtonsState(0);
                });
        }

        window.addEventListener('image-annotator:cancel-selected', () => {
            if (mainAnno) {
                try { mainAnno.cancelSelected(); } catch (e) { }
            }
            if (typeof osdAnno !== 'undefined' && osdAnno) {
                try { osdAnno.cancelSelected(); } catch (e) { }
            }
        });

        function getTargetCardGrids() {
            if (viewerId) {
                const targeted = Array.from(document.querySelectorAll('.arwai-aziv-cards-grid')).filter(g => {
                    const target = g.getAttribute('data-target-viewer-id');
                    return target && target.trim() === viewerId;
                });
                if (targeted.length > 0) return targeted;
            }

            const untargeted = Array.from(document.querySelectorAll('.arwai-aziv-cards-grid')).filter(g => {
                const target = g.getAttribute('data-target-viewer-id');
                return !target || target.trim() === '';
            });

            if (untargeted.length === 0) return [];
            if (untargeted.length === 1) return untargeted;

            const allNodes = Array.from(document.querySelectorAll('.arwai-aziv-frontend-wrap, .arwai-aziv-cards-grid'));
            const myIndex = allNodes.indexOf(wrap);

            let nearest = untargeted[0];
            let minDistance = Infinity;

            untargeted.forEach(g => {
                const gIndex = allNodes.indexOf(g);
                if (gIndex !== -1 && myIndex !== -1) {
                    const dist = Math.abs(myIndex - gIndex);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearest = g;
                    }
                }
            });

            return [nearest];
        }

        function toggleCardsVisibility(visible) {
            const cardGrids = getTargetCardGrids();
            cardGrids.forEach(grid => {
                grid.style.display = visible ? 'block' : 'none';
            });
        }

        // Re-render Gutenberg Annotation List Block cards using cached attachment annotations
        function refreshAnnotationCards(activeAttachmentId) {
            const cardGrids = getTargetCardGrids();
            if (cardGrids.length === 0 || !activeAttachmentId) return;

            fetchAnnotationsForAttachment(activeAttachmentId)
                .then(annotations => {
                    cardGrids.forEach(grid => {
                        grid.style.display = notesVisible ? 'block' : 'none';
                        grid.innerHTML = '';

                        if (!Array.isArray(annotations) || annotations.length === 0) {
                            grid.innerHTML = '<div class="arwai-aziv-empty-cards"><p>No annotations for this image.</p></div>';
                            return;
                        }

                        annotations.forEach((anno, index) => {
                            const annoId = anno.id || `anno-${index + 1}`;
                            const badgeNum = anno.db_id || (index + 1);

                            let comments = [];
                            let tags = [];
                            let creator = 'unknown author';
                            let userLogin = 'unknown user';
                            let fullName = 'unknown author name';
                            let timeAgo = '';

                            if (Array.isArray(anno.body)) {
                                anno.body.forEach(b => {
                                    if (b.purpose === 'commenting' || b.purpose === 'replying') {
                                        if (b.value) comments.push(b.value);
                                    } else if (b.purpose === 'tagging') {
                                        if (b.value) tags.push(b.value);
                                    }
                                    if (b.creator && b.creator.name) {
                                        creator = b.creator.name;
                                    }
                                    if (b.created && !timeAgo) {
                                        timeAgo = formatLocalTime(b.created);
                                    }
                                });
                            }

                            if (!timeAgo && anno.created) {
                                timeAgo = formatLocalTime(anno.created);
                            }

                            let matchedBorder = '';
                            let matchedBadge = card_styles.badge_bg || '#2563eb';
                            let matchedBadgeText = card_styles.badge_text_color || '#ffffff';

                            tags.forEach(tagVal => {
                                const tLower = tagVal.toLowerCase().trim();
                                if (tagColorMap[tLower]) {
                                    matchedBorder = tagColorMap[tLower].border_color;
                                    matchedBadge = tagColorMap[tLower].badge_bg;
                                    if (tagColorMap[tLower].badge_text_color) {
                                        matchedBadgeText = tagColorMap[tLower].badge_text_color;
                                    }
                                }
                            });

                            const card = document.createElement('div');
                            card.className = 'arwai-aziv-annotation-card-item';
                            card.setAttribute('data-annotation-id', annoId);
                            card.setAttribute('data-attachment-id', activeAttachmentId);

                            const getCardOverride = (attr, defaultVal) => grid.hasAttribute(attr) && grid.getAttribute(attr) !== '' ? grid.getAttribute(attr) : defaultVal;

                            const cardBg = getCardOverride('data-override-card-bg', card_styles.card_bg || '#1e293b');
                            const cardText = getCardOverride('data-override-card-text-color', card_styles.text_color || '#f8fafc');
                            const borderRadiusRaw = getCardOverride('data-override-border-radius', card_styles.border_radius || 10);
                            const borderRadius = (typeof borderRadiusRaw === 'number' || (!isNaN(borderRadiusRaw) && !String(borderRadiusRaw).endsWith('px'))) ? `${borderRadiusRaw}px` : borderRadiusRaw;
                            const borderWidthRaw = getCardOverride('data-override-border-width', card_styles.border_width || '2px');
                            const borderWidth = (typeof borderWidthRaw === 'number' || (!isNaN(borderWidthRaw) && !String(borderWidthRaw).endsWith('px'))) ? `${borderWidthRaw}px` : (borderWidthRaw || '2px');
                            const borderStyle = getCardOverride('data-override-border-style', card_styles.border_style || 'solid');
                            const borderColor = getCardOverride('data-override-card-border-color', card_styles.card_border_color || '#cbd5e1');
                            const cardShadow = getCardOverride('data-override-card-shadow', card_styles.card_shadow || '0 4px 14px rgba(0, 0, 0, 0.08)');

                            const cardInnerPadding = getCardOverride('data-card-inner-padding', card_styles.card_inner_padding || '16px');
                            const cardMinHeight = getCardOverride('data-card-min-height', card_styles.card_min_height || '0px');
                            const cardGap = getCardOverride('data-card-gap', card_styles.card_gap || '16px');
                            const cardTextAlignment = getCardOverride('data-card-text-alignment', card_styles.card_text_alignment || 'left');

                            const hoverBg = getCardOverride('data-override-card-hover-bg', card_styles.card_hover_bg || '#334155');
                            const hoverText = getCardOverride('data-override-card-hover-text-color', card_styles.card_hover_text || '#f8fafc');
                            const hoverBorder = getCardOverride('data-override-card-hover-border-color', card_styles.card_hover_border || 'transparent');
                            const hoverShadow = getCardOverride('data-override-card-hover-shadow', card_styles.card_hover_shadow || '0 8px 22px rgba(0, 0, 0, 0.15)');

                            const selectedBg = getCardOverride('data-override-card-selected-bg', card_styles.card_selected_bg || '#0f172a');
                            const selectedText = getCardOverride('data-override-card-selected-text-color', card_styles.card_selected_text || '#ffffff');
                            const selectedBorder = getCardOverride('data-override-card-selected-border-color', card_styles.card_selected_border || '#2563eb');
                            const selectedShadow = getCardOverride('data-override-card-selected-shadow', card_styles.card_selected_shadow || '0 8px 24px rgba(0, 0, 0, 0.2)');

                            grid.style.gap = cardGap;

                            card.style.cssText = `
                                --card-bg: ${cardBg};
                                --card-text: ${cardText};
                                --card-border-radius: ${borderRadius};
                                --card-border-color: ${borderColor};
                                --card-border-width: ${borderWidth};
                                --card-border-style: ${borderStyle};
                                --card-shadow: ${cardShadow};
                                --card-hover-bg: ${hoverBg};
                                --card-hover-text: ${hoverText};
                                --card-hover-border: ${hoverBorder};
                                --card-hover-shadow: ${hoverShadow};
                                --card-selected-bg: ${selectedBg};
                                --card-selected-text: ${selectedText};
                                --card-selected-border: ${selectedBorder};
                                --card-selected-shadow: ${selectedShadow};
                                padding: ${cardInnerPadding};
                                min-height: ${cardMinHeight};
                                text-align: ${cardTextAlignment};
                                ${matchedBorder ? 'border-top: 4px solid ' + matchedBorder + ';' : ''}
                            `;

                            let commentsHtml = comments.map(c => `<p>${escapeHTML(c)}</p>`).join('') || '<p><em>No comment text</em></p>';
                            let tagsHtml = tags.map(t => `<span class="arwai-aziv-card-tag-badge">#${escapeHTML(t)}</span>`).join('');

                            const justifyHeader = cardTextAlignment === 'center' ? 'center' : cardTextAlignment === 'right' ? 'flex-end' : 'flex-start';

                            card.innerHTML = `
                                <div class="arwai-aziv-card-header-bar" style="justify-content:${justifyHeader};">
                                    <span class="arwai-aziv-card-badge-circle" style="background:${matchedBadge}; color:${matchedBadgeText};">${badgeNum}</span>
                                </div>
                                <div class="arwai-aziv-card-body-text">
                                    ${commentsHtml}
                                    <div class="arwai-aziv-card-fade-mask"></div>
                                </div>
                                ${tagsHtml ? `<div class="arwai-aziv-card-tags-footer" style="justify-content:${justifyHeader};">${tagsHtml}</div>` : ''}
                                <div class="arwai-aziv-card-author-meta" style="justify-content:${justifyHeader};">
                                    <strong class="arwai-aziv-author-name arwai-aziv-user-name" data-display="${escapeHTML(creator)}" data-login="${escapeHTML(userLogin)}" data-fullname="${escapeHTML(fullName)}" style="cursor:pointer;">${escapeHTML(creator)}</strong>
                                    ${timeAgo ? `<span class="arwai-aziv-created-time">${escapeHTML(timeAgo)}</span>` : ''}
                                </div>
                            `;

                            grid.appendChild(card);

                            // Truncation & Read More Toggle Logic
                            const enableTruncation = getCardOverride('data-enable-truncation', '1') === '1';
                            const readMoreText = getCardOverride('data-read-more-text', card_styles.read_more_text || '...Read More');
                            const showLessText = getCardOverride('data-show-less-text', card_styles.show_less_text || 'Show Less');

                            if (enableTruncation) {
                                const bodyEl = card.querySelector('.arwai-aziv-card-body-text');
                                if (bodyEl) {
                                    const cardMaxLines = parseInt(getCardOverride('data-card-max-lines', card_styles.card_max_lines || '3'), 10) || 3;
                                    bodyEl.style.setProperty('--card-max-lines', cardMaxLines);

                                    // Measure line height to determine if text overflows line clamp limit
                                    const computedStyle = window.getComputedStyle(bodyEl);
                                    let lineHeight = parseFloat(computedStyle.lineHeight);
                                    if (isNaN(lineHeight)) {
                                        lineHeight = (parseFloat(computedStyle.fontSize) || 13) * 1.5;
                                    }
                                    const maxAllowedHeight = lineHeight * cardMaxLines + 6;

                                    if (bodyEl.scrollHeight > maxAllowedHeight) {
                                        bodyEl.classList.add('arwai-aziv-is-truncatable');
                                        bodyEl.style.maxHeight = `${maxAllowedHeight}px`;

                                        const btn = document.createElement('button');
                                        btn.type = 'button';
                                        btn.className = 'arwai-aziv-card-expand-btn';
                                        btn.innerText = readMoreText;
                                        btn.addEventListener('click', (e) => {
                                            e.stopPropagation();
                                            const isExpanded = bodyEl.classList.toggle('arwai-aziv-is-expanded');
                                            if (isExpanded) {
                                                bodyEl.style.maxHeight = `${bodyEl.scrollHeight + 10}px`;
                                            } else {
                                                bodyEl.style.maxHeight = `${maxAllowedHeight}px`;
                                                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                            }
                                            btn.innerText = isExpanded ? showLessText : readMoreText;
                                        });
                                        bodyEl.after(btn);
                                    }
                                }
                            }

                            card.addEventListener('click', () => {
                                if (mainAnno) {
                                    const annoObj = mainAnno.getAnnotations().find(a => a.id === annoId);
                                    if (annoObj) {
                                        mainAnno.selectAnnotation(annoObj);
                                    }
                                }
                                document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
                                card.classList.add('arwai-aziv-selected-card');
                            });
                        });
                    });
                })
                .catch(err => console.error('Error refreshing annotation cards:', err));
        }

        // Instagram-Style Smooth Slide Carousel Transition
        function switchSlide(index) {
            if (index < 0 || index >= images.length) return;
            activeIndex = index;

            if (carouselTrack) {
                carouselTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
                carouselTrack.style.transform = `translateX(-${activeIndex * 100}%)`;

                Array.from(carouselTrack.children).forEach((slide, i) => {
                    slide.classList.toggle('active', i === activeIndex);
                });
            }

            getToolbarsForViewer().forEach(toolbarWrap => {
                const pPrev = toolbarWrap.querySelector('.arwai-aziv-btn-prev');
                const pNext = toolbarWrap.querySelector('.arwai-aziv-btn-next');
                const pCounter = toolbarWrap.querySelector('.arwai-aziv-toolbar-counter');
                if (pPrev) {
                    pPrev.disabled = activeIndex === 0;
                    pPrev.style.opacity = activeIndex === 0 ? '0.3' : '';
                    pPrev.style.cursor = activeIndex === 0 ? 'not-allowed' : '';
                }
                if (pNext) {
                    pNext.disabled = activeIndex === images.length - 1;
                    pNext.style.opacity = activeIndex === images.length - 1 ? '0.3' : '';
                    pNext.style.cursor = activeIndex === images.length - 1 ? 'not-allowed' : '';
                }
                if (pCounter) {
                    pCounter.textContent = `${activeIndex + 1} / ${images.length}`;
                }
            });

            getFilmstripsForViewer().forEach(fs => {
                const container = fs.querySelector('.arwai-aziv-filmstrip-scroll-container');
                const thumbs = fs.querySelectorAll('.arwai-aziv-filmstrip-thumb-item');
                thumbs.forEach((t, i) => {
                    const isActive = i === activeIndex;
                    t.classList.toggle('active', isActive);
                    t.style.opacity = isActive ? '1' : '0.7';
                    if (isActive && container) {
                        scrollToCenterThumb(container, t);
                    }
                });
            });

            refreshAnnotationCards(images[activeIndex].attachment_id);
            initMainAnnotorious();
        }

        // Prevent native browser ghost image dragging & enable desktop hand-gesture swipe
        if (stageEl && carouselTrack) {
            let startX = 0;
            let isDragging = false;

            // Cancel native browser image drag
            stageEl.addEventListener('dragstart', (e) => e.preventDefault());

            if (images.length > 1) {
                // Touch Gesture
                stageEl.addEventListener('touchstart', (e) => {
                    if (e.touches && e.touches.length === 1) {
                        startX = e.touches[0].clientX;
                        isDragging = true;
                        carouselTrack.style.transition = 'none';
                    }
                }, { passive: true });

                stageEl.addEventListener('touchmove', (e) => {
                    if (!isDragging || !e.touches || e.touches.length !== 1) return;
                    const deltaX = e.touches[0].clientX - startX;
                    const stageWidth = stageEl.clientWidth || 800;
                    const deltaPercent = (deltaX / stageWidth) * 100;
                    carouselTrack.style.transform = `translateX(${-activeIndex * 100 + deltaPercent}%)`;
                }, { passive: true });

                stageEl.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    carouselTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
                    if (e.changedTouches && e.changedTouches.length === 1) {
                        const deltaX = e.changedTouches[0].clientX - startX;
                        if (Math.abs(deltaX) >= 50) {
                            if (deltaX < 0) {
                                if (activeIndex < images.length - 1) switchSlide(activeIndex + 1);
                                else switchSlide(activeIndex);
                            } else {
                                if (activeIndex > 0) switchSlide(activeIndex - 1);
                                else switchSlide(activeIndex);
                            }
                        } else {
                            switchSlide(activeIndex);
                        }
                    }
                }, { passive: true });

                // Desktop Mouse Drag Gesture
                stageEl.addEventListener('mousedown', (e) => {
                    // Ignore drags on SVG annotation elements so click opens popup cleanly
                    if (e.target.closest('.a9s-annotation-layer') || e.target.closest('.a9s-annotation')) return;
                    e.preventDefault();
                    isDragging = true;
                    startX = e.clientX;
                    carouselTrack.style.transition = 'none';
                });

                stageEl.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const deltaX = e.clientX - startX;
                    const stageWidth = stageEl.clientWidth || 800;
                    const deltaPercent = (deltaX / stageWidth) * 100;
                    carouselTrack.style.transform = `translateX(${-activeIndex * 100 + deltaPercent}%)`;
                });

                const endMouseDrag = (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    carouselTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
                    const deltaX = e.clientX - startX;
                    if (Math.abs(deltaX) >= 50) {
                        if (deltaX < 0) {
                            if (activeIndex < images.length - 1) switchSlide(activeIndex + 1);
                            else switchSlide(activeIndex);
                        } else {
                            if (activeIndex > 0) switchSlide(activeIndex - 1);
                            else switchSlide(activeIndex);
                        }
                    } else {
                        switchSlide(activeIndex);
                    }
                };

                stageEl.addEventListener('mouseup', endMouseDrag);
                stageEl.addEventListener('mouseleave', endMouseDrag);

                // Horizontal Wheel Scroll
                stageEl.addEventListener('wheel', (e) => {
                    if (Math.abs(e.deltaX) > 20) {
                        if (e.deltaX > 0) {
                            if (activeIndex < images.length - 1) switchSlide(activeIndex + 1);
                        } else {
                            if (activeIndex > 0) switchSlide(activeIndex - 1);
                        }
                    }
                }, { passive: true });
            }
        }

        // Bind Navigation Toolbar (< 1 / 7 >) — embedded + all standalone instances
        getToolbarsForViewer().forEach(toolbarWrap => {
            const pPrev = toolbarWrap.querySelector('.arwai-aziv-btn-prev');
            const pNext = toolbarWrap.querySelector('.arwai-aziv-btn-next');
            const pCounter = toolbarWrap.querySelector('.arwai-aziv-toolbar-counter');
            // Init counter
            if (pCounter) pCounter.textContent = `${activeIndex + 1} / ${images.length}`;
            // Hide single-image toolbars
            if (images.length <= 1) {
                toolbarWrap.style.display = 'none';
            }
            if (pPrev) pPrev.addEventListener('click', () => {
                if (activeIndex > 0) switchSlide(activeIndex - 1);
            });
            if (pNext) pNext.addEventListener('click', () => {
                if (activeIndex < images.length - 1) switchSlide(activeIndex + 1);
            });
        });

        // Helper: Calculate exact scroll position to center active thumbnail
        function scrollToCenterThumb(container, thumb) {
            if (!container || !thumb) return;
            const containerWidth = container.clientWidth;
            const thumbLeft = thumb.offsetLeft;
            const thumbWidth = thumb.offsetWidth;
            const targetLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
            container.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: 'smooth'
            });
        }

        // Helper: Update filmstrip chevron buttons and fade overlays visibility
        function updateFilmstripScrollState(fs) {
            const container = fs.querySelector('.arwai-aziv-filmstrip-scroll-container');
            if (!container) return;

            const btnPrev = fs.querySelector('.arwai-aziv-filmstrip-nav-prev');
            const btnNext = fs.querySelector('.arwai-aziv-filmstrip-nav-next');
            const fadeLeft = fs.querySelector('.arwai-aziv-filmstrip-fade-left');
            const fadeRight = fs.querySelector('.arwai-aziv-filmstrip-fade-right');

            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;

            const hasOverflow = scrollWidth - clientWidth > 2;
            const canScrollLeft = hasOverflow && scrollLeft > 2;
            const canScrollRight = hasOverflow && (scrollLeft + clientWidth < scrollWidth - 4);

            if (btnPrev) btnPrev.classList.toggle('is-visible', canScrollLeft);
            if (btnNext) btnNext.classList.toggle('is-visible', canScrollRight);
            if (fadeLeft) fadeLeft.classList.toggle('is-visible', canScrollLeft);
            if (fadeRight) fadeRight.classList.toggle('is-visible', canScrollRight);
        }

        // Populate & Bind Filmstrip Thumbnails — embedded + all standalone instances
        function buildFilmstripThumbs(fs) {
            const container = fs.querySelector('.arwai-aziv-filmstrip-scroll-container');
            if (!container) return;

            const btnPrev = fs.querySelector('.arwai-aziv-filmstrip-nav-prev');
            const btnNext = fs.querySelector('.arwai-aziv-filmstrip-nav-next');

            // Populate thumbnails if container is empty (standalone block)
            if (container.children.length === 0) {
                images.forEach((img, i) => {
                    const item = document.createElement('div');
                    item.className = `arwai-aziv-filmstrip-thumb-item ${i === 0 ? 'active' : ''}`;
                    item.setAttribute('data-index', i);
                    item.style.cssText = `flex-shrink:0; overflow:hidden; cursor:pointer; opacity:${i === 0 ? '1' : '0.7'};`;
                    const thumb = document.createElement('img');
                    thumb.src = img.thumb_url || img.simple_url;
                    thumb.alt = '';
                    thumb.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block; pointer-events:none;';
                    item.appendChild(thumb);
                    container.appendChild(item);
                });
            }

            const thumbs = fs.querySelectorAll('.arwai-aziv-filmstrip-thumb-item');
            thumbs.forEach(t => {
                t.addEventListener('click', () => {
                    const idx = parseInt(t.getAttribute('data-index'), 10);
                    switchSlide(idx);
                });
            });

            // Bind Left / Right Nav Buttons
            if (btnPrev && !btnPrev.dataset.bound) {
                btnPrev.dataset.bound = '1';
                btnPrev.addEventListener('click', (e) => {
                    e.preventDefault();
                    const step = Math.max(160, container.clientWidth * 0.6);
                    container.scrollBy({ left: -step, behavior: 'smooth' });
                });
            }

            if (btnNext && !btnNext.dataset.bound) {
                btnNext.dataset.bound = '1';
                btnNext.addEventListener('click', (e) => {
                    e.preventDefault();
                    const step = Math.max(160, container.clientWidth * 0.6);
                    container.scrollBy({ left: step, behavior: 'smooth' });
                });
            }

            // Bind Scroll & Resize observers for fade/chevron updates
            if (!container.dataset.boundScroll) {
                container.dataset.boundScroll = '1';
                container.addEventListener('scroll', () => updateFilmstripScrollState(fs), { passive: true });
                if (typeof ResizeObserver !== 'undefined') {
                    new ResizeObserver(() => updateFilmstripScrollState(fs)).observe(container);
                } else {
                    window.addEventListener('resize', () => updateFilmstripScrollState(fs));
                }
            }

            setTimeout(() => updateFilmstripScrollState(fs), 50);
        }

        getFilmstripsForViewer().forEach(fs => buildFilmstripThumbs(fs));

        // Action Toolbar Toolbar Buttons
        const activeToolbar = getActionToolbarForViewer();
        if (activeToolbar) {
            const bNotes = activeToolbar.querySelector('.arwai-aziv-btn-notes');
            const bInfo = activeToolbar.querySelector('.arwai-aziv-btn-info');
            const bEnlarge = activeToolbar.querySelector('.arwai-aziv-btn-enlarge');

            if (bNotes) {
                bNotes.onclick = (e) => {
                    e.preventDefault();
                    setNotesVisibility(!notesVisible);
                };
            }

            if (bInfo && infoPopup) {
                bInfo.onclick = (e) => {
                    e.preventDefault();
                    const currentAtt = images[activeIndex];
                    const infoRes = infoPopup.querySelector('.arwai-aziv-info-res');
                    const infoAttId = infoPopup.querySelector('.arwai-aziv-info-att-id');
                    if (infoRes) infoRes.textContent = `${currentAtt.width} x ${currentAtt.height} px`;
                    if (infoAttId) infoAttId.textContent = currentAtt.attachment_id;
                    infoPopup.style.display = 'flex';
                };
            }

            if (bEnlarge && osdModal) {
                bEnlarge.onclick = (e) => {
                    e.preventDefault();
                    openOsdModal();
                };
            }
        }
        if (infoPopup) {
            const closeInfo = infoPopup.querySelector('.arwai-aziv-info-close-btn');
            if (closeInfo) closeInfo.onclick = () => infoPopup.style.display = 'none';
        }

        let previousActiveElement = null;

        function announceOsdStatus(msg) {
            const statusEl = document.getElementById(`${wrapId}-osd-status`);
            if (statusEl) {
                statusEl.textContent = '';
                setTimeout(() => { statusEl.textContent = msg; }, 50);
            }
        }

        function setBackgroundInert(isInert) {
            if (!wrap) return;
            Array.from(wrap.children).forEach(child => {
                if (child !== osdModal && !child.contains(osdModal)) {
                    if (isInert) {
                        child.setAttribute('aria-hidden', 'true');
                    } else {
                        child.removeAttribute('aria-hidden');
                    }
                }
            });
        }

        function getOsdFocusables() {
            if (!osdModal) return [];
            return Array.from(
                osdModal.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])')
            ).filter(el => {
                return (el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement) && window.getComputedStyle(el).display !== 'none' && window.getComputedStyle(el).visibility !== 'hidden';
            });
        }

        function openOsdModal() {
            if (!osdModal) return;
            previousActiveElement = document.activeElement;
            osdModal.style.display = 'flex';
            setBackgroundInert(true);
            if (osdLoader) osdLoader.style.display = 'block';

            const canvasId = `${wrapId}-osd-canvas`;
            const canvasEl = document.getElementById(canvasId);
            if (canvasEl) {
                canvasEl.setAttribute('tabindex', '0');
                canvasEl.setAttribute('role', 'region');
                canvasEl.setAttribute('aria-label', 'Interactive image viewer. Use arrow keys to pan, plus and minus keys to zoom, home key to reset view, page up and page down to switch images.');
            }

            const tileSources = images.map(img => ({ type: 'image', url: img.full_url }));

            if (osdViewer) {
                try { osdViewer.destroy(); } catch (e) { }
                osdViewer = null;
            }

            osdViewer = OpenSeadragon({
                id: canvasId,
                tileSources: tileSources,
                initialPage: activeIndex,
                sequenceMode: true,
                showNavigationControl: false,
                minZoomLevel: parseFloat(osd_options.minZoomLevel || '0.3'),
                maxZoomLevel: parseFloat(osd_options.maxZoomLevel || '10'),
                animationTime: parseFloat(osd_options.animationTime || '1.2'),
                showNavigator: osd_options.showNavigator === '1',
                gestureSettingsMouse: { clickToZoom: osd_options.gestureSettingsMouse === '1' },
                tabIndex: 0,
            });

            osdViewer.addHandler('open', () => {
                if (osdLoader) osdLoader.style.display = 'none';
                if (canvasEl) canvasEl.focus();
                announceOsdStatus(`Opened full screen image viewer. Image ${osdViewer.currentPage() + 1} of ${images.length}`);

                if (typeof OpenSeadragon.Annotorious === 'function') {
                    if (osdAnno) { try { osdAnno.destroy(); } catch (e) { } }

                    const isReadOnly = !user_can_edit;
                    const osdWidgets = isReadOnly ? ['COMMENT', 'TAG'] : ['COMMENT', 'TAG', PopupHistoryWidget];

                    osdAnno = OpenSeadragon.Annotorious(osdViewer, {
                        readOnly: isReadOnly,
                        fragmentUnit: 'percent',
                        adapter: Annotorious.W3CImageAdapter,
                        formatters: [idBadgeAndColorFormatter],
                        widgets: osdWidgets,
                    });

                    osdAnno.setVisible(notesVisible);

                    osdAnno.on('selectAnnotation', (annotation) => {
                        document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
                        const cardEl = document.querySelector(`.arwai-aziv-annotation-card-item[data-annotation-id="${annotation.id}"]`);
                        if (cardEl) {
                            cardEl.classList.add('arwai-aziv-selected-card');
                            cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    });

                    osdAnno.on('cancelSelected', () => {
                        document.querySelectorAll('.arwai-aziv-annotation-card-item').forEach(c => c.classList.remove('arwai-aziv-selected-card'));
                    });

                    const pageIdx = osdViewer.currentPage();
                    const currentAtt = images[pageIdx];
                    if (currentAtt) {
                        loadOsdAnnotations(currentAtt.attachment_id);
                    }

                    if (!isReadOnly) {
                        const currentPostId = parseInt(wrap.getAttribute('data-post-id'), 10) || 0;
                        osdAnno.on('createAnnotation', (annotation) => {
                            saveAnnotation(currentAtt.attachment_id, currentPostId, annotation);
                        });
                        osdAnno.on('updateAnnotation', (annotation) => {
                            saveAnnotation(currentAtt.attachment_id, currentPostId, annotation);
                        });
                        osdAnno.on('deleteAnnotation', (annotation) => {
                            deleteAnnotation(currentAtt.attachment_id, annotation);
                        });
                    }
                }
            });

            osdViewer.addHandler('page', (e) => {
                if (osdLoader) osdLoader.style.display = 'block';
                switchSlide(e.page);
                const currentAtt = images[e.page];
                if (currentAtt) {
                    loadOsdAnnotations(currentAtt.attachment_id);
                }
            });

            bindOsdFloatingToolbars(wrapId, osdViewer, () => {
                setNotesVisibility(!notesVisible);
                return notesVisible;
            }, closeOsdModal);
        }

        function loadOsdAnnotations(attachmentId) {
            if (!osdAnno || !attachmentId) return;

            fetchAnnotationsForAttachment(attachmentId)
                .then(data => {
                    if (osdAnno) {
                        osdAnno.clearAnnotations();
                        osdAnno.setAnnotations(data);
                        osdAnno.setVisible(notesVisible);
                        updateNotesButtonsState(data.length);

                        // Make SVG annotations keyboard focusable and accessible to screen readers
                        setTimeout(() => {
                            const container = document.getElementById(`${wrapId}-osd-canvas`);
                            if (!container) return;
                            const gElems = container.querySelectorAll('.a9s-annotation');
                            gElems.forEach((g, idx) => {
                                const annoId = g.getAttribute('data-id');
                                const anno = data.find(a => a.id === annoId);
                                let bodyText = `Annotation ${idx + 1}`;
                                if (anno && anno.body && anno.body.length > 0) {
                                    const txtBody = anno.body.find(b => b.type === 'TextualBody' || b.purpose === 'commenting');
                                    if (txtBody && txtBody.value) bodyText += `: ${txtBody.value}`;
                                }
                                g.setAttribute('tabindex', '0');
                                g.setAttribute('role', 'button');
                                g.setAttribute('aria-label', bodyText);

                                g.onkeydown = (ev) => {
                                    if (ev.key === 'Enter' || ev.key === ' ') {
                                        ev.preventDefault();
                                        ev.stopPropagation();
                                        if (osdAnno) osdAnno.selectAnnotation(annoId);
                                    }
                                };
                            });
                        }, 300);
                    }
                })
                .catch(err => {
                    console.error('Error displaying OSD annotations:', err);
                    updateNotesButtonsState(0);
                });
        }

        function saveAnnotation(attachmentId, postId, annotation) {
            return fetch(`${rest_url}annotations/attachment/${attachmentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce,
                },
                body: JSON.stringify({
                    post_id: postId,
                    annotation: annotation,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.success) {
                        // Force refresh cache for this attachment and sync all active views
                        fetchAnnotationsForAttachment(attachmentId, true).then(() => {
                            loadOsdAnnotations(attachmentId);
                            loadMainAnnotations(attachmentId);
                            refreshAnnotationCards(attachmentId);
                        });
                    }
                })
                .catch(err => console.error('Error saving OSD annotation:', err));
        }

        function deleteAnnotation(attachmentId, annotation) {
            const encodedId = encodeURIComponent(annotation.id);
            return fetch(`${rest_url}annotations/attachment/${attachmentId}/${encodedId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce,
                },
                body: JSON.stringify({ annotation }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.success) {
                        // Force refresh cache for this attachment and sync all active views
                        fetchAnnotationsForAttachment(attachmentId, true).then(() => {
                            loadOsdAnnotations(attachmentId);
                            loadMainAnnotations(attachmentId);
                            refreshAnnotationCards(attachmentId);
                        });
                    }
                })
                .catch(err => console.error('Error deleting OSD annotation:', err));
        }

        function cycleOsdAnnotation(direction = 1) {
            if (!osdAnno) return;
            const annos = osdAnno.getAnnotations();
            if (!annos || annos.length === 0) {
                announceOsdStatus('No annotations on this image');
                return;
            }

            const selected = osdAnno.getSelected();
            let targetIndex = 0;

            if (selected) {
                const currentIndex = annos.findIndex(a => a.id === selected.id);
                if (currentIndex !== -1) {
                    targetIndex = (currentIndex + direction + annos.length) % annos.length;
                }
            } else if (direction < 0) {
                targetIndex = annos.length - 1;
            }

            const targetAnno = annos[targetIndex];
            if (targetAnno && targetAnno.id) {
                osdAnno.selectAnnotation(targetAnno.id);
                let label = `Selected annotation ${targetIndex + 1} of ${annos.length}`;
                if (targetAnno.body && targetAnno.body.length > 0) {
                    const comment = targetAnno.body.find(b => b.type === 'TextualBody' || b.purpose === 'commenting');
                    if (comment && comment.value) label += `: ${comment.value}`;
                }
                announceOsdStatus(label);
            }
        }

        // Automatic Instant Re-fetch & Sync of Simple Viewer & Gutenberg Cards on Modal Close
        function closeOsdModal() {
            if (osdModal) osdModal.style.display = 'none';
            setBackgroundInert(false);
            if (osdAnno) { try { osdAnno.destroy(); } catch (e) { } osdAnno = null; }
            if (osdViewer) { try { osdViewer.destroy(); } catch (e) { } osdViewer = null; }

            const currentAttId = images[activeIndex].attachment_id;
            loadMainAnnotations(currentAttId);
            refreshAnnotationCards(currentAttId);

            if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
                previousActiveElement.focus();
            }
            announceOsdStatus('Closed full screen image viewer');
        }

        initMainAnnotorious();
        toggleCardsVisibility(notesVisible);

        if (images.length > 0) {
            refreshAnnotationCards(images[0].attachment_id);
            // Set initial disabled state on all toolbar instances
            getToolbarsForViewer().forEach(toolbarWrap => {
                const pPrev = toolbarWrap.querySelector('.arwai-aziv-btn-prev');
                const pNext = toolbarWrap.querySelector('.arwai-aziv-btn-next');
                if (pPrev) {
                    pPrev.disabled = true;
                    pPrev.style.opacity = '0.3';
                    pPrev.style.cursor = 'not-allowed';
                }
                if (pNext) {
                    pNext.disabled = images.length <= 1;
                    pNext.style.opacity = images.length <= 1 ? '0.3' : '';
                    pNext.style.cursor = images.length <= 1 ? 'not-allowed' : '';
                }
            });
        }

        document.addEventListener('focusin', (e) => {
            if (osdModal && osdModal.style.display === 'flex') {
                if (!osdModal.contains(e.target)) {
                    e.stopPropagation();
                    const focusables = getOsdFocusables();
                    if (focusables.length > 0) {
                        focusables[0].focus();
                    }
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (osdModal && osdModal.style.display === 'flex') {
                // Do not intercept input when typing inside forms or text fields
                if (e.target && e.target.matches('input, textarea, select, [contenteditable]')) {
                    if (e.key === 'Escape') {
                        e.target.blur();
                    }
                    return;
                }

                // Modal Focus Trap
                if (e.key === 'Tab') {
                    const focusables = getOsdFocusables();
                    if (focusables.length > 0) {
                        const first = focusables[0];
                        const last = focusables[focusables.length - 1];
                        if (!osdModal.contains(document.activeElement)) {
                            e.preventDefault();
                            first.focus();
                        } else if (e.shiftKey && document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        } else if (!e.shiftKey && document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    } else {
                        e.preventDefault();
                    }
                }

                if (e.key === 'Escape') {
                    e.preventDefault();
                    if (osdAnno && osdAnno.getSelected()) {
                        osdAnno.cancelSelected();
                        announceOsdStatus('Deselected annotation');
                    } else {
                        closeOsdModal();
                    }
                } else if (e.key === 'a' || e.key === 'A' || (e.altKey && e.key === 'ArrowDown')) {
                    e.preventDefault();
                    cycleOsdAnnotation(e.shiftKey ? -1 : 1);
                } else if (e.altKey && e.key === 'ArrowUp') {
                    e.preventDefault();
                    cycleOsdAnnotation(-1);
                } else if (e.key === 'PageUp' || e.key === '[') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.currentPage() > 0) {
                        osdViewer.goToPage(osdViewer.currentPage() - 1);
                    }
                } else if (e.key === 'PageDown' || e.key === ']') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.currentPage() < images.length - 1) {
                        osdViewer.goToPage(osdViewer.currentPage() + 1);
                    }
                } else if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.viewport) osdViewer.viewport.zoomBy(1.25);
                } else if (e.key === '-' || e.key === '_') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.viewport) osdViewer.viewport.zoomBy(0.8);
                } else if (e.key === '0' || e.key === 'Home') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.viewport) osdViewer.viewport.goHome();
                } else if (e.key === 'r' || e.key === 'R') {
                    e.preventDefault();
                    if (osdViewer && osdViewer.viewport) {
                        const rot = (osdViewer.viewport.getRotation() + (e.shiftKey ? -90 : 90)) % 360;
                        osdViewer.viewport.setRotation(rot);
                        announceOsdStatus(`Image rotated ${rot} degrees`);
                    }
                }
            }
        });

    }

    // Bind Floating Toolbars
    function bindOsdFloatingToolbars(wrapId, osdViewer, toggleNotesCallback, closeCallback) {
        const btnNotes = document.getElementById(`${wrapId}-osd-notes`);
        const btnPrev = document.getElementById(`${wrapId}-osd-prev`);
        const btnHome = document.getElementById(`${wrapId}-osd-home`);
        const btnNext = document.getElementById(`${wrapId}-osd-next`);
        const btnClose = document.getElementById(`${wrapId}-osd-close`);

        const btnZoomIn = document.getElementById(`${wrapId}-osd-zoomin`);
        const btnZoomOut = document.getElementById(`${wrapId}-osd-zoomout`);
        const btnRotLeft = document.getElementById(`${wrapId}-osd-rotleft`);
        const btnRotRight = document.getElementById(`${wrapId}-osd-rotright`);

        if (btnNotes) {
            btnNotes.onclick = () => {
                const isVisible = toggleNotesCallback();
                btnNotes.setAttribute('aria-pressed', isVisible ? 'true' : 'false');
                announceOsdStatus(isVisible ? 'Annotations visible' : 'Annotations hidden');
            };
        }
        if (btnPrev) btnPrev.onclick = () => osdViewer && osdViewer.goToPage(Math.max(0, osdViewer.currentPage() - 1));
        if (btnHome) btnHome.onclick = () => osdViewer && osdViewer.viewport && osdViewer.viewport.goHome();
        if (btnNext) btnNext.onclick = () => osdViewer && osdViewer.goToPage(Math.min(osdViewer.tileSources.length - 1, osdViewer.currentPage() + 1));
        if (btnClose) btnClose.onclick = () => closeCallback();

        if (btnZoomIn) btnZoomIn.onclick = () => osdViewer && osdViewer.viewport && osdViewer.viewport.zoomBy(1.25);
        if (btnZoomOut) btnZoomOut.onclick = () => osdViewer && osdViewer.viewport && osdViewer.viewport.zoomBy(0.8);
        if (btnRotLeft) btnRotLeft.onclick = () => osdViewer && osdViewer.viewport && osdViewer.viewport.setRotation(osdViewer.viewport.getRotation() - 90);
        if (btnRotRight) btnRotRight.onclick = () => osdViewer && osdViewer.viewport && osdViewer.viewport.setRotation(osdViewer.viewport.getRotation() + 90);

        if (osdViewer) {
            let zoomAnnounceTimeout = null;
            const updateOsdNav = () => {
                const current = osdViewer.currentPage();
                const total = osdViewer.tileSources.length;
                if (btnPrev) {
                    btnPrev.disabled = current === 0;
                    btnPrev.style.opacity = current === 0 ? '0.3' : '';
                    btnPrev.style.cursor = current === 0 ? 'not-allowed' : '';
                }
                if (btnNext) {
                    btnNext.disabled = current === total - 1;
                    btnNext.style.opacity = current === total - 1 ? '0.3' : '';
                    btnNext.style.cursor = current === total - 1 ? 'not-allowed' : '';
                }
                announceOsdStatus(`Showing image ${current + 1} of ${total}`);
            };
            const updateOsdZoom = () => {
                if (!osdViewer.viewport) return;
                const zoom = osdViewer.viewport.getZoom(true);
                const minZoom = osdViewer.viewport.getMinZoom();
                const maxZoom = osdViewer.viewport.getMaxZoom();
                if (btnZoomIn) {
                    const atMax = zoom >= maxZoom - 0.01;
                    btnZoomIn.disabled = atMax;
                    btnZoomIn.style.opacity = atMax ? '0.3' : '';
                    btnZoomIn.style.cursor = atMax ? 'not-allowed' : '';
                }
                if (btnZoomOut) {
                    const atMin = zoom <= minZoom + 0.01;
                    btnZoomOut.disabled = atMin;
                    btnZoomOut.style.opacity = atMin ? '0.3' : '';
                    btnZoomOut.style.cursor = atMin ? 'not-allowed' : '';
                }
                clearTimeout(zoomAnnounceTimeout);
                zoomAnnounceTimeout = setTimeout(() => {
                    announceOsdStatus(`Zoom level ${Math.round(zoom * 100)}%`);
                }, 400);
            };
            osdViewer.addHandler('page', updateOsdNav);
            osdViewer.addHandler('zoom', updateOsdZoom);
            osdViewer.addHandler('open', () => {
                updateOsdNav();
                updateOsdZoom();
            });
        }
    }


    // Local Viewer Timezone Date Formatter Helper
    function formatLocalTime(dateInput) {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleString();
    }

    function escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
});
