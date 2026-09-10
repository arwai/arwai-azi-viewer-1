# Graph Report - .  (2026-07-25)

## Corpus Check
- 3 files · ~16,774 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 92 nodes · 122 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 6

## God Nodes (most connected - your core abstractions)
1. `SettingsPage` - 22 edges
2. `Database` - 17 edges
3. `AnnotationController` - 10 edges
4. `initViewer()` - 7 edges
5. `renderCollectionList()` - 6 edges
6. `AdminMetaBox` - 6 edges
7. `ViewerBlock` - 5 edges
8. `Plugin` - 5 edges
9. `setStatus()` - 4 edges
10. `removeAttachment()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `AnnotationController` --inherits--> `WP_REST_Controller`  [EXTRACTED]
  includes/Rest/AnnotationController.php →   _Bridges community 1 → community 3_

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (3): SettingsPage, AnnotationListBlock, ViewerBlock

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (3): Database, AnnotationController, WP_REST_Request

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (12): deleteAnnotation(), destroyViewer(), escapeHTML(), initSortable(), initViewer(), loadAnnotations(), removeAttachment(), renderCollectionList() (+4 more)

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `SettingsPage` connect `Community 0` to `Community 1`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **Why does `Database` connect `Community 1` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `AnnotationController` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `SettingsPage` (e.g. with `.add_meta_box()` and `.enqueue_admin_assets()`) actually correct?**
  _`SettingsPage` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Database` (e.g. with `.render()` and `.init_hooks()`) actually correct?**
  _`Database` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09956709956709957 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._