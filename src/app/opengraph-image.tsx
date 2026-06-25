import { ImageResponse } from "next/og";

export const alt = "Gabriella Cardoso | Estratégia, Tráfego Pago e IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1554 50%, #1a0a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(196, 246, 46, 0.15)",
            border: "1px solid rgba(196, 246, 46, 0.3)",
            borderRadius: "100px",
            padding: "8px 20px",
            color: "#c4f62e",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Autoridade Estratégica
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.05,
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          Gabriella Cardoso
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#c4f62e",
            marginBottom: "32px",
          }}
        >
          Estratégia · Tráfego Pago · Inteligência Artificial
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#c4b5d4",
            maxWidth: "720px",
            lineHeight: 1.5,
          }}
        >
          Comunicação com método, dados e execução para negócios, marcas e lideranças que precisam crescer com clareza.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            color: "#6b4fa0",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          gabriellapcardoso.com.br
        </div>
      </div>
    ),
    { ...size }
  );
}
