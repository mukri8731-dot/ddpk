import React, { useState } from 'react';
import { X, Printer, FileText, CheckCircle2, BookOpen, Key, Award, Download } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrintMode: (mode: 'full' | 'questions-only' | 'keys-only' | 'blueprint-only' | 'ljk-only') => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({ isOpen, onClose, onSelectPrintMode }) => {
  if (!isOpen) return null;

  const handleAction = (mode: 'full' | 'questions-only' | 'keys-only' | 'blueprint-only' | 'ljk-only') => {
    onSelectPrintMode(mode);
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Cetak & Ekspor Instrumen Asesmen</h3>
              <p className="text-xs text-slate-500">Pilih format dokumen cetak atau simpan sebagai PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options list */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleAction('questions-only')}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all flex items-start gap-3 cursor-pointer group"
          >
            <FileText className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 block">
                Naskah Soal Siswa (50 Butir Soal PG)
              </span>
              <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                Format bersih siap ujian tanpa menampilkan kunci jawaban dan pembahasan.
              </span>
            </div>
          </button>

          <button
            onClick={() => handleAction('full')}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all flex items-start gap-3 cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 block">
                Paket Lengkap Master Guru (5 Bagian)
              </span>
              <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                Seluruh Bagian 1–5: Kisi-kisi, 50 Soal, Kunci Jawaban, Pembahasan Lengkap, & Pedoman Skor.
              </span>
            </div>
          </button>

          <button
            onClick={() => handleAction('keys-only')}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all flex items-start gap-3 cursor-pointer group"
          >
            <Key className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 block">
                Kunci Jawaban & Pembahasan Saja
              </span>
              <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                Tabel kunci jawaban resmi 50 nomor beserta telaah konsep dan analisis distraktor.
              </span>
            </div>
          </button>

          <button
            onClick={() => handleAction('blueprint-only')}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all flex items-start gap-3 cursor-pointer group"
          >
            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 block">
                Kisi-Kisi Soal (Tabel 50 Indikator)
              </span>
              <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                Format tabel dokumen kurikulum untuk keperluan administrasi pengajaran guru.
              </span>
            </div>
          </button>

          <button
            onClick={() => handleAction('ljk-only')}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/40 transition-all flex items-start gap-3 cursor-pointer group"
          >
            <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 block">
                Lembar Jawaban Siswa (LJK Kertas)
              </span>
              <span className="text-xs text-slate-500 leading-relaxed block mt-0.5">
                Lembar isian lingkaran pilihan ganda A, B, C, D, E nomor 1 sampai 50 untuk ujian manual.
              </span>
            </div>
          </button>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 text-center">
          Tips: Pada jendela dialog cetak browser, pilih tujuan <strong>"Save as PDF"</strong> untuk mengunduh berkas.
        </div>
      </div>
    </div>
  );
};
