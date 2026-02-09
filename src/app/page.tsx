import { getAllCases } from '@/lib/content';
import { Hero } from '@/components/Hero';
import { HomeGrid } from '@/components/HomeGrid';
import { Footer } from '@/components/Footer';
import { getLocaleServer } from '@/lib/i18n-server';

export default async function HomePage() {
    const locale = await getLocaleServer();
    const allCases = getAllCases(locale);
    const featuredCases = allCases.slice(0, 8); // Show 8 shots
    const allTags = [...new Set(allCases.flatMap(c => c.tags))].slice(0, 6);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Hero tags={allTags} />
            <HomeGrid cases={featuredCases} />
            <Footer />
        </div>
    );
}
