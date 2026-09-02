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

/** Favicon — marka sembolü (akış şeridi) doğrudan sitenin turuncu accent
 * rengiyle (#FF6A2B), şeffaf zemin üzerinde, tam ortalanmış olarak render
 * edilir. Kutu/harf yok — sadece sembol. 16x16 ve 32x32 için ayrı boyutlarda
 * üretilir (generateImageMetadata ile), her biri kendi <link> etiketini alır. */
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
        <svg width="88%" height="88%" viewBox="0 0 100 100" fill="none">
          <path
            d="M28 25 C50 25 72 25 72 38 C72 50 28 50 28 62 C28 75 50 75 72 75"
            stroke={ACCENT_ORANGE}
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
