# Reusable presentation

- PublicLayout: grouped desktop links, mobile dialog, footer, theme.
- PageHeader / SectionHeader: breadcrumbs, editorial hierarchy, contextual action.
- Button: shadcn-style Slot/cva composition with primary/outline/ghost variants.
- Dialog: Radix modal with title, description, Escape handling, focus management.
- Badge / Stats: semantic labels and configuration-derived counts.
- AcademicCard / PublicationCard: shared academic summaries, metadata, abstract/citation copy.
- Directory / Filter / Metadata: composable filtering, pagination, detail fields, empty results.
- ActivityGallery / Voices: manually controlled accessible carousels.
- SubmissionForm: shared common fields with category-specific metadata.
- RecordsTable / Status: reusable administrative records and state indicators.
- Cv: separate projections, credential simulation, semantic printable sections.

Presentation semantics are shared only where stable; avoid adding universal schema machinery for unrelated domains.

- usePageMotion: page-scoped reveal observation, lazy-content registration, reduced-motion changes, and animation cleanup.
- BackToTop: threshold-based accessible scroll control with focus return and reduced-motion support.
