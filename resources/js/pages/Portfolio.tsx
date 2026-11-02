import { Head } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import type { PortfolioProps } from '../types/academic';
import { PublicLayout } from '../layouts/PublicLayout';
import Home from '../features/profile/Home';
import About from '../features/profile/About';
import Directory from '../features/academic/Directory';
import { PageHeader, Stats, Voices } from '../components/shared';
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const Cv = lazy(() => import('../features/cv/Cv'));
const Contact = lazy(() => import('../features/contact/Contact'));
export default function Portfolio(p: PortfolioProps) {
  const title =
    p.section === 'home'
      ? 'Research, Education & Impact'
      : (p.catalog[p.section]?.title ??
        p.section[0].toUpperCase() + p.section.slice(1));
  let content;
  if (p.section === 'dashboard') content = <Dashboard {...p} />;
  else if (p.section === 'home') content = <Home {...p} />;
  else if (['about', 'profile'].includes(p.section)) content = <About {...p} />;
  else if (p.section === 'cv') content = <Cv {...p} />;
  else if (p.section === 'contact') content = <Contact profile={p.profile} />;
  else if (p.section === 'statistics')
    content = (
      <>
        <PageHeader
          title="Academic Statistics"
          description="A transparent overview, derived entirely from the demonstration dataset."
        />
        <div className="container section">
          <Stats statistics={p.statistics} />
          <p className="demo-note">
            Counts reflect only the public records included in this
            demonstration. These are not verified academic metrics.
          </p>
        </div>
      </>
    );
  else if (p.section === 'voices')
    content = (
      <>
        <PageHeader
          title="Voices & Perspectives"
          description="Illustrative perspectives on collaboration, mentorship, and shared academic purpose."
        />
        <div className="container section">
          <Voices voices={p.voices ?? []} />
        </div>
      </>
    );
  else content = <Directory key={p.section + String(p.detail)} {...p} />;
  const body = (
    <Suspense
      fallback={
        <div className="container section" role="status">
          <div className="loading-skeleton" />
          Loading academic portfolio…
        </div>
      }
    >
      {content}
    </Suspense>
  );
  return (
    <>
      <Head title={title}>
        <meta
          head-key="description"
          name="description"
          content={
            p.section === 'dashboard'
              ? 'Transient academic dashboard demonstration.'
              : 'Explore the demonstration academic portfolio of Ismail Yusuf: research, publications, teaching, and professional contribution.'
          }
        />
        <link
          head-key="canonical"
          rel="canonical"
          href={window.location.origin + window.location.pathname}
        />
        <meta property="og:title" content={title + ' | Ismail Yusuf'} />
        <meta
          property="og:description"
          content="An illustrative academic portfolio. All academic records are fictional demonstration data."
        />
        {(p.section === 'dashboard' || (p.cvMode && p.cvMode !== 'public')) && (
          <meta name="robots" content="noindex,nofollow" />
        )}
      </Head>
      {p.section === 'dashboard' ? (
        body
      ) : (
        <PublicLayout profile={p.profile}>{body}</PublicLayout>
      )}
    </>
  );
}
