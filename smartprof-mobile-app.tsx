import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = 'https://emandocxxvkiewhizbfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtYW5kb2N4eHZraWV3aGl6YmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDkxNDAsImV4cCI6MjA3OTAyNTE0MH0.wKh7braGm35M9uUNRtUK7RiOFJNpIow1kAFAdGRqKwQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Student {
  id: string;
  name: string;
  college_roll_no: string;
  email: string;
}

interface Course {
  id: string;
  course_name: string;
  course_code: string;
  group_type: 'CLASS' | 'TUTORIAL' | 'PRACTICAL';
  semester: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'attendance'>('dashboard');
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const mockStudent: Student = {
      id: '1',
      name: 'English Amaan',
      college_roll_no: '245824465',
      email: 'lifebeggin2@gmail.com',
    };

    const mockCourses: Course[] = [
      {
        id: '1',
        course_name: 'BASIC IT TOOL',
        course_code: 'SEC_BASIC IT TOOL [Physics]',
        group_type: 'PRACTICAL',
        semester: 'Sem_3rd',
      },
      {
        id: '2',
        course_name: 'Design Analysis of Algorithms',
        course_code: 'Physical Science with Computer Science',
        group_type: 'PRACTICAL',
        semester: 'Sem_3rd',
      },
      {
        id: '3',
        course_name: 'Differential Equations (PS)',
        course_code: 'Physical Science',
        group_type: 'CLASS',
        semester: 'Sem_3rd',
      },
      {
        id: '4',
        course_name: 'Heat and thermodynamics',
        course_code: 'Physical Science',
        group_type: 'CLASS',
        semester: 'Sem_3rd',
      },
      {
        id: '5',
        course_name: 'Object Oriented Programming',
        course_code: 'Computer Science',
        group_type: 'CLASS',
        semester: 'Sem_3rd',
      },
    ];

    setStudent(mockStudent);
    setCourses(mockCourses);
    setLoading(false);
  };

  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'CLASS':
        return '#ef4444';
      case 'TUTORIAL':
        return '#f97316';
      case 'PRACTICAL':
        return '#ec4899';
      default:
        return '#ef4444';
    }
  };

  const renderDashboard = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartProf Hansraj</Text>
        <Text style={styles.headerSubtitle}>Version: 1.0.1</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.greeting}>
            <Text style={styles.greetingText}>Hi {student?.name.split(' ').pop()}, welcome</Text>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>

          <View style={styles.heroCard}>
            <View>
              <Text style={styles.heroTitle}>Hansraj Awarded</Text>
              <Text style={styles.heroSubtitle}>A++ Grade</Text>
            </View>
            <View style={styles.heroIcon}>
              <Text style={styles.heroIconText}>🎓</Text>
            </View>
          </View>

          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.navCard}
              onPress={() => setCurrentView('attendance')}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>📋</Text>
              </View>
              <Text style={styles.cardTitle}>Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navCard}
              onPress={() => setCurrentView('profile')}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>👤</Text>
              </View>
              <Text style={styles.cardTitle}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderProfile = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartProf Hansraj</Text>
        <Text style={styles.headerSubtitle}>Version: 1.0.1</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.input}>{student?.name}</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>College Roll No.</Text>
              <Text style={styles.input}>{student?.college_roll_no}</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <Text style={styles.input}>{student?.email}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentView('dashboard')}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAttendance = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartProf Hansraj</Text>
        <Text style={styles.headerSubtitle}>Version: 1.0.1</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {courses.map((course) => (
          <View
            key={course.id}
            style={[
              styles.courseCard,
              { borderLeftColor: getGroupTypeColor(course.group_type) },
            ]}
          >
            <View style={styles.courseContent}>
              <Text style={styles.courseName}>{course.course_name}</Text>
              <Text style={styles.courseCode}>{course.course_code}</Text>
              <Text style={styles.courseType}>Type: {course.group_type}</Text>
            </View>
            <View
              style={[
                styles.courseAction,
                { backgroundColor: getGroupTypeColor(course.group_type) },
              ]}
            >
              <Text style={styles.actionText}>•••</Text>
            </View>
          </View>
        ))}

        <View style={styles.attendanceFooter}>
          <Text style={styles.attendanceText}>Overall Attendance 38.46%</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentView('dashboard')}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'profile' && renderProfile()}
      {currentView === 'attendance' && renderAttendance()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fce4ec',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  avatarBox: {
    width: 60,
    height: 60,
    backgroundColor: '#fef08a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  heroCard: {
    backgroundColor: '#d8b4fe',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroIcon: {
    fontSize: 48,
  },
  heroIconText: {
    fontSize: 48,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  navCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconText: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
    marginBottom: 4,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    fontSize: 14,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  courseContent: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  courseType: {
    fontSize: 11,
    color: '#9ca3af',
  },
  courseAction: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  actionText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  attendanceFooter: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 80,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attendanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003399',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
});
