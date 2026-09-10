# Graph Report - image-annotator-rebuild  (2026-07-25)

## Corpus Check
- 27 files · ~15,985 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 305 nodes · 334 edges · 60 communities (57 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `35596582`
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
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor
- Annotorious Vendor

## God Nodes (most connected - your core abstractions)
1. `attributes` - 26 edges
2. `SettingsPage` - 22 edges
3. `attributes` - 20 edges
4. `Database` - 17 edges
5. `AnnotationController` - 10 edges
6. `initViewer()` - 7 edges
7. `renderCollectionList()` - 6 edges
8. `AdminMetaBox` - 6 edges
9. `ViewerBlock` - 5 edges
10. `Image Annotator (Rebuild)` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (60 total, 3 thin omitted)

### Community 0 - "Annotorious Vendor"
Cohesion: 0.08
Nodes (4): AdminMetaBox, SettingsPage, AnnotationListBlock, ViewerBlock

### Community 1 - "Annotorious Vendor"
Cohesion: 0.10
Nodes (5): Database, Plugin, AnnotationController, WP_REST_Controller, WP_REST_Request

### Community 2 - "Annotorious Vendor"
Cohesion: 0.36
Nodes (12): deleteAnnotation(), destroyViewer(), escapeHTML(), initSortable(), initViewer(), loadAnnotations(), removeAttachment(), renderCollectionList() (+4 more)

### Community 3 - "Annotorious Vendor"
Cohesion: 0.08
Nodes (23): annotator, gallery, image, apiVersion, showFilmstrip, category, description, editorScript (+15 more)

### Community 4 - "OpenSeadragon Vendor"
Cohesion: 0.08
Nodes (22): annotations, cards, list, apiVersion, cardShadow, default, type, category (+14 more)

### Community 5 - "Annotorious Vendor"
Cohesion: 0.10
Nodes (20): author, bugs, url, description, devDependencies, @wordpress/scripts, homepage, keywords (+12 more)

### Community 7 - "Annotorious Vendor"
Cohesion: 0.18
Nodes (10): 1. Annotated Image Viewer (`image-annotator/viewer`), 2. Annotation Cards List (`image-annotator/annotation-list`), ⚙️ Global Configuration Settings, 🛠️ Gutenberg Blocks, 📖 How to Use, Image Annotator (Rebuild), 🚀 Key Features, Step 1: Insert and Populate a Viewer (+2 more)

### Community 16 - "Admin Component"
Cohesion: 0.50
Nodes (4): attributes, selectedShadow, default, type

### Community 17 - "Admin Component"
Cohesion: 0.50
Nodes (4): attributes, borderRadius, default, type

### Community 18 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): backgroundColor, default, type

### Community 19 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): borderColor, default, type

### Community 20 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): borderRadius, default, type

### Community 21 - "OpenSeadragon Vendor"
Cohesion: 0.67
Nodes (3): borderWidth, default, type

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
Nodes (3): margin, default, type

### Community 28 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): padding, default, type

### Community 29 - "Admin Component"
Cohesion: 0.67
Nodes (3): postId, default, type

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
Nodes (3): textColor, default, type

### Community 35 - "Public Frontend"
Cohesion: 0.67
Nodes (3): backgroundColor, default, type

### Community 36 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): borderColor, default, type

### Community 37 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): borderWidth, default, type

### Community 38 - "Includes Module"
Cohesion: 0.67
Nodes (3): filmstripBgColor, default, type

### Community 39 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripBorderColor, default, type

### Community 40 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripBorderRadius, default, type

### Community 41 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripBorderWidth, default, type

### Community 42 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripMargin, default, type

### Community 43 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripSize, default, type

### Community 44 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): filmstripThumbRadius, default, type

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
Nodes (3): loadingMethod, default, type

### Community 49 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): margin, default, type

### Community 50 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): navPillBgColor, default, type

### Community 51 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): navPillTextColor, default, type

### Community 52 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): osdImageSize, default, type

### Community 53 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): padding, default, type

### Community 54 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): postId, default, type

### Community 55 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): simpleImageSize, default, type

### Community 56 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): viewerId, default, type

### Community 57 - "Annotorious Vendor"
Cohesion: 0.67
Nodes (3): width, default, type

## Knowledge Gaps
- **141 isolated node(s):** `name`, `version`, `description`, `main`, `build` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `attributes` connect `Admin Component` to `Annotorious Vendor`, `Public Frontend`, `Annotorious Vendor`, `Annotorious Vendor`, `Includes Module`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Includes Module`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `attributes` connect `Admin Component` to `Annotorious Vendor`, `OpenSeadragon Vendor`, `Includes Module`, `OpenSeadragon Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Annotorious Vendor`, `OpenSeadragon Vendor`, `Database Layer`, `REST API Controller`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Annotorious Vendor`, `Admin Component`, `Blocks Component`, `Annotorious Vendor`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `SettingsPage` connect `Annotorious Vendor` to `Annotorious Vendor`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `SettingsPage` (e.g. with `.add_meta_box()` and `.enqueue_admin_assets()`) actually correct?**
  _`SettingsPage` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Database` (e.g. with `.render()` and `.init_hooks()`) actually correct?**
  _`Database` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Annotorious Vendor` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._