"use client";

import { useEffect, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Criamos o Contexto para prover a instância do Lenis globalmente
export const ScrollContext = createContext<Lenis | null>(null);

// Hook customizado para consumir o scroll
export const useSmoothScroll = () => useContext(ScrollContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Instancia o motor com as curvas matemáticas originais
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.1,
        });

        // Define a instância no estado para o Provider
        setLenisInstance(lenis);

        // Sincronização crítica com o GSAP
        lenis.on('scroll', ScrollTrigger.update);

        const tickerFn = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerFn);
            lenis.destroy();
            setLenisInstance(null);
        };
    }, []);

    return (
        <ScrollContext.Provider value={lenisInstance}>
            {children}
        </ScrollContext.Provider>
    );
}