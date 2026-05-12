"use client";

import { useTranslation } from '@/context/I18nContext';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/components/SmoothScroll';

export default function ScrollGuide() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const { t } = useTranslation();
    const lenis = useSmoothScroll();

    // O CÉREBRO DA OPERAÇÃO: Usamos useRef em vez de useState para
    // garantir que o React não recarregue e não cause glitches no scroll.
    const scrollState = useRef<'down' | 'up'>('down');


    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    const progress = self.progress;
                    // GSAP capta a direção (1 = descendo, -1 = subindo)
                    const direction = self.direction;

                    // 1. ESTILO VISUAL DA BARRA (Sempre a preencher)
                    if (dotRef.current) {
                        gsap.set(dotRef.current, { scaleY: progress });
                    }

                    // 2. LÓGICA DE DIREÇÃO ORIGINAL
                    let newState: 'down' | 'up' = scrollState.current;

                    if (progress >= 0.98) {
                        // Extremo Inferior: Se bateu no rodapé, a única opção é subir.
                        newState = 'up';
                    } else if (progress <= 0.02) {
                        // Extremo Superior: Se bateu no topo, a única opção é descer.
                        newState = 'down';
                    } else {
                        // Meio do Site: Aqui ele escuta o usuário.
                        // Se decidir mudar de direção a meio do caminho, a seta vira imediatamente.
                        if (direction === 1) {
                            newState = 'down';
                        } else if (direction === -1) {
                            newState = 'up';
                        }
                    }

                    // 3. SE O ESTADO REALMENTE MUDAR, APLICA A FÍSICA
                    if (newState !== scrollState.current) {
                        scrollState.current = newState;
                        const isUp = newState === 'up';

                        // A) Gira o componente inteiro de cabeça para baixo
                        gsap.to(wrapperRef.current, {
                            rotate: isUp ? 180 : 0,
                            duration: 0.6,
                            ease: "back.out(1.5)",
                            overwrite: "auto" // Impede que animações encavalitem
                        });

                        // B) Contra-rotação do texto para mantê-lo legível
                        gsap.to(textRef.current, {
                            rotate: isUp ? -180 : 0,
                            opacity: 0,
                            y: isUp ? -5 : 5,
                            duration: 0.3,
                            overwrite: "auto",
                            onComplete: () => {
                                if (textRef.current) {
                                    textRef.current.innerText = isUp ? "TOPO" : "EXPLORAR";
                                }
                                gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.2 });
                            }
                        });
                    }
                }
            });
        }
    }, { scope: wrapperRef }); // Sem dependências [] para o ScrollTrigger ser criado apenas 1 vez e nunca destruído.

    // 4. LÓGICA DE CLIQUE
    const handleScrollAction = () => {
        if (typeof window !== "undefined") {
            if (scrollState.current === 'up') {
                if (lenis) lenis.scrollTo(0, { duration: 1.5 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                if (lenis) lenis.scrollTo(window.innerHeight, { duration: 1.2 });
                else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
            }
        }
    };

    return (
        <div
            ref={wrapperRef}
            onClick={handleScrollAction}
            className="fixed bottom-10 inset-x-0 mx-auto w-fit flex flex-col items-center gap-3 z-[100] cursor-pointer group pointer-events-auto origin-center"
        >
            <span
                ref={textRef}
                className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-colors group-hover:text-white"
            >
                {t('scroll_guide')}
            </span>

            <div className="w-px h-16 bg-white/10 relative overflow-hidden rounded-full">
                <div
                    ref={dotRef}
                    className="absolute top-0 left-0 w-full h-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300 origin-top"
                    style={{ transform: "scaleY(0)" }}
                ></div>
            </div>

            <svg
                className="w-4 h-4 text-cyan-400 animate-bounce mt-1 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}