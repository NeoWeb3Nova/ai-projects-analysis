import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, Share2, Folder, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCaseBySlug, getAllCases } from '@/lib/content';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getLocaleServer, getTServer } from '@/lib/i18n-server';

export async function generateStaticParams() {
    const cases = getAllCases();
    return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = getCaseBySlug(slug);
    if (!caseStudy) return {};

    return {
        title: `${caseStudy.title} - AI Projects Analysis`,
        description: caseStudy.summary,
    };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = await getLocaleServer();
    const t = await getTServer();
    const caseStudy = getCaseBySlug(slug, locale);

    if (!caseStudy) {
        notFound();
    }

    const { title, category, monetization, stage, publishedAt, tags, content, cover } = caseStudy;

    // Get related cases (same category)
    const relatedCases = getAllCases(locale)
        .filter(c => c.slug !== slug && c.category === category)
        .slice(0, 4);

    // Generate a consistent gradient based on slug for the "Shot" placeholder
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
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Nav Area for Shot */}
            <header className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${slug}`} />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold font-heading leading-tight truncate max-w-[200px] md:max-w-md">
                                {title}
                            </h1>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <span>by</span>
                                <span className="font-medium text-primary">AI Analyst</span>
                                <span>•</span>
                                <span className="hover:text-foreground cursor-pointer">Follow</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="hidden sm:flex">
                            Save
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-white" size="sm">
                            <Heart className="w-4 h-4 mr-2 fill-current" />
                            Like
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

                    {/* Main Content (The Shot) */}
                    <main>
                        {/* Visual Asset */}
                        <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center mb-10 shadow-sm border border-border/50 relative overflow-hidden`}>
                            {cover ? (
                                <Image
                                    src={cover}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <span className="text-white/30 font-heading font-bold text-6xl select-none">
                                    {title.charAt(0)}
                                </span>
                            )}
                        </div>



                        {/* Description */}
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {content}
                            </ReactMarkdown>
                        </div>

                        {/* Comments Stub */}
                        <div className="mt-16 pt-8 border-t border-border">
                            <h3 className="font-heading font-bold text-lg mb-6">{t('common.comments')}</h3>
                            <div className="bg-secondary/30 rounded-lg p-8 text-center text-muted-foreground">
                                {t('common.noComments')}
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <Button className="w-full justify-start" variant="secondary">
                                <Share2 className="w-4 h-4 mr-2" />
                                {t('common.share')}
                            </Button>
                            <Button className="w-full justify-start" variant="secondary">
                                <Folder className="w-4 h-4 mr-2" />
                                {t('common.addCollection')}
                            </Button>
                        </div>

                        {/* Shot Details */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t('common.category')}</span>
                                <span className="font-medium">{category}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t('common.monetization')}</span>
                                <span className="font-medium">{monetization}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t('common.stage')}</span>
                                <span className="font-medium">{stage}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{t('common.published')}</span>
                                <span className="font-medium">{new Date(publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h4 className="font-medium text-sm mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="hover:bg-secondary/80 cursor-pointer font-normal text-muted-foreground">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* More from Author Stub */}
                        <div className="border-t border-border pt-6">
                            <h4 className="font-medium text-sm mb-4">{t('common.moreFrom')} AI Analyst</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="aspect-[4/3] bg-secondary rounded-md hover:opacity-80 transition-opacity cursor-pointer"></div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Shots Bottom */}
                <section className="mt-20 pt-12 border-t border-border">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-heading font-bold text-xl">{t('home.grid.youMightLike')}</h3>
                        <Link href="/cases" className="text-sm font-medium text-primary hover:underline">
                            {t('home.grid.viewAll')}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedCases.map((relatedCase) => (
                            <Link
                                key={relatedCase.slug}
                                href={`/cases/${relatedCase.slug}`}
                                className="group block"
                            >
                                <div className={`aspect-[4/3] rounded-lg bg-secondary mb-3 overflow-hidden`}>
                                    {/* Placeholder Image */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-500"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm truncate pr-2">{relatedCase.title}</span>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Heart className="w-3 h-3" />
                                        <span>24</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
