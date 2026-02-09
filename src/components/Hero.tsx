'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
    tags: string[];
}

export function Hero({ tags }: HeroProps) {
    const { t } = useLanguage();

    return (
        <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 text-center overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="glow-blob w-[300px] h-[300px] bg-primary top-0 -left-20 animate-in fade-in duration-1000" />
            <div className="glow-blob w-[400px] h-[400px] bg-violet-500 bottom-0 -right-20 [animation-delay:2s]" />
            <div className="glow-blob w-[250px] h-[250px] bg-blue-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

            <div className="max-w-4xl mx-auto space-y-10 relative z-10">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                    <h1 className="text-gradient">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-lead w-full max-w-2xl mx-auto text-muted-foreground/80">
                        {t('home.hero.subtitle')}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200 ease-out">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-all duration-300" />
                        <input
                            type="text"
                            placeholder={t('home.search.placeholder')}
                            className="w-full h-14 sm:h-20 pl-16 sm:pl-18 pr-8 rounded-full glass-effect text-lg sm:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary/40 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:-translate-y-1"
                        />
                    </div>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap justify-center items-center gap-3 text-sm sm:text-base animate-in fade-in duration-1000 delay-500">
                    <span className="text-muted-foreground font-medium">{t('home.search.trending')}</span>
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                href={`/cases?tag=${tag}`}
                                className="px-4 py-1.5 rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-all duration-300 border border-border/50"
                            >
                                {t(`home.labels.tags.${tag}`)}
                            </Link>
                        ))}
                        <Link
                            href="/cases"
                            className="px-4 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
                        >
                            {t('home.search.more')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
