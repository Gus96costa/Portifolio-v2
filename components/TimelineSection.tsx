"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/context/I18nContext';

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { t } = useTranslation();

    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // 1. O FIO CONDUTOR (A Barra de Progresso Central)
            // Extraída exatamente do seu comportamento original
            gsap.to("#timeline-progress", {
                height: '100%',
                ease: "none",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top 50%", // Começa a descer quando atinge o meio
                    end: "bottom 50%",
                    scrub: 1
                }
            });

            // 2. MOTOR DE ILUMINAÇÃO (O Radar de Interseção)
            const items = gsap.utils.toArray('.timeline-item', sectionRef.current);
            const accentColor = "#22d3ee"; // O cyan-400 do Vibe Design

            items.forEach((item: any) => {
                const dot = item.querySelector('.timeline-dot');
                const year = item.querySelector('.timeline-year');
                const title = item.querySelector('.timeline-title');
                const desc = item.querySelector('.timeline-desc');
                const glowBg = item.querySelector('.timeline-glow-bg');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 60%", // A "lente" no meio do ecrã
                        end: "bottom 40%",
                        toggleActions: "play reverse play reverse", // Acende e apaga perfeitamente ao subir/descer
                    }
                });

                // GSAP ASSUME O CONTROLO: Sem transições CSS interferindo
                tl.to(dot, {
                    backgroundColor: accentColor,
                    scale: 1.5,
                    boxShadow: `0 0 20px ${accentColor}`,
                    borderColor: "#000814",
                    duration: 0.4,
                    ease: "power2.out"
                }, 0)
                    .to(year, {
                        opacity: 1,
                        color: accentColor,
                        textShadow: `0 0 30px rgba(34, 211, 238, 0.4)`,
                        scale: 1.05,
                        duration: 0.4,
                        ease: "power2.out"
                    }, 0)
                    .to(glowBg, {
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    }, 0)
                    .to(title, {
                        color: "#ffffff",
                        textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                        duration: 0.4
                    }, 0)
                    .to(desc, {
                        color: "#f3f4f6", // Texto acende para um cinza muito claro
                        duration: 0.4
                    }, 0);
            });
        }
    }, { scope: sectionRef });

    const timelineData = [
        { year: "2018/21", tag: "time1_tag", title: "time1_title", desc: "time1_desc", side: "left" },
        { year: "2022/23", tag: "time2_tag", title: "time2_title", desc: "time2_desc", side: "right" },
        { year: "2024/25", tag: "time3_tag", title: "time3_title", desc: "time3_desc", side: "left" },
        { year: "2025", tag: "time4_tag", title: "time4_title", desc: "time4_desc", side: "right" },
        { year: "2026", tag: "time5_tag", title: "time5_title", desc: "time5_desc", side: "left" },
    ];

    return (
        <section id="timeline" ref={sectionRef} className="py-24 md:py-48 relative px-6 bg-[#000814] z-20">
            <div className="container mx-auto">

                {/* Header da Timeline */}
                <div className="text-center mb-32">
                    <h2 className="text-4xl md:text-7xl font-black title-monolithic uppercase mb-8">
                        {t('journey_title')}
                    </h2>
                    <p className="text-neutral-600 font-mono text-[10px] tracking-[0.6em] uppercase">
                        CHRONOLOGICAL PROGRESSION // 2018 - 2026
                    </p>
                </div>

                <div className="timeline-container relative max-w-5xl mx-auto py-20">

                    {/* A Estrutura Central (O Fio) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
                    <div id="timeline-progress" className="absolute left-1/2 top-0 w-[2px] bg-cyan-400 -translate-x-1/2 shadow-[0_0_20px_#22d3ee] h-0"></div>

                    {timelineData.map((item, index) => (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-32 timeline-item ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>

                            {/* Bloco de Texto (Direita ou Esquerda) */}
                            <div className={`w-full md:w-1/2 ${item.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                                <div className="relative">
                                    {/* A Aura de Fundo Original (Oculta por padrão) */}
                                    <div className="absolute -inset-10 bg-cyan-500/5 blur-[40px] rounded-full opacity-0 timeline-glow-bg pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <span className="text-neutral-700 font-mono text-[10px] tracking-widest block mb-4 uppercase font-bold">
                                            {t(item.tag)}
                                        </span>
                                        {/* REMOVI O transition-colors PARA O GSAP COMANDAR */}
                                        <h3 className="timeline-title text-3xl md:text-4xl font-bold font-jakarta uppercase mb-6 text-neutral-600">
                                            {t(item.title)}
                                        </h3>
                                        {/* REMOVI O transition-colors PARA O GSAP COMANDAR */}
                                        <p className="timeline-desc text-neutral-600 font-light text-base md:text-lg leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                                            {t(item.desc)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* O Ponto Físico no Centro */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-5 h-5 flex items-center justify-center">
                                {/* REMOVI O transition-all PARA O GSAP COMANDAR */}
                                <div className="w-full h-full bg-[#000814] rounded-full border-[3px] border-white/20 timeline-dot"></div>
                            </div>

                            {/* O Ano Físico (Oposto ao Texto) */}
                            <div className={`w-full md:w-1/2 flex ${item.side === 'left' ? 'justify-start md:pl-16' : 'justify-end md:pr-16'}`}>
                                {/* REMOVI O transition-all PARA O GSAP COMANDAR */}
                                <span className="timeline-year opacity-30 text-white/10 text-[60px] md:text-[90px] lg:text-[120px] font-black font-mono tracking-tighter select-none leading-none">
                                    {item.year}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}