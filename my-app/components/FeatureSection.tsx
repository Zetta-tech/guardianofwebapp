import React from 'react';
import Image from 'next/image';

export default function FeatureSection() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/3 space-y-6">
                    <h2 className="text-3xl font-normal text-gray-900">Cross-surface Agents</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Synchronized agentic control across your editor, terminal, and browser for powerful development workflows.
                    </p>
                    <div className="pt-8">
                        <p className="text-gray-400 text-lg">User Feedback</p>
                    </div>
                </div>

                <div className="md:w-2/3 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 aspect-video">
                        {/* Placeholder for the screenshot if not available, or use the actual image */}
                        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500">
                            <Image
                                src="/feature-screenshot.png"
                                alt="Cross-surface Agents Interface"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
