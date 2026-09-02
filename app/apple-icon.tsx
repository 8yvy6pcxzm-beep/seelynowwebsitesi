import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS ana ekrana eklendiğinde kullanılan apple-touch-icon — Next.js
 * otomatik olarak <link rel="apple-touch-icon"> etiketini enjekte eder. */
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
          background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
        }}
      >
        <span
          style={{
            fontSize: 108,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          s
        </span>
      </div>
    ),
    { ...size },
  );
}
