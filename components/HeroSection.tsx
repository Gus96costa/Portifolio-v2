"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/I18nContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Intro Timeline
      const introTl = gsap.timeline();
      introTl
        .from('.hero-text', { duration: 1.2, stagger: 0.2, ease: "expo.out", delay: 0.5 })
        .to('#orbitals-container', { opacity: 1, duration: 0.2, ease: "power1.out" }, 0.2)
        .from('.hero-fade', { duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.8");

      // 2. Órbitas Orgânicas (Flutuação Recursiva Fluida)
      gsap.utils.toArray('.orbital-icon').forEach((orb) => {
        const element = orb as HTMLElement;
        const smoothFloat = () => {
          gsap.to(element, {
            x: "random(-25, 25)",
            y: "random(-25, 25)",
            rotation: "random(-8, 8)",
            duration: "random(5, 9)", // Tempos longos e variáveis para não parecer apressado
            ease: "sine.inOut",       // Curva de aceleração/desaceleração natural
            onComplete: smoothFloat   // Ao terminar, chama a si mesmo para um novo destino
          });
        };

        // Inicia a flutuação
        smoothFloat();
      });

      // 3. ScrollTrigger Parallax
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      heroScrollTl
        .to({}, { duration: 0.5 })
        .to(".bg-grain", { y: 60, ease: "none" }, 0)
        .to("#beam-container", { y: -24, ease: "none" }, 0)
        .to(".hero-vignette", { opacity: 0.8, ease: "none" }, 0)
        .to(["#persona-sticker", "#orbitals-container"], {
          y: -150, opacity: 0, scale: 0.9, ease: "power2.in"
        }, 0.2)
        .to("#hero-content-column", {
          y: -100, opacity: 0, ease: "power2.in"
        }, 0.3)
        .to([".lense-diffusion", "#beam-container", ".hero-vignette", ".bg-grain"], {
          opacity: 0, scale: 0.95, pointerEvents: "none", duration: 0.4, ease: "power2.inOut"
        }, 0.6)
        .to("#persona-backglow", {
          scale: 1.3, opacity: 0.3, backgroundColor: "#0673d8", duration: 1, ease: "power2.inOut"
        }, 0);

      // 4. Parallax Magnético do Mouse
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth > 1024) {
          const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
          const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to('#persona-sticker', {
            x: xNorm * 25, y: yNorm * 10, rotateY: xNorm * 5, duration: 1.5, ease: "power3.out"
          });

          gsap.utils.toArray('.orbital-icon').forEach((orb, i) => {
            const element = orb as HTMLElement;
            gsap.to(element, {
              x: xNorm * (20 + i * 5),
              y: yNorm * (15 + i * 5),
              duration: 1.2,
              ease: "power2.out",
              overwrite: "auto"
            });
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });
  }, { scope: container });

  return (
    <section
      id="hero"
      ref={container}
      className="hero-split min-h-screen w-full relative overflow-hidden flex items-center pt-35 pb-2 bg-[#000814] z-10"
    >
      <div className="absolute inset-0 z-0 pointer-events-none" id="beam-container">
        <div className="bg-grain"></div>
        <div className="beam-fall left-[5%] h-[30vh]" style={{ animation: 'beam-vertical 7s linear infinite 1s' }}></div>
        <div className="beam-fall left-[15%] h-[40vh]" style={{ animation: 'beam-vertical 8s linear infinite 0s' }}></div>
        <div className="beam-fall left-[25%] h-[50vh]" style={{ animation: 'beam-vertical 10s linear infinite 3s' }}></div>
        <div className="beam-fall left-[35%] h-[35vh]" style={{ animation: 'beam-vertical 6s linear infinite 5s' }}></div>
        <div className="beam-fall left-[45%] h-[60vh]" style={{ animation: 'beam-vertical 12s linear infinite 2s' }}></div>
        <div className="beam-fall left-[55%] h-[45vh]" style={{ animation: 'beam-vertical 9s linear infinite 1.5s' }}></div>
        <div className="beam-fall left-[65%] h-[25vh]" style={{ animation: 'beam-vertical 5s linear infinite 4.5s' }}></div>
        <div className="beam-fall left-[75%] h-[30vh]" style={{ animation: 'beam-vertical 6s linear infinite 4s' }}></div>
        <div className="beam-fall left-[85%] h-[50vh]" style={{ animation: 'beam-vertical 10s linear infinite 1s' }}></div>
        <div className="beam-fall left-[95%] h-[40vh]" style={{ animation: 'beam-vertical 8s linear infinite 2.5s' }}></div>
        <div className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] bg-blue-600/5 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[60vw] h-[60vw] bg-cyan-500/5 rounded-full blur-[200px]"></div>
        <div id="persona-backglow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-slate-900/10 rounded-full blur-[200px] z-10 pointer-events-none"></div>
      </div>

      <div className="hero-vignette"></div>
      <div className="lense-diffusion"></div>

      <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
        <div className="grid grid-cols-12 gap-8 items-center w-full pb-20 perspective-container">
          <div id="hero-content-column" className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col text-left relative z-40 rotate-3d-system">

            {/* Badge (Nome) */}
            <div className="hero-fade inline-flex w-max mb-4 px-4 py-1.5 border border-white/20 rounded-full text-[11px] md:text-[12px] font-mono tracking-widest uppercase backdrop-blur-md bg-white/5 items-center gap-3 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <span className="text-cyan-400 font-bold">GUSTAVO SOARES</span>
              <span className="text-white/30">//</span>
              <span className="text-white/80">{t('hero_role')}</span>
            </div>

            {/* Título Principal Refinado */}
            <div className="relative group select-none -ml-1 md:-ml-2 mb-4 max-w-[95%] lg:max-w-[850px]">
              <h1 id="hero-main-title" className="font-jakarta flex flex-col gap-1 md:gap-2">
                <span className="hero-text text-glass text-shine-hover cursor-default block text-[2rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.8rem] font-black tracking-[-0.04em] leading-[0.95]">
                  {t('hero_t1')}
                </span>
                <span className="hero-text text-glass-cyan text-shine-hover text-shine-cyan cursor-default block text-[1.2rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] font-extrabold tracking-[-0.02em] leading-[1]">
                  {t('hero_t2')}
                </span>
              </h1>
            </div>

            <div className="hero-fade mt-2 mb-6 relative max-w-xl group">
              <div className="absolute -inset-4 bg-cyan-400/10 opacity-0 rounded-xl blur-md group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div className="relative flex gap-4 items-start">
                <div className="flex flex-col items-center mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                  <div className="w-px h-24 bg-gradient-to-b from-cyan-400/40 to-transparent mt-2"></div>
                </div>
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed pb-4 transition-colors duration-500 group-hover:text-gray-100" dangerouslySetInnerHTML={{ __html: t('hero_desc') }} />
              </div>
            </div>

            <button id="magnetic-btn-hero" className="hero-fade glass-btn nav-beam w-fit mt-0 group relative px-6 py-2 rounded-full transition-all flex items-center gap-3 border border-white/10 hover:border-cyan-400/50">
              <span className="relative z-10 font-bold uppercase tracking-[0.15em] text-[10px] text-white group-hover:text-cyan-400 transition-colors">{t('hero_cta')}</span>
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative z-10 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:translate-x-1">
                <svg className="w-3.5 h-3.5 ml-0.5 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 pointer-events-none"></div>
        </div>
      </div>

      <div className="absolute bottom-0 right-[-10%] md:right-[-15%] w-full md:w-[75vw] h-[60vh] md:h-[95vh] flex justify-end items-end pointer-events-none z-30">
        <div className="absolute bottom-40 right-20 w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full pointer-events-none animate-blue-pulse -z-10"></div>

        <Image
          id="persona-sticker"
          src="/assets/img/foto-perfil.webp"
          alt={t('alt_hero_img')}
          width={1000}
          height={1200}
          priority
          className="hero-fade h-full w-auto object-contain object-bottom pointer-events-none select-none transform-gpu will-change-transform"
          style={{
            filter: 'contrast(1.1) brightness(1.08)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        />

        {/* Constelação Tecnológica Oficial (Coordenadas Manuais Preservadas) */}
        <div id="orbitals-container" className="absolute inset-0 z-30 pointer-events-none w-full h-full opacity-0">

          {/* React.js (Substitui Antigravity) */}
          <div className="orbital-icon absolute z-50 top-[35%] right-[62%] pointer-events-none opacity-80">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#61DAFB]/20 group-hover:shadow-[0_0_40px_rgba(97,218,251,0.6)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:react" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">React.js</span>
              </div>
            </div>
          </div>

          {/* TypeScript (Substitui Cursor AI) */}
          <div className="orbital-icon absolute z-50 top-[32%] right-[35%] pointer-events-none opacity-80">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#3178C6]/20 group-hover:shadow-[0_0_40px_rgba(49,120,198,0.6)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:typescript-icon" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">TypeScript</span>
              </div>
            </div>
          </div>

          {/* Python (Substitui Logic_JS) */}
          <div className="orbital-icon absolute z-40 bottom-[32%] right-[59%] pointer-events-none opacity-80">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#FFE873]/20 group-hover:shadow-[0_0_40px_rgba(255,232,115,0.4)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:python" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Python</span>
              </div>
            </div>
          </div>

          {/* Gemini AI (Mantido) */}
          <div className="orbital-icon absolute z-30 top-[15%] right-[69%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-cyan-400/30 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.8)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:google-bard-icon" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Gemini_AI</span>
              </div>
            </div>
          </div>

          {/* Next.js (Substitui Lógica_IA) */}
          <div className="orbital-icon absolute z-40 top-[12%] right-[35%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="simple-icons:nextdotjs" className="w-full h-full text-[32px] text-white opacity-80 group-hover:opacity-100" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Next.js</span>
              </div>
            </div>
          </div>

          {/* Tailwind CSS (Atualizado com logo oficial) */}
          <div className="orbital-icon absolute z-30 bottom-[20%] right-[75%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#38B2AC]/20 group-hover:shadow-[0_0_40px_rgba(56,178,172,0.6)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:tailwindcss-icon" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Tailwind</span>
              </div>
            </div>
          </div>

          {/* GSAP (Mantido com a sua cor verde) */}
          <div className="orbital-icon absolute z-30 top-[45%] right-[40%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#88ce02]/20 group-hover:shadow-[0_0_40px_rgba(136,206,2,0.5)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="simple-icons:greensock" className="w-full h-full text-[32px] text-[#88ce02] opacity-80 group-hover:opacity-100" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">GSAP</span>
              </div>
            </div>
          </div>

          {/* Django (Substitui HTML5) */}
          <div className="orbital-icon absolute z-40 bottom-[30%] right-[30%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-[#092E20]/50 group-hover:shadow-[0_0_40px_rgba(9,46,32,0.8)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:django-icon" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Django</span>
              </div>
            </div>
          </div>

          {/* Framer Motion (Substitui CSS3 na left-[20%]) */}
          <div className="orbital-icon absolute z-30 top-[45%] left-[20%] pointer-events-none opacity-60">
            <div className="group relative w-14 h-14 flex items-center justify-center glass-panel orbital-icon-active backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl hover:scale-110 cursor-pointer pointer-events-auto transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon icon="logos:framer" className="w-full h-full text-[32px]" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-white font-mono text-[8px] tracking-[0.3em] uppercase whitespace-nowrap">Framer</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:absolute md:bottom-12 md:left-12 flex items-center gap-4 md:gap-6 opacity-50 z-10 group hover:opacity-100 transition-opacity duration-500 cursor-default">
        <div className="h-[2px] w-12 md:w-20 bg-accent group-hover:w-28 transition-all duration-700 ease-out"></div>
        <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.4em]">
          <span className="text-white">GUSTAVO SOARES</span> // <span >{t('hero_year')}</span>
        </span>
      </div>
    </section>
  );
}