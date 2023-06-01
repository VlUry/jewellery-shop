import getStripe from "@/utils/stripe";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = getStripe();

  const { origin } = new URL(req.url);
  const { line_items } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: origin,
      cancel_url: origin,
      shipping_address_collection: {
        allowed_countries: ["FI", "NO", "SE"],
      },
    });

    return new Response(JSON.stringify(session));
  } catch (err: any) {
    return new Response(null, { status: err.statusCode || 500 });
  }
}
