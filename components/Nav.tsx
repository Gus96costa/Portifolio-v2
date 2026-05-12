"use client";

import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from '@/context/I18nContext';
import { useSmoothScroll } from '@/components/SmoothScroll';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  // INJEÇÃO DO MOTOR DE IDIOMAS
  const { language, setLanguage, t } = useTranslation();
  const lenis = useSmoothScroll();

  useGSAP(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      if (navRef.current) {
        ScrollTrigger.create({
          start: "top -50",
          end: 99999,
          toggleClass: { className: "nav-scrolled", targets: navRef.current }
        });
      }
    }
  }, { scope: navRef });

  const handleNavClick = (e: React.MouseEvent, target: string | number, offset: number = 0) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      if (target === 0) {
        lenis ? lenis.scrollTo(0, { duration: 1.5 }) : window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (lenis) {
        lenis.scrollTo(target, { 
          duration: 1.5, 
          offset: offset,
          onComplete: () => {
            if (target === '#magnetic-area') {
              // Pequeno delay para garantir que o scroll estabilizou antes de abrir o modal
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('open-contact-modal'));
              }, 100);
            }
          }
        });
      } else {
        const element = document.querySelector(target as string);
        if (element) {
          window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
          if (target === '#magnetic-area') {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }, 1000);
          }
        }
      }
    }
  };

  return (
    <>
      {/* Seletor de Idiomas */}
      <div className="fixed top-6 right-6 z-[300] pointer-events-none">
        <div className="group/lang relative pointer-events-auto">
          <button aria-label="Alterar idioma" className="flex items-center gap-2 glass-box-clean px-4 py-2 rounded-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
            <Icon icon="solar:globe-bold-duotone" className="text-cyan-400 text-sm" />
            <span className="font-mono text-[10px] font-bold text-white tracking-widest uppercase">
              {language}
            </span>
            <Icon icon="solar:alt-arrow-down-linear" className="text-white/30 text-[10px]" />
          </button>

          <div className="absolute top-full right-0 pt-3 w-16 opacity-0 translate-y-2 pointer-events-none group-hover/lang:opacity-100 group-hover/lang:translate-y-0 group-hover/lang:pointer-events-auto transition-all duration-300">
            <div className="glass-box-clean p-2 shadow-2xl flex flex-col gap-0.5">
              <button onClick={() => setLanguage('pt')} className="w-full font-mono text-[10px] font-bold text-white hover:text-cyan-400 py-1.5 block text-center rounded hover:bg-white/5 transition-colors">PT</button>
              <button onClick={() => setLanguage('en')} className="w-full font-mono text-[10px] font-bold text-white/50 hover:text-cyan-400 py-1.5 block text-center rounded hover:bg-white/5 transition-colors">EN</button>
              <button onClick={() => setLanguage('es')} className="w-full font-mono text-[10px] font-bold text-white/50 hover:text-cyan-400 py-1.5 block text-center rounded hover:bg-white/5 transition-colors">ES</button>
              <button onClick={() => setLanguage('sl')} className="w-full font-mono text-[10px] font-bold text-white/50 hover:text-cyan-400 py-1.5 block text-center rounded hover:bg-white/5 transition-colors">SL</button>
            </div>
          </div>
        </div>
      </div>

      {/* Header Fixo */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-fit max-w-5xl transition-all duration-500">
        <nav ref={navRef} id="nav" className="nav-beam relative px-4 py-1.5 flex items-center gap-6 md:gap-8 rounded-full border border-white/5 transition-all duration-300">

          <div className="flex items-center cursor-pointer" onClick={(e) => handleNavClick(e, 0)}>
            <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 group">
              <div className="w-3 h-3 bg-black rounded-sm rotate-45 transition-transform group-hover:rotate-90"></div>
            </div>
            <span className="hidden" aria-hidden="true">Vibedesign.</span>
          </div>

          <div className="hidden md:flex gap-6 lg:gap-8">
            <a href="#hero" onClick={(e) => handleNavClick(e, 0)} className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
              {t('nav_home')}
            </a>
            <a href="#work-anchor" onClick={(e) => handleNavClick(e, '#work-anchor', 400)} className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
              {t('nav_work')}
            </a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline', 80)} className="text-[9px] font-bold uppercase tracking-[0.2em] hover:text-cyan-400 transition-colors">
              {t('nav_journey')}
            </a>
          </div>

          <div>
            <button onClick={(e) => handleNavClick(e, '#magnetic-area', -150)} className="glass-btn px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transform transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
              <span className="relative z-10 font-bold text-white group-hover:text-black transition-colors duration-300">
                {t('nav_contact')}
              </span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

        </nav>
      </header>
    </>
  );
}