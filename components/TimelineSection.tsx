"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/context/I18nContext';

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineWrapperRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // 1. TIMELINE DE ENTRADA E SAÍDA DA SEÇÃO
            const sectionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse",
                    scrub: 1
                }
            });

            sectionTl.fromTo(containerRef.current,
                { autoAlpha: 0, y: 50 },
                { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
            )
                .to(containerRef.current,
                    { autoAlpha: 0, y: -50, duration: 1, ease: "power2.in" },
                    "+=2"
                );

            // 2. LINHA DE PROGRESSO (Ancorada e Fluida)
            gsap.to(".timeline-progress", {
                height: '100%',
                ease: "none",
                scrollTrigger: {
                    trigger: timelineWrapperRef.current,
                    start: "top 50%",
                    end: "bottom 50%",
                    scrub: 0.1
                }
            });

            // 3. Spotlight dos Itens (Sem conflito de Transform)
            gsap.utils.toArray('.timeline-item').forEach((item) => {
                const element = item as HTMLElement;
                const dot = element.querySelector('.timeline-dot');
                const year = element.querySelector('.timeline-year');
                const glowBg = element.querySelector('.timeline-glow-bg');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: "top 60%",
                        end: "bottom 40%",
                        toggleActions: "play reverse play reverse",
                    }
                });

                tl.to(dot, { backgroundColor: "#3b82f6", scale: 1.4, boxShadow: "0 0 25px #3b82f6", borderRadius: "50%", duration: 0.4 }, 0)
                    .to(year, { opacity: 1, color: "#3b82f6", textShadow: "0 0 40px rgba(59, 130, 246, 0.6)", scale: 1.05, duration: 0.4 }, 0)
                    .to(glowBg, { opacity: 1, duration: 0.6 }, 0)
                    .to(element.querySelector('h3'), { color: "#fff", duration: 0.4 }, 0)
                    .to(element.querySelector('p'), { color: "#f3f4f6", duration: 0.4 }, 0);
            });
        }
    }, { scope: sectionRef });

    return (
        <section id="timeline" ref={sectionRef} className="py-24 md:py-48 relative px-6 bg-[#000814] z-20">
            <div ref={containerRef} className="container mx-auto">

                {/* Cabeçalho */}
                <div className="text-center mb-32">
                    <h2
                        className="text-4xl md:text-7xl font-black title-monolithic uppercase mb-8"
                        dangerouslySetInnerHTML={{ __html: t('journey_title') }}
                    />
                    <p className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase">
                        {t('timeline_sub')}
                    </p>
                </div>

                <div ref={timelineWrapperRef} className="relative max-w-5xl mx-auto py-20">

                    <div className="timeline-line"></div>
                    <div className="timeline-progress opacity-80" id="timeline-progress"></div>

                    {/* ======================= ITEM 1: 2018/21 ======================= */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center mb-48 timeline-item z-10">
                        <div className="w-full md:w-[45%] md:text-right perspective-container mb-12 md:mb-0">
                            <div className="rotate-3d-system relative timeline-content">
                                <div className="absolute -inset-8 md:-inset-12 bg-accent/5 blur-2xl rounded-[3rem] opacity-0 timeline-glow-bg pointer-events-none transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-neutral-700 font-mono text-xs tracking-widest block mb-4">
                                        {t('time1_tag')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-neutral-500 transition-colors">
                                        {t('time1_title')}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-lg leading-relaxed transition-colors">
                                        {t('time1_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FIX: Container trata do posicionamento / Ponto trata da animação */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center">
                            <div className="w-full h-full bg-white/20 rounded-full border-4 border-[#000814] timeline-dot"></div>
                        </div>

                        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
                            <span className="timeline-year text-white/5 text-[55px] md:text-[80px] lg:text-[100px] font-bold font-mono tracking-tighter select-none leading-none transition-all">
                                2018/21
                            </span>
                        </div>
                    </div>

                    {/* ======================= ITEM 2: 2022/23 ======================= */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center mb-48 timeline-item z-10">
                        <div className="w-full md:w-[45%] flex justify-center md:justify-end order-3 md:order-1">
                            <span className="timeline-year text-white/5 text-[55px] md:text-[80px] lg:text-[100px] font-bold font-mono tracking-tighter select-none leading-none md:text-right transition-all">
                                2022/23
                            </span>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center order-2">
                            <div className="w-full h-full bg-white/20 rounded-full border-4 border-[#000814] timeline-dot"></div>
                        </div>

                        <div className="w-full md:w-[45%] perspective-container order-1 md:order-3 mb-12 md:mb-0">
                            <div className="rotate-3d-system relative timeline-content text-center md:text-left">
                                <div className="absolute -inset-8 md:-inset-12 bg-accent/5 blur-2xl rounded-[3rem] opacity-0 timeline-glow-bg pointer-events-none transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-neutral-700 font-mono text-xs tracking-widest block mb-4">
                                        {t('time2_tag')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-neutral-500 transition-colors">
                                        {t('time2_title')}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-lg leading-relaxed transition-colors">
                                        {t('time2_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================= ITEM 3: 2024/25 ======================= */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center mb-48 timeline-item z-10">
                        <div className="w-full md:w-[45%] md:text-right perspective-container mb-12 md:mb-0">
                            <div className="rotate-3d-system relative timeline-content">
                                <div className="absolute -inset-8 md:-inset-12 bg-accent/5 blur-2xl rounded-[3rem] opacity-0 timeline-glow-bg pointer-events-none transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-neutral-700 font-mono text-xs tracking-widest block mb-4">
                                        {t('time3_tag')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-neutral-500 transition-colors">
                                        {t('time3_title')}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-lg leading-relaxed transition-colors">
                                        {t('time3_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center">
                            <div className="w-full h-full bg-white/20 rounded-full border-4 border-[#000814] timeline-dot"></div>
                        </div>

                        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
                            <span className="timeline-year text-white/5 text-[55px] md:text-[80px] lg:text-[100px] font-bold font-mono tracking-tighter select-none leading-none transition-all">
                                2024/25
                            </span>
                        </div>
                    </div>

                    {/* ======================= ITEM 4: 2025 ======================= */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center mb-48 timeline-item z-10">
                        <div className="w-full md:w-[45%] flex justify-center md:justify-end order-3 md:order-1">
                            <span className="timeline-year text-white/5 text-[55px] md:text-[80px] lg:text-[100px] font-bold font-mono tracking-tighter select-none leading-none md:text-right transition-all">
                                2025
                            </span>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center order-2">
                            <div className="w-full h-full bg-white/20 rounded-full border-4 border-[#000814] timeline-dot"></div>
                        </div>

                        <div className="w-full md:w-[45%] perspective-container order-1 md:order-3 mb-12 md:mb-0">
                            <div className="rotate-3d-system relative timeline-content text-center md:text-left">
                                <div className="absolute -inset-8 md:-inset-12 bg-accent/5 blur-2xl rounded-[3rem] opacity-0 timeline-glow-bg pointer-events-none transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-neutral-700 font-mono text-xs tracking-widest block mb-4">
                                        {t('time4_tag')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-neutral-500 transition-colors">
                                        {t('time4_title')}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-lg leading-relaxed transition-colors">
                                        {t('time4_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================= ITEM 5: 2026 ======================= */}
                    <div className="relative flex flex-col md:flex-row justify-between items-center timeline-item z-10">
                        <div className="w-full md:w-[45%] md:text-right perspective-container mb-12 md:mb-0">
                            <div className="rotate-3d-system relative timeline-content">
                                <div className="absolute -inset-8 md:-inset-12 bg-accent/5 blur-2xl rounded-[3rem] opacity-0 timeline-glow-bg pointer-events-none transition-opacity"></div>
                                <div className="relative z-10">
                                    <span className="text-accent font-mono text-xs tracking-widest block mb-4">
                                        {t('time5_tag')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-sans uppercase mb-6 text-neutral-500 transition-colors">
                                        {t('time5_title')}
                                    </h3>
                                    <p className="text-neutral-600 font-light text-lg leading-relaxed transition-colors">
                                        {t('time5_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 flex items-center justify-center">
                            <div className="w-full h-full bg-white/20 rounded-full border-4 border-[#000814] timeline-dot"></div>
                        </div>

                        <div className="w-full md:w-[45%] flex justify-center md:justify-start">
                            <span className="timeline-year text-white/5 text-[55px] md:text-[80px] lg:text-[100px] font-bold font-mono tracking-tighter select-none leading-none transition-all">
                                2026
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}