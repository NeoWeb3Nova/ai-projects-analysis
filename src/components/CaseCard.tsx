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
        <Link href={`/cases/${slug}`} className="block">
            <article className="bento-card h-full flex flex-col cursor-pointer">
                {/* Cover Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-blue-300 font-heading font-bold text-4xl">AI</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-xs">
                        {category}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-xs">
                        {monetization}
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-full text-xs">
                        {stage}
                    </Badge>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
                    {summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-xs text-slate-500">
                        {new Date(publishedAt).toLocaleDateString('zh-CN')}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-green-50 hover:text-green-600 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement bookmark
                            }}
                        >
                            <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement share
                            }}
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </article>
        </Link>
    );
}
