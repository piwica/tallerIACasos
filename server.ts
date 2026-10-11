import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const isValidKey = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10;
let aiClient: GoogleGenAI | null = null;
if (isValidKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client with key:', err);
  }
}

// Fallback pedagogical responses generator if API key is not configured or fails
function getCuratedPedagogicalAnswer(question: string, persona: string): string {
  const qLower = question.toLowerCase();

  if (persona === 'benitez') {
    return `Como Jefe de Psiquiatría, te lo digo con total franqueza: nuestra negativa al sistema actual no es capricho corporativo ni resistencia al cambio. Si un médico de guardia de traumatología, un camillero con acceso de lectura o un auditor de facturación pueden leer las anotaciones sobre un intento de suicidio, abusos o conflictos íntimos de un paciente, rompemos el pacto de confianza fundamental. Si nos fuerzan a usar un sistema sin notas confidenciales protegidas por doble factor o regla de necesidad clínica estricta, los psiquiatras y psicólogos escribiremos resúmenes lavados y vacíos en la HCE, y la verdadera evolución clínica quedará en un cuaderno de papel en el bolsillo de la bata. Eso es peor para la seguridad del paciente.`;
  }

  if (persona === 'ignacio') {
    return `Desde Informática en Salud, el error clásico de la gerencia es creer que esto es un problema de 'diseñar botones más bonitos'. Si convocamos a 60 profesionales a una sala a calificar pantallas ('pruebas de usabilidad estándar con cuestionario SUS'), podemos obtener un puntaje aceptable de navegabilidad, pero habremos ignorado tres fallas críticas: 
1. La arquitectura de permisos (el software solo maneja RBAC genérico sin granularidad por sensibilidad de episodio ni modelo Break-the-Glass).
2. La carga cognitiva en agudos (el módulo de indicación y administración de psicofármacos exige 7 clics por dosis de rescate).
3. La pérdida del contacto visual en consulta por campos estructurados obligatorios.
Mi recomendación para el protocolo es una evaluación mixta en dos fases: primero una auditoría arquitectónica de seguridad y flujos en hábitat real, y recién después pruebas de usabilidad contextualizadas.`;
  }

  if (persona === 'director') {
    return `Desde la Dirección General nuestro mandato es claro: San Joaquín no puede tener islas analógicas en 2027. La acreditación de calidad institucional y los convenios con prepagas exigen interoperabilidad total y firma digital. Tenemos el presupuesto asignado para la evaluación. Ahora bien, entiendo el punto de Benítez y de Ignacio: si el proveedor nos promete flexibilidad, el protocolo de Ignacio tiene que darnos evidencia irrefutable antes de firmar la adenda contractual. Si el software del proveedor requiere una reingeniería de base de datos que tardará tres años, tenemos que saberlo ya para decidir si exigimos ese desarrollo o buscamos un módulo especializado en salud mental.`;
  }

  if (persona === 'enfermeria') {
    return `En la sala de agudos de la noche, las cosas no esperan. Cuando un paciente entra en excitación psicomotriz, no podemos esperar 40 segundos a que cargue la interfaz para registrar un haloperidol de rescate. Necesitamos un circuito de indicación verbal y convalidación posterior, con alertas claras pero sin fatiga de alarmas. Además, las notas de enfermería en salud mental describen conductas muy sensibles que tampoco deben quedar expuestas al personal ajeno al piso.`;
  }

  // Default: Docente Titular de la Maestría
  if (qLower.includes('sus') || qLower.includes('metodolog') || qLower.includes('evalua') || qLower.includes('protocolo')) {
    return `**Análisis del Docente de Metodología de la Maestría:**
Para este caso, una evaluación de usabilidad tradicional (ej. SUS o NASA-TLX en laboratorio simulado) es una trampa metodológica si se aplica de forma aislada.

1. **Validez ecológica comprometida:** Evaluar a 60 profesionales en tareas aisladas de laboratorio no reproduce la presión del consultorio ni la contingencia de agudos.
2. **Confusión entre Interfaz y Arquitectura:** La escala SUS mide la percepción de usabilidad del software (efectividad, eficiencia, satisfacción según ISO 9241-11), pero no evalúa la gobernanza de datos, la latencia de decisiones clínicas críticas ni la robustez del modelo de control de acceso (RBAC vs ABAC).
3. **Triangulación metodológica obligatoria:** Un protocolo riguroso debe combinar:
   - **Fase Formativa Cualitativa:** Observación no intrusiva de flujos de trabajo (*shadowing*) y protocolos de pensamiento en voz alta (*Think-Aloud*) durante episodios simulados de crisis y consulta ambulatoria.
   - **Evaluación Heurística Especializada:** Heurísticas de Nielsen adaptadas a registros clínicos (Zhang et al., TURF framework).
   - **Auditoría de Requisitos No Funcionales (NFR):** Evaluación de la arquitectura de seguridad (privacidad diferencial, auditoría forense de accesos 'Break-the-Glass', y compatibilidad legal con Ley de Salud Mental y Protección de Datos Personales).
   - **Matriz de Criterios Go / No-Go:** Exigibles al proveedor antes de autorizar la implementación.`;
  }

  if (qLower.includes('privacidad') || qLower.includes('confidencial') || qLower.includes('seguridad') || qLower.includes('rbac') || qLower.includes('abac')) {
    return `**Análisis de Seguridad y Ética en Informática en Salud:**
El conflicto planteado por el Dr. Benítez es un clásico en la literatura de HCE en psiquiatría (ver normativas como 42 CFR Part 2 en EE.UU. o normativas de historias clínicas de Salud Mental en Iberoamérica):

1. **El peligro del 'Cuaderno Paralelo' (*shadow charts*):** Cuando el sistema informático no ofrece garantías de confidencialidad segmentada, los clínicos desarrollan 'workarounds' (mecanismos de desvío): omiten diagnósticos estigmatizantes o guardan notas privadas en papel. Esto destruye la continuidad del cuidado y genera riesgos médico-legales.
2. **Limitaciones del RBAC genérico:** El control de acceso basado en roles simples ('Médico', 'Enfermero', 'Administrativo') no distingue el contexto clínico ni la relación terapéutica con el paciente.
3. **Solución informática recomendada:**
   - **ABAC (Attribute-Based Access Control):** Acceso condicionado a si el profesional tiene un episodio activo asignado con el paciente.
   - **Categorización de Notas Sensibles (*Break-the-Glass*):** Las notas de psicoterapia o salud mental permanecen selladas; si un médico de urgencias requiere verlas por riesgo vital, puede 'romper el vidrio' pero el sistema dispara una auditoría inmediata y notificación obligatoria.`;
  }

  return `**Perspectiva del Docente de Maestría en Informática en Salud:**
El caso de Sanatorio San Joaquín expone la frontera donde chocan la gestión sanitaria, la arquitectura de sistemas y la bioética médica. 

Para formular un protocolo de evaluación robusto, el equipo de Ignacio no debe limitarse a la solicitud del proveedor ("evaluar pantallas"). Deben definir:
1. **La Pregunta de Investigación / Evaluación:** ¿En qué medida la plataforma actual soporta los flujos de alta criticidad y garantiza la confidencialidad diferencial sin inducir omisión de datos clínicos?
2. **Dimensiones de Evaluación:** Usabilidad (eficiencia/errores), Seguridad Arquitectónica (ABAC/auditoría), Carga Cognitiva y Aceptación Tecnológica (modelo TAM/UTAUT).
3. **Población y Muestreo:** No es necesario que los 60 profesionales hagan las mismas tareas; se requiere una muestra representativa estratificada por roles (médicos de agudos, ambulatorios, psicólogos, enfermeros y trabajo social).`;
}

