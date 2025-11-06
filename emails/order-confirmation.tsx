import * as React from "react";

interface OrderConfirmationEmailProps {
  name: string;
  email: string;
  adress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  qty: number;
  price: number;
  shippingPrice: number;
}

export function OrderConfirmationEmail({
  name,
  email,
  adress,
  city,
  state,
  postalCode,
  country,
  qty,
  price,
  shippingPrice,
}: OrderConfirmationEmailProps) {
  const totalPrice = (qty * price + shippingPrice).toFixed(2);

  return (
    <html>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <meta charSet="utf-8" />
        <title>Confirmation de commande - Manuel Bleu</title>
      </head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          color: "#333",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: "0" }}>Manuel Bleu</h1>
          <p style={{ margin: "10px 0 0 0" }}>
            Confirmation de commande
          </p>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f9fafb" }}>
          <h2 style={{ color: "#1e3a8a" }}>
            Merci pour votre commande, {name}!
          </h2>
          <p>
            Nous avons bien reçu votre commande du Manuel Bleu. Vous recevrez
            bientôt votre exemplaire à l&apos;adresse indiquée.
          </p>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "5px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ color: "#1e3a8a", marginTop: "0" }}>
              Détails de la commande
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <strong>Article:</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    Manuel Bleu x {qty}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <strong>Prix unitaire:</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    €{price.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <strong>Frais de livraison:</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #e5e7eb",
                      textAlign: "right",
                    }}
                  >
                    €{shippingPrice.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", fontSize: "18px" }}>
                    <strong>Total:</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px 0",
                      textAlign: "right",
                      fontSize: "18px",
                      color: "#1e3a8a",
                    }}
                  >
                    <strong>€{totalPrice}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginTop: "20px",
              borderRadius: "5px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ color: "#1e3a8a", marginTop: "0" }}>
              Adresse de livraison
            </h3>
            <p style={{ margin: "5px 0" }}>{name}</p>
            <p style={{ margin: "5px 0" }}>{adress}</p>
            <p style={{ margin: "5px 0" }}>
              {city}
              {state ? `, ${state}` : ""} {postalCode}
            </p>
            <p style={{ margin: "5px 0" }}>{country}</p>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> {email}
            </p>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#e0f2fe",
              borderRadius: "5px",
            }}
          >
            <p style={{ margin: "0" }}>
              <strong>Note:</strong> Vous recevrez un email de confirmation
              d&apos;expédition dès que votre commande sera envoyée.
            </p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f3f4f6",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>
            David Reinharc éditions
            <br />
            19 rue de Miromesnil, 75008 – Paris
          </p>
          <p style={{ margin: "0" }}>
            <a
              href="mailto:david.reinharc@gmail.com"
              style={{ color: "#1e3a8a" }}
            >
              david.reinharc@gmail.com
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
