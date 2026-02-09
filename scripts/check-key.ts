
import dotenv from 'dotenv';
import fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
const key = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!key) {
    console.log('Key is missing');
} else if (key.startsWith('ey')) {
    console.log('Key format looks correct (starts with ey...)');
} else {
    console.log(`Key format looks suspicious. Starts with: ${key.substring(0, 5)}...`);
}
