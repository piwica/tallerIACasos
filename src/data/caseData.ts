export interface ComicPanel {
  id: number;
  title: string;
  tagline: string;
  narrative: string;
  image: string;
  soundEffect?: string;
  dialogues: {
    speaker: string;
    role: string;
    text: string;
    avatarBg: string;
    type: 'speech' | 'thought' | 'shout';
  }[];
  criticalAnalysis: {
    clinicalAspect: string;
    technologicalAspect: string;
    methodologicalChallenge: string;
  };
  professorPrompt: string;
  suggestedQuestions: string[];
}

export const COMIC_PANELS: ComicPanel[] = [
  {
    id: 1,
    title: "Viñeta 1: La Sala de Directorio del Quinto Piso",
    tagline: "El mandato 2027: Digitalización al 100% sin excepciones",
    narrative: "El aire en la sala de directorio del quinto piso estaba pesado por el calor del mediodía y el vapor acumulado de varias tazas de café sobre la mesa de lapacho. Era la reunión anual de planificación estratégica del Sanatorio San Joaquín.",
    image: "/src/assets/images/comic_panel_1_directorio_1791740873813.jpg",
    soundEffect: "TAP-TAP! (Golpecitos en la mesa)",
    dialogues: [
      {
        speaker: "Director General",
        role: "Máxima Autoridad Ejecutiva",
        text: "Como objetivo prioritario para el plan estratégico 2027, tenemos que lograr la digitalización completa del cien por ciento de la historia clínica en toda la institución, sin excepciones. Psiquiatría es el único bastión que nos queda operando en papel.",
        avatarBg: "bg-amber-600",
        type: "speech",
      },
      {
        speaker: "Director General",
        role: "Máxima Autoridad Ejecutiva",
        text: "Ignacio, el presupuesto está asignado. Tu objetivo clave es diseñar la evaluación de usabilidad para decidir qué se implementará.",
        avatarBg: "bg-amber-600",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "Presión institucional de estandarización sobre un servicio con dinámicas diagnósticas y terapéuticas cualitativamente distintas.",
      technologicalAspect: "Visión gerencial que asume la HCE como un software uniforme y monolítico desplegable idénticamente en cualquier especialidad.",
      methodologicalChallenge: "¿Cómo evitar que el mandato de 'plazo 2027' condicione el rigor de la evaluación de impacto y seguridad del paciente?",
    },
    professorPrompt: "¿Observaron la frase del Director: 'diseñar esta evaluación para decidir qué se va a implementar'? Como informáticos en salud, ¿una evaluación de usabilidad es suficiente para validar la adopción clínica institucional?",
    suggestedQuestions: [
      "¿Cuáles son los riesgos de fijar metas de digitalización al 100% basadas en plazos administrativos y no en madurez clínica?",
      "¿Cómo debería un informático en salud equilibrar la presión del Directorio con las alertas de los jefes de servicio?",
      "¿Qué diferencia existe entre evaluar la 'adopción' y evaluar la 'usabilidad de interfaz'?"
    ]
  },
  {
    id: 2,
    title: "Viñeta 2: Dos Mundos en el Mismo Sanatorio",
    tagline: "El mapa digital en verde vs. los ficheros con llave del pabellón sur",
    narrative: "Ignacio llevaba seis años transformando el sanatorio: Camas en tiempo real, Admisión, Facturación y Turnos brillaban en verde. Pero al cruzar la puerta de madera maciza del ala sur, el sonido era de biblioratos, abrochadoras y ficheros metálicos con llave.",
    image: "/src/assets/images/comic_panel_2_dos_mundos_1791740887905.jpg",
    soundEffect: "CLAC-CLAC! (Cierre de candados metálicos)",
    dialogues: [
      {
        speaker: "Ignacio",
        role: "Jefe de Informática Médica / CIO",
        text: "Logramos que la facturación y camas funcionen como un reloj suizo... pero Psiquiatría no se resiste por atraso tecnológico. Tienen razones de fondo.",
        avatarBg: "bg-blue-600",
        type: "thought",
      },
      {
        speaker: "Narrador Clínico",
        role: "Contexto del Servicio",
        text: "Consultorios externos y sala de agudos: notas interdisciplinarias de psicología, trabajo social y psiquiatría resguardadas en papel con custodia física estricta.",
        avatarBg: "bg-slate-700",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "La custodia física (doble llave) garantiza el secreto médico mediante control de acceso directo y trazabilidad humana tangible.",
      technologicalAspect: "Éxito en sistemas operacionales y de soporte administrativo (ERP/Camas) extrapolado falsamente a sistemas de soporte de decisiones y registros clínicos de alta sensibilidad.",
      methodologicalChallenge: "¿Qué metodologías permiten mapear el flujo de trabajo en papel antes de intentar digitalizarlo (análisis de procesos clínicos BPMN y heurísticas de contexto)?",
    },
    professorPrompt: "Noten la metáfora de la 'puerta de madera maciza': representa una frontera cultural y de seguridad. ¿Por qué la digitalización de procesos administrativos (facturación, camas) suele tener éxito rápido mientras que la clínica de salud mental genera resistencia activa?",
    suggestedQuestions: [
      "¿Cómo influye la naturaleza narrativa y abierta de las notas de salud mental frente a los datos estructurados de facturación?",
      "¿Qué técnicas de recolección de datos cualitativos (ej. shadowing de enfermería y psiquiatría) se requieren para capturar la realidad del pabellón sur?",
      "¿Qué es la 'validez ecológica' en la evaluación de sistemas de salud y por qué el laboratorio no basta?"
    ]
  },
  {
    id: 3,
    title: "Viñeta 3: La Voz de la Clínica: La Doble Llave",
    tagline: "El Dr. Benítez advierte: 'Sin notas confidenciales, nacerán cuadernos paralelos'",
    narrative: "Sentado al otro lado de la mesa de lapacho, el Dr. Benítez se cruzó de brazos. Su tono no era de confrontación política, sino de honda alarma clínica, ética y médico-legal.",
    image: "/src/assets/images/comic_panel_3_benitez_1791740902825.jpg",
    soundEffect: "MURMULLO TENSO... (Silencio en la mesa)",
    dialogues: [
      {
        speaker: "Dr. Benítez",
        role: "Jefe del Servicio de Psiquiatría",
        text: "Psiquiatría no es un consultorio de clínica médica. Nuestra mayor luz de alarma es la confidencialidad. En una HCE estándar, un médico de guardia o un auditor de facturación entra con un clic a relatos de ideaciones suicidas, traumas familiares o consumo.",
        avatarBg: "bg-red-700",
        type: "speech",
      },
      {
        speaker: "Dr. Benítez",
        role: "Jefe del Servicio de Psiquiatría",
        text: "Si el sistema no garantiza 'notas confidenciales de salud mental' segmentadas, los profesionales van a omitir datos clave o llevarán cuadernos paralelos fuera del sistema.",
        avatarBg: "bg-red-700",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "Riesgo de omisión deliberada de información clínica vital para proteger la intimidad del paciente ante la falta de barreras de acceso.",
      technologicalAspect: "Aparición de 'Shadow Systems' (sistemas sombra / cuadernos paralelos en papel), fragmentando la historia clínica y anulando la interoperabilidad.",
      methodologicalChallenge: "¿Cómo diseñar un protocolo que evalúe cuantitativa y cualitativamente la predisposición de los clínicos a utilizar 'workarounds' o registros paralelos?",
    },
    professorPrompt: "El Dr. Benítez anticipa un fenómeno estudiado en sociotécnica hospitalaria: el 'workaround' o derivación por desconfianza en el sistema. Si los médicos no registran por miedo a filtraciones, ¿qué impacto tiene esto sobre la seguridad del paciente?",
    suggestedQuestions: [
      "¿Qué es el fenómeno de los 'cuadernos paralelos' (shadow charts) y cuáles son sus implicancias médico-legales?",
      "¿Cómo se modela en informática médica el control de acceso basado en atributos (ABAC) frente al control basado en roles (RBAC)?",
      "¿Qué protocolos de emergencia tipo 'Break-the-Glass' permiten balancear confidencialidad en psiquiatría y seguridad en guardias?"
    ]
  },
  {
    id: 4,
    title: "Viñeta 4: La Confesión del Informático",
    tagline: "Pérdida del contacto visual, rigidez en psicofármacos y permisos genéricos",
    narrative: "Ignacio asentía. Conocía las entrañas del software actual del proveedor: permisos genéricos por rol donde cualquier credencial de salud accede a todo. Y había hablado con la supervisora de enfermería de noche.",
    image: "/src/assets/images/comic_panel_4_ignacio_1791740917552.jpg",
    soundEffect: "TIC... TIC... TIC... (Desplegables en pantalla)",
    dialogues: [
      {
        speaker: "Ignacio",
        role: "Jefe de Informática Médica / CIO",
        text: "Ponerse a completar desplegables rígidos te hace perder el contacto visual con un paciente en crisis. En agudos, la rigidez para administrar psicofármacos es crítica.",
        avatarBg: "bg-blue-600",
        type: "speech",
      },
      {
        speaker: "Ignacio",
        role: "Jefe de Informática Médica / CIO",
        text: "Y además, el software actual tiene permisos genéricos: no distingue si un médico está a cargo del paciente o si es un auditor curioseando.",
        avatarBg: "bg-blue-600",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "Interrupción de la alianza terapéutica y aumento del riesgo de agresión física o descompensación cuando el profesional mira la pantalla y no al paciente.",
      technologicalAspect: "Falta de soporte para flujos dinámicos de medicación (órdenes verbales de urgencia con convalidación posterior, protocolos de rescate psicotrópico).",
      methodologicalChallenge: "¿Cómo medir la carga cognitiva (NASA-TLX) y la desviación de la mirada clínica (*gaze/eye-tracking* o análisis de video) en el protocolo de evaluación?",
    },
    professorPrompt: "Aquí Ignacio menciona dos dimensiones esenciales: la usabilidad en tiempo real (ergonomía cognitiva y relación médico-paciente) y la arquitectura estructural de datos. ¿Por qué una encuesta de satisfacción posterior jamás detectaría la pérdida de contacto visual en crisis?",
    suggestedQuestions: [
      "¿Qué instrumentos metodológicos (ej. NASA-TLX, eye-tracking, grabaciones en simulación) miden la interferencia de la pantalla en la entrevista clínica?",
      "¿Cómo debe evaluarse el circuito de indicación y administración de psicofármacos en agudos bajo presión temporal?",
      "¿Qué heurísticas de usabilidad para software médico (Zhang et al.) aplican específicamente a la salud mental?"
    ]
  },
  {
    id: 5,
    title: "Viñeta 5: La Promesa del Proveedor y la Presión del Reloj",
    tagline: "El proveedor pide 'evaluar usabilidad con 60 profesionales'",
    narrative: "El Director General miró su reloj y golpeó de nuevo la mesa. 'El proveedor dice que su plataforma se amolda a lo que pidamos, siempre y cuando las especificaciones salgan del estudio de usabilidad con la gente del servicio. La plata está asignada.'",
    image: "/src/assets/images/comic_panel_5_presupuesto_1791740933585.jpg",
    soundEffect: "TICK-TOCK! (La cuenta regresiva a 2027)",
    dialogues: [
      {
        speaker: "Director General",
        role: "Máxima Autoridad Ejecutiva",
        text: "El proveedor nos juró disponibilidad total para adaptar el software según lo que surja del estudio. Tenemos a más de 60 profesionales listos para las pruebas. Pongámosle bordes ya.",
        avatarBg: "bg-amber-600",
        type: "speech",
      },
      {
        speaker: "Proveedor de Software",
        role: "Venta Corporativa de Software",
        text: "Hagan las pruebas con los usuarios, díhannos qué pantallas quieren cambiar y nosotros modificamos los campos.",
        avatarBg: "bg-emerald-600",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "Riesgo de desgaste de los 60 profesionales en sesiones de testeo superficiales que no tocan las falencias estructurales de fondo.",
      technologicalAspect: "La trampa del proveedor: reducir un problema de arquitectura de base de datos y políticas de seguridad a 'cambios cosméticos de pantalla'.",
      methodologicalChallenge: "¿Cómo formular criterios de aceptación contractuales ('Go / No-Go') basados en evidencia empírica generada por el protocolo?",
    },
    professorPrompt: "Atención maestrandos: el proveedor promete 'adaptar el software si sale del estudio'. ¿Es viable cambiar la arquitectura de seguridad y datos de un EHR comercial cerrado solo con un test de usabilidad? ¿Qué poder contractual tiene un protocolo de investigación bien estructurado?",
    suggestedQuestions: [
      "¿Cómo se define un criterio 'Go / No-Go' en la evaluación previa a la adquisición o despliegue de un módulo de HCE?",
      "¿Por qué un proveedor comercial intenta llevar la discusión al terreno de la 'usabilidad de pantalla' en lugar de la arquitectura de datos?",
      "¿Cómo evitar el sesgo de complacencia o fatiga de testeo al involucrar a 60 profesionales sanitarios?"
    ]
  },
  {
    id: 6,
    title: "Viñeta 6: La Libreta Abierta de Ignacio",
    tagline: "El silencio denso y las preguntas metodológicas fundamentales",
    narrative: "La sala quedó en un silencio denso. Todas las miradas cayeron sobre la libreta abierta de Ignacio, donde tenía que empezar a garabatearse la propuesta metodológica para la próxima reunión ejecutiva.",
    image: "/src/assets/images/comic_panel_6_libreta_1791740951755.jpg",
    soundEffect: "SILENCIO TOTAL...",
    dialogues: [
      {
        speaker: "Ignacio",
        role: "Jefe de Informática Médica / CIO",
        text: "¿Qué vamos a estar midiendo realmente? ¿Si la interfaz es cómoda para hacer clics o si la arquitectura de datos se banca la confidencialidad diferencial?",
        avatarBg: "bg-blue-600",
        type: "thought",
      },
      {
        speaker: "Ignacio",
        role: "Jefe de Informática Médica / CIO",
        text: "¿Cuál es el alcance real para 2027? ¿Qué preguntas metodológicas tenemos que responder para no terminar implementando un sistema rechazado o inseguro?",
        avatarBg: "bg-blue-600",
        type: "speech",
      }
    ],
    criticalAnalysis: {
      clinicalAspect: "El destino del servicio de psiquiatría y la dignidad del paciente dependen de la formulación metodológica de este protocolo.",
      technologicalAspect: "Definición de variables dependientes e independientes: usabilidad percibida (SUS), efectividad en tareas críticas, violaciones de privacidad y latencia en emergencias.",
      methodologicalChallenge: "Diseñar un estudio de métodos mixtos (cuanti + cuali) que produzca evidencia sólida e inobjetable ante el Directorio y el Proveedor.",
    },
    professorPrompt: "Aquí estamos en el epicentro de nuestra materia. La libreta en blanco de Ignacio es el desafío de ustedes como futuros Magísteres en Informática en Salud: diseñar el protocolo de evaluación que resuelva este dilema.",
    suggestedQuestions: [
      "¿Cuál debe ser la pregunta de investigación principal y las secundarias según el formato PICO/FINER?",
      "¿Qué diseño metodológico mixto (ej. diseño secuencial exploratorio vs explicativo) es el más adecuado?",
      "¿Cómo debería estructurarse la propuesta final para presentar en el Directorio del Sanatorio San Joaquín?"
    ]
  }
];

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  stance: string;
  keyConcerns: string[];
  avatar: string;
  color: string;
  quote: string;
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: "docente",
    name: "Profesor Titular",
    title: "Especialista en Evaluación de Tecnologías en Salud",
    department: "Cátedra de Metodología de la Investigación - Maestría en Informática en Salud",
    stance: "Académica, metodológica, socrática y orientadora.",
    keyConcerns: [
      "Rigor del diseño del protocolo de evaluación (métodos mixtos)",
      "Triangulación entre métricas de usabilidad y arquitectura de seguridad",
      "Validez ecológica y contextualización en el hábitat clínico",
      "Definición de criterios de aceptación Go/No-Go contractuales"
    ],
    avatar: "👨‍🏫",
    color: "indigo",
    quote: "No midan la usabilidad de una puerta si la cerradura deja la casa abierta a cualquiera."
  },
  {
    id: "ignacio",
    name: "Ignacio",
    title: "Jefe de Informática Médica / CIO",
    department: "Departamento de Sistemas y Tecnologías de la Información",
    stance: "Realista, analítico, busca fundamentar decisiones técnicas en evidencia rigurosa.",
    keyConcerns: [
      "Diferenciar pruebas de pantalla vs pruebas de arquitectura de datos",
      "Viabilidad técnica del proveedor frente al plazo límite 2027",
      "Integración de psicofármacos y reducción de carga cognitiva en agudos",
      "Evitar el rechazo de los 60 profesionales sanitarios"
    ],
    avatar: "💻",
    color: "blue",
    quote: "¿Qué medimos realmente? ¿Si la interfaz es cómoda para hacer clics o si la arquitectura soporta la privacidad diferencial?"
  },
  {
    id: "benitez",
    name: "Dr. Benítez",
    title: "Jefe del Servicio de Psiquiatría",
    department: "Servicio de Psiquiatría y Salud Mental",
    stance: "Custodio ético y clínico de los pacientes; en alerta ante la vulneración de privacidad.",
    keyConcerns: [
      "Confidencialidad absoluta de notas sensibles (ideación suicida, traumas, abusos)",
      "Segmentación de permisos para evitar accesos de auditoría o guardias no afines",
      "Riesgo inminente de 'cuadernos paralelos' y omisión deliberada de registros",
      "Preservación del contacto visual y empatía durante entrevistas de crisis"
    ],
    avatar: "🩺",
    color: "red",
    quote: "Si el sistema no garantiza notas confidenciales protegidas, los profesionales van a omitir datos o llevarán cuadernos paralelos."
  },
  {
    id: "director",
    name: "Director General",
    title: "Director General Ejecutivo",
    department: "Comité de Dirección Estratégica",
    stance: "Orientado a resultados, cumplimiento de metas institucionales 2027 y retorno presupuestario.",
    keyConcerns: [
      "Cumplimiento del Plan Estratégico 2027 con 100% de digitalización",
      "Acreditaciones de calidad y exigencias de prepagas/aseguradoras",
      "Eficiencia del presupuesto asignado para las pruebas de usabilidad",
      "Exigir compromisos claros y ejecutables al proveedor de software"
    ],
    avatar: "👔",
    color: "amber",
    quote: "Psiquiatría es el único bastión que nos queda en papel. Tenemos presupuesto asignado; pongámosle bordes ya."
  },
  {
    id: "enfermeria",
    name: "Lic. Mariana Gómez",
    title: "Supervisora de Enfermería (Turno Noche)",
    department: "Internación de Agudos de Psiquiatría",
    stance: "Operativa de primera línea en contingencias y emergencias agudas.",
    keyConcerns: [
      "Velocidad de registro en contenciones y psicofármacos de rescate",
      "Fatiga de alarmas y bloqueos burocráticos de pantalla en medio de crisis",
      "Privacidad de las observaciones conductuales de enfermería",
      "Uso de tabletas o dispositivos móviles seguros a pie de cama"
    ],
    avatar: "👩‍⚕️",
    color: "teal",
    quote: "En una agitación de madrugada no hay tiempo para siete clics en desplegables. El paciente es la prioridad."
  }
];

export interface MethodologicalPillar {
  title: string;
  icon: string;
  category: string;
  summary: string;
  pitfalls: string[];
  recommendations: string[];
}

export const METHODOLOGICAL_PILLARS: MethodologicalPillar[] = [
  {
    title: "Evaluación de Usabilidad Clínica (Ergonomía & Interfaz)",
    icon: "Layout",
    category: "Factores Humanos & UX",
    summary: "Medición de efectividad (tasa de éxito en tareas clínicas), eficiencia (tiempo invertido, clics) y satisfacción percibida (SUS / CSUQ).",
    pitfalls: [
      "Evaluar solo pantallas estáticas o formularios en salas de reuniones sin simulación clínica.",
      "Conformarse con puntajes SUS altos en tareas sencillas que ocultan colapsos en emergencias.",
      "Ignorar el 'costo visual' (perder la mirada del paciente mientras se escribe)."
    ],
    recommendations: [
      "Protocolo Think-Aloud y análisis de tareas clínicas simuladas (consulta externa vs crisis en agudos).",
      "Medir carga mental con NASA-TLX durante la prescripción y administración de psicofármacos.",
      "Evaluación Heurística especializada basada en TURF (Zhang et al.) para software clínico."
    ]
  },
  {
    title: "Arquitectura de Privacidad & Confidencialidad Diferencial",
    icon: "ShieldAlert",
    category: "Seguridad & Gobernanza de Datos",
    summary: "Control granular del acceso a registros altamente sensibles de salud mental garantizando el secreto profesional y normativas legales.",
    pitfalls: [
      "Depender de RBAC genérico (Role-Based Access Control) donde todo 'Médico' o 'Enfermero' ve todo.",
      "Crear silos aislados que impidan a una guardia médica conocer alergias o interacciones farmacológicas vitales.",
      "Ignorar que la desconfianza provoca 'cuadernos paralelos' y notas clínicas incompletas."
    ],
    recommendations: [
      "Implementar modelo ABAC (Attribute-Based Access Control) con asignación de episodio clínico activo.",
      "Segmentación de 'Notas Psicoterapéuticas / Confidenciales' con mecanismo auditado 'Break-the-Glass'.",
      "Trazabilidad y auditoría forense con alertas ante accesos de personal no terapéutico."
    ]
  },
  {
    title: "Validez Ecológica & Muestreo Estratificado",
    icon: "Users",
    category: "Diseño de la Investigación",
    summary: "Garantizar que la muestra de 60 profesionales y los escenarios evaluados reflejen fielmente la diversidad y complejidad del servicio.",
    pitfalls: [
      "Someter a los 60 profesionales a una misma prueba uniforme de 15 minutos en computadora de escritorio.",
      "Sobrerrepresentar a médicos de consultorio y desatender enfermería de agudos, trabajo social y psicología.",
      "No observar los flujos de trabajo reales (*work-as-imagined* vs *work-as-done*)."
    ],
    recommendations: [
      "Estratificar la muestra: 12 psiquiatras (agudos/ambulatorios), 15 enfermeros (turnos rotativos), 10 psicólogos, 5 trabajadores sociales, 8 administrativos y 10 residentes.",
      "Método mixto secuencial explicativo (Fase Cuali formativa inicial -> Fase Cuanti experimental simulada).",
      "Triangulación de datos: métricas de sistema + observaciones en hábitat + entrevistas en profundidad."
    ]
  },
  {
    title: "Gobernanza Contractual & Matriz Go / No-Go",
    icon: "FileCheck",
    category: "Gestión Estratégica & Proveedor",
    summary: "Transformar los hallazgos del protocolo de investigación en especificaciones técnicas vinculantes antes del hito 2027.",
    pitfalls: [
      "Aceptar promesas verbales del proveedor sin definir umbrales mínimos de aceptación tecnológica.",
      "Quedar atrapados en un 'vendor lock-in' donde el proveedor posterga cambios arquitectónicos estructurales.",
      "Llegar a finales de 2026 sin prototipos funcionales validados en el servicio."
    ],
    recommendations: [
      "Definir Matriz Go / No-Go con umbrales cuantitativos (ej. Cero violaciones de permisos, tiempo de prescripción de emergencia < 45 seg).",
      "Adenda contractual que supedite el pago a la superación de las pruebas de usabilidad y seguridad.",
      "Evaluación de alternativas: modularización con API estándar (FHIR) para salud mental si el core ERP falla."
    ]
  }
];
