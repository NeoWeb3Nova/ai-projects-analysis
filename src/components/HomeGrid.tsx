'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { CaseCard } from '@/components/CaseCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CaseStudy } from '@/lib/content';

interface HomeGridProps {
    cases: CaseStudy[];
}

export function HomeGrid({ cases }: HomeGridProps) {
    const { t } = useLanguage();

    return (
        <section className="px-6 pb-20">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                        <Button variant="secondary" className="rounded-lg h-9 text-sm font-medium px-4 bg-secondary text-foreground whitespace-nowrap">
                            {t('home.grid.allProjects')}
                        </Button>
                        {/* Static buttons for categories/tags - in real app might be dynamic or translated */}
                        {['Animation', 'Branding', 'Illustration', 'Mobile', 'Print'].map(cat => (
                            <Button key={cat} variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground whitespace-nowrap">
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg text-xs font-medium border-border">
                            <Filter className="w-3.5 h-3.5 mr-2" />
                            {t('home.grid.filter')}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {cases.map((caseStudy) => (
                        <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="h-12 px-8 rounded-full font-medium text-foreground border-border hover:bg-secondary hover:text-foreground transition-all">
                        {t('home.grid.signUp')}
                    </Button>
                </div>
            </div>
        </section>
    );
}
