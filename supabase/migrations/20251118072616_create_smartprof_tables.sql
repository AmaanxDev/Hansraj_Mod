/*
  # SmartProf Hansraj Database Schema

  ## Overview
  Creates the database structure for the SmartProf Hansraj attendance tracking application.

  ## New Tables
  
  ### `students`
  - `id` (uuid, primary key) - Unique identifier for each student
  - `name` (text) - Student's full name
  - `college_roll_no` (text, unique) - College roll number
  - `email` (text, unique) - Student email address
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `courses`
  - `id` (uuid, primary key) - Unique identifier for each course
  - `student_id` (uuid, foreign key) - References students table
  - `course_name` (text) - Name of the course
  - `course_code` (text) - Course code/identifier
  - `department` (text) - Department offering the course
  - `semester` (text) - Semester/term
  - `group_number` (text) - Group or section number
  - `group_type` (text) - Type: CLASS, TUTORIAL, PRACTICAL
  - `created_at` (timestamptz) - Record creation timestamp

  ### `attendance_records`
  - `id` (uuid, primary key) - Unique identifier for each attendance record
  - `course_id` (uuid, foreign key) - References courses table
  - `date` (date) - Date of attendance
  - `status` (text) - Attendance status: PRESENT, ABSENT, LATE
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Students can only access their own data
  - Authenticated users can view and manage their attendance records

  ## Indexes
  - Index on student email for faster lookups
  - Index on college_roll_no for quick searches
  - Index on course student_id for efficient queries
  - Index on attendance course_id for performance
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  college_roll_no text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_name text NOT NULL,
  course_code text NOT NULL,
  department text NOT NULL DEFAULT '',
  semester text NOT NULL DEFAULT '',
  group_number text NOT NULL DEFAULT '',
  group_type text NOT NULL DEFAULT 'CLASS',
  created_at timestamptz DEFAULT now()
);

-- Create attendance_records table
CREATE TABLE IF NOT EXISTS attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'PRESENT',
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_roll_no ON students(college_roll_no);
CREATE INDEX IF NOT EXISTS idx_courses_student_id ON courses(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course_id ON attendance_records(course_id);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for students table
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- RLS Policies for courses table
CREATE POLICY "Students can view own courses"
  ON courses FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = courses.student_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can insert own courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = courses.student_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can update own courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = courses.student_id
      AND auth.uid()::text = students.id::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = courses.student_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can delete own courses"
  ON courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = courses.student_id
      AND auth.uid()::text = students.id::text
    )
  );

-- RLS Policies for attendance_records table
CREATE POLICY "Students can view own attendance"
  ON attendance_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      JOIN students ON students.id = courses.student_id
      WHERE courses.id = attendance_records.course_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can insert own attendance"
  ON attendance_records FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      JOIN students ON students.id = courses.student_id
      WHERE courses.id = attendance_records.course_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can update own attendance"
  ON attendance_records FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      JOIN students ON students.id = courses.student_id
      WHERE courses.id = attendance_records.course_id
      AND auth.uid()::text = students.id::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses
      JOIN students ON students.id = courses.student_id
      WHERE courses.id = attendance_records.course_id
      AND auth.uid()::text = students.id::text
    )
  );

CREATE POLICY "Students can delete own attendance"
  ON attendance_records FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      JOIN students ON students.id = courses.student_id
      WHERE courses.id = attendance_records.course_id
      AND auth.uid()::text = students.id::text
    )
  );