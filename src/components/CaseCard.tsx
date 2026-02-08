'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Maximize2, Folder } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { CaseStudy } from '@/types';

interface CaseCardProps {
    caseStudy: CaseStudy;
}

export function CaseCard({ caseStudy }: CaseCardProps) {
    const { slug, title, category, monetization, publishedAt } = caseStudy;

    // Generate a consistent gradient or color based on the title or slug for placeholder
    const gradients = [
        "from-pink-500 to-rose-500",
        "from-purple-500 to-indigo-500",
        "from-blue-400 to-cyan-400",
        "from-emerald-400 to-teal-500",
        "from-orange-400 to-amber-500"
    ];
    const gradientIndex = slug.length % gradients.length;
    const bgGradient = gradients[gradientIndex];

    return (
        <div className="group flex flex-col gap-2">
            {/* Shot Card - Image Area */}
            <div className="shot-card aspect-[4/3] group relative">
                {/* Image Placeholder or Actual Image */}
                <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex items-center justify-center overflow-hidden`}>
                    {caseStudy.cover ? (
                        <Image
                            src={caseStudy.cover}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <span className="text-white/20 font-heading font-bold text-4xl select-none">Aa</span>
                    )}
                </div>

                {/* Overlay */}
                <Link href={`/cases/${slug}`} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
                    <span className="sr-only">View {title}</span>
                </Link>

                <div className="shot-overlay">
                    <div className="flex justify-between items-end w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white font-medium truncate pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {title}
                        </div>
                        <div className="flex gap-2 relative z-20">
                            <button className="h-8 w-8 bg-white text-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Save">
                                <Folder className="w-4 h-4" />
                            </button>
                            <button className="h-8 w-8 bg-white text-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm" aria-label="Like">
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta Footer */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${slug}`} />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {title}
                    </span>
                    <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] h-5 px-1.5 font-normal bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        {category}
                    </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                        <Heart className="w-3.5 h-3.5 fill-current opacity-60" />
                        <span>{10 + (slug.length * 2)}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer">
                        <Maximize2 className="w-3.5 h-3.5 opacity-60" />
                        <span>{100 + (slug.length * 15)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
