import React, { useState, useEffect } from 'react';
import { Navbar, UserRole, StudentTab } from './components/Navbar.tsx';
import { DocumentView } from './components/DocumentView.tsx';
import { CbtExamView } from './components/CbtExamView.tsx';
import { PracticeView } from './components/PracticeView.tsx';
import { BlueprintView } from './components/BlueprintView.tsx';
import { ScoringRubricView } from './components/ScoringRubricView.tsx';
import { PrintModal } from './components/PrintModal.tsx';
import { PrintDocumentTemplate } from './components/PrintDocumentTemplate.tsx';
import { TeacherLogin } from './components/TeacherPortal/TeacherLogin.tsx';
import { TeacherDashboard } from './components/TeacherPortal/TeacherDashboard.tsx';
import { apiService, TeacherUser } from './services/apiService.ts';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('siswa');
  const [studentTab, setStudentTab] = useState<StudentTab>('cbt');
  const [loggedInTeacher, setLoggedInTeacher] = useState<TeacherUser | null>(() => {
    return apiService.getLoggedInTeacher();
  });

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printMode, setPrintMode] = useState<'full' | 'questions-only' | 'keys-only' | 'blueprint-only' | 'ljk-only'>('full');

  const handleSelectPrintMode = (mode: 'full' | 'questions-only' | 'keys-only' | 'blueprint-only' | 'ljk-only') => {
    setPrintMode(mode);
  };

  const handleTeacherLoginSuccess = (user: TeacherUser) => {
    setLoggedInTeacher(user);
  };

  const handleTeacherLogout = () => {
    apiService.logoutTeacher();
    setLoggedInTeacher(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Top Bar */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        studentTab={studentTab}
        setStudentTab={setStudentTab}
        loggedInTeacher={loggedInTeacher}
        onLogoutTeacher={handleTeacherLogout}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 no-print">
        {/* Role: SISWA */}
        {currentRole === 'siswa' && (
          <div>
            {studentTab === 'cbt' && <CbtExamView onGoToPractice={() => setStudentTab('practice')} />}
            {studentTab === 'practice' && <PracticeView />}
            {studentTab === 'document' && <DocumentView />}
            {studentTab === 'blueprint' && <BlueprintView />}
            {studentTab === 'rubric' && <ScoringRubricView />}
          </div>
        )}

        {/* Role: GURU */}
        {currentRole === 'guru' && (
          <div>
            {!loggedInTeacher ? (
              <TeacherLogin
                onLoginSuccess={handleTeacherLoginSuccess}
                onCancel={() => setCurrentRole('siswa')}
              />
            ) : (
              <TeacherDashboard
                teacher={loggedInTeacher}
                onLogout={handleTeacherLogout}
              />
            )}
          </div>
        )}
      </main>

      {/* Printable Template (Triggered automatically on window.print()) */}
      <PrintDocumentTemplate printMode={printMode} />

      {/* Print Selection Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onSelectPrintMode={handleSelectPrintMode}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span className="font-medium text-slate-700">
              Sistem Asesmen Akademik Perakitan Komputer (CBT & Bank Soal)
            </span>
            <span aria-hidden="true">·</span>
            <span>SMK Kelas X Teknik Komputer dan Jaringan</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Penyimpanan Database Server Aktif & Terlindungi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
