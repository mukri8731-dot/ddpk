import React, { useState } from 'react';
import { TKA_QUESTIONS, QuestionItem } from '../data/tkaData.ts';
import { Search, CheckCircle2, XCircle, HelpCircle, Filter, RotateCcw, Eye, EyeOff } from 'lucide-react';

export const PracticeView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Mudah' | 'Sedang' | 'Sulit'>('all');
  const [cognitiveFilter, setCognitiveFilter] = useState<'all' | 'C1' | 'C2' | 'C3' | 'C4'>('all');

  const filteredQuestions = TKA_QUESTIONS.filter((q) => {
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    if (cognitiveFilter !== 'all' && q.cognitiveLevel !== cognitiveFilter) return false;
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      return (
        q.id.toString().includes(term) ||
        q.question.toLowerCase().includes(term) ||
        q.topic.toLowerCase().includes(term) ||
        q.indicator.toLowerCase().includes(term) ||
        (q.stimulus && q.stimulus.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const handleSelectOption = (questionId: number, key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: key,
    }));
  };

  const handleResetPractice = () => {
    setSelectedAnswers({});
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              Mode Belajar & Eksplorasi Mandiri
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Latihan Soal dengan Umpan Balik Instan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih opsi jawaban untuk melihat analisis kesalahan, pengecoh, dan pembahasan teknis perakitan komputer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllExplanations(!showAllExplanations)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {showAllExplanations ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAllExplanations ? 'Sembunyikan Kunci' : 'Tampilkan Semua Kunci'}</span>
            </button>

            <button
              onClick={handleResetPractice}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Reset Pilihan"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik atau gejala..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 mr-1 shrink-0">Kesulitan:</span>
            {(['all', 'Mudah', 'Sedang', 'Sulit'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer ${
                  difficultyFilter === diff
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff === 'all' ? 'Semua' : diff}
              </button>
            ))}
          </div>

          {/* Cognitive filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 mr-1 shrink-0">Kognitif:</span>
            {(['all', 'C1', 'C2', 'C3', 'C4'] as const).map((cog) => (
              <button
                key={cog}
                onClick={() => setCognitiveFilter(cog)}
                className={`px-2 py-1 text-xs rounded font-mono transition-colors cursor-pointer ${
                  cognitiveFilter === cog
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cog === 'all' ? 'Semua' : cog}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Ditemukan <strong>{filteredQuestions.length}</strong> butir soal yang sesuai kriteria filter.
        </div>
      </div>

      {/* Questions Practice List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = !!userChoice;
          const isCorrect = userChoice === q.correctAnswer;
          const showAnswer = isAnswered || showAllExplanations;

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-6 shadow-xs transition-all space-y-4 ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-rose-300 ring-1 ring-rose-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">
                    Soal Nomor {q.id}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {q.cognitiveLevel}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">{q.topic}</span>
              </div>

              {/* Stimulus */}
              {q.stimulus && (
                <div className="p-3.5 bg-slate-50 rounded-lg border-l-4 border-indigo-500 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  {q.stimulus}
                </div>
              )}

              {/* Question Text */}
              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = userChoice === opt.key;
                  const isThisKeyCorrect = opt.key === q.correctAnswer;

                  let optClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800';
                  let badgeClass = 'bg-slate-100 text-slate-700';

                  if (showAnswer) {
                    if (isThisKeyCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium';
                      badgeClass = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isThisKeyCorrect) {
                      optClass = 'border-rose-400 bg-rose-50/80 text-rose-950 line-through';
                      badgeClass = 'bg-rose-600 text-white';
                    }
                  } else if (isSelected) {
                    optClass = 'border-indigo-600 bg-indigo-50/80 text-indigo-950';
                    badgeClass = 'bg-indigo-600 text-white';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(q.id, opt.key)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${optClass}`}
                    >
                      <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center font-mono font-bold text-xs ${badgeClass}`}>
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Instant Feedback Panel */}
              {showAnswer && (
                <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3 bg-slate-50/70 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Jawaban Anda Tepat! (+2 Poin)
                      </span>
                    ) : userChoice ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700">
                        <XCircle className="w-4 h-4 text-rose-600" /> Jawaban Kurang Tepat. Kunci Benar: {q.correctAnswer}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                        <HelpCircle className="w-4 h-4 text-indigo-600" /> Kunci Jawaban Resmi: {q.correctAnswer}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">Pembahasan Konsep:</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>

                  {q.optionsAnalysis && (
                    <div className="pt-2 border-t border-slate-200/50">
                      <span className="text-xs font-semibold text-slate-500 block mb-1">Analisis Pilihan:</span>
                      <div className="space-y-1 text-xs text-slate-600">
                        {Object.entries(q.optionsAnalysis).map(([k, desc]) => (
                          <div key={k} className="flex items-start gap-1.5">
                            <span className={`font-mono font-bold shrink-0 ${k === q.correctAnswer ? 'text-emerald-700' : 'text-slate-500'}`}>
                              {k}:
                            </span>
                            <span className="leading-relaxed">{desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
