import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

const translations = {
  en: {
    navHome: 'Home',
    navAbout: 'About Project',
    langBtn: 'Português',
    heroTitle: 'Elegant components for React.',
    heroSub:
      'A personal collection of JSX components built with a Dark-First philosophy.',
    getStarted: 'Get Started',
    aboutTitle: 'About the Project',
    aboutText:
      'Developed by Anselmo Sammarco (Céo), nk-jsx is a minimalist library inspired by the shadcn/ui workflow. It focuses on providing raw JSX components that are easy to copy, paste, and customize.',
    eduTitle: 'Background',
    eduText:
      'Created by a Fullstack Node.js developer and Software Engineering student at Estácio.',
    features: 'Features',
    feat1: 'Dark Mode optimized',
    feat2: 'Zero installation overhead',
    feat3: 'Clean Software Engineering standards',
  },
  pt: {
    navHome: 'Início',
    navAbout: 'Sobre o Projeto',
    langBtn: 'English',
    heroTitle: 'Componentes elegantes para React.',
    heroSub:
      'Uma coleção pessoal de componentes JSX construída com a filosofia Dark-First.',
    getStarted: 'Começar',
    aboutTitle: 'Sobre o Projeto',
    aboutText:
      'Desenvolvido por Anselmo Sammarco (Céo), a nk-jsx é uma biblioteca minimalista inspirada no workflow do shadcn/ui. O foco é fornecer componentes JSX puros, fáceis de copiar, colar e customizar.',
    eduTitle: 'Formação',
    eduText:
      'Criado por um desenvolvedor Fullstack Node.js e graduando em Engenharia de Software pela Estácio.',
    features: 'Destaques',
    feat1: 'Otimizado para Dark Mode',
    feat2: 'Sem dependências complexas',
    feat3: 'Padrões de Engenharia de Software',
  },
};

const Home = ({ t }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <div className="mb-6 inline-block px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-mono text-slate-400">
      v1.0.0 — nk-jsx
    </div>
    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent mb-6">
      {t.heroTitle}
    </h1>
    <p className="text-slate-400 text-lg max-w-2xl mb-8">{t.heroSub}</p>
    <div className="flex gap-4">
      <Link
        to="/about"
        className="bg-slate-100 text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-white transition-all"
      >
        {t.getStarted}
      </Link>
      <a
        href="https://github.com/nkoten/nk-jsx"
        target="_blank"
        className="border border-slate-700 px-6 py-3 rounded-md font-semibold hover:bg-slate-800 transition-all"
      >
        GitHub
      </a>
    </div>
  </div>
);

const About = ({ t }) => (
  <div className="max-w-4xl mx-auto p-8 animate-in fade-in duration-500">
    <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-2">
      {t.aboutTitle}
    </h2>
    <p className="text-slate-300 leading-relaxed mb-8 text-lg">{t.aboutText}</p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-800">
        <h3 className="text-xl font-bold text-white mb-3">{t.eduTitle}</h3>
        <p className="text-slate-400">{t.eduText}</p>
      </div>
      <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-800">
        <h3 className="text-xl font-bold text-white mb-3">{t.features}</h3>
        <ul className="text-slate-400 space-y-2 list-disc list-inside">
          <li>{t.feat1}</li>
          <li>{t.feat2}</li>
          <li>{t.feat3}</li>
        </ul>
      </div>
    </div>

    <Link
      to="/"
      className="text-slate-500 hover:text-white mt-12 inline-block transition-colors italic"
    >
      ← {t.navHome}
    </Link>
  </div>
);

function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const toggleLang = () => setLang(lang === 'en' ? 'pt' : 'en');

  return (
    <HashRouter>
      <nav className="p-6 bg-[#191724]/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center border-b border-slate-800">
        <div className="flex gap-8 items-center">
          <span className="font-bold tracking-tighter text-xl text-white">
            NK<span className="text-slate-500">.JSX</span>
          </span>
          <div className="hidden md:flex gap-6 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              {t.navHome}
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              {t.navAbout}
            </Link>
          </div>
        </div>

        <button
          onClick={toggleLang}
          className="text-xs font-mono border border-slate-700 px-3 py-1 rounded hover:bg-slate-800 transition-colors uppercase tracking-widest text-slate-300"
        >
          {t.langBtn}
        </button>
      </nav>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/about" element={<About t={t} />} />
        </Routes>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} NK-JSX — Anselmo Sammarco (Céo)
      </footer>
    </HashRouter>
  );
}

createRoot(document.getElementById('app_root')).render(<App />);

