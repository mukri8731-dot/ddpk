import React from 'react';
import { StudentSubmission } from '../../services/apiService.ts';
import { TKA_QUESTIONS } from '../../data/tkaData.ts';
import { X, Check, CheckCircle2, XCircle, Printer, Calendar, Clock, Award, User } from 'lucide-react';

interface StudentDetailModalProps {
  submission: StudentSubmission | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ submission, onClose }) => {
  if (!submission) return null;

  const durationMin = Math.round((submission.submitTime - submission.startTime) / 60000);
  const formattedDate = new Date(submission.submitTime).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold font-mono">
              {submission.score}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Lembar Pekerjaan: {submission.studentName}
              </h3>
              <p className="text-xs text-slate-500">
                NIS: {submission.studentNis} · Kelas: {submission.studentClass} · {formattedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Hasil</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Score Summary Metrics */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center shrink-0">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Nilai Akhir</span>
            <span className="text-xl font-extrabold font-mono text-indigo-700">{submission.score}</span>
            <span className="text-[10px] text-slate-500 block">Skor Max 100</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Benar</span>
            <span className="text-xl font-extrabold font-mono text-emerald-600">{submission.correctCount}</span>
            <span className="text-[10px] text-emerald-700 block">{(submission.correctCount / 50 * 100).toFixed(0)}%</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Salah</span>
            <span className="text-xl font-extrabold font-mono text-rose-600">{submission.wrongCount}</span>
            <span className="text-[10px] text-rose-700 block">{(submission.wrongCount / 50 * 100).toFixed(0)}%</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Durasi Ujian</span>
            <span className="text-xl font-extrabold font-mono text-slate-800">{durationMin}</span>
            <span className="text-[10px] text-slate-500 block">Menit</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Status KKM</span>
            <span className={`text-xs font-bold block mt-1 ${submission.score >= 75 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {submission.status}
            </span>
            <span className="text-[10px] text-slate-500 block">{submission.predikat}</span>
          </div>
        </div>

        {/* Scrollable Questions Review */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Rincian Jawaban Butir 1 sampai 50
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Check className="w-3.5 h-3.5" /> Benar ({submission.correctCount})
              </span>
              <span className="flex items-center gap-1 text-rose-700 font-medium">
                <X className="w-3.5 h-3.5" /> Salah ({submission.wrongCount})
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {TKA_QUESTIONS.map((q) => {
              const studentAnswer = submission.answers[q.id.toString()] || submission.answers[q.id as any];
              const isCorrect = studentAnswer === q.correctAnswer;
              const hasAnswered = !!studentAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs sm:text-sm ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : hasAnswered
                      ? 'border-rose-200 bg-rose-50/20'
                      : 'border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        Soal No. {q.id}
                      </span>
                      {isCorrect ? (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Benar (+2 Poin)
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                          <X className="w-3 h-3" /> Salah (0 Poin)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {q.difficulty} · {q.cognitiveLevel}
                    </span>
                  </div>

                  <p className="font-medium text-slate-800 text-xs sm:text-sm mb-2">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-1 pl-2 text-xs">
                    {q.options.map((opt) => {
                      const isKunci = opt.key === q.correctAnswer;
                      const isPilihanSiswa = opt.key === studentAnswer;

                      let cls = 'text-slate-600';
                      if (isKunci) {
                        cls = 'text-emerald-900 font-semibold bg-emerald-100/70 p-1.5 rounded';
                      } else if (isPilihanSiswa && !isKunci) {
                        cls = 'text-rose-900 line-through bg-rose-100/70 p-1.5 rounded';
                      }

                      return (
                        <div key={opt.key} className={`flex items-start gap-2 ${cls}`}>
                          <span className="font-mono font-bold w-4 shrink-0 text-center">{opt.key}.</span>
                          <span className="flex-1">{opt.text}</span>
                          {isKunci && (
                            <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded font-mono shrink-0">
                              Kunci Benar
                            </span>
                          )}
                          {isPilihanSiswa && !isKunci && (
                            <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-mono shrink-0">
                              Pilihan Siswa
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation callout */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-xs text-slate-600 bg-white/70 p-2.5 rounded">
                    <span className="font-semibold text-slate-800 block">Keterangan Teknis:</span>
                    <p className="mt-0.5 text-[11px] leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Tutup Lembar Jawaban
          </button>
        </div>
      </div>
    </div>
  );
};
