"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, bioMessagesDict } from '@/context/I18nContext';
import { useSmoothScroll } from '@/components/SmoothScroll';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function Footer() {
    const { language, t } = useTranslation();
    const lenis = useSmoothScroll();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState<'email' | 'phone' | null>(null);
    const [bioIndex, setBioIndex] = useState(0);

    const footerRef = useRef<HTMLElement>(null);
    const bioRef = useRef<HTMLHeadingElement>(null);
    const magneticAreaRef = useRef<HTMLDivElement>(null);
    const magneticBtnRef = useRef<HTMLButtonElement>(null);

    // --- ANIMAÇÃO DA STREAMING BIO ---
    useEffect(() => {
        const interval = setInterval(() => {
            if (bioRef.current) {
                gsap.to(bioRef.current, {
                    opacity: 0,
                    y: 10,
                    duration: 0.4,
                    onComplete: () => {
                        // Atualiza o índice com base no tamanho do array do idioma atual
                        setBioIndex((prev) => (prev + 1) % bioMessagesDict[language].length);
                        gsap.to(bioRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out"
                        });
                    }
                });
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [language]); // Adicionamos 'language' como dependência para resetar se o idioma mudar

    // --- MOTOR MAGNÉTICO E FADE-IN DO FOOTER ---
    useGSAP(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".footer-fade", {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (isModalOpen) return;

            if (magneticAreaRef.current && magneticBtnRef.current) {
                const rect = magneticAreaRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                if (dist < 200) {
                    gsap.to(magneticBtnRef.current, {
                        x: (e.clientX - centerX) * 0.4,
                        y: (e.clientY - centerY) * 0.4,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(magneticBtnRef.current, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.4)"
                    });
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, { scope: footerRef, dependencies: [isModalOpen] });

    // --- CONTROLO DO MODAL ---
    const openProtocol = () => {
        setIsModalOpen(true);
        if (typeof window !== "undefined") {
            if (lenis) lenis.stop();
        }
    };

    const closeProtocol = () => {
        setIsModalOpen(false);
        setExpandedCard(null);
        if (typeof window !== "undefined") {
            if (lenis) lenis.start();
        }
    };

    // --- LISTENER PARA ABERTURA EXTERNA (NAV) ---
    useEffect(() => {
        const handleOpenExternal = () => openProtocol();
        window.addEventListener('open-contact-modal', handleOpenExternal);
        return () => window.removeEventListener('open-contact-modal', handleOpenExternal);
    }, []);

    return (
        <>
            <footer ref={footerRef} id="footer" className="relative pt-10 pb-10 md:pt-16 md:pb-25 overflow-hidden px-6 bg-[#000814]">
                <div className="footer-glow-center"></div>

                <div className="container mx-auto relative z-10 text-center">

                    {/* === SECÇÃO 1: MIND BEHIND CODE === */}
                    <div className="mb-16 text-center lg:text-left max-w-6xl mx-auto px-4 md:px-0 footer-fade">
                        <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-accent block mb-4">
                            {t('ft_vision')}
                        </span>
                        <h2
                            className="text-4xl md:text-7xl font-jakarta font-black title-monolithic uppercase"
                            dangerouslySetInnerHTML={{ __html: t('ft_title') }}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 text-left max-w-6xl mx-auto footer-fade">
                        {/* Foto Identity */}
                        <div className="relative group order-2 lg:order-1">
                            <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="identity-photo-frame relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                                <Image src="/assets/img/gus-foto.webp" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="w-full h-[450px] object-cover object-top transform hover:scale-105 transition-transform duration-1000" style={{ objectFit: 'cover' }} alt={t('alt_footer_img')} />
                                <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">
                                    System_Architect_Id: 0814-26
                                </div>
                            </div>
                        </div>

                        {/* Streaming Bio */}
                        <div className="flex flex-col space-y-6 order-1 lg:order-2 px-4 md:px-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-px bg-accent"></div>
                                <span className="font-mono text-[10px] tracking-[0.5em] text-accent uppercase">
                                    {t('ft_streaming')}
                                </span>
                            </div>
                            <div className="min-h-[180px] flex flex-col justify-center">
                                <h2
                                    ref={bioRef}
                                    className="text-3xl md:text-5xl font-jakarta font-bold leading-tight transition-all duration-700 bio-text-active"
                                    dangerouslySetInnerHTML={{ __html: bioMessagesDict[language][bioIndex] }}
                                />
                            </div>
                            <div className="flex items-center gap-4 opacity-30">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                <span className="font-mono text-[9px] uppercase tracking-widest">
                                    {t('ft_wait')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* === SECÇÃO 2: ÁREA MAGNÉTICA === */}
                    <div className="flex flex-col items-center footer-fade">
                        <div ref={magneticAreaRef} id="magnetic-area" className="w-80 h-80 flex items-center justify-center cursor-pointer relative group">

                            {/* Os 3 anéis de Sonar Originais */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-60 md:h-60 rounded-full border border-cyan-400/40 pulse-ring-1 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-0"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-60 md:h-60 rounded-full border border-cyan-400/20 pulse-ring-2 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-0"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-60 md:h-60 rounded-full border border-cyan-400/10 pulse-ring-3 pointer-events-none group-hover:opacity-0 transition-opacity duration-500 z-0"></div>

                            {/* O Botão Exato */}
                            <button
                                ref={magneticBtnRef}
                                onClick={openProtocol}
                                className="w-56 h-56 md:w-60 md:h-60 bg-white text-black rounded-full flex flex-col items-center justify-center transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] group/btn overflow-hidden relative z-10"
                            >
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                                <span className="font-mono text-[10px] uppercase tracking-[0.4em] mb-2 relative z-10 group-hover/btn:text-white transition-colors duration-300">
                                    {t('ft_start')}
                                </span>
                                <span className="font-bold text-2xl uppercase relative z-10 group-hover/btn:text-white transition-colors duration-300">
                                    {t('ft_btn')}
                                </span>
                                <svg className="w-8 h-8 mt-4 relative z-10 group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* === SECÇÃO 3: METADADOS INFERIORES === */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-40 w-full pt-16 border-t border-white/5 relative z-10">
                            <div className="text-left group cursor-default">
                                <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-accent/50 block mb-4 group-hover:text-accent transition-colors">[LOC_NODE]</span>
                                <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Ljubljana <span className="text-accent">//</span> SI</p>
                            </div>

                            <div className="text-left group cursor-default">
                                <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-accent/50 block mb-4 group-hover:text-accent transition-colors">[TRANS_LINK]</span>
                                <a href="mailto:gustavosoares0428@gmail.com" className="text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors flex items-center gap-2">
                                    gustavosoares0428@gmail.com
                                    <span className="iconify text-xs opacity-0 group-hover:opacity-100 transition-opacity" data-icon="solar:arrow-right-up-linear"></span>
                                </a>
                            </div>

                            <div className="text-left group lg:pl-12">
                                <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-accent/50 block mb-4 group-hover:text-accent transition-colors">[NEURAL_NET]</span>
                                <div className="flex gap-6">
                                    <a href="https://www.linkedin.com/in/gustavo-costa-3a1862339/" className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all flex items-center gap-1.5">
                                        <span className="iconify" data-icon="simple-icons:linkedin"></span> LinkedIn
                                    </a>
                                    <a href="https://github.com/Gus96costa" className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all flex items-center gap-1.5">
                                        <span className="iconify" data-icon="simple-icons:github"></span> Github
                                    </a>
                                </div>
                            </div>

                            <div className="md:text-right flex flex-col justify-end opacity-40 hover:opacity-100 transition-opacity">
                                <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 leading-relaxed">
                                    © 2026 Vibedesign.v1<br />{t('ft_copy')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* === MODAL DE PROTOCOLO === */}
            <div className={`fixed inset-0 z-[500] flex flex-col items-center justify-center transition-all duration-500 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-[#000814]/95 backdrop-blur-2xl"></div>
                <button onClick={closeProtocol} aria-label={t('aria_close_modal')} className="absolute top-8 right-8 text-white/50 hover:text-cyan-400 z-10 flex items-center gap-2 group">
                    <span className="font-mono text-[10px] uppercase tracking-widest">{t('modal_abort')}</span>
                    <Icon icon="solar:close-circle-linear" className="text-2xl group-hover:rotate-90 transition-transform" />
                </button>
                <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center text-center">
                    <span className="font-mono text-cyan-400 text-xs tracking-[0.5em] uppercase mb-4">// PROTOCOLO_INICIADO</span>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-6">{t('modal_title')}</h2>

                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl justify-center items-start">
                        {/* EMAIL CARD */}
                        <div onClick={() => setExpandedCard(expandedCard === 'email' ? null : 'email')} className={`glass-panel p-6 border border-white/10 rounded-2xl flex flex-col items-center gap-4 cursor-pointer transition-all duration-500 overflow-hidden group ${expandedCard === 'email' ? 'w-full md:w-full max-w-md' : 'w-full md:w-64'}`}>
                            <div className="flex flex-col items-center gap-3">
                                <Icon icon="solar:letter-bold-duotone" className={`text-4xl transition-colors ${expandedCard === 'email' ? 'text-cyan-400' : 'text-white/70 group-hover:text-cyan-400'}`} />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white">{t('modal_email_btn')}</span>
                            </div>
                            <div className={`w-full transition-all duration-500 ${expandedCard === 'email' ? 'max-h-[300px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
                                <form className="flex flex-col gap-3" onClick={e => e.stopPropagation()}>
                                    <input type="text" placeholder={t('modal_name')} required className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50" />
                                    <textarea placeholder={t('modal_msg')} required rows={3} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 resize-none"></textarea>
                                    <button type="submit" className="bg-cyan-400 text-[#000814] font-mono text-[10px] font-black py-2 rounded-lg uppercase tracking-widest hover:bg-white transition-colors">{t('modal_send')}</button>
                                </form>
                            </div>
                        </div>

                        {/* PHONE CARD */}
                        <div onClick={() => setExpandedCard(expandedCard === 'phone' ? null : 'phone')} className={`glass-panel p-6 border border-white/10 rounded-2xl flex flex-col items-center gap-4 cursor-pointer transition-all duration-500 overflow-hidden group ${expandedCard === 'phone' ? 'w-full md:w-80' : 'w-full md:w-64'}`}>
                            <div className="flex flex-col items-center gap-3">
                                <Icon icon="solar:phone-calling-bold-duotone" className={`text-4xl transition-colors ${expandedCard === 'phone' ? 'text-cyan-400' : 'text-white/70 group-hover:text-cyan-400'}`} />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white">{t('modal_phone_btn')}</span>
                            </div>
                            <div className={`w-full transition-all duration-500 text-center ${expandedCard === 'phone' ? 'max-h-[100px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
                                <a href="#" target="_blank" onClick={e => e.stopPropagation()} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                                    <span className="text-cyan-400 font-mono text-sm font-bold">+386 00 000 000</span>
                                    <span className="text-[9px] text-white/40 uppercase tracking-widest">{t('modal_whatsapp')}</span>
                                </a>
                            </div>
                        </div>

                        {/* LINKEDIN CARD */}
                        <a href="https://www.linkedin.com/in/gustavo-costa-3a1862339/" target="_blank" className="glass-panel p-6 border border-white/10 hover:border-cyan-400/50 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-500 w-full md:w-64 group cursor-pointer">
                            <Icon icon="mdi:linkedin" className="text-4xl text-white/70 group-hover:text-cyan-400 transition-colors" />
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}