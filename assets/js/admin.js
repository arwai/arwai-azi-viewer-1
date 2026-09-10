/**
 * Image Annotator Admin JS
 * Legacy-style Media Library selection, jQuery UI drag-and-drop sortable collection list,
 * OpenSeadragon + Annotorious deep zoom editor, and real-time REST API autosave.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof ImageAnnotatorAdmin === 'undefined') {
        return;
    }

    const { rest_url, nonce, post_id, attachments, currentUser, i18n } = ImageAnnotatorAdmin;

    const metabox = document.getElementById('arwai-azi-viewer-metabox');
    if (!metabox) return;

    const hiddenField     = document.getElementById('arwai_azi_viewer_image_ids');
    const addMediaBtn     = document.getElementById('arwai-azi-viewer-add-media');
    const statusBadge     = document.getElementById('arwai-azi-viewer-status');
    const statusText      = statusBadge ? statusBadge.querySelector('.status-text') : null;
    const viewerWrap      = document.getElementById('arwai-azi-viewer-admin-viewer-wrap');
    const emptyNotice     = document.getElementById('arwai-azi-viewer-empty-notice');
    const collectionList  = document.getElementById('arwai-azi-viewer-collection-list');

    let currentAttachments = Array.isArray(attachments) ? [...attachments] : [];
    let activeIndex = 0;

    let osdViewer = null;
    let osdAnno = null;
    let saveTimeout = null;

    // --- Status Indicator Helper ---
    function setStatus(state, message) {
        if (!statusBadge || !statusText) return;
        statusBadge.className = 'arwai-azi-viewer-status-badge ' + state;
        statusText.textContent = message || i18n[state] || state;
    }

    // --- Render Legacy-Style Sortable Collection List ---
    function renderCollectionList() {
        if (!collectionList) return;
        collectionList.innerHTML = '';

        if (currentAttachments.length === 0) {
            if (emptyNotice) emptyNotice.style.display = 'block';
            if (viewerWrap) viewerWrap.style.display = 'none';
            return;
        }

        if (emptyNotice) emptyNotice.style.display = 'none';
        if (viewerWrap) viewerWrap.style.display = 'block';

        currentAttachments.forEach((att, index) => {
            const li = document.createElement('li');
            li.className = 'collection-item' + (index === activeIndex ? ' active' : '');
            li.dataset.index = index;
            li.dataset.attachmentId = att.attachment_id;

            const filename = att.full_url ? att.full_url.substring(att.full_url.lastIndexOf('/') + 1) : `Attachment #${att.attachment_id}`;

            li.innerHTML = `
                <span class="drag-handle dashicons dashicons-menu"></span>
                <div class="item-thumb-box">
                    <img src="${att.thumb_url}" alt="Thumb" />
                </div>
                <div class="item-details">
                    <span class="item-title">${escapeHTML(filename)}</span>
                    <span class="item-id-badge">ID: ${att.attachment_id}</span>
                </div>
                <button type="button" class="button-link item-remove-btn" data-index="${index}" title="Remove image">&times;</button>
            `;

            li.addEventListener('click', (e) => {
                if (e.target.classList.contains('item-remove-btn')) {
                    e.stopPropagation();
                    const removeIdx = parseInt(e.target.dataset.index, 10);
                    removeAttachment(removeIdx);
                    return;
                }
                switchActiveImage(index);
            });

            collectionList.appendChild(li);
        });

        updateHiddenField();
        initSortable();
    }

    // Initialize jQuery UI Sortable
    function initSortable() {
        if (typeof jQuery !== 'undefined' && jQuery.fn.sortable && collectionList) {
            jQuery(collectionList).sortable({
                items: '> li',
                handle: '.drag-handle',
                cursor: 'move',
                placeholder: 'collection-sortable-placeholder',
                stop: function () {
                    const newOrder = [];
                    jQuery(collectionList).find('li').each(function () {
                        const attId = parseInt(jQuery(this).attr('data-attachment-id'), 10);
                        const found = currentAttachments.find(a => a.attachment_id === attId);
                        if (found) newOrder.push(found);
                    });
                    currentAttachments = newOrder;
                    updateHiddenField();
                }
            });
        }
    }

    function updateHiddenField() {
        if (!hiddenField) return;
        const ids = currentAttachments.map(a => a.attachment_id);
        hiddenField.value = JSON.stringify(ids);
    }

    function removeAttachment(index) {
        currentAttachments.splice(index, 1);
        if (activeIndex >= currentAttachments.length) {
            activeIndex = Math.max(0, currentAttachments.length - 1);
        }
        renderCollectionList();
        if (currentAttachments.length > 0) {
            initViewer();
        } else {
            destroyViewer();
        }
    }

    function switchActiveImage(index) {
        if (index === activeIndex && osdViewer) return;
        activeIndex = index;
        document.querySelectorAll('.collection-item').forEach((item, i) => {
            item.classList.toggle('active', i === activeIndex);
        });
        initViewer();
    }

    // --- Initialize OSD & Annotorious in Admin Meta Box ---
    function initViewer() {
        if (currentAttachments.length === 0) return;
        const activeAtt = currentAttachments[activeIndex];
        if (!activeAtt) return;

        destroyViewer();

        osdViewer = OpenSeadragon({
            id: 'arwai-azi-viewer-admin-osd-viewer',
            prefixUrl: '',
            tileSources: {
                type: 'image',
                url: activeAtt.full_url,
            },
            showNavigationControl: true,
            gestureSettingsMouse: { clickToZoom: false },
        });

        osdViewer.addHandler('open', () => {
            if (typeof OpenSeadragon.Annotorious === 'function') {
                osdAnno = OpenSeadragon.Annotorious(osdViewer, {
                    readOnly: false,
                });

                if (currentUser && currentUser.id) {
                    osdAnno.setAuthInfo({ id: currentUser.id, displayName: currentUser.displayName });
                }

                loadAnnotations(activeAtt.attachment_id);

                osdAnno.on('createAnnotation', (annotation) => saveAnnotation('CREATE', activeAtt.attachment_id, annotation));
                osdAnno.on('updateAnnotation', (annotation) => saveAnnotation('UPDATE', activeAtt.attachment_id, annotation));
                osdAnno.on('deleteAnnotation', (annotation) => deleteAnnotation(activeAtt.attachment_id, annotation));
            }
        });
    }

    function destroyViewer() {
        if (osdAnno) { try { osdAnno.destroy(); } catch (e) {} osdAnno = null; }
        if (osdViewer) { try { osdViewer.destroy(); } catch (e) {} osdViewer = null; }
    }

    // --- REST API Async Calls ---
    function loadAnnotations(attachmentId) {
        setStatus('saving', i18n.saving);
        fetch(`${rest_url}annotations/attachment/${attachmentId}`, {
            headers: { 'X-WP-Nonce': nonce },
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && osdAnno) {
                osdAnno.clearAnnotations();
                osdAnno.setAnnotations(data);
            }
            setStatus('saved', i18n.saved);
        })
        .catch(err => {
            console.error('Error loading annotations:', err);
            setStatus('error', i18n.error);
        });
    }

    function saveAnnotation(actionType, attachmentId, annotation) {
        clearTimeout(saveTimeout);
        setStatus('saving', i18n.saving);

        saveTimeout = setTimeout(() => {
            fetch(`${rest_url}annotations/attachment/${attachmentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce,
                },
                body: JSON.stringify({
                    post_id: post_id,
                    annotation: annotation,
                }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStatus('saved', i18n.saved);
                } else {
                    setStatus('error', i18n.error);
                }
            })
            .catch(err => {
                console.error(`Error ${actionType} annotation:`, err);
                setStatus('error', i18n.error);
            });
        }, 250);
    }

    function deleteAnnotation(attachmentId, annotation) {
        setStatus('saving', i18n.saving);
        const encodedId = encodeURIComponent(annotation.id);

        fetch(`${rest_url}annotations/attachment/${attachmentId}/${encodedId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': nonce,
            },
            body: JSON.stringify({ annotation }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setStatus('saved', i18n.saved);
            } else {
                setStatus('error', i18n.error);
            }
        })
        .catch(err => {
            console.error('Error deleting annotation:', err);
            setStatus('error', i18n.error);
        });
    }

    // --- WP Media Frame Integration ---
    if (addMediaBtn && typeof wp !== 'undefined' && wp.media) {
        let mediaFrame;

        addMediaBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (mediaFrame) {
                mediaFrame.open();
                return;
            }

            mediaFrame = wp.media({
                title: i18n.selectMedia,
                button: { text: i18n.useImages },
                multiple: true,
                library: { type: 'image' },
            });

            mediaFrame.on('select', () => {
                const selection = mediaFrame.state().get('selection');
                selection.each((att) => {
                    const id = att.id;
                    const exists = currentAttachments.some(a => a.attachment_id === id);
                    if (!exists) {
                        const fullUrl = att.attributes.url;
                        const thumbUrl = att.attributes.sizes && att.attributes.sizes.thumbnail ? att.attributes.sizes.thumbnail.url : fullUrl;
                        currentAttachments.push({
                            attachment_id: id,
                            full_url: fullUrl,
                            thumb_url: thumbUrl,
                            width: att.attributes.width,
                            height: att.attributes.height,
                        });
                    }
                });

                renderCollectionList();
                initViewer();
            });

            mediaFrame.open();
        });
    }

    function escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // Initial render
    renderCollectionList();
    if (currentAttachments.length > 0) {
        initViewer();
    }
});
