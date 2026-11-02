# Testing

Commands are in README.md. Pest feature tests visit every public category and the dashboard, inspect deterministic provider output, validate counts, reject unknown routes, and ensure public/extended/private projections differ correctly. No RefreshDatabase trait or test database is used.

Vitest + Testing Library cover record search/year/type/indexing combinations, empty states, pagination, citation expansion/copy, contact validation and simulated confirmation, evidence-dependent submission, role-dependent approval/rejection, and immutable reordering.

Playwright runs a public navigation/filter/detail/CV/print journey, staff submission and admin reject/approve/reorder journey, contact form journey, five responsive width checks across Home/About/Publications/Dashboard, and mobile keyboard/dialog navigation. Chromium is installed with npx playwright install chromium. The PHP server must already be running at http://127.0.0.1:8015.

Screenshots and a demonstration A4 PDF go to test-results; HTML report goes to playwright-report. These are ignored generated QA artifacts. Typecheck, ESLint, Prettier, Pint and production Vite build must pass. See implementation-progress.md for actual results; configuration alone is not proof of execution.
