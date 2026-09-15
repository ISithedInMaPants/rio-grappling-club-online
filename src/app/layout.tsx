import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rio Grappling Club Online • Grappling, Structured',
  description:
    'The official Brazilian Jiu-Jitsu and grappling skills portal for Rio Grappling Club. Systematic instructionals, mat drilling loops, lefty mirror mode, and gameplans by Roberto Atalla and master instructors.',
  keywords: [
    'Rio Grappling Club',
    'BJJ',
    'Brazilian Jiu-Jitsu',
    'Roberto Atalla',
    'Grappling',
    'BJJ instructionals',
    'No-Gi',
    'Skill sharing',
  ],
  icons: {
    icon: '/images/rgc/site_icon.png',
  },
};

import { AppProviders } from '@/components/providers/AppProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#0d0d0e] text-[#ededf4] font-sans selection:bg-[#00923f]/30 selection:text-white">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
