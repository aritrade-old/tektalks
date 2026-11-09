import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1020",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="8" fill="#3867FF" />
          <path
            d="M9 23V9h7.2a4.6 4.6 0 0 1 1.3 9L23 23h-3.9l-4.9-4.6H12.4V23H9Zm3.4-7.4h3.7a1.9 1.9 0 0 0 0-3.8h-3.7v3.8Z"
            fill="#fff"
          />
          <path d="M21 9h3l-2.2 3.4-1.5-2.3L21 9Z" fill="#8AA6FF" />
        </svg>
      </div>
    ),
    size,
  );
}
