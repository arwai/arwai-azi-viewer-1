# Graph Report - arwai-azi-viewer  (2026-09-09)

## Corpus Check
- 44 files · ~25,929 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 605 nodes · 639 edges · 78 communities (68 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.8)
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
- OpenSeadragon Vendor
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
- Includes Module
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- supports
- Annotorious Vendor
- Annotorious Vendor
- align
- Annotorious Vendor
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
- loadingMethod
- viewer/edit.js
- showFilmstrip
- cardMaxWidth
- cardMinWidth
- enableTruncation
- gridJustifyContent
- postId
- readMoreText
- action-pill/block.json
- ViewerBlock
- AdminMetaBox
- AnnotationListBlock
- Plugin
- showLessText
- SequenceFilmstripBlock

## God Nodes (most connected - your core abstractions)
1. `SettingsPage` - 23 edges
2. `attributes` - 23 edges
3. `attributes` - 20 edges
4. `Database` - 17 edges
5. `attributes` - 12 edges
6. `ViewerBlock` - 10 edges
7. `AnnotationController` - 10 edges
8. `typography` - 9 edges
9. `supports` - 9 edges
10. `typography` - 8 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (78 total, 10 thin omitted)

### Community 1 - "Annotorious Vendor"
Cohesion: 0.13
Nodes (4): Database, AnnotationController, WP_REST_Controller, WP_REST_Request

### Community 2 - "Annotorious Vendor"
Cohesion: 0.36
Nodes (12): deleteAnnotation(), destroyViewer(), escapeHTML(), initSortable(), initViewer(), loadAnnotations(), removeAttachment(), renderCollectionList() (+4 more)

### Community 3 - "Annotorious Vendor"
Cohesion: 0.10
Nodes (18): annotator, image, apiVersion, category, description, editorScript, icon, gallery (+10 more)

### Community 4 - "OpenSeadragon Vendor"
Cohesion: 0.09
Nodes (21): cards, list, apiVersion, cardBorderStyle, default, type, category, description (+13 more)

### Community 5 - "Annotorious Vendor"
Cohesion: 0.09
Nodes (21): author, bugs, url, description, devDependencies, @wordpress/scripts, homepage, keywords (+13 more)

### Community 7 - "Annotorious Vendor"
Cohesion: 0.10
Nodes (20): 1. Annotated Image Viewer (`arwai/azi-viewer`), 1. Global Plugin Settings (`wp_options`), 1. Tabbed Admin Settings Interface, 2. Annotation Cards List (`arwai/azi-viewer-annotation-list`), 2. Block Structure & Image Routing (`wp_postmeta` on Post/Page ID), 2. Standalone UI Blocks & Editor Previews, 3. Accessibility Enhancements, 3. Annotation Data (`wp_postmeta` on Attachment ID) (+12 more)

### Community 8 - "OpenSeadragon Vendor"
Cohesion: 0.07
Nodes (28): color, __experimentalSkipSerialization, radius, style, width, background, text, center (+20 more)

### Community 14 - "Annotorious Vendor"
Cohesion: 0.07
Nodes (28): color, __experimentalSkipSerialization, radius, style, width, background, text, center (+20 more)

### Community 17 - "Admin Component"
Cohesion: 0.50
Nodes (3): Antigravity Agent Directives, Model Hand-off, Workspace Restraints

### Community 18 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): hoverBorderColor, default, type

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
Cohesion: 0.67
Nodes (3): columns, default, type

### Community 23 - "REST API Controller"
Cohesion: 0.67
Nodes (3): hoverBackgroundColor, default, type

### Community 24 - "Annotorious Vendor"
Cohesion: 0.06
Nodes (31): default, type, attributes, align, filmstripBorderColor, filmstripBorderRadius, filmstripBorderWidth, filmstripMargin (+23 more)

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
Cohesion: 0.67
Nodes (3): targetViewerId, default, type

