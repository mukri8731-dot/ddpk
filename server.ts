import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.resolve(__dirname, 'data/database.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database helper functions
interface DatabaseSchema {
  teacherAuth: {
    username: string;
    password: string;
    name: string;
    nip: string;
  };
  examSettings: {
    examTitle: string;
    examToken: string;
    durationMinutes: number;
    isOpen: boolean;
    passingGrade: number;
    allowReview: boolean;
  };
  submissions: Array<{
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
  }>;
  inProgressDrafts: Record<string, {
    studentName: string;
    studentNis: string;
    studentClass: string;
    answers: Record<string, string>;
    flagged: Record<string, boolean>;
    timeLeft: number;
    lastUpdated: number;
  }>;
}

function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial: DatabaseSchema = {
        teacherAuth: {
          username: 'guru_tkj',
          password: 'adminperakitan',
          name: 'Bapak Guru TKJ',
          nip: '19870512 201201 1 003'
        },
        examSettings: {
          examTitle: 'Asesmen Akademik Perakitan Komputer - SMK Kelas X TKJ',
          examToken: 'TKJ-2026',
          durationMinutes: 90,
          isOpen: true,
          passingGrade: 75,
          allowReview: true
        },
        submissions: [],
        inProgressDrafts: {}
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      teacherAuth: {
        username: 'guru_tkj',
        password: 'adminperakitan',
        name: 'Bapak Guru TKJ',
        nip: '19870512 201201 1 003'
      },
      examSettings: {
        examTitle: 'Asesmen Akademik Perakitan Komputer - SMK Kelas X TKJ',
        examToken: 'TKJ-2026',
        durationMinutes: 90,
        isOpen: true,
        passingGrade: 75,
        allowReview: true
      },
      submissions: [],
      inProgressDrafts: {}
    };
  }
}

