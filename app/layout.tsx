import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yash Chaudhary | Full-Stack Engineer',
  description: 'Portfolio of Yash Chaudhary - Full-Stack Engineer & AI Automation Architect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