// API endpoint for questions
app.post('/api/ask', async (req: Request, res: Response): Promise<void> => {
  const { question, persona = 'docente', conversationHistory = [] } = req.body;

  if (!question || typeof question !== 'string') {
    res.status(400).json({ error: 'La pregunta es requerida.' });
    return;
  }

  const personaInstruction = {
    docente: `Actúas como el Docente Titular de la Cátedra de Metodología de la Investigación y Evaluación de Sistemas de Información en Salud de la Maestría en Informática en Salud.
Tu perfil: Eres un académico y consultor senior, pedagógico, socrático, riguroso y reflexivo. Estimulas el pensamiento crítico de los maestrandos sobre el caso del Sanatorio San Joaquín.
Mencionas marcos teóricos y metodológicos (triangulación metodológica, evaluación formativa vs sumativa, ISO 9241-11, TURF de Zhang, Think-Aloud, NASA-TLX, SUS, TAM/UTAUT, RBAC vs ABAC, mecanismo Break-the-Glass, workarounds/shadow charts, ética y confidencialidad en psiquiatría).
Responde en español con formato Markdown claro y profesional, destacando puntos clave y planteando preguntas que hagan pensar al estudiante.`,
    benitez: `Actúas como el Dr. Benítez, Jefe del Servicio de Psiquiatría del Sanatorio San Joaquín.
Tu perfil: Médico psiquiatra con décadas de experiencia clínica y forense. Eres firme, empático con tus pacientes y celoso custodio del secreto profesional y la confidencialidad médica.
Te preocupa la estigmatización del paciente de salud mental, las notas con relatos de traumas, abuso sexual o ideación suicida que quedarían expuestas a administrativos o médicos de otras áreas. Explicas el riesgo del 'cuaderno paralelo' si el sistema no protege la información.`,
    ignacio: `Actúas como Ignacio, Jefe de Informática Médica / Sistemas del Sanatorio San Joaquín.
Tu perfil: Informático en salud que logró informatizar con éxito el sanatorio durante 6 años (camas, facturación, turnos). Conoces a fondo las limitaciones técnicas del software del proveedor: permisos genéricos por rol (RBAC rígido), falta de notas confidenciales, interfaces con desplegables que quitan contacto visual con el paciente. Buscas diseñar un protocolo metodológico irreprochable para no comprar gato por liebre.`,
    director: `Actúas como el Director General del Sanatorio San Joaquín.
Tu perfil: Administrador y ejecutivo sanitario enfocado en el Plan Estratégico 2027, la acreditación de calidad institucional, el presupuesto asignado y la interoperabilidad global. Quieres resultados medibles y un protocolo con bordes claros que permita exigirle al proveedor o tomar decisiones contractuales.`,
    enfermeria: `Actúas como la Lic. Mariana Gómez, Supervisora de Enfermería del turno noche en la sala de agudos de Psiquiatría del Sanatorio San Joaquín.
Tu perfil: Profesional de enfermería con contacto directo en situaciones críticas (agitación psicomotriz, contención verbal/farmacológica, administración rápida de psicofármacos). Sufres la rigidez de los sistemas que te obligan a estar frente a la pantalla en vez de cuidar al paciente.`,
  }[persona as 'docente' | 'benitez' | 'ignacio' | 'director' | 'enfermeria'] || 'docente';

  const systemPrompt = `${personaInstruction}

Contexto del Caso "Sanatorio San Joaquín":
- Reunión anual de planificación estratégica en el quinto piso (mesa de lapacho, mediodía caluroso).
- Meta del Director General para 2027: 100% digitalización de la HCE sin excepciones.
- Psiquiatría opera en papel con carpetas bajo doble llave en archivo metálico.
- Dr. Benítez advierte que en la HCE estándar cualquiera entra con un clic a notas sensibles (ideación suicida, conflictos íntimos), lo que provocará omisión de datos o cuadernos paralelos fuera del sistema.
- Ignacio advierte sobre la pérdida de contacto visual en crisis, permisos genéricos y rigidez en psicofármacos.
- El proveedor ofrece "adaptar el software" a partir de un estudio de usabilidad con 60 profesionales.
- Ignacio se debate metodológicamente: ¿Qué vamos a estar midiendo realmente? ¿Usabilidad de clics o arquitectura de privacidad y flujos críticos? ¿Cuál es el alcance real para 2027? ¿Qué preguntas metodológicas debe responder el protocolo?`;

  if (aiClient) {
    try {
      const messagesFormatted = [
        ...conversationHistory.slice(-4).map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Estudiante' : 'Respuesta'}: ${m.content}`),
        `Estudiante: ${question}`
      ].join('\n\n');

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timed out')), 8000)
      );

      const generatePromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemPrompt}\n\nHistorial de interacción y consulta del estudiante:\n${messagesFormatted}\n\nResponde como ${persona.toUpperCase()} de manera exhaustiva, profunda y didáctica:`,
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text) {
        res.json({ answer: response.text, persona });
        return;
      }
    } catch (err: unknown) {
      console.warn('Gemini API call or timeout, using high-quality curated pedagogical fallback:', err);
    }
  }

  // Fallback curated answer
  const fallback = getCuratedPedagogicalAnswer(question, persona);
  res.json({ answer: fallback, persona, isFallback: true });
});

// Setup Vite in dev, or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
