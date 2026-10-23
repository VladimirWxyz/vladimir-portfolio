import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/portfolio/language-provider';

export const metadata: Metadata = {
  applicationName: 'Portafolio de Vladimir Williams',
  title: 'Vladimir Williams — Frontend Developer',
  description:
    'Interfaces con personalidad, construidas con React, TypeScript, JavaScript, HTML y CSS. El portafolio de Vladimir Williams.',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`,
  },
  authors: [{ name: 'Vladimir Williams' }],
  creator: 'Vladimir Williams',
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#04131c',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
