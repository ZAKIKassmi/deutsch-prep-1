import { db } from "@/db"; // Adjust this import to your Drizzle DB instance location
import { profiles } from "@/db/schema"; // Adjust to your schema location
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  // 1. Get the Webhook Secret from env
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // 2. Get the Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If headers are missing, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // 3. Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 4. Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // 5. Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // 6. Handle the specific event
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    // Safety check for email
    const primaryEmail = email_addresses && email_addresses[0]?.email_address;

    if (!id || !primaryEmail) {
      return new Response("Error: Missing data", { status: 400 });
    }

    // INSERT INTO SUPABASE VIA DRIZZLE
    try {
      await db.insert(profiles).values({
        id: id, // Clerk ID
        email: primaryEmail,
        fullName: `${first_name || ""} ${last_name || ""}`.trim(),
        // activeSessionId is null by default, which is correct
      });

      console.log(`User ${id} created in DB`);
    } catch (error) {
      console.error("Error saving user to DB:", error);
      return new Response("Error saving user to database", { status: 500 });
    }
  }

  return new Response("", { status: 200 });
}
