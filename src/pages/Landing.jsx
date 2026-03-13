// src/pages/Landing.jsx
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Libre.</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-500">
            <Link to="/login" className="hover:text-black transition-colors">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 mb-8 leading-[1.1]">
              Smart Library <span className="text-indigo-600">Management</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed mb-10">
              Simplify inventory, track loans, and monitor activity—all in real time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-8 py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/catalog" className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center">
                Catalog
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 border border-slate-100 overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200" 
                alt="Minimalist Library Interior" 
                className="rounded-[1.5rem] w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Highlights */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group">
              <div className="mb-6 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Real-Time Inventory</h3>
              <p className="text-slate-500 leading-relaxed">
                Keep stock accurate and prevent double-borrowing automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="mb-6 w-12 h-12 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Secure Member Access</h3>
              <p className="text-slate-500 leading-relaxed">
                Protect member data with enterprise-level authentication.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="mb-6 w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Automated Loan Management</h3>
              <p className="text-slate-500 leading-relaxed">
                Automatically track due dates and returns, no manual work needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}