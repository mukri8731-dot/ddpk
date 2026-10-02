import React, { useState, useEffect } from 'react';
import { apiService, StudentSubmission, TeacherUser, ExamSettings, ItemAnalysisData } from '../../services/apiService.ts';
import { StudentDetailModal } from './StudentDetailModal.tsx';
import { TKA_QUESTIONS } from '../../data/tkaData.ts';
import {
  Users,
  BarChart3,
  Settings,
  UserCheck,
  Search,
  Download,
  Printer,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Clock,
  Key,
  ShieldCheck,
  Award
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: TeacherUser;
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacher, onLogout }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rekap' | 'analisis' | 'pengaturan' | 'profil'>('rekap');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [analytics, setAnalytics] = useState<ItemAnalysisData | null>(null);
  const [settings, setSettings] = useState<ExamSettings>({
    examTitle: 'Asesmen Akademik Perakitan Komputer - SMK Kelas X TKJ',
    examToken: 'TKJ-2026',
    durationMinutes: 90,
    isOpen: true,
    passingGrade: 75,
    allowReview: true
  });

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);

  // Settings form state
  const [tokenInput, setTokenInput] = useState('');
  const [isOpenInput, setIsOpenInput] = useState(true);
  const [kkmInput, setKkmInput] = useState(75);
  const [durationInput, setDurationInput] = useState(90);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  // Profile form state
  const [teacherNameInput, setTeacherNameInput] = useState(teacher.name);
  const [teacherNipInput, setTeacherNipInput] = useState(teacher.nip);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newUsernameInput, setNewUsernameInput] = useState(teacher.username);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load data from persistent backend database
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [subs, ana, setts] = await Promise.all([
        apiService.getSubmissions(classFilter, searchQuery),
        apiService.getAnalytics(),
        apiService.getExamSettings()
      ]);
      setSubmissions(subs);
      setAnalytics(ana);
      setSettings(setts);
      setTokenInput(setts.examToken);
      setIsOpenInput(setts.isOpen);
      setKkmInput(setts.passingGrade);
      setDurationInput(setts.durationMinutes);
    } catch (e) {
      console.error('Error loading teacher data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [classFilter]);

  // Handle Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  // Delete student submission
  const handleDeleteSubmission = async (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data hasil ujian milik "${name}" dari database? Tindakan ini tidak dapat dibatalkan.`)) {
      const success = await apiService.deleteSubmission(id);
      if (success) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        loadData();
      }
    }
  };

  // Export submissions to CSV (Excel format)
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('Tidak ada data siswa untuk diekspor.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'No,Nama Siswa,NIS/NISN,Kelas,Tanggal Ujian,Benar,Salah,Kosong,Nilai Akhir,Predikat,Status KKM\n';

    submissions.forEach((s, idx) => {
      const dateStr = new Date(s.submitTime).toLocaleDateString('id-ID');
      const row = [
        idx + 1,
        `"${s.studentName}"`,
        `"${s.studentNis}"`,
        `"${s.studentClass}"`,
        `"${dateStr}"`,
        s.correctCount,
        s.wrongCount,
        s.unansweredCount,
        s.score,
        `"${s.predikat}"`,
        `"${s.status}"`
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Asesmen_Perakitan_Komputer_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Exam Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Partial<ExamSettings> = {
      examToken: tokenInput.toUpperCase().trim(),
      isOpen: isOpenInput,
      passingGrade: Number(kkmInput),
      durationMinutes: Number(durationInput)
    };

    const success = await apiService.updateExamSettings(updated);
    if (success) {
      setSettings((prev) => ({ ...prev, ...updated }));
      setSettingsSavedMessage('Pengaturan sesi ujian berhasil diperbarui dan disimpan ke database!');
      setTimeout(() => setSettingsSavedMessage(''), 4000);
    }
  };

  // Save Profile / Change Password
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);

    if (!currentPasswordInput) {
      setProfileMessage({ type: 'error', text: 'Masukkan password lama untuk mengonfirmasi perubahan.' });
      return;
    }

    const payload = {
      newName: teacherNameInput,
      newNip: teacherNipInput,
      newUsername: newUsernameInput,
      newPassword: newPasswordInput || undefined,
      currentPassword: currentPasswordInput
    };

    const res = await apiService.updateTeacherProfile(payload);
    if (res.success) {
      setProfileMessage({ type: 'success', text: res.message });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
    } else {
      setProfileMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Banner / Welcome Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-200">
            GT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                {teacher.name}
              </h2>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded font-mono">
                Guru Pengawas
              </span>
            </div>
            <p className="text-xs text-slate-500">
              NIP: {teacher.nip || '-'} · Akun: <span className="font-mono text-slate-700">{teacher.username}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <span className="text-slate-500">Token Ujian:</span>
            <span className="font-mono font-bold text-indigo-700">{settings.examToken}</span>
            <span className={`w-2 h-2 rounded-full ${settings.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} title={settings.isOpen ? 'Ujian Aktif' : 'Ujian Ditutup'}></span>
          </div>

          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Keluar Akun
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('rekap')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'rekap'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Rekap Nilai Siswa ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('analisis')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'analisis'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analisis Butir Soal (1-50)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pengaturan')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'pengaturan'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Manajemen Sesi Ujian</span>
        </button>

        <button
          onClick={() => setActiveSubTab('profil')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'profil'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Kredensial & Password</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: REKAP NILAI SISWA */}
      {/* ========================================================================= */}
      {activeSubTab === 'rekap' && (
        <div className="space-y-5">
          {/* Quick Metrics */}
          {analytics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Peserta Ujian</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">{analytics.totalStudents}</span>
                <span className="text-[11px] text-slate-500 block">Siswa Selesai</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Rata-Rata Nilai</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-700">{analytics.averageScore}</span>
                <span className="text-[11px] text-indigo-900 block font-medium">Skala 0-100</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Nilai Tertinggi / Terendah</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                  {analytics.highestScore} <span className="text-xs text-slate-400 font-sans font-normal">/</span> {analytics.lowestScore}
                </span>
                <span className="text-[11px] text-slate-500 block">Rentang Capaian</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Ketuntasan KKM (≥{settings.passingGrade})</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600">{analytics.passingRate}%</span>
                <span className="text-[11px] text-emerald-800 block">{analytics.passingCount} Siswa Tuntas</span>
              </div>
            </div>
          )}

          {/* Table Header Filter & Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama atau NISN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">Semua Kelas</option>
                <option value="X TKJ 1">X TKJ 1</option>
                <option value="X TKJ 2">X TKJ 2</option>
                <option value="X TKJ 3">X TKJ 3</option>
              </select>
            </form>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={loadData}
                disabled={isLoading}
                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Excel (CSV)</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Rekap</span>
              </button>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="py-3 px-3 font-semibold text-center w-12">No</th>
                    <th className="py-3 px-3 font-semibold min-w-[180px]">Nama Lengkap Siswa</th>
                    <th className="py-3 px-3 font-semibold w-28">NIS/NISN</th>
                    <th className="py-3 px-3 font-semibold w-24">Kelas</th>
                    <th className="py-3 px-3 font-semibold text-center w-28">Waktu Selesai</th>
                    <th className="py-3 px-3 font-semibold text-center w-24">Benar / Salah</th>
                    <th className="py-3 px-3 font-semibold text-center w-20">Nilai</th>
                    <th className="py-3 px-3 font-semibold text-center w-28">Status KKM</th>
                    <th className="py-3 px-3 font-semibold text-center w-28">Aksi Guru</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        Belum ada siswa yang mengumpulkan lembar ujian pada filter ini.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 text-center font-mono text-slate-600">{idx + 1}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{sub.studentName}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{sub.studentNis}</td>
                        <td className="py-3 px-3 font-medium text-slate-700">{sub.studentClass}</td>
                        <td className="py-3 px-3 text-center text-slate-500 text-[11px]">
                          {new Date(sub.submitTime).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-3 px-3 text-center font-mono">
                          <span className="text-emerald-700 font-bold">{sub.correctCount}</span>
                          <span className="text-slate-400 mx-1">/</span>
                          <span className="text-rose-700">{sub.wrongCount}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-mono font-extrabold text-sm text-indigo-700">
                            {sub.score}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                              sub.score >= settings.passingGrade
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedSubmission(sub)}
                              className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Lihat Lembar Jawaban Siswa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubmission(sub.id, sub.studentName)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Submission"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ANALISIS BUTIR SOAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'analisis' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Analisis Butir Soal (Item Difficulty Analysis)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tingkat persentase ketepatan jawaban seluruh siswa pada butir nomor 1 sampai 50
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Berdasarkan {submissions.length} Peserta
            </div>
          </div>

          {/* Item Analysis Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TKA_QUESTIONS.map((q) => {
              const successRate = analytics?.questionSuccessRates[q.id] ?? 0;
              let barColor = 'bg-emerald-500';
              let badgeText = 'Mudah';

              if (successRate < 50) {
                barColor = 'bg-rose-500';
                badgeText = 'Sukar / Perlu Remedial';
              } else if (successRate < 75) {
                barColor = 'bg-amber-500';
                badgeText = 'Sedang';
              }

              return (
                <div
                  key={q.id}
                  className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      Soal No. {q.id}
                    </span>
                    <span className="font-mono font-extrabold text-xs text-slate-800">
                      {successRate}% Benar
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${barColor}`}
                      style={{ width: `${successRate}%` }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate" title={q.topic}>
                    {q.topic}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                    <span>Kunci: <strong className="text-indigo-700">{q.correctAnswer}</strong></span>
                    <span className="font-mono">{q.cognitiveLevel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PENGATURAN SESI UJIAN */}
      {/* ========================================================================= */}
      {activeSubTab === 'pengaturan' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-2xl">
          <div className="pb-4 border-b border-slate-200 mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Konfigurasi Parameter Sesi Ujian Siswa
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Atur token akses, durasi pengerjaan, dan kriteria ketuntasan minimal (KKM).
            </p>
          </div>

          {settingsSavedMessage && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{settingsSavedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
            {/* Status Ujian Open/Close */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Status Akses Ujian Siswa</span>
                <span className="text-xs text-slate-500">
                  {isOpenInput
                    ? 'Siswa dapat memasukkan token dan mengerjakan ujian.'
                    : 'Ujian dikunci sementara; siswa tidak bisa memulai ujian baru.'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpenInput}
                  onChange={(e) => setIsOpenInput(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Kode Token Ujian (Wajib Dimasukkan Siswa)
              </label>
              <input
                type="text"
                required
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder="Contoh: TKJ-2026"
                className="w-full p-2.5 font-mono font-bold text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white tracking-widest uppercase"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Bagikan kode token ini ke siswa di kelas saat sesi ujian dimulai.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Durasi Ujian (Menit)
                </label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  required
                  value={durationInput}
                  onChange={(e) => setDurationInput(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Nilai Kriteria Ketuntasan Minimal (KKM)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  required
                  value={kkmInput}
                  onChange={(e) => setKkmInput(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer shadow-sm shadow-indigo-200"
              >
                Simpan Pengaturan ke Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: KREDENSIAL & PASSWORD GURU */}
      {/* ========================================================================= */}
      {activeSubTab === 'profil' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs max-w-xl">
          <div className="pb-4 border-b border-slate-200 mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Pengaturan Akun & Kredensial Guru
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Perbarui username login dan kata sandi pengawas ujian.
            </p>
          </div>

          {profileMessage && (
            <div
              className={`mb-6 p-3.5 rounded-xl flex items-center gap-2 text-xs font-semibold ${
                profileMessage.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              {profileMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{profileMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Nama Lengkap Guru
              </label>
              <input
                type="text"
                required
                value={teacherNameInput}
                onChange={(e) => setTeacherNameInput(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                NIP Guru
              </label>
              <input
                type="text"
                value={teacherNipInput}
                onChange={(e) => setTeacherNipInput(e.target.value)}
                placeholder="1987..."
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Username Login
              </label>
              <input
                type="text"
                required
                value={newUsernameInput}
                onChange={(e) => setNewUsernameInput(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Password Baru (Kosongkan jika tidak ingin mengganti)
              </label>
              <input
                type="password"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="font-semibold text-rose-700 block mb-1">
                Password Lama Saat Ini (Konfirmasi Wajib)
              </label>
              <input
                type="password"
                required
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Ketik password saat ini"
                className="w-full p-2.5 text-xs sm:text-sm bg-rose-50/40 border border-rose-200 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer shadow-sm shadow-indigo-200"
              >
                Simpan Perubahan Akun
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Student Detail Modal */}
      <StudentDetailModal
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
};
