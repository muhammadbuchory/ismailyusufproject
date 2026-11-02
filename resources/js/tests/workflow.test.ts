import { describe, it, expect } from 'vitest';
import { transition, reorder } from '../features/verification/workflow';
import type { Submission } from '../types/academic';
const draft: Submission = {
  id: 'draft',
  title: 'A research entry',
  year: 2026,
  category: 'Research',
  summary: 'A demonstration research project.',
  status: 'Draft',
  visibility: 'public',
  evidence: { name: 'proof.pdf', size: 120 },
  submittedBy: 'Demo Staff',
  date: '2026-11-02',
};
describe('transient academic review', () => {
  it('requires evidence before staff can submit', () => {
    expect(
      transition({ ...draft, evidence: null }, 'Pending Review', 'Staff')
        .status,
    ).toBe('Draft');
    expect(transition(draft, 'Pending Review', 'Staff').status).toBe(
      'Pending Review',
    );
  });
  it('prevents staff approval and preserves rejection distinctly', () => {
    const pending = transition(draft, 'Pending Review', 'Staff');
    expect(transition(pending, 'Approved', 'Staff').status).toBe(
      'Pending Review',
    );
    expect(
      transition(pending, 'Rejected', 'Administrator', 'Incomplete evidence')
        .status,
    ).toBe('Rejected');
    expect(transition(pending, 'Approved', 'Administrator').status).toBe(
      'Approved',
    );
  });
  it('does not approve drafts directly', () =>
    expect(transition(draft, 'Approved', 'Administrator').status).toBe(
      'Draft',
    ));
  it('reorders without mutating source or moving outside bounds', () => {
    const source = ['one', 'two', 'three'];
    expect(reorder(source, 1, -1)).toEqual(['two', 'one', 'three']);
    expect(source).toEqual(['one', 'two', 'three']);
    expect(reorder(source, 0, -1)).toEqual(source);
  });
});
