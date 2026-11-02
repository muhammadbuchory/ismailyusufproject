# Design system

All semantic colors originate in resources/css/app.css: navy #102D4F, academic blue #1E5A8A, gold #DAA73F, white surfaces, cool gray tint and warm ivory hero. The interface uses light mode only. Georgia provides offline editorial headings; system Arial/Helvetica serves UI. No font service is needed.

Four-pixel control radii, thin borders, restrained shadows, 1240px content container, and responsive section spacing establish institutional visual hierarchy. Shared Button, Badge, Dialog, SectionHeader, PageHeader, Stats, AcademicCard, and PublicationCard define reusable presentation.

Desktop navigation is grouped; mobile uses a Radix dialog. Visible keyboard focus, skip links, semantic tables, field-level validation, reduced motion, named carousel controls, and A4 print styles are included. Target is WCAG 2.2 AA; no formal certification is claimed. Review at 375, 768, 1024, 1440, and 1920px. Wide administrative tables use their own scroll container.

Photos are illustrative stock media saved locally and never identified as real images of Ismail Yusuf or his institution. Replace them with authorized user-supplied media when available.

## Readability update

The shared rem scale now uses --font-body (1rem / 16px), --font-meta (0.875rem / 14px), --font-small (0.8125rem / 13px), and --font-caption (0.75rem / 12px). Body paragraphs and form controls render at 16px; public navigation, dashboard menu items, and table content at 14px. Supporting captions use a 12px minimum. Heading sizes retain the established hierarchy. User font preferences can scale the rem-based supporting text.

Secondary light-theme text is #526278 for stronger contrast. Primary buttons have 48px minimum height, icon controls 44px, and compact actions 36px. Tables and cards have more room for readable metadata. Long prose uses a maximum 70ch measure; hero copy uses 50ch. Below 1200px grouped desktop navigation switches to the mobile menu to accommodate the larger labels. The mobile utility bar prioritizes portfolio/demo links. Print-specific point sizes remain appropriate for the A4 CV.

## Academic directory filters

Directory filters use a two-row desktop panel: labeled search and sorting on the first row, then category/year/status/indexing or year range and reset on the next. Research allocates more space to category names. All control surfaces are 50px high. Tablet filters use three columns; mobile uses two columns with full-width search, sorting, category and reset. Labels remain visible independently of placeholders.

## Public motion

Public content enters with a 240ms fade and 8px rise while the shared header/footer stay stable. The page key follows the Inertia URL; normal new-page scroll reset and Back/Forward restoration remain managed by Inertia. Below-fold headings/cards reveal once per visit using IntersectionObserver and Web Animations: 380ms, 12px rise, sibling staggering of 50ms capped at 150ms. Unenhanced content stays visible and interactive. Lazy content is observed through a cleaned-up MutationObserver.

Dropdown opening and small hover feedback use 160ms transitions. Interactive research/card surfaces lift up to 3px on fine-pointer hover; text-link arrows move 2px. The existing exclusive dropdown behavior is retained. BackToTop appears beyond 600px scroll, returns keyboard focus to main content and uses native smooth scroll. Its visibility follows a React external-store subscription.

Reduced-motion preferences disable page/menu/reveal animations and animated hover movement; active reveals cancel when the preference changes. Back-to-top uses instant scrolling in that mode. Print CSS restores fully opaque, untransformed content and hides the scroll button. No animation dependency was added.
