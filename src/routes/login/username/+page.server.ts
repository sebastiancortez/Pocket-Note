import type { PageServerLoad } from './$types';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../../../schema'
import { DATABASE_URL } from "$env/static/private";

const connectionString = DATABASE_URL

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);


export const load = (async () => {
    const allUsers = await db.select().from(users);
    return {allUsers};
}) satisfies PageServerLoad;