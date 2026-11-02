import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  LayoutDashboard,
  ClipboardCheck,
  GraduationCap,
  ArrowUpRight,
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
  CheckCircle,
  Clock,
  BookOpen,
  Settings,
  KeyRound,
  Users,
  Eye,
  MessageSquare,
  Folder,
  UserRound,
  ChevronRight,
} from 'lucide-react';
import type {
  PortfolioProps,
  Submission,
  SubmissionStatus,
} from '../../types/academic';
import { Badge, EmptyState, Stats } from '../../components/shared';
import { Button } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import SubmissionForm from './SubmissionForm';
import { transition, reorder } from '../verification/workflow';
const tabs = [
  ['Overview', LayoutDashboard],
  ['Academic Profile', UserRound],
  ['Content Submission', Plus],
  ['Submission Review', ClipboardCheck],
  ['Pending Verification', Clock],
  ['Approved Records', CheckCircle],
  ['Rejected Records', X],
  ['Data Ordering', ArrowUp],
  ['Document Evidence', Folder],
  ['CV Visibility', Eye],
  ['Credential Code', KeyRound],
  ['Academic Statistics', GraduationCap],
  ['Testimonials / Messages', MessageSquare],
  ['Mock User Management', Users],
  ['Interface Settings', Settings],
] as const;
export default function Dashboard(p: PortfolioProps) {
  const [tab, setTab] = useState('Overview');
  const [role, setRole] = useState('Staff');
  const [nav, setNav] = useState(false);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState<Submission | undefined>();
  const [form, setForm] = useState(false);
  const [review, setReview] = useState<Submission | null>(null);
  const [action, setAction] = useState<{ id: string; type: string } | null>(
    null,
  );
  const [feedback, setFeedback] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [credential, setCredential] = useState('DEMO');
  const [users, setUsers] = useState([
    { id: 'staff', name: 'Demo Staff', role: 'Staff' },
    { id: 'admin', name: 'Demo Administrator', role: 'Administrator' },
  ]);
  const [records, setRecords] = useState<Submission[]>(() =>
    (p.records ?? []).map((r, i) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      summary: r.summary,
      year: r.year,
      status: i === 0 ? 'Pending Review' : i === 1 ? 'Rejected' : 'Approved',
      visibility: r.visibility,
      evidence: { name: 'demo-evidence-' + (i + 1) + '.pdf', size: 124000 },
      submittedBy: 'Demo Staff',
      date: '2026-10-20',
      feedback:
        i === 1
          ? 'Please include an updated publication reference.'
          : undefined,
    })),
  );
  const counts = (s: SubmissionStatus) =>
    records.filter((r) => r.status === s).length;
  const admin = role === 'Administrator';
  const [currentProfile, setCurrentProfile] = useState({
    name: p.profile.name,
    role: p.profile.role,
  });
  function notify(text: string) {
    setMessage(text);
  }
  function goto(name: string) {
    setTab(name);
    setNav(false);
    setQuery('');
    setForm(false);
  }
  function update(id: string, next: SubmissionStatus) {
    setRecords((rs) =>
      rs.map((r) => (r.id === id ? transition(r, next, role, feedback) : r)),
    );
    notify(
      next === 'Pending Review'
        ? 'Draft submitted. Staff editing is now locked.'
        : 'Record marked ' +
            next.toLowerCase() +
            '. Temporary demo state only.',
    );
    setAction(null);
    setReview(null);
    setFeedback('');
  }
  function confirm() {
    if (!action) return;
    if (action.type === 'Delete') {
      setRecords((rs) => rs.filter((r) => r.id !== action.id));
      notify('Record removed from the current demonstration.');
      setAction(null);
    } else update(action.id, action.type as SubmissionStatus);
  }
  function move(id: string, direction: number) {
    setRecords((rs) => {
      const approved = rs.filter((r) => r.status === 'Approved');
      const next = reorder(
        approved,
        approved.findIndex((r) => r.id === id),
        direction,
      );
      let index = 0;
      return rs.map((r) => (r.status === 'Approved' ? next[index++] : r));
    });
    notify('Display order updated for this session.');
  }
  const statusMap: Record<string, SubmissionStatus> = {
    'Pending Verification': 'Pending Review',
    'Approved Records': 'Approved',
    'Rejected Records': 'Rejected',
  };
  const listing = records.filter(
    (r) =>
      (!statusMap[tab] || r.status === statusMap[tab]) &&
      (tab !== 'Content Submission' || r.submittedBy === 'Demo Staff') &&
      (tab !== 'Data Ordering' || r.status === 'Approved') &&
      (r.title + ' ' + r.category + ' ' + r.id)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="dashboard-shell">
      <a className="skip-link" href="#workspace-main">
        Skip to workspace
      </a>
      <aside className={'dashboard-sidebar'}>
        <Link
          className="brand"
          href="/dashboard"
          preserveState
          onClick={() => {
            setTab('Overview');
            setNav(false);
          }}
        >
          <span className="brand-crest">
            <GraduationCap size={25} />
          </span>
          <span>
            <strong>Academic workspace</strong>
            <small>PORTFOLIO MANAGEMENT</small>
          </span>
        </Link>
        <button
          className="icon-button sidebar-close"
          aria-label="Close workspace navigation"
          onClick={() => setNav(false)}
        >
          <X />
        </button>
        <div className="sidebar-profile">
          <div className="avatar">IY</div>
          <div>
            {currentProfile.name}
            <small>{role} · Demo account</small>
          </div>
        </div>
        <p className="sidebar-label">WORKSPACE</p>
        <nav aria-label="Dashboard navigation">
          {tabs.map(([name, Icon]) => (
            <button
              key={name}
              className={tab === name ? 'active' : ''}
              onClick={() => goto(name)}
            >
              <Icon size={17} />
              {name}
              {name === 'Pending Verification' && (
                <span>{counts('Pending Review')}</span>
              )}
            </button>
          ))}
        </nav>
        <Link href="/" className="sidebar-back">
          View public portfolio <ArrowUpRight size={16} />
        </Link>
      </aside>
      <div className="dashboard-body">
        <header className="dashboard-header">
          <div className="workspace-breadcrumb">
            <button
              className="icon-button mobile-toggle"
              aria-label="Open workspace navigation"
              onClick={() => setNav(true)}
            >
              <Menu />
            </button>
            <span className="muted">Workspace</span>
            <ChevronRight size={14} />
            <strong>{tab}</strong>
          </div>
          <div className="workspace-header-actions">
            <label className="workspace-global-search">
              <Search size={14} />
              <input
                aria-label="Global workspace search"
                placeholder="Search workspace"
                value={query}
                onChange={(e) => {
                  if (
                    ![
                      'Content Submission',
                      'Submission Review',
                      'Pending Verification',
                      'Approved Records',
                      'Rejected Records',
                      'Data Ordering',
                      'Document Evidence',
                    ].includes(tab)
                  ) {
                    setTab('Submission Review');
                    setForm(false);
                  }
                  setQuery(e.target.value);
                }}
              />
            </label>
            <label className="role-select">
              <span className="sr-only">Mock user mode</span>
              <select
                aria-label="Mock user mode"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  notify(
                    'Demo role changed. The role selector is not a security boundary.',
                  );
                }}
              >
                <option>Staff</option>
                <option>Administrator</option>
              </select>
            </label>
          </div>
        </header>
        <main id="workspace-main" className="workspace-content" tabIndex={-1}>
          <div className="demo-banner">
            <strong>Demonstration workspace</strong>
            <span>
              No authentication, authorization, database, or file uploads.
              Changes reset on refresh.
            </span>
          </div>
          <div className="workspace-heading">
            <div>
              <span className="eyebrow">ACADEMIC PORTFOLIO MANAGEMENT</span>
              <h1>
                {tab === 'Overview'
                  ? 'Welcome back, ' + currentProfile.name.split(' ')[0] + '.'
                  : tab}
              </h1>
              <p className="muted">
                {tab === 'Overview'
                  ? 'Your scholarship, organised. A clear view of your academic contributions.'
                  : 'Manage illustrative academic content in a temporary demonstration session.'}
              </p>
            </div>
            {tab === 'Overview' && (
              <Button
                onClick={() => {
                  goto('Content Submission');
                  setForm(true);
                }}
              >
                <Plus size={17} />
                New submission
              </Button>
            )}
          </div>
          <div role="status" className={message ? 'feedback-banner' : ''}>
            {message}
          </div>
          {tab === 'Overview' && (
            <>
              <div className="dashboard-stats">
                {[
                  ['Pending verification', counts('Pending Review'), Clock],
                  ['Approved records', counts('Approved'), CheckCircle],
                  ['Rejected records', counts('Rejected'), X],
                  ['Total publications', p.statistics[0].value, BookOpen],
                ].map(([label, value, Icon]) => {
                  const MetricIcon = Icon as typeof Clock;
                  return (
                    <div className="dashboard-stat" key={String(label)}>
                      <MetricIcon size={20} />
                      <span>{String(label)}</span>
                      <strong>{String(value).padStart(2, '0')}</strong>
                      <small>Current demonstration dataset</small>
                    </div>
                  );
                })}
              </div>
              <div className="dashboard-overview-grid">
                <section className="workspace-panel">
                  <div className="panel-heading">
                    <h2>Submission activity</h2>
                    <Badge>Illustrative trend</Badge>
                  </div>
                  <div
                    className="bar-chart"
                    role="img"
                    aria-label="Illustrative monthly submissions: May 2, June 4, July 3, August 6, September 4, October 7."
                  >
                    {[2, 4, 3, 6, 4, 7].map((v, i) => (
                      <div key={i}>
                        <span style={{ height: v * 22 }}>
                          <b>{v}</b>
                        </span>
                        <small>
                          {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}
                        </small>
                      </div>
                    ))}
                  </div>
                  <p className="small muted">
                    Static demonstration trend, independent of current records.
                  </p>
                </section>
                <section className="workspace-panel">
                  <h2>Your academic footprint</h2>
                  {p.statistics.map((s) => (
                    <div key={s.label} className="footprint-row">
                      <span>{s.label}</span>
                      <strong>{s.value}</strong>
                    </div>
                  ))}
                  <Link href="/cv" className="text-link">
                    Preview public CV <ArrowUpRight size={15} />
                  </Link>
                </section>
              </div>
              <section className="workspace-panel">
                <div className="panel-heading">
                  <h2>Recent submissions</h2>
                  <Button
                    variant="ghost"
                    onClick={() => goto('Submission Review')}
                  >
                    View all <ArrowUpRight size={15} />
                  </Button>
                </div>
                <RecordsTable
                  records={records.slice(0, 4)}
                  onReview={setReview}
                />
              </section>
            </>
          )}
          {[
            'Content Submission',
            'Submission Review',
            'Pending Verification',
            'Approved Records',
            'Rejected Records',
            'Data Ordering',
            'Document Evidence',
          ].includes(tab) && (
            <section className="workspace-panel">
              {form ? (
                <>
                  <h2>
                    {editing ? 'Edit local record' : 'Create an academic entry'}
                  </h2>
                  <SubmissionForm
                    key={editing?.id ?? 'new'}
                    initial={editing}
                    onCancel={() => {
                      setForm(false);
                      setEditing(undefined);
                    }}
                    onSave={(r) => {
                      setRecords((rs) =>
                        editing
                          ? rs.map((x) =>
                              x.id === r.id
                                ? { ...r, status: editing.status }
                                : x,
                            )
                          : [r, ...rs],
                      );
                      setForm(false);
                      setEditing(undefined);
                      notify(
                        'Draft saved in memory. Refreshing resets this demonstration.',
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="panel-heading">
                    <label className="search-field">
                      <Search size={17} />
                      <input
                        aria-label="Search workspace records"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search title, category, or ID…"
                      />
                    </label>
                    {tab === 'Content Submission' && (
                      <Button
                        onClick={() => {
                          setEditing(undefined);
                          setForm(true);
                        }}
                      >
                        <Plus size={16} />
                        New draft
                      </Button>
                    )}
                  </div>
                  {tab === 'Data Ordering' && (
                    <p className="demo-note">
                      {admin
                        ? 'Use move controls to change the temporary display order.'
                        : 'Switch to Administrator to reorder approved content.'}
                    </p>
                  )}
                  {listing.length ? (
                    <div className="table-wrap">
                      <table>
                        <caption className="sr-only">
                          {tab} demonstration records
                        </caption>
                        <thead>
                          <tr>
                            <th>Academic record</th>
                            <th>Evidence / visibility</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listing.map((r, i) => (
                            <tr key={r.id}>
                              <td>
                                <strong>{r.title}</strong>
                                <small>
                                  {r.id} · {r.category} · {r.date}
                                  <br />
                                  {r.submittedBy}
                                </small>
                                {r.feedback && (
                                  <small className="form-error">
                                    Review: {r.feedback}
                                  </small>
                                )}
                              </td>
                              <td>
                                <span>{r.evidence?.name ?? 'No evidence'}</span>
                                <small>
                                  {r.evidence
                                    ? (r.evidence.size / 1024).toFixed(1) +
                                      ' KB · metadata only'
                                    : ''}
                                </small>
                                <Badge>{r.visibility}</Badge>
                              </td>
                              <td>
                                <Status status={r.status} />
                              </td>
                              <td>
                                <div className="table-actions">
                                  <Button
                                    size="small"
                                    variant="ghost"
                                    onClick={() => setReview(r)}
                                  >
                                    Review details
                                  </Button>
                                  {(r.status === 'Draft' || admin) && (
                                    <>
                                      <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() => {
                                          setEditing(r);
                                          setForm(true);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="ghost"
                                        onClick={() =>
                                          setAction({
                                            id: r.id,
                                            type: 'Delete',
                                          })
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </>
                                  )}
                                  {r.status === 'Draft' && !admin && (
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        setAction({
                                          id: r.id,
                                          type: 'Pending Review',
                                        })
                                      }
                                    >
                                      Submit
                                    </Button>
                                  )}
                                  {admin && r.status === 'Pending Review' && (
                                    <>
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          setAction({
                                            id: r.id,
                                            type: 'Approved',
                                          })
                                        }
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="outline"
                                        onClick={() =>
                                          setAction({
                                            id: r.id,
                                            type: 'Rejected',
                                          })
                                        }
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  {tab === 'Data Ordering' && admin && (
                                    <>
                                      <button
                                        className="icon-button"
                                        aria-label={'Move up ' + r.title}
                                        disabled={i === 0}
                                        onClick={() => move(r.id, -1)}
                                      >
                                        <ArrowUp size={15} />
                                      </button>
                                      <button
                                        className="icon-button"
                                        aria-label={'Move down ' + r.title}
                                        disabled={i === listing.length - 1}
                                        onClick={() => move(r.id, 1)}
                                      >
                                        <ArrowDown size={15} />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                  {tab === 'Approved Records' && (
                    <div className="preview-box">
                      <h3>In-memory public preview</h3>
                      <p className="small muted">
                        Public records only. Nothing is permanently published.
                      </p>
                      {records
                        .filter(
                          (r) =>
                            r.status === 'Approved' &&
                            r.visibility === 'public',
                        )
                        .map((r) => (
                          <p key={r.id}>? {r.title}</p>
                        ))}
                    </div>
                  )}
                </>
              )}
            </section>
          )}
          {tab === 'Academic Profile' && (
            <section className="workspace-panel">
              <h2>Academic identity</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  notify('Profile updated in the workspace preview only.');
                }}
              >
                <div className="form-grid">
                  <label>
                    Display name
                    <input
                      value={currentProfile.name}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label>
                    Professional role
                    <input
                      value={currentProfile.role}
                      onChange={(e) =>
                        setCurrentProfile({
                          ...currentProfile,
                          role: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                </div>
                <Button>Update demo profile</Button>
              </form>
              <p className="demo-note">
                These temporary changes affect the workspace header. Public
                configuration fixtures remain unchanged.
              </p>
            </section>
          )}
          {tab === 'Academic Statistics' && (
            <section className="workspace-panel">
              <Stats statistics={p.statistics} />
              <p className="demo-note">
                Public portfolio counts come from Laravel configuration.
                Workflow totals use the current React session.
              </p>
            </section>
          )}
          {tab === 'CV Visibility' && (
            <section className="workspace-panel">
              <h2>CV presentation preference</h2>
              <label>
                Demonstration presentation
                <select
                  value={visibility}
                  onChange={(e) => {
                    setVisibility(e.target.value);
                    notify(
                      'Temporary CV preference selected. This does not enforce access control.',
                    );
                  }}
                >
                  <option>Public</option>
                  <option>Public with Credential Code</option>
                  <option>Private with Credential Code</option>
                </select>
              </label>
              <p className="demo-note">
                Current preference: {visibility}. No confidential data should be
                entered.
              </p>
              <Link className="button button-outline" href="/cv">
                Open CV presentation <ArrowUpRight size={16} />
              </Link>
            </section>
          )}
          {tab === 'Credential Code' && (
            <section className="workspace-panel">
              <h2>Presentation credential</h2>
              <p>
                This is a UI simulation. It does not issue real access
                credentials.
              </p>
              <output className="credential-output">{credential}</output>
              <Button
                onClick={() => {
                  setCredential(
                    'DEMO-' +
                      Math.random().toString(36).slice(2, 8).toUpperCase(),
                  );
                  notify(
                    'Example code generated. The public CV demonstration continues to use DEMO.',
                  );
                }}
              >
                Generate example code
              </Button>
              <p className="small muted">
                No issuance, expiration, revocation, or validation service is
                implemented.
              </p>
            </section>
          )}
          {tab === 'Testimonials / Messages' && (
            <section className="workspace-panel">
              <h2>Illustrative messages</h2>
              <article className="message-card">
                <Badge>Fictional message</Badge>
                <h3>Research collaboration enquiry</h3>
                <p>Alex Morgan · academic@example.org</p>
                <p>
                  I would welcome a conversation about interdisciplinary
                  sustainability research.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    notify(
                      'Message marked as read for this session. No reply was sent.',
                    )
                  }
                >
                  Mark as read
                </Button>
              </article>
              <p className="demo-note">
                The public contact form sends and stores nothing. This message
                is a fixed fixture.
              </p>
            </section>
          )}
          {tab === 'Mock User Management' && (
            <section className="workspace-panel">
              <h2>Demonstration users</h2>
              <p className="demo-note">
                Role selection is not a security boundary. No real accounts
                exist.
              </p>
              {users.map((u) => (
                <div className="mock-user" key={u.id}>
                  <div className="avatar">{u.name[0]}</div>
                  <span>
                    <strong>{u.name}</strong>
                    <small>{u.role}</small>
                  </span>
                  {admin && u.id.startsWith('new-') && (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setUsers(users.filter((x) => x.id !== u.id))
                      }
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {admin && (
                <Button
                  onClick={() =>
                    setUsers([
                      ...users,
                      {
                        id: 'new-' + Date.now(),
                        name: 'Example Reviewer ' + users.length,
                        role: 'Staff',
                      },
                    ])
                  }
                >
                  Add illustrative user
                </Button>
              )}
            </section>
          )}
          {tab === 'Interface Settings' && (
            <section className="workspace-panel">
              <h2>Display preferences</h2>
              <p>
                The interface uses a light appearance for consistent
                readability.
              </p>
              <p className="demo-note">
                Reduced-motion preferences follow your operating system.
              </p>
            </section>
          )}
        </main>
        <footer className="workspace-footer">
          Academic Portfolio · Demonstration workspace · No data is saved
        </footer>
      </div>
      <Dialog
        open={nav}
        onOpenChange={setNav}
        title="Workspace navigation"
        description="Choose a demonstration workspace panel."
      >
        <nav className="mobile-nav" aria-label="Mobile workspace navigation">
          {tabs.map(([name, Icon]) => (
            <button key={name} onClick={() => goto(name)}>
              <Icon size={17} />
              {name}
            </button>
          ))}
        </nav>
      </Dialog>
      <Dialog
        open={!!review}
        onOpenChange={(v) => !v && setReview(null)}
        title="Submission details"
        description="Review the illustrative academic record and its evidence metadata."
      >
        {review && (
          <div>
            <Badge>{review.category}</Badge>
            <h3>{review.title}</h3>
            <p>{review.summary}</p>
            <Status status={review.status} />
            <dl className="metadata">
              <div>
                <dt>Evidence</dt>
                <dd>
                  {review.evidence?.name ?? 'None'} (metadata only; no stored
                  file)
                </dd>
              </div>
              <div>
                <dt>Visibility</dt>
                <dd>{review.visibility}</dd>
              </div>
              {Object.entries(review.metadata ?? {}).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Dialog>
      <Dialog
        open={!!action}
        onOpenChange={(v) => {
          if (!v) {
            setAction(null);
            setFeedback('');
          }
        }}
        title={
          action?.type === 'Delete'
            ? 'Delete this demo record?'
            : action?.type === 'Pending Review'
              ? 'Submit for demonstration review?'
              : action?.type === 'Approved'
                ? 'Approve this demo record?'
                : 'Reject this demo record?'
        }
        description="This action affects temporary React state only and resets when the page is refreshed."
      >
        {action?.type === 'Rejected' && (
          <label>
            Review feedback
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </label>
        )}
        <div className="inline-tags">
          <Button onClick={confirm}>
            Confirm{' '}
            {action?.type === 'Pending Review'
              ? 'submission'
              : action?.type.toLowerCase()}
          </Button>
          <Button variant="outline" onClick={() => setAction(null)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
function Status({ status }: { status: SubmissionStatus }) {
  return (
    <Badge
      tone={
        status === 'Approved'
          ? 'green'
          : status === 'Rejected'
            ? 'red'
            : status === 'Pending Review'
              ? 'gold'
              : 'neutral'
      }
    >
      {status}
    </Badge>
  );
}
function RecordsTable({
  records,
  onReview,
}: {
  records: Submission[];
  onReview: (r: Submission) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <caption className="sr-only">Recent academic submissions</caption>
        <thead>
          <tr>
            <th>Academic record</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>
                <strong>{r.title}</strong>
                <small>{r.category}</small>
              </td>
              <td>{r.date}</td>
              <td>
                <Status status={r.status} />
              </td>
              <td>
                <Button
                  size="small"
                  variant="ghost"
                  onClick={() => onReview(r)}
                >
                  Review <ArrowUpRight size={14} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
