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
            <section className="relative py-32 px-6 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-mesh opacity-40 -z-20" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium text-primary-foreground/90">AI 落地 + 盈利拆解</span>
                    </div>

                    <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight tracking-tight">
                        拆解AI项目的<br />
                        <span className="text-gradient-purple drop-shadow-lg">变现路径</span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
                        为爱发电是不够的，一定要变现才能生存。
                        <br className="hidden md:block" />
                        深入拆解AI项目落地和盈利模式，<span className="text-foreground font-semibold">一步一步理解变现路径</span>。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] transition-all hover:scale-105">
                            <Link href="/cases">
                                浏览案例
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all hover:scale-105">
                            <Link href="/consulting">
                                咨询服务
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6 border-y border-white/5 bg-secondary/20 backdrop-blur-sm relative z-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: TrendingUp, value: '50+', label: '真实案例', color: 'text-primary' },
                        { icon: DollarSign, value: '¥1M+', label: '合计月收入', color: 'text-emerald-400' },
                        { icon: Users, value: '10K+', label: '服务用户', color: 'text-purple-400' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group p-6 rounded-2xl transition-colors hover:bg-white/5">
                            <div className="flex justify-center mb-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/5 border border-white/10 shadow-lg`}>
                                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="text-4xl font-heading font-bold text-foreground mb-2 tracking-tight">{stat.value}</div>
                            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Cases */}
            <section className="py-24 px-6 relative">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                                AI项目落地案例
                            </h2>
                            <p className="text-muted-foreground text-lg">探索不同AI项目的商业模式和盈利策略。</p>
                        </div>
                        <Button asChild variant="ghost" className="hidden sm:inline-flex hover:bg-white/5 text-muted-foreground hover:text-foreground">
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

                    <div className="mt-12 text-center sm:hidden">
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/cases">
                                查看全部
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Keywords/Tags Cloud */}
            <section className="py-24 px-6 border-t border-white/5 bg-secondary/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-heading font-semibold text-2xl text-foreground mb-8">
                        按关键词探索
                    </h3>
                    <p className="text-muted-foreground mb-10">快速找到你感兴趣的AI变现案例。</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {allTags.map(tag => (
                            <Link key={tag} href={`/cases?tag=${tag}`}>
                                <Badge variant="outline" className="px-5 py-2.5 text-sm cursor-pointer border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300">
                                    #{tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10 bg-black/20 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="mb-4 text-muted-foreground text-sm">
                        © {new Date().getFullYear()} AI案例拆解. 深入理解AI变现路径.
                    </p>
                    <p className="text-muted-foreground text-sm">
                        由 <a href="https://twitter.com/your_twitter_handle" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@你的推特ID</a> 倾情打造
                    </p>
                </div>
            </footer>
        </div>
    );
}
