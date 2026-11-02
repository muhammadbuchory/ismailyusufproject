# Future integration

Implement a database-backed AcademicContentRepository after a separate persistence phase is authorized. Keep its public method contracts and visibility projections. Add Eloquent, migrations, data mapping, and query tests only then. Do not change React components to know about database storage.

Before real staff workflows, replace workspace state with authenticated endpoints, validated domain submissions, server-enforced roles and state transitions, audit trails, and concurrency handling. Store evidence in a private repository with authorized delivery and retention policies; replace file metadata simulation. Use proper server-side credentials with expiration and revocation before introducing sensitive CVs.

Email, ORCID/publication imports, search indexing, localization and APIs should be independent integrations behind concrete interfaces when required. No speculative services are shipped in this phase.
