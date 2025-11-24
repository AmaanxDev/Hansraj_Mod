import { Power } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
}

export function Header({ onBack }: HeaderProps) {
  return (
    <div className="bg-rose-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-bold text-gray-900">
            SmartProf Hansraj
          </h1>
          <span className="text-xs text-gray-500 font-normal">Version: 1.0.1</span>
        </div>
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="text-red-500 hover:text-red-600 transition-colors p-1"
        >
          <Power className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
