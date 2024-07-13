import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "$lib/db";
import { users } from "$lib/db/schema"; // Assuming inboxes are part of the users table
import { eq, and } from "drizzle-orm";

// Function to get the inbox by ID
const getInboxById = async (inboxID: string, username: string) => {
    return await db.query.users.findFirst({
      where: and(
          eq(users.currentInboxUrl, inboxID),
          eq(users.username, username)
      )
    });
};
  
  export const load: PageServerLoad = async ({ params }) => {
    const { inboxID, profile: username } = params;
    const inbox = await getInboxById(inboxID, username);
    if (!inbox) {
      return {
        error: "This inbox doesn't exist or the username is incorrect",
      };
    }
  
    return {
      form: await superValidate(zod(formSchema)),
    };
  };