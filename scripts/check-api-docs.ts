
import dotenv from 'dotenv';


dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

async function checkApi() {
    const url = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`;
    console.log(`Fetching API docs from: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }

        const data = await response.json();
        const paths = data.definitions;

        if (paths && paths.cases) {
            console.log('Table "cases" FOUND in API definitions.');
            console.log('Properties:', Object.keys(paths.cases.properties));
        } else {
            console.log('Table "cases" NOT FOUND in API definitions.');
            console.log('Available tables:', Object.keys(paths || {}));
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

checkApi();
