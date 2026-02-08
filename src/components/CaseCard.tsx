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
        <article className="group relative h-full flex flex-col bg-secondary/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] hover:border-primary/50 hover:-translate-y-2">
            {/* Clickable Overlay */}
            <Link href={`/cases/${slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">查看 {title}</span>
            </Link>

            {/* Cover Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black mb-4 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-primary font-heading font-bold text-2xl drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]">AI</span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5 pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="font-medium px-2.5 py-0.5 text-xs text-primary border-primary/20 bg-primary/5">
                        {category}
                    </Badge>
                    <Badge variant="outline" className="font-medium px-2.5 py-0.5 text-xs text-emerald-400 border-emerald-500/20 bg-emerald-500/5">
                        {monetization}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-cyan-400 transition-all duration-300">
                    {title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors">
                    {summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                        {new Date(publishedAt).toLocaleDateString('zh-CN')}
                    </span>
                    <div className="flex items-center gap-2 relative z-20">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-full"
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
                            className="h-8 w-8 text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors rounded-full"
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
