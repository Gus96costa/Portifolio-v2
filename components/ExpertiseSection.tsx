"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import { useTranslation } from '@/context/I18nContext';

export default function ExpertiseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const mainWrapperRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // 1. TIMELINE MESTRE DE FADE IN / FADE OUT
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            });

            masterTl.fromTo(mainWrapperRef.current,
                { autoAlpha: 0, scale: 0.95 },
                { autoAlpha: 1, scale: 1, duration: 1 }
            )
                .to(mainWrapperRef.current,
                    { autoAlpha: 0, scale: 1.05, duration: 1 },
                    "+=3"
                );

            // 2. Lógica de Stacking
            const layers = gsap.utils.toArray('.expertise-layer');
            layers.forEach((layer, index) => {
                const element = layer as HTMLElement;
                if (index < layers.length - 1) {
                    const nextLayer = layers[index + 1] as HTMLElement;
                    gsap.to(element, {
                        autoAlpha: 0,
                        scale: 0.8,
                        y: "-50px",
                        ease: "power2.inOut",
                        scrollTrigger: {
                            trigger: nextLayer,
                            start: "top bottom-=30%",
                            end: "top top+=10%",
                            scrub: 1,
                        }
                    });
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <>
            <section id="expertise" ref={sectionRef} className="pt-32 pb-12 bg-[#000814] relative z-20 overflow-clip">
                <div ref={mainWrapperRef} className="container mx-auto px-6">

                    <div className="mb-20 text-left">
                        <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-accent block mb-4">
                            {t('exp_report')}
                        </span>
                        <h2
                            className="text-4xl md:text-7xl font-jakarta font-black title-monolithic uppercase"
                            dangerouslySetInnerHTML={{ __html: t('exp_title') }}
                        />
                    </div>

                    <div className="expertise-stack-container mt-12 relative pb-[40vh]">
                        {/* ================= LAYER 1: FRONT-END FOUNDATION ================= */}
                        <div className="expertise-layer sticky top-[10vh] z-10 will-change-transform origin-top mb-[15vh]">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                                <div className="bento-card nav-beam lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">

                                    {/* ANIMAÇÃO ORIGINAL DE NODES RESTAURADA */}
                                    <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 hidden md:flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="grid grid-cols-3 gap-12 relative z-10 w-full h-full p-4">
                                            {[0.1, 0.4, 0.2, 0.5, 0, 0.8, 0.3, 0.6, 0.9].map((delay, i) => (
                                                <div key={i} className={`${i === 4 ? 'w-4 h-4 bg-white shadow-[0_0_20px_#fff]' : 'w-2.5 h-2.5 bg-cyan-400'} rounded-full place-self-center`}
                                                    style={{ animation: i === 4 ? 'none' : `node-pulse 2s infinite ${delay}s` }}></div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 border border-cyan-400/20 rounded-2xl"></div>
                                    </div>

                                    <div className="relative z-10 max-w-md">
                                        <div className="flex gap-4 mb-6 text-3xl opacity-70 group-hover:opacity-100 transition-opacity">
                                            <Icon icon="simple-icons:html5" className="text-[#e34f26]" />
                                            <Icon icon="simple-icons:css3" className="text-[#1572b6]" />
                                            <Icon icon="simple-icons:javascript" className="text-[#f7df1e]" />
                                        </div>
                                        <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">
                                            {t('exp1_tag')}
                                        </span>
                                        <h3
                                            className="text-3xl md:text-5xl font-bold uppercase mb-4 text-white leading-none"
                                            dangerouslySetInnerHTML={{ __html: t('exp1_title') }}
                                        />
                                        <p className="text-neutral-400 text-sm md:text-base mb-6">
                                            {t('exp1_desc')}
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">HTML5 / CSS3</span>
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">ES6+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-4 flex flex-col gap-6">
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <Icon icon="simple-icons:tailwindcss" className="text-4xl text-[#38bdf8] mb-4" />
                                            <h4 className="text-white font-bold uppercase text-lg mb-1">Tailwind CSS</h4>
                                            <p className="text-neutral-400 text-xs">{t('exp1a_desc')}</p>
                                        </div>
                                    </div>
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <Icon icon="simple-icons:github" className="text-4xl text-white mb-4" />
                                            <h4 className="text-white font-bold uppercase text-lg mb-1">Git & GitHub</h4>
                                            <p className="text-neutral-400 text-xs">{t('exp1b_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= LAYER 2: AI ORCHESTRATION ================= */}
                        <div className="expertise-layer sticky top-[15vh] z-20 will-change-transform origin-top mt-12 md:mt-0 mb-[15vh]">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                                <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <Icon icon="simple-icons:python" className="text-4xl text-[#f7c02b] mb-4" />
                                            <h4 className="text-white font-bold uppercase text-lg mb-1">Python Core</h4>
                                            <p className="text-neutral-400 text-xs">{t('exp2a_desc')}</p>
                                        </div>
                                    </div>
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <Icon icon="solar:magic-stick-3-bold-duotone" className="text-4xl text-[#8b5cf6] mb-4" />
                                            <h4 className="text-white font-bold uppercase text-lg mb-1">Cursor AI</h4>
                                            <p className="text-neutral-400 text-xs">{t('exp2b_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bento-card nav-beam lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814] order-1 lg:order-2">

                                    {/* SONAR / NEURAL RING ORIGINAL RESTAURADO */}
                                    <div className="absolute right-20 top-24 w-48 h-48 hidden md:block opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-[0_0_30px_rgba(59,130,246,1)] z-10"></div>
                                        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-solid border-accent/80 rounded-full" style={{ animation: 'neural-ring 3s infinite linear' }}></div>
                                        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-solid border-accent/50 rounded-full" style={{ animation: 'neural-ring 3s infinite linear 1s' }}></div>
                                        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-solid border-cyan-400/30 rounded-full" style={{ animation: 'neural-ring 3s infinite linear 2s' }}></div>
                                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-accent tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)] bg-accent/10 px-3 py-1 rounded border border-accent/30">
                                            10X_ENGINE_ACTIVE
                                        </div>
                                    </div>

                                    <div className="relative z-10 max-w-md mt-auto">
                                        <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">
                                            {t('exp2_tag')}
                                        </span>
                                        <h3
                                            className="text-3xl md:text-5xl font-bold uppercase mb-4 text-white leading-none"
                                            dangerouslySetInnerHTML={{ __html: t('exp2_title') }}
                                        />
                                        <p className="text-neutral-400 text-sm md:text-base mb-6">
                                            {t('exp2_desc')}
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">Prompt Architecture</span>
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">Antigravity Engine</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= LAYER 3: MOTION & UX ================= */}
                        <div className="expertise-layer sticky top-[20vh] z-30 will-change-transform origin-top mt-12 md:mt-0 shadow-[-10px_-20px_50px_rgba(0,8,20,0.8)]">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                                <div className="bento-card nav-beam lg:col-span-8 p-8 md:p-10 min-h-[400px] flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">

                                    {/* EQUALIZADOR 60FPS ORIGINAL RESTAURADO */}
                                    <div className="absolute right-12 bottom-12 h-16 w-32 hidden md:flex items-end justify-end gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="eq-bar" style={{ animation: 'equalize 1.2s ease-in-out infinite' }}></div>
                                        <div className="eq-bar" style={{ animation: 'equalize 0.8s ease-in-out infinite 0.2s' }}></div>
                                        <div className="eq-bar" style={{ animation: 'equalize 1.5s ease-in-out infinite 0.4s' }}></div>
                                        <div className="eq-bar" style={{ animation: 'equalize 1.1s ease-in-out infinite 0.1s' }}></div>
                                        <div className="eq-bar" style={{ animation: 'equalize 0.9s ease-in-out infinite 0.5s' }}></div>
                                        <div className="absolute -top-6 right-0 text-[10px] font-mono text-cyan-400 font-bold">60FPS</div>
                                    </div>

                                    <div className="relative z-10 max-w-md">
                                        <div className="mb-6 text-[#88ce02] opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(136,206,2,0.8)] w-fit">
                                            <Icon icon="simple-icons:greensock" className="text-5xl" />
                                        </div>
                                        <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase block mb-4">
                                            {t('exp3_tag')}
                                        </span>
                                        <h3
                                            className="text-3xl md:text-5xl font-jakarta font-bold uppercase mb-4 text-white leading-none"
                                            dangerouslySetInnerHTML={{ __html: t('exp3_title') }}
                                        />
                                        <p className="text-neutral-400 font-light text-sm md:text-base mb-6">
                                            {t('exp3_desc')}
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">GSAP Timeline</span>
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white uppercase">ScrollTrigger</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 flex flex-col gap-6">
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <div className="mb-4 text-[#22d3ee] opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] w-fit">
                                                <Icon icon="solar:mouse-circle-bold-duotone" className="text-4xl" />
                                            </div>
                                            <span className="font-mono text-[9px] text-accent uppercase block mb-2">{t('exp3a_tag')}</span>
                                            <h3 className="text-xl font-jakarta font-bold uppercase text-white mb-2">Lenis Smooth</h3>
                                            <p className="text-neutral-400 font-light text-xs">{t('exp3a_desc')}</p>
                                        </div>
                                    </div>
                                    <div className="bento-card nav-beam p-6 flex-1 flex flex-col justify-between group relative overflow-hidden border-white/5 bg-[#000814]">
                                        <div>
                                            <div className="mb-4 text-[#ec4899] opacity-70 group-hover:opacity-100 group-hover:text-white transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] w-fit">
                                                <Icon icon="solar:stars-bold-duotone" className="text-4xl" />
                                            </div>
                                            <span className="font-mono text-[9px] text-accent uppercase block mb-2">{t('exp3b_tag')}</span>
                                            <h3 className="text-xl font-jakarta font-bold uppercase text-white mb-2">Vibe Design</h3>
                                            <p className="text-neutral-400 font-light text-xs">{t('exp3b_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================= SECÇÃO DE TELEMETRIA RESTAURADA ================= */}
            <section id="telemetry" className="relative overflow-hidden bg-[#000814] z-20">
                <div className="container mx-auto px-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-y border-white/5 py-16">

                        <div className="text-center md:text-left flex flex-col items-center md:items-start group cursor-default">
                            <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                {t('tele_title1')}
                            </span>
                            <h3 className="text-6xl md:text-7xl font-black font-jakarta text-white mb-4 tracking-tighter transition-all group-hover:-translate-y-1">
                                100<span className="text-cyan-400">/</span>100
                            </h3>
                            <p className="text-neutral-500 font-light text-sm max-w-xs">
                                {t('tele_desc1')}
                            </p>
                        </div>

                        <div className="text-center md:text-left flex flex-col items-center md:items-start md:border-l md:border-white/5 md:pl-12 group cursor-default">
                            <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                {t('tele_title2')}
                            </span>
                            <h3 className="text-6xl md:text-7xl font-black font-jakarta text-white mb-4 tracking-tighter transition-all group-hover:-translate-y-1">
                                &lt;0.4<span className="text-cyan-400">ms</span>
                            </h3>
                            <p className="text-neutral-500 font-light text-sm max-w-xs">
                                {t('tele_desc2')}
                            </p>
                        </div>

                        <div className="text-center md:text-left flex flex-col items-center md:items-start md:border-l md:border-white/5 md:pl-12 group cursor-default">
                            <span className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                {t('tele_title3')}
                            </span>
                            <h3 className="text-6xl md:text-7xl font-black font-jakarta text-white mb-4 tracking-tighter transition-all group-hover:-translate-y-1">
                                10<span className="text-cyan-400">X</span>
                            </h3>
                            <p className="text-neutral-500 font-light text-sm max-w-xs">
                                {t('tele_desc3')}
                            </p>
                        </div>

                    </div>
                </div>

                {/* MARQUEE TECNOLÓGICO */}
                <div className="relative flex overflow-hidden bg-white/[0.02] py-6 border-y border-white/5 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-crosshair">
                    <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#000814] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#000814] to-transparent z-10 pointer-events-none"></div>

                    <div className="animate-marquee flex gap-12 md:gap-16 items-center px-6 font-mono text-sm md:text-lg tracking-[0.3em] uppercase text-white font-bold">
                        {["GSAP", "TAILWIND CSS", "LENIS", "CURSOR AI", "PYTHON", "VERCEL", "TYPESCRIPT", "FIGMA", "GSAP", "TAILWIND CSS", "LENIS", "CURSOR AI", "PYTHON", "VERCEL", "TYPESCRIPT", "FIGMA"].map((tech, i) => (
                            <React.Fragment key={i}>
                                <span className="hover:text-cyan-400 transition-colors">{tech}</span>
                                <span className="text-accent opacity-30">•</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}