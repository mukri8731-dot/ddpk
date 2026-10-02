import React, { useState, useEffect } from 'react';
import { TKA_QUESTIONS, SCORING_RUBRIC, QuestionItem } from '../data/tkaData.ts';
import { apiService, StudentSubmission } from '../services/apiService.ts';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  Check,
  X,
  User,
  Hash,
  GraduationCap,
  KeyRound,
  ShieldCheck,
  CloudCheck,
  Save,
  Printer
} from 'lucide-react';

interface CbtExamViewProps {
  onGoToPractice?: () => void;
}

export const CbtExamView: React.FC<CbtExamViewProps> = ({ onGoToPractice }) => {
  // Student registration state
  const [studentName, setStudentName] = useState(() => localStorage.getItem('cbt_student_name') || '');
  const [studentNis, setStudentNis] = useState(() => localStorage.getItem('cbt_student_nis') || '');
  const [studentClass, setStudentClass] = useState(() => localStorage.getItem('cbt_student_class') || 'X TKJ 1');
  const [examToken, setExamToken] = useState(() => localStorage.getItem('cbt_student_token') || 'TKJ-2026');

  // Exam session flow state
  const [isExamStarted, setIsExamStarted] = useState(() => {
    return localStorage.getItem('cbt_is_started') === 'true';
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>(() => {
    try {
      const saved = localStorage.getItem('cbt_user_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('cbt_flagged');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('cbt_time_left');
      return saved ? parseInt(saved, 10) : 90 * 60;
    } catch {
      return 90 * 60;
    }
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(() => {
    return localStorage.getItem('cbt_is_submitted') === 'true';
  });

  const [submissionResult, setSubmissionResult] = useState<StudentSubmission | null>(() => {
    try {
      const saved = localStorage.getItem('cbt_last_submission');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [tokenError, setTokenError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastDraftSavedTime, setLastDraftSavedTime] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Load existing draft if available on student NIS input
  const handleCheckDraft = async (nis: string) => {
    if (!nis || isExamStarted) return;
    try {
      const res = await apiService.loadDraft(nis);
      if (res.found && res.draft) {
        if (window.confirm(`Ditemukan progres ujian tersimpan untuk NIS ${nis} (${Object.keys(res.draft.answers || {}).length} soal terjawab). Apakah ingin melanjutkan pengerjaan tersebut?`)) {
          setStudentName(res.draft.studentName || studentName);
          setStudentClass(res.draft.studentClass || studentClass);
          setUserAnswers(res.draft.answers || {});
          setFlaggedQuestions(res.draft.flagged || {});
          setTimeLeft(res.draft.timeLeft || 90 * 60);
          setIsExamStarted(true);
          localStorage.setItem('cbt_is_started', 'true');
        }
      }
    } catch (e) {
      console.warn('Draft check error', e);
    }
  };

  // Start exam and validate token
  const handleStartExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setTokenError('');

    if (!studentName.trim() || !studentNis.trim()) {
      setTokenError('Nama lengkap dan NIS/NISN wajib diisi.');
      return;
    }

    setIsValidating(true);
    try {
      const res = await apiService.validateToken(examToken);
      if (res.valid) {
        setIsExamStarted(true);
        localStorage.setItem('cbt_student_name', studentName);
        localStorage.setItem('cbt_student_nis', studentNis);
        localStorage.setItem('cbt_student_class', studentClass);
        localStorage.setItem('cbt_student_token', examToken);
        localStorage.setItem('cbt_is_started', 'true');

        // Check if there is an existing draft on server
        await handleCheckDraft(studentNis);
      } else {
        setTokenError(res.message);
      }
    } catch {
      setTokenError('Gagal memverifikasi token ke server.');
    } finally {
      setIsValidating(false);
    }
  };

  // Autosave answers to persistent database
  const saveDraftToDatabase = async (answers: Record<number, string>, flagged: Record<number, boolean>, time: number) => {
    if (!isExamStarted || isSubmitted || !studentNis) return;
    setIsSavingDraft(true);
    try {
      await apiService.saveDraft({
        studentNis,
        studentName,
        studentClass,
        answers: answers as any,
        flagged,
        timeLeft: time
      });
      setLastDraftSavedTime(Date.now());
    } catch (e) {
      console.warn('Autosave error', e);
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Select option handler
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isSubmitted) return;
    const newAnswers = {
      ...userAnswers,
      [currentQ.id]: key,
    };
    setUserAnswers(newAnswers);
    localStorage.setItem('cbt_user_answers', JSON.stringify(newAnswers));

    // Autosave immediately
    saveDraftToDatabase(newAnswers, flaggedQuestions, timeLeft);
  };

  // Toggle flag
  const handleToggleFlag = () => {
    const newFlagged = {
      ...flaggedQuestions,
      [currentQ.id]: !flaggedQuestions[currentQ.id],
    };
    setFlaggedQuestions(newFlagged);
    localStorage.setItem('cbt_flagged', JSON.stringify(newFlagged));
    saveDraftToDatabase(userAnswers, newFlagged, timeLeft);
  };

  // Countdown timer
  useEffect(() => {
    if (!isExamStarted || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        const updated = prev - 1;
        if (updated % 15 === 0) {
          localStorage.setItem('cbt_time_left', updated.toString());
          saveDraftToDatabase(userAnswers, flaggedQuestions, updated);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamStarted, isSubmitted, userAnswers, flaggedQuestions]);

  // Submit completed exam to database
  const handleSubmitExam = async () => {
    setShowConfirmModal(false);

    let correct = 0;
    TKA_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const wrong = Object.keys(userAnswers).length - correct;
    const unanswered = TKA_QUESTIONS.length - Object.keys(userAnswers).length;
    const score = Math.round((correct / TKA_QUESTIONS.length) * 100);

    let predikat = 'Kurang (D)';
    if (score >= 86) predikat = 'Sangat Baik (A)';
    else if (score >= 71) predikat = 'Baik (B)';
    else if (score >= 56) predikat = 'Cukup (C)';

    const submissionPayload = {
      studentName,
      studentNis,
      studentClass,
      startTime: Date.now() - (90 * 60 - timeLeft) * 1000,
      submitTime: Date.now(),
      answers: userAnswers as any,
      correctCount: correct,
      wrongCount: wrong,
      unansweredCount: unanswered,
      score,
      predikat,
      status: score >= 75 ? 'Lulus KKM' : 'Perlu Remedial'
    };

    try {
      const res = await apiService.submitExam(submissionPayload);
      if (res.success && res.submission) {
        setSubmissionResult(res.submission);
        localStorage.setItem('cbt_last_submission', JSON.stringify(res.submission));
      }
    } catch (e) {
      console.error('Submit error:', e);
    }

    setIsSubmitted(true);
    localStorage.setItem('cbt_is_submitted', 'true');
  };

  const handleResetExam = () => {
    if (window.confirm('Mulai sesi ujian baru? Pastikan hasil ujian sebelumnya sudah dicatat.')) {
      setUserAnswers({});
      setFlaggedQuestions({});
      setTimeLeft(90 * 60);
      setIsSubmitted(false);
      setIsExamStarted(false);
      setSubmissionResult(null);
      setCurrentIndex(0);
      localStorage.removeItem('cbt_user_answers');
      localStorage.removeItem('cbt_flagged');
      localStorage.removeItem('cbt_time_left');
      localStorage.removeItem('cbt_is_submitted');
      localStorage.removeItem('cbt_is_started');
      localStorage.removeItem('cbt_last_submission');
    }
  };

  const currentQ: QuestionItem = TKA_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = TKA_QUESTIONS.length - answeredCount;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // =========================================================================
  // VIEW 1: REGISTRATION / ENTRY FORM
  // =========================================================================
  if (!isExamStarted) {
    return (
      <div className="max-w-xl mx-auto my-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-indigo-600">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Ruang Ujian Asesmen Akademik (CBT)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mata Pelajaran: Perakitan Komputer · SMK Kelas X TKJ (50 Butir Soal PG)
          </p>
        </div>

        {tokenError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{tokenError}</span>
          </div>
        )}

        <form onSubmit={handleStartExam} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Nama Lengkap Peserta Didik
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Contoh: Muhammad Rafli"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                NIS / NISN
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: 24251010"
                  value={studentNis}
                  onChange={(e) => setStudentNis(e.target.value)}
                  onBlur={() => handleCheckDraft(studentNis)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Kelas
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer font-medium"
              >
                <option value="X TKJ 1">X TKJ 1</option>
                <option value="X TKJ 2">X TKJ 2</option>
                <option value="X TKJ 3">X TKJ 3</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Token Ujian dari Guru Pengawas
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Ketik token (contoh: TKJ-2026)"
                value={examToken}
                onChange={(e) => setExamToken(e.target.value.toUpperCase())}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white font-mono font-bold tracking-widest uppercase"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default token: <strong>TKJ-2026</strong> (atau tanyakan pada guru Anda).
            </span>
          </div>

          {/* Database persistence guarantee note */}
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Autosave Database Aktif:</span>
              <span className="text-[11px] text-emerald-800 leading-relaxed block mt-0.5">
                Setiap pilihan jawaban otomatis tersimpan ke server database. Jika koneksi terputus atau halaman tertutup, jawaban Anda tidak akan hilang.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isValidating}
              className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <span>Memvalidasi Token...</span>
              ) : (
                <>
                  <span>Mulai Mengerjakan Ujian (90 Menit)</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE EXAM OR RESULTS
  // =========================================================================
  return (
    <div className="space-y-6 pb-16">
      {/* Header Info Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs font-mono">
              {studentClass.replace('X TKJ ', '')}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block truncate max-w-[200px]">
                {studentName}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                NIS: {studentNis} · {studentClass}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tersimpan di Database</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">Sisa Waktu:</span>
            <span className={`font-mono font-bold text-sm ${timeLeft < 300 && !isSubmitted ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
              {isSubmitted ? '00:00:00' : formatTime(timeLeft)}
            </span>
          </div>

          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Teks: {fontSize === 'normal' ? 'A' : 'A+'}
          </button>
        </div>
      </div>

      {!isSubmitted ? (
        /* ================= EXAM WORKSPACE ================= */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  Nomor {currentQ.id}
                </span>
                <span className="text-xs text-slate-400">dari 50</span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  · {currentQ.topic}
                </span>
              </div>

              <button
                onClick={handleToggleFlag}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{flaggedQuestions[currentQ.id] ? 'Ditandai Ragu' : 'Tandai Ragu-Ragu'}</span>
              </button>
            </div>

            {/* Stimulus */}
            {currentQ.stimulus && (
              <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-500 text-slate-700 leading-relaxed italic text-xs sm:text-sm">
                {currentQ.stimulus}
              </div>
            )}

            {/* Question Text */}
            <p className={`font-medium text-slate-900 leading-relaxed ${fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              {currentQ.question}
            </p>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className={`leading-relaxed pt-0.5 ${fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < TKA_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.min(TKA_QUESTIONS.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kirim & Selesaikan Ujian</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Grid Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Navigasi Butir Soal</h3>
              <span className="text-xs text-slate-500 font-mono">{answeredCount}/50 Terjawab</span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-indigo-600 rounded"></span>
                <span>Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-amber-400 rounded"></span>
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-100 border border-slate-300 rounded"></span>
                <span>Kosong</span>
              </div>
            </div>

            {/* 1-50 Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {TKA_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flaggedQuestions[q.id];

                let bgClass = 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200';
                if (isFlagged) {
                  bgClass = 'bg-amber-100 text-amber-900 border-amber-400 font-semibold';
                } else if (isAnswered) {
                  bgClass = 'bg-indigo-600 text-white border-indigo-700 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 text-xs rounded-lg border font-mono flex items-center justify-center transition-all cursor-pointer ${bgClass} ${
                      isCurrent ? 'ring-2 ring-indigo-500 ring-offset-2 font-bold scale-105' : ''
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kumpulkan Lembar Ujian</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= SUBMITTED RESULT VIEW ================= */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Ujian Berhasil Dikumpulkan & Tersimpan Permanen
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Kartu Hasil Asesmen: {studentName}
                </h2>
                <p className="text-xs text-slate-500">
                  NIS: {studentNis} · Kelas: {studentClass} · Waktu Pengumpulan: {new Date().toLocaleTimeString('id-ID')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Kartu Nilai</span>
                </button>

                <button
                  onClick={handleResetExam}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Selesai / Logout</span>
                </button>
              </div>
            </div>

            {/* Score Grid */}
            {submissionResult && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
                <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100 text-center">
                  <span className="text-xs text-slate-500 block font-medium">Nilai Akhir</span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-700">
                    {submissionResult.score}
                  </span>
                  <span className="text-xs text-indigo-900 block mt-1 font-semibold">{submissionResult.predikat}</span>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 text-center">
                  <span className="text-xs text-slate-500 block font-medium">Jawaban Benar</span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-700">
                    {submissionResult.correctCount}
                  </span>
                  <span className="text-xs text-emerald-800 block mt-1">+{(submissionResult.correctCount * 2)} Poin</span>
                </div>

                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 text-center">
                  <span className="text-xs text-slate-500 block font-medium">Jawaban Salah</span>
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-700">
                    {submissionResult.wrongCount}
                  </span>
                  <span className="text-xs text-rose-800 block mt-1">0 Poin</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block font-medium">Status KKM</span>
                  <span className={`text-xl font-bold font-mono block mt-1 ${submissionResult.score >= 75 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {submissionResult.status}
                  </span>
                  <span className="text-xs text-slate-400 block">Batas KKM: 75</span>
                </div>
              </div>
            )}

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Pemberitahuan Sistem:</span>
              <p>
                Nilai dan rincian pekerjaan Anda telah otomatis masuk ke basis data guru pengawas (Bapak Guru TKJ). Guru dapat memeriksa rekapitulasi nilai dan lembar jawaban Anda langsung melalui Portal Guru.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Konfirmasi Pengumpulan Ujian</h3>
                <p className="text-xs text-slate-500">Periksa status pengerjaan sebelum mengakhiri sesi.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Nama Siswa:</span>
                <span className="font-bold text-slate-900">{studentName} ({studentClass})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Soal:</span>
                <span className="font-mono font-bold text-slate-900">50 Butir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sudah Dijawab:</span>
                <span className="font-mono font-bold text-emerald-700">{answeredCount} Butir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Masih Ragu-ragu:</span>
                <span className="font-mono font-bold text-amber-700">{flaggedCount} Butir</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Belum Dijawab:</span>
                <span className="font-mono font-bold text-rose-700">{unansweredCount} Butir</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-rose-600 font-medium">
                Peringatan: Masih terdapat {unansweredCount} butir soal yang belum dijawab!
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Lanjut Mengerjakan
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Kirim Jawaban ke Guru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
