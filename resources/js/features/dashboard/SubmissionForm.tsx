import { useState } from 'react';
import type { Submission } from '../../types/academic';
import { Button } from '../../components/ui/button';
const fields: Record<string, [string, string, string][]> = {
  Education: [
    ['institution', 'Institution', 'text'],
    ['degree', 'Degree / field of study', 'text'],
    ['thesis', 'Thesis title', 'text'],
  ],
  Research: [
    ['area', 'Research area', 'text'],
    ['funding', 'Funding agency', 'text'],
    ['end', 'Project end date', 'date'],
  ],
  Publication: [
    ['authors', 'Authors', 'text'],
    ['journal', 'Journal / publisher', 'text'],
    ['url', 'Publication URL (optional)', 'url'],
  ],
  Teaching: [
    ['code', 'Course code', 'text'],
    ['credits', 'Credit hours', 'number'],
    ['level', 'Academic level', 'text'],
  ],
  Supervision: [
    ['level', 'Academic level', 'text'],
    ['role', 'Supervision role', 'text'],
    ['area', 'Research area', 'text'],
  ],
  'Academic Appointments': [
    ['institution', 'Institution', 'text'],
    ['role', 'Appointment title', 'text'],
    ['start', 'Start date', 'date'],
  ],
  Conferences: [
    ['location', 'Location', 'text'],
    ['role', 'Participation role', 'text'],
    ['date', 'Conference date', 'date'],
  ],
  Awards: [
    ['issuer', 'Awarding body', 'text'],
    ['level', 'Award level', 'text'],
    ['date', 'Award date', 'date'],
  ],
};
export default function SubmissionForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Submission;
  onSave: (record: Submission) => void;
  onCancel: () => void;
}) {
  const [category, setCategory] = useState(
    initial && Object.hasOwn(fields, initial.category)
      ? initial.category
      : initial?.id.startsWith('research')
        ? 'Research'
        : 'Publication',
  );
  const [evidence, setEvidence] = useState(initial?.evidence ?? null);
  const [error, setError] = useState('');
  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!evidence) {
      setError(
        'Select a supporting evidence file. Only the filename and size are retained temporarily.',
      );
      return;
    }
    const data = new FormData(e.currentTarget);
    const metadata = Object.fromEntries(
      fields[category].map(([key]) => [key, String(data.get(key) ?? '')]),
    );
    onSave({
      id: initial?.id ?? 'DRAFT-' + Date.now(),
      title: String(data.get('title')),
      category,
      year: Number(data.get('year')),
      summary: String(data.get('summary')),
      status: 'Draft',
      visibility: data.get('visibility') as Submission['visibility'],
      evidence,
      submittedBy: 'Demo Staff',
      date: new Date().toISOString().slice(0, 10),
      metadata,
    });
  }
  return (
    <form className="submission-form" onSubmit={save}>
      <div className="form-grid">
        <label>
          Academic category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(fields).map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Academic year
          <input
            name="year"
            type="number"
            min="1900"
            max="2100"
            defaultValue={initial?.year ?? 2026}
            required
          />
        </label>
        <label className="full-width">
          Record title
          <input
            name="title"
            defaultValue={initial?.title}
            required
            minLength={5}
          />
        </label>
        {fields[category].map(([name, label, type]) => (
          <label key={category + name}>
            {label}
            <input
              type={type}
              name={name}
              defaultValue={initial?.metadata?.[name]}
              required={name !== 'url'}
              min={type === 'number' ? 0 : undefined}
            />
          </label>
        ))}
        <label className="full-width">
          Academic summary
          <textarea
            name="summary"
            defaultValue={initial?.summary}
            rows={4}
            minLength={20}
            required
          />
        </label>
        <label>
          Visibility
          <select
            name="visibility"
            defaultValue={initial?.visibility ?? 'public'}
          >
            <option value="public">Public</option>
            <option value="extended">Extended demo</option>
            <option value="private">Private demo</option>
          </select>
        </label>
        <label>
          Supporting evidence (required)
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setEvidence(file ? { name: file.name, size: file.size } : null);
              setError('');
            }}
          />
        </label>
      </div>
      {evidence && (
        <p className="demo-note">
          Selected: {evidence.name} · {(evidence.size / 1024).toFixed(1)} KB. No
          upload occurs.
        </p>
      )}
      <p role="alert" className="form-error">
        {error}
      </p>
      <div className="inline-tags">
        <Button type="submit">Save local draft</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <p className="small muted">
        Drafts are editable until submitted. All changes reset when the page is
        refreshed.
      </p>
    </form>
  );
}
