import { Course } from '../lib/supabase';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  overallAttendance: number;
}

export function CourseList({ courses, overallAttendance }: CourseListProps) {
  return (
    <div className="pb-20">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <p className="text-center text-lg font-semibold text-blue-900">
          Overall Attendance 76.6%
        </p>
      </div>
    </div>
  );
}
