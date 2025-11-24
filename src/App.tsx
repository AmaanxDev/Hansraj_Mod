import { useState, useEffect } from 'react';
import { supabase, Student, Course } from './lib/supabase';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StudentProfile } from './components/StudentProfile';
import { CourseList } from './components/CourseList';

type View = 'dashboard' | 'profile' | 'attendance' | 'notices';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = async () => {
    const mockStudent: Student = {
      id: '1',
      name: 'Amaan',
      college_roll_no: '245824465',
      email: 'lifebeggin2@gmail.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockCourses: Course[] = [
      {
        id: '1',
        student_id: '1',
        course_name: 'BASIC IT TOOL',
        course_code: 'SEC_BASIC IT TOOL [Physics] Sem_3rd Group_3',
        department: 'SEC',
        semester: 'Sem_3rd',
        group_number: 'Group_3',
        group_type: 'PRACTICAL',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        student_id: '1',
        course_name: 'Design Analysis of Algorithms (B.Sc. Prog. PS)',
        course_code: 'Physical Science with Computer Science Sem_3rd',
        department: 'Physical Science with Computer Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'PRACTICAL',
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        student_id: '1',
        course_name: 'Design Analysis of Algorithms (B.Sc. Prog. PS)',
        course_code: 'Physical Science with Computer Science Sem_3rd',
        department: 'Physical Science with Computer Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        student_id: '1',
        course_name: 'Differential Equations (PS)',
        course_code: 'Physical Science with Computer Science Sem_3rd',
        department: 'Physical Science with Computer Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'TUTORIAL',
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        student_id: '1',
        course_name: 'Differential Equations (PS)',
        course_code: 'Physical Science with Computer Science Sem_3rd',
        department: 'Physical Science with Computer Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
      {
        id: '6',
        student_id: '1',
        course_name: 'Heat and thermodynamics (B.Sc. Prog. PS)',
        course_code: 'Physical Science Sem_3rd',
        department: 'Physical Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
      {
        id: '7',
        student_id: '1',
        course_name: 'Heat and thermodynamics (B.Sc. Prog. PS)',
        course_code: 'Physical Science with Computer Science Sem_3rd',
        department: 'Physical Science with Computer Science',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'PRACTICAL',
        created_at: new Date().toISOString(),
      },
      {
        id: '8',
        student_id: '1',
        course_name: 'Object Oriented Programming using Python (B.Sc. Prog. PS)',
        course_code: 'DSE_Object Oriented Programming using Python (...',
        department: 'DSE',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
      {
        id: '9',
        student_id: '1',
        course_name: 'Object Oriented Programming using Python (B.Sc. Prog. PS)',
        course_code: 'DSE_Object Oriented Programming using Python (...',
        department: 'DSE',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'PRACTICAL',
        created_at: new Date().toISOString(),
      },
      {
        id: '10',
        student_id: '1',
        course_name: 'Sanskrit - C :- (Introductory) Culture and Society',
        course_code: 'AEC_Sanskrit C Sem_3rd',
        department: 'AEC',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
      {
        id: '11',
        student_id: '1',
        course_name: 'Vedic Mathematics-II',
        course_code: 'VAC_Vedic Mathematics-II [Mathematics] Sem_3...',
        department: 'VAC',
        semester: 'Sem_3rd',
        group_number: '',
        group_type: 'CLASS',
        created_at: new Date().toISOString(),
      },
    ];

    setStudent(mockStudent);
    setCourses(mockCourses);
    setLoading(false);
  };

  const handleNavigate = (view: 'profile' | 'attendance' | 'notices') => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No student data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onBack={currentView === 'dashboard' ? undefined : handleBack} />
      {currentView === 'dashboard' ? (
        <Dashboard studentName={student.name} onNavigate={handleNavigate} />
      ) : (
        <div className="flex-1 p-4 overflow-y-auto">
          {currentView === 'profile' && <StudentProfile student={student} />}
          {currentView === 'attendance' && (
            <CourseList courses={courses} overallAttendance={38.46} />
          )}
          {currentView === 'notices' && (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-600">No notices at this time</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
