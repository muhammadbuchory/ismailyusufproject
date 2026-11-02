import type { Submission, SubmissionStatus } from '../../types/academic';
export function transition(
  record: Submission,
  next: SubmissionStatus,
  role: string,
  feedback = '',
): Submission {
  if (
    next === 'Pending Review' &&
    role === 'Staff' &&
    record.status === 'Draft' &&
    record.evidence
  )
    return { ...record, status: next };
  if (
    role === 'Administrator' &&
    record.status === 'Pending Review' &&
    ['Approved', 'Rejected'].includes(next)
  )
    return { ...record, status: next, feedback };
  return record;
}
export function reorder<T>(items: T[], index: number, direction: number): T[] {
  const next = [...items];
  const target = index + direction;
  if (target < 0 || target >= next.length) return items;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
