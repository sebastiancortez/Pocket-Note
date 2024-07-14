import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "$lib/db";
import { users, messages } from "$lib/db/schema"; // Import messages table
import { eq, and } from "drizzle-orm";
import { error } from '@sveltejs/kit';

// Function to get the inbox by ID and username
const getInboxByIdAndUsername = async (inboxID: string, username: string) => {
  return await db.query.users.findFirst({
    where: and(
      eq(users.currentInboxUrl, inboxID),
      eq(users.username, username)
    )
  });
};

export const load: PageServerLoad = async ({ params }) => {
  const { inboxID, profile: username } = params;
  const inbox = await getInboxByIdAndUsername(inboxID, username);

  if (!inbox) {
    throw error(404, 'This inbox does not exist 🛑');
  }

  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, zod(formSchema));
    const { inboxID, profile: username } = params;
    const inbox = await getInboxByIdAndUsername(inboxID, username);

    if (!inbox) {
      return {
        error: "This inbox doesn't exist",
      };
    }

    if (!form.valid) {
      return { form };
    }

    // Insert the message into the messages table
    await db.insert(messages).values({
      content: form.data.message,
      senderUserId: null, // Assuming anonymous sender
      recipientUserId: inbox.id, // Use the ID of the inbox owner
      messageCreatedTimestamp: new Date(),
    });

    return { form };
  },
};