import getStripe from "@/utils/stripe";
import { NextRequest } from "next/server";

export interface ParamsI {
  productId: string;
}

export async function GET(req: NextRequest, { params }: { params: ParamsI }) {
  const stripe = getStripe();

  try {
    const data = await stripe.products.retrieve(params.productId, {
      expand: ["default_price"],
    });
    return new Response(JSON.stringify(data));
  } catch (err: any) {
    return new Response(JSON.stringify(null), {
      status: err.statusCode || 500,
    });
  }
}