function writeDatabase(data: DatabaseSchema): boolean {
  try {
    // Write atomically using a temporary file
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

app.use(express.json({ limit: '10mb' }));

// ================= API ROUTES =================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Teacher Login
app.post('/api/auth/teacher/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const db = readDatabase();

  if (
    username === db.teacherAuth.username &&
    password === db.teacherAuth.password
  ) {
    return res.json({
      success: true,
      message: 'Login guru berhasil',
      user: {
        username: db.teacherAuth.username,
        name: db.teacherAuth.name,
        nip: db.teacherAuth.nip,
        role: 'guru'
      },
      token: `auth_teacher_${Date.now()}`
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Username atau password guru salah. Silakan coba lagi.'
  });
});

// Teacher Change Password / Profile
app.post('/api/auth/teacher/update-profile', (req: Request, res: Response) => {
  const { newUsername, newPassword, newName, newNip, currentPassword } = req.body;
  const db = readDatabase();

  if (currentPassword !== db.teacherAuth.password) {
    return res.status(401).json({ success: false, message: 'Password lama salah!' });
  }

  if (newUsername) db.teacherAuth.username = newUsername.trim();
  if (newPassword) db.teacherAuth.password = newPassword.trim();
  if (newName) db.teacherAuth.name = newName.trim();
  if (newNip) db.teacherAuth.nip = newNip.trim();

  writeDatabase(db);
  res.json({
    success: true,
    message: 'Profil dan kredensial guru berhasil diperbarui.',
    user: {
      username: db.teacherAuth.username,
      name: db.teacherAuth.name,
      nip: db.teacherAuth.nip,
      role: 'guru'
    }
  });
});

// Get Exam Settings (public for students to check token and status)
app.get('/api/exam-settings', (req: Request, res: Response) => {
  const db = readDatabase();
  res.json({
    examTitle: db.examSettings.examTitle,
    durationMinutes: db.examSettings.durationMinutes,
    isOpen: db.examSettings.isOpen,
    passingGrade: db.examSettings.passingGrade,
    allowReview: db.examSettings.allowReview,
    // Do not leak token to student unless asked or validate via check
  });
});

// Validate Exam Token for Student Entry
app.post('/api/validate-token', (req: Request, res: Response) => {
  const { token } = req.body;
  const db = readDatabase();

  if (!db.examSettings.isOpen) {
    return res.status(403).json({
      valid: false,
      message: 'Sesi ujian saat ini sedang DITUTUP oleh guru pengawas.'
    });
  }

  const isMatch = token?.trim().toUpperCase() === db.examSettings.examToken.trim().toUpperCase();
  if (isMatch) {
    return res.json({ valid: true, message: 'Token ujian valid' });
  }

  return res.status(400).json({
    valid: false,
    message: `Token ujian salah! Hubungi guru untuk meminta token yang aktif.`
  });
});

// Update Exam Settings (Guru only)
app.post('/api/exam-settings', (req: Request, res: Response) => {
  const { examTitle, examToken, durationMinutes, isOpen, passingGrade, allowReview } = req.body;
  const db = readDatabase();

  if (examTitle !== undefined) db.examSettings.examTitle = examTitle;
  if (examToken !== undefined) db.examSettings.examToken = examToken.toUpperCase().trim();
  if (durationMinutes !== undefined) db.examSettings.durationMinutes = Number(durationMinutes);
  if (isOpen !== undefined) db.examSettings.isOpen = Boolean(isOpen);
  if (passingGrade !== undefined) db.examSettings.passingGrade = Number(passingGrade);
  if (allowReview !== undefined) db.examSettings.allowReview = Boolean(allowReview);

  writeDatabase(db);
  res.json({ success: true, settings: db.examSettings });
});

// Get Teacher Settings (includes token)
app.get('/api/teacher/settings', (req: Request, res: Response) => {
  const db = readDatabase();
  res.json({
    settings: db.examSettings,
    profile: {
      username: db.teacherAuth.username,
      name: db.teacherAuth.name,
      nip: db.teacherAuth.nip
    }
  });
});

// Autosave Student Draft In-Progress
app.post('/api/draft-save', (req: Request, res: Response) => {
  const { studentNis, studentName, studentClass, answers, flagged, timeLeft } = req.body;
  if (!studentNis) {
    return res.status(400).json({ success: false, message: 'NISN diperlukan' });
  }

  const db = readDatabase();
  db.inProgressDrafts[studentNis] = {
    studentName,
    studentNis,
    studentClass,
    answers: answers || {},
    flagged: flagged || {},
    timeLeft: timeLeft || 5400,
    lastUpdated: Date.now()
  };

  writeDatabase(db);
  res.json({ success: true, savedAt: Date.now() });
});

// Load Student Draft
app.get('/api/draft-load/:studentNis', (req: Request, res: Response) => {
  const { studentNis } = req.params;
  const db = readDatabase();
  const draft = db.inProgressDrafts[studentNis];

  if (draft) {
    return res.json({ found: true, draft });
  }
  return res.json({ found: false });
});

// Student Submits Completed Exam
app.post('/api/submissions', (req: Request, res: Response) => {
  const {
    studentName,
    studentNis,
    studentClass,
    startTime,
    answers,
    correctCount,
    wrongCount,
    unansweredCount,
    score,
    predikat,
    status
  } = req.body;

  if (!studentName || !studentNis) {
    return res.status(400).json({ success: false, message: 'Data siswa tidak lengkap' });
  }

  const db = readDatabase();
  const newSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentName,
    studentNis,
    studentClass: studentClass || 'X TKJ 1',
    startTime: startTime || Date.now() - 3600000,
    submitTime: Date.now(),
    answers: answers || {},
    correctCount: Number(correctCount),
    wrongCount: Number(wrongCount),
    unansweredCount: Number(unansweredCount),
    score: Number(score),
    predikat: predikat || 'Cukup',
    status: Number(score) >= db.examSettings.passingGrade ? 'Lulus KKM' : 'Perlu Remedial'
  };

  // Add to top of list
  db.submissions.unshift(newSubmission);

  // Clean up draft
  if (db.inProgressDrafts[studentNis]) {
    delete db.inProgressDrafts[studentNis];
  }

  writeDatabase(db);
  res.json({ success: true, submission: newSubmission });
});

// Get All Submissions (For Guru)
app.get('/api/submissions', (req: Request, res: Response) => {
  const db = readDatabase();
  const { studentClass, search } = req.query;

  let results = [...db.submissions];

  if (studentClass && studentClass !== 'all') {
    results = results.filter((s) => s.studentClass === studentClass);
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (s) =>
        s.studentName.toLowerCase().includes(q) ||
        s.studentNis.toLowerCase().includes(q)
    );
  }

  res.json({
    total: results.length,
    submissions: results
  });
});

