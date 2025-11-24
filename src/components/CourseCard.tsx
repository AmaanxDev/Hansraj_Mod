import { Course } from '../lib/supabase';
import { MoreVertical } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  attendancePercentage?: number;
}

export function CourseCard({ course, attendancePercentage }: CourseCardProps) {
  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'CLASS':
        return 'bg-red-500';
      case 'TUTORIAL':
        return 'bg-red-500';
      case 'PRACTICAL':
        return 'bg-red-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 flex">
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {course.course_name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          {course.course_code}
        </p>
        <p className="text-gray-500 text-xs">
          Group Type: {course.group_type}
        </p>
      </div>
      <div className={`${getGroupTypeColor(course.group_type)} w-20 flex items-center justify-center`}>
        <button className="text-white p-2 hover:bg-black/10 rounded-lg transition-colors">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
