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
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current && wrapperRef.current) {
        const slides = gsap.utils.toArray('.project-slide', wrapperRef.current);

        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + wrapperRef.current?.offsetWidth,
          }
        });

        showcaseTl.fromTo([".showcase-header", wrapperRef.current],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
        )
          .to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "none",
            duration: 4
          })
          .to([".showcase-header", wrapperRef.current], {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.in"
          });
      }

      if (canetaImgRef.current) {
        const frames = { frame: 1 };
        gsap.to(frames, {
          frame: 192,
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
    }
  }, { scope: sectionRef });

  const handleExpand = (id: string) => {
    if (expandedId === id) return;
    setExpandedId(id);
    if (typeof window !== "undefined" && lenis) {
      lenis.stop();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(null);
    if (typeof window !== "undefined" && lenis) {
      lenis.start();
    }
  };

  return (
    <section id="showcase" ref={sectionRef} className="relative w-full h-screen overflow-hidden z-[110] bg-[#000814]">

      <div className="showcase-header absolute top-10 md:top-14 left-10 md:left-24 z-50 pointer-events-none text-left">
        <h2
          className="hero-text text-glass title-monolithic text-3xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] font-black uppercase mb-4"
          dangerouslySetInnerHTML={{ __html: t('portfolio_title1') }}
        />
        <div className="mt-4 flex items-center gap-4 opacity-40">
          <div className="h-px w-12 bg-accent"></div>
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white">{t('showcase_sub')}</span>
        </div>
      </div>

      <div ref={wrapperRef} className="projects-horizontal-wrapper absolute inset-0 flex flex-nowrap h-screen w-[300vw] will-change-transform z-10 pt-24 md:pt-32 pb-24 md:pb-32">

        {/* ======================= PROJETO 01: ZMAJ ======================= */}
        <section id="showcase-content" className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24">          <div
          className={`project-grid-system gap-8 max-w-[1600px] mx-auto h-[55vh] cursor-pointer ${expandedId === 'zmaj' ? 'is-expanded' : ''}`}
          onClick={() => handleExpand('zmaj')}
          aria-label={t('aria_open_details')}
        >
          <div className="bento-card relative overflow-hidden group nav-beam">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/zmaj-cortes.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* Botão Flutuante de Detalhes */}
            <div className={`absolute top-8 left-8 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 ${expandedId === 'zmaj' ? '!opacity-0' : ''}`}>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/30 rounded-full backdrop-blur-md">
                <Icon icon="solar:info-circle-bold-duotone" className="text-cyan-400 text-xs" />
                <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
              </div>
            </div>

            <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-500 ${expandedId === 'zmaj' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome1')}</div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-accent">Zmaj Design</h3>
            </div>

            <div className="manifesto-overlay">
              <div className="close-manifesto" onClick={handleClose}>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </div>
              <div className="manifesto-content">
                <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-400 block mb-6 uppercase">{t('proj_manifesto')}</span>
                <div className="grid grid-cols-1 gap-8 max-w-lg">
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj1_chal_desc')}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj1_arch_desc')}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                    <p className="text-lg font-jakarta font-bold text-cyan-400 uppercase">{t('proj1_imp_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-card relative overflow-hidden group nav-beam z-10 hidden md:block">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/codigo-zmaj.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="text-accent font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj1_logic')}</div>
              <h4
                className="text-2xl font-black uppercase text-accent leading-none"
                dangerouslySetInnerHTML={{ __html: t('proj_code') }}
              />
            </div>
          </div>

          <div className="bento-card p-0 group nav-beam relative overflow-hidden z-20 hidden lg:block bg-[#000814]">
            <div className="absolute inset-0 w-full h-full">
              <img src="/assets/img/zmaj-img/zmaj (1).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-1 transition-all duration-700" alt="Zmaj Photo 1" />
              <img src="/assets/img/zmaj-img/zmaj (2).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-2 transition-all duration-700" alt="Zmaj Photo 2" />
              <img src="/assets/img/zmaj-img/zmaj (3).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-3 transition-all duration-700" alt="Zmaj Photo 3" />
              <img src="/assets/img/zmaj-img/zmaj (4).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-4 transition-all duration-700" alt="Zmaj Photo 4" />
            </div>
          </div>
        </div>
        </section>

        {/* ======================= PROJETO 02: PEN ARTOOLS ======================= */}
        <section className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24">          <div
          className={`project-grid-system gap-8 max-w-[1600px] mx-auto h-[55vh] cursor-pointer ${expandedId === 'pen' ? 'is-expanded' : ''}`}
          onClick={() => handleExpand('pen')}
          aria-label={t('aria_open_details')}
        >
          <div className="bento-card relative overflow-hidden group nav-beam">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/canetasite-video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10 pointer-events-none"></div>

            <div className={`absolute top-8 left-8 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 ${expandedId === 'pen' ? '!opacity-0' : ''}`}>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full backdrop-blur-md">
                <Icon icon="solar:info-circle-bold-duotone" className="text-pink-500 text-xs" />
                <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
              </div>
            </div>

            <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-500 ${expandedId === 'pen' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="text-pink-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome2')}</div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">Pen Artools</h3>
            </div>

            <div className="manifesto-overlay">
              <div className="close-manifesto" onClick={handleClose}>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </div>
              <div className="manifesto-content">
                <span className="font-mono text-[10px] tracking-[0.5em] text-pink-500 block mb-6 uppercase">{t('proj_manifesto')}</span>
                <div className="grid grid-cols-1 gap-8 max-w-lg">
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj2_chal_desc')}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj2_arch_desc')}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                    <p className="text-lg font-jakarta font-bold text-pink-500 uppercase">{t('proj2_imp_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-card relative overflow-hidden group nav-beam z-10 hidden md:block">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/caneta-codigo-video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="text-pink-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj2_logic')}</div>
              <h4
                className="text-2xl font-black uppercase text-pink-500 leading-none"
                dangerouslySetInnerHTML={{ __html: t('proj_code') }}
              />
            </div>
          </div>

          <div className="bento-card p-0 group nav-beam relative overflow-hidden z-20 hidden lg:block bg-[#000814]">
            <img
              ref={canetaImgRef}
              src="/assets/img/caneta-img/frame_0001.webp"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              alt="Pen Sequence 3D"
            />
          </div>
        </div>
        </section>

        {/* ======================= PROJETO 03: AURA SYSTEM ======================= */}
        <section className="project-slide w-screen h-screen flex-shrink-0 flex items-center px-10 md:px-24">          <div
          className={`project-grid-system gap-8 max-w-[1600px] mx-auto h-[55vh] cursor-pointer ${expandedId === 'aura' ? 'is-expanded' : ''}`}
          onClick={() => handleExpand('aura')}
          aria-label={t('aria_open_details')}
        >
          <div className="bento-card relative overflow-hidden group nav-beam">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/codsystemcortes.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10 pointer-events-none"></div>

            <div className={`absolute top-8 left-8 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0 ${expandedId === 'aura' ? '!opacity-0' : ''}`}>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-full backdrop-blur-md">
                <Icon icon="solar:info-circle-bold-duotone" className="text-yellow-400 text-xs" />
                <span className="font-mono text-[8px] font-bold text-white uppercase tracking-[0.2em]">{t('btn_manifesto')}</span>
              </div>
            </div>

            <div className={`absolute bottom-0 left-0 p-10 z-20 transition-opacity duration-500 ${expandedId === 'aura' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="text-yellow-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj_outcome3')}</div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">Aura System</h3>
            </div>

            <div className="manifesto-overlay">
              <div className="close-manifesto" onClick={handleClose}>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
              </div>
              <div className="manifesto-content">
                <span className="font-mono text-[10px] tracking-[0.5em] text-yellow-400 block mb-6 uppercase">{t('proj_manifesto')}</span>
                <div className="grid grid-cols-1 gap-8 max-w-lg">
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_challenge')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj3_chal_desc')}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_arch')}</h4>
                    <p className="text-sm text-white leading-relaxed font-light">{t('proj3_arch_desc')}</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-[10px] font-bold font-mono text-white/40 uppercase tracking-widest mb-2">{t('proj_impact')}</h4>
                    <p className="text-lg font-jakarta font-bold text-yellow-400 uppercase">{t('proj3_imp_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-card relative overflow-hidden group nav-beam z-10 hidden md:block">
            <div className="absolute inset-0 z-0">
              <video suppressHydrationWarning autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000">
                <source src="/assets/video/Codsystems.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div className="text-yellow-400 font-mono text-[10px] tracking-[0.5em] uppercase mb-2">{t('proj3_logic')}</div>
              <h4
                className="text-2xl font-black uppercase text-yellow-400 leading-none"
                dangerouslySetInnerHTML={{ __html: t('proj_code') }}
              />
            </div>
          </div>

          <div className="bento-card p-0 group nav-beam relative overflow-hidden z-20 hidden lg:block bg-[#000814]">
            <div className="absolute inset-0 w-full h-full">
              <img src="/assets/img/design-img/design (1).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-1 transition-all duration-700" alt="Aura Photo 1" />
              <img src="/assets/img/design-img/design (2).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-2 transition-all duration-700" alt="Aura Photo 2" />
              <img src="/assets/img/design-img/design (3).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-3 transition-all duration-700" alt="Aura Photo 3" />
              <img src="/assets/img/design-img/design (4).webp" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-crossfade-4 transition-all duration-700" alt="Aura Photo 4" />
            </div>
          </div>
        </div>
        </section>

      </div>
    </section>
  );
}