"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/I18nContext';

export default function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { t } = useTranslation();

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            const stackLayers = gsap.utils.toArray('.expertise-layer', sectionRef.current);

            stackLayers.forEach((layer, i) => {
                if (i === stackLayers.length - 1) return;

                gsap.to(layer as HTMLElement, {
                    scale: 0.9,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: stackLayers[i + 1] as HTMLElement,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                    }
                });
            });
        }
    }, { scope: sectionRef });

    return (
        <section id="expertise" ref={sectionRef} className="pt-32 pb-12 overflow-clip bg-[#000814] relative z-20">
            <div className="container mx-auto px-6">

                {/* Header Técnico */}
                <div className="mb-20 text-left">
                    <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-accent block mb-4">
                        {t('exp_report')}
                    </span>
                    <h2
                        className="text-4xl md:text-7xl font-jakarta font-black title-monolithic uppercase"
                        dangerouslySetInnerHTML={{ __html: t('exp_title') }}
                    />
                </div>

                <div className="expertise-stack-container relative pb-[10vh]">

                    {/* ================= LAYER 1: FRONT-END (8:4) ================= */}
                    <div className="expertise-layer sticky top-[15vh] mb-[15vh] origin-top will-change-transform bg-[#000814] rounded-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full p-4 md:p-8 bg-[#000814] rounded-[2rem]">
                            <div className="bento-card lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 hidden md:flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="grid grid-cols-3 gap-12 relative z-10 w-full h-full p-4">
                                        {[0.1, 0.4, 0.2, 0.5, 0, 0.8, 0.3, 0.6, 0.9].map((delay, i) => (
                                            <div key={i} className={`${i === 4 ? 'w-4 h-4 bg-white shadow-[0_0_20px_#fff]' : 'w-2.5 h-2.5 bg-cyan-400'} rounded-full place-self-center`}
                                                style={{ animation: i === 4 ? 'none' : `node-pulse 2s infinite ${delay}s` }}></div>
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 border border-cyan-400/20 rounded-2xl"></div>
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee]" style={{ animation: 'matrix-scan 4s ease-in-out infinite' }}></div>
                                </div>
                                <div className="relative z-10 max-w-md">
                                    <div className="flex gap-4 mb-6 text-3xl">
                                        <Icon icon="simple-icons:html5" className="text-[#e34f26]" />
                                        <Icon icon="simple-icons:css3" className="text-[#1572b6]" />
                                        <Icon icon="simple-icons:javascript" className="text-[#f7df1e]" />
                                    </div>
                                    <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">{t('exp1_tag')}</span>
                                    <h3 className="text-3xl md:text-5xl font-bold uppercase mb-4 text-white leading-none" dangerouslySetInnerHTML={{ __html: t('exp1_title') }} />
                                    <p className="text-neutral-400 text-sm md:text-base mb-6 leading-relaxed">{t('exp1_desc')}</p>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex flex-col gap-6">
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="simple-icons:tailwindcss" className="text-4xl text-[#38bdf8] mb-4" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Tailwind CSS</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp1a_desc')}</p>
                                    </div>
                                </div>
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="simple-icons:github" className="text-4xl text-white opacity-50 group-hover:opacity-100 transition-all" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Architecture</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp1b_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= LAYER 2: AI ORCHESTRATION (4:8) ================= */}
                    <div className="expertise-layer sticky top-[18vh] mb-[15vh] origin-top will-change-transform bg-[#000814] rounded-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden z-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full p-4 md:p-8 bg-[#000814] rounded-[2rem]">
                            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="simple-icons:python" className="text-4xl text-[#f7c02b] mb-4" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Python Core</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp2a_desc')}</p>
                                    </div>
                                </div>
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="solar:magic-stick-3-bold-duotone" className="text-4xl text-[#8b5cf6] mb-4" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Cursor AI</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp2b_desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10 order-1 lg:order-2">

                                {/* MOTOR DE SONAR / NEURAL CORE CENTRALIZADO */}
                                <div className="absolute right-20 top-24 w-48 h-48 hidden md:flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">

                                    {/* Ponto Central */}
                                    <div className="absolute w-4 h-4 bg-accent rounded-full shadow-[0_0_30px_rgba(59,130,246,1)] z-10 animate-pulse"></div>

                                    {/* Anéis de Sonar (Centralizados) */}
                                    <div className="absolute w-24 h-24 border border-accent/60 rounded-full pulse-ring-1"></div>
                                    <div className="absolute w-24 h-24 border border-accent/40 rounded-full pulse-ring-2"></div>

                                    {/* Quadrado Rotativo (CORRIGIDO: Agora centralizado com o ponto) */}
                                    <div className="absolute w-24 h-24 border border-cyan-400/20 rounded-2xl animate-spin-slow" style={{ animation: 'neural-ring 12s infinite linear' }}></div>

                                    {/* Badge de Status Ativo */}
                                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-mono text-[8px] font-bold text-cyan-400 tracking-[0.3em] uppercase bg-cyan-400/5 px-3 py-1 rounded border border-cyan-400/20 whitespace-nowrap shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                                        10X_ENGINE_ACTIVE
                                    </div>
                                </div>

                                <div className="relative z-10 max-w-md mt-auto">
                                    <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">{t('exp2_tag')}</span>
                                    <h3 className="text-3xl md:text-5xl font-jakarta font-bold uppercase mb-4 text-white leading-none" dangerouslySetInnerHTML={{ __html: t('exp2_title') }} />
                                    <p className="text-neutral-400 font-light text-sm md:text-base mb-6 leading-relaxed">{t('exp2_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= LAYER 3: MOTION & UX (8:4) ================= */}
                    <div className="expertise-layer sticky top-[21vh] mb-[10vh] origin-top will-change-transform bg-[#000814] rounded-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden z-30">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full p-4 md:p-8 bg-[#000814] rounded-[2rem]">
                            <div className="bento-card lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                <div className="absolute right-12 bottom-12 h-16 w-32 hidden md:flex items-end gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
                                    {[1.2, 0.8, 1.5, 1.1, 0.9].map((dur, i) => (
                                        <div key={i} className="eq-bar" style={{ animation: `equalize ${dur}s ease-in-out infinite` }}></div>
                                    ))}
                                </div>
                                <div className="relative z-10 max-w-xl">
                                    <Icon icon="simple-icons:greensock" className="text-5xl text-[#88ce02] mb-8" />
                                    <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">{t('exp3_tag')}</span>
                                    <h3 className="text-3xl md:text-5xl font-bold uppercase mb-4 text-white leading-none" dangerouslySetInnerHTML={{ __html: t('exp3_title') }} />
                                    <p className="text-neutral-400 font-light text-sm md:text-base mb-6 leading-relaxed">{t('exp3_desc')}</p>
                                </div>
                            </div>
                            <div className="lg:col-span-4 flex flex-col gap-6">
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="solar:mouse-circle-bold-duotone" className="text-4xl text-[#22d3ee] mb-4" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Lenis Smooth</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp3a_desc')}</p>
                                    </div>
                                </div>
                                <div className="bento-card p-6 flex-1 flex flex-col justify-between group relative overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-[24px] border border-white/10">
                                    <Icon icon="solar:stars-bold-duotone" className="text-4xl text-[#ec4899] mb-4" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-lg mb-1">Vibe Design</h4>
                                        <p className="text-neutral-400 text-xs">{t('exp3b_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}