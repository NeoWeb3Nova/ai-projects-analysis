import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CaseCard } from '@/components/CaseCard';
import { Badge } from '@/components/ui/badge';
import { getAllCases } from '@/lib/content';

export default function HomePage() {
    const allCases = getAllCases();
    const featuredCases = allCases.slice(0, 8); // Show 8 shots (2 rows of 4) or similar
    const allTags = [...new Set(allCases.flatMap(c => c.tags))].slice(0, 6);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
                            Discover the world's top <br />
                            <span className="text-primary">AI Business Cases</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground w-full max-w-2xl mx-auto leading-relaxed">
                            AI Projects Analysis is the leading destination to find & analyze profitable AI projects.
                            Deep dive into monetization strategies.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for AI cases, monetization models..."
                                className="w-full h-16 pl-16 pr-6 rounded-full bg-white border border-border shadow-sm text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Trending Tags */}
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                        <span>Trending searches:</span>
                        {allTags.map(tag => (
                            <Link key={tag} href={`/cases?tag=${tag}`} className="hover:text-primary transition-colors">
                                {tag},
                            </Link>
                        ))}
                        <Link href="/cases" className="hover:text-primary transition-colors">More...</Link>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-[1600px] mx-auto"> {/* Wider container for shots */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Button variant="secondary" className="rounded-lg h-9 text-sm font-medium px-4 bg-transparent border border-border hover:bg-secondary text-muted-foreground hover:text-foreground">
                                All Projects
                            </Button>
                            <Button variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground">
                                Animation
                            </Button>
                            <Button variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground">
                                Branding
                            </Button>
                            <Button variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground">
                                Illustration
                            </Button>
                            <Button variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground">
                                Mobile
                            </Button>
                            <Button variant="ghost" className="rounded-lg h-9 text-sm font-medium px-4 text-muted-foreground hover:text-foreground">
                                Print
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg text-xs font-medium bg-transparent">
                                Filter
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {featuredCases.map((caseStudy) => (
                            <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
                        ))}
                        {/* Repeat for visual fill if needed */}
                        {featuredCases.length < 8 && featuredCases.map((caseStudy) => (
                            <CaseCard key={`${caseStudy.slug}-dup`} caseStudy={{ ...caseStudy, slug: `${caseStudy.slug}-dup` }} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="h-12 px-8 rounded-full font-medium text-foreground border-border hover:bg-secondary hover:text-foreground transition-all">
                            Sign up to continue viewing
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-border bg-background">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-heading font-bold text-xl tracking-tight text-foreground">
                        AI Projects Analysis
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground font-medium">
                        <Link href="#" className="hover:text-foreground">For Designers</Link>
                        <Link href="#" className="hover:text-foreground">Hire Talent</Link>
                        <Link href="#" className="hover:text-foreground">Inspiration</Link>
                        <Link href="#" className="hover:text-foreground">Advertising</Link>
                        <Link href="#" className="hover:text-foreground">Blog</Link>
                        <Link href="#" className="hover:text-foreground">About</Link>
                        <Link href="#" className="hover:text-foreground">Careers</Link>
                        <Link href="#" className="hover:text-foreground">Support</Link>
                    </div>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                        <div className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors cursor-pointer" />
                    </div>
                </div>
                <div className="max-w-[1600px] mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2026 AI Projects Analysis. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-foreground">Jobs</Link>
                        <Link href="#" className="hover:text-foreground">Designers</Link>
                        <Link href="#" className="hover:text-foreground">Freelancers</Link>
                        <Link href="#" className="hover:text-foreground">Tags</Link>
                        <Link href="#" className="hover:text-foreground">Places</Link>
                        <Link href="#" className="hover:text-foreground">Resources</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
