import { Link } from '@inertiajs/react';
import {
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Award,
  Search,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { AcademicRecord, Statistic, Voice } from '../types/academic';
import { useState } from 'react';
import { Button } from './ui/button';
export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  link = 'Explore more',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function PageHeader({
  title,
  description,
  eyebrow = 'Academic portfolio',
}: {
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <header className="page-heading">
      <div className="container">
        <p className="breadcrumb">
          <Link href="/">Home</Link> / {title}
        </p>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={'badge badge-' + tone}>{children}</span>;
}
export function Stats({ statistics }: { statistics: Statistic[] }) {
  const icons = [BookOpen, FlaskConical, GraduationCap, Award];
  return (
    <div className="stats-grid">
      {statistics.map((s, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div className="stat" key={s.label}>
            <Icon size={21} />
            <strong>{String(s.value).padStart(2, '0')}</strong>
            <span>{s.label}</span>
            <small>{s.note}</small>
          </div>
        );
      })}
    </div>
  );
}
export function EmptyState() {
  return (
    <div className="empty">
      <Search size={30} />
      <h3>No matching records</h3>
      <p>Try a different keyword or clear your filters.</p>
    </div>
  );
}
export function AcademicCard({
  record,
  href,
  children,
}: {
  record: AcademicRecord;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <article className="academic-card">
      <div className="card-top">
        <span className="eyebrow">{record.category}</span>
        <span className="muted">{record.year}</span>
      </div>
      <h3>{href ? <Link href={href}>{record.title}</Link> : record.title}</h3>
      <p>{record.summary}</p>
      {record.institution && <small>{record.institution}</small>}
      {record.status && (
        <Badge tone={record.status === 'Ongoing' ? 'blue' : 'green'}>
          {record.status}
        </Badge>
      )}
      {children}
      {href && (
        <Link className="text-link card-link" href={href}>
          Explore research <ArrowUpRight size={16} />
        </Link>
      )}
    </article>
  );
}
export function PublicationCard({ record }: { record: AcademicRecord }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(record.citation ?? record.title);
      setCopied(true);
      setError('');
    } catch {
      setError(
        'Copy unavailable. Select the citation text below to copy it manually.',
      );
    }
  }
  return (
    <article className="publication-card">
      <div className="publication-year">
        {record.year}
        <BookOpen size={19} />
      </div>
      <div className="publication-body">
        <div className="inline-tags">
          <Badge>{record.category}</Badge>
          {record.indexing && (
            <span className="muted small">
              {record.indexing} · illustrative indexing
            </span>
          )}
        </div>
        <h3>{record.title}</h3>
        <p className="authors">{record.authors}</p>
        <p className="journal">{record.journal}</p>
        <details>
          <summary>Read abstract & citation</summary>
          <p>{record.summary}</p>
          <p className="citation">{record.citation}</p>
        </details>
        <Button variant="ghost" size="small" onClick={copy}>
          {copied ? 'Citation copied' : 'Copy citation'}
        </Button>
        <span role="status" className="small">
          {copied ? 'Copied to clipboard.' : error}
        </span>
      </div>
    </article>
  );
}
export function Voices({ voices }: { voices: Voice[] }) {
  const [index, setIndex] = useState(0);
  const v = voices[index];
  if (!v) return null;
  return (
    <div className="voice">
      <span className="quote-mark">“</span>
      <blockquote>{v.quote}</blockquote>
      <p>
        <strong>{v.name}</strong>
        <br />
        <span>
          {v.position} · {v.institution}
        </span>
      </p>
      <div className="carousel-controls">
        <button
          className="icon-button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((index + voices.length - 1) % voices.length)}
        >
          {String.fromCharCode(8592)}
        </button>
        <span aria-live="polite">
          {index + 1} / {voices.length}
        </span>
        <button
          className="icon-button"
          aria-label="Next testimonial"
          onClick={() => setIndex((index + 1) % voices.length)}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
      <small>Fictional testimonial for demonstration</small>
    </div>
  );
}
