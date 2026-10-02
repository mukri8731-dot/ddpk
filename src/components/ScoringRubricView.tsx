import React, { useState } from 'react';
import { SCORING_RUBRIC } from '../data/tkaData.ts';
import { Award, Calculator, Printer, CheckCircle, FileText } from 'lucide-react';

export const ScoringRubricView: React.FC = () => {
  const [correctInput, setCorrectInput] = useState<number>(42);

  const calculatedScore = Math.round((correctInput / 50) * 100);

  const getCategory = (score: number) => {
    if (score >= 86) return SCORING_RUBRIC.categories[0];
    if (score >= 71) return SCORING_RUBRIC.categories[1];
    if (score >= 56) return SCORING_RUBRIC.categories[2];
    return SCORING_RUBRIC.categories[3];
  };

  const currentCategory = getCategory(calculatedScore);

  const handlePrintLJK = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Scoring Guidelines Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Bagian 5 — Standar Penilaian
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Pedoman Penskoran & Rubrik Penilaian
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Panduan kalkulasi skor, bobot poin butir soal, dan kriteria tindak lanjut hasil belajar siswa SMK
            </p>
          </div>

          <button
            onClick={handlePrintLJK}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak Lembar Jawaban (LJK)</span>
          </button>
        </div>

        {/* Core Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              Aturan Penskoran Tes Objektif Pilihan Ganda
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Total Butir Soal:</span>
                <span className="font-mono font-bold text-slate-900">50 Butir</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Skor Jawaban Benar:</span>
                <span className="font-mono font-bold text-emerald-700">2 Poin per Soal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Skor Jawaban Salah:</span>
                <span className="font-mono font-bold text-slate-700">0 Poin (Tanpa Pengurangan)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Skor Tidak Menjawab:</span>
                <span className="font-mono font-bold text-slate-700">0 Poin</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-slate-900">Skor Maksimal Kumulatif:</span>
                <span className="font-mono font-bold text-indigo-700 text-base">100 Poin</span>
              </div>
            </div>
          </div>

          {/* Formula Callout */}
          <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-indigo-950 mb-2">Formula Perhitungan Nilai Akhir</h3>
            <div className="bg-white p-4 rounded-lg border border-indigo-200 text-center font-mono shadow-xs my-1">
              <span className="text-base sm:text-lg font-extrabold text-indigo-900">
                Nilai Akhir = ( Jawaban Benar / 50 ) × 100
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Skor langsung terkonversi ke dalam skala nilai 0–100 untuk mempermudah entri buku nilai guru SMK (e-Rapor).
            </p>
          </div>
        </div>

        {/* Interactive Score Simulator */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                Simulasi Konversi Nilai Siswa
              </h3>
              <span className="text-xs text-slate-500 font-mono">Geser untuk mensimulasikan</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:flex-1">
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Jumlah Jawaban Benar:</span>
                  <span className="font-mono font-bold text-indigo-700 text-sm">{correctInput} dari 50</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={correctInput}
                  onChange={(e) => setCorrectInput(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-lg border border-slate-200 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Nilai Akhir</span>
                  <span className="text-2xl font-black font-mono text-indigo-700">{calculatedScore}</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Kategori</span>
                  <span className="text-sm font-bold text-slate-800">{currentCategory.predikat}</span>
                </div>
              </div>
            </div>

            {/* Simulated feedback */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
              <p className="text-slate-800 font-medium">{currentCategory.deskripsi}</p>
              <p className="text-indigo-800"><span className="font-semibold">Tindak Lanjut:</span> {currentCategory.rekomendasi}</p>
            </div>
          </div>
        </div>

        {/* Rubric Category Table */}
        <div className="mt-8 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            Tabel Interpretasi Tingkat Penguasaan
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="py-3 px-3 font-semibold w-24">Rentang Nilai</th>
                  <th className="py-3 px-3 font-semibold w-36">Predikat</th>
                  <th className="py-3 px-3 font-semibold">Deskripsi Capaian Pembelajaran</th>
                  <th className="py-3 px-3 font-semibold">Rekomendasi Tindak Lanjut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SCORING_RUBRIC.categories.map((cat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{cat.range}</td>
                    <td className="py-3 px-3 font-semibold text-indigo-700">{cat.predikat}</td>
                    <td className="py-3 px-3 text-slate-700 leading-relaxed">{cat.deskripsi}</td>
                    <td className="py-3 px-3 text-slate-600 leading-relaxed">{cat.rekomendasi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Printable Lembar Jawaban Komputer (LJK) Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs print-page-break">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Format Cetak Lembar Ujian
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Lembar Jawaban Pilihan Ganda (50 Butir)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Siap dicetak untuk pelaksanaan asesmen tatap muka berbasis kertas di laboratorium TKJ
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Halaman Ini</span>
          </button>
        </div>

        {/* Student Identity Form */}
        <div className="border border-slate-300 rounded-lg p-4 mb-6 bg-slate-50/40 text-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-500 block mb-1">Nama Lengkap Siswa:</label>
              <div className="border-b border-dotted border-slate-400 h-6"></div>
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Nomor Induk Siswa (NIS/NISN):</label>
              <div className="border-b border-dotted border-slate-400 h-6"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div>
              <label className="text-slate-500 block mb-1">Kelas / Jurusan:</label>
              <div className="border-b border-dotted border-slate-400 h-6">X TKJ</div>
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Mata Pelajaran:</label>
              <div className="border-b border-dotted border-slate-400 h-6">Perakitan Komputer</div>
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Tanggal Ujian:</label>
              <div className="border-b border-dotted border-slate-400 h-6"></div>
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Tanda Tangan Siswa:</label>
              <div className="border-b border-dotted border-slate-400 h-6"></div>
            </div>
          </div>
        </div>

        {/* 50 Bubbles Grid (2 columns x 25 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs font-mono">
          {/* Column 1: 1 - 25 */}
          <div className="space-y-1.5">
            {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
              <div key={num} className="flex items-center justify-between py-1 px-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 w-8">{num}.</span>
                <div className="flex items-center gap-3">
                  {(['A', 'B', 'C', 'D', 'E'] as const).map((ch) => (
                    <div
                      key={ch}
                      className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-600 font-bold"
                    >
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: 26 - 50 */}
          <div className="space-y-1.5">
            {Array.from({ length: 25 }, (_, i) => i + 26).map((num) => (
              <div key={num} className="flex items-center justify-between py-1 px-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 w-8">{num}.</span>
                <div className="flex items-center gap-3">
                  {(['A', 'B', 'C', 'D', 'E'] as const).map((ch) => (
                    <div
                      key={ch}
                      className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center text-[10px] text-slate-600 font-bold"
                    >
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
