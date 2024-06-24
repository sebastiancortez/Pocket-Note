import type { PageLoad } from './$types';

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../../../schema'
import { DATABASE_URL } from "$env/static/private";

const connectionString = DATABASE_URL

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client);

const allUsers = await db.select().from(users);

export const load = (async () => {
    return {};
}) satisfies PageLoad;