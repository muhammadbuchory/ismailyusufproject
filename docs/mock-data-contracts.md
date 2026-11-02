# Mock contracts

AcademicContentRepository exposes profile(), records(module), catalog(), voices(), statistics(), cv(mode). ConfigAcademicContentRepository is the only implementation. Public records have id, title, integer year, category, summary, and visibility. Domain fields are optional and represented by AcademicRecord in resources/js/types/academic.ts. Dates use ISO strings; period labels are human-readable.

Research includes duration, fictional funding, scheme, reference, team, objectives, and keywords. Publication includes fictional authors, journal, indexing label and citation. No unverified DOI or institution profile URLs are invented. Education includes thesis, supervisor and abstract where applicable. Supervision projects omit student identifiers entirely.

Statistics derive from public fixture counts. Submission trends are separately labeled illustrative values. EvidenceMetadata contains only filename and byte size. SubmissionStatus is Draft, Pending Review, Approved, or Rejected. Backend records are deterministic; user-created workspace IDs and dates exist only in React state.

Before supplying real content, verify the person's title, biography, affiliations, academic history, institutional links, citations and media permissions.
