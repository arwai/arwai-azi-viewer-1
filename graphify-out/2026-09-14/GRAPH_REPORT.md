# Graph Report - arwai-azi-viewer  (2026-09-14)

## Corpus Check
- 43 files · ~44,267 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1585 nodes · 2962 edges · 158 communities (130 shown, 28 thin omitted)
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 606 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bcb70f35`
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
- Annotorious Vendor
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
- showEnlargeBtn
- keywords
- Ts
- hr
- ah
- bh
- cardBorderColor
- keywords
- keywords
- Bc
- cr
- CS
- kS
- align
- Ms
- cd
- Cs
- wy
- Ih
- jh
- pi
- filmstripBorderColor
- filmstripBorderRadius
- filmstripMargin
- hideFilmstripMobile
- targetViewerId
- ef
- Kh
- lx
- filmstripThumbRadius
- overrideDefaultBorderColor
- overrideHoverBadgeShadow
- Ea
- viewerId
- showAnnotationsBtn
- showInfoBtn
- align
- overrideBadgeBg
- viewerId
- ef
- eo
- gridJustifyContent

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
- `qw()` --indirect_call--> `n()`  [INFERRED]
  assets/vendor/annotorious/openseadragon-annotorious.min.js → assets/vendor/annotorious/annotorious.min.js
- `x0()` --indirect_call--> `r()`  [INFERRED]
  assets/vendor/annotorious/annotorious.min.js → assets/vendor/annotorious/openseadragon-annotorious.min.js
- `G0()` --indirect_call--> `r()`  [INFERRED]
  assets/vendor/annotorious/annotorious.min.js → assets/vendor/annotorious/openseadragon-annotorious.min.js
- `xr()` --indirect_call--> `e()`  [INFERRED]
  assets/vendor/annotorious/openseadragon-annotorious.min.js → assets/vendor/openseadragon/openseadragon.min.js

## Import Cycles
- None detected.

## Communities (158 total, 28 thin omitted)

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
Cohesion: 0.08
Nodes (24): 1. Annotated Image Viewer (`arwai/azi-viewer`), 1. Global Plugin Settings (`wp_options`), 1. Screen Reader & ARIA Architecture, 1. Tabbed Admin Settings Interface, 2. Annotation Cards List (`arwai/azi-viewer-annotation-list`), 2. Block Structure & Image Routing (`wp_postmeta` on Post/Page ID), 2. Focus Management & Focus Trap, 2. Standalone UI Blocks & Editor Previews (+16 more)

### Community 8 - "OpenSeadragon Vendor"
Cohesion: 0.14
Nodes (14): background, text, center, full, left, right, wide, margin (+6 more)

### Community 9 - "Annotorious Vendor"
Cohesion: 0.02
Nodes (35): Ae(), Be(), cl(), d1(), E1(), ed(), Ee(), f1() (+27 more)

### Community 13 - "OpenSeadragon Vendor"
Cohesion: 0.02
Nodes (52): aa(), ba(), Be(), bf(), bl(), Bo(), cf(), dh() (+44 more)

### Community 14 - "Annotorious Vendor"
Cohesion: 0.33
Nodes (6): center, full, left, right, wide, align

### Community 15 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (32): a0(), al(), e0(), En(), Fa(), i0(), il(), Jn() (+24 more)

### Community 17 - "Admin Component"
Cohesion: 0.50
Nodes (3): Antigravity Agent Directives, Model Hand-off, Workspace Restraints

### Community 18 - "Annotorious Vendor"
Cohesion: 0.20
Nodes (10): attributes, cardBorderColor, hoverBorderColor, hoverTextColor, default, type, default, type (+2 more)

### Community 19 - "OpenSeadragon Vendor"
Cohesion: 0.50
Nodes (4): hr(), nb(), rb(), tb()

### Community 20 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): showInfoBtn, default, type

### Community 21 - "OpenSeadragon Vendor"
Cohesion: 0.33
Nodes (18): a(), b(), C(), f(), g(), H(), i(), k() (+10 more)

### Community 22 - "Database Layer"
Cohesion: 0.05
Nodes (12): cd(), Ds(), gc(), IS, nS(), q0(), Qc(), $r() (+4 more)

### Community 23 - "REST API Controller"
Cohesion: 0.67
Nodes (3): hoverBackgroundColor, default, type

### Community 24 - "Annotorious Vendor"
Cohesion: 0.20
Nodes (10): attributes, containerBorderStyle, containerBorderWidth, targetViewerId, default, type, default, type (+2 more)

### Community 25 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideDefaultFillColor, default, type

### Community 26 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (21): ac(), ei(), Fr(), gd(), Gf(), Gi(), Ht(), ic() (+13 more)

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

### Community 37 - "Annotorious Vendor"
Cohesion: 0.40
Nodes (5): Gi(), ib(), nb(), qi(), tb()

### Community 38 - "sequence-filmstrip/block.json"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 39 - "cardBorderRadius"
Cohesion: 0.50
Nodes (4): F(), H(), k(), x()

### Community 40 - "Zn"
Cohesion: 0.67
Nodes (3): ab(), gr(), pb()

### Community 41 - "openseadragon.min.js"
Cohesion: 0.05
Nodes (22): _checkForAPIOverrides(), _cleanupImageData(), constructor(), destroy(), _imageUnloadedHandler(), isTainted(), _makeFirstPassShaderProgram(), _makeQuadVertexBuffer() (+14 more)

### Community 43 - "t"
Cohesion: 0.11
Nodes (4): _createDrawingElement(), _getCanvasCenter(), requestDrawer(), t()

### Community 44 - "Di"
Cohesion: 0.11
Nodes (29): Ae(), Ai(), aw(), Co(), Di(), ec(), ew(), Hn() (+21 more)

### Community 45 - "Di"
Cohesion: 0.11
Nodes (23): aa(), af(), Bi(), Bt(), Ce(), Di(), ef(), Jc() (+15 more)

### Community 46 - "Includes Module"
Cohesion: 0.67
Nodes (3): infoMessage, default, type

### Community 47 - "Annotorious Vendor"
Cohesion: 0.32
Nodes (5): containerBorderRadius, default, type, Edit(), parseCssUnit()

### Community 48 - "Jn"
Cohesion: 0.67
Nodes (3): hn(), kr(), nf()

### Community 49 - "dc"
Cohesion: 0.40
Nodes (6): c1(), Jl(), l1(), s1(), si(), u1()

### Community 50 - "Annotorious Vendor"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 51 - "_tileReadyHandler"
Cohesion: 0.18
Nodes (11): bg(), hd(), Jr(), ld(), pd(), _u(), ue(), vd() (+3 more)

### Community 52 - "Annotorious Vendor"
Cohesion: 0.50
Nodes (4): eS(), mh(), Ts(), xs()

### Community 53 - "supports"
Cohesion: 0.17
Nodes (12): backgroundImage, backgroundSize, background, gradients, text, aspectRatio, minHeight, supports (+4 more)

### Community 54 - "Annotorious Vendor"
Cohesion: 0.17
Nodes (4): bs(), Jn(), od(), sd()

### Community 55 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): simpleImageSize, default, type

### Community 56 - "align"
Cohesion: 0.06
Nodes (35): padding, color, __experimentalSkipSerialization, radius, style, width, background, __experimentalSkipSerialization (+27 more)

### Community 57 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): targetViewerId, default, type

### Community 58 - "Px"
Cohesion: 0.07
Nodes (17): ad(), at(), Ax, bn(), br(), dr(), ed(), fd() (+9 more)

### Community 59 - "Ts"
Cohesion: 0.12
Nodes (18): eb(), Ie(), kl(), ln(), Re(), eh(), En(), mr() (+10 more)

### Community 60 - "_drawDebugInfoOnTile"
Cohesion: 0.21
Nodes (9): _applyContext2dPipeline(), _drawDebugInfo(), _drawDebugInfoOnTile(), _drawPlaceholder(), _flip(), _offsetForRotation(), _restoreRotationChanges(), _setRotations() (+1 more)

### Community 61 - "overrideBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideBadgeShadow, default, type

### Community 62 - "overrideBadgeTextColor"
Cohesion: 0.67
Nodes (3): filmstripSize, default, type

### Community 63 - "overrideDefaultBorderColor"
Cohesion: 0.17
Nodes (11): apiVersion, category, description, editorScript, icon, name, $schema, style (+3 more)

### Community 64 - "overrideDefaultFillColor"
Cohesion: 0.67
Nodes (3): showFilmstrip, default, type

### Community 65 - "overrideHoverBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideHoverFillColor, default, type

### Community 66 - "overrideHoverBorderColor"
Cohesion: 0.67
Nodes (3): overrideHoverBorderColor, default, type

### Community 67 - "overrideHoverFillColor"
Cohesion: 0.25
Nodes (8): typography, __experimentalFontFamily, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight

### Community 68 - "overrideSelectedBorderColor"
Cohesion: 0.67
Nodes (3): overrideSelectedBorderColor, default, type

### Community 69 - "overrideSelectedFillColor"
Cohesion: 0.67
Nodes (3): overrideSelectedFillColor, default, type

### Community 70 - "showFilmstrip"
Cohesion: 0.50
Nodes (4): default, type, attributes, align

### Community 72 - "Ar"
Cohesion: 0.18
Nodes (11): Da(), Ar(), ga(), ma(), nf(), Oa(), qd(), Ra() (+3 more)

### Community 76 - "draw"
Cohesion: 0.27
Nodes (11): _calculateOverlapFraction(), clear(), draw(), _getBackupCanvasDrawer(), _getTileData(), makeRotation(), makeScaling(), _makeSecondPassShaderProgram() (+3 more)

### Community 77 - "Ke"
Cohesion: 0.11
Nodes (19): Ba(), c0(), Co(), _d(), eh(), f0(), ih(), Ke() (+11 more)

### Community 78 - "AnnotationController"
Cohesion: 0.27
Nodes (3): AnnotationController, WP_REST_Controller, WP_REST_Request

### Community 79 - "sequence-toolbar/index.js"
Cohesion: 0.12
Nodes (16): default, type, attributes, align, containerBorderColor, containerBorderStyle, containerBorderWidth, targetViewerId (+8 more)

### Community 81 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): imageIds, default, type

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
Nodes (3): targetViewerId, default, type

### Community 86 - "enableTruncation"
Cohesion: 0.67
Nodes (3): enableTruncation, default, type

### Community 87 - "gridJustifyContent"
Cohesion: 0.67
Nodes (3): cardBorderRadius, default, type

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
Cohesion: 0.12
Nodes (16): default, type, attributes, align, containerBorderColor, containerBorderStyle, containerBorderWidth, showAnnotationsBtn (+8 more)

### Community 92 - "typography"
Cohesion: 0.67
Nodes (3): thumbBorderRadius, default, type

### Community 94 - "AdminMetaBox"
Cohesion: 0.25
Nodes (8): typography, __experimentalFontFamily, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight

### Community 98 - "showLessText"
Cohesion: 0.67
Nodes (3): showLessText, default, type

### Community 99 - "viewer/index.js"
Cohesion: 0.33
Nodes (4): overrideSelectedBadgeShadow, default, type, Edit()

### Community 100 - "pE"
Cohesion: 0.67
Nodes (3): thumbBorderWidth, default, type

### Community 101 - "SequenceFilmstripBlock"
Cohesion: 0.33
Nodes (6): color, __experimentalSkipSerialization, radius, style, width, border

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
Cohesion: 0.32
Nodes (5): containerBorderRadius, default, type, Edit(), parseCssUnit()

### Community 107 - "border"
Cohesion: 0.33
Nodes (6): color, __experimentalSkipSerialization, radius, style, width, border

### Community 108 - "align"
Cohesion: 0.33
Nodes (6): center, full, left, right, wide, align

### Community 109 - "sequence-filmstrip/edit.js"
Cohesion: 0.32
Nodes (5): containerBorderRadius, default, type, Edit(), parseCssUnit()

### Community 110 - "align"
Cohesion: 0.67
Nodes (3): mg(), vg(), yg()

### Community 111 - "border"
Cohesion: 0.14
Nodes (14): color, __experimentalSkipSerialization, radius, style, width, background, text, margin (+6 more)

### Community 113 - "hS"
Cohesion: 0.67
Nodes (3): height, default, type

### Community 115 - "showEnlargeBtn"
Cohesion: 0.67
Nodes (3): showEnlargeBtn, default, type

### Community 116 - "keywords"
Cohesion: 0.40
Nodes (5): action, annotations, buttons, toolbar, keywords

### Community 117 - "Ts"
Cohesion: 0.67
Nodes (3): loadingMethod, default, type

### Community 118 - "hr"
Cohesion: 0.67
Nodes (3): osdImageSize, default, type

### Community 119 - "ah"
Cohesion: 0.67
Nodes (3): hideFilmstripMobile, default, type

### Community 120 - "bh"
Cohesion: 0.50
Nodes (3): bh(), ji(), Wi()

### Community 121 - "cardBorderColor"
Cohesion: 0.67
Nodes (3): cardBorderWidth, default, type

### Community 122 - "keywords"
Cohesion: 0.50
Nodes (4): annotator, image, gallery, keywords

### Community 123 - "keywords"
Cohesion: 0.50
Nodes (4): cards, list, annotations, keywords

### Community 126 - "CS"
Cohesion: 0.06
Nodes (102): a(), A1(), b(), bd(), C(), de(), dn(), $e() (+94 more)

### Community 128 - "align"
Cohesion: 0.67
Nodes (3): default, type, align

### Community 132 - "cd"
Cohesion: 0.50
Nodes (4): blockGap, margin, padding, spacing

### Community 134 - "wy"
Cohesion: 0.67
Nodes (3): ft(), gu(), wy()

### Community 138 - "pi"
Cohesion: 0.67
Nodes (3): pi(), Qr(), xt()

### Community 140 - "filmstripBorderRadius"
Cohesion: 0.25
Nodes (8): bS(), cc(), fc(), mc(), pc(), V1(), vc(), yS()

### Community 141 - "filmstripMargin"
Cohesion: 0.07
Nodes (28): color, __experimentalDefaultControls, radius, style, width, background, gradients, text (+20 more)

### Community 142 - "hideFilmstripMobile"
Cohesion: 0.67
Nodes (3): columns, default, type

### Community 143 - "targetViewerId"
Cohesion: 0.67
Nodes (3): width, default, type

### Community 146 - "ef"
Cohesion: 0.67
Nodes (3): selectedBorderColor, default, type

### Community 149 - "filmstripThumbRadius"
Cohesion: 0.67
Nodes (3): thumbBorderColor, default, type

### Community 150 - "overrideDefaultBorderColor"
Cohesion: 0.67
Nodes (3): overrideDefaultBorderColor, default, type

### Community 151 - "overrideHoverBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideHoverBadgeShadow, default, type

### Community 153 - "Ea"
Cohesion: 0.67
Nodes (3): overrideBadgeTextColor, default, type

### Community 155 - "viewerId"
Cohesion: 0.67
Nodes (3): cd(), gr(), Qn()

### Community 156 - "showAnnotationsBtn"
Cohesion: 0.67
Nodes (3): default, type, align

### Community 158 - "showInfoBtn"
Cohesion: 0.67
Nodes (3): cardMinWidth, default, type

### Community 159 - "align"
Cohesion: 0.67
Nodes (3): cardMaxLines, default, type

### Community 160 - "overrideBadgeBg"
Cohesion: 0.67
Nodes (3): overrideBadgeBg, default, type

### Community 161 - "viewerId"
Cohesion: 0.67
Nodes (3): viewerId, default, type

### Community 162 - "ef"
Cohesion: 0.67
Nodes (3): hoverBorderColor, default, type

### Community 163 - "eo"
Cohesion: 0.67
Nodes (3): containerBorderColor, default, type

### Community 171 - "gridJustifyContent"
Cohesion: 0.67
Nodes (3): gridJustifyContent, default, type

## Knowledge Gaps
- **369 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+364 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `n()` connect `CS` to `Annotorious Vendor`, `filmstripBorderRadius`, `OpenSeadragon Vendor`, `OpenSeadragon Vendor`, `Database Layer`, `Annotorious Vendor`, `Annotorious Vendor`, `cardBorderRadius`, `Zn`, `t`, `Di`, `Jn`, `dc`, `_tileReadyHandler`, `Px`, `Ts`, `viewer/edit.js`, `Ke`, `ch`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `Qe()` connect `OpenSeadragon Vendor` to `Ts`, `OpenSeadragon Vendor`, `CS`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `e()` connect `CS` to `Annotorious Vendor`, `openseadragon.min.js`, `viewer/edit.js`, `OpenSeadragon Vendor`, `Ke`, `Ie`, `OpenSeadragon Vendor`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 58 inferred relationships involving `n()` (e.g. with `Be()` and `$e()`) actually correct?**
  _`n()` has 58 INFERRED edges - model-reasoned connections that need verification._
- **Are the 52 inferred relationships involving `r()` (e.g. with `bd()` and `.renderWidget()`) actually correct?**
  _`r()` has 52 INFERRED edges - model-reasoned connections that need verification._
- **Are the 50 inferred relationships involving `o()` (e.g. with `_d()` and `.renderWidget()`) actually correct?**
  _`o()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 39 inferred relationships involving `i()` (e.g. with `a()` and `bd()`) actually correct?**
  _`i()` has 39 INFERRED edges - model-reasoned connections that need verification._