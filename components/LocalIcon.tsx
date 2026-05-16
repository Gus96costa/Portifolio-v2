// components/LocalIcon.tsx
import React from 'react';

// === CORES E FORMAS OFICIAIS DAS MARCAS ===

const ReactIcon = ({ className }: { className: string }) => (
    <svg viewBox="-11.5 -10.23 23 20.46" className={className}>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

const TypeScriptIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 256 256" className={className}>
        <path fill="#3178C6" d="M0 0h256v256H0z" />
        <path fill="#FFF" d="M185.3 199.1c-10.8 0-18.7-4.1-24.8-11.7c-5.8-7.3-8-17-8-29.2h15.2c0 14.2 4.4 25.7 17.6 25.7c9.5 0 14.2-4.9 14.2-11.7c0-7.3-5-10.4-15.5-14.8l-5.3-2.2c-15.5-6.6-25.1-15.3-25.1-32.3c0-19.6 14.5-33.1 36.3-33.1c11.1 0 21.2 3.8 28.1 11.4c6.3 7 8.5 16.1 8.5 28.3h-15.2c0-14.8-3.8-24.5-13.6-24.5c-8.5 0-13.6 4.7-13.6 12c0 7.3 5.4 10.8 15.5 15.2l5.4 2.2c18.3 7.9 25.6 16.4 25.6 33c.1 20.2-14.8 33.7-38.3 33.7ZM71.2 196V103.5H41V90.1h75.5v13.4H86.4V196H71.2Z" />
    </svg>
);

const PythonIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 110 110" className={className}>
        <path fill="#3776AB" d="M53.7.1c-26.4 0-24.8 11.5-24.8 11.5l.1 11.9H54v3.6H26.3S2.5 24 2.5 54.3c0 28.2 21.6 27.2 21.6 27.2h12.9V63.5s-.2-21.6 21.2-21.6h25.1s21-.1 21-20.2V25.5s.9-25.4-41.9-25.4zm-20.2 9.2a4.6 4.6 0 1 1 0 9.3 4.6 4.6 0 0 1 0-9.3z" />
        <path fill="#FFD43B" d="M55.6 109.9c26.4 0 24.8-11.5 24.8-11.5l-.1-11.9H55.2v-3.6h27.8s23.8 3.1 23.8-27.2c0-28.2-21.6-27.2-21.6-27.2H92.3V46.6s.2 21.6-21.2 21.6H46.1s-21 .1-21 20.2v16.2s-.9 25.3 41.9 25.3zm20.2-9.2a4.6 4.6 0 1 1 0-9.3 4.6 4.6 0 0 1 0 9.3z" />
    </svg>
);

const GeminiIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M12.0001 2.21544C12.2612 8.16335 15.6599 11.5303 21.7846 11.7588V12.2412C15.6599 12.4697 12.2612 15.8367 12.0001 21.7846H11.5177C11.2565 15.8367 7.85786 12.4697 1.73315 12.2412V11.7588C7.85786 11.5303 11.2565 8.16335 11.5177 2.21544H12.0001Z" />
    </svg>
);

const TailwindIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 256 154" className={className}>
        <path fill="#38BDF8" d="M128 0C93.867 0 72.533 17.067 64 51.2C76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 4.743 159.725 0 128 0ZM64 76.8c-34.133 0-55.467 17.067-64 51.2c12.8-17.067 27.733-23.467 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2c-12.8 17.067-27.733 23.467-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 81.543 95.725 76.8 64 76.8Z" />
    </svg>
);

const GsapIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path fill="#88CE02" d="M10.92 6.046c1.391 1.014 1.838 2.378 1.838 4.093v3.71c0 2.502-1.74 3.738-4.341 3.738h-4.34V20.25h8.679a6.42 6.42 0 0 0 4.542-1.892a6.41 6.41 0 0 0 1.892-4.542V10.14c0-3.553-2.877-6.429-6.429-6.429h-8.685v2.335h4.341c2.6 0 2.503 0 2.503 0ZM6.76 11.832v-.108c0-1.715-.447-3.079-1.838-4.093c0 0 .097 0-2.504 0V5.296H11.1c3.553 0 6.429 2.876 6.429 6.429v3.676a6.41 6.41 0 0 1-1.892 4.542a6.42 6.42 0 0 1-4.542 1.892H2.417v-2.335h4.34c2.602 0 4.342-1.236 4.342-3.738v-3.71c0-1.715-.447-3.079-1.838-4.093c.002 1.715.002 4.093.002 4.093v.38Z" />
    </svg>
);

const SolarArrowIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7L5.5 18.5" /><path d="M8 7h9v9" /></g>
    </svg>
);

const DjangoIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
        <path d="M156.4 121.2h32.2V65.8h-32.2v55.4zM244.3 0H11.7C5.2 0 0 5.2 0 11.7v232.5c0 6.5 5.2 11.7 11.7 11.7h232.5c6.5 0 11.7-5.2 11.7-11.7V11.7C256 5.2 250.8 0 244.3 0zm-23.7 151.4c0 30.6-23.3 39.5-51.5 39.5c-15.6 0-33.8-3.1-42.2-6.5l4.5-25c7.3 3.3 22 6.7 34.6 6.7c15.8 0 24.3-5.2 24.3-16V145c-6.8 6.5-18.7 10-31 10c-28.5 0-46.7-22-46.7-51.5c0-30.8 19.6-53.7 49-53.7c13.7 0 24.5 4.3 30.2 10.3V38.1h32.8v113.3zm-105.4 67.2c-15.8 0-25.1-4.2-25.1-13.6c0-10.4 11.8-14 26.5-16.1l23.7-3.3v13.6c0 14-11 19.4-25.1 19.4zm50.6-67.2V83.1l-1.3-1.6c-4.3-5.6-11.3-8-19.1-8c-15.1 0-25.7 11.3-25.7 29c0 16.5 10.5 28 25 28c7.3 0 14.8-2.6 19.7-8.1l1.4-1z" />
    </svg>
);

const FramerIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className}>
        <path d="M0 0h170.667v85.333H85.333L0 170.667h85.333v85.333l170.667-170.667h-85.333L256 0H0z" />
    </svg>
);

// O NOVO ÍCONE DA VERCEL / NEXT.JS
const NextIcon = ({ className }: { className: string }) => (
    <svg viewBox="0 0 256 256" className={className} xmlns="http://www.w3.org/2000/svg">
        <g fill="none">
            <circle cx="128" cy="128" r="128" fill="black" />
            <path
                d="M193.387 206.293L109.813 98.44V185.347H96.373V71.467H109.813L190.493 175.467V71.467H203.933V193.027C203.933 197.72 200.12 201.533 195.427 201.533C194.733 201.533 194.04 201.44 193.387 206.293Z"
                fill="url(#nextWhiteGrad)"
            />
        </g>
        <defs>
            <linearGradient id="nextWhiteGrad" x1="128" y1="71" x2="128" y2="206" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0.8" />
            </linearGradient>
        </defs>
    </svg>
);


// === MAPEAMENTO DE ROTAS ===
const iconMap = {
    "logos:react": ReactIcon,
    "logos:typescript-icon": TypeScriptIcon,
    "logos:python": PythonIcon,
    "logos:google-bard-icon": GeminiIcon,
    "simple-icons:nextdotjs": NextIcon,
    "logos:tailwindcss-icon": TailwindIcon,
    "simple-icons:greensock": GsapIcon,
    "logos:django-icon": DjangoIcon,
    "logos:framer": FramerIcon,
    "solar:arrow-right-up-linear": SolarArrowIcon,
};

interface LocalIconProps {
    icon: string;
    className?: string;
}

// ESTA É A LINHA QUE O REACT ESTAVA A SENTIR FALTA!
export default function LocalIcon({ icon, className = '' }: LocalIconProps) {
    const IconComponent = iconMap[icon as keyof typeof iconMap];
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
}