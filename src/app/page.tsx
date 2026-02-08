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
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="max-w-4xl mx-auto text-center">
                    <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        AI落地 + 盈利拆解
                    </Badge>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6 leading-tight text-balance">
                        拆解AI项目的<br />变现路径
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                        为爱发电是不够的，一定要变现才能生存。
                        深入拆解AI项目落地和盈利模式，一步一步理解变现路径。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="text-lg px-8 shadow-lg shadow-primary/20">
                            <Link href="/cases">
                                浏览案例
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-lg px-8 hover:bg-secondary">
                            <Link href="/consulting">
                                咨询服务
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6 border-y border-border bg-card/50 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground mb-1">50+</div>
                        <div className="text-sm text-muted-foreground">真实案例</div>
                    </div>
                    <div className="text-center group">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground mb-1">¥1M+</div>
                        <div className="text-sm text-muted-foreground">合计月收入</div>
                    </div>
                    <div className="text-center group">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-heading font-bold text-foreground mb-1">10K+</div>
                        <div className="text-sm text-muted-foreground">服务用户</div>
                    </div>
                </div>
            </section>

            {/* Featured Cases */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="font-heading font-bold text-3xl text-foreground mb-2">
                                最新案例
                            </h2>
                            <p className="text-muted-foreground">深入了解AI项目的变现路径</p>
                        </div>
                        <Button asChild variant="ghost" className="hidden sm:inline-flex hover:bg-transparent hover:text-primary p-0">
                            <Link href="/cases" className="group">
                                查看全部
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCases.map(caseStudy => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Button asChild variant="ghost">
                            <Link href="/cases">
                                查看全部
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Tags Cloud */}
            <section className="py-20 px-6 bg-secondary/30">
                <div className="max-w-4xl mx-auto">
                    <h3 className="font-heading font-semibold text-2xl text-foreground mb-8 text-center">
                        热门标签
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {allTags.map(tag => (
                            <Link key={tag} href={`/cases?tag=${tag}`}>
                                <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                    #{tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border bg-background">
                <div className="max-w-7xl mx-auto text-center text-muted-foreground">
                    <p className="mb-4">© 2025 AI案例拆解. 深入理解AI变现路径.</p>
                    <Link href="/consulting" className="text-primary hover:underline font-medium">
                        需要AI项目咨询？
                    </Link>
                </div>
            </footer>
        </div>
    );
}
