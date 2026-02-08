import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Share2, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getCaseBySlug, getAllCases } from '@/lib/content';

export async function generateStaticParams() {
    const cases = getAllCases();
    return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = getCaseBySlug(slug);
    if (!caseStudy) return {};

    return {
        title: `${caseStudy.title} - AI案例拆解`,
        description: caseStudy.summary,
    };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = getCaseBySlug(slug);

    if (!caseStudy) {
        notFound();
    }

    const { title, category, monetization, stage, publishedAt, tags, content } = caseStudy;

    // Get related cases (same category)
    const relatedCases = getAllCases()
        .filter(c => c.slug !== slug && c.category === category)
        .slice(0, 3);

    return (
        <div className="min-h-screen pb-16">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Back Button */}
                <Link href="/cases">
                    <Button variant="ghost" className="mb-6">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        返回案例列表
                    </Button>
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1">
                            {category}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 font-medium px-3 py-1">
                            {monetization}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-700 font-medium px-3 py-1">
                            {stage}
                        </Badge>
                    </div>

                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-blue-900 mb-4">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(publishedAt).toLocaleDateString('zh-CN')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <div className="flex gap-2">
                                {tags.map(tag => (
                                    <span key={tag} className="text-blue-700">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <Button className="bg-blue-700 hover:bg-blue-800">
                            <Bookmark className="mr-2 w-4 h-4" />
                            收藏案例
                        </Button>
                        <Button variant="outline">
                            <Share2 className="mr-2 w-4 h-4" />
                            分享
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-blue max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, '<br />') || '' }} />
                </article>

                {/* CTA Section */}
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="font-heading font-bold text-2xl text-blue-900 mb-4">
                            需要AI项目落地咨询？
                        </h3>
                        <p className="text-slate-700 mb-6">
                            我们提供专业的AI项目落地和变现咨询服务，帮助您从0到1实现AI商业化。
                        </p>
                        <Link href="/consulting">
                            <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                                立即咨询
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Related Cases */}
                {relatedCases.length > 0 && (
                    <div className="mt-12">
                        <h2 className="font-heading font-bold text-2xl text-blue-900 mb-6">
                            相关案例
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedCases.map(relatedCase => (
                                <Link
                                    key={relatedCase.slug}
                                    href={`/cases/${relatedCase.slug}`}
                                    className="block bento-card cursor-pointer"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4 flex items-center justify-center">
                                        <span className="text-blue-300 font-heading font-bold text-2xl">AI</span>
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg text-blue-900 mb-2 line-clamp-2">
                                        {relatedCase.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">
                                        {relatedCase.summary}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
