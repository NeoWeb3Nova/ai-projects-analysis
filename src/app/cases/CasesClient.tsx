'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, ChevronDown } from 'lucide-react';
import { CaseCard } from '@/components/CaseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from '@/contexts/LanguageContext';

const ALL_CATEGORIES = 'ALL_CATEGORIES';
const ALL_MODELS = 'ALL_MODELS';

interface CasesClientProps {
    initialCases: CaseStudy[];
    categories: string[];
    monetizationTypes: string[];
}

export function CasesClient({ initialCases, categories, monetizationTypes }: CasesClientProps) {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
    const [selectedMonetization, setSelectedMonetization] = useState<string>(ALL_MODELS);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    // Filter and sort cases
    const filteredCases = useMemo(() => {
        let cases = [...initialCases];

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            cases = cases.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.summary.toLowerCase().includes(query) ||
                c.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply category filter
        if (selectedCategory !== ALL_CATEGORIES) {
            cases = cases.filter(c => c.category === selectedCategory);
        }

        // Apply monetization filter
        if (selectedMonetization !== ALL_MODELS) {
            cases = cases.filter(c => c.monetization === selectedMonetization);
        }

        // Sort
        cases = [...cases].sort((a, b) => {
            const dateA = new Date(a.publishedAt).getTime();
            const dateB = new Date(b.publishedAt).getTime();
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return cases;
    }, [initialCases, searchQuery, selectedCategory, selectedMonetization, sortBy]);

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory(ALL_CATEGORIES);
        setSelectedMonetization(ALL_MODELS);
        setSortBy('newest');
    };

    return (
        <div className="min-h-screen pb-16 pt-8 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header & Filters Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 rounded-lg border-border bg-background hover:bg-secondary text-foreground font-medium flex items-center gap-2">
                                    {selectedCategory === ALL_CATEGORIES ? t('home.filters.allCategories') : selectedCategory}
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedCategory(ALL_CATEGORIES)}>
                                    {t('home.filters.allCategories')}
                                </DropdownMenuItem>
                                {categories.map(cat => (
                                    <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                                        {cat}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-10 px-4 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary font-medium flex items-center gap-2">
                                    {selectedMonetization === ALL_MODELS ? t('home.filters.allModels') : selectedMonetization}
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedMonetization(ALL_MODELS)}>
                                    {t('home.filters.allModels')}
                                </DropdownMenuItem>
                                {monetizationTypes.map(type => (
                                    <DropdownMenuItem key={type} onClick={() => setSelectedMonetization(type)}>
                                        {type}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder={t('home.filters.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 rounded-lg bg-secondary/50 border-transparent focus:bg-background focus:border-border transition-all"
                        />
                    </div>
                </div>

                {/* Results Grid */}
                {filteredCases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCases.map(caseStudy => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-medium text-foreground mb-2">
                            {t('home.filters.noResults')}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {t('home.filters.tryAdjusting')}
                        </p>
                        <Button onClick={resetFilters} variant="outline">
                            {t('home.filters.clearFilters')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
