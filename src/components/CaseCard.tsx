'use client';

import Link from 'next/link';
import { Bookmark, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CaseStudy } from '@/types';

interface CaseCardProps {
    caseStudy: CaseStudy;
}

export function CaseCard({ caseStudy }: CaseCardProps) {
    const { slug, title, summary, category, monetization, stage, publishedAt, tags } = caseStudy;

    return (
        <article className="group relative h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Clickable Overlay */}
            <Link href={`/cases/${slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">查看 {title}</span>
            </Link>

            {/* Cover Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 mb-4 flex items-center justify-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-white/50 backdrop-blur shadow-sm flex items-center justify-center">
                    <span className="text-primary font-heading font-bold text-2xl">AI</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5 pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-medium px-2.5 py-0.5 text-xs text-primary bg-primary/10 hover:bg-primary/20 transition-colors pointer-events-none">
                        {category}
                    </Badge>
                    <Badge variant="secondary" className="font-medium px-2.5 py-0.5 text-xs text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 pointer-events-none">
                        {monetization}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <span className="text-xs text-muted-foreground font-medium">
                        {new Date(publishedAt).toLocaleDateString('zh-CN')}
                    </span>
                    <div className="flex items-center gap-2 relative z-20">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // TODO: Implement bookmark
                            }}
                        >
                            <Bookmark className="w-4 h-4" />
                            <span className="sr-only">收藏</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // TODO: Implement share
                            }}
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="sr-only">分享</span>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
