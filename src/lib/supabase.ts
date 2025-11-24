import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Student {
  id: string;
  name: string;
  college_roll_no: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  student_id: string;
  course_name: string;
  course_code: string;
  department: string;
  semester: string;
  group_number: string;
  group_type: 'CLASS' | 'TUTORIAL' | 'PRACTICAL';
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  course_id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  created_at: string;
}
