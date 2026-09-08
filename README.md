# Portafolio de Vladimir Williams

Primera versión en React 19, TypeScript y CSS. Diseño de una sola página con fondo azul profundo, turquesa y violeta; carrusel de proyectos, detalles en diálogo, laboratorio interactivo, presentación y contacto.

## Desarrollo local

Requiere Node.js 22.13 o superior y npm.

```sh
npm install
npm run dev
```

Abre la dirección que indique el servidor, normalmente `http://localhost:3000`. El proyecto usa Vinext sobre Vite (React con convenciones de rutas de Next.js), siguiendo el scaffold de Sites. No se ha publicado ni conectado a servicios externos.

```sh
npm run format:check
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

`lint` comprueba el repositorio completo. El catálogo inicial se redujo a las tres primitivas que usa la página: botón, carrusel y diálogo. Playwright valida las interacciones principales en Chromium y el build genera el resultado en `dist/`. GitHub Actions ejecuta estas comprobaciones en cada `push` y `pull_request`.

## Personalizar contenido

Edita `data/portfolio.ts`:

- `profile`: nombre, presentación, biografía, foto, correo y enlaces. Los valores `null` no producen imágenes ni enlaces vacíos.
- `technologies`: lista del stack.
- `projects`: tarjetas, tecnologías, problema, enfoque, capturas y enlaces opcionales a demo y repositorio. `isConcept: true` identifica claramente los ejemplos.

El carrusel incluye tres proyectos reales: Galería, Rick & Morty Multiverse y Catálogo de Películas. Galería documenta el módulo para cafeterías y restaurantes desarrollado por Vladimir dentro de un proyecto colaborativo, con once vistas que recorren administración, operación y experiencia del comensal. Los otros dos proyectos enlazan su demo y repositorio público. Forma, Pulse y Margen permanecen identificados como conceptos visuales de ejemplo. El laboratorio contiene interacciones funcionales y locales, sin guardar ni enviar información.

## Componentes y regla de tres

- `ActionLink` y `ActionButton`: comparten tres variantes visuales (`primary`, `outline`, `ghost`) y conservan límites separados para enlaces de servidor y botones interactivos.
- `Section`, `Surface`, `Tag`: estructuras que se repiten en tres o más puntos. La capa visual se define en CSS.
- `ProjectCard`, `ProjectPreview` y `ProjectGallery`: estructura repetida para cada entrada tipada, composiciones de ejemplo y recorridos con capturas reales.
- `ExperimentCard`: estado independiente de cada una de las tres pequeñas interacciones.
- `Hero`, `ProjectCarousel`, `Playground`, `About` y `Contact`: secciones con responsabilidades propias; `app/page.tsx` solo las compone.

Se extraen patrones después de una repetición real (regla de tres), sin crear una fábrica de componentes o una capa global de estado. React mantiene el estado en el carrusel y en cada experimento. Los diálogos y el carrusel reutilizan Base UI y Embla sin duplicar su infraestructura.

## Estilos y capas

`app/globals.css` conserva únicamente los imports globales. `app/styles/theme.css` define tokens, tipografía y estilos base; `app/styles/portfolio.css` contiene componentes y reglas responsive. Tailwind se mantiene para las primitivas del scaffold.

La navegación ofrece salto al contenido, controles con foco visible, HTML semántico, diapositivas inactivas fuera del foco, diálogos con cierre y gestión de foco, controles táctiles y respeto a `prefers-reduced-motion`. El carrusel principal no rota automáticamente. La galería de capturas avanza de forma pausada, se detiene al interactuar y ofrece controles manuales; la reproducción automática se desactiva si el sistema solicita movimiento reducido.

## Contenido personal

El correo, GitHub, LinkedIn, WhatsApp y retrato proporcionados ya están incorporados. La fotografía WebP del encabezado abre una vista ampliada accesible. El ecommerce podrá añadirse cuando su repositorio y demo estén listos, sin modificar la estructura del carrusel. Si más adelante eliminas un dato de contacto o la foto, el sitio conserva un estado coherente.

## Licencia

El código fuente se distribuye bajo la [licencia MIT](LICENSE).

Las fotografías, capturas de proyectos, identidad visual, textos y demás contenido personal no forman parte de esta licencia. Estos materiales permanecen bajo los derechos de Vladimir Williams y de sus respectivos titulares.
