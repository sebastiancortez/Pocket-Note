import { db } from "$lib/db";
import { users } from "$lib/db/schema";
import { generateinboxId } from "$lib/profile";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    return null;
  }

  const curProfile = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (curProfile) {
    return curProfile;
  }

  const inboxId = generateinboxId()


  await db.insert(users).values({
    id: "",
    userId: user.id,
    email: user.email ?? "",
    username: "",
    currentInboxUrl: inboxId,
  });

  const newProfile = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!newProfile) {
    error(500, "Could not create profile");
  }

  return newProfile;
};