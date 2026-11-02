import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect } from 'vitest';
vi.mock('@inertiajs/react', () => ({
  Link: ({ children, ...props }: React.ComponentProps<'a'>) => (
    <a {...props}>{children}</a>
  ),
}));
import Directory, { filterRecords } from '../features/academic/Directory';
import { PublicationCard } from '../components/shared';
import type { AcademicRecord, PortfolioProps } from '../types/academic';
const records: AcademicRecord[] = Array.from({ length: 4 }, (_, i) => ({
  id: 'p' + i,
  title: 'Sustainable systems ' + i,
  year: 2025 - i,
  category: i === 0 ? 'Journal Article' : 'Book',
  summary: 'Research into sustainable systems',
  visibility: 'public',
  authors: i === 0 ? 'Lee' : 'Morgan',
  indexing: 'Scopus',
  citation: 'Example citation',
}));
it('combines author, category and year filters', () => {
  expect(
    filterRecords(
      records,
      'lee',
      'Journal Article',
      '2025',
      '',
      'Scopus',
      'newest',
    ),
  ).toHaveLength(1);
  expect(
    filterRecords(records, 'missing', '', '', '', '', 'newest'),
  ).toHaveLength(0);
  expect(filterRecords(records, '', '', '', '', '', 'oldest')[0].year).toBe(
    2022,
  );
});
it('supports search, empty state and pagination', async () => {
  const user = userEvent.setup();
  const props = {
    section: 'publications',
    catalog: {},
    statistics: [],
    records,
  } as unknown as PortfolioProps;
  render(<Directory {...props} />);
  expect(screen.getByText('Page 1 of 2')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(screen.getByText('Page 2 of 2')).toBeVisible();
  await user.type(screen.getByRole('textbox'), 'no results');
  expect(screen.getByText('No matching records')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Clear filters' }));
  expect(screen.getByText('Page 1 of 2')).toBeVisible();
});
it('expands abstract and copies the citation', async () => {
  const user = userEvent.setup();
  render(<PublicationCard record={records[0]} />);
  await user.click(screen.getByText('Read abstract & citation'));
  expect(screen.getByText('Example citation')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Copy citation' }));
  expect(await screen.findByText('Citation copied')).toBeVisible();
});
