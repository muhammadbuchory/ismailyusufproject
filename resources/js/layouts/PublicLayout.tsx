import { usePageMotion } from '../hooks/usePageMotion';
import { BackToTop } from '../components/BackToTop';
import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, GraduationCap, Menu, ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { PortfolioProps } from '../types/academic';
import { Dialog } from '../components/ui/dialog';
const groups = [
  {
    label: 'About',
    items: [
      ['About me', 'about'],
      ['Professional profile', 'profile'],
      ['Education', 'education'],
      ['Academic appointments', 'appointments'],
    ],
  },
  {
    label: 'Academic Activities',
    items: [
      ['Teaching', 'teaching'],
      ['Supervision', 'supervision'],
      ['Publishing experience', 'publishing'],
      ['Conferences', 'conferences'],
      ['Intellectual property', 'intellectual-property'],
      ['Community services', 'community'],
      ['Academic involvement', 'involvement'],
      ['Voices', 'voices'],
      ['Academic statistics', 'statistics'],
    ],
  },
  {
    label: 'Experience & Honours',
    items: [
      ['Work experience', 'work-experience'],
      ['Industry experience', 'industry-experience'],
      ['Professional memberships', 'memberships'],
      ['Awards and honours', 'awards'],
      ['Certifications', 'certifications'],
      ['Consultancy and advisory', 'consultancy'],
    ],
  },
];
export function PublicLayout({
  children,
  profile,
}: {
  children: ReactNode;
  profile: PortfolioProps['profile'];
}) {
  const [mobile, setMobile] = useState(false);
  const { url } = usePage();
  const pageMotionRef = usePageMotion(url);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="container">
          <span>Innovator, educator, reseacher, technologist</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container identity-row">
          <Link href="/" className="brand">
            <span className="brand-crest">
              <GraduationCap size={29} />
            </span>
            <span>
              <strong>{profile.brandName}</strong>
            </span>
          </Link>
          <div className="header-actions">
            <span className="institution">
              {profile.institution}
              <small>Advancing knowledge. Inspiring future generations.</small>
            </span>
            <Link
              href="/contact"
              className="button button-outline desktop-contact"
            >
              Get in touch <ArrowUpRight size={15} />
            </Link>
            <button
              className="icon-button mobile-toggle"
              aria-label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <nav className="container desktop-nav" aria-label="Main navigation">
          <Link href="/" aria-current={url === '/' ? 'page' : undefined}>
            Home
          </Link>
          {groups.slice(0, 1).map((g) => (
            <NavGroup key={g.label} group={g} />
          ))}
          <Link
            href="/research"
            aria-current={url.startsWith('/research') ? 'page' : undefined}
          >
            Research
          </Link>
          <Link
            href="/publications"
            aria-current={url === '/publications' ? 'page' : undefined}
          >
            Publications
          </Link>
          {groups.slice(1).map((g) => (
            <NavGroup key={g.label} group={g} />
          ))}
          <Link href="/news">News & Events</Link>
          <Link href="/cv">Curriculum Vitae</Link>
        </nav>
      </header>
      <Dialog
        open={mobile}
        onOpenChange={setMobile}
        title="Explore the portfolio"
        description="Academic work, experience, and connections"
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ['Home', ''],
            ['Research', 'research'],
            ['Publications', 'publications'],
            ...groups.flatMap((g) => g.items),
            ['News & Events', 'news'],
            ['Curriculum Vitae', 'cv'],
            ['Contact', 'contact'],
          ].map(([name, href]) => (
            <Link key={href} href={'/' + href} onClick={() => setMobile(false)}>
              {name}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </nav>
      </Dialog>
      <main id="main" tabIndex={-1}>
        <div key={url} ref={pageMotionRef} className="page-transition">
          {children}
        </div>
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link href="/" className="brand">
              <span className="brand-crest">
                <GraduationCap size={27} />
              </span>
              <span>
                <strong>{profile.brandName}</strong>
              </span>
            </Link>
            <p>
              Connecting knowledge, people, and possibilities
              <br />
              through research and education.
            </p>
            <small>{profile.notice}</small>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">About me</Link>
            <Link href="/research">Research</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/cv">Curriculum Vitae</Link>
          </div>
          <div>
            <h3>Connect</h3>
            <Link href="/contact">Contact & collaboration</Link>
            <Link href="/news">News & events</Link>
            <Link href="/voices">Voices</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.brandName}.
          </span>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
function NavGroup({ group }: { group: (typeof groups)[number] }) {
  return (
    <details className="nav-dropdown" name="public-navigation">
      <summary>
        {group.label}
        <ChevronDown size={12} />
      </summary>
      <div>
        {group.items.map(([name, path]) => (
          <Link
            key={path}
            href={'/' + path}
            onClick={(e) =>
              e.currentTarget.closest('details')?.removeAttribute('open')
            }
          >
            {name}
          </Link>
        ))}
      </div>
    </details>
  );
}
