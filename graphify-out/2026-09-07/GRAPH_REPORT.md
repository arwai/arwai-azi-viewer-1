# Graph Report - image-annotator-rebuild  (2026-09-07)

## Corpus Check
- 34 files · ~25,862 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 584 nodes · 653 edges · 98 communities (89 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb81cda2`
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
- Admin Component
- Blocks Component
- Annotorious Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Includes Module
- Public Frontend
- Annotorious Vendor
- Annotorious Vendor
- Includes Module
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- OpenSeadragon Vendor
- Includes Module
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- supports
- Annotorious Vendor
- Annotorious Vendor
- align
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Antigravity Agent Directives
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
- filmstripBorderColor
- loadingMethod
- viewer/edit.js
- postId
- width
- cardGap
- cardInnerPadding
- cardMinHeight
- cardTextAlignment
- showFilmstrip
- backgroundColor
- cardMaxWidth
- overrideCardTextColor
- cardMinWidth
- enableTruncation
- gridJustifyContent
- postId
- readMoreText
- action-pill/block.json
- AnnotationController
- ViewerBlock
- AdminMetaBox
- AnnotationListBlock
- Plugin
- showLessText

## God Nodes (most connected - your core abstractions)
1. `attributes` - 44 edges
2. `attributes` - 39 edges
3. `SettingsPage` - 23 edges
4. `Database` - 17 edges
5. `AnnotationController` - 10 edges
6. `attributes` - 10 edges
7. `string` - 9 edges
8. `number` - 9 edges
9. `ViewerBlock` - 8 edges
10. `initViewer()` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (98 total, 9 thin omitted)

### Community 2 - "Annotorious Vendor"
Cohesion: 0.36
Nodes (12): deleteAnnotation(), destroyViewer(), escapeHTML(), initSortable(), initViewer(), loadAnnotations(), removeAttachment(), renderCollectionList() (+4 more)

### Community 3 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (25): annotator, gallery, image, apiVersion, overrideSelectedBadgeShadow, category, description, editorScript (+17 more)

### Community 4 - "OpenSeadragon Vendor"
Cohesion: 0.09
Nodes (25): cards, list, apiVersion, overrideCardSelectedShadow, category, description, editorScript, icon (+17 more)

### Community 5 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (21): author, bugs, url, description, devDependencies, @wordpress/scripts, homepage, keywords (+13 more)

### Community 7 - "Annotorious Vendor"
Cohesion: 0.12
Nodes (16): 1. Annotated Image Viewer (`image-annotator/viewer`), 1. Global Plugin Settings (`wp_options`), 2. Annotation Cards List (`image-annotator/annotation-list`), 2. Block Structure & Image Routing (`wp_postmeta` on Post/Page ID), 3. Annotation Data (`wp_postmeta` on Attachment ID), Annotate Zoom Image Viewer, 🏗️ Architecture Overview, 💾 Data Storage & Schema (+8 more)

### Community 16 - "Admin Component"
Cohesion: 0.67
Nodes (3): selectedShadow, default, type

### Community 17 - "Admin Component"
Cohesion: 0.09
Nodes (29): borderRadius, borderWidth, filmstripBorderRadius, filmstripBorderWidth, filmstripMargin, filmstripSize, filmstripThumbRadius, margin (+21 more)

### Community 18 - "Annotorious Vendor"
Cohesion: 0.29
Nodes (7): attributes, backgroundColor, cardShadow, default, type, default, type

### Community 19 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): borderColor, default, type

### Community 20 - "Annotorious Vendor"
Cohesion: 0.18
Nodes (14): borderRadius, borderWidth, margin, padding, default, type, default, type (+6 more)

### Community 21 - "OpenSeadragon Vendor"
Cohesion: 0.08
Nodes (25): color, radius, style, width, background, text, center, full (+17 more)

### Community 22 - "Database Layer"
Cohesion: 0.67
Nodes (3): columns, default, type

### Community 23 - "REST API Controller"
Cohesion: 0.67
Nodes (3): hoverBackgroundColor, default, type

### Community 24 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hoverBorderColor, default, type

### Community 25 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hoverShadow, default, type

### Community 26 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hoverTextColor, default, type

### Community 27 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardBg, default, type

### Community 28 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardBorderColor, default, type

### Community 29 - "Admin Component"
Cohesion: 0.67
Nodes (3): overrideCardSelectedTextColor, default, type

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
Cohesion: 0.67
Nodes (3): targetViewerId, default, type

### Community 34 - "Includes Module"
Cohesion: 0.67
Nodes (3): overrideCardHoverBg, default, type

### Community 35 - "Public Frontend"
Cohesion: 0.67
Nodes (3): viewerId, default, type

### Community 36 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): borderColor, default, type

### Community 37 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardHoverBorderColor, default, type

### Community 38 - "Includes Module"
Cohesion: 0.67
Nodes (3): filmstripBgColor, default, type

### Community 39 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripBorderColor, default, type

### Community 40 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardHoverShadow, default, type

### Community 41 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardHoverTextColor, default, type

### Community 42 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardSelectedBg, default, type

### Community 43 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardSelectedBorderColor, default, type

### Community 44 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideCardShadow, default, type

### Community 45 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): height, default, type

### Community 46 - "Includes Module"
Cohesion: 0.67
Nodes (3): imageIds, default, type

### Community 47 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): infoMessage, default, type

### Community 48 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hideFilmstripMobile, default, type

### Community 49 - "Annotorious Vendor"
Cohesion: 0.07
Nodes (30): default, type, attributes, align, margin, navPillBgColor, navPillTextColor, padding (+22 more)

### Community 50 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): navPillBgColor, default, type

### Community 52 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): osdImageSize, default, type

### Community 53 - "supports"
Cohesion: 0.07
Nodes (30): color, radius, style, width, background, gradients, text, aspectRatio (+22 more)

### Community 54 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): postId, default, type

### Community 55 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): simpleImageSize, default, type

### Community 56 - "align"
Cohesion: 0.07
Nodes (27): color, radius, style, width, background, gradients, text, center (+19 more)

### Community 57 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): overrideBadgeBg, default, type

### Community 60 - "Antigravity Agent Directives"
Cohesion: 0.50
Nodes (3): Antigravity Agent Directives, Model Hand-off, Workspace Restraints

### Community 61 - "overrideBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideBadgeShadow, default, type

### Community 62 - "overrideBadgeTextColor"
Cohesion: 0.67
Nodes (3): overrideBadgeTextColor, default, type

### Community 63 - "overrideDefaultBorderColor"
Cohesion: 0.67
Nodes (3): overrideDefaultBorderColor, default, type

### Community 64 - "overrideDefaultFillColor"
Cohesion: 0.67
Nodes (3): overrideDefaultFillColor, default, type

### Community 65 - "overrideHoverBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideHoverFillColor, default, type

### Community 66 - "overrideHoverBorderColor"
Cohesion: 0.67
Nodes (3): overrideHoverBorderColor, default, type

### Community 67 - "overrideHoverFillColor"
Cohesion: 0.67
Nodes (3): overrideHoverBadgeShadow, default, type

### Community 68 - "overrideSelectedBorderColor"
Cohesion: 0.67
Nodes (3): overrideSelectedBorderColor, default, type

### Community 69 - "overrideSelectedFillColor"
Cohesion: 0.67
Nodes (3): overrideSelectedFillColor, default, type

### Community 70 - "showFilmstrip"
Cohesion: 0.29
Nodes (7): default, type, attributes, align, navPillTextColor, default, type

### Community 72 - "filmstripBorderColor"
Cohesion: 0.67
Nodes (3): textColor, default, type

### Community 73 - "loadingMethod"
Cohesion: 0.67
Nodes (3): loadingMethod, default, type

### Community 74 - "viewer/edit.js"
Cohesion: 0.67
Nodes (3): cardMaxHeight, default, type

### Community 75 - "postId"
Cohesion: 0.67
Nodes (3): default, type, align

### Community 76 - "width"
Cohesion: 0.67
Nodes (3): width, default, type

### Community 77 - "cardGap"
Cohesion: 0.67
Nodes (3): cardGap, default, type

### Community 78 - "cardInnerPadding"
Cohesion: 0.67
Nodes (3): cardInnerPadding, default, type

### Community 79 - "cardMinHeight"
Cohesion: 0.67
Nodes (3): cardMinHeight, default, type

### Community 80 - "cardTextAlignment"
Cohesion: 0.67
Nodes (3): cardTextAlignment, default, type

### Community 81 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): showFilmstrip, default, type

### Community 82 - "backgroundColor"
Cohesion: 0.67
Nodes (3): backgroundColor, default, type

### Community 83 - "cardMaxWidth"
Cohesion: 0.67
Nodes (3): cardMaxWidth, default, type

### Community 84 - "overrideCardTextColor"
Cohesion: 0.67
Nodes (3): overrideCardTextColor, default, type

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

### Community 91 - "action-pill/block.json"
Cohesion: 0.10
Nodes (23): action, buttons, pill, toolbar, apiVersion, category, description, editorScript (+15 more)

### Community 92 - "AnnotationController"
Cohesion: 0.27
Nodes (3): AnnotationController, WP_REST_Controller, WP_REST_Request

### Community 98 - "showLessText"
Cohesion: 0.67
Nodes (3): showLessText, default, type

## Knowledge Gaps
- **303 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `attributes` connect `Annotorious Vendor` to `OpenSeadragon Vendor`, `Admin Component`, `OpenSeadragon Vendor`, `Annotorious Vendor`, `Database Layer`, `REST API Controller`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Admin Component`, `Blocks Component`, `Annotorious Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Includes Module`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `filmstripBorderColor`, `viewer/edit.js`, `postId`, `cardGap`, `cardInnerPadding`, `cardMinHeight`, `cardTextAlignment`, `cardMaxWidth`, `overrideCardTextColor`, `cardMinWidth`, `enableTruncation`, `gridJustifyContent`, `postId`, `readMoreText`, `showLessText`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `attributes` connect `showFilmstrip` to `Annotorious Vendor`, `Admin Component`, `Public Frontend`, `Annotorious Vendor`, `Includes Module`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Includes Module`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `overrideBadgeShadow`, `overrideBadgeTextColor`, `overrideDefaultBorderColor`, `overrideDefaultFillColor`, `overrideHoverBadgeShadow`, `overrideHoverBorderColor`, `overrideHoverFillColor`, `overrideSelectedBorderColor`, `overrideSelectedFillColor`, `loadingMethod`, `width`, `showFilmstrip`, `backgroundColor`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `supports` connect `supports` to `Annotorious Vendor`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `SettingsPage` (e.g. with `.add_meta_box()` and `.enqueue_admin_assets()`) actually correct?**
  _`SettingsPage` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Database` (e.g. with `.render()` and `.init_hooks()`) actually correct?**
  _`Database` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Annotorious Vendor` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._