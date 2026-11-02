import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Printer, KeyRound, ArrowUpRight } from 'lucide-react';
import type { PortfolioProps, Visibility } from '../../types/academic';
import { PageHeader, Badge } from '../../components/shared';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
export default function Cv(p: PortfolioProps) {
  const [dialog, setDialog] = useState(false);
  const [target, setTarget] = useState<Visibility>('extended');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  function unlock(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() !== 'DEMO') {
      setError('Enter DEMO to continue with the presentation simulation.');
      return;
    }
    setDialog(false);
    router.get('/cv', { mode: target });
  }
  return (
    <>
      <div className="no-print">
        <PageHeader
          title="Curriculum Vitae"
          description="An academic journey, thoughtfully presented. View, explore, or print the demonstration CV."
        />
        <div className="container cv-controls">
          <div className="inline-tags">
            <Link
              href="/cv"
              className={
                'button ' +
                (p.cvMode === 'public' ? 'button-primary' : 'button-outline')
              }
            >
              Public CV
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setTarget('extended');
                setDialog(true);
                setCode('');
                setError('');
              }}
            >
              <KeyRound size={16} />
              Public with credential
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTarget('private');
                setDialog(true);
                setCode('');
                setError('');
              }}
            >
              <KeyRound size={16} />
              Private demo
            </Button>
          </div>
          <Button onClick={() => window.print()}>
            <Printer size={16} />
            Print / Save PDF
          </Button>
        </div>
        <p className="container demo-note">
          Demo credential code: DEMO. These modes simulate presentation only. No
          authentication or authorization is implemented; do not use real
          confidential data.
        </p>
      </div>
      <article className="cv-paper">
        <header className="cv-header">
          <div>
            <span className="eyebrow">
              CURRICULUM VITAE · {p.cvMode?.toUpperCase()} DEMO
            </span>
            <h1>{p.profile.name}</h1>
            <p>
              {p.profile.role} · {p.profile.institution}
            </p>
            <span>
              {p.profile.email} · {p.profile.country}
            </span>
          </div>
          <Badge tone="blue">Illustrative profile</Badge>
        </header>
        <section className="print-section">
          <h2>Academic summary</h2>
          <p>{p.profile.bio}</p>
          <small>{p.profile.notice}</small>
        </section>
        {Object.entries(p.cvSections ?? {}).map(([key, records]) => (
          <section className="print-section" key={key}>
            <h2>{p.catalog[key]?.title ?? key.replaceAll('-', ' ')}</h2>
            {records.map((r) => (
              <div className="cv-record" key={r.id}>
                <span>{r.period ?? r.year}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.institution ?? r.journal ?? r.category}</p>
                  <p>{r.summary}</p>
                  {r.citation && <small>{r.citation}</small>}
                </div>
              </div>
            ))}
          </section>
        ))}
        <footer>
          Demonstration CV · All academic information is illustrative ·{' '}
          {p.cvMode} projection
        </footer>
      </article>
      <Dialog
        open={dialog}
        onOpenChange={setDialog}
        title="Demo credential access"
        description="Presentation simulation only. This code does not secure or protect information."
      >
        <form onSubmit={unlock}>
          <label htmlFor="demo-code">Demonstration code</label>
          <input
            id="demo-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-describedby="code-hint code-error"
            aria-invalid={!!error}
          />
          <p id="code-hint" className="small muted">
            Use DEMO to open the {target} demonstration projection.
          </p>
          <p id="code-error" role="alert" className="form-error">
            {error}
          </p>
          <Button type="submit">
            Open {target} demo CV <ArrowUpRight size={16} />
          </Button>
        </form>
      </Dialog>
    </>
  );
}