### Community 35 - "Public Frontend"
Cohesion: 0.67
Nodes (3): viewerId, default, type

### Community 38 - "sequence-filmstrip/block.json"
Cohesion: 0.08
Nodes (22): carousel, filmstrip, thumbnails, apiVersion, filmstripBgColor, category, description, editorScript (+14 more)

### Community 39 - "cardBorderRadius"
Cohesion: 0.67
Nodes (3): cardBorderRadius, default, type

### Community 46 - "Includes Module"
Cohesion: 0.67
Nodes (3): imageIds, default, type

### Community 47 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): infoMessage, default, type

### Community 50 - "Annotorious Vendor"
Cohesion: 0.08
Nodes (25): nav, pagination, default, type, apiVersion, attributes, align, targetViewerId (+17 more)

### Community 52 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): osdImageSize, default, type

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
Cohesion: 0.50
Nodes (4): default, type, attributes, align

### Community 61 - "overrideBadgeShadow"
Cohesion: 0.67
Nodes (3): overrideBadgeShadow, default, type

### Community 62 - "overrideBadgeTextColor"
Cohesion: 0.67
Nodes (3): loadingMethod, default, type

### Community 63 - "overrideDefaultBorderColor"
Cohesion: 0.67
Nodes (3): overrideDefaultBorderColor, default, type

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
Cohesion: 0.67
Nodes (3): overrideHoverBadgeShadow, default, type

### Community 68 - "overrideSelectedBorderColor"
Cohesion: 0.67
Nodes (3): overrideSelectedBorderColor, default, type

### Community 69 - "overrideSelectedFillColor"
Cohesion: 0.67
Nodes (3): overrideSelectedFillColor, default, type

### Community 70 - "showFilmstrip"
Cohesion: 0.33
Nodes (6): default, type, attributes, align, overrideSelectedBadgeShadow, type

### Community 73 - "loadingMethod"
Cohesion: 0.07
Nodes (28): color, __experimentalSkipSerialization, radius, style, width, background, text, center (+20 more)

### Community 74 - "viewer/edit.js"
Cohesion: 0.67
Nodes (3): cardMaxHeight, default, type

### Community 81 - "showFilmstrip"
Cohesion: 0.67
Nodes (3): overrideBadgeTextColor, default, type

### Community 83 - "cardMaxWidth"
Cohesion: 0.67
Nodes (3): cardMaxWidth, default, type

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
Cohesion: 0.06
Nodes (33): action, default, type, apiVersion, attributes, align, showAnnotationsBtn, showEnlargeBtn (+25 more)

### Community 98 - "showLessText"
Cohesion: 0.67
Nodes (3): showLessText, default, type

## Knowledge Gaps
- **346 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+341 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `attributes` connect `Annotorious Vendor` to `OpenSeadragon Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Database Layer`, `REST API Controller`, `Annotorious Vendor`, `Blocks Component`, `Annotorious Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `cardBorderRadius`, `viewer/edit.js`, `cardMaxWidth`, `cardMinWidth`, `enableTruncation`, `gridJustifyContent`, `postId`, `readMoreText`, `showLessText`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `attributes` connect `showFilmstrip` to `overrideDefaultFillColor`, `overrideHoverBadgeShadow`, `overrideHoverBorderColor`, `Annotorious Vendor`, `overrideHoverFillColor`, `overrideSelectedBorderColor`, `overrideSelectedFillColor`, `Public Frontend`, `Includes Module`, `Annotorious Vendor`, `showFilmstrip`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `overrideBadgeShadow`, `overrideBadgeTextColor`, `overrideDefaultBorderColor`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `supports` connect `align` to `OpenSeadragon Vendor`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `SettingsPage` (e.g. with `.add_meta_box()` and `.enqueue_admin_assets()`) actually correct?**
  _`SettingsPage` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Database` (e.g. with `.render()` and `.init_hooks()`) actually correct?**
  _`Database` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _346 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Annotorious Vendor` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._