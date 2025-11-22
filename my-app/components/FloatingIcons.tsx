import React from 'react';
import {
    Copy, Sparkles, Code, ArrowUp, Box, Move,
    Terminal, CheckCircle, GitBranch, RefreshCw,
    Command, PenTool, ArrowLeft, Monitor, ArrowRight
} from 'lucide-react';

const icons = [
    { Icon: Copy, delay: 0 },
    { Icon: Sparkles, delay: 100 },
    { Icon: Code, delay: 200 },
    { Icon: ArrowUp, delay: 300 },
    { Icon: Box, delay: 400 },
    { Icon: Move, delay: 500 },
    { Icon: Terminal, delay: 600 },
    { Icon: Code, delay: 700 }, // Placeholder for brackets
    { Icon: CheckCircle, delay: 800 },
    { Icon: GitBranch, delay: 900 },
    { Icon: RefreshCw, delay: 1000 },
    { Icon: Command, delay: 1100 },
    { Icon: PenTool, delay: 1200 },
    { Icon: ArrowLeft, delay: 1300 },
    { Icon: Monitor, delay: 1400 },
    { Icon: ArrowRight, delay: 1500 },
];

export default function FloatingIcons() {
    return (
        <div className="w-full overflow-hidden py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-normal text-[#202124] mb-4 leading-tight">
                        Google Antigravity is our agentic development platform, evolving the IDE into the agent-first era.
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {icons.map(({ Icon, delay }, index) => (
                        <div
                            key={index}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up hover:text-[#1a73e8] hover:border-[#1a73e8]/20"
                            style={{ animationDelay: `${delay}ms` }}
                        >
                            <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
