import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect } from 'vitest';
vi.mock('@inertiajs/react', () => ({
  Link: ({ children, ...props }: React.ComponentProps<'a'>) => (
    <a {...props}>{children}</a>
  ),
}));
import Contact from '../features/contact/Contact';
import type { AcademicProfile } from '../types/academic';
it('validates an empty message and confirms a valid mock submit', async () => {
  const user = userEvent.setup();
  render(
    <Contact
      profile={
        {
          email: 'academic@example.org',
          office: 'Fictional office',
        } as AcademicProfile
      }
    />,
  );
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByText('Please enter your full name.')).toBeVisible();
  await user.type(screen.getByLabelText(/Full name/), 'Example Researcher');
  await user.type(
    screen.getByLabelText(/Email address/),
    'researcher@example.org',
  );
  await user.type(screen.getByLabelText(/Subject/), 'Research partnership');
  await user.type(
    screen.getByLabelText(/Your message/),
    'I would like to discuss a demonstration collaboration.',
  );
  await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByText('Thank you for reaching out.')).toBeVisible();
  expect(screen.getByText(/No message was sent or stored/)).toBeVisible();
});
