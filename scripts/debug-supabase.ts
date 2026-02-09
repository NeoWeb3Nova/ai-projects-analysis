
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl);

    // Try to select
    const selectRes = await supabase.from('cases').select('count', { count: 'exact', head: true });
    console.log('Select Result:', selectRes);

    if (selectRes.error) {
        console.error('Select Error:', selectRes.error.message);
    }

    // Try to insert a dummy record
    const insertRes = await supabase.from('cases').upsert({
        slug: 'test-connection-slug',
        title: 'Test Connection',
        locale: 'zh'
    }, { onConflict: 'slug,locale' });

    console.log('Insert Result:', insertRes);

    if (insertRes.error) {
        console.error('Insert Error:', insertRes.error.message);
    }
}

testConnection();
