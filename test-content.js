import { getAllCases } from './src/lib/content';

console.log('Testing getAllCases()...');
const cases = getAllCases();
console.log(`Found ${cases.length} cases:`);
cases.forEach(c => {
    console.log(`- ${c.title} (${c.slug})`);
});
