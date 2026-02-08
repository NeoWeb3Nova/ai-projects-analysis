'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { CaseCard } from '@/components/CaseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/types';

interface CasesClientProps {
    initialCases: CaseStudy[];
    categories: string[];
    monetizationTypes: string[];
}

export function CasesClient({ initialCases, categories, monetizationTypes }: CasesClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');
    const [selectedMonetization, setSelectedMonetization] = useState<string>('全部');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

    const allCategories = ['全部', ...categories];
    const allMonetizationTypes = ['全部', ...monetizationTypes];

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
        if (selectedCategory !== '全部') {
            cases = cases.filter(c => c.category === selectedCategory);
        }

        // Apply monetization filter
        if (selectedMonetization !== '全部') {
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
        setSelectedCategory('全部');
        setSelectedMonetization('全部');
        setSortBy('newest');
    };

    return (
        <div className="relative min-h-screen pb-16 pt-8">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-40 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Page Header */}
                <div className="mb-12 text-center animate-accordion-down">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        <span className="text-gradient-purple">AI案例库</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        探索AI项目的落地路径和盈利模式
                    </p>
                </div>

                <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Search Bar */}
                    <div className="relative mb-8 max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="搜索案例..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 text-lg rounded-xl bg-black/20 border-white/10 focus:bg-black/40 transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            {/* Category Filter */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-2 mr-2">
                                    <Filter className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-foreground">分类:</span>
                                </div>
                                {allCategories.map(category => (
                                    <Badge
                                        key={category}
                                        variant={selectedCategory === category ? 'default' : 'outline'}
                                        className={cn(
                                            'cursor-pointer px-3 py-1.5 transition-all duration-300',
                                            selectedCategory === category
                                                ? 'bg-primary hover:bg-primary/90 shadow-[0_0_10px_rgba(124,58,237,0.3)] border-transparent'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 text-muted-foreground hover:text-foreground'
                                        )}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </Badge>
                                ))}
                            </div>

                            {/* Monetization Filter */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-2 mr-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    <span className="text-sm font-medium text-foreground">变现:</span>
                                </div>
                                {allMonetizationTypes.map(type => (
                                    <Badge
                                        key={type}
                                        variant={selectedMonetization === type ? 'default' : 'outline'}
                                        className={cn(
                                            'cursor-pointer px-3 py-1.5 transition-all duration-300',
                                            selectedMonetization === type
                                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_10px_rgba(16,185,129,0.3)] border-transparent'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-emerald-500/30 text-muted-foreground hover:text-foreground'
                                        )}
                                        onClick={() => setSelectedMonetization(type)}
                                    >
                                        {type}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Sort and Reset */}
                        <div className="flex items-center gap-4 self-end md:self-auto">
                            <div className="text-sm text-muted-foreground whitespace-nowrap">
                                共 <span className="font-semibold text-foreground">{filteredCases.length}</span> 个案例
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                className="px-3 py-2 rounded-lg text-sm bg-black/20 border border-white/10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer hover:bg-white/5 transition-colors"
                            >
                                <option value="newest" className="bg-slate-900">最新优先</option>
                                <option value="oldest" className="bg-slate-900">最早优先</option>
                            </select>
                            {searchQuery || selectedCategory !== '全部' || selectedMonetization !== '全部' ? (
                                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground hover:text-primary hover:bg-white/5">
                                    重置
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {filteredCases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-700 delay-200">
                        {filteredCases.map(caseStudy => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-card rounded-2xl p-16 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                            未找到匹配的案例
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            尝试调整搜索词或筛选条件，或者清除所有筛选重新开始
                        </p>
                        <Button onClick={resetFilters} variant="outline" className="border-white/10 hover:bg-white/5">
                            重置所有筛选
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
