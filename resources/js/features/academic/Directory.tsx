import NewsMedia from './NewsMedia';
import { Link } from '@inertiajs/react';
import { Search, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { PortfolioProps, AcademicRecord } from '../../types/academic';
import {
  AcademicCard,
  Badge,
  EmptyState,
  PageHeader,
  PublicationCard,
} from '../../components/shared';
import { Button } from '../../components/ui/button';
const labels: Record<string, string> = {
  research: 'Research',
  publications: 'Publications',
  teaching: 'Teaching',
  supervision: 'Supervision',
  education: 'Education',
  news: 'News & Events',
};
export function filterRecords(
  records: AcademicRecord[],
  search: string,
  category: string,
  year: string,
  status: string,
  indexing: string,
  order: string,
  from = '',
  to = '',
) {
  return records
    .filter(
      (r) =>
        (r.title + ' ' + r.summary + ' ' + (r.authors ?? ''))
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (!category || r.category === category) &&
        (!year || r.year === Number(year)) &&
        (!status || r.status === status) &&
        (!indexing || r.indexing === indexing) &&
        (!from || r.year >= Number(from)) &&
        (!to || r.year <= Number(to)),
    )
    .sort((a, b) => (order === 'oldest' ? a.year - b.year : b.year - a.year));
}
export default function Directory(p: PortfolioProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const [indexing, setIndexing] = useState('');
  const [order, setOrder] = useState('newest');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const records = useMemo(() => p.records ?? [], [p.records]);
  const title =
    labels[p.section] ?? p.catalog[p.section]?.title ?? 'Academic Records';
  const filtered = useMemo(
    () =>
      filterRecords(
        records,
        search,
        category,
        year,
        status,
        indexing,
        order,
        from,
        to,
      ),
    [records, search, category, year, status, indexing, order, from, to],
  );
  const visible = filtered.slice((page - 1) * 3, page * 3);
  function reset() {
    setSearch('');
    setCategory('');
    setYear('');
    setStatus('');
    setIndexing('');
    setFrom('');
    setTo('');
    setOrder('newest');
    setPage(1);
  }
  if (p.detail) {
    const r = records[0];
    return (
      <>
        <PageHeader title={r.title} description={r.summary} eyebrow={title} />
        <div className="container section detail-layout">
          <div>
            <Link className="text-link" href={'/' + p.section}>
              <ArrowLeft size={16} /> Back to {title.toLowerCase()}
            </Link>
            <div className="detail-content">
              <div className="inline-tags">
                <Badge>{r.category}</Badge>
                <Badge tone="blue">{r.status ?? r.year}</Badge>
              </div>
              <h2>Overview</h2>
              <p className="lead">{r.summary}</p>
              {r.objectives && (
                <>
                  <h2>Research objectives</h2>
                  <ul>
                    {r.objectives.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              )}
              {r.team && (
                <>
                  <h2>Research team</h2>
                  <p>{r.team.join(' · ')}</p>
                </>
              )}
              {r.keywords && (
                <div className="inline-tags">
                  {r.keywords.map((x) => (
                    <Badge key={x}>{x}</Badge>
                  ))}
                </div>
              )}
              {p.section === 'research' && (
                <>
                  <h2>Related publications</h2>
                  <Link href="/publications" className="text-link">
                    Explore the scholarly directory <ArrowRight size={16} />
                  </Link>
                </>
              )}
              {r.media && (
                <img
                  className="detail-image"
                  src={r.media}
                  alt="Illustrative demonstration event scene"
                />
              )}
              <p className="demo-note">
                This is a fictional demonstration record. No private supporting
                evidence is displayed.
              </p>
            </div>
          </div>
          <aside className="metadata-panel">
            <h3>Record details</h3>
            <Metadata record={r} />
          </aside>
        </div>
      </>
    );
  }
  return (
    <>
      <PageHeader
        title={title}
        description={
          p.catalog[p.section]?.subtitle ??
          'Explore academic work, ideas, and contributions through a curated directory.'
        }
      />
      <section className="container section">
        {p.section === 'news' && <NewsMedia />}
        <div className="directory-intro">
          <p className="muted">
            {records.length} illustrative records · Configuration-backed
            demonstration data
          </p>
          <Link href="/cv" className="text-link">
            View in Curriculum Vitae <ArrowRight size={15} />
          </Link>
        </div>
        {p.section === 'supervision' && (
          <div className="supervision-stats">
            {['Bachelor’s', 'Master’s', 'Doctoral'].map((level) => (
              <div key={level}>
                <strong>
                  {
                    records.filter(
                      (r) => r.category === level && r.status === 'Completed',
                    ).length
                  }
                </strong>
                <span>{level} completed</span>
              </div>
            ))}
            <div>
              <strong>
                {records.filter((r) => r.status === 'Ongoing').length}
              </strong>
              <span>Ongoing supervision</span>
            </div>
          </div>
        )}
        <div
          className="filter-toolbar"
          role="group"
          aria-label="Academic directory filters"
        >
          <div className="filter-toolbar-top">
            <label className="filter-field filter-search">
              <span className="filter-label">Search {title}</span>
              <span className="search-field">
                <Search size={18} />
                <input
                  placeholder={'Search ' + title.toLowerCase() + '…'}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </span>
            </label>
            <label className="filter-field filter-sort">
              <span className="filter-label">Sort records</span>
              <select
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                  setPage(1);
                }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
          <div
            className={
              'filter-toolbar-fields' +
              (p.section === 'research' ? ' research-filters' : '')
            }
          >
            <Filter
              label="Category"
              value={category}
              values={
                p.section === 'publications'
                  ? [
                      'Journal Article',
                      'Conference Paper',
                      'Book',
                      'Book Chapter',
                      'Patent',
                      'Review Article',
                      'Editorial',
                      'Technical Report',
                      'Thesis/Dissertation',
                      'Other',
                    ]
                  : [...new Set(records.map((r) => r.category))]
              }
              set={(v) => {
                setCategory(v);
                setPage(1);
              }}
            />
            <Filter
              label="Year"
              value={year}
              values={[...new Set(records.map((r) => String(r.year)))]
                .sort()
                .reverse()}
              set={(v) => {
                setYear(v);
                setPage(1);
              }}
            />
            {records.some((r) => r.status) && (
              <Filter
                label="Status"
                value={status}
                values={[
                  ...new Set(
                    records.flatMap((r) => (r.status ? [r.status] : [])),
                  ),
                ]}
                set={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
              />
            )}
            {p.section === 'publications' && (
              <Filter
                label="Indexing"
                value={indexing}
                values={[
                  ...new Set(
                    records.flatMap((r) => (r.indexing ? [r.indexing] : [])),
                  ),
                ]}
                set={(v) => {
                  setIndexing(v);
                  setPage(1);
                }}
              />
            )}

            {p.section === 'research' && (
              <>
                <label className="filter-field">
                  <span className="filter-label">From year</span>
                  <input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2100"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setPage(1);
                    }}
                  />
                </label>
                <label className="filter-field">
                  <span className="filter-label">To year</span>
                  <input
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max="2100"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setPage(1);
                    }}
                  />
                </label>
              </>
            )}
            <Button className="filter-reset" variant="outline" onClick={reset}>
              <RotateCcw size={16} />
              Clear filters
            </Button>
          </div>
        </div>
        <div className="results-info" role="status">
          {filtered.length} matching{' '}
          {filtered.length === 1 ? 'record' : 'records'}
        </div>
        {!filtered.length ? (
          <EmptyState />
        ) : (
          <div
            className={
              p.section === 'publications'
                ? 'publication-list'
                : p.section === 'education'
                  ? 'timeline'
                  : 'directory-grid'
            }
          >
            {visible.map((r) =>
              p.section === 'publications' ? (
                <PublicationCard key={r.id} record={r} />
              ) : (
                <AcademicCard
                  key={r.id}
                  record={r}
                  href={
                    p.section === 'research' ? '/research/' + r.id : undefined
                  }
                >
                  {p.section === 'news' && (
                    <>
                      <img
                        className="news-thumbnail"
                        src={r.media}
                        alt="Illustrative academic activity"
                        loading="lazy"
                      />
                      <Link className="text-link" href={'/news/' + r.id}>
                        Event details <ArrowRight size={15} />
                      </Link>
                    </>
                  )}
                  <details>
                    <summary>View record details</summary>
                    <Metadata record={r} />
                    {r.abstract && <p>{r.abstract}</p>}
                  </details>
                </AcademicCard>
              ),
            )}
          </div>
        )}
        {filtered.length > 3 && (
          <nav className="pagination" aria-label="Directory pagination">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span aria-live="polite">
              Page {page} of {Math.ceil(filtered.length / 3)}
            </span>
            <Button
              variant="outline"
              disabled={page >= Math.ceil(filtered.length / 3)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </nav>
        )}
      </section>
    </>
  );
}
function Filter({
  label,
  value,
  values,
  set,
}: {
  label: string;
  value: string;
  values: string[];
  set: (v: string) => void;
}) {
  return (
    <label className={'filter-field filter-field-' + label.toLowerCase()}>
      <span className="filter-label">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => set(e.target.value)}
      >
        <option value="">
          {label === 'Category'
            ? 'All categories'
            : label === 'Status'
              ? 'All statuses'
              : label === 'Indexing'
                ? 'All sources'
                : 'All years'}
        </option>
        {values.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </label>
  );
}
export function Metadata({ record: r }: { record: AcademicRecord }) {
  const fields: [string, string | number | undefined][] = [
    ['Institution', r.institution],
    ['Period', r.period],
    ['Year', r.year],
    ['Status', r.status],
    ['Duration', r.start && r.start + ' to ' + r.end],
    ['Funding agency', r.funding],
    ['Grant scheme', r.scheme],
    ['Grant reference', r.reference],
    ['Thesis', r.thesis],
    ['Supervisor', r.supervisor],
    ['Course code', r.code],
    ['Credit hours', r.credits],
    ['Academic level', r.category],
    ['Role', r.role],
    ['Language', r.language],
    ['Teaching mode', r.mode],
    ['Supervision type', r.type],
    ['Research area', r.area],
    ['Event date', r.date],
    ['Location', r.location],
    ['Visibility', r.visibility],
  ];
  return (
    <dl className="metadata">
      {fields
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
}
