import React from 'react';
import { Printer, GraduationCap, Shield, Lock, LogOut } from 'lucide-react';
import { TeacherUser } from '../services/apiService.ts';

export type UserRole = 'siswa' | 'guru';
export type StudentTab = 'cbt' | 'practice' | 'document' | 'blueprint' | 'rubric';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  studentTab: StudentTab;
  setStudentTab: (tab: StudentTab) => void;
  loggedInTeacher: TeacherUser | null;
  onLogoutTeacher: () => void;
  onOpenPrintModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  studentTab,
  setStudentTab,
  loggedInTeacher,
  onLogoutTeacher,
  onOpenPrintModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with Role Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentRole('siswa');
              setStudentTab('cbt');
            }}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Asesmen Perakitan Komputer
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium ml-2">
              SMK Kelas X TKJ
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Contextual to Siswa vs Guru) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs lg:text-sm font-medium text-slate-600">
          {currentRole === 'siswa' ? (
            <>
              <button
                onClick={() => setStudentTab('cbt')}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                  studentTab === 'cbt'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/80'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Ujian CBT Siswa
              </button>
              <button
                onClick={() => setStudentTab('practice')}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                  studentTab === 'practice'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/80'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Latihan Mandiri
              </button>
              <button
                onClick={() => setStudentTab('document')}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                  studentTab === 'document'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/80'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Naskah & Pembahasan (5 Bagian)
              </button>
              <button
                onClick={() => setStudentTab('blueprint')}
                className={`px-3 py-1.5 transition-colors whitespace-nowrap cursor-pointer rounded-md ${
                  studentTab === 'blueprint'
                    ? 'text-indigo-600 font-semibold bg-indigo-50/80'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Kisi-Kisi Soal
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 py-1 px-3 rounded-lg border border-slate-200">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mode Pengawas / Guru: <strong>{loggedInTeacher ? loggedInTeacher.name : 'Silakan Login'}</strong></span>
            </div>
          )}
        </nav>

        {/* Zone 3: Role Switcher & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Segmented Role Switcher: Siswa vs Guru */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setCurrentRole('siswa')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentRole === 'siswa'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Portal Siswa</span>
            </button>

            <button
              onClick={() => setCurrentRole('guru')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                currentRole === 'guru'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Guru</span>
              {loggedInTeacher && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
            </button>
          </div>

          <button
            onClick={onOpenPrintModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden border-t border-slate-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
        {currentRole === 'siswa' ? (
          <>
            <button
              onClick={() => setStudentTab('cbt')}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
                studentTab === 'cbt' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Ujian CBT
            </button>
            <button
              onClick={() => setStudentTab('practice')}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
                studentTab === 'practice' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Latihan
            </button>
            <button
              onClick={() => setStudentTab('document')}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
                studentTab === 'document' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Dokumen 5 Bagian
            </button>
            <button
              onClick={() => setStudentTab('blueprint')}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded font-medium ${
                studentTab === 'blueprint' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Kisi-Kisi
            </button>
          </>
        ) : (
          <span className="text-xs text-slate-600 font-medium px-2 py-0.5">
            Portal Guru: {loggedInTeacher ? loggedInTeacher.name : 'Silakan Login Terlebih Dahulu'}
          </span>
        )}
      </div>
    </header>
  );
};
