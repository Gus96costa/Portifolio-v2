"use client";

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/I18nContext';
import { useSmoothScroll } from '@/components/SmoothScroll';

export default function ShowcaseSection() {
  const { t } = useTranslation();
  const lenis = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const canetaImgRef = useRef<HTMLImageElement>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !sectionRef.current || !wrapperRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    if (canetaImgRef.current) {
      const frameCount = 192;
      const frames = { frame: 1 };

      gsap.to(frames, {
        frame: frameCount,
        snap: "frame",
        repeat: -1,
        duration: 4,
        ease: "none",
        onUpdate: () => {
          const frameNumber = frames.frame.toString().padStart(4, '0');
          if (canetaImgRef.current) {
            canetaImgRef.current.src = `/assets/img/caneta-img/frame_${frameNumber}.webp`;
          }
        }
      });
    }

    mm.add("(min-width: 769px)", () => {
      gsap.set(".projects-horizontal-wrapper", { opacity: 0, y: 50 });

      const showcaseTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      showcaseTl.fromTo(".showcase-header",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      ).to(".projects-horizontal-wrapper", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "<");

      showcaseTl.addLabel("startScroll");

      showcaseTl.to(".projects-horizontal-wrapper", {
        x: () => -(wrapperRef.current!.offsetWidth - window.innerWidth),
        ease: "none",
        duration: 4
      }, "startScroll");

      const parallaxCards = gsap.utils.toArray(".card-parallax-deep", sectionRef.current);
      parallaxCards.forEach((card, index) => {
        const timeOffset = index * 1.4;
        showcaseTl.from(card as HTMLElement, {
          x: 70,
          ease: "power2.out",
          duration: 1.5
        }, `startScroll+=${timeOffset}`);
      });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set(".projects-horizontal-wrapper", { opacity: 1, x: 0, y: 0, height: "auto", width: "100%", display: "block", position: "relative" });
      gsap.set(".project-slide", { width: "100%", height: "auto", padding: "60px 24px" });
      gsap.set(".showcase-header", { position: "relative", opacity: 1, padding: "80px 24px 40px" });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const handleExpand = (id: string, e: React.MouseEvent) => {
    // PROTEÇÃO ATUALIZADA: Ignora se o clique for no novo botão de fechar
    if ((e.target as HTMLElement).closest('.btn-close-project')) return;
    if (expandedId !== id) {
      setExpandedId(id);
      if (lenis) lenis.stop();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Bloqueia a propagação para o container pai
    setExpandedId(null);
    if (lenis) lenis.start();
  };

  return (
    <section id="showcase" ref={sectionRef} className="relative w-full h-screen overflow-hidden z-[110] bg-[#000814]">

      <style dangerouslySetInnerHTML={{
        __html: `
          @media (min-width: 768px) {
              .grid-accordion { display: grid; grid-template-columns: 6fr 3fr 3fr; }
              .grid-accordion.expanded { grid-template-columns: 9fr 1.5fr 1.5fr; }
          }
          @keyframes crossfade-1 { 0%, 25% { opacity: 1; } 30%, 95% { opacity: 0; } 100% { opacity: 1; } }
          @keyframes crossfade-2 { 0%, 20% { opacity: 0; } 25%, 50% { opacity: 1; } 55%, 100% { opacity: 0; } }
          @keyframes crossfade-3 { 0%, 45% { opacity: 0; } 50%, 75% { opacity: 1; } 80%, 100% { opacity: 0; } }
          @keyframes crossfade-4 { 0%, 70% { opacity: 0; } 75%, 100% { opacity: 1; } }
          .animate-crossfade-1 { animation: crossfade-1 16s infinite; }
          .animate-crossfade-2 { animation: crossfade-2 16s infinite; }
          .animate-crossfade-3 { animation: crossfade-3 16s infinite; }
          .animate-crossfade-4 { animation: crossfade-4 16s infinite; }
      `}} />

      <div className="showcase-header absolute top-10 md:top-14 left-10 md:left-24 z-50 pointer-events-none text-left">
        <h2 className="hero-text text-glass title-monolithic text-3xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] font-black uppercase mb-4" dangerouslySetInnerHTML={{ __html: t('portfolio_title1') }} />
        <div className="mt-4 flex items-center gap-4 opacity-40">
          <div className="h-px w-12 bg-blue-500"></div>
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white">{t('showcase_sub')}</span>
        </div>
      </div>

      <div ref={wrapperRef} className="projects-horizontal-wrapper absolute inset-0 flex flex-nowrap h-screen w-[300vw] will-change-transform z-10 pt-24 md:pt-32 pb-24 md:pb-32">

        {/* ================= GRELHA 01: ZMAJ DESIGN ================= */}
        <section className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24">
          <div className={`flex flex-col grid-accordion gap-8 w-full max-w-[1600px] mx-auto h-[55vh] transition-[grid-template-columns] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${expandedId === 'zmaj' ? 'expanded' : ''}`} onClick={(e) => handleExpand('zmaj', e)}>

            {/* ADICIONADO Z-30 AQUI */}
            <div className="bento-card relative z-30 overflow-hidden group border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500 rounded-[2rem] bg-[#000814]">
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/zmaj-cortes.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>

              <div className={`absolute top-8 left-8 z-30 transition-all duration-500 transform ${expandedId === 'zmaj' ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 pointer-events-none'}`}>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/30 rounded-full backdrop-blur-md">
                  <Icon icon="solar:info-circle-bold-duotone" className="text-cyan-400 text-xs" />
                  <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-400 ${expandedId === 'zmaj' ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-[400ms]'}`}>
                <div className="text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome1')}</div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-cyan-400 group-hover:text-white transition-colors duration-500">Zmaj Design</h3>
              </div>

              <div className={`absolute inset-0 z-40 flex flex-col justify-center px-8 md:px-12 md:pr-[45%] transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'zmaj' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ background: 'linear-gradient(to right, #000814 0%, rgba(0, 8, 20, 0.95) 45%, transparent 100%)' }}>

                {/* BOTÃO NATIVO 'X' DE SAÍDA - CORRIGIDO E BLINDADO */}
                <button type="button" className="btn-close-project absolute top-6 md:top-8 right-6 md:right-8 z-[60] flex flex-col items-center gap-2 cursor-pointer group/close pointer-events-auto" onClick={handleClose}>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-[#000814]/60 backdrop-blur-md flex items-center justify-center group-hover/close:bg-white group-hover/close:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 group-hover/close:text-white">{t('modal_abort')}</span>
                </button>

                <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'zmaj' ? 'translate-x-0 opacity-100 delay-[200ms]' : '-translate-x-10 opacity-0'}`}>
                  <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-400 block mb-6 uppercase">{t('proj_manifesto')}</span>
                  <div className="grid grid-cols-1 gap-6 max-w-lg">
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj1_chal_desc')}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj1_arch_desc')}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                      <p className="text-lg font-jakarta font-bold text-cyan-400">{t('proj1_imp_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bento-card relative overflow-hidden group card-parallax-deep transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 rounded-[2rem] bg-[#000814] ${expandedId === 'zmaj' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-cyan-400/40'}`}>
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/codigo-zmaj.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
              <div className={`absolute bottom-0 left-0 p-8 z-20 transition-opacity duration-400 ${expandedId === 'zmaj' ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-cyan-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_logic')}</div>
                <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-cyan-400">{t('proj_code')}</h4>
              </div>
            </div>

            <div className={`bento-card p-0 group relative overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 rounded-[2rem] bg-[#000814] ${expandedId === 'zmaj' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-cyan-400/40'}`}>
              <div className="absolute inset-0 w-full h-full">
                <img src="/assets/img/zmaj-img/zmaj (1).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-1" alt="Zmaj 1" />
                <img src="/assets/img/zmaj-img/zmaj (2).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-2" alt="Zmaj 2" />
                <img src="/assets/img/zmaj-img/zmaj (3).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-3" alt="Zmaj 3" />
                <img src="/assets/img/zmaj-img/zmaj (4).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-4" alt="Zmaj 4" />
              </div>
              <div className={`absolute bottom-4 right-4 z-20 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all duration-400 px-3 py-1.5 ${expandedId === 'zmaj' ? 'opacity-0' : 'opacity-100 group-hover:border-cyan-400/50'}`}>
                <span className="text-cyan-400 font-mono text-[10px] font-bold leading-none tracking-widest uppercase">{t('btn_explore')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GRELHA 02: PEN ARTOOLS ================= */}
        <section className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24 -ml-16 z-20">
          <div className={`flex flex-col grid-accordion gap-8 w-full max-w-[1600px] mx-auto h-[55vh] transition-[grid-template-columns] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${expandedId === 'pen' ? 'expanded' : ''}`} onClick={(e) => handleExpand('pen', e)}>

            {/* ADICIONADO Z-30 AQUI */}
            <div className="bento-card relative z-30 overflow-hidden group border border-white/10 hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] transition-all duration-500 rounded-[2rem] bg-[#000814]">
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/canetasite-video.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>

              <div className={`absolute top-8 left-8 z-30 transition-all duration-500 transform ${expandedId === 'pen' ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 pointer-events-none'}`}>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full backdrop-blur-md">
                  <Icon icon="solar:info-circle-bold-duotone" className="text-pink-500 text-xs" />
                  <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-400 ${expandedId === 'pen' ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-[400ms]'}`}>
                <div className="text-pink-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome2')}</div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-pink-500 group-hover:text-white transition-colors duration-500">Pen Artools</h3>
              </div>

              <div className={`absolute inset-0 z-40 flex flex-col justify-center px-8 md:px-12 md:pr-[45%] transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'pen' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ background: 'linear-gradient(to right, #000814 0%, rgba(0, 8, 20, 0.95) 45%, transparent 100%)' }}>

                {/* BOTÃO NATIVO 'X' DE SAÍDA - CORRIGIDO E BLINDADO */}
                <button type="button" className="btn-close-project absolute top-6 md:top-8 right-6 md:right-8 z-[60] flex flex-col items-center gap-2 cursor-pointer group/close pointer-events-auto" onClick={handleClose}>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-[#000814]/60 backdrop-blur-md flex items-center justify-center group-hover/close:bg-white group-hover/close:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 group-hover/close:text-white">{t('modal_abort')}</span>
                </button>

                <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'pen' ? 'translate-x-0 opacity-100 delay-[200ms]' : '-translate-x-10 opacity-0'}`}>
                  <span className="font-mono text-[10px] tracking-[0.5em] text-pink-500 block mb-6 uppercase">{t('proj_manifesto')}</span>
                  <div className="grid grid-cols-1 gap-6 max-w-lg">
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj2_chal_desc')}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj2_arch_desc')}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                      <p className="text-lg font-jakarta font-bold text-pink-500">{t('proj2_imp_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bento-card relative overflow-hidden group card-parallax-deep transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 rounded-[2rem] bg-[#000814] ${expandedId === 'pen' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-pink-500/40'}`}>
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/caneta-codigo-video.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
              <div className={`absolute bottom-0 left-0 p-8 z-20 transition-opacity duration-400 ${expandedId === 'pen' ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-pink-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_logic')}</div>
                <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-pink-500">{t('proj_code')}</h4>
              </div>
            </div>

            <div className={`bento-card p-0 group relative overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 rounded-[2rem] bg-[#000814] ${expandedId === 'pen' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-pink-500/40'}`}>
              <div className="absolute inset-0 w-full h-full">
                <img ref={canetaImgRef} src="/assets/img/caneta-img/frame_0001.webp" className="absolute inset-0 w-full h-full object-cover" alt="Caneta Frames" />
              </div>
              <div className={`absolute bottom-4 right-4 z-20 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all duration-400 px-3 py-1.5 ${expandedId === 'pen' ? 'opacity-0' : 'opacity-100 group-hover:border-pink-500/50'}`}>
                <span className="text-pink-500 font-mono text-[10px] font-bold leading-none tracking-widest uppercase">{t('btn_explore')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GRELHA 03: AURA DESIGN SYSTEM ================= */}
        <section className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24 -ml-16 z-10">
          <div className={`flex flex-col grid-accordion gap-8 w-full max-w-[1600px] mx-auto h-[55vh] transition-[grid-template-columns] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${expandedId === 'aura' ? 'expanded' : ''}`} onClick={(e) => handleExpand('aura', e)}>

            {/* ADICIONADO Z-30 AQUI */}
            <div className="bento-card relative z-30 overflow-hidden group border border-white/10 hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] transition-all duration-500 rounded-[2rem] bg-[#000814]">
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/codsystemcortes.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>

              <div className={`absolute top-8 left-8 z-30 transition-all duration-500 transform ${expandedId === 'aura' ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 pointer-events-none'}`}>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-md">
                  <Icon icon="solar:info-circle-bold-duotone" className="text-yellow-400 text-xs" />
                  <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-400 ${expandedId === 'aura' ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-[400ms]'}`}>
                <div className="text-yellow-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome3')}</div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-yellow-400 group-hover:text-white transition-colors duration-500">Aura Design System</h3>
              </div>

              <div className={`absolute inset-0 z-40 flex flex-col justify-center px-8 md:px-12 md:pr-[45%] transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'aura' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ background: 'linear-gradient(to right, #000814 0%, rgba(0, 8, 20, 0.95) 45%, transparent 100%)' }}>

                {/* BOTÃO NATIVO 'X' DE SAÍDA - CORRIGIDO E BLINDADO */}
                <button type="button" className="btn-close-project absolute top-6 md:top-8 right-6 md:right-8 z-[60] flex flex-col items-center gap-2 cursor-pointer group/close pointer-events-auto" onClick={handleClose}>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-[#000814]/60 backdrop-blur-md flex items-center justify-center group-hover/close:bg-white group-hover/close:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/60 group-hover/close:text-white">{t('modal_abort')}</span>
                </button>

                <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === 'aura' ? 'translate-x-0 opacity-100 delay-[200ms]' : '-translate-x-10 opacity-0'}`}>
                  <span className="font-mono text-[10px] tracking-[0.5em] text-yellow-400 block mb-6 uppercase">{t('proj_manifesto')}</span>
                  <div className="grid grid-cols-1 gap-6 max-w-lg">
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj3_chal_desc')}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                      <p className="text-sm text-white leading-relaxed font-light">{t('proj3_arch_desc')}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                      <p className="text-lg font-jakarta font-bold text-yellow-400">{t('proj3_imp_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bento-card relative overflow-hidden group card-parallax-deep transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 rounded-[2rem] bg-[#000814] ${expandedId === 'aura' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-yellow-400/40'}`}>
              <div className="absolute inset-0 z-0 backdrop-blur-[20px]">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <source src="/assets/video/Codsystems.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
              <div className={`absolute bottom-0 left-0 p-8 z-20 transition-opacity duration-400 ${expandedId === 'aura' ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-yellow-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_logic')}</div>
                <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-none text-yellow-400">{t('proj_code')}</h4>
              </div>
            </div>

            <div className={`bento-card p-0 group relative overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-20 rounded-[2rem] bg-[#000814] ${expandedId === 'aura' ? 'grayscale-[80%] brightness-[0.4] pointer-events-none border-white/5' : 'grayscale-0 brightness-100 border border-white/10 hover:border-yellow-400/40'}`}>
              <div className="absolute inset-0 w-full h-full">
                <img src="/assets/img/design-img/design (1).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-1" alt="Aura 1" />
                <img src="/assets/img/design-img/design (2).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-2" alt="Aura 2" />
                <img src="/assets/img/design-img/design (3).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-3" alt="Aura 3" />
                <img src="/assets/img/design-img/design (4).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-4" alt="Aura 4" />
              </div>
              <div className={`absolute bottom-4 right-4 z-20 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center backdrop-blur-xl border border-white/10 transition-all duration-400 px-3 py-1.5 ${expandedId === 'aura' ? 'opacity-0' : 'opacity-100 group-hover:border-yellow-400/50'}`}>
                <span className="text-yellow-400 font-mono text-[10px] font-bold leading-none tracking-widest uppercase">{t('btn_explore')}</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </section>
  );
}