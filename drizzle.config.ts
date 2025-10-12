import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { supabaseConfig } from './lib/db/config';

export default defineConfig({
    out: './drizzle',
    schema: './lib/db/schema/*',
    dialect: 'postgresql',
    dbCredentials: {
        url: supabaseConfig.url,
        ssl: { rejectUnauthorized: false },
    },
});
