import { NextRequest } from "next/server";
import Stripe from "stripe";

export interface ParamsI {
  productId: string;
}

export async function GET(req: NextRequest, { params }: { params: ParamsI }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? "", {
    apiVersion: "2022-11-15",
  });

  try {
    const data = await stripe.products.retrieve(params.productId, {
      expand: ["default_price"],
    });
    return new Response(JSON.stringify(data));
  } catch (err: any) {
    return new Response(err.message, { status: err.statusCode || 500 });
  }
}
