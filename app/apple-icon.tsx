import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const ACCENT_ORANGE = "#FF6A2B";

/** iOS ana ekrana eklendiğinde kullanılan apple-touch-icon — markanın
 * turuncu dairesel nokta matrisi, opak zemin üzerinde (iOS şeffaf ikonları
 * siyahla doldurduğu için burada dolu daire kullanılır). */
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
          background: ACCENT_ORANGE,
        }}
      >
        <svg width="60%" height="60%" viewBox="0 0 200 200" fill="none">
          <circle cx="70" cy="70" r="12" fill="#ffffff" />
          <circle cx="100" cy="70" r="12" fill="#ffffff" />
          <circle cx="130" cy="70" r="12" fill="#ffffff" />
          <circle cx="70" cy="100" r="12" fill="#ffffff" />
          <circle cx="100" cy="100" r="12" fill="#ffffff" />
          <circle cx="130" cy="100" r="12" fill="#ffffff" />
          <circle cx="70" cy="130" r="12" fill="#ffffff" />
          <circle cx="100" cy="130" r="12" fill="#ffffff" />
          <circle cx="130" cy="130" r="12" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
