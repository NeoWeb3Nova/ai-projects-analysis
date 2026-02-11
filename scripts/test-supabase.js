require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? supabaseKey.substring(0, 10) + '...' : 'undefined');

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('cases').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Supabase connection error:', error);
        } else {
            console.log('Supabase connection successful. Count query executed.');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
