import { ImageResponse } from "next/og";

export const contentType = "image/png";

const ACCENT_ORANGE = "#FF6A2B"; // sitedeki accent-500 ile birebir aynı HEX
const SIZES = [16, 32];

export function generateImageMetadata() {
  return SIZES.map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType,
  }));
}

/** Favicon — markanın turuncu noktalı matris ikonu (dairesel plaka olmadan,
 * sadece noktalar), şeffaf zemin üzerinde tam ortalanmış. 16x16 ve 32x32
 * için generateImageMetadata ile ayrı boyutlarda üretilir. */
export default function Icon({ id }: { id: string }) {
  const size = Number(id);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="86%" height="86%" viewBox="0 0 200 200" fill="none">
          <circle cx="70" cy="70" r="15" fill={ACCENT_ORANGE} />
          <circle cx="130" cy="70" r="15" fill={ACCENT_ORANGE} />
          <circle cx="70" cy="130" r="15" fill={ACCENT_ORANGE} />
          <circle cx="130" cy="130" r="15" fill={ACCENT_ORANGE} />
          <circle cx="100" cy="100" r="15" fill={ACCENT_ORANGE} />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
