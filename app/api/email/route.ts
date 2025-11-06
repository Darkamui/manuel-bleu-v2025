import { render } from "@react-email/render";
import { sendEmail } from "@/lib/email";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
import { NextRequest, NextResponse } from "next/server";

interface OrderData {
  name: string;
  email: string;
  price: number;
  shippingPrice: number;
  adress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  qty: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as OrderData;
    const {
      name,
      email,
      price,
      shippingPrice,
      adress,
      city,
      state,
      postalCode,
      country,
      qty,
    } = body;

    const emailHtml = await render(
      OrderConfirmationEmail({
        adress,
        name,
        country,
        postalCode,
        city,
        state,
        shippingPrice,
        price,
        email,
        qty,
      })
    );

    // Send to merchant emails
    // await sendEmail({
    //   to: "david.reinharc@gmail.com",
    //   subject: "Nouvelle commande: Manuel Bleu",
    //   html: emailHtml,
    // });

    await sendEmail({
      to: "dannyerushalmi@gmail.com",
      subject: "Nouvelle commande: Manuel Bleu",
      html: emailHtml,
    });

    // Send confirmation to customer
    await sendEmail({
      to: email,
      subject: "Confirmation de commande: Manuel Bleu",
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
