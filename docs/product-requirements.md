# Product requirements

Implement an individual academic portfolio and digital CV with English UI, institutional navy/gold design, twenty-five public academic categories, and a clearly identified dashboard demonstration. This is not a university administration portal.

Data must originate in Laravel PHP configuration and providers. No database, migrations, real user accounts, credential verification, file uploads, mail, or permanent academic content writes. Frontend forms, search/filter, carousels, CV modes, draft/review/reordering interactions use fictional datasets and transient React state. All claims and profile links require verification before real publication.

Architecture follows the official Laravel React starter kit while removing database-backed authentication. Use Laravel 13, Inertia 3, React 19, strict TypeScript, Tailwind 4, accessible Radix/shadcn-style primitives and tested feature boundaries. Public and administrative layouts share semantic design tokens.

Implement incrementally: audit/foundation, design system, Home/About/core, research/content, remaining categories, CV, dashboard, QA. Preserve database and authentication as documented future integrations. Original supplied specification is retained in docs/original-requirements.txt.
