import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShieldCheck, MessageSquare, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Lapor Cepat, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Tindak Tepat</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10">
              Si Peka (Sistem Pelaporan Masyarakat) adalah platform resmi untuk menyampaikan keluhan, aspirasi, dan laporan kejadian di lingkungan Anda secara transparan dan aman.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Link 
                to="/login" 
                className="px-8 py-3.5 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center"
              >
                Buat Laporan Sekarang <ArrowRight size={18} className="ml-2" />
              </Link>
              <a 
                href="#how-it-works" 
                className="px-8 py-3.5 text-base font-medium rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 shadow-sm transition-all"
              >
                Pelajari Alurnya
              </a>
            </div>
          </div>
        </div>

        {/* Features / How it works */}
        <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Bagaimana Si Peka Bekerja?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Tiga langkah mudah untuk lingkungan yang lebih baik.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Tulis Laporan</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Jelaskan kejadian, lokasi, serta lampirkan foto bukti yang relevan agar laporan Anda valid.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Proses Verifikasi</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Laporan Anda akan segera ditinjau dan diverifikasi oleh admin yang bertugas di lapangan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Tindak Lanjut</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Instansi terkait akan menyelesaikan masalah. Anda bisa memantau status secara langsung.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Si Peka - Sistem Pelaporan Masyarakat.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
