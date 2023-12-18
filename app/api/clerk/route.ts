import { users } from "@/db/schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { connectionString } from "@/db/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();

  const client = postgres(connectionString || "", { prepare: false });
  const db = drizzle(client);

  console.log("webhook triggered: ", payload.type, "\n\n");

  if (payload.type === "user.created") {
    const newUser = await db
      .insert(users)
      .values({
        id: payload.data.id,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        email:
          payload.data.email_addresses.find(
            (email) => email.id === payload.data.primary_email_address_id,
          )?.email_address || payload.data.email_addresses[0].email_address,
        phone:
          payload.data.phone_numbers.find(
            (phone) => phone.id === payload.data.primary_phone_number_id,
          )?.phone_number || "",
        image_url: payload.data.image_url,
        joined_at: new Date(payload.data.created_at),
        last_sign_in_at: payload.data.created_at
          ? new Date(payload.data.created_at)
          : null,
        category_type_id: payload.data.unsafe_metadata.category_type
          ? Number(payload.data.unsafe_metadata.category_type as string)
          : null,
        gender: payload.data.unsafe_metadata.gender
          ? (payload.data.unsafe_metadata.gender as string)
          : null,
      })
      .returning();
    console.log("\ncreated user:\n", newUser);
  }

  if (payload.type === "user.updated") {
    const updatedUser = await db
      .update(users)
      .set({
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        email:
          payload.data.email_addresses.find(
            (email) => email.id === payload.data.primary_email_address_id,
          )?.email_address || payload.data.email_addresses[0].email_address,
        phone: payload.data.phone_numbers.find(
          (phone) => phone.id === payload.data.primary_phone_number_id,
        )?.phone_number,
        image_url: payload.data.image_url,
        joined_at: new Date(payload.data.created_at),
        category_type_id: payload.data.unsafe_metadata.category_type
          ? Number(payload.data.unsafe_metadata.category_type as string)
          : null,
        gender: payload.data.unsafe_metadata.gender
          ? (payload.data.unsafe_metadata.gender as string)
          : null,
      })
      .where(eq(users.id, payload.data.id))
      .returning();

    console.log("\nuser updated:\n", updatedUser);
  }

  if (payload.type === "user.deleted") {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, payload.data.id || ""))
      .returning();
    console.log("\ndeleted user:\n", deletedUser);
  }

  if (payload.type === "session.created") {
    const updatedUserSession = await db
      .update(users)
      .set({
        last_sign_in_at: payload.data.updated_at
          ? new Date(payload.data.updated_at)
          : null,
      })
      .where(eq(users.id, payload.data.user_id))
      .returning();
    console.log("\nupdated session:\n", updatedUserSession);
  }

  return Response.json({ message: "Received" });
}
