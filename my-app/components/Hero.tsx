import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center relative z-10 animate-fade-in-up">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-primary blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
                <ShieldCheck className="w-24 h-24 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                Guardian of Web
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                Your personal AI legal assistant. Upload contracts, paste terms, or drop a link to uncover hidden risks and protect your rights.
            </p>
        </div>
    );
}
