import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "", {
    apiVersion: "2022-11-15",
  });

  try {
    const { data } = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return new Response(JSON.stringify(data));
  } catch (err: any) {
    return new Response(err.message, { status: err.statusCode || 500 });
  }
}