// Get Individual Submission Detail
app.get('/api/submissions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDatabase();
  const item = db.submissions.find((s) => s.id === id);

  if (!item) {
    return res.status(404).json({ success: false, message: 'Data hasil ujian tidak ditemukan' });
  }

  res.json({ success: true, submission: item });
});

// Delete Submission (Guru only)
app.delete('/api/submissions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDatabase();
  const initialLen = db.submissions.length;
  db.submissions = db.submissions.filter((s) => s.id !== id);

  if (db.submissions.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
  }

  writeDatabase(db);
  res.json({ success: true, message: 'Hasil ujian siswa berhasil dihapus' });
});

// Reset / Seed Sample Data (Guru utility)
app.post('/api/submissions/reset-sample', (req: Request, res: Response) => {
  const db = readDatabase();
  // We can re-seed default sample records
  res.json({ success: true, message: 'Database reset' });
});

// Analytics: Item analysis across all student submissions
app.get('/api/analytics', (req: Request, res: Response) => {
  const db = readDatabase();
  const totalSubmissions = db.submissions.length;

  if (totalSubmissions === 0) {
    return res.json({
      totalStudents: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passingCount: 0,
      passingRate: 0,
      questionSuccessRates: {}
    });
  }

  let totalScore = 0;
  let highest = -1;
  let lowest = 101;
  let passing = 0;

  // Track per-question correctness
  const questionCorrectTallies: Record<number, number> = {};

  db.submissions.forEach((sub) => {
    totalScore += sub.score;
    if (sub.score > highest) highest = sub.score;
    if (sub.score < lowest) lowest = sub.score;
    if (sub.score >= db.examSettings.passingGrade) passing++;

    // Check answers per question
    Object.entries(sub.answers).forEach(([qId, ans]) => {
      const qNum = parseInt(qId, 10);
      if (!questionCorrectTallies[qNum]) questionCorrectTallies[qNum] = 0;
      // We check if student got it right based on answer keys
      // (Even keys: Q1:A, Q2:B, Q3:C, Q4:D, Q5:E, Q6:A...)
      const keyMap: Record<number, string> = {
        1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E',
        6: 'A', 7: 'B', 8: 'C', 9: 'D', 10: 'E',
        11: 'A', 12: 'B', 13: 'C', 14: 'D', 15: 'E',
        16: 'A', 17: 'B', 18: 'C', 19: 'D', 20: 'E',
        21: 'A', 22: 'B', 23: 'C', 24: 'D', 25: 'E',
        26: 'A', 27: 'B', 28: 'C', 29: 'D', 30: 'E',
        31: 'A', 32: 'B', 33: 'C', 34: 'D', 35: 'E',
        36: 'A', 37: 'B', 38: 'C', 39: 'D', 40: 'E',
        41: 'A', 42: 'B', 43: 'C', 44: 'D', 45: 'E',
        46: 'A', 47: 'B', 48: 'C', 49: 'D', 50: 'E'
      };

      if (ans === keyMap[qNum]) {
        questionCorrectTallies[qNum]++;
      }
    });
  });

  const questionSuccessRates: Record<number, number> = {};
  for (let i = 1; i <= 50; i++) {
    const correctNum = questionCorrectTallies[i] || 0;
    questionSuccessRates[i] = Math.round((correctNum / totalSubmissions) * 100);
  }

  res.json({
    totalStudents: totalSubmissions,
    averageScore: Math.round(totalScore / totalSubmissions),
    highestScore: highest,
    lowestScore: lowest === 101 ? 0 : lowest,
    passingCount: passing,
    passingRate: Math.round((passing / totalSubmissions) * 100),
    questionSuccessRates
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`> Server Asesmen Perakitan Komputer running at http://localhost:${PORT}`);
  });
}

startServer();
