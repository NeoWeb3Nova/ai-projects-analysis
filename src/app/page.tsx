import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/CaseCard';
import { Badge } from '@/components/ui/badge';
import { getAllCases } from '@/lib/content';

export default function HomePage() {
    const allCases = getAllCases();
    const featuredCases = allCases.slice(0, 6);
    const allTags = [...new Set(allCases.flatMap(c => c.tags))].slice(0, 8);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-6 bg-blue-100 text-blue-700">
                        AI落地 + 盈利拆解
                    </Badge>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-blue-900 mb-6 leading-tight">
                        拆解AI项目的<br />变现路径
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        为爱发电是不够的，一定要变现才能生存。
                        深入拆解AI项目落地和盈利模式，一步一步理解变现路径。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/cases">
                            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-lg px-8">
                                浏览案例
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/consulting">
                            <Button size="lg" variant="outline" className="text-lg px-8 border-blue-300 text-blue-700 hover:bg-blue-50">
                                咨询服务
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6 bg-white/50">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-700" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-blue-900 mb-1">50+</div>
                        <div className="text-sm text-slate-600">真实案例</div>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-700" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-blue-900 mb-1">¥1M+</div>
                        <div className="text-sm text-slate-600">合计月收入</div>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-700" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-blue-900 mb-1">10K+</div>
                        <div className="text-sm text-slate-600">服务用户</div>
                    </div>
                </div>
            </section>

            {/* Featured Cases */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="font-heading font-bold text-2xl text-blue-900 mb-2">
                                最新案例
                            </h2>
                            <p className="text-slate-600">深入了解AI项目的变现路径</p>
                        </div>
                        <Link href="/cases">
                            <Button variant="ghost" className="text-blue-700 hover:text-blue-800">
                                查看全部
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCases.map(caseStudy => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tags Cloud */}
            <section className="py-12 px-6 bg-white/50">
                <div className="max-w-4xl mx-auto">
                    <h3 className="font-heading font-semibold text-lg text-blue-900 mb-6 text-center">
                        热门标签
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {allTags.map(tag => (
                            <Link key={tag} href={`/cases?tag=${tag}`}>
                                <Badge variant="outline" className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
                                    #{tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto text-center text-slate-600">
                    <p className="mb-2">© 2025 AI案例拆解. 深入理解AI变现路径.</p>
                    <Link href="/consulting" className="text-blue-700 hover:underline">
                        需要AI项目咨询？
                    </Link>
                </div>
            </footer>
        </div>
    );
}
