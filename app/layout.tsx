import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yash Chaudhary | Full-Stack Engineer',
  description: 'Portfolio of Yash Chaudhary - Full-Stack Engineer and UI Architect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased">{children}</body>
    </html>
  );
}
