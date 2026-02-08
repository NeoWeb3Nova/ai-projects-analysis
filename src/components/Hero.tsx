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
        <section className="relative py-20 px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-4">
                    {/* Simplified title with one translation key, or split if needed. Dictionary has it as one string. */}
                    <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground w-full max-w-2xl mx-auto leading-relaxed">
                        {t('home.hero.subtitle')}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <input
                            type="text"
                            placeholder={t('home.search.placeholder')}
                            className="w-full h-16 pl-16 pr-6 rounded-full bg-white border border-border shadow-sm text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all"
                        />
                    </div>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                    <span>{t('home.search.trending')}</span>
                    {tags.map(tag => (
                        <Link key={tag} href={`/cases?tag=${tag}`} className="hover:text-primary transition-colors">
                            {tag},
                        </Link>
                    ))}
                    <Link href="/cases" className="hover:text-primary transition-colors">{t('home.search.more')}</Link>
                </div>
            </div>
        </section>
    );
}
