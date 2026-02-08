'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
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
        <div className="min-h-screen pb-16">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="font-heading font-bold text-3xl text-blue-900 mb-2">
                        AI案例库
                    </h1>
                    <p className="text-slate-600">
                        探索AI项目的落地路径和盈利模式
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="搜索案例..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 text-base"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-600">筛选:</span>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map(category => (
                                <Badge
                                    key={category}
                                    variant={selectedCategory === category ? 'default' : 'outline'}
                                    className={cn(
                                        'cursor-pointer px-4 py-2',
                                        selectedCategory === category
                                            ? 'bg-blue-700 hover:bg-blue-800'
                                            : 'hover:bg-blue-50 hover:border-blue-300'
                                    )}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Monetization Filter */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {allMonetizationTypes.map(type => (
                            <Badge
                                key={type}
                                variant={selectedMonetization === type ? 'default' : 'outline'}
                                className={cn(
                                    'cursor-pointer px-4 py-2',
                                    selectedMonetization === type
                                        ? 'bg-green-700 hover:bg-green-800'
                                        : 'hover:bg-green-50 hover:border-green-300'
                                )}
                                onClick={() => setSelectedMonetization(type)}
                            >
                                {type}
                            </Badge>
                        ))}
                    </div>

                    {/* Sort and Reset */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                            找到 <span className="font-semibold text-blue-900">{filteredCases.length}</span> 个案例
                        </div>
                        <div className="flex items-center gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                                className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="newest">最新优先</option>
                                <option value="oldest">最早优先</option>
                            </select>
                            {searchQuery || selectedCategory !== '全部' || selectedMonetization !== '全部' ? (
                                <Button variant="ghost" size="sm" onClick={resetFilters}>
                                    重置筛选
                                </Button>
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* Results */}
                {filteredCases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCases.map(caseStudy => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-slate-900 mb-2">
                            未找到匹配的案例
                        </h3>
                        <p className="text-slate-600 mb-4">
                            尝试调整搜索词或筛选条件
                        </p>
                        <Button onClick={resetFilters}>
                            重置筛选
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
