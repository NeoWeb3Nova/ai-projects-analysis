import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                        <span className="text-white font-bold text-lg">AI</span>
                    </div>
                    <span className="font-heading font-bold text-2xl text-blue-900 tracking-tight">
                        案例拆解
                    </span>
                </Link>
            </div>
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {children}
            </div>
            <div className="mt-8 text-center text-sm text-slate-500">
                © 2026 AI案例拆解平台. All rights reserved.
            </div>
        </div>
    );
}
