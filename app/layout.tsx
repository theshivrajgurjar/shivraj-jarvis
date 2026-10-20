import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Shivraj Gurjar | J.A.R.V.I.S. Command Center',
  description: 'A private, cinematic command center for Shivraj Gurjar’s work, systems, and daily protocols.',
  applicationName: 'J.A.R.V.I.S. Spatial OS',
  keywords: ['Shivraj Gurjar', 'JARVIS', 'personal workspace', 'command center'],
  openGraph: {
    title: 'Shivraj Gurjar | J.A.R.V.I.S. Command Center',
    description: 'Private executive terminal and personal operating system.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#07090d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
