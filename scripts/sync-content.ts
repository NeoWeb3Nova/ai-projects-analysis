
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const CASES_DIR = path.join(process.cwd(), 'content/cases');

async function syncCases(locale: string) {
    const localeDir = path.join(CASES_DIR, locale);
    if (!fs.existsSync(localeDir)) {
        console.warn(`Directory not found: ${localeDir}`);
        return;
    }

    const files = fs.readdirSync(localeDir).filter(file => file.endsWith('.md'));

    console.log(`Found ${files.length} cases for locale: ${locale}`);

    for (const file of files) {
        const filePath = path.join(localeDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const slug = data.slug || file.replace('.md', '');

        console.log(`Syncing ${slug} (${locale})...`);

        const { error } = await supabase
            .from('cases')
            .upsert({
                slug,
                locale,
                title: data.title,
                summary: content.slice(0, 200), // Simple summary extraction
                category: data.category,
                monetization: data.monetization,
                stage: data.stage,
                published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
                tags: data.tags || [],
                cover: data.cover,
                content: content,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'slug,locale'
            });

        if (error) {
            console.error(`Error syncing ${slug}:`, error.message);
        } else {
            console.log(`Success: ${slug}`);
        }
    }
}

async function main() {
    await syncCases('zh');
    await syncCases('en');
    console.log('Sync completed.');
}

main().catch(console.error);
