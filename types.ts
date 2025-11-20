export type TemplateStyle = 'Business Blue' | 'Energetic Red' | 'Minimalist Grey' | 'Creative';

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  rawResumeContent: string;
  templateStyle: TemplateStyle;
}

export enum AppView {
  LANDING = 'LANDING',
  BUILDER = 'BUILDER',
}

export const INITIAL_RESUME: ResumeData = {
  fullName: '',
  jobTitle: '',
  email: '',
  rawResumeContent: '',
  templateStyle: 'Business Blue',
};