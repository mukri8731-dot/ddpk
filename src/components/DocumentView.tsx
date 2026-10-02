import React, { useState } from 'react';
import { TKA_METADATA, TKA_QUESTIONS, SCORING_RUBRIC } from '../data/tkaData.ts';
import { Copy, Check, Search, ArrowUp, BookOpen, Key, HelpCircle, Award, ListFilter } from 'lucide-react';

export const DocumentView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'all' | '1' | '2' | '3' | '4' | '5'>('all');

  const filteredQuestions = TKA_QUESTIONS.filter((q) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return (
      q.id.toString().includes(term) ||
      q.question.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term) ||
      q.indicator.toLowerCase().includes(term) ||
      (q.stimulus && q.stimulus.toLowerCase().includes(term))
    );
  });

  const handleCopyFullText = () => {
    let fullText = `# PAKET LATIHAN SOAL ASESMEN AKADEMIK (TKA)\n`;
    fullText += `MATA PELAJARAN: PERAKITAN KOMPUTER - SMK KELAS X TKJ\n`;
    fullText += `Materi: ${TKA_METADATA.materiPokok}\n`;
    fullText += `Jumlah: ${TKA_METADATA.totalSoal} Butir Pilihan Ganda (A, B, C, D, E)\n\n`;

    // Bagian 1
    fullText += `## BAGIAN 1 — KISI-KISI SOAL\n\n`;
    fullText += `| No | Materi | Indikator Soal | Kemampuan yang Diukur | Level Kognitif | Bentuk Soal | Nomor Soal |\n`;
    fullText += `|---|---|---|---|---|---|---|\n`;
    TKA_QUESTIONS.forEach((q) => {
      fullText += `| ${q.id} | ${q.topic} | ${q.indicator} | ${q.skillMeasured} | ${q.cognitiveLevel} | PG | ${q.id} |\n`;
    });
    fullText += `\n---\n\n`;

    // Bagian 2
    fullText += `## BAGIAN 2 — SOAL TKA (50 BUTIR)\n\n`;
    TKA_QUESTIONS.forEach((q) => {
      fullText += `**Soal Nomor ${q.id}. (Tingkat Kesulitan: ${q.difficulty})**\n\n`;
      if (q.stimulus) {
        fullText += `${q.stimulus}\n\n`;
      }
      fullText += `${q.question}\n\n`;
      q.options.forEach((opt) => {
        fullText += `${opt.key}. ${opt.text}\n`;
      });
      fullText += `\n`;
    });
    fullText += `\n---\n\n`;

    // Bagian 3
    fullText += `## BAGIAN 3 — KUNCI JAWABAN\n\n`;
    fullText += `| Nomor Soal | Jawaban Benar | Materi |\n`;
    fullText += `|---|---|---|\n`;
    TKA_QUESTIONS.forEach((q) => {
      fullText += `| ${q.id} | ${q.correctAnswer} | ${q.topic} |\n`;
    });
    fullText += `\n---\n\n`;

    // Bagian 4
    fullText += `## BAGIAN 4 — PEMBAHASAN SETIAP SOAL\n\n`;
    TKA_QUESTIONS.forEach((q) => {
      const correctOpt = q.options.find((o) => o.key === q.correctAnswer);
      fullText += `**Nomor ${q.id}.**\n`;
      fullText += `* Jawaban benar: ${q.correctAnswer}. ${correctOpt?.text}\n`;
      fullText += `* Pembahasan: ${q.explanation}\n`;
      fullText += `* Analisis pilihan:\n`;
      Object.entries(q.optionsAnalysis).forEach(([key, val]) => {
        fullText += `  - Pilihan ${key}: ${val}\n`;
      });
      fullText += `\n`;
    });
    fullText += `\n---\n\n`;

    // Bagian 5
    fullText += `## BAGIAN 5 — PEDOMAN PENSKORAN\n\n`;
    fullText += `* Jumlah soal: 50 butir\n`;
    fullText += `* Jawaban benar: 2 poin\n`;
    fullText += `* Jawaban salah: 0 poin\n`;
    fullText += `* Tidak dijawab: 0 poin\n`;
    fullText += `* Skor maksimal: 100\n\n`;
    fullText += `Rumus nilai:\n`;
    fullText += `Nilai Akhir = (Jumlah Jawaban Benar / 50) × 100\n\n`;
    fullText += `Tabel Interpretasi Hasil Latihan:\n`;
    SCORING_RUBRIC.categories.forEach((cat) => {
      fullText += `- Rentang ${cat.range} (${cat.predikat}): ${cat.deskripsi} Rekomendasi: ${cat.rekomendasi}\n`;
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Document & Identity Card */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <span>Kurikulum SMK TKJ</span>
              <span aria-hidden="true">·</span>
              <span>Kelas X Semester Genap</span>
              <span aria-hidden="true">·</span>
              <span>Instrumen Asesmen Akademik</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
              Paket Latihan Soal Asesmen Akademik (TKA)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Mata Pelajaran Perakitan Komputer — Materi Pokok Pengujian dan Troubleshooting Komputer
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyFullText}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Teks Tersalin ke Clipboard' : 'Salin Seluruh Naskah'}</span>
            </button>
          </div>
        </div>

        {/* Identity Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 text-xs">
          <div>
            <span className="text-slate-500 block">Jenjang</span>
            <span className="font-semibold text-slate-900 text-sm">{TKA_METADATA.jenjang} Kelas X</span>
          </div>
          <div>
            <span className="text-slate-500 block">Program Keahlian</span>
            <span className="font-semibold text-slate-900 text-sm">TKJ</span>
          </div>
          <div>
            <span className="text-slate-500 block">Mata Pelajaran</span>
            <span className="font-semibold text-slate-900 text-sm">Perakitan Komputer</span>
          </div>
          <div>
            <span className="text-slate-500 block">Bentuk & Jumlah Soal</span>
            <span className="font-semibold text-slate-900 text-sm">50 Pilihan Ganda (A-E)</span>
          </div>
          <div>
            <span className="text-slate-500 block">Komposisi Kesulitan</span>
            <span className="font-semibold text-slate-900 text-sm">15 M · 25 S · 10 Sulit</span>
          </div>
          <div>
            <span className="text-slate-500 block">Skor Maksimal</span>
            <span className="font-semibold text-slate-900 text-sm">100 Poin (2 Poin/Soal)</span>
          </div>
        </div>

        {/* Section Jump Links */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2 no-print">
          <span className="text-xs text-slate-500 mr-1 font-medium">Navigasi Bagian:</span>
          <button
            onClick={() => scrollToId('bagian-1')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
          >
            Bagian 1: Kisi-Kisi
          </button>
          <button
            onClick={() => scrollToId('bagian-2')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
          >
            Bagian 2: Soal TKA (1-50)
          </button>
          <button
            onClick={() => scrollToId('bagian-3')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
          >
            Bagian 3: Kunci Jawaban
          </button>
          <button
            onClick={() => scrollToId('bagian-4')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
          >
            Bagian 4: Pembahasan
          </button>
          <button
            onClick={() => scrollToId('bagian-5')}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 rounded-md transition-colors cursor-pointer"
          >
            Bagian 5: Pedoman Skor
          </button>
        </div>
      </section>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci soal, gejala, atau materi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-500 mr-2 shrink-0 font-medium">Tampilkan:</span>
          {(['all', '1', '2', '3', '4', '5'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === sec
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sec === 'all' ? 'Semua Bagian' : `Bagian ${sec}`}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* BAGIAN 1: KISI-KISI SOAL */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === '1') && (
        <section id="bagian-1" className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs print-avoid-break">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Bagian 1</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kisi-Kisi Soal Asesmen Akademik</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cakupan 50 butir soal lengkap dengan materi, indikator terukur, kemampuan yang diukur, dan level kognitif
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>50 Butir Terpetakan</span>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 lg:-mx-8 px-6 lg:px-8">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                  <th className="py-3 px-3 font-semibold text-center w-12">No</th>
                  <th className="py-3 px-3 font-semibold min-w-[180px]">Materi</th>
                  <th className="py-3 px-3 font-semibold min-w-[280px]">Indikator Soal</th>
                  <th className="py-3 px-3 font-semibold min-w-[130px]">Kemampuan</th>
                  <th className="py-3 px-3 font-semibold text-center w-20">Kognitif</th>
                  <th className="py-3 px-3 font-semibold text-center w-20">Kesulitan</th>
                  <th className="py-3 px-3 font-semibold text-center w-16">Bentuk</th>
                  <th className="py-3 px-3 font-semibold text-center w-16">Nomor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-medium text-slate-700">{q.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{q.topic}</td>
                    <td className="py-3 px-3 text-slate-600 leading-relaxed">{q.indicator}</td>
                    <td className="py-3 px-3 text-slate-600">{q.skillMeasured}</td>
                    <td className="py-3 px-3 text-center font-mono font-semibold text-slate-700">{q.cognitiveLevel}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[11px] font-medium ${
                        q.difficulty === 'Mudah' ? 'text-emerald-700' : q.difficulty === 'Sedang' ? 'text-amber-700' : 'text-rose-700'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-500">PG</td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-indigo-700">{q.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* BAGIAN 2: SOAL TKA (50 SOAL) */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === '2') && (
        <section id="bagian-2" className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs print-page-break">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Bagian 2</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Naskah Soal Tes Kemampuan Akademik (TKA)</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                50 Butir Pilihan Ganda (A, B, C, D, E) — Bersih tanpa kunci jawaban untuk bahan ujian siswa
              </p>
            </div>
            <div className="text-xs text-slate-500">
              <span>Menampilkan {filteredQuestions.length} dari 50 soal</span>
            </div>
          </div>

          <div className="space-y-8">
            {filteredQuestions.map((q) => (
              <article
                key={q.id}
                className="border-b border-slate-100 pb-7 last:border-b-0 print-avoid-break"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Soal Nomor {q.id}.{' '}
                    <span className="font-normal text-slate-500 text-xs ml-1">
                      (Tingkat Kesulitan: {q.difficulty} · Level {q.cognitiveLevel})
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400 hidden sm:inline">{q.topic}</span>
                </div>

                {q.stimulus && (
                  <div className="my-2.5 p-3.5 bg-slate-50 rounded-lg border-l-3 border-indigo-500 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    {q.stimulus}
                  </div>
                )}

                <p className="text-xs sm:text-sm font-medium text-slate-800 my-2 leading-relaxed">
                  {q.question}
                </p>

                <div className="mt-3 space-y-2 pl-1 sm:pl-3">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                    >
                      <span className="font-mono font-bold text-slate-900 w-5 shrink-0 text-center">
                        {opt.key}.
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* BAGIAN 3: KUNCI JAWABAN */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === '3') && (
        <section id="bagian-3" className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs print-page-break">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Bagian 3</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Tabel Kunci Jawaban Resmi</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sebaran proporsional: 10 A · 10 B · 10 C · 10 D · 10 E (Total 50 butir terverifikasi bebas pola)
              </p>
            </div>
          </div>

          {/* Answer Distribution Cards */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((key) => {
              const count = TKA_QUESTIONS.filter((q) => q.correctAnswer === key).length;
              return (
                <div key={key} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 block font-medium">Opsi {key}</span>
                  <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">{count}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Soal (20%)</span>
                </div>
              );
            })}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
                  <th className="py-2.5 px-3 font-semibold text-center w-20">Nomor Soal</th>
                  <th className="py-2.5 px-3 font-semibold text-center w-28">Jawaban Benar</th>
                  <th className="py-2.5 px-3 font-semibold">Materi Pokok Pembahasan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TKA_QUESTIONS.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700">{q.id}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-mono font-bold rounded">
                        {q.correctAnswer}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{q.topic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* BAGIAN 4: PEMBAHASAN SETIAP SOAL */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === '4') && (
        <section id="bagian-4" className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs print-page-break">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Bagian 4</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Pembahasan Mendalam & Analisis Pilihan</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Penjelasan komprehensif konsep teknis, hubungan sebab-akibat, dan analisis distractor (A, B, C, D, E)
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {filteredQuestions.map((q) => {
              const correctOption = q.options.find((o) => o.key === q.correctAnswer);
              return (
                <div
                  key={q.id}
                  className="p-5 bg-slate-50/60 rounded-xl border border-slate-200/80 space-y-3 print-avoid-break"
                >
                  <div className="flex items-baseline justify-between border-b border-slate-200/70 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Nomor {q.id}.
                    </span>
                    <span className="text-xs text-indigo-700 font-semibold font-mono">
                      Jawaban Benar: {q.correctAnswer}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">Pernyataan Jawaban Benar:</span>
                    <p className="text-xs sm:text-sm font-medium text-slate-900">
                      {q.correctAnswer}. {correctOption?.text}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">Konsep & Pembahasan Teknis:</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>

                  {q.optionsAnalysis && Object.keys(q.optionsAnalysis).length > 0 && (
                    <div className="pt-2 border-t border-slate-200/50">
                      <span className="text-xs font-semibold text-slate-500 block mb-1.5">Analisis Pilihan & Pengecoh:</span>
                      <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600">
                        {Object.entries(q.optionsAnalysis).map(([key, desc]) => (
                          <div key={key} className="flex items-start gap-2">
                            <span className={`font-mono font-bold shrink-0 ${key === q.correctAnswer ? 'text-emerald-700' : 'text-slate-500'}`}>
                              Pilihan {key}:
                            </span>
                            <span className="leading-relaxed">{desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* BAGIAN 5: PEDOMAN PENSKORAN & INTERPRETASI */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === '5') && (
        <section id="bagian-5" className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-xs print-page-break">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Bagian 5</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Pedoman Penskoran & Interpretasi Hasil Latihan</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Ketentuan pembobotan nilai, rumus kalkulasi, dan rubrik evaluasi penguasaan peserta didik SMK
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                Ketentuan Penskoran Butir Soal
              </h3>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Jumlah Soal Keseluruhan:</span>
                  <span className="font-semibold text-slate-900 font-mono">50 Butir</span>
                </li>
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Bobot Jawaban Benar:</span>
                  <span className="font-semibold text-emerald-700 font-mono">+2 Poin</span>
                </li>
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Bobot Jawaban Salah:</span>
                  <span className="font-semibold text-slate-700 font-mono">0 Poin (Tanpa Pengurangan)</span>
                </li>
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-600">Tidak Dijawab:</span>
                  <span className="font-semibold text-slate-700 font-mono">0 Poin</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="font-semibold text-slate-800">Skor Maksimal Total:</span>
                  <span className="font-bold text-indigo-700 font-mono text-base">100 Poin</span>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-indigo-950 mb-2">Rumus Perhitungan Nilai Akhir</h3>
              <div className="bg-white p-4 rounded-lg border border-indigo-200 font-mono text-center my-2 shadow-xs">
                <p className="text-sm sm:text-base font-bold text-indigo-900">
                  Nilai Akhir = ( Jumlah Jawaban Benar / 50 ) × 100
                </p>
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Setiap 1 jawaban benar merepresentasikan 2% dari total penguasaan materi pengujian dan troubleshooting komputer SMK kelas X.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Tabel Kategori Penguasaan Peserta Didik
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                    <th className="py-3 px-3 font-semibold w-24">Rentang Skor</th>
                    <th className="py-3 px-3 font-semibold w-36">Predikat</th>
                    <th className="py-3 px-3 font-semibold">Deskripsi Tingkat Penguasaan</th>
                    <th className="py-3 px-3 font-semibold">Rekomendasi Tindak Lanjut Guru</th>
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

            <p className="text-[11px] text-slate-500 italic mt-3">
              Catatan: Interpretasi di atas merupakan instrumen diagnostik latihan akademik formatif guru, bukan kriteria kelulusan resmi satuan pendidikan.
            </p>
          </div>
        </section>
      )}

      {/* Floating Back to Top Button */}
      <div className="fixed bottom-6 right-6 no-print">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-slate-900/90 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors cursor-pointer"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
