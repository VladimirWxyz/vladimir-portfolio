import { projects, type Project } from './portfolio';

// Screenshots document the original Spanish products; captions and alt text
// describe them in the visitor's selected language.
const content: Record<
  (typeof projects)[number]['id'],
  {
    name?: string;
    category: string;
    summary: string;
    problem: string;
    approach: string;
    collaboration?: string;
    images?: readonly (readonly [string, string])[];
  }
> = {
  'pizzas-house': {
    category: 'Ordering & delivery',
    summary:
      'A mobile ordering experience for a pizzeria, featuring a size-based menu, promotions, branch selection, and delivery estimates using geolocation.',
    problem:
      'A wide range of sizes, toppings, promotions, and delivery options needed to become a quick, easy-to-follow ordering process on a phone.',
    approach:
      'I designed a mobile-first journey from choosing a pizza to submitting an order, bringing together customization, branch selection, manual or GPS location, an interactive map, and estimated delivery costs.',
    images: [
      [
        'Home and quick actions',
        'Pizzas House mobile homepage with links to the menu, promotions, and WhatsApp ordering.',
      ],
      [
        'Menu and filters',
        'Mobile pizza menu with size, category, and pizza type filters.',
      ],
      [
        'Pizza catalog',
        'Mobile pizza catalog with photos, ingredients, prices, and add-to-order buttons.',
      ],
      [
        'Size guide',
        'Mobile pizza size guide from the 28 cm small pizza to the 80 cm Monster XL.',
      ],
      [
        'Orders, branches, and geolocation',
        'Mobile order flow with delivery options, branch selection, and GPS or manual location entry.',
      ],
      [
        'Precise location on the map',
        'Interactive map of Puerto Ordaz with a marker to confirm the exact delivery location.',
      ],
    ],
  },
  galeria: {
    category: 'Restaurant operations',
    summary:
      'A digital storefront and operations system for cafés and restaurants, from publishing a menu to serving customers at their tables.',
    problem:
      'Restaurants need to coordinate menus, QR codes, tables, orders, cash registers, payments, and staff without spreading operations across disconnected tools.',
    approach:
      'I designed and built the complete café and restaurant experience: menu management, settings, cash register, tables, payments, staff, waiter workflows, and the customer view.',
    collaboration:
      'Built in collaboration. I was responsible for the complete café and restaurant module.',
    images: [
      [
        'Administration and catalog',
        'Café administration view with a product catalog and management shortcuts.',
      ],
      [
        'Sharing via QR code',
        'Sharing screen with a QR code, link, and WhatsApp options.',
      ],
      [
        'Restaurant settings',
        'Settings menu linking to the cash register, tables, payments, staff, and waiter dashboard.',
      ],
      [
        'Cash register and shift management',
        'Cash register dashboard with shift opening, reconciliation, and transaction summaries.',
      ],
      [
        'Tables and QR codes',
        'Table management with seats, QR codes, and editing actions.',
      ],
      [
        'Payment methods and details',
        'Settings for mobile payments and Binance Pay.',
      ],
      [
        'Staff and roles',
        'Restaurant staff management with roles and active status.',
      ],
      [
        'Waiter dashboard',
        'Service dashboard for waiters showing table status.',
      ],
      [
        'Taking orders',
        'Table order flow with available products and variants.',
      ],
      [
        'Table service',
        'Customer view with options to call a waiter and request the bill.',
      ],
      [
        'Customer menu',
        'Read-only customer menu with search, products, and prices.',
      ],
    ],
  },
  'movie-catalog': {
    name: 'Movie Catalog',
    category: 'Interactive catalog',
    summary:
      'A responsive movie catalog with instant search, genre filters, and trailer playback in modal windows.',
    problem:
      'Exploring a large collection requires finding titles quickly, telling categories apart, and accessing content without leaving the catalog.',
    approach:
      'I separated data from rendering logic and built real-time filters, empty states, dynamic YouTube modals, and visual fallbacks for broken images.',
    images: [
      [
        'Movie search and catalog',
        'Movie catalog with search and cards showing titles, runtime, and trailer links.',
      ],
    ],
  },
  forma: {
    category: 'Finance interface',
    summary:
      'Complex information, a clear experience. A dashboard concept designed to help you understand your finances at a glance.',
    problem:
      'Isolated figures make it hard to understand spending patterns and progress toward a goal.',
    approach:
      'A visual hierarchy focused on balance, spending, and goals, with components that adapt from mobile to desktop.',
  },
  pulse: {
    category: 'Music discovery',
    summary:
      'A space to find your rhythm. A music interface concept with collections and mood-based navigation.',
    problem:
      'Finding the right collection can feel overwhelming when every option has the same visual weight.',
    approach:
      'Visual collections and clear selection states for exploring content with a keyboard, mouse, or touchscreen.',
  },
  margen: {
    category: 'Personal productivity',
    summary:
      'Fewer distractions, more ideas. A note-taking app concept with a lightweight interface focused on writing.',
    problem:
      'Tools overloaded with options can interrupt the moment of capturing an idea.',
    approach:
      'A simple writing surface, visible organization, and accessible controls that put the content first.',
  },
};

export const englishProjects: readonly Project[] = projects.map((project) => {
  const translation = content[project.id];
  const { images, ...copy } = translation;
  return {
    ...project,
    ...copy,
    images: ('images' in project ? project.images : undefined)?.map(
      (image, index) => ({
        ...image,
        caption: images![index][0],
        alt: images![index][1],
      }),
    ),
  };
});
