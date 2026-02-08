'use client';

import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookmarksPage() {
    return (
        <div className="relative min-h-screen pt-20 pb-16">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6">
                <div className="glass-card rounded-2xl p-12 text-center animate-accordion-down">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-primary/5">
                        <Bookmark className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="font-heading font-bold text-4xl text-foreground mb-4 drop-shadow-sm">
                        我的收藏
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
                        登录后即可收藏您感兴趣的案例，构建您的专属灵感库
                    </p>
                    <Link href="/auth/login">
                        <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-300">
                            立即登录
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
