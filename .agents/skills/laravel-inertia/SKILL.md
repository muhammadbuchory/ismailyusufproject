---
name: laravel-inertia
description: Modify Laravel routes, controllers, repository bindings, or Inertia page props.
---

# Workflow

Keep PortfolioController thin and data retrieval behind AcademicContentRepository. Select only page-specific datasets. Use config-backed records; never introduce auth scaffolding, Eloquent, migrations, database sessions, or queues. Run route and projection feature tests.

# Expected output

Typed repository changes; explicit Inertia props; passing PHP tests.
