import React, { useState } from 'react';
import { COMIC_PANELS, ComicPanel } from '../data/caseData';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  MessageSquareQuote, 
  ShieldAlert, 
  Cpu, 
  Stethoscope, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';

interface ComicViewerProps {
  onAskQuestion: (question: string, persona: string) => void;
}

export const ComicViewer: React.FC<ComicViewerProps> = ({ onAskQuestion }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'reader'>('grid');
  const [activePanelId, setActivePanelId] = useState<number>(1);
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activePanel = COMIC_PANELS.find(p => p.id === activePanelId) || COMIC_PANELS[0];

  const handleNext = () => {
    if (activePanelId < COMIC_PANELS.length) {
      setActivePanelId(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activePanelId > 1) {
      setActivePanelId(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Case Story Intro */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-800/40">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5" /> Caso Clínico-Informático Sanatorio San Joaquín
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              El Dilema de la Doble Llave: HCE en Psiquiatría
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explorá la historia a través de las 6 viñetas ilustradas. Cada panel contiene diálogos originales, 
              tensiones clínicas, dilemas de arquitectura y preguntas clave de cátedra para debatir el protocolo de investigación.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Mosaico de Cómic
            </button>
            <button
              onClick={() => setViewMode('reader')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'reader' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Modo Lector (Paso a Paso)
            </button>
          </div>
        </div>
      </div>

      {/* Grid Mode View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COMIC_PANELS.map((panel) => (
            <article 
              key={panel.id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              {/* Comic Header Header Strip */}
              <div className="bg-amber-400 dark:bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-between border-b-2 border-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded">PANEL #{panel.id}</span>
                  <span className="truncate">{panel.title.split(':')[1] || panel.title}</span>
                </span>
                {panel.soundEffect && (
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded-md italic font-black shadow-sm transform -rotate-2">
                    {panel.soundEffect}
                  </span>
                )}
              </div>

              {/* Graphic Novel Illustration */}
              <div className="relative aspect-video overflow-hidden bg-slate-950 border-b-2 border-slate-900">
                <img 
                  src={panel.image} 
                  alt={panel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedImage(panel.image)}
                />
                <button
                  onClick={() => setSelectedImage(panel.image)}
                  className="absolute bottom-3 right-3 p-2 bg-slate-950/80 hover:bg-slate-900 text-white rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                  title="Ampliar viñeta"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-md border border-slate-700 font-medium">
                  {panel.tagline}
                </div>
              </div>

              {/* Classic Comic Yellow Caption Box */}
              <div className="p-4 bg-amber-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1">
                  Crónica del Caso:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">
                  "{panel.narrative}"
                </p>
              </div>

              {/* Dialogues (Bocadillos de Cómic) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-500" /> Intervenciones Clave en la Sala
                  </div>
                  {panel.dialogues.map((dlg, idx) => (
                    <div 
                      key={idx}
                      className={`relative p-3.5 rounded-xl border ${
                        dlg.speaker.includes('Benítez') 
                          ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900/60'
                          : dlg.speaker.includes('Ignacio')
                          ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-900/60'
                          : dlg.speaker.includes('Director')
                          ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/60'
                          : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${dlg.avatarBg}`} />
                          {dlg.speaker}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                          {dlg.role}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        "{dlg.text}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Socratic Professor Prompt & Analysis Toggle */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Pregunta de Cátedra (Profesor):
                    </div>
                    <p className="text-xs text-indigo-950 dark:text-indigo-200 leading-snug">
                      {panel.professorPrompt}
                    </p>
                  </div>

                  {/* Expandable Critical Triad (Clinical, Tech, Methodological) */}
                  <div>
                    <button
                      onClick={() => setExpandedAnalysis(expandedAnalysis === panel.id ? null : panel.id)}
                      className="w-full text-xs font-semibold py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-between transition-colors"
                    >
                      <span>{expandedAnalysis === panel.id ? 'Ocultar análisis multidimensional' : 'Ver análisis multidimensional (Clínica / Sistemas / Metodología)'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedAnalysis === panel.id ? 'rotate-90' : ''}`} />
                    </button>

                    {expandedAnalysis === panel.id && (
                      <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs space-y-2.5 animate-fadeIn">
                        <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <Stethoscope className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900 dark:text-white">Dimensión Clínica: </strong>
                            {panel.criticalAnalysis.clinicalAspect}
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <Cpu className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900 dark:text-white">Dimensión Tecnológica: </strong>
                            {panel.criticalAnalysis.technologicalAspect}
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-900 dark:text-white">Desafío Metodológico: </strong>
                            {panel.criticalAnalysis.methodologicalChallenge}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggested Inquiries (Direct Action to Question System) */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-indigo-400" />
                      Preguntar a la Cátedra sobre esta viñeta:
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {panel.suggestedQuestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => onAskQuestion(q, 'docente')}
                          className="text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/70 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700/80 transition-all flex items-center justify-between group/q"
                        >
                          <span className="truncate pr-2">{q}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/q:opacity-100 transition-opacity shrink-0 text-indigo-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Reader Mode View (Focused Single Panel Presentation) */
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md">
            <button
              onClick={handlePrev}
              disabled={activePanelId === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Viñeta Anterior
            </button>
            <div className="flex items-center gap-2">
              {COMIC_PANELS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePanelId(p.id)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    p.id === activePanelId
                      ? 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {p.id}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={activePanelId === COMIC_PANELS.length}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold transition-colors"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <article className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-900 shadow-2xl">
            {/* Header banner */}
            <div className="bg-amber-400 text-slate-950 p-4 flex items-center justify-between font-mono font-bold">
              <span className="text-sm tracking-wider uppercase">VIÑETA #{activePanel.id} DE {COMIC_PANELS.length}</span>
              {activePanel.soundEffect && (
                <span className="bg-red-600 text-white px-3 py-1 rounded text-xs italic font-black shadow transform -rotate-1">
                  {activePanel.soundEffect}
                </span>
              )}
            </div>

            {/* Main comic art */}
            <div className="relative aspect-video max-h-[500px] w-full bg-slate-950">
              <img 
                src={activePanel.image} 
                alt={activePanel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white">
                <p className="text-sm sm:text-base italic leading-relaxed">
                  "{activePanel.narrative}"
                </p>
              </div>
            </div>

            {/* Dialogues and Critical Discussion */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <MessageSquareQuote className="w-5 h-5 text-indigo-500" />
                  Intercambio Verbal en la Reunión de Directorio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activePanel.dialogues.map((dlg, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${dlg.avatarBg}`} />
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{dlg.speaker}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">({dlg.role})</span>
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                        "{dlg.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytical Triad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-700">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 uppercase">
                    <Stethoscope className="w-4 h-4" /> Desafío Clínico
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activePanel.criticalAnalysis.clinicalAspect}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase">
                    <Cpu className="w-4 h-4" /> Desafío de Sistemas
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activePanel.criticalAnalysis.technologicalAspect}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 uppercase">
                    <ShieldAlert className="w-4 h-4" /> Enfoque Metodológico
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activePanel.criticalAnalysis.methodologicalChallenge}
                  </p>
                </div>
              </div>

              {/* Action buttons to trigger questions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Profundizar con la Cátedra:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePanel.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => onAskQuestion(q, 'docente')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {q.length > 40 ? q.slice(0, 40) + '...' : q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Modal image zoom */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700">
            <img 
              src={selectedImage} 
              alt="Viñeta ampliada" 
              className="w-full h-auto object-contain max-h-[85vh] mx-auto"
            />
            <button 
              className="absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-800"
              onClick={() => setSelectedImage(null)}
            >
              Cerrar [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
