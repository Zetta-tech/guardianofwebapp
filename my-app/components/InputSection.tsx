"use client";

import React, { useState } from 'react';
import { Upload, FileText, Link as LinkIcon, Loader2 } from 'lucide-react';

interface InputSectionProps {
    onAnalyze: (type: 'file' | 'text' | 'url', content: File | string) => void;
    isAnalyzing: boolean;
}

export default function InputSection({ onAnalyze, isAnalyzing }: InputSectionProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'text' | 'url'>('upload');
    const [textInput, setTextInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (activeTab === 'upload' && file) {
            onAnalyze('file', file);
        } else if (activeTab === 'text' && textInput) {
            onAnalyze('text', textInput);
        } else if (activeTab === 'url' && urlInput) {
            onAnalyze('url', urlInput);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
            <div className="flex p-1 gap-1 bg-gray-100 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'upload'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                        }`}
                >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                </button>
                <button
                    onClick={() => setActiveTab('text')}
                    className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'text'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                        }`}
                >
                    <FileText className="w-4 h-4" />
                    <span>Paste Text</span>
                </button>
                <button
                    onClick={() => setActiveTab('url')}
                    className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'url'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                        }`}
                >
                    <LinkIcon className="w-4 h-4" />
                    <span>Link</span>
                </button>
            </div>

            <div className="px-4 pb-4 min-h-[250px] flex flex-col items-center justify-center transition-all duration-300">
                {activeTab === 'upload' && (
                    <div className="w-full flex flex-col items-center animate-zoom-in">
                        <label className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1a73e8] hover:bg-[#1a73e8]/5 transition-all group bg-gray-50">
                            <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
                            <div className="p-3 rounded-full bg-white shadow-sm group-hover:shadow-md mb-3 transition-all">
                                <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#1a73e8] transition-colors" />
                            </div>
                            <p className="text-gray-600 font-medium group-hover:text-[#1a73e8] transition-colors">
                                {file ? file.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT (Max 10MB)</p>
                        </label>
                    </div>
                )}

                {activeTab === 'text' && (
                    <div className="w-full animate-zoom-in">
                        <textarea
                            className="w-full h-48 bg-gray-50 border border-gray-300 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] resize-none transition-all"
                            placeholder="Paste your Terms & Conditions here..."
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                    </div>
                )}

                {activeTab === 'url' && (
                    <div className="w-full flex flex-col gap-4 animate-zoom-in">
                        <div className="relative group">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a73e8] transition-colors w-5 h-5" />
                            <input
                                type="url"
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                                placeholder="https://example.com/terms"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                            />
                        </div>
                        <p className="text-sm text-gray-500 text-center">We'll extract the text from the page for you.</p>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isAnalyzing || (activeTab === 'upload' && !file) || (activeTab === 'text' && !textInput) || (activeTab === 'url' && !urlInput)}
                    className="mt-6 w-full max-w-xs py-3 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        "Analyze Risks"
                    )}
                </button>
            </div>
        </div>
    );
}
