import React from 'react';
import { AlertTriangle, CheckCircle, AlertOctagon, Info } from 'lucide-react';

interface Risk {
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
}

interface AnalysisResultProps {
    risks: Risk[];
    summary: string;
}

export default function AnalysisResult({ risks, summary }: AnalysisResultProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12 space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8]/5 blur-[80px] -z-10 rounded-full pointer-events-none" />
                <h2 className="text-2xl font-medium mb-4 flex items-center gap-3 text-gray-900">
                    <Info className="text-[#1a73e8] w-6 h-6" />
                    Summary
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">{summary}</p>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 ml-2 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-red-500" />
                    Identified Risks
                </h3>
                <div className="grid gap-4">
                    {risks.map((risk, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl p-6 border transition-all hover:shadow-md group ${risk.severity === 'high'
                                ? 'border-red-200 hover:border-red-300'
                                : risk.severity === 'medium'
                                    ? 'border-yellow-200 hover:border-yellow-300'
                                    : 'border-blue-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-lg ${risk.severity === 'high'
                                    ? 'bg-red-50'
                                    : risk.severity === 'medium'
                                        ? 'bg-yellow-50'
                                        : 'bg-blue-50'
                                    }`}>
                                    {risk.severity === 'high' && <AlertOctagon className="text-red-500 w-6 h-6" />}
                                    {risk.severity === 'medium' && <AlertTriangle className="text-yellow-500 w-6 h-6" />}
                                    {risk.severity === 'low' && <CheckCircle className="text-blue-500 w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={`font-bold text-lg ${risk.severity === 'high'
                                            ? 'text-red-700'
                                            : risk.severity === 'medium'
                                                ? 'text-yellow-700'
                                                : 'text-blue-700'
                                            }`}>
                                            {risk.title}
                                        </h4>
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${risk.severity === 'high'
                                            ? 'border-red-200 text-red-700 bg-red-50'
                                            : risk.severity === 'medium'
                                                ? 'border-yellow-200 text-yellow-700 bg-yellow-50'
                                                : 'border-blue-200 text-blue-700 bg-blue-50'
                                            }`}>
                                            {risk.severity.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{risk.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
