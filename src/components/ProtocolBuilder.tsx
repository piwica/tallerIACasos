import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Layers, 
  ShieldCheck, 
  Users, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface ProtocolState {
  researchQuestion: string;
  studyDesign: 'mixto' | 'cuanti' | 'cuali';
  dimensions: string[];
  methods: string[];
  sampleDistribution: {
    psychiatrists: number;
    nurses: number;
    psychologists: number;
    socialWorkers: number;
    administrative: number;
  };
  goNoGoCriteria: string;
}

export const ProtocolBuilder: React.FC = () => {
  const [protocol, setProtocol] = useState<ProtocolState>({
    researchQuestion: "¿En qué medida la plataforma HCE actual cumple con los requisitos de usabilidad clínica, reduce la carga cognitiva en crisis y garantiza la confidencialidad diferencial en el Servicio de Psiquiatría?",
    studyDesign: 'mixto',
    dimensions: ['usabilidad', 'privacidad', 'cognitiva', 'flujos'],
    methods: ['think_aloud', 'sus', 'nasa_tlx', 'abac_audit', 'shadowing'],
    sampleDistribution: {
      psychiatrists: 15,
      nurses: 20,
      psychologists: 12,
      socialWorkers: 5,
      administrative: 8,
    },
    goNoGoCriteria: "1. Cero violaciones de confidencialidad en pruebas de penetración y auditoría de permisos.\n2. SUS mínimo de 72/100 en tareas de prescripción.\n3. Tiempo de indicación de medicación de rescate menor a 40 segundos sin pérdida de contacto visual.",
  });

  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);

  const totalSample = 
    protocol.sampleDistribution.psychiatrists + 
    protocol.sampleDistribution.nurses + 
    protocol.sampleDistribution.psychologists + 
    protocol.sampleDistribution.socialWorkers + 
    protocol.sampleDistribution.administrative;

  const toggleDimension = (dim: string) => {
    setProtocol(prev => ({
      ...prev,
      dimensions: prev.dimensions.includes(dim)
        ? prev.dimensions.filter(d => d !== dim)
        : [...prev.dimensions, dim]
    }));
  };

  const toggleMethod = (met: string) => {
    setProtocol(prev => ({
      ...prev,
      methods: prev.methods.includes(met)
        ? prev.methods.filter(m => m !== met)
        : [...prev.methods, met]
    }));
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setEvaluationFeedback(null);

    // Calculate score based on academic rubric
    let currentScore = 60;
    if (protocol.studyDesign === 'mixto') currentScore += 10;
    if (protocol.dimensions.includes('privacidad')) currentScore += 10;
    if (protocol.dimensions.includes('cognitiva')) currentScore += 5;
    if (protocol.methods.includes('think_aloud')) currentScore += 5;
    if (protocol.methods.includes('abac_audit')) currentScore += 5;
    if (totalSample === 60) currentScore += 5;

    try {
      const prompt = `Actúa como el Profesor Titular de la Maestría en Informática en Salud, experto en evaluación de tecnologías y protocolos de investigación.
Evalúa la siguiente propuesta de protocolo de investigación diseñada por un estudiante para resolver el caso de Ignacio en el Sanatorio San Joaquín:

1. Pregunta de Investigación: ${protocol.researchQuestion}
2. Diseño Metodológico: ${protocol.studyDesign.toUpperCase()} (Muestra de 60 profesionales: ${protocol.sampleDistribution.psychiatrists} psiquiatras, ${protocol.sampleDistribution.nurses} enfermeros, ${protocol.sampleDistribution.psychologists} psicólogos, ${protocol.sampleDistribution.socialWorkers} trabajadores sociales, ${protocol.sampleDistribution.administrative} administrativos)
3. Dimensiones Seleccionadas: ${protocol.dimensions.join(', ')}
4. Instrumentos y Métodos: ${protocol.methods.join(', ')}
5. Criterios Go/No-Go propuestos para el Directorio y Proveedor: ${protocol.goNoGoCriteria}

Proporciona una devolución académica estructurada con:
- Calificación cualitativa (Fortalezas metodológicas).
- Puntos ciegos o advertencias críticas (Riesgos frente al Directorio o el Proveedor).
- Recomendación final para la reunión ejecutiva de Ignacio.`;

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt, persona: 'docente' }),
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluationFeedback(data.answer);
        setScore(Math.min(currentScore, 98));
      } else {
        throw new Error();
      }
    } catch {
      setScore(currentScore);
      setEvaluationFeedback(`**Dictamen del Comité Docente:**\n\n- **Puntaje Global:** ${currentScore}/100.\n- **Fortalezas:** Excelente decisión de emplear un diseño de métodos mixtos. La inclusión explícita de la dimensión de seguridad/privacidad y la auditoría ABAC desarma la trampa del proveedor de medir solo 'usabilidad cosmética'.\n- **Recomendación para Ignacio:** Acompañar los criterios Go/No-Go con una fecha de corte no prorrogable (marzo 2026) para que el Sanatorio tenga tiempo de buscar un software alternativo si el proveedor no supera la prueba.`);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              Taller de Simulación Metodológica
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Completá la Libreta de Ignacio: Tu Propuesta de Protocolo
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              La sala de directorio está en silencio esperando tu propuesta. Definí la pregunta de investigación, 
              las dimensiones, los métodos de recolección y la estratificación de los 60 profesionales. 
              Al finalizar, el Docente evaluará tu protocolo con una rúbrica de posgrado.
            </p>
          </div>
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="self-start md:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            {isEvaluating ? 'Evaluando Protocolo...' : 'Someter a Evaluación Docente'}
          </button>
        </div>
      </div>

      {/* Form Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Research Question and Design */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Research Question */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                1. Pregunta Central de Investigación / Evaluación (Formato FINER/PICO)
              </label>
              <span className="text-xs text-slate-400">Variable rectora</span>
            </div>
            <textarea
              value={protocol.researchQuestion}
              onChange={(e) => setProtocol({ ...protocol, researchQuestion: e.target.value })}
              rows={3}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Consejo del profesor: Asegurate de no limitar la pregunta a "¿es fácil de usar?", sino a "¿soporta la confidencialidad diferencial y los flujos críticos sin inducir cuadernos paralelos?".
            </p>
          </div>

          {/* Section 2: Dimensions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <label className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              2. Dimensiones del Objeto de Estudio a Evaluar
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'usabilidad', label: 'Usabilidad de Interfaz (ISO 9241-11)', desc: 'Efectividad, eficiencia y satisfacción percibida' },
                { id: 'privacidad', label: 'Arquitectura de Privacidad & ABAC', desc: 'Control de acceso granular y confidencialidad diferencial' },
                { id: 'cognitiva', label: 'Carga Cognitiva en Crisis (NASA-TLX)', desc: 'Esfuerzo mental y pérdida de contacto visual' },
                { id: 'flujos', label: 'Flujos de Trabajo & Shadow Charts', desc: 'Identificación de desvíos y cuadernos paralelos' },
              ].map((dim) => {
                const active = protocol.dimensions.includes(dim.id);
                return (
                  <button
                    key={dim.id}
                    onClick={() => toggleDimension(dim.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{dim.label}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <span className="text-[11px] opacity-80">{dim.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Methods and Tools */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <label className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              3. Instrumentos Metodológicos de Recolección (Triangulación)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'think_aloud', label: 'Protocolo Think-Aloud', badge: 'Cualitativo' },
                { id: 'sus', label: 'System Usability Scale (SUS)', badge: 'Cuantitativo' },
                { id: 'nasa_tlx', label: 'NASA Task Load Index (NASA-TLX)', badge: 'Ergonomía' },
                { id: 'abac_audit', label: 'Auditoría Forense de Permisos ABAC', badge: 'Seguridad' },
                { id: 'shadowing', label: 'Observación no intrusiva (Shadowing)', badge: 'Etnográfico' },
                { id: 'delphi', label: 'Panel de Consenso Delphi con Jefes', badge: 'Gobernanza' },
              ].map((met) => {
                const active = protocol.methods.includes(met.id);
                return (
                  <button
                    key={met.id}
                    onClick={() => toggleMethod(met.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      active
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-950 dark:text-white'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-semibold">{met.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">
                      {met.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Sample Stratification & Go/No-Go Criteria */}
        <div className="space-y-6">
          {/* Section 4: Sample Stratification (60 users) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                4. Estratificación de la Muestra (Total: {totalSample}/60)
              </label>
              <span className={`text-xs font-bold ${totalSample === 60 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {totalSample === 60 ? 'Meta 60 alcanzada' : `Faltan ${60 - totalSample}`}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { key: 'psychiatrists', label: 'Médicos Psiquiatras (Agudos y Consultorio)' },
                { key: 'nurses', label: 'Enfermería (Turnos mañana, tarde y noche)' },
                { key: 'psychologists', label: 'Psicólogos Clínicos / Psicoterapeutas' },
                { key: 'socialWorkers', label: 'Trabajadores Sociales del Servicio' },
                { key: 'administrative', label: 'Personal Administrativo y Facturación' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-2">
                  <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={protocol.sampleDistribution[item.key as keyof typeof protocol.sampleDistribution]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setProtocol({
                        ...protocol,
                        sampleDistribution: {
                          ...protocol.sampleDistribution,
                          [item.key]: val,
                        }
                      });
                    }}
                    className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-center font-bold bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Go / No-Go Decision Criteria */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <label className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              5. Criterios de Aceptación Go / No-Go (Para Directorio)
            </label>
            <textarea
              value={protocol.goNoGoCriteria}
              onChange={(e) => setProtocol({ ...protocol, goNoGoCriteria: e.target.value })}
              rows={4}
              className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Condiciones no negociables que Ignacio exigirá al proveedor antes de dar luz verde a la compra o implementación en 2027.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Evaluation Feedback Display */}
      {evaluationFeedback && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-indigo-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Dictamen de la Cátedra de Metodología de la Investigación
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluación sobre la propuesta para el Sanatorio San Joaquín
                </span>
              </div>
            </div>
            {score !== null && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Calificación del Protocolo:</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{score}/100</span>
              </div>
            )}
          </div>

          <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line prose dark:prose-invert max-w-none">
            {evaluationFeedback}
          </div>
        </div>
      )}
    </div>
  );
};
