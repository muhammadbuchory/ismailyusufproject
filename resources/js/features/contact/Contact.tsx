import { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import type { AcademicProfile } from '../../types/academic';
import { PageHeader } from '../../components/shared';
import { Button } from '../../components/ui/button';
const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.email('Please enter a valid email address.'),
  subject: z.string().trim().min(3, 'Please enter a subject.'),
  message: z.string().trim().min(20, 'Please enter at least 20 characters.'),
  consent: z.literal(true, {
    error: 'Please acknowledge the demonstration notice.',
  }),
});
export default function Contact({ profile }: { profile: AcademicProfile }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = schema.safeParse({
      ...Object.fromEntries(form),
      consent: form.get('consent') === 'on',
    });
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((i) => [String(i.path[0]), i.message]),
        ),
      );
      return;
    }
    setErrors({});
    setSent(true);
  }
  return (
    <>
      <PageHeader
        title="Let's connect"
        description="Good ideas begin with a conversation. Explore opportunities for research, teaching, and collaboration."
      />
      <div className="container section contact-grid">
        <div>
          <span className="eyebrow">CONTACT & COLLABORATION</span>
          <h2>
            A conversation can
            <br />
            open new possibilities.
          </h2>
          <p className="muted">
            For research partnerships, academic enquiries, or speaking
            invitations, use the demonstration form.
          </p>
          <div className="contact-method">
            <Mail />
            <div>
              <h3>Academic enquiries</h3>
              <span>{profile.email}</span>
              <small>Reserved example address · not monitored</small>
            </div>
          </div>
          <div className="contact-method">
            <MapPin />
            <div>
              <h3>Office</h3>
              <p>{profile.office}</p>
              <small>Fictional location for this demonstration</small>
            </div>
          </div>
          <p className="demo-note">
            No email is sent. Messages and files are never saved.
          </p>
        </div>
        <div className="contact-form">
          {sent ? (
            <div role="status" className="success-state">
              <CheckCircle size={42} />
              <h2>Thank you for reaching out.</h2>
              <p>
                Your demonstration message has been validated. No message was
                sent or stored.
              </p>
              <Button variant="outline" onClick={() => setSent(false)}>
                Try another message
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2>Start a conversation</h2>
              {[
                ['name', 'Full name'],
                ['email', 'Email address'],
                ['subject', 'Subject'],
                ['message', 'Your message'],
              ].map(([key, label]) => (
                <div className="field" key={key}>
                  <label htmlFor={key}>
                    {label} <span aria-hidden="true">*</span>
                  </label>
                  {key === 'message' ? (
                    <textarea
                      id={key}
                      name={key}
                      rows={5}
                      required
                      aria-invalid={!!errors[key]}
                      aria-describedby={key + '-error'}
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type={key === 'email' ? 'email' : 'text'}
                      required
                      aria-invalid={!!errors[key]}
                      aria-describedby={key + '-error'}
                    />
                  )}
                  <span id={key + '-error'} role="alert" className="form-error">
                    {errors[key]}
                  </span>
                </div>
              ))}
              <label className="checkbox-label">
                <input
                  name="consent"
                  type="checkbox"
                  aria-describedby="consent-error"
                />
                I understand this is a demonstration. No message will be sent.
              </label>
              <p id="consent-error" role="alert" className="form-error">
                {errors.consent}
              </p>
              <p className="verification-note">
                Anti-spam verification placeholder · inactive in demo mode
              </p>
              <Button type="submit">
                Submit <ArrowUpRight size={16} />
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
