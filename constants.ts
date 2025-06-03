
import { SemesterData } from './types.ts'; // Course removed as DEFAULT_NEW_COURSE is removed

export enum LetterGrade {
  APlus = 'A+',
  A = 'A',
  AMinus = 'A-',
  BPlus = 'B+',
  B = 'B',
  BMinus = 'B-',
  CPlus = 'C+',
  C = 'C',
  D = 'D',
  F = 'F',
}

export const LETTER_GRADE_OPTIONS: Array<{ value: LetterGrade | ''; label: string }> = [
  { value: '', label: 'Select Grade' },
  { value: LetterGrade.APlus, label: 'A+ (4.00)' },
  { value: LetterGrade.A, label: 'A (3.75)' },
  { value: LetterGrade.AMinus, label: 'A- (3.50)' },
  { value: LetterGrade.BPlus, label: 'B+ (3.25)' },
  { value: LetterGrade.B, label: 'B (3.00)' },
  { value: LetterGrade.BMinus, label: 'B- (2.75)' },
  { value: LetterGrade.CPlus, label: 'C+ (2.50)' },
  { value: LetterGrade.C, label: 'C (2.25)' },
  { value: LetterGrade.D, label: 'D (2.00)' },
  { value: LetterGrade.F, label: 'F (0.00)' },
];

export const GRADE_TO_POINT_MAP: Readonly<Record<LetterGrade, number>> = {
  [LetterGrade.APlus]: 4.00,
  [LetterGrade.A]: 3.75,
  [LetterGrade.AMinus]: 3.50,
  [LetterGrade.BPlus]: 3.25,
  [LetterGrade.B]: 3.00,
  [LetterGrade.BMinus]: 2.75,
  [LetterGrade.CPlus]: 2.50,
  [LetterGrade.C]: 2.25,
  [LetterGrade.D]: 2.00,
  [LetterGrade.F]: 0.00,
};

export const FIXED_CREDIT_VALUE_PER_COURSE = 3;

// DEFAULT_NEW_COURSE removed as initial course and subsequent courses are named dynamically in App.tsx
export const DEFAULT_NEW_SEMESTER: Omit<SemesterData, 'id'> = { year: '', gpa: '' };
