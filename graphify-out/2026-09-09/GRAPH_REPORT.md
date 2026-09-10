# Graph Report - arwai-azi-viewer  (2026-09-09)

## Corpus Check
- 43 files · ~40,920 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1541 nodes · 2917 edges · 149 communities (120 shown, 29 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 607 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b4a7993d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Annotorious Vendor
- Annotorious Vendor
- Admin Component
- Admin Component
- Annotorious Vendor
- OpenSeadragon Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Database Layer
- REST API Controller
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Blocks Component
- Annotorious Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Public Frontend
- sequence-filmstrip/block.json
- cardBorderRadius
- Zn
- openseadragon.min.js
- t
- t
- Di
- Di
- Includes Module
- Annotorious Vendor
- Jn
- dc
- Annotorious Vendor
- _tileReadyHandler
- Annotorious Vendor
- supports
- Annotorious Vendor
- Annotorious Vendor
- align
- Annotorious Vendor
- Px
- Ts
- _drawDebugInfoOnTile
- overrideBadgeShadow
- overrideBadgeTextColor
- overrideDefaultBorderColor
- overrideDefaultFillColor
- overrideHoverBadgeShadow
- overrideHoverBorderColor
- overrideHoverFillColor
- overrideSelectedBorderColor
- overrideSelectedFillColor
- showFilmstrip
- Ar
- loadingMethod
- viewer/edit.js
- bn
- draw
- Ke
- AnnotationController
- sequence-toolbar/index.js
- .findDOMNode
- showFilmstrip
- ch
- cardMaxWidth
- typography
- cardMinWidth
- enableTruncation
- gridJustifyContent
- postId
- readMoreText
- annotation-list/edit.js
- action-pill/block.json
- typography
- ViewerBlock
- AdminMetaBox
- Plugin.php
- AnnotationListBlock
- Plugin
- showLessText
- viewer/index.js
- pE
- SequenceFilmstripBlock
- fb
- keywords
- keywords
- action-toolbar/index.js
- border
- align
- sequence-filmstrip/edit.js
- align
- border
- Ie
- hS
- Xu
- qi
- keywords
- Ts
- hr
- ah
- bh
- .draw
- keywords
- keywords
- Bc
- cr
- CS
- kS
- mg
- Ms
- Uc
- Be
- cd
- Cs
- wy
- gy
- Ih
- jh
- pi
- filmstripBorderColor
- filmstripBorderRadius
- filmstripMargin
- hideFilmstripMobile
- showFilmstrip
- targetViewerId
- spacing
- Nc
- Kh
- lx

## God Nodes (most connected - your core abstractions)
1. `n()` - 77 edges
2. `r()` - 61 edges
3. `o()` - 54 edges
4. `i()` - 46 edges
5. `m()` - 43 edges
6. `s()` - 41 edges
7. `t()` - 40 edges
8. `t()` - 39 edges
9. `v()` - 38 edges
10. `a()` - 38 edges

## Surprising Connections (you probably didn't know these)
- `initFrontendViewer()` --indirect_call--> `e()`  [INFERRED]
  src/viewer/view.js → assets/vendor/openseadragon/openseadragon.min.js
- `x0()` --indirect_call--> `r()`  [INFERRED]
  assets/vendor/annotorious/annotorious.min.js → assets/vendor/annotorious/openseadragon-annotorious.min.js
- `G0()` --indirect_call--> `r()`  [INFERRED]
  assets/vendor/annotorious/annotorious.min.js → assets/vendor/annotorious/openseadragon-annotorious.min.js
- `$d()` --indirect_call--> `Q()`  [INFERRED]
  assets/vendor/annotorious/openseadragon-annotorious.min.js → assets/vendor/annotorious/annotorious.min.js
- `Ni()` --indirect_call--> `r()`  [INFERRED]
  assets/vendor/annotorious/annotorious.min.js → assets/vendor/annotorious/openseadragon-annotorious.min.js

## Import Cycles
- None detected.

## Communities (149 total, 29 thin omitted)

### Community 2 - "Annotorious Vendor"
Cohesion: 0.05
Nodes (125): a(), A1(), Ae(), b(), bd(), Be(), C(), de() (+117 more)

### Community 3 - "Annotorious Vendor"
Cohesion: 0.15
Nodes (12): apiVersion, category, description, editorScript, icon, name, $schema, style (+4 more)

### Community 4 - "OpenSeadragon Vendor"
Cohesion: 0.15
Nodes (12): apiVersion, category, description, editorScript, icon, name, $schema, style (+4 more)

### Community 5 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (21): author, bugs, url, description, devDependencies, @wordpress/scripts, homepage, keywords (+13 more)

### Community 7 - "Annotorious Vendor"
Cohesion: 0.10
Nodes (20): 1. Annotated Image Viewer (`arwai/azi-viewer`), 1. Global Plugin Settings (`wp_options`), 1. Tabbed Admin Settings Interface, 2. Annotation Cards List (`arwai/azi-viewer-annotation-list`), 2. Block Structure & Image Routing (`wp_postmeta` on Post/Page ID), 2. Standalone UI Blocks & Editor Previews, 3. Accessibility Enhancements, 3. Annotation Data (`wp_postmeta` on Attachment ID) (+12 more)

### Community 8 - "OpenSeadragon Vendor"
Cohesion: 0.25
Nodes (8): background, text, margin, padding, supports, color, shadow, spacing

### Community 9 - "Annotorious Vendor"
Cohesion: 0.02
Nodes (37): ab(), cl(), d1(), E1(), ed(), Ee(), f1(), Fo() (+29 more)

### Community 13 - "OpenSeadragon Vendor"
Cohesion: 0.02
Nodes (38): aa(), ba(), bf(), bl(), dh(), Ea(), ef(), eo() (+30 more)

### Community 14 - "Annotorious Vendor"
Cohesion: 0.18
Nodes (11): background, text, center, full, left, right, wide, supports (+3 more)

### Community 17 - "Admin Component"
Cohesion: 0.50
Nodes (3): Antigravity Agent Directives, Model Hand-off, Workspace Restraints

### Community 18 - "Annotorious Vendor"
Cohesion: 0.20
Nodes (10): attributes, columns, hoverBorderColor, targetViewerId, default, type, default, type (+2 more)

### Community 19 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): cardBorderColor, default, type

### Community 20 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): cardBorderWidth, default, type

### Community 21 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): cardMaxLines, default, type

### Community 22 - "Database Layer"
Cohesion: 0.05
Nodes (12): cd(), Ds(), gc(), IS, nS(), q0(), Qc(), $r() (+4 more)

### Community 23 - "REST API Controller"
Cohesion: 0.67
Nodes (3): hoverBackgroundColor, default, type

### Community 24 - "Annotorious Vendor"
Cohesion: 0.13
Nodes (15): default, type, attributes, align, filmstripBgColor, filmstripBorderWidth, filmstripSize, filmstripThumbRadius (+7 more)

### Community 25 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideDefaultFillColor, default, type

### Community 26 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hoverTextColor, default, type

### Community 30 - "Blocks Component"
Cohesion: 0.67
Nodes (3): selectedBackgroundColor, default, type

### Community 31 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): selectedBorderColor, default, type

### Community 32 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): selectedTextColor, default, type

### Community 33 - "OpenSeadragon Vendor"
Cohesion: 0.09
Nodes (10): ce(), dn(), ix(), lr(), nE(), nx(), Qe(), xn() (+2 more)

### Community 35 - "Public Frontend"
Cohesion: 0.67
Nodes (3): viewerId, default, type

### Community 38 - "sequence-filmstrip/block.json"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 39 - "cardBorderRadius"
Cohesion: 0.67
Nodes (3): cardBorderRadius, default, type

### Community 40 - "Zn"
Cohesion: 0.08
Nodes (34): a0(), al(), e0(), En(), Fa(), i0(), il(), Jn() (+26 more)

### Community 41 - "openseadragon.min.js"
Cohesion: 0.06
Nodes (5): isTainted(), minimumOverlapRequired(), _renderToClippingCanvas(), _setClip(), viewportCoordToDrawerCoord()

### Community 42 - "t"
Cohesion: 0.07
Nodes (31): ac(), Ba(), c0(), _d(), ei(), f0(), Fr(), gd() (+23 more)

### Community 43 - "t"
Cohesion: 0.12
Nodes (3): _getCanvasCenter(), requestDrawer(), t()

### Community 44 - "Di"
Cohesion: 0.12
Nodes (27): Ae(), Ai(), aw(), Co(), Di(), ec(), ew(), Hn() (+19 more)

### Community 45 - "Di"
Cohesion: 0.11
Nodes (23): aa(), af(), Bi(), Bt(), Ce(), Di(), ef(), Jc() (+15 more)

### Community 46 - "Includes Module"
Cohesion: 0.67
Nodes (3): imageIds, default, type

### Community 47 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): infoMessage, default, type

### Community 48 - "Jn"
Cohesion: 0.10
Nodes (12): at(), Bo(), bs(), dr(), hr(), Jn(), Kn(), od() (+4 more)

### Community 49 - "dc"
Cohesion: 0.12
Nodes (15): bS(), c1(), cc(), dc(), fc(), Jl(), l1(), mc() (+7 more)

### Community 50 - "Annotorious Vendor"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 51 - "_tileReadyHandler"
Cohesion: 0.14
Nodes (15): _checkForAPIOverrides(), _cleanupImageData(), constructor(), _createDrawingElement(), _imageUnloadedHandler(), _makeFirstPassShaderProgram(), _makeQuadVertexBuffer(), _raiseDrawerErrorEvent() (+7 more)

### Community 52 - "Annotorious Vendor"
Cohesion: 0.20
Nodes (10): attributes, osdImageSize, overrideDefaultBorderColor, overrideHoverBadgeShadow, default, type, default, type (+2 more)

### Community 53 - "supports"
Cohesion: 0.06
Nodes (36): backgroundImage, backgroundSize, color, __experimentalSkipSerialization, radius, style, width, background (+28 more)

### Community 54 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): postId, default, type

### Community 55 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): simpleImageSize, default, type

### Community 56 - "align"
Cohesion: 0.06
Nodes (35): padding, color, __experimentalSkipSerialization, radius, style, width, background, __experimentalSkipSerialization (+27 more)

### Community 57 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): default, type, align

### Community 58 - "Px"
Cohesion: 0.11
Nodes (4): ad(), Ax, ed(), Px

### Community 59 - "Ts"
Cohesion: 0.18
Nodes (13): eh(), En(), mr(), nh(), Ot(), Pf(), pr(), th() (+5 more)

### Community 60 - "_drawDebugInfoOnTile"
Cohesion: 0.23
Nodes (9): _applyContext2dPipeline(), _drawDebugInfo(), _drawDebugInfoOnTile(), _drawPlaceholder(), _flip(), _offsetForRotation(), _restoreRotationChanges(), _setRotations() (+1 more)

### Community 61 - "overrideBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideBadgeShadow, default, type

### Community 62 - "overrideBadgeTextColor"
Cohesion: 0.67
Nodes (3): loadingMethod, default, type

### Community 63 - "overrideDefaultBorderColor"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 64 - "overrideDefaultFillColor"
Cohesion: 0.67
Nodes (3): overrideBadgeBg, default, type

### Community 65 - "overrideHoverBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideHoverFillColor, default, type

### Community 66 - "overrideHoverBorderColor"
Cohesion: 0.67
Nodes (3): overrideHoverBorderColor, default, type

### Community 67 - "overrideHoverFillColor"
Cohesion: 0.18
Nodes (11): bg(), hd(), Jr(), ld(), pd(), _u(), ue(), vd() (+3 more)

### Community 68 - "overrideSelectedBorderColor"
Cohesion: 0.67
Nodes (3): overrideSelectedBorderColor, default, type

### Community 69 - "overrideSelectedFillColor"
Cohesion: 0.67
Nodes (3): overrideSelectedFillColor, default, type

### Community 70 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): default, type, align

### Community 72 - "Ar"
Cohesion: 0.18
Nodes (11): Da(), Ar(), ga(), ma(), nf(), Oa(), qd(), Ra() (+3 more)

### Community 73 - "loadingMethod"
Cohesion: 0.14
Nodes (14): color, __experimentalSkipSerialization, radius, style, width, background, text, margin (+6 more)

### Community 74 - "viewer/edit.js"
Cohesion: 0.67
Nodes (3): cardMaxHeight, default, type

### Community 75 - "bn"
Cohesion: 0.22
Nodes (11): bn(), br(), fd(), la(), ld(), pd(), Qs(), Rs() (+3 more)

### Community 76 - "draw"
Cohesion: 0.27
Nodes (11): _calculateOverlapFraction(), clear(), draw(), _getBackupCanvasDrawer(), _getTileData(), makeRotation(), makeScaling(), _makeSecondPassShaderProgram() (+3 more)

### Community 77 - "Ke"
Cohesion: 0.20
Nodes (10): Co(), eh(), ih(), Ke(), M0(), nh(), Nn(), oh() (+2 more)

### Community 79 - "sequence-toolbar/index.js"
Cohesion: 0.22
Nodes (8): default, type, attributes, align, targetViewerId, default, type, Edit()

### Community 81 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): overrideBadgeTextColor, default, type

### Community 82 - "ch"
Cohesion: 0.32
Nodes (3): ch(), hh(), oh()

### Community 83 - "cardMaxWidth"
Cohesion: 0.67
Nodes (3): cardMaxWidth, default, type

### Community 84 - "typography"
Cohesion: 0.25
Nodes (8): typography, __experimentalFontFamily, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight

### Community 85 - "cardMinWidth"
Cohesion: 0.67
Nodes (3): cardMinWidth, default, type

### Community 86 - "enableTruncation"
Cohesion: 0.67
Nodes (3): enableTruncation, default, type

### Community 87 - "gridJustifyContent"
Cohesion: 0.67
Nodes (3): gridJustifyContent, default, type

### Community 88 - "postId"
Cohesion: 0.67
Nodes (3): postId, default, type

### Community 89 - "readMoreText"
Cohesion: 0.67
Nodes (3): readMoreText, default, type

### Community 90 - "annotation-list/edit.js"
Cohesion: 0.32
Nodes (5): cardBorderStyle, default, type, Edit(), parseCssUnit()

### Community 91 - "action-pill/block.json"
Cohesion: 0.15
Nodes (13): default, type, attributes, align, showAnnotationsBtn, showEnlargeBtn, targetViewerId, default (+5 more)

### Community 92 - "typography"
Cohesion: 0.25
Nodes (8): typography, __experimentalFontFamily, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight

### Community 94 - "AdminMetaBox"
Cohesion: 0.25
Nodes (8): typography, __experimentalFontFamily, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight

### Community 98 - "showLessText"
Cohesion: 0.67
Nodes (3): showLessText, default, type

### Community 99 - "viewer/index.js"
Cohesion: 0.33
Nodes (4): overrideSelectedBadgeShadow, default, type, Edit()

### Community 102 - "fb"
Cohesion: 0.40
Nodes (6): fb(), lb(), Rc(), sb(), Yi(), Zi()

### Community 103 - "keywords"
Cohesion: 0.33
Nodes (6): carousel, filmstrip, thumbnails, gallery, sequence, keywords

### Community 104 - "keywords"
Cohesion: 0.33
Nodes (6): nav, pagination, buttons, sequence, toolbar, keywords

### Community 106 - "action-toolbar/index.js"
Cohesion: 0.40
Nodes (4): showInfoBtn, default, type, Edit()

### Community 107 - "border"
Cohesion: 0.33
Nodes (6): color, __experimentalSkipSerialization, radius, style, width, border

### Community 108 - "align"
Cohesion: 0.33
Nodes (6): center, full, left, right, wide, align

### Community 109 - "sequence-filmstrip/edit.js"
Cohesion: 0.47
Nodes (3): default, Edit(), parseCssUnit()

### Community 110 - "align"
Cohesion: 0.33
Nodes (6): center, full, left, right, wide, align

### Community 111 - "border"
Cohesion: 0.33
Nodes (6): color, __experimentalSkipSerialization, radius, style, width, border

### Community 112 - "Ie"
Cohesion: 0.40
Nodes (5): eb(), Ie(), kl(), ln(), Re()

### Community 115 - "qi"
Cohesion: 0.40
Nodes (5): Gi(), ib(), nb(), qi(), tb()

### Community 116 - "keywords"
Cohesion: 0.40
Nodes (5): action, annotations, buttons, toolbar, keywords

### Community 117 - "Ts"
Cohesion: 0.50
Nodes (4): eS(), mh(), Ts(), xs()

### Community 118 - "hr"
Cohesion: 0.50
Nodes (4): hr(), nb(), rb(), tb()

### Community 119 - "ah"
Cohesion: 0.50
Nodes (4): ah(), lS(), qc(), Zs()

### Community 120 - "bh"
Cohesion: 0.50
Nodes (3): bh(), ji(), Wi()

### Community 121 - ".draw"
Cohesion: 0.50
Nodes (3): destroy(), setImageSmoothingEnabled(), _unloadTextures()

### Community 122 - "keywords"
Cohesion: 0.50
Nodes (4): annotator, image, gallery, keywords

### Community 123 - "keywords"
Cohesion: 0.50
Nodes (4): cards, list, annotations, keywords

### Community 128 - "mg"
Cohesion: 0.67
Nodes (3): mg(), vg(), yg()

### Community 131 - "Be"
Cohesion: 0.67
Nodes (3): Be(), cf(), hf()

### Community 132 - "cd"
Cohesion: 0.67
Nodes (3): cd(), gr(), Qn()

### Community 134 - "wy"
Cohesion: 0.67
Nodes (3): ft(), gu(), wy()

### Community 135 - "gy"
Cohesion: 0.67
Nodes (3): gy(), my(), yy()

### Community 138 - "pi"
Cohesion: 0.67
Nodes (3): pi(), Qr(), xt()

### Community 139 - "filmstripBorderColor"
Cohesion: 0.67
Nodes (3): filmstripBorderColor, default, type

### Community 140 - "filmstripBorderRadius"
Cohesion: 0.67
Nodes (3): filmstripBorderRadius, default, type

### Community 141 - "filmstripMargin"
Cohesion: 0.67
Nodes (3): filmstripMargin, default, type

### Community 142 - "hideFilmstripMobile"
Cohesion: 0.67
Nodes (3): hideFilmstripMobile, default, type

### Community 143 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): showFilmstrip, default, type

### Community 144 - "targetViewerId"
Cohesion: 0.67
Nodes (3): targetViewerId, default, type

### Community 145 - "spacing"
Cohesion: 0.67
Nodes (3): margin, padding, spacing

## Knowledge Gaps
- **346 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+341 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `n()` connect `Annotorious Vendor` to `OpenSeadragon Vendor`, `overrideHoverFillColor`, `Annotorious Vendor`, `t`, `bn`, `t`, `Di`, `Ke`, `Jn`, `dc`, `ch`, `qi`, `Database Layer`, `Ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `Qe()` connect `OpenSeadragon Vendor` to `Annotorious Vendor`, `Ts`, `OpenSeadragon Vendor`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `e()` connect `Annotorious Vendor` to `OpenSeadragon Vendor`, `openseadragon.min.js`, `t`, `Annotorious Vendor`, `dc`, `qi`, `_tileReadyHandler`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 58 inferred relationships involving `n()` (e.g. with `Be()` and `$e()`) actually correct?**
  _`n()` has 58 INFERRED edges - model-reasoned connections that need verification._
- **Are the 52 inferred relationships involving `r()` (e.g. with `bd()` and `.renderWidget()`) actually correct?**
  _`r()` has 52 INFERRED edges - model-reasoned connections that need verification._
- **Are the 50 inferred relationships involving `o()` (e.g. with `_d()` and `.renderWidget()`) actually correct?**
  _`o()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 39 inferred relationships involving `i()` (e.g. with `a()` and `bd()`) actually correct?**
  _`i()` has 39 INFERRED edges - model-reasoned connections that need verification._