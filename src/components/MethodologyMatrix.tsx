import React, { useState } from 'react';
import { METHODOLOGICAL_PILLARS, MethodologicalPillar } from '../data/caseData';
import { 
  ShieldAlert, 
  Layout, 
  Users, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface MethodologyMatrixProps {
  onAskQuestion: (question: string, persona: string) => void;
}

export const MethodologyMatrix: React.FC<MethodologyMatrixProps> = ({ onAskQuestion }) => {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return Layout;
      case 'ShieldAlert': return ShieldAlert;
      case 'Users': return Users;
      default: return FileCheck;
    }
  };

  const active = METHODOLOGICAL_PILLARS[selectedPillar];
  const ActiveIcon = getIcon(active.icon);

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
          Marco Teórico & Metodológico de Cátedra
        </span>
        <h2 className="text-2xl sm:text-3xl font-black">
          Los 4 Pilares del Protocolo de Evaluación en Salud Mental
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          En Informática en Salud, un error habitual es reducir una evaluación tecnológica a una simple encuesta de satisfacción de pantallas. 
          Este marco desglosa las cuatro dimensiones estructurales que Ignacio debe presentar al Directorio del Sanatorio San Joaquín.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {METHODOLOGICAL_PILLARS.map((pillar, idx) => {
          const Icon = getIcon(pillar.icon);
          const isSelected = selectedPillar === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedPillar(idx)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-lg ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className={`p-2.5 rounded-xl w-fit ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {pillar.category}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {pillar.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pillar Detail Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                {active.category}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {active.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => onAskQuestion(`¿Cómo podemos profundizar metodológicamente en el pilar de ${active.title}?`, 'docente')}
            className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4" /> Consultar a la Cátedra
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {active.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pitfalls */}
          <div className="bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl p-5 border border-rose-200 dark:border-rose-900/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Trampas y Errores Habituales (Lo que el proveedor suele omitir)
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {active.pitfalls.map((pitfall, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Buenas Prácticas Metodológicas (Lo que Ignacio debe exigir)
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {active.recommendations.map((rec, rIdx) => (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Conceptual Glossary for Master's Students */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          Glosario Esencial de Cátedra para este Caso
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">ABAC vs RBAC</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              RBAC autoriza según rol genérico ('Médico'). ABAC autoriza según atributos dinámicos (relación asistencial activa, ubicación física, consentimiento del paciente).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">Break-the-Glass (Romper el Cristal)</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Mecanismo que permite a un profesional acceder a datos confidenciales en emergencias extremas, disparando auditoría inmediata obligatoria y aviso al jefe de servicio.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">Shadow Charts (Cuadernos Paralelos)</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Mecanismo de desvío (workaround) donde los profesionales registran información médica en soportes no oficiales para resguardar la intimidad ante sistemas desconfiables.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">TURF Framework (Zhang et al.)</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Marco de usabilidad clínica que desglosa: Task (Tarea), User (Usuario), Representation (Representación visual) y Function (Función del sistema).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">Protocolo Think-Aloud</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Método de evaluación donde el profesional verbaliza en tiempo real sus pensamientos y frustraciones cognitivas mientras interactúa con la interfaz.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <strong className="text-slate-900 dark:text-white block font-bold">Criterio Go / No-Go</strong>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Umbrales técnicos no negociables que condicionan legal y contractualmente la continuidad del proyecto antes del despliegue masivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
