import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sarkari Dost | AI-Powered Govt Benefits',
  description: 'Find your government schemes instantly with AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-blue-600">
            SARKARI<span className="text-orange-500">DOST</span>
          </div>
          <a href="/apply" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
            Check Eligibility
          </a>
        </nav>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
