import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseStudy {
    slug: string;
    title: string;
    summary: string;
    category: string;
    monetization: string;
    stage: string;
    publishedAt: string;
    tags: string[];
    cover?: string;
    content?: string;
}

const CASES_DIR = path.join(process.cwd(), 'content/cases');

export function getAllCases(locale: string = 'zh'): CaseStudy[] {
    const localeDir = path.join(CASES_DIR, locale);

    // Check if directory exists, fallback to 'zh' if not
    if (!fs.existsSync(localeDir)) {
        return getAllCases('zh');
    }

    const files = fs.readdirSync(localeDir);

    const cases = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(localeDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            return {
                slug: data.slug,
                title: data.title,
                summary: content.slice(0, 200),
                category: data.category,
                monetization: data.monetization,
                stage: data.stage,
                publishedAt: data.publishedAt,
                tags: data.tags || [],
                cover: data.cover,
                content,
            };
        });

    return cases.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getCaseBySlug(slug: string, locale: string = 'zh'): CaseStudy | null {
    const cases = getAllCases(locale);
    return cases.find(c => c.slug === slug) || null;
}

export function getCategories(locale: string = 'zh'): string[] {
    const cases = getAllCases(locale);
    const categories = [...new Set(cases.map(c => c.category))];
    return categories.sort();
}

export function getMonetizationTypes(locale: string = 'zh'): string[] {
    const cases = getAllCases(locale);
    const types = [...new Set(cases.map(c => c.monetization))];
    return types.sort();
}
