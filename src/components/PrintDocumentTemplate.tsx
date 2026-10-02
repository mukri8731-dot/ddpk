import React from 'react';
import { TKA_METADATA, TKA_QUESTIONS, SCORING_RUBRIC } from '../data/tkaData.ts';

interface PrintDocumentTemplateProps {
  printMode: 'full' | 'questions-only' | 'keys-only' | 'blueprint-only' | 'ljk-only';
}

export const PrintDocumentTemplate: React.FC<PrintDocumentTemplateProps> = ({ printMode }) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans leading-normal">
      {/* Official Exam Paper Header */}
      <div className="border-b-2 border-black pb-4 mb-6 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          ASESMEN KEMAMPUAN AKADEMIK (TKA) SEKOLAH MENENGAH KEJURUAN
        </h1>
        <h2 className="text-base font-semibold uppercase mt-0.5">
          PROGRAM KEAHLIAN TEKNIK KOMPUTER DAN JARINGAN (TKJ)
        </h2>
        <div className="grid grid-cols-2 text-xs text-left mt-4 pt-3 border-t border-black max-w-2xl mx-auto">
          <div>
            <p><strong>Mata Pelajaran:</strong> {TKA_METADATA.mataPelajaran}</p>
            <p><strong>Kelas / Semester:</strong> {TKA_METADATA.kelas} / Genap</p>
            <p><strong>Materi Pokok:</strong> {TKA_METADATA.materiPokok}</p>
          </div>
          <div>
            <p><strong>Bentuk Soal:</strong> {TKA_METADATA.bentukSoal}</p>
            <p><strong>Jumlah Soal:</strong> {TKA_METADATA.totalSoal} Butir</p>
            <p><strong>Alokasi Waktu:</strong> 90 Menit</p>
          </div>
        </div>
      </div>

      {/* Mode: QUESTIONS ONLY (Naskah Soal Siswa) */}
      {(printMode === 'questions-only' || printMode === 'full') && (
        <div className="space-y-6">
          <div className="text-xs bg-slate-100 p-3 border border-slate-300 rounded mb-6">
            <strong>PETUNJUK UMUM PENGERJAAN:</strong>
            <ol className="list-decimal pl-5 mt-1 space-y-0.5">
              <li>Berdoalah sebelum mengerjakan soal.</li>
              <li>Tuliskan identitas Anda secara lengkap dan benar pada Lembar Jawaban yang tersedia.</li>
              <li>Periksa dan bacalah setiap butir soal dengan saksama sebelum menjawab.</li>
              <li>Pilihlah salah satu jawaban yang paling tepat dengan memberi tanda silang (X) atau menghitamkan bulatan pada huruf A, B, C, D, atau E.</li>
              <li>Dilarang menggunakan catatan atau kalkulator selama ujian berlangsung.</li>
            </ol>
          </div>

          <div className="space-y-6">
            {TKA_QUESTIONS.map((q) => (
              <div key={q.id} className="print-avoid-break text-xs pb-4 border-b border-gray-200">
                <p className="font-bold text-gray-900 mb-1">
                  Soal Nomor {q.id}.
                </p>

                {q.stimulus && (
                  <p className="italic text-gray-700 mb-1.5 pl-2 border-l-2 border-gray-400">
                    {q.stimulus}
                  </p>
                )}

                <p className="font-medium text-gray-900 mb-2">
                  {q.question}
                </p>

                <div className="space-y-1 pl-3">
                  {q.options.map((opt) => (
                    <div key={opt.key} className="flex items-start gap-2">
                      <span className="font-bold w-4 shrink-0">{opt.key}.</span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode: BLUEPRINT ONLY */}
      {(printMode === 'blueprint-only' || printMode === 'full') && (
        <div className={printMode === 'full' ? 'print-page-break pt-8' : ''}>
          <h2 className="text-base font-bold text-center border-b pb-2 mb-4">
            KISI-KISI SOAL ASESMEN AKADEMIK PERAKITAN KOMPUTER
          </h2>
          <table className="w-full text-left text-[10px] border-collapse border border-black">
            <thead>
              <tr className="bg-gray-100 border-b border-black">
                <th className="p-1.5 border-r border-black text-center w-8">No</th>
                <th className="p-1.5 border-r border-black">Materi</th>
                <th className="p-1.5 border-r border-black">Indikator Soal</th>
                <th className="p-1.5 border-r border-black text-center w-14">Kognitif</th>
                <th className="p-1.5 border-r border-black text-center w-14">Kesulitan</th>
                <th className="p-1.5 text-center w-10">Nomor</th>
              </tr>
            </thead>
            <tbody>
              {TKA_QUESTIONS.map((q) => (
                <tr key={q.id} className="border-b border-gray-300">
                  <td className="p-1 border-r border-black text-center font-mono">{q.id}</td>
                  <td className="p-1 border-r border-black">{q.topic}</td>
                  <td className="p-1 border-r border-black">{q.indicator}</td>
                  <td className="p-1 border-r border-black text-center font-mono">{q.cognitiveLevel}</td>
                  <td className="p-1 border-r border-black text-center">{q.difficulty}</td>
                  <td className="p-1 text-center font-mono font-bold">{q.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mode: KEYS & EXPLANATIONS */}
      {(printMode === 'keys-only' || printMode === 'full') && (
        <div className={printMode === 'full' ? 'print-page-break pt-8' : ''}>
          <h2 className="text-base font-bold text-center border-b pb-2 mb-4">
            KUNCI JAWABAN & PEMBAHASAN LENGKAP (MASTER GURU)
          </h2>

          {/* Key Table */}
          <div className="grid grid-cols-5 gap-2 text-xs font-mono border border-black p-2 mb-6">
            {TKA_QUESTIONS.map((q) => (
              <div key={q.id} className="flex justify-between border-b border-gray-200 py-0.5 px-1">
                <span>{q.id}.</span>
                <span className="font-bold">{q.correctAnswer}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-xs">
            {TKA_QUESTIONS.map((q) => {
              const correct = q.options.find((o) => o.key === q.correctAnswer);
              return (
                <div key={q.id} className="print-avoid-break pb-3 border-b border-gray-200">
                  <div className="flex justify-between font-bold">
                    <span>Nomor {q.id}.</span>
                    <span>Jawaban: {q.correctAnswer} ({correct?.text})</span>
                  </div>
                  <p className="mt-1 text-gray-800">
                    <strong>Pembahasan:</strong> {q.explanation}
                  </p>
                  {q.optionsAnalysis && (
                    <div className="mt-1 pl-2 text-[11px] text-gray-600 space-y-0.5">
                      {Object.entries(q.optionsAnalysis).map(([k, desc]) => (
                        <p key={k}><strong>{k}:</strong> {desc}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode: LJK ONLY */}
      {printMode === 'ljk-only' && (
        <div className="space-y-6">
          <div className="border border-black p-4 text-xs">
            <h3 className="text-center font-bold text-sm uppercase mb-3">
              LEMBAR JAWABAN KOMPUTER (LJK) PERAKITAN KOMPUTER KELAS X
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Nama Siswa: ________________________________</p>
                <p className="mt-2">NIS / NISN: ________________________________</p>
              </div>
              <div>
                <p>Kelas: X TKJ _____</p>
                <p className="mt-2">Tanda Tangan: ________________________</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-1 text-xs font-mono">
            <div>
              {Array.from({ length: 25 }, (_, i) => i + 1).map((n) => (
                <div key={n} className="flex justify-between py-1 border-b border-gray-200">
                  <span>{n}.</span>
                  <div className="flex gap-3">
                    {['A', 'B', 'C', 'D', 'E'].map((l) => (
                      <span key={l} className="w-5 h-5 rounded-full border border-black flex items-center justify-center font-bold text-[10px]">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              {Array.from({ length: 25 }, (_, i) => i + 26).map((n) => (
                <div key={n} className="flex justify-between py-1 border-b border-gray-200">
                  <span>{n}.</span>
                  <div className="flex gap-3">
                    {['A', 'B', 'C', 'D', 'E'].map((l) => (
                      <span key={l} className="w-5 h-5 rounded-full border border-black flex items-center justify-center font-bold text-[10px]">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
