import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "$lib/db";
import { users } from "$lib/db/schema"; // Assuming inboxes are part of the users table
import { eq } from "drizzle-orm";

// Function to get the inbox by ID
const getInboxById = async (inboxID: string) => {
  return await db.query.users.findFirst({
    where: eq(users.currentInboxUrl, inboxID),
 });
};

export const load: PageServerLoad = async ({ params }) => {
  const { inboxID } = params;
  const inbox = await getInboxById(inboxID);

  if (!inbox) {
    return {
      error: "This inbox doesn't exist",
    };
  }

  return {
    form: await superValidate(zod(formSchema)),
  };
};