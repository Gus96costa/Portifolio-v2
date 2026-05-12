"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const dictionary = {
    pt: {
        // NAV & GERAL
        "nav_home": "Início", "nav_work": "Portfólio", "nav_journey": "Jornada", "nav_contact": "Fale Comigo",
        "scroll_guide": "EXPLORAR", "loader_text": "ESTABELECENDO CONEXÃO DE DADOS",

        // HERO
        "hero_role": "GESTOR DE T.I. & ENGENHEIRO DE IA",
        "hero_t1": "ARQUITETURA ESTRATÉGICA",
        "hero_t2": "RESULTADOS 10X MAIS ACELERADOS",
        "hero_desc": "Engenharia de interfaces <span class='text-white font-medium'>ultra-fluidas</span> e integrações lógicas avançadas. Transformo complexidade algorítmica em experiências de utilizador imersivas, utilizando ferramentas de vanguarda e design <span class='text-white font-medium'>orientado a dados</span>.",
        "hero_cta": "Iniciar Projeto",
        "hero_year": "PORTFÓLIO 2026",

        // SHOWCASE
        "portfolio_title1": "Projetos <br/><span class='text-glass-cyan'>Selecionados</span>",
        "showcase_sub": "Portfólio // 2024 - 2026",
        "proj_outcome1": "Resultado // 01", "proj_outcome2": "Resultado // 02", "proj_outcome3": "Resultado // 03",
        "proj_manifesto": "// MANIFESTO_DO_PROJETO_V1",
        "proj_challenge": "O Desafio", "proj_arch": "A Arquitetura", "proj_impact": "O Impacto",
        "proj_logic": "Lógica // Estrutura", "proj_code": "ESTRUTURA DE CÓDIGO",
        "btn_explore": "Explorar", "btn_manifesto": "Ver Detalhes",
        "proj1_chal_desc": "Interface cinemática com zero latência para exibição de portfólio de luxo.",
        "proj1_arch_desc": "Orquestração de GSAP Timelines e otimização WebP para 100/100 de performance.",
        "proj1_imp_desc": "Elevação da percepção de marca e conversão técnica.",
        "proj1_logic": "Lógica // Prediction",
        "proj2_chal_desc": "Refinamento de UX para produtos de alto padrão, focando em feedback visual.",
        "proj2_arch_desc": "Motores de renderização lógicos e controle de estados com JavaScript puro.",
        "proj2_imp_desc": "Consistência absoluta em todas as resoluções.",
        "proj2_logic": "Lógica",
        "proj3_chal_desc": "Single Source of Truth visual e comportamental para múltiplos ecossistemas.",
        "proj3_arch_desc": "Componentização atômica, Design Tokens e utilitários de animação fluidos.",
        "proj3_imp_desc": "Padronização absoluta e redução drástica no Time-to-Market.",
        "proj3_logic": "Lógica // Framework",

        // TIMELINE
        "journey_title": "Meus Conhecimentos",
        "timeline_sub": "PROGRESSÃO CRONOLÓGICA // 2018 - 2026",
        "time1_tag": "// BASE ACADÊMICA", "time1_title": "Gestão de T.I.", "time1_desc": "Construção de uma base sólida em infraestrutura tecnológica, governança de sistemas e pensamento analítico para a resolução de problemas lógicos complexos.",
        "time2_tag": "// FUNDAMENTOS DE INTERFACE", "time2_title": "Arquitetura Visual", "time2_desc": "Especialização no ecossistema Web. Domínio estrutural para a construção de interfaces responsivas, aliado aos fundamentos de lógica aplicados ao DOM com JavaScript.",
        "time3_tag": "// BACK-END & LÓGICA", "time3_title": "Engenharia Python", "time3_desc": "Aprofundamento técnico em Python e Programação Orientada a Objetos. Desenvolvimento de sistemas, estruturação de dados e controle de versão corporativo.",
        "time4_tag": "// FLUXO DE INTELIGÊNCIA", "time4_title": "Produtividade Generativa", "time4_desc": "Especialização na construção de aplicações com IA. Utilização tática de agentes inteligentes para automatizar lógicas, otimizar arquiteturas e acelerar o ciclo de desenvolvimento.",
        "time5_tag": "// DESENVOLVIMENTO CRIATIVO", "time5_title": "Vibe Design & Motion", "time5_desc": "Maestria em 'Vibe Design' e Front-end de Elite. Foco na criação de sites estáticos de altíssimo nível, integrando micro-interações, animações imersivas e interfaces cinemáticas.",

        // EXPERTISE
        "exp_report": "// RELATÓRIO_DE_CAPACIDADES",
        "exp_title": "Malha de <span class='text-glass-cyan'>Inteligência</span>",
        "exp1_tag": "MOD_01 // FUNDAMENTOS FRONT-END", "exp1_title": "Arquitetura de <br>Sistemas", "exp1_desc": "Desenvolvimento de ecossistemas visuais escaláveis. Foco implacável em performance, componentização e código semântico.",
        "exp1a_desc": "Sistemas de design para prototipagem hiper-rápida e consistência absoluta.",
        "exp1b_desc": "Gestão de repositórios corporativos, resolução de conflitos e integrações.",
        "exp2_tag": "MOD_02 // ORQUESTRAÇÃO DE IA", "exp2_title": "Engenharia <br>Generativa", "exp2_desc": "Integração de Modelos de Linguagem para automatizar lógicas e multiplicar a velocidade de entrega.",
        "exp2a_desc": "Arquitetura de dados, manipulação orientada a objetos e criação de ambientes virtuais robustos.",
        "exp2b_desc": "Edição de código assistida por inteligência artificial para escalonamento massivo de produtividade.",
        "exp3_tag": "MOD_03 // MOVIMENTO & UX", "exp3_title": "Experiência <br>Cinética", "exp3_desc": "Manipulação avançada e design de curvas matemáticas para transformar código estático numa experiência fluida.",
        "exp3a_tag": "MOD_03.A // NAVEGAÇÃO", "exp3a_desc": "Implementação de scroll contínuo e interpolado para eliminar a quebra de frames em interfaces pesadas.",
        "exp3b_tag": "MOD_03.B // DESIGN VISUAL", "exp3b_desc": "Aplicação de micro-interações, estados magnéticos e feedback visual premium.",

        // TELEMETRIA
        "tele_title1": "01 // Core Vitals",
        "tele_desc1": "Lighthouse Performance Score. Otimização absoluta de dom, assets e renderização em todas as builds.",
        "tele_title2": "02 // Latency",
        "tele_desc2": "Paint & Composite time. Ausência de frame drops e fluidez garantida em interações GSAP complexas.",
        "tele_title3": "03 // Velocity",
        "tele_desc3": "Aceleração no fluxo de deploy. Arquitetura de código e orquestração de IA para escalabilidade instantânea.",

        // FOOTER & MODAL
        "ft_vision": "// VISÃO & LÓGICA",
        "ft_title": "A MENTE POR TRÁS DO <span class='text-glass-cyan'>CÓDIGO</span>",
        "ft_streaming": "Estado_Ativo",
        "ft_wait": "Aguardando novo protocolo...",
        "ft_start": "INICIAR PROTOCOLO",
        "ft_btn": "CONECTAR",
        "ft_copy": "Todos os Protocolos Executados.",
        "modal_abort": "Abortar",
        "modal_title": "Canal Seguro Aberto",
        "modal_desc": "Selecione o vetor de comunicação para iniciar a transmissão de dados.",
        "modal_email_btn": "E-mail", "modal_phone_btn": "Contato", "modal_whatsapp": "Abrir WhatsApp",
        "modal_name": "O Seu Nome", "modal_msg": "A Sua Mensagem", "modal_send": "Transmitir",
        "alt_hero_img": "Foto de perfil de Gustavo Soares, Arquiteto de Sistemas",
        "aria_open_details": "Abrir manifesto e detalhes do projeto",
        "aria_close_modal": "Fechar canal seguro",
        "alt_footer_img": "Fotografia de identidade de Gustavo Soares, Arquiteto de Sistemas"
    },
    en: {
        "nav_home": "Home", "nav_work": "Projects", "nav_journey": "Journey", "nav_contact": "Let's Talk",
        "scroll_guide": "EXPLORE", "loader_text": "ESTABLISHING DATA LINK",
        "hero_role": "IT MANAGER & AI ENGINEER",
        "hero_t1": "STRATEGIC ARCHITECTURE", "hero_t2": "10X ACCELERATED RESULTS",
        "hero_desc": "Engineering of <span class='text-white font-medium'>ultra-fluid</span> interfaces and advanced logical integrations. I transform algorithmic complexity into immersive user experiences, using cutting-edge tools and <span class='text-white font-medium'>data-driven</span> design.",
        "hero_cta": "Start Project", "hero_year": "PORTFOLIO 2026",
        "portfolio_title1": "Selected <br/><span class='text-glass-cyan'>Works</span>", "showcase_sub": "Showcase // 2024 - 2026",
        "proj_outcome1": "Outcome // 01", "proj_outcome2": "Outcome // 02", "proj_outcome3": "Outcome // 03",
        "proj_manifesto": "// PROJECT_MANIFESTO_V1", "proj_challenge": "The Challenge", "proj_arch": "The Architecture", "proj_impact": "The Impact",
        "proj_logic": "Logic // Structure", "proj_code": "CODE STRUCTURE", "btn_explore": "Explore", "btn_manifesto": "View Details",
        "proj1_chal_desc": "Cinematic interface with zero latency for luxury portfolio showcase.",
        "proj1_arch_desc": "GSAP Timelines orchestration and WebP optimization for 100/100 performance.",
        "proj1_imp_desc": "Elevation of brand perception and technical conversion.",
        "proj1_logic": "Logic // Prediction",
        "proj2_chal_desc": "UX refinement for high-end products, focusing on visual feedback.",
        "proj2_arch_desc": "Logical rendering engines and state control with vanilla JavaScript.",
        "proj2_imp_desc": "Absolute consistency across all resolutions.",
        "proj2_logic": "Logic",
        "proj3_chal_desc": "Visual and behavioral Single Source of Truth for multiple ecosystems.",
        "proj3_arch_desc": "Atomic componentization, Design Tokens, and fluid animation utilities.",
        "proj3_imp_desc": "Absolute standardization and drastic reduction in Time-to-Market.",
        "proj3_logic": "Logic // Framework",
        "journey_title": "My Background", "timeline_sub": "CHRONOLOGICAL PROGRESSION // 2018 - 2026",
        "time1_tag": "// ACADEMIC BASIS", "time1_title": "IT Management", "time1_desc": "Building a solid foundation in technological infrastructure, systems governance, and analytical thinking for solving complex logical problems.",
        "time2_tag": "// INTERFACE FOUNDATION", "time2_title": "Visual Architecture", "time2_desc": "Web ecosystem specialization. Mastery of structural responsive interfaces, combined with logic fundamentals applied to the DOM with JavaScript.",
        "time3_tag": "// BACK-END & LOGIC", "time3_title": "Python Engineering", "time3_desc": "Technical deep dive into Python and Object-Oriented Programming. Systems development, data structuring, and corporate version control.",
        "time4_tag": "// INTELLIGENCE WORKFLOW", "time4_title": "Generative Productivity", "time4_desc": "Specialization in building applications with AI. Tactical use of intelligent agents to automate logic, optimize architectures, and accelerate the development cycle.",
        "time5_tag": "// CREATIVE DEVELOPMENT", "time5_title": "Vibe Design & Motion", "time5_desc": "Mastery of 'Vibe Design' and Elite Front-end. Focus on creating high-level static websites, integrating micro-interactions, immersive animations, and cinematic interfaces.",
        "exp_report": "// SYSTEM_CAPABILITIES_REPORT", "exp_title": "Intelligence <span class='text-glass-cyan'>Grid</span>",
        "exp1_tag": "MOD_01 // FRONT-END FOUNDATION", "exp1_title": "System <br>Architecture", "exp1_desc": "Development of scalable visual ecosystems. Relentless focus on performance, componentization, and semantic code.",
        "exp1a_desc": "Design systems for hyper-fast prototyping and absolute consistency.",
        "exp1b_desc": "Corporate repository management, conflict resolution, and integrations.",
        "exp2_tag": "MOD_02 // AI ORCHESTRATION", "exp2_title": "Generative <br>Engineering", "exp2_desc": "Language Models integration to automate logic generation and multiply delivery speed.",
        "exp2a_desc": "Data architecture, object-oriented manipulation, and robust virtual environment creation.",
        "exp2b_desc": "Artificial intelligence-assisted code editing for massive productivity scaling.",
        "exp3_tag": "MOD_03 // MOTION & UX", "exp3_title": "Kinetic <br>Experience", "exp3_desc": "Advanced manipulation and mathematical animation curves to transform static code into a fluid experience.",
        "exp3a_tag": "MOD_03.A // NAVIGATION", "exp3a_desc": "Implementation of continuous interpolated scrolling to eliminate frame drops in heavy interfaces.",
        "exp3b_tag": "MOD_03.B // VISUAL DESIGN", "exp3b_desc": "Application of micro-interactions, magnetic hover states, and premium visual feedback.",
        "tele_title1": "01 // Core Vitals", "tele_desc1": "Lighthouse Performance Score. Absolute optimization of DOM, assets, and rendering across all builds.",
        "tele_title2": "02 // Latency", "tele_desc2": "Paint & Composite time. Zero frame drops and guaranteed fluidity in complex GSAP interactions.",
        "tele_title3": "03 // Velocity", "tele_desc3": "Deployment flow acceleration. Code architecture and AI orchestration for instant scalability.",
        "ft_vision": "// VISION & LOGIC", "ft_title": "MIND BEHIND THE <span class='text-glass-cyan'>CODE</span>",
        "ft_streaming": "Active_Status", "ft_wait": "Waiting for new protocol...", "ft_start": "START PROTOCOL", "ft_btn": "CONNECT", "ft_copy": "All Protocols Executed.",
        "modal_abort": "Abort", "modal_title": "Secure Channel Open", "modal_desc": "Select the communication vector to initiate data transmission.",
        "modal_email_btn": "Email", "modal_phone_btn": "Contact", "modal_whatsapp": "Open WhatsApp", "modal_name": "Your Name", "modal_msg": "Your Message", "modal_send": "Transmit",
        "alt_hero_img": "Profile photo of Gustavo Soares, Systems Architect",
        "aria_open_details": "Open project manifesto and details",
        "aria_close_modal": "Close secure channel",
        "alt_footer_img": "Identity photo of Gustavo Soares, Systems Architect"
    },
    es: {
        "nav_home": "Inicio", "nav_work": "Portafolio", "nav_journey": "Trayectoria", "nav_contact": "Contacto",
        "scroll_guide": "EXPLORAR", "loader_text": "ESTABLECIENDO ENLACE DE DATOS",
        "hero_role": "GESTOR DE T.I. & INGENIERO DE IA",
        "hero_t1": "ARQUITECTURA ESTRATÉGICA", "hero_t2": "RESULTADOS 10X MÁS RÁPIDOS",
        "hero_desc": "Ingeniería de interfaces <span class='text-white font-medium'>ultrafluidas</span> e integraciones lógicas avanzadas. Transformo la complejidad algorítmica en experiencias de usuario inmersivas, utilizando herramientas de vanguardia y diseño <span class='text-white font-medium'>orientado a datos</span>.",
        "hero_cta": "Iniciar Proyecto", "hero_year": "PORTAFOLIO 2026",
        "portfolio_title1": "Proyectos <br/><span class='text-glass-cyan'>Destacados</span>", "showcase_sub": "Portafolio // 2024 - 2026",
        "proj_outcome1": "Resultado // 01", "proj_outcome2": "Resultado // 02", "proj_outcome3": "Resultado // 03",
        "proj_manifesto": "// MANIFIESTO_DEL_PROYECTO_V1", "proj_challenge": "El Desafío", "proj_arch": "La Arquitectura", "proj_impact": "El Impacto",
        "proj_logic": "Lógica // Estructura", "proj_code": "ESTRUCTURA DE CÓDIGO", "btn_explore": "Explorar", "btn_manifesto": "Ver Detalles",
        "proj1_chal_desc": "Interfaz cinemática con cero latencia para exhibición de portafolio de lujo.",
        "proj1_arch_desc": "Orquestación de GSAP Timelines y optimización WebP para rendimiento 100/100.",
        "proj1_imp_desc": "Elevación de la percepción de marca y conversión técnica.",
        "proj1_logic": "Lógica // Predicción",
        "proj2_chal_desc": "Refinamiento de UX para productos de alto nivel, centrado en feedback visual.",
        "proj2_arch_desc": "Motores de renderizado lógicos e control de estados con JavaScript puro.",
        "proj2_imp_desc": "Consistencia absoluta en todas las resoluciones.",
        "proj2_logic": "Lógica",
        "proj3_chal_desc": "Single Source of Truth visual y comportamental para múltiples ecosistemas.",
        "proj3_arch_desc": "Componentización atómica, Design Tokens y utilidades de animación fluidas.",
        "proj3_imp_desc": "Estandarización absoluta y reducción drástica en el Time-to-Market.",
        "proj3_logic": "Lógica // Framework",
        "journey_title": "Mis Conocimientos", "timeline_sub": "PROGRESIÓN CRONOLÓGICA // 2018 - 2026",
        "time1_tag": "// BASE ACADÉMICA", "time1_title": "Gestión de T.I.", "time1_desc": "Construcción de una base sólida en infraestructura tecnológica, gobernanza de sistemas y pensamiento analítico para la resolución de problemas lógicos complejos.",
        "time2_tag": "// FUNDAMENTOS DE INTERFAZ", "time2_title": "Arquitectura Visual", "time2_desc": "Especialización en el ecosistema Web. Dominio estructural para la construcción de interfaces responsivas, aliado a los fundamentos de lógica aplicados al DOM con JavaScript.",
        "time3_tag": "// BACK-END Y LÓGICA", "time3_title": "Ingeniería Python", "time3_desc": "Profundización técnica en Python y Programación Orientada a Objetos. Desarrollo de sistemas, estructuración de datos y control de versiones corporativo.",
        "time4_tag": "// FLUJO DE INTELIGENCIA", "time4_title": "Productividad Generativa", "time4_desc": "Especialización en la construcción de aplicaciones con IA. Uso táctico de agentes inteligentes para automatizar lógicas, optimizar arquitecturas y acelerar el ciclo de desarrollo.",
        "time5_tag": "// DESARROLLO CREATIVO", "time5_title": "Vibe Design & Motion", "time5_desc": "Maestría en 'Vibe Design' y Front-end de Élite. Enfoque en la creación de sitios web estáticos de altísimo nivel, integrando microinteracciones, animaciones inmersivas e interfaces cinemáticas.",
        "exp_report": "// REPORTE_DE_CAPACIDADES", "exp_title": "Red de <span class='text-glass-cyan'>Inteligencia</span>",
        "exp1_tag": "MOD_01 // FUNDAMENTOS FRONT-END", "exp1_title": "Arquitectura de <br>Sistemas", "exp1_desc": "Desarrollo de ecosistemas visuales escalables. Enfoque implacable en rendimiento, componentización y código semántico.",
        "exp1a_desc": "Sistemas de diseño para prototipado hiperrápido y consistencia absoluta.",
        "exp1b_desc": "Gestión de repositorios corporativos, resolución de conflictos e integraciones.",
        "exp2_tag": "MOD_02 // ORQUESTACIÓN DE IA", "exp2_title": "Ingeniería <br>Generativa", "exp2_desc": "Integración de Modelos de Lenguaje para automatizar lógicas y multiplicar la velocidad de entrega.",
        "exp2a_desc": "Arquitectura de datos, manipulación orientada a objetos y creación de entornos virtuales robustos.",
        "exp2b_desc": "Edición de código asistida por inteligencia artificial para el escalado masivo de la productividad.",
        "exp3_tag": "MOD_03 // MOVIMIENTO Y UX", "exp3_title": "Experiencia <br>Cinética", "exp3_desc": "Manipulación avanzada y diseño de curvas matemáticas para transformar código estático en una experiencia fluida.",
        "exp3a_tag": "MOD_03.A // NAVEGACIÓN", "exp3a_desc": "Implementación de scroll continuo e interpolado para eliminar la caída de frames en interfaces pesadas.",
        "exp3b_tag": "MOD_03.B // DISEÑO VISUAL", "exp3b_desc": "Aplicación de microinteracciones, estados magnéticos y feedback visual premium.",
        "tele_title1": "01 // Core Vitals", "tele_desc1": "Lighthouse Performance Score. Optimización absoluta de dom, assets y renderizado en todas las builds.",
        "tele_title2": "02 // Latency", "tele_desc2": "Paint & Composite time. Ausencia de caídas de frames y fluidez garantizada en interacciones GSAP complejas.",
        "tele_title3": "03 // Velocity", "tele_desc3": "Aceleración en el flujo de despliegue. Arquitectura de código y orquestación de IA para escalabilidad instantánea.",
        "ft_vision": "// VISIÓN Y LÓGICA", "ft_title": "LA MENTE DETRÁS DEL <span class='text-glass-cyan'>CÓDIGO</span>",
        "ft_streaming": "Estado_Activo", "ft_wait": "Esperando nuevo protocolo...", "ft_start": "INICIAR PROTOCOLO", "ft_btn": "CONECTAR", "ft_copy": "Todos los Protocolos Ejecutados.",
        "modal_abort": "Abortar", "modal_title": "Canal Seguro Abierto", "modal_desc": "Seleccione el vector de comunicación para iniciar la transmisión de datos.",
        "modal_email_btn": "Correo", "modal_phone_btn": "Contacto", "modal_whatsapp": "Abrir WhatsApp", "modal_name": "Tu Nombre", "modal_msg": "Tu Message", "modal_send": "Transmitir",
        "alt_hero_img": "Foto de perfil de Gustavo Soares, Arquitecto de Sistemas",
        "aria_open_details": "Abrir manifiesto y detalles del proyecto",
        "aria_close_modal": "Cerrar canal seguro",
        "alt_footer_img": "Fotografía de identidad de Gustavo Soares, Arquitecto de Sistemas"
    },
    sl: {
        "nav_home": "Domov", "nav_work": "Projekti", "nav_journey": "Pot", "nav_contact": "Kontakt",
        "scroll_guide": "RAZIŠČI", "loader_text": "VZPOSTAVLJANJE PODATKOVNE POVEZAVE",
        "hero_role": "VODJA IT IN INŽENIR AI",
        "hero_t1": "STRATEŠKA ARHITEKTURA", "hero_t2": "10X HITREJŠI REZULTATI",
        "hero_desc": "Inženiring <span class='text-white font-medium'>ultra fluidnih</span> vmesnikov in naprednih logičnih integracij. Algoritemsko kompleksnost preoblikujem v poglobljene uporabniške izkušnje z uporabo vrhunskih orodij in oblikovanja, <span class='text-white font-medium'>ki temelji na podatkih</span>.",
        "hero_cta": "Začni Projekt", "hero_year": "PORTFELJ 2026",
        "portfolio_title1": "Izbrani <br/><span class='text-glass-cyan'>Projekti</span>", "showcase_sub": "Projekti // 2024 - 2026",
        "proj_outcome1": "Rezultat // 01", "proj_outcome2": "Rezultat // 02", "proj_outcome3": "Rezultat // 03",
        "proj_manifesto": "// MANIFEST_PROJEKTA_V1", "proj_challenge": "Izziv", "proj_arch": "Arhitektura", "proj_impact": "Učinek",
        "proj_logic": "Logika // Struktura", "proj_code": "STRUKTURA KODE", "btn_explore": "Razišči", "btn_manifesto": "Podrobnosti",
        "proj1_chal_desc": "Kinematični vmesnik z ničelno latenco za prikaz luksuznega portfelja.",
        "proj1_arch_desc": "Orkestracija GSAP časovnic in WebP optimizacija za 100/100 zmogljivost.",
        "proj1_imp_desc": "Dvig percepcije blagovne znamke in tehnične konverzije.",
        "proj1_logic": "Logika // Napovedovanje",
        "proj2_chal_desc": "Izboljšanje UX za vrhunske izdelke s poudarkom na vizualnih povratnih informacijah.",
        "proj2_arch_desc": "Logični pogoni za upodabljanje in nadzor stanj s čistim JavaScriptom.",
        "proj2_imp_desc": "Absolutna doslednost pri vseh ločljivostih.",
        "proj2_logic": "Logika",
        "proj3_chal_desc": "Vizualni in vedenjski Single Source of Truth za več ekosistemov.",
        "proj3_arch_desc": "Atomska komponentizacija, Design Tokens in fluidna orodja za animacijo.",
        "proj3_imp_desc": "Absolutna standardizacija in drastično zmanjšanje časa do trga.",
        "proj3_logic": "Logika // Ogrodje",
        "journey_title": "Moje Znanje", "timeline_sub": "KRONOLOŠKO NAPREDOVANJE // 2018 - 2026",
        "time1_tag": "// AKADEMSKA OSNOVA", "time1_title": "Upravljanje IT", "time1_desc": "Izgradnja trdnih temeljev v tehnološki infrastrukturi, upravljanju sistemov in analitičnem razmišljanju za reševanje kompleksnih logičnih problemov.",
        "time2_tag": "// OSNOVE VMESNIKOV", "time2_title": "Vizualna Arhitektura", "time2_desc": "Specializacija za spletni ekosistem. Strukturno obvladovanje za izgradnjo odzivnih vmesnikov, združeno z osnovami logike, uporabljenimi v DOM-u z JavaScriptom.",
        "time3_tag": "// BACK-END IN LOGIKA", "time3_title": "Inženiring Python", "time3_desc": "Tehnično poglabljanje v Python in objektno usmerjeno programiranje. Razvoj sistemov, strukturiranje podatkov in korporativni nadzor različic.",
        "time4_tag": "// POTEK INTELIGENCE", "time4_title": "Generativna Produktivnost", "time4_desc": "Specializacija za izgradnjo aplikacij z AI. Taktična uporaba inteligentnih agentov za avtomatizacijo logike, optimizacijo arhitektur in pospešitev razvojnega cikla.",
        "time5_tag": "// KREATIVNI RAZVOJ", "time5_title": "Vibe Design & Motion", "time5_desc": "Mojstrstvo v 'Vibe Design' in Elite Front-end. Osredotočenost na ustvarjanje statičnih spletnih mest na najvišji ravni, integracijo mikro-interakcij, poglobljenih animacij in kinematičnih vmesnikov.",
        "exp_report": "// POROČILO_O_ZMOGLJIVOSTIH", "exp_title": "Inteligenčna <span class='text-glass-cyan'>Mreža</span>",
        "exp1_tag": "MOD_01 // OSNOVE FRONT-END", "exp1_title": "Arhitektura <br>Sistemov", "exp1_desc": "Razvoj razširljivih vizualnih ekosistemov. Neizprosen poudarek na zmogljivosti, komponentizaciji in semantični kodi.",
        "exp1a_desc": "Sistemi oblikovanja za hiper hitro izdelavo prototipov in absolutno doslednost.",
        "exp1b_desc": "Upravljanje korporativnih repozitorijev, reševanje konfliktov in integracije.",
        "exp2_tag": "MOD_02 // AI ORKESTRACIJA", "exp2_title": "Generativni <br>Inženiring", "exp2_desc": "Integracija jezikovnih modelov za avtomatizacijo logike in pomnožitev hitrosti dostave.",
        "exp2a_desc": "Podatkovna arhitektura, objektno usmerjena manipulacija in ustvarjanje robustnih virtualnih okolij.",
        "exp2b_desc": "Urejanje kode s pomočjo umetne inteligence za množično povečanje produktivnosti.",
        "exp3_tag": "MOD_03 // GIBANJE IN UX", "exp3_title": "Kinetična <br>Izkušnja", "exp3_desc": "Napredna manipulacija in načrtovanje matematičnih animacijskih krivulj za preoblikovanje statične kode v tekočo izkušnjo.",
        "exp3a_tag": "MOD_03.A // NAVIGACIJA", "exp3a_desc": "Implementacija zveznega in interpoliranega drsenja za odpravo padcev sličic v težkih vmesnikih.",
        "exp3b_tag": "MOD_03.B // VIZUALNI DIZAJN", "exp3b_desc": "Uporaba mikro interakcij, magnetnih stanj in premium vizualnih povratnih informacij.",
        "tele_title1": "01 // Core Vitals", "tele_desc1": "Lighthouse Performance Score. Popolna optimizacija DOM-a, sredstev in upodabljanja v vseh različicah.",
        "tele_title2": "02 // Latency", "tele_desc2": "Čas Paint & Composite. Brez padcev sličic in zagotovljena tekočnost pri kompleksnih interakcijah GSAP.",
        "tele_title3": "03 // Velocity", "tele_desc3": "Pospešitev poteka uvedbe. Arhitektura kode in orkestracija AI za takojšnjo razširljivost.",
        "ft_vision": "// VIZIJA IN LOGIKA", "ft_title": "UM ZA <span class='text-glass-cyan'>KODO</span>",
        "ft_streaming": "Aktivno_Stanje", "ft_wait": "Čakanje na nov protokol...", "ft_start": "ZAŽENI PROTOKOL", "ft_btn": "POVEŽI SE", "ft_copy": "Vsi protokoli izvedeni.",
        "modal_abort": "Prekini", "modal_title": "Varen Kanal Odprt", "modal_desc": "Izberite komunikacijski vektor za začetek prenosa podatkov.",
        "modal_email_btn": "E-pošta", "modal_phone_btn": "Kontakt", "modal_whatsapp": "Odpri WhatsApp", "modal_name": "Vaše Ime", "modal_msg": "Vaše Sporočilo", "modal_send": "Pošlji",
        "alt_hero_img": "Profilna fotografija Gustava Soaresa, sistemskega arhitekta",
        "aria_open_details": "Odpri manifest in podrobnosti projekta",
        "aria_close_modal": "Zapri varen kanal",
        "alt_footer_img": "Osebna fotografija Gustava Soaresa, sistemskega arhitekta"
    }
} as const;

