import type { PageLoad } from './$types';

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from '../../../schema'


export const load = (async () => {
    return {};
}) satisfies PageLoad;