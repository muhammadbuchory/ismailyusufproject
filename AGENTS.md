# Academic Portfolio
Build a local Laravel 13 / Inertia 3 / React 19 / strict TypeScript academic portfolio. Public UI copy is English. Academic fixtures are illustrative, never verified personal claims.

## Invariants
- No database, Eloquent models, migrations, real accounts, production authentication, uploads, or persistent content writes.
- PHP config/academic is the source of domain data. AcademicContentRepository is the integration boundary. Controllers select explicit page datasets and apply visibility before serialization.
- Extended/private CV demo routes are presentation simulations, never security boundaries. Never put their records in default public props.
- React workflow state resets on refresh. Evidence means filename/size only.

## Ownership and conventions
- app/Data owns normalization/projection; config/academic owns fixtures; features owns domain UI; components/ui and shared.tsx own reusable semantics; CSS owns central tokens.
- Check all consumers before changing shared primitives. Prefer composition. Keep strict types and domain-specific form fields.
- Light mode only. Keep demonstration workspace links out of public navigation.
- Navy/gold institutional identity, restrained serif headings, semantic HTML, labeled controls, visible focus, reduced motion, keyboard access, responsive layouts, and printable CV.
- Add dependencies only for an actual need. Keep one React stack; review official compatibility and commit lockfiles.

## Checks
npm run typecheck; npm run lint; npm run format:check; npm test; npm run build; npm run test:e2e
PHP 8.3+ required. This host has PHP 8.5 at D:/xampp/php8512/php.exe; use -c php.local.ini. Run artisan test and vendor/bin/pint --test with that runtime. See README.md for exact Windows commands.
Update docs/implementation-progress.md with actual checks and remaining limitations. Apply repository skills only when their stated feature is involved.
