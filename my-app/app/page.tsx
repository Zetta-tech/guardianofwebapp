"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import LandingHero from '@/components/LandingHero';
import InputSection from '@/components/InputSection';
import AnalysisResult from '@/components/AnalysisResult';

export default function Home() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async (type: 'file' | 'text' | 'url', content: File | string) => {
        setIsAnalyzing(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('type', type);
            if (content instanceof File) {
                formData.append('file', content);
            } else {
                formData.append('content', content);
            }

            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error analyzing:", error);
            alert("An error occurred while analyzing. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <LandingHero />

            <div className="w-full max-w-7xl mx-auto px-6 pb-20">
                <InputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

                {result && (
                    <AnalysisResult risks={result.risks} summary={result.summary} />
                )}
            </div>

            <footer className="w-full py-12 border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-6">
                        <span>Guardian of Web</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                    <p>© {new Date().getFullYear()} Guardian of Web</p>
                </div>
            </footer>
        </main>
    );
}
