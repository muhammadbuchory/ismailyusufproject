export type Visibility = 'public' | 'extended' | 'private';
export interface AcademicRecord {
  id: string;
  title: string;
  year: number;
  category: string;
  summary: string;
  visibility: Visibility;
  institution?: string;
  period?: string;
  status?: string;
  start?: string;
  end?: string;
  funding?: string;
  scheme?: string;
  reference?: string;
  team?: string[];
  objectives?: string[];
  keywords?: string[];
  authors?: string;
  journal?: string;
  indexing?: string;
  citation?: string;
  thesis?: string;
  supervisor?: string;
  abstract?: string;
  code?: string;
  credits?: number;
  role?: string;
  language?: string;
  mode?: string;
  type?: string;
  area?: string;
  date?: string;
  location?: string;
  media?: string;
}
export interface AcademicProfile {
  name: string;
  brandName: string;
  initials: string;
  role: string;
  institution: string;
  country: string;
  email: string;
  office: string;
  statement: string;
  bio: string;
  interests: string[];
  notice: string;
  socials: string[];
}
export interface Statistic {
  label: string;
  value: number;
  note: string;
}
export interface Voice {
  id: string;
  name: string;
  position: string;
  institution: string;
  quote: string;
}
export interface PortfolioProps {
  section: string;
  profile: AcademicProfile;
  catalog: Record<string, { title: string; subtitle: string }>;
  statistics: Statistic[];
  records?: AcademicRecord[];
  research?: AcademicRecord[];
  publications?: AcademicRecord[];
  education?: AcademicRecord[];
  news?: AcademicRecord[];
  awards?: AcademicRecord[];
  voices?: Voice[];
  detail?: boolean;
  cvMode?: Visibility;
  cvSections?: Record<string, AcademicRecord[]>;
}
export type SubmissionStatus =
  'Draft' | 'Pending Review' | 'Approved' | 'Rejected';
export interface Submission {
  id: string;
  title: string;
  category: string;
  year: number;
  summary: string;
  status: SubmissionStatus;
  visibility: Visibility;
  evidence: { name: string; size: number } | null;
  submittedBy: string;
  date: string;
  feedback?: string;
  metadata?: Record<string, string>;
}
