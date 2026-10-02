export interface StudentSubmission {
  id: string;
  studentName: string;
  studentNis: string;
  studentClass: string;
  startTime: number;
  submitTime: number;
  answers: Record<string, string>;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  predikat: string;
  status: string;
}

export interface ExamSettings {
  examTitle: string;
  examToken: string;
  durationMinutes: number;
  isOpen: boolean;
  passingGrade: number;
  allowReview: boolean;
}

export interface TeacherUser {
  username: string;
  name: string;
  nip: string;
  role: 'guru';
}

export interface ItemAnalysisData {
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passingCount: number;
  passingRate: number;
  questionSuccessRates: Record<number, number>;
}

export const apiService = {
  // Check Health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch('/api/health');
      return res.ok;
    } catch {
      return false;
    }
  },

  // Teacher Login
  async loginTeacher(username: string, password: string): Promise<{ success: boolean; user?: TeacherUser; token?: string; message?: string }> {
    try {
      const res = await fetch('/api/auth/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('auth_teacher_token', data.token);
        localStorage.setItem('auth_teacher_profile', JSON.stringify(data.user));
        return { success: true, user: data.user, token: data.token };
      }
      return { success: false, message: data.message || 'Login gagal' };
    } catch {
      // Offline fallback
      if (username === 'guru_tkj' && password === 'adminperakitan') {
        const dummyUser: TeacherUser = {
          username: 'guru_tkj',
          name: 'Bapak Guru TKJ',
          nip: '19870512 201201 1 003',
          role: 'guru'
        };
        localStorage.setItem('auth_teacher_token', 'offline_token');
        localStorage.setItem('auth_teacher_profile', JSON.stringify(dummyUser));
        return { success: true, user: dummyUser, token: 'offline_token' };
      }
      return { success: false, message: 'Koneksi ke server terputus. Pastikan username dan password benar.' };
    }
  },

  // Check current logged in teacher
  getLoggedInTeacher(): TeacherUser | null {
    try {
      const saved = localStorage.getItem('auth_teacher_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  logoutTeacher(): void {
    localStorage.removeItem('auth_teacher_token');
    localStorage.removeItem('auth_teacher_profile');
  },

  // Update teacher credentials
  async updateTeacherProfile(payload: { newUsername?: string; newPassword?: string; newName?: string; newNip?: string; currentPassword: string }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/auth/teacher/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.user) {
          localStorage.setItem('auth_teacher_profile', JSON.stringify(data.user));
        }
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Gagal mengubah profil' };
    } catch {
      return { success: false, message: 'Gagal terhubung ke server database' };
    }
  },

  // Get exam settings
  async getExamSettings(): Promise<ExamSettings> {
    try {
      const res = await fetch('/api/exam-settings');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Using default settings fallback', e);
    }
    return {
      examTitle: 'Asesmen Akademik Perakitan Komputer - SMK Kelas X TKJ',
      examToken: 'TKJ-2026',
      durationMinutes: 90,
      isOpen: true,
      passingGrade: 75,
      allowReview: true
    };
  },

  // Get full settings for teacher (includes token)
  async getTeacherSettings(): Promise<{ settings: ExamSettings; profile: { username: string; name: string; nip: string } }> {
    try {
      const res = await fetch('/api/teacher/settings');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Using teacher settings fallback', e);
    }
    return {
      settings: {
        examTitle: 'Asesmen Akademik Perakitan Komputer - SMK Kelas X TKJ',
        examToken: 'TKJ-2026',
        durationMinutes: 90,
        isOpen: true,
        passingGrade: 75,
        allowReview: true
      },
      profile: {
        username: 'guru_tkj',
        name: 'Bapak Guru TKJ',
        nip: '19870512 201201 1 003'
      }
    };
  },

  // Update exam settings (Guru)
  async updateExamSettings(settings: Partial<ExamSettings>): Promise<boolean> {
    try {
      const res = await fetch('/api/exam-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Validate Token for Student
  async validateToken(token: string): Promise<{ valid: boolean; message: string }> {
    try {
      const res = await fetch('/api/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      return { valid: res.ok && data.valid, message: data.message };
    } catch {
      if (token.toUpperCase().trim() === 'TKJ-2026') {
        return { valid: true, message: 'Token valid (offline mode)' };
      }
      return { valid: false, message: 'Token salah atau server tidak terjangkau' };
    }
  },

  // Save Student Draft
  async saveDraft(payload: {
    studentNis: string;
    studentName: string;
    studentClass: string;
    answers: Record<string, string>;
    flagged: Record<string, boolean>;
    timeLeft: number;
  }): Promise<boolean> {
    try {
      // Local backup first
      localStorage.setItem(`draft_${payload.studentNis}`, JSON.stringify(payload));
      const res = await fetch('/api/draft-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Load Student Draft
  async loadDraft(studentNis: string): Promise<{ found: boolean; draft?: any }> {
    try {
      const res = await fetch(`/api/draft-load/${encodeURIComponent(studentNis)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found) return data;
      }
    } catch {
      // fallback to local
    }
    const local = localStorage.getItem(`draft_${studentNis}`);
    if (local) {
      try {
        return { found: true, draft: JSON.parse(local) };
      } catch {
        return { found: false };
      }
    }
    return { found: false };
  },

  // Submit Exam
  async submitExam(submission: Omit<StudentSubmission, 'id'>): Promise<{ success: boolean; submission?: StudentSubmission }> {
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      if (res.ok) {
        const data = await res.json();
        // Clear draft
        localStorage.removeItem(`draft_${submission.studentNis}`);
        return { success: true, submission: data.submission };
      }
    } catch (e) {
      console.warn('Server submit failed, saving locally', e);
    }

    // Local fallback save
    const fallbackSubmission: StudentSubmission = {
      ...submission,
      id: `local_${Date.now()}`
    };
    try {
      const saved = localStorage.getItem('local_submissions') || '[]';
      const parsed = JSON.parse(saved);
      parsed.unshift(fallbackSubmission);
      localStorage.setItem('local_submissions', JSON.stringify(parsed));
    } catch {}
    return { success: true, submission: fallbackSubmission };
  },

  // Get Submissions (Guru)
  async getSubmissions(studentClass?: string, search?: string): Promise<StudentSubmission[]> {
    try {
      let url = '/api/submissions?';
      if (studentClass && studentClass !== 'all') url += `studentClass=${encodeURIComponent(studentClass)}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.submissions || [];
      }
    } catch (e) {
      console.warn('Falling back to local submissions', e);
    }
    const local = localStorage.getItem('local_submissions');
    return local ? JSON.parse(local) : [];
  },

  // Delete Submission (Guru)
  async deleteSubmission(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Get Item Analytics
  async getAnalytics(): Promise<ItemAnalysisData> {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Analytics API error', e);
    }
    return {
      totalStudents: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passingCount: 0,
      passingRate: 0,
      questionSuccessRates: {}
    };
  }
};
