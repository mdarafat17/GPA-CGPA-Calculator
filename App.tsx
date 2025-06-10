
import React, { useState, useCallback, useEffect } from 'react';
import { Course, SemesterData } from './types.ts';
import {
  LETTER_GRADE_OPTIONS,
  GRADE_TO_POINT_MAP,
  LetterGrade,
  DEFAULT_NEW_SEMESTER,
  FIXED_CREDIT_VALUE_PER_COURSE
} from './constants.ts';
import { Input } from './components/Input.tsx';
import { Select } from './components/Select.tsx';
import { Button } from './components/Button.tsx';
import { Card } from './components/Card.tsx';
import { TrashIcon, PlusIcon, CalculatorIcon } from './components/Icons.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gpa' | 'cgpa'>('gpa');

  // GPA State
  const initialCourseName = "Subject 1";
  const [courses, setCourses] = useState<Course[]>([{ name: initialCourseName, grade: '', id: crypto.randomUUID() }]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [gpaMessage, setGpaMessage] = useState<string>('');

  // CGPA State
  const [semesters, setSemesters] = useState<SemesterData[]>([{ ...DEFAULT_NEW_SEMESTER, id: crypto.randomUUID() }]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [cgpaMessage, setCgpaMessage] = useState<string>('');

  const addCourse = () => {
    setCourses(prev => [...prev, { name: `Subject ${prev.length + 1}`, grade: '', id: crypto.randomUUID() }]);
    setGpa(null);
    setGpaMessage('');
  };

  const removeCourse = (id: string) => {
    setCourses(prev => {
      const newCourses = prev.filter(course => course.id !== id);
      return newCourses;
    });
    setGpa(null);
    setGpaMessage('');
  };

  const updateCourse = (id: string, field: keyof Omit<Course, 'id'>, value: string | LetterGrade) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
    setGpa(null);
    setGpaMessage('');
  };
  
  const calculateGpa = useCallback(() => {
    let totalWeightedPoints = 0;
    let totalFixedCredits = 0;
    let validEntries = 0; 

    courses.forEach(course => {
      const grade = course.grade;
      if (grade) { 
        const gradePoint = GRADE_TO_POINT_MAP[grade as LetterGrade];
        totalWeightedPoints += gradePoint * FIXED_CREDIT_VALUE_PER_COURSE;
        totalFixedCredits += FIXED_CREDIT_VALUE_PER_COURSE;
        validEntries++;
      }
    });

    const coursesWithAttemptedInput = courses.filter(c => c.name || c.grade);

    if (totalFixedCredits > 0 && validEntries > 0 && validEntries === coursesWithAttemptedInput.length) {
        setGpa(parseFloat((totalWeightedPoints / totalFixedCredits).toFixed(2)));
        setGpaMessage(''); 
    } else {
        setGpa(null);
        if (courses.length === 0 || coursesWithAttemptedInput.length === 0) {
            setGpaMessage('Please add courses and select their grades to calculate GPA.');
        } else if (validEntries < coursesWithAttemptedInput.length) {
             setGpaMessage('Please ensure all entered courses have a selected grade.');
        } else {
             setGpaMessage('Unable to calculate GPA. Check your inputs.');
        }
    }
  }, [courses]);

  const addSemester = () => {
    setSemesters(prev => [...prev, { ...DEFAULT_NEW_SEMESTER, id: crypto.randomUUID() }]);
    setCgpa(null);
    setCgpaMessage('');
  };

  const removeSemester = (id: string) => {
    setSemesters(prev => prev.filter(semester => semester.id !== id));
    setCgpa(null);
    setCgpaMessage('');
  };

  const updateSemester = (id: string, field: keyof Omit<SemesterData, 'id'>, value: string | number) => {
    setSemesters(prevSemesters =>
      prevSemesters.map(semester =>
        semester.id === id ? { ...semester, [field]: value } : semester
      )
    );
    setCgpa(null);
    setCgpaMessage('');
  };

  const calculateCgpa = useCallback(() => {
    let totalGpaSum = 0;
    let validTermCount = 0;

    semesters.forEach(semester => {
      const semGpaNum = parseFloat(String(semester.gpa));
      if (!isNaN(semGpaNum) && semGpaNum >= 0 && semGpaNum <= 4.0) {
        totalGpaSum += semGpaNum;
        validTermCount++;
      }
    });
    
    const semestersWithAttemptedInput = semesters.filter(s => s.year || s.gpa);

    if (validTermCount > 0 && validTermCount === semestersWithAttemptedInput.length) {
        setCgpa(parseFloat((totalGpaSum / validTermCount).toFixed(2)));
        setCgpaMessage('');
    } else {
        setCgpa(null);
        if (semesters.length === 0 || semestersWithAttemptedInput.length === 0) {
            setCgpaMessage('Please add year/term entries and their GPAs to calculate CGPA.');
        } else if (validTermCount < semestersWithAttemptedInput.length) {
             setCgpaMessage('Please ensure all entered year/terms have a valid Year/Term name and GPA (0-4).');
        } else {
            setCgpaMessage('Unable to calculate CGPA. Check your inputs.');
        }
    }
  }, [semesters]);

  const TabButton: React.FC<{isActive: boolean; onClick: () => void; children: React.ReactNode}> = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium rounded-md focus:outline-none transition-colors duration-150
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 tracking-tight flex items-center justify-center">
          <CalculatorIcon className="h-8 w-8 sm:h-10 sm:w-10 mr-2 text-indigo-600" />
          GPA & CGPA Calculator
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">A simple tool to track your academic performance with ease.</p>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-center space-x-2 sm:space-x-4 p-1 bg-gray-200 rounded-lg shadow">
          <TabButton isActive={activeTab === 'gpa'} onClick={() => setActiveTab('gpa')}>GPA Calculator</TabButton>
          <TabButton isActive={activeTab === 'cgpa'} onClick={() => setActiveTab('cgpa')}>CGPA Calculator</TabButton>
        </div>

        {activeTab === 'gpa' && (
          <Card title="Semester GPA Calculator" className="mb-8" bodyClassName="space-y-6">
            <div>
              {courses.map((course, index) => (
                <div key={course.id} className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-3 mb-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                  <Input
                    label={index === 0 ? "Course Name" : undefined}
                    placeholder={`e.g. ${course.name || `Subject ${index + 1}`}`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    containerClassName="flex-grow w-full sm:w-auto"
                    className="text-sm"
                  />
                  <Select
                    label={index === 0 ? "Grade" : undefined}
                    options={LETTER_GRADE_OPTIONS}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value as LetterGrade | '')}
                    containerClassName="w-full sm:w-auto sm:min-w-[150px]"
                    className="text-sm"
                  />
                  <Button variant="icon" onClick={() => removeCourse(course.id)} className="text-red-500 hover:text-red-700 self-start sm:self-center !p-2 mt-1 sm:mt-0" aria-label="Remove course" disabled={courses.length <= 1 && course.name === initialCourseName && courses[0].id === course.id}>
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              <Button onClick={addCourse} variant="secondary" size="sm" className="mt-2">
                <PlusIcon className="w-4 h-4 mr-1.5" /> Add Course
              </Button>
            </div>
            
            <div className="mt-6">
                <Button onClick={calculateGpa} variant="primary" className="w-full sm:w-auto">
                    Calculate GPA
                </Button>
                <p className="text-xs text-white mt-2">Note: Each course is assumed to have <strong>{FIXED_CREDIT_VALUE_PER_COURSE} credits</strong> for GPA calculation.</p>
            </div>

            {gpa !== null && (
              <div className="mt-5 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow">
                <h3 className="text-xl font-semibold text-green-800">Your Semester GPA is: <span className="text-2xl">{gpa.toFixed(2)}</span></h3>
              </div>
            )}
            {gpa === null && gpaMessage && (
              <div className="mt-5 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md text-sm text-yellow-700">
                {gpaMessage}
              </div>
            )}
          </Card>
        )}

        {activeTab === 'cgpa' && (
          <Card title="Cumulative CGPA Calculator" className="mb-8" bodyClassName="space-y-6">
            <div>
              {semesters.map((semester, index) => (
                <div key={semester.id} className="flex flex-col sm:flex-row sm:items-end space-y-2 sm:space-y-0 sm:space-x-3 mb-3 p-3 border border-gray-200 rounded-md bg-gray-50">
                  <Input
                    label={index === 0 ? "Year/Term" : undefined}
                    placeholder="e.g. Year 1 / Fall 2023"
                    value={semester.year}
                    onChange={(e) => updateSemester(semester.id, 'year', e.target.value)}
                    containerClassName="w-full sm:flex-1"
                    className="text-sm"
                  />
                  <Input
                    label={index === 0 ? "GPA this Year/Term" : undefined}
                    type="number"
                    placeholder="e.g. 3.75"
                    value={semester.gpa}
                    min="0"
                    max="4"
                    step="0.01"
                    onChange={(e) => updateSemester(semester.id, 'gpa', e.target.value === '' ? '' : parseFloat(e.target.value))}
                    containerClassName="w-full sm:flex-1"
                    className="text-sm"
                  />
                  {/* "Credits this Year/Term" Input removed */}
                  <Button variant="icon" onClick={() => removeSemester(semester.id)} className="text-red-500 hover:text-red-700 self-start sm:self-center !p-2 mt-1 sm:mt-0" aria-label="Remove semester" disabled={semesters.length <=1}>
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              <Button onClick={addSemester} variant="secondary" size="sm" className="mt-2">
                <PlusIcon className="w-4 h-4 mr-1.5" /> Add Year/Term
              </Button>
            </div>

            <div className="mt-6">
                <Button onClick={calculateCgpa} variant="primary" className="w-full sm:w-auto">
                    Calculate CGPA
                </Button>
            </div>

            {cgpa !== null && (
              <div className="mt-5 p-4 bg-green-50 border-l-4 border-green-500 rounded-md shadow">
                <h3 className="text-xl font-semibold text-green-800">Your CGPA is: <span className="text-2xl">{cgpa.toFixed(2)}</span></h3>
              </div>
            )}
             {cgpa === null && cgpaMessage && (
              <div className="mt-5 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-md text-sm text-yellow-700">
                {cgpaMessage}
              </div>
            )}
          </Card>
        )}
         <div className="text-center text-xs text-gray-500 mt-8">
          <p>Letter Grade to Grade Point Mapping:</p>
          <p className="mt-1">A+ (4.00), A (3.75), A- (3.50), B+ (3.25), B (3.00), B- (2.75), C+ (2.50), C (2.25), D (2.00), F (0.00)</p>
        </div>
      </main>
      
      <footer className="text-center mt-10 sm:mt-16 text-sm text-gray-500">
        <p>Created by Md Yasin Arafat.</p>
        <p>&copy; {new Date().getFullYear()} GPA/CGPA Calculator.</p>
      </footer>
    </div>
  );
};

export default App;
