export type ExternalUrl = `https://${string}`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;

export interface Profile {
  readonly name: string;
  readonly role: string;
  readonly intro: string;
  readonly about: string;
  readonly avatarUrl: string | null;
  readonly email: string | null;
  readonly github: ExternalUrl | null;
  readonly linkedin: ExternalUrl | null;
  readonly whatsapp: ExternalUrl | null;
}
export const profile: Profile = {
  name: 'Vladimir Williams',
  role: 'Frontend Developer',
  intro: 'Creo interfaces con React, JavaScript y atención a cada interacción.',
  about:
    'Me gusta convertir una idea visual en algo que puedas tocar, recorrer y usar. Mi terreno es el frontend: estructura, estilo e interacción.',
  avatarUrl: asset('/images/vladimir-williams-avatar.webp'),
  email: 'vladimirwilliams.xyz@gmail.com',
  github: 'https://github.com/VladimirWxyz',
  linkedin: 'https://www.linkedin.com/in/vladimir-williams-dev/',
  whatsapp: 'https://wa.me/584129159744',
};
export const technologies = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
] as const;
export type ProjectPreviewKind = 'characters' | 'finance' | 'music' | 'notes';
export interface ProjectImage {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width?: number;
  readonly height?: number;
}
export interface Project {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  readonly problem: string;
  readonly approach: string;
  readonly technologies: readonly string[];
  readonly preview: ProjectPreviewKind;
  readonly isConcept: boolean;
  readonly demoUrl: ExternalUrl | null;
  readonly sourceUrl: ExternalUrl | null;
  readonly collaboration?: string;
  readonly images?: readonly ProjectImage[];
}
export const projects = [
  {
    id: 'forma',
    name: 'Forma',
    category: 'Interfaz financiera',
    preview: 'finance',
    summary:
      'Información compleja, una experiencia clara. Un concepto de dashboard pensado para entender tus finanzas de un vistazo.',
    problem:
      'Las cifras aisladas dificultan entender cómo se distribuyen los gastos y qué tan cerca está una meta.',
    approach:
      'Una jerarquía visual centrada en balance, gastos y objetivos, con componentes que se adaptan del móvil al escritorio.',
    technologies: ['React', 'TypeScript', 'CSS'],
    isConcept: true,
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    category: 'Explorador musical',
    preview: 'music',
    summary:
      'Un espacio para encontrar tu ritmo. Un concepto de interfaz musical con colecciones y navegación centrada en el estado de ánimo.',
    problem:
      'Encontrar una colección adecuada puede resultar abrumador cuando todas las opciones tienen la misma importancia.',
    approach:
      'Colecciones visuales y estados de selección claros para recorrer el contenido con teclado, ratón o pantalla táctil.',
    technologies: ['React', 'JavaScript', 'CSS'],
    isConcept: true,
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'margen',
    name: 'Margen',
    category: 'Herramienta personal',
    preview: 'notes',
    summary:
      'Menos distracciones, más ideas. Un concepto de aplicación de notas con una interfaz ligera y enfocada en escribir.',
    problem:
      'Las herramientas cargadas de opciones pueden interrumpir el momento de capturar una idea.',
    approach:
      'Una superficie de escritura sencilla, organización visible y controles accesibles con el contenido como protagonista.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    isConcept: true,
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 'galeria',
    name: 'Galería',
    category: 'Operación gastronómica',
    preview: 'notes',
    summary:
      'Vitrina virtual y sistema de operación para cafeterías y restaurantes, desde la publicación del catálogo hasta la atención en mesa.',
    problem:
      'Un local necesita coordinar catálogo, códigos QR, mesas, pedidos, caja, pagos y personal sin fragmentar la operación entre herramientas distintas.',
    approach:
      'Diseñé y desarrollé la experiencia completa para cafeterías y restaurantes: administración del catálogo, configuración, caja, mesas, pagos, personal, flujo de meseros y vista del comensal.',
    technologies: ['React', 'TypeScript', 'Vite', 'Node.js', 'SQLite'],
    isConcept: false,
    demoUrl: null,
    sourceUrl: null,
    collaboration:
      'Proyecto desarrollado en colaboración. Mi responsabilidad fue el módulo completo para cafeterías y restaurantes.',
    images: [
      {
        src: asset('/images/projects/galeria/00-overview.webp?v=2'),
        alt: 'Vista administrativa de la cafetería con catálogo de productos y accesos de gestión.',
        caption: 'Administración y catálogo',
      },
      {
        src: asset('/images/projects/galeria/01-sharing-qr.webp?v=2'),
        alt: 'Pantalla para compartir la galería mediante código QR, enlace y WhatsApp.',
        caption: 'Publicación mediante QR',
      },
      {
        src: asset('/images/projects/galeria/02-configuration.webp?v=2'),
        alt: 'Menú de configuración con accesos a caja, mesas, pagos, personal y tablero del mesero.',
        caption: 'Configuración del local',
      },
      {
        src: asset('/images/projects/galeria/03-cash-register.webp?v=2'),
        alt: 'Panel de caja con apertura de turno, conciliaciones y resumen de movimientos.',
        caption: 'Apertura y control de caja',
      },
      {
        src: asset('/images/projects/galeria/04-tables.webp?v=2'),
        alt: 'Administración de mesas con puestos, códigos QR y acciones de edición.',
        caption: 'Mesas y códigos QR',
      },
      {
        src: asset('/images/projects/galeria/05-payments.webp?v=2'),
        alt: 'Configuración de métodos de pago móvil y Binance Pay.',
        caption: 'Métodos y datos de pago',
      },
      {
        src: asset('/images/projects/galeria/06-staff.webp?v=2'),
        alt: 'Gestión del personal del local con roles y estados activos.',
        caption: 'Personal y roles',
      },
      {
        src: asset('/images/projects/galeria/07-waiter-dashboard.webp?v=2'),
        alt: 'Tablero de servicio para meseros con el estado de las mesas.',
        caption: 'Tablero del mesero',
      },
      {
        src: asset('/images/projects/galeria/08-order-taking.webp?v=2'),
        alt: 'Flujo para tomar el pedido de una mesa con productos y variantes disponibles.',
        caption: 'Toma de pedidos',
      },
      {
        src: asset('/images/projects/galeria/09-customer-actions.webp?v=2'),
        alt: 'Vista del comensal con acciones para llamar al mesero y pedir la cuenta.',
        caption: 'Atención desde la mesa',
      },
      {
        src: asset('/images/projects/galeria/10-customer-menu.webp?v=2'),
        alt: 'Menú de solo lectura para el comensal con búsqueda, productos y precios.',
        caption: 'Menú para el comensal',
      },
    ],
  },
  {
    id: 'movie-catalog',
    name: 'Catálogo de Películas',
    category: 'Catálogo interactivo',
    preview: 'finance',
    summary:
      'Catálogo responsive con búsqueda instantánea, filtros por género y reproducción de tráilers en ventanas modales.',
    problem:
      'Explorar una colección amplia requiere localizar títulos con rapidez, distinguir categorías y acceder al contenido sin abandonar el catálogo.',
    approach:
      'Separé los datos de la lógica de renderizado y construí filtros en tiempo real, estados vacíos, modales dinámicos para YouTube y alternativas visuales ante imágenes rotas.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    isConcept: false,
    demoUrl: 'https://vladimirwxyz.github.io/Catalogo-peliculas/',
    sourceUrl: 'https://github.com/VladimirWxyz/Catalogo-peliculas',
    images: [
      {
        src: asset('/images/projects/movie-catalog/overview.webp'),
        alt: 'Catálogo de películas con buscador y tarjetas de títulos, duración y acceso al tráiler.',
        caption: 'Búsqueda y catálogo de películas',
        width: 1500,
        height: 647,
      },
    ],
  },
] as const satisfies readonly Project[];
