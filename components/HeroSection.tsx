"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/I18nContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  // Única alteração técnica: Garantir montagem para o Iconify
  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(() => {
    if (!isClient || !container.current) return;

    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Intro Timeline Original
      const introTl = gsap.timeline();
      introTl
        .from('.hero-text', { duration: 1.2, stagger: 0.2, ease: "expo.out", delay: 0.5 })
        .from('.hero-fade', { duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.8");

      // 2. Órbitas Orgânicas Originais
      gsap.utils.toArray('.orbital-icon').forEach((orb) => {
        const element = orb as HTMLElement;
        const smoothFloat = () => {
          gsap.to(element, {
            x: "random(-25, 25)",
            y: "random(-25, 25)",
            rotation: "random(-8, 8)",
            duration: "random(5, 9)",
            ease: "sine.inOut",
            onComplete: smoothFloat
          });
        };
        smoothFloat();
      });

      // 3. Scroll Parallax com Chuva de Luzes
      gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.1,
          pin: true,
          pinSpacing: true,
        }
      })
        .to(".bg-grain", { y: 60, ease: "none" }, 0)
        .to("#beam-container", { y: -24, ease: "none" }, 0)
        .to(".hero-vignette", { opacity: 0.8, ease: "none" }, 0)
        .to(["#persona-sticker", "#orbitals-container"], {
          y: -150, opacity: 0, scale: 0.9, ease: "power2.in"
        }, 0.1);
    });
  }, { scope: container, dependencies: [isClient] });

  return (
    <section id="hero" ref={container} className="hero-split min-h-screen w-full relative overflow-hidden flex items-center pt-35 pb-2 bg-[#000814] z-10">

      {/* Chuva de Luzes e Background Original */}
      <div className="absolute inset-0 z-0 pointer-events-none" id="beam-container">
        <div className="bg-grain"></div>
        {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((pos, i) => (
          <div key={i} className="beam-fall"
            style={{
              left: `${pos}%`,
              height: `${30 + (i % 3) * 10}vh`,
              animation: `beam-vertical ${5 + (i % 5)}s linear infinite ${i * 0.5}s`
            } as React.CSSProperties}></div>
        ))}
        <div id="persona-backglow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-slate-900/10 rounded-full blur-[200px] z-10"></div>
      </div>

      <div className="hero-vignette"></div>
      <div className="lense-diffusion"></div>

      <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
        <div className="grid grid-cols-12 gap-8 items-center w-full pb-20 perspective-container">

          <div id="hero-content-column" className="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col text-left relative z-40">
            {/* Badge Original */}
            <div className="hero-fade inline-flex w-max mb-4 px-4 py-1.5 border border-white/20 rounded-full text-[11px] font-mono tracking-widest uppercase backdrop-blur-md bg-white/5 items-center gap-3 text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-cyan-400 font-bold uppercase">Gustavo Soares</span>
              <span className="text-white/30">//</span>
              <span className="text-white/80">{t('hero_role')}</span>
            </div>

            <h1 id="hero-main-title" className="font-jakarta flex flex-col gap-1 md:gap-2">
              <span className="hero-text text-glass text-[2rem] md:text-[4.8rem] font-black leading-[0.95] uppercase">{t('hero_t1')}</span>
              <span className="hero-text text-glass-cyan text-[1.2rem] md:text-[2.8rem] font-extrabold leading-[1] uppercase">{t('hero_t2')}</span>
            </h1>

            <div className="hero-fade mt-6 mb-6 max-w-xl">
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('hero_desc') }} />
            </div>

            {/* BOTÃO RESTAURADO: Tamanho e estilo originais */}
            <button id="magnetic-btn-hero" className="hero-fade glass-btn nav-beam w-fit px-6 py-3 rounded-full flex items-center gap-3 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105">
              <span className="relative z-10">{t('hero_cta')}</span>
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* FOTO E DISPOSIÇÃO DE ÍCONES ORIGINAIS */}
      <div className="absolute bottom-0 right-[-10%] md:right-[-15%] w-full md:w-[75vw] h-[60vh] md:h-[95vh] flex justify-end items-end pointer-events-none z-30">
        <Image
          id="persona-sticker"
          src="/assets/img/foto-perfil.webp"
          alt={t('alt_hero_img')}
          width={1000}
          height={1200}
          priority
          className="hero-fade h-full w-auto object-contain object-bottom"
          style={{ filter: 'contrast(1.1) brightness(1.08)' }}
        />

        {isClient && (
          <div id="orbitals-container" className="absolute inset-0 z-30">
            {[
              { id: 'react', icon: 'logos:react', pos: 'top-[35%] right-[62%]' },
              { id: 'ts', icon: 'logos:typescript-icon', pos: 'top-[32%] right-[35%]' },
              { id: 'python', icon: 'logos:python', pos: 'bottom-[32%] right-[59%]' },
              { id: 'gemini', icon: 'logos:google-bard-icon', pos: 'top-[15%] right-[69%]' },
              { id: 'next', icon: 'simple-icons:nextdotjs', pos: 'top-[12%] right-[35%]', color: 'text-white' },
              { id: 'tailwind', icon: 'logos:tailwindcss-icon', pos: 'bottom-[20%] right-[75%]' },
              { id: 'gsap', icon: 'simple-icons:greensock', pos: 'top-[45%] right-[40%]', color: 'text-[#88ce02]' },
              { id: 'django', icon: 'logos:django-icon', pos: 'bottom-[30%] right-[30%]' },
              { id: 'framer', icon: 'logos:framer', pos: 'top-[45%] left-[20%]' }
            ].map((item) => (
              <div key={item.id} className={`orbital-icon absolute z-50 ${item.pos} opacity-80`}>
                <div className="group relative w-14 h-14 flex items-center justify-center glass-panel backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl pointer-events-auto transition-all duration-300 hover:border-cyan-400/50">
                  <Icon icon={item.icon} className={`w-8 h-8 ${item.color || ''}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-6 opacity-50 z-10">
        <div className="h-[2px] w-20 bg-accent"></div>
        <span className="text-[9px] font-mono uppercase tracking-[0.4em]">
          Gustavo Soares // {t('hero_year')}
        </span>
      </div>
    </section>
  );
}