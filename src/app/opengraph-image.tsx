import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stages = ["Target Prospects", "Conversations", "Qualified Opportunities", "Discovery Calls", "Customers"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0B1020 0%, #111a3a 60%, #1b2a66 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#3867FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 6 }}>REVEX</div>
            <div style={{ fontSize: 14, letterSpacing: 8, color: "#9CA3AF" }}>CONSULTANCY</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            We Build Conversations.
          </div>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#8AA6FF" }}>
            You Build Customers.
          </div>
          <div style={{ marginTop: 26, fontSize: 28, color: "#9CA3AF" }}>{siteConfig.positioning}</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {stages.map((stage, index) => (
            <div
              key={stage}
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: 999,
                fontSize: 18,
                border: "1px solid rgba(255,255,255,0.18)",
                background: index === stages.length - 1 ? "#3867FF" : "rgba(255,255,255,0.05)",
              }}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