export const bioMessagesDict = {
    pt: [
        "Transformando lógica complexa em <span class='text-glass-cyan'>impacto visual</span> absoluto.",
        "Projetando o futuro através da <span class='text-glass-cyan'>governança técnica</span> e inovação acelerada.",
        "Orquestrador de <span class='text-glass-cyan'>Inteligência Artificial</span> para engenharia de alta velocidade."
    ],
    en: [
        "Transforming complex logic into absolute <span class='text-glass-cyan'>visual impact</span>.",
        "<span class='text-glass-cyan'>Artificial Intelligence</span> orchestrator for high-speed engineering.",
        "Systems Architect focused on creating digital <span class='text-glass-cyan'>sensory experiences</span>."
    ],
    es: [
        "Transformando lógica compleja en <span class='text-glass-cyan'>impacto visual</span> absoluto.",
        "Orquestador de <span class='text-glass-cyan'>Inteligencia Artificial</span> para ingeniería de alta velocidad.",
        "Arquitecto de Sistemas centrado en crear <span class='text-glass-cyan'>experiencias sensoriales</span>."
    ],
    sl: [
        "Preoblikovanje kompleksne logike v absolutni <span class='text-glass-cyan'>vizualni vpliv</span>.",
        "Orkestrator <span class='text-glass-cyan'>umetne inteligence</span> za inženiring visoke hitrosti.",
        "Sistemski arhitekt, osredotočen na ustvarjanje <span class='text-glass-cyan'>senzoričnih izkušenj</span>."
    ]
};

export type Language = keyof typeof dictionary;
export type DictionaryKey = keyof typeof dictionary['pt'];

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: DictionaryKey | string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('pt');

    const t = (key: DictionaryKey | string) => {
        return (dictionary[language] as any)[key] || key;
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }
    }, [language]);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useTranslation must be used within an I18nProvider");
    return context;
};