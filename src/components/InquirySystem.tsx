import React, { useState } from 'react';
import { CHARACTERS, CharacterProfile } from '../data/caseData';
import { 
  Send, 
  Sparkles, 
  Bot, 
  HelpCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  BookMarked,
  Layers,
  Shield,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

interface InquiryMessage {
  id: string;
  sender: 'user' | 'assistant';
  persona: string;
  personaName: string;
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

interface InquirySystemProps {
  initialQuestion?: string;
  initialPersona?: string;
}

export const InquirySystem: React.FC<InquirySystemProps> = ({ 
  initialQuestion = '', 
  initialPersona = 'docente' 
}) => {
  const [selectedPersona, setSelectedPersona] = useState<string>(initialPersona);
  const [inputQuestion, setInputQuestion] = useState<string>(initialQuestion);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<InquiryMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      persona: 'docente',
      personaName: 'Profesor Titular de Metodología',
      text: `**¡Bienvenidos al Ateneo Metodológico del Sanatorio San Joaquín!**\n\nComo docentes de la Maestría en Informática en Salud, creamos este espacio para que puedan interrogar todos los ángulos del caso antes de redactar el protocolo de evaluación que definirá la suerte de la HCE en Psiquiatría.\n\nPueden hacer preguntas libres sobre:\n1. **Diseño del protocolo de evaluación**: ¿Por qué un test de usabilidad (SUS) con 60 personas es insuficiente si no evalúa la arquitectura de datos?\n2. **Confidencialidad diferencial**: ¿Cómo resolver el dilema de la 'doble llave' con modelos ABAC y 'Break-the-Glass'?\n3. **Factores humanos**: ¿Cómo medir la pérdida de contacto visual en entrevistas de crisis y el riesgo de 'cuadernos paralelos'?\n\nTambién pueden interrogar directamente a **Ignacio**, al **Dr. Benítez**, al **Director General** o a la **Supervisora de Enfermería** cambiando el interlocutor arriba. ¡Los escucho!`,
      timestamp: 'Inicio de Clase',
    }
  ]);

  const activePersonaObj = CHARACTERS.find(c => c.id === selectedPersona) || CHARACTERS[0];

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsgId = 'u-' + Date.now();
    const newUserMsg: InquiryMessage = {
      id: userMsgId,
      sender: 'user',
      persona: 'user',
      personaName: 'Estudiante de Maestría',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          persona: selectedPersona,
          conversationHistory: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con la cátedra.');
      }

      const data = await res.json();
      const assistantMsg: InquiryMessage = {
        id: 'a-' + Date.now(),
        sender: 'assistant',
        persona: selectedPersona,
        personaName: activePersonaObj.name,
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: InquiryMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        persona: selectedPersona,
        personaName: activePersonaObj.name,
        text: `Hubo una dificultad en la conexión, pero analicemos el problema metodológico clave: En salud mental, cualquier evaluación que mida únicamente la usabilidad de interfaz (SUS) comete un error de constructo si ignora la arquitectura de confidencialidad y la latencia en situaciones de crisis.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Curated master questions for students to click
  const categoryQuestions = [
    {
      category: "Metodología de Evaluación",
      icon: Layers,
      items: [
        "¿Por qué un cuestionario SUS (System Usability Scale) con 60 personas es insuficiente para decidir esta implementación?",
        "¿Qué combinación de métodos mixtos (cuantitativos y cualitativos) debería proponer Ignacio en su libreta?",
        "¿Cómo se formula una pregunta de investigación con formato PICO para este protocolo institucional?"
      ]
    },
    {
      category: "Confidencialidad & Doble Llave",
      icon: Shield,
      items: [
        "¿Cómo se resuelve técnicamente el dilema de la 'doble llave' sin aislar a psiquiatría del resto del sanatorio?",
        "¿Qué diferencias operativas existen entre el modelo RBAC y el modelo ABAC con 'Break-the-Glass'?",
        "¿Qué consecuencias legales y éticas tiene la aparición de 'cuadernos paralelos' si los médicos omiten datos?"
      ]
    },
    {
      category: "Clínica & Factores Humanos",
      icon: AlertTriangle,
      items: [
        "¿Por qué los campos estructurados obligatorios aumentan el riesgo de agresión en pacientes en crisis?",
        "¿Cómo medir la carga cognitiva (NASA-TLX) en la prescripción de psicofármacos bajo urgencia?",
        "¿Qué metodología permite observar el 'work-as-done' real en lugar de lo que el proveedor asume?"
      ]
    },
    {
      category: "Gobernanza & Meta 2027",
      icon: Lightbulb,
      items: [
        "¿Qué criterios de aceptación 'Go / No-Go' debe fijar Ignacio antes de autorizar el despliegue?",
        "¿Cómo negociar con un proveedor comercial que intenta reducir el problema a ajustes de pantalla?",
        "Si la meta es 2027, ¿cuáles son los hitos cronológicos indispensables del protocolo?"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Interlocutor / Character Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-500" />
              Seleccioná a quién querés interrogar en este Ateneo:
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cada personaje responderá desde su rol y perspectiva clínica, técnica o metodológica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CHARACTERS.map((char) => {
            const isSelected = selectedPersona === char.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedPersona(char.id)}
                className={`flex flex-col items-start p-3.5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 w-full mb-1.5">
                  <span className="text-2xl">{char.avatar}</span>
                  <span className={`text-xs font-black truncate ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                    {char.name}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                  {char.title}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic line-clamp-2">
                  "{char.quote}"
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dialogue & Q&A Stream */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col min-h-[500px]">
        {/* Stream Header */}
        <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{activePersonaObj.avatar}</span>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {activePersonaObj.name}
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {activePersonaObj.department}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Postura: {activePersonaObj.stance}
              </div>
            </div>
          </div>
          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800"
            title="Reiniciar diálogo"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Limpiar
          </button>
        </div>

        {/* Message Thread */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6 max-h-[600px] bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                    {CHARACTERS.find(c => c.id === msg.persona)?.avatar || '👨‍🏫'}
                  </div>
                )}
                
                <div className={`max-w-2xl rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 ${
                  isUser 
                    ? 'bg-indigo-600 text-white rounded-br-xs' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                }`}>
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-black/10 dark:border-white/10">
                    <span className="font-bold">{msg.personaName}</span>
                    <span className="opacity-70 text-[11px]">{msg.timestamp}</span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line prose dark:prose-invert max-w-none">
                    {msg.text}
                  </div>

                  {!isUser && (
                    <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] text-slate-400">
                        {msg.isFallback ? 'Respuesta del banco docente de la Cátedra' : 'Generado con tutoría de Cátedra'}
                      </span>
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === msg.id ? 'Copiado' : 'Copiar nota'}
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    TÚ
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-500 text-xs italic p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-fit animate-pulse">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
              {activePersonaObj.name} está fundamentando su respuesta clínica y metodológica...
            </div>
          )}
        </div>

        {/* Question Input Box */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 relative">
              <textarea
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={`Formulá tu pregunta para ${activePersonaObj.name} sobre el caso o protocolo... (Presioná Enter)`}
                rows={2}
                className="w-full resize-none rounded-xl p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" /> Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Curated Socratic Questions Bank by Core Axes */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-indigo-500" />
              Banco de Preguntas Clave para el Debate Metodológico
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hacé clic en cualquiera de estas preguntas formuladas por maestrandos para enviarla directamente al interlocutor seleccionado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryQuestions.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <Icon className="w-4 h-4" />
                  {cat.category}
                </div>
                <div className="space-y-2">
                  {cat.items.map((q, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSend(q)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/60 dark:hover:bg-indigo-950/50 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-medium leading-relaxed hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-start gap-2 group"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
