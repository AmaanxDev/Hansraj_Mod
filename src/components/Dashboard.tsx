import { User, Calendar, Bell } from 'lucide-react';

interface DashboardProps {
  studentName: string;
  onNavigate: (view: 'profile' | 'attendance' | 'notices') => void;
}

export function Dashboard({ studentName, onNavigate }: DashboardProps) {
  const firstName = studentName.split(' ').pop() || studentName;
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-4 pt-6">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-2">{currentDate}</p>
            <h1 className="text-2xl font-bold text-gray-900">
              Hi {firstName}, welcome
            </h1>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="bg-yellow-400 rounded-3xl p-3 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
          >
            <User className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div
          className="rounded-3xl p-8 mb-8 relative overflow-hidden h-48 flex items-end bg-cover bg-center"
          style={{
            backgroundImage: `url(/Gemini_Generated_Image_m1vkmkm1vkmkm1vk.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 flex-1">
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavigate('attendance')}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
          >
            <div className="bg-yellow-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-3">
              <Calendar className="w-8 h-8 text-yellow-600" strokeWidth={1.5} />
            </div>
            <p className="text-gray-900 font-semibold text-base text-center">Attendance</p>
          </button>

          <button
            onClick={() => onNavigate('notices')}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
          >
            <div className="bg-yellow-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-3">
              <Bell className="w-8 h-8 text-yellow-600" strokeWidth={1.5} />
            </div>
            <p className="text-gray-900 font-semibold text-base text-center">Notices</p>
          </button>
        </div>
      </div>
    </div>
  );
}
