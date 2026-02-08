import { Index } from 'flexsearch';
import { getAllCases, type CaseStudy } from './content';

// Initialize search index
const index = new Index({
    tokenize: 'forward',
    cache: true,
});

// Populate index
export function initializeSearchIndex() {
    const cases = getAllCases();
    cases.forEach(c => {
        index.add(c.slug, `${c.title} ${c.summary} ${c.tags.join(' ')} ${c.category}`);
    });
}

// Search function
export function searchCases(query: string): CaseStudy[] {
    if (!query.trim()) return getAllCases();

    const results = index.search(query.toLowerCase()) as string[];
    const allCases = getAllCases();

    return results
        .map(slug => allCases.find(c => c.slug === slug))
        .filter(Boolean) as CaseStudy[];
}

// Initialize index on module load
initializeSearchIndex();
