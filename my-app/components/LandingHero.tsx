"use client";
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function LandingHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particleCount = 40;
            const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.globalAlpha = 0.4;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        createParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden bg-white">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            <div className="z-10 text-center max-w-4xl px-4 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-[#202124] mb-6 leading-[1.1]">
                    Analyze Terms & Conditions<br />
                    <span className="text-[#5f6368]">with AI-powered precision</span>
                </h1>

                <p className="text-lg text-[#5f6368] max-w-2xl mx-auto mb-8">
                    Upload contracts, paste text, or drop a link to uncover hidden risks and protect your rights instantly.
                </p>
            </div>
        </section>
    );
}
