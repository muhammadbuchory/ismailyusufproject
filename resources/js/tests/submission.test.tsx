import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';
import SubmissionForm from '../features/dashboard/SubmissionForm';
import type { Submission } from '../types/academic';
it('normalizes an existing publication fixture into the publication form and requires evidence', async () => {
  const user = userEvent.setup();
  const save = vi.fn();
  const record: Submission = {
    id: 'pub-1',
    title: 'A sample publication',
    year: 2025,
    category: 'Journal Article',
    summary: 'A sufficiently long sample academic publication.',
    status: 'Approved',
    visibility: 'public',
    evidence: null,
    submittedBy: 'Demo Staff',
    date: '2026-11-02',
  };
  render(<SubmissionForm initial={record} onSave={save} onCancel={() => {}} />);
  expect(screen.getByLabelText('Academic category')).toHaveValue('Publication');
  await user.type(screen.getByLabelText('Authors'), 'Example Author');
  await user.type(
    screen.getByLabelText('Journal / publisher'),
    'Example Journal',
  );
  await user.click(screen.getByRole('button', { name: 'Save local draft' }));
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Select a supporting evidence file',
  );
  expect(save).not.toHaveBeenCalled();
});
