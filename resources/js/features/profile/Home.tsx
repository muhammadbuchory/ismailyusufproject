import { Link } from '@inertiajs/react';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  BookOpen,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import type { PortfolioProps, AcademicRecord } from '../../types/academic';
import {
  AcademicCard,
  PublicationCard,
  SectionHeader,
  Stats,
  Voices,
} from '../../components/shared';
export default function Home(p: PortfolioProps) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="gold-line" />
              RESEARCH · EDUCATION · PURPOSE
            </span>
            <h1>
              Advancing knowledge.
              <br />
              <em>
                Creating meaningful
                <br className="wide-break" /> impact.
              </em>
            </h1>
            <div className="hero-name">
              <strong>{p.profile.name}</strong>
              <span>
                {p.profile.role} · {p.profile.institution}
              </span>
            </div>
            <p>
              Exploring sustainable futures through interdisciplinary research,
              inspired teaching, and meaningful collaboration.
            </p>
            <div className="hero-buttons">
              <Link className="button button-primary" href="/cv">
                View Curriculum Vitae <ArrowUpRight size={17} />
              </Link>
              <Link className="button button-outline" href="/about">
                About me <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-links">
              <Link href="/research">
                <FlaskConical size={16} /> Discover my research
              </Link>
              <span />
              <Link href="/publications">
                <BookOpen size={16} /> Browse publications
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                src="/images/portrait.jpg"
                alt="Illustrative stock portrait; not a verified photograph of Ismail Yusuf"
                width="620"
                height="760"
              />
              <div className="portrait-shade" />
              <div className="portrait-caption">
                <span className="eyebrow">A COMMITMENT TO DISCOVERY</span>
                <p>
                  “Knowledge finds its purpose
                  <br />
                  when it serves people.”
                </p>
              </div>
            </div>
            <div className="portrait-label">
              <MapPin size={16} />
              <div>
                {p.profile.country}
                <small>Ideas, learning, and lasting impact</small>
              </div>
            </div>
            <span className="visual-index">01 / ACADEMIC PROFILE</span>
          </div>
        </div>
      </section>
      <section className="identity-strip">
        <div className="container">
          <span>AN ACADEMIC LIFE, WITH PURPOSE</span>
          <p>Researcher. Educator. Collaborator.</p>
          <Link href="/profile" className="text-link">
            Professional profile <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          eyebrow="A SNAPSHOT OF SCHOLARSHIP"
          title="Ideas into academic impact"
          description="A considered view of research, teaching, and contribution. All figures are derived from demonstration records."
        />
        <Stats statistics={p.statistics} />
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHeader
            eyebrow="RESEARCH & DISCOVERY"
            title="Asking questions that matter"
            description="Interdisciplinary perspectives on a more sustainable, resilient future."
            href="/research"
            link="All research projects"
          />
          <div className="research-grid">
            {p.research?.map((r, i) => (
              <div key={r.id} className="research-item">
                <div className={'research-art art-' + i}>
                  <span>0{i + 1}</span>
                  <FlaskConical size={55} strokeWidth={1} />
                  <small>{r.category.toUpperCase()}</small>
                </div>
                <AcademicCard record={r} href={'/research/' + r.id} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          eyebrow="SELECTED SCHOLARLY WORK"
          title="Contributing to the conversation"
          href="/publications"
          link="All publications"
        />
        <div>
          {p.publications?.slice(0, 2).map((r) => (
            <PublicationCard key={r.id} record={r} />
          ))}
        </div>
      </section>
      <section className="section section-tint">
        <div className="container">
          <SectionHeader
            eyebrow="BEYOND THE PAGE"
            title="An active academic life"
            href="/news"
            link="News & events"
          />
          <ActivityGallery news={p.news ?? []} />
        </div>
      </section>
      <section className="section container achievements-home">
        <div>
          <span className="eyebrow">RECOGNITION & CONTRIBUTION</span>
          <h2>
            A commitment to
            <br />
            academic excellence.
          </h2>
          <p className="muted">
            Celebrating the work, partnerships, and shared effort behind every
            contribution.
          </p>
          <Link className="text-link" href="/awards">
            Explore achievements <ArrowUpRight size={16} />
          </Link>
        </div>
        <div>
          {p.awards?.map((r) => (
            <AcademicCard key={r.id} record={r} />
          ))}
        </div>
      </section>
      <section className="section voice-section">
        <div className="container">
          <SectionHeader
            eyebrow="VOICES & PERSPECTIVES"
            title="Scholarship is a shared journey"
          />
          <Voices voices={p.voices ?? []} />
        </div>
      </section>
      <section className="container cv-callout">
        <div>
          <span className="eyebrow">THE COMPLETE ACADEMIC JOURNEY</span>
          <h2>Discover the work behind the ideas.</h2>
          <p>
            Explore qualifications, research, teaching, and professional
            contributions.
          </p>
        </div>
        <Link href="/cv" className="button button-gold">
          View Curriculum Vitae <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
export function ActivityGallery({ news }: { news: AcademicRecord[] }) {
  const [index, setIndex] = useState(0);
  const visible = news.length
    ? [news[index % news.length], news[(index + 1) % news.length]]
    : [];
  return (
    <>
      <div className="gallery-grid">
        {visible.map((r, i) => (
          <Link
            href={'/news/' + r.id}
            className="activity-card"
            key={r.id + '-' + i}
          >
            <img
              src={r.media}
              alt="Illustrative academic campus scene"
              width="700"
              height="440"
              loading="lazy"
            />
            <div>
              <span className="eyebrow">
                {r.category} · {r.date}
              </span>
              <h3>{r.title}</h3>
              <ArrowUpRight size={20} />
            </div>
          </Link>
        ))}
      </div>
      <div className="gallery-bottom">
        <span className="small muted">
          Illustrative academic activities · local demo media
        </span>
        <div className="carousel-controls">
          <button
            className="icon-button"
            aria-label="Previous activity"
            onClick={() => setIndex((index + news.length - 1) % news.length)}
          >
            <ChevronLeft size={18} />
          </button>
          <span aria-live="polite">
            {index + 1} / {news.length}
          </span>
          <button
            className="icon-button"
            aria-label="Next activity"
            onClick={() => setIndex((index + 1) % news.length)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
