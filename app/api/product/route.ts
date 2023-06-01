import getStripe from "@/utils/stripe";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const stripe = getStripe();

  try {
    const { data } = await stripe.products.list();
    return new Response(JSON.stringify(null), { status: 500 });
  } catch (err: any) {
    return new Response(JSON.stringify(null), {
      status: err.statusCode || 500,
    });
  }
}
