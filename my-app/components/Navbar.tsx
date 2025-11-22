import React from 'react';

export default function Navbar() {
    return (
        <nav className="w-full py-6 px-8 flex items-center justify-center relative z-10 bg-white/80 backdrop-blur-sm sticky top-0">
            <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 2L2 22H22L12 2Z" fill="#4285F4" className="opacity-90" />
                        <path d="M12 6L6 18H18L12 6Z" fill="#EA4335" className="opacity-90" />
                        <path d="M12 10L9 16H15L12 10Z" fill="#FBBC04" className="opacity-90" />
                    </svg>
                </div>
                <span className="text-[22px] font-medium text-[#5f6368] tracking-tight">Guardian</span>
                <span className="text-[22px] font-normal text-[#5f6368] tracking-tight">of Web</span>
            </div>
        </nav>
    );
}
