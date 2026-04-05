import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SetupBanner } from '@/components/SetupBanner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeInitScript } from '@/components/ThemeInitScript';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Orbital Simulator Hub Community',
  description: 'Join study rooms for astrophysics, orbital mechanics, aerospace, and NASA. Sign up to chat and learn together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeInitScript />
        <ThemeProvider>
          <SetupBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
