# Architecture and decisions

Laravel v13.39.0, Inertia PHP v3.6.0, React 19.3.1, Inertia React 3.10.0, TypeScript 5.9.3, Tailwind 4.3.3, Vite 7.3.7, laravel-vite-plugin 2.1.0. Exact resolved versions belong to composer.lock and package-lock.json.

Official references inspected: https://github.com/laravel/react-starter-kit and https://laravel.com/framework/docs/releases. The current official React kit includes Inertia 3 and database-backed authentication features; this app uses the official Laravel 13 skeleton and follows its React/Inertia architecture, without copying Fortify, models, migrations, Wayfinder, or account routes. Vite 7 and Laravel Vite plugin 2 form a compatible stable baseline on the installed Node 22.18 runtime; the kit currently uses a different Vite Plus build toolchain, which is not necessary here.

config/academic -> AcademicContentRepository -> ConfigAcademicContentRepository -> PortfolioController -> explicitly selected Inertia props -> strict React domain types -> reusable presentation. One cohesive config repository avoids trivial per-table providers. Modules can gain dedicated providers when transformation rules justify them.

The database connection list is disabled at boot, sessions/cache use array, queue is sync, mail is array. Storage serving/uploads and Inertia request recording are disabled. Framework compiled views, package caches, build assets, logs, and testing artifacts are technical runtime output, not permanent academic content storage.

PublicLayout owns grouped navigation, footer, theme, and mobile dialog. Features isolate public profile, academic directory, contact, CV, dashboard, and verification workflow. Shared cards, headings, statistics, labels, and Radix dialogs are reused. The button follows shadcn/ui composition with Slot, cva, and semantic classes; components.json records configuration. No second frontend framework. Optional form libraries and charts were unnecessary; native forms, Zod, and a semantically summarized CSS chart cover the current scope.

## SEO and SSR

SSR was evaluated and deferred: this local PHP-only preview does not require a continuously running Node rendering process. Server-rendered title, description, canonical, Open Graph, and carefully scoped Person JSON-LD are present in Blade; React updates route metadata. This is not full content SSR and crawler indexing of academic page content is not guaranteed. A future SSR implementation must remove browser globals from render paths, add an Inertia SSR entry and bundle, and operate a compatible Node 22 service alongside PHP. Extended/private demo and dashboard are noindex.

## Deployment

Local-only implementation at the user-specified path. No Site registration or remote deployment. Configure Apache document root to public with PHP 8.3+ or run start.ps1. Credentials and personal academic facts must be verified before adapting for public use.
