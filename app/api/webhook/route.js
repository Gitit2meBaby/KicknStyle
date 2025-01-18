import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Webhook secret should match what you set in WordPress
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req) {
  const headersList = headers();

  // Verify webhook signature from WooCommerce
  const signature = headersList.get("x-wc-webhook-signature");
  if (!signature || !verifySignature(await req.text(), signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    // Broadcast the revalidation message to all connected clients
    // This endpoint will be called by our BroadcastChannel
    const timestamp = new Date().getTime();

    // Store the latest revalidation timestamp in the database or filesystem
    // For simplicity, we'll use the filesystem here
    await saveRevalidationTimestamp(timestamp);

    return NextResponse.json({ success: true, timestamp });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to verify WooCommerce webhook signature
function verifySignature(payload, signature) {
  if (!WEBHOOK_SECRET) return false;

  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("base64");

  return signature === digest;
}

// Helper function to save the revalidation timestamp
async function saveRevalidationTimestamp(timestamp) {
  const fs = require("fs").promises;
  const path = require("path");

  const timestampPath = path.join(process.cwd(), "revalidation-timestamp.txt");
  await fs.writeFile(timestampPath, timestamp.toString());
}

// Helper function to get the last revalidation timestamp
export async function getLastRevalidationTimestamp() {
  const fs = require("fs").promises;
  const path = require("path");

  const timestampPath = path.join(process.cwd(), "revalidation-timestamp.txt");

  try {
    const timestamp = await fs.readFile(timestampPath, "utf-8");
    return parseInt(timestamp);
  } catch {
    return 0;
  }
}
