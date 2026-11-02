# Academic Portfolio & Digital CV

Local frontend-first academic portfolio for Ismail Yusuf. All academic facts, affiliations, voices, and metrics are illustrative. No database, accounts, credentials, mail delivery, evidence repository, or content persistence is implemented.

## Start on this Windows machine

From this directory run:

```powershell
.\start.ps1
```

Open http://127.0.0.1:8015 and http://127.0.0.1:8015/dashboard. Built assets are included in the working directory; Vite need not run for this preview. PHP 8.5 is selected explicitly because the terminal default is PHP 8.2. Use the public directory as the Apache document root if configuring an XAMPP virtual host; do not serve the repository root. Apache must also use PHP 8.3+.

## Install on another machine

Use PHP 8.3+ (extensions curl, openssl, mbstring, fileinfo, intl, zip), Composer, and Node 22.12+ or compatible Node 20.19+. Run composer install, copy .env.example to .env, artisan key:generate, npm ci, and npm run build. Do not run migrations. php.local.ini is a host-specific ignored configuration; adapt its extension directory or use your normal PHP configuration.

## Development

Run npm run dev alongside the PHP server for HMR. Stop Vite before using production assets, or remove public/hot after an interrupted dev server. Fixtures live in config/academic; the React workspace never writes them. Changes reset on refresh.

## Validation

```powershell
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
& 'D:\xampp\php8512\php.exe' -c php.local.ini artisan test
& 'D:\xampp\php8512\php.exe' -c php.local.ini vendor/bin/pint --test
```

Playwright expects the local server already running on port 8015. Reports: playwright-report/index.html, screenshots and sample print PDF: test-results.

## Demo workflows

Public CV is the default. Enter DEMO in either credential dialog to visit a separate extended/private projection. These routes have no authorization; use fictional data only. In the dashboard choose Content Submission, create a draft with local evidence metadata, submit it, switch to Administrator, review and accept/reject. Move controls reorder approved records. Nothing is uploaded or permanently published.

See docs/implementation-progress.md for verified checks and limits, docs/architecture.md for integration boundaries, and docs/page-inventory.md for routes.
