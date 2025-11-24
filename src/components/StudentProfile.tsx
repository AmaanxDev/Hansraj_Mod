import { Student } from '../lib/supabase';

interface StudentProfileProps {
  student: Student;
}

export function StudentProfile({ student }: StudentProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Name
          </label>
          <input
            type="text"
            value={student.name}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            College Roll No.
          </label>
          <input
            type="text"
            value={student.college_roll_no}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={student.email}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
