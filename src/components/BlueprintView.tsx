import React, { useState } from 'react';
import { TKA_METADATA, TKA_QUESTIONS } from '../data/tkaData.ts';
import { Layers, PieChart, BarChart3, CheckSquare, Search } from 'lucide-react';

export const BlueprintView: React.FC = () => {
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [cognitiveFilter, setCognitiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique topics
  const uniqueTopics = Array.from(new Set(TKA_QUESTIONS.map((q) => q.topic)));

  const filtered = TKA_QUESTIONS.filter((q) => {
    if (topicFilter !== 'all' && q.topic !== topicFilter) return false;
    if (cognitiveFilter !== 'all' && q.cognitiveLevel !== cognitiveFilter) return false;
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      return (
        q.id.toString().includes(term) ||
        q.topic.toLowerCase().includes(term) ||
        q.indicator.toLowerCase().includes(term) ||
        q.skillMeasured.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Calculate statistics
  const diffCounts = {
    Mudah: TKA_QUESTIONS.filter((q) => q.difficulty === 'Mudah').length,
    Sedang: TKA_QUESTIONS.filter((q) => q.difficulty === 'Sedang').length,
    Sulit: TKA_QUESTIONS.filter((q) => q.difficulty === 'Sulit').length,
  };

  const cogCounts = {
    C1: TKA_QUESTIONS.filter((q) => q.cognitiveLevel === 'C1').length,
    C2: TKA_QUESTIONS.filter((q) => q.cognitiveLevel === 'C2').length,
    C3: TKA_QUESTIONS.filter((q) => q.cognitiveLevel === 'C3').length,
    C4: TKA_QUESTIONS.filter((q) => q.cognitiveLevel === 'C4').length,
  };

  const keyCounts = {
    A: TKA_QUESTIONS.filter((q) => q.correctAnswer === 'A').length,
    B: TKA_QUESTIONS.filter((q) => q.correctAnswer === 'B').length,
    C: TKA_QUESTIONS.filter((q) => q.correctAnswer === 'C').length,
    D: TKA_QUESTIONS.filter((q) => q.correctAnswer === 'D').length,
    E: TKA_QUESTIONS.filter((q) => q.correctAnswer === 'E').length,
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Overview Cards */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Matriks Penilaian Akademik
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Kisi-Kisi Soal Asesmen Akademik Perakitan Komputer
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rancangan spesifikasi 50 butir instrumen tes SMK Kelas X TKJ sesuai Taksonomi Bloom Revisi
            </p>
          </div>
        </div>

        {/* Statistical Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Difficulty Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                Komposisi Tingkat Kesulitan
              </span>
              <span className="text-xs text-slate-500 font-mono">Total 50</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Mudah (Target: 15)</span>
                <span className="font-mono font-bold text-emerald-700">{diffCounts.Mudah} Soal (30%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${(diffCounts.Mudah / 50) * 100}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">Sedang (Target: 25)</span>
                <span className="font-mono font-bold text-amber-700">{diffCounts.Sedang} Soal (50%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${(diffCounts.Sedang / 50) * 100}%` }}></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">Sulit (Target: 10)</span>
                <span className="font-mono font-bold text-rose-700">{diffCounts.Sulit} Soal (20%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-rose-600 h-1.5 rounded-full" style={{ width: `${(diffCounts.Sulit / 50) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* Cognitive Level Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Sebaran Level Kognitif (Bloom)
              </span>
              <span className="text-xs text-slate-500 font-mono">Prioritas C2-C4</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">C1 Mengingat</span>
                <span className="text-base font-bold font-mono text-slate-800">{cogCounts.C1} Soal</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">C2 Memahami</span>
                <span className="text-base font-bold font-mono text-indigo-700">{cogCounts.C2} Soal</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">C3 Menerapkan</span>
                <span className="text-base font-bold font-mono text-indigo-700">{cogCounts.C3} Soal</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px]">C4 Menganalisis</span>
                <span className="text-base font-bold font-mono text-indigo-700">{cogCounts.C4} Soal</span>
              </div>
            </div>
          </div>

          {/* Key Distribution Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                Proporsi Kunci Jawaban
              </span>
              <span className="text-xs text-slate-500 font-mono">10 Tiap Opsi</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {(['A', 'B', 'C', 'D', 'E'] as const).map((k) => (
                <div key={k} className="bg-white p-2 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Opsi {k}</span>
                  <span className="text-sm font-bold font-mono text-slate-900">{keyCounts[k]}</span>
                  <span className="text-[9px] text-slate-400 block">20%</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Distribusi 100% seimbang dan acak untuk mencegah pola tebak kancing.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari materi atau indikator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={cognitiveFilter}
              onChange={(e) => setCognitiveFilter(e.target.value)}
              className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Semua Kognitif</option>
              <option value="C1">C1 - Mengingat</option>
              <option value="C2">C2 - Memahami</option>
              <option value="C3">C3 - Menerapkan</option>
              <option value="C4">C4 - Menganalisis</option>
            </select>

            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[240px] truncate"
            >
              <option value="all">Semua Materi (20 Pokok)</option>
              {uniqueTopics.map((top, idx) => (
                <option key={idx} value={top}>
                  {top}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                <th className="py-2.5 px-3 font-semibold text-center w-12">No</th>
                <th className="py-2.5 px-3 font-semibold min-w-[180px]">Materi</th>
                <th className="py-2.5 px-3 font-semibold min-w-[260px]">Indikator Soal</th>
                <th className="py-2.5 px-3 font-semibold min-w-[120px]">Kemampuan</th>
                <th className="py-2.5 px-3 font-semibold text-center w-16">Kognitif</th>
                <th className="py-2.5 px-3 font-semibold text-center w-20">Kesulitan</th>
                <th className="py-2.5 px-3 font-semibold text-center w-16">Bentuk</th>
                <th className="py-2.5 px-3 font-semibold text-center w-16">Nomor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 text-center font-mono text-slate-700">{q.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{q.topic}</td>
                  <td className="py-2.5 px-3 text-slate-600 leading-relaxed">{q.indicator}</td>
                  <td className="py-2.5 px-3 text-slate-600">{q.skillMeasured}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-700">{q.cognitiveLevel}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[11px] font-medium ${
                      q.difficulty === 'Mudah' ? 'text-emerald-700' : q.difficulty === 'Sedang' ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-500">PG</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-700">{q.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
