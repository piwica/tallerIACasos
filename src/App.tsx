import React, { useState } from 'react';
import { ComicViewer } from './components/ComicViewer';
import { InquirySystem } from './components/InquirySystem';
import { ProtocolBuilder } from './components/ProtocolBuilder';
import { MethodologyMatrix } from './components/MethodologyMatrix';
import { 
  BookOpen, 
  MessageSquare, 
  Edit3, 
  Layers, 
  GraduationCap, 
  Building2, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'comic' | 'inquiry' | 'builder' | 'matrix'>('comic');
  const [inquiryInitialQuestion, setInquiryInitialQuestion] = useState<string>('');
  const [inquiryInitialPersona, setInquiryInitialPersona] = useState<string>('docente');

  const handleAskQuestionFromOutside = (question: string, persona: string = 'docente') => {
    setInquiryInitialQuestion(question);
    setInquiryInitialPersona(persona);
    setActiveTab('inquiry');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Top Academic Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* University & Case Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-lg shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    Maestría en Informática en Salud
                  </span>
                  <span className="hidden sm:inline-block text-[10px] text-slate-400">
                    • Cátedra de Metodología de la Investigación
                  </span>
                </div>
                <h1 className="text-sm sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                  Caso Sanatorio San Joaquín: <span className="font-normal text-slate-300 hidden md:inline">Evaluación HCE en Salud Mental</span>
                </h1>
              </div>
            </div>

            {/* Quick Action Info */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Horizonte 2027 • 60 Profesionales • Dilema Doble Llave</span>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 sm:pb-3 scrollbar-none border-t border-slate-800/60 pt-2">
            <button
              onClick={() => setActiveTab('comic')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'comic'
                  ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              1. Cómic del Caso (6 Viñetas)
            </button>

            <button
              onClick={() => setActiveTab('inquiry')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'inquiry'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              2. Ateneo de Preguntas (Tutor & Personajes)
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'builder'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              3. Taller: Libreta de Ignacio (Diseñar Protocolo)
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              4. Marco Metodológico & Glosario
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'comic' && (
          <ComicViewer onAskQuestion={handleAskQuestionFromOutside} />
        )}

        {activeTab === 'inquiry' && (
          <InquirySystem 
            initialQuestion={inquiryInitialQuestion}
            initialPersona={inquiryInitialPersona}
          />
        )}

        {activeTab === 'builder' && (
          <ProtocolBuilder />
        )}

        {activeTab === 'matrix' && (
          <MethodologyMatrix onAskQuestion={handleAskQuestionFromOutside} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span>Recurso Pedagógico para la Maestría en Informática en Salud • Evaluación y Metodología de Protocolos</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="italic">Caso: "El aire en la sala de directorio del quinto piso" (Sanatorio San Joaquín)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
