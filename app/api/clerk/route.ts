import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();
  console.log(payload);

  switch (payload.type) {
    case "user.created":
      console.log("user created!!!", payload);
    case "user.updated":
      console.log("user updated!!!", payload);
  }
  return Response.json({ message: "Received" });
}
