
import { LetterGrade } from './constants.ts';

export interface Course {
  id: string;
  name: string;
  grade: LetterGrade | ''; // Grade can be unselected initially
  // 'credits' field removed; will use a fixed value for GPA calculation
}

export interface SemesterData {
  id:string;
  year: string; // New field for Year/Term
  gpa: number | string; // GPA can be empty string initially
  // 'credits' field removed, CGPA will be an average of GPAs
}
