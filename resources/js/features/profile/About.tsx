import { Link } from '@inertiajs/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { PortfolioProps } from '../../types/academic';
import { PageHeader, SectionHeader, Badge } from '../../components/shared';
export default function About(p: PortfolioProps) {
  return (
    <>
      <PageHeader
        title={p.section === 'profile' ? 'Professional Profile' : 'About Me'}
        description="The person, principles, and perspectives behind the academic work."
      />
      <div className="container section about-grid">
        <aside className="profile-panel">
          <img
            src="/images/portrait.jpg"
            width="400"
            height="420"
            alt="Illustrative stock portrait, not a verified profile photograph"
          />
          <div>
            <Badge tone="blue">Demonstration profile</Badge>
            <h2>{p.profile.name}</h2>
            <p>
              {p.profile.role}
              <br />
              {p.profile.institution}
            </p>
            <p className="small">
              <MapPin size={14} /> {p.profile.country}
            </p>
            <nav aria-label="Profile sections">
              <a href="#biography">Biography</a>
              <a href="#interests">Research interests</a>
              <a href="#education">Education</a>
              <Link href="/appointments">Current appointments</Link>
            </nav>
          </div>
        </aside>
        <div>
          <section id="biography">
            <SectionHeader
              eyebrow="A LIFE IN SCHOLARSHIP"
              title="Curiosity, with a sense of purpose."
            />
            <p className="lead">{p.profile.bio}</p>
            <p className="demo-note">{p.profile.notice}</p>
          </section>
          <section id="interests" className="profile-section">
            <SectionHeader
              eyebrow="AREAS OF FOCUS"
              title="Research interests"
            />
            <div className="interest-grid">
              {p.profile.interests.map((interest, i) => (
                <div key={interest}>
                  <span>0{i + 1}</span>
                  <h3>{interest}</h3>
                </div>
              ))}
            </div>
          </section>
          <section id="education" className="profile-section">
            <SectionHeader
              title="Education & qualifications"
              href="/education"
              link="Full education history"
            />
            <div className="timeline">
              {p.education?.map((r) => (
                <article key={r.id}>
                  <span>{r.period}</span>
                  <h3>{r.title}</h3>
                  <p>{r.institution}</p>
                  <p className="muted">{r.summary}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="profile-section">
            <SectionHeader title="Academic connections" />
            <p className="muted">
              Profile links below are examples only. No institutional identity
              has been verified.
            </p>
            <div className="social-grid">
              {p.profile.socials.map((name) => (
                <span key={name}>
                  {name}
                  <small>Example profile · no external link</small>
                  <ArrowUpRight size={16} />
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
