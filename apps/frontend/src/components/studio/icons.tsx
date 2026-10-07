import type { ServiceIcon } from "@/types/studio";

type IconProps = { className?: string; size?: number };

// Line icons on a 24px grid (shared by the studio sites and the software company), stroked with currentColor so the parent sets the colour.
const PATHS: Record<ServiceIcon | "star" | "quote" | "arrow" | "close" | "menu" | "mail" | "phone" | "whatsapp" | "pin" | "play" | "check" | "instagram" | "youtube" | "facebook" | "linkedin" | "send", string> = {
  megaphone: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Zm12-3a5 5 0 0 1 0 8m3-11a9 9 0 0 1 0 14",
  palette:
    "M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.4-1.9-.3-.9.3-2.1 1.6-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10Zm-5 9h.01M8.5 7.5h.01M13 6h.01M16.5 9h.01",
  chart: "M3 3v18h18M7 15l4-4 3 3 6-6M15 8h5v5",
  camera: "M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  video: "M3 6h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm13 4 6-3v10l-6-3",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16",
  mobile: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm4 16h2",
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8ZM5 2l.6 1.4L7 4l-1.4.6L5 6l-.6-1.4L3 4l1.4-.6Z",
  cpu: "M7 7h10v10H7ZM10 10h4v4h-4ZM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3",
  layers: "m12 2 10 5-10 5L2 7Zm-10 10 10 5 10-5M2 17l10 5 10-5",
  server: "M3 4h18v6H3Zm0 10h18v6H3Zm4-7h.01M7 17h.01",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z",
  quote: "M7 7H4v6h4v-1a5 5 0 0 1-3 4.6M17 7h-3v6h4v-1a5 5 0 0 1-3 4.6",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 6h16M4 12h16M4 18h16",
  mail: "M3 6h18v12H3Zm0 0 9 7 9-7",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  whatsapp:
    "M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.6Zm6-12.5c0 3.3 3.2 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.8-2.8l.8-1-1-2Z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  play: "M8 5v14l11-7Z",
  check: "m5 12 5 5 9-10",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5-9.5h.01",
  youtube:
    "M2.5 8.2c.2-1.6 1.3-2.7 2.9-2.8C7.5 5.2 9.7 5 12 5s4.5.2 6.6.4c1.6.1 2.7 1.2 2.9 2.8.2 1.3.3 2.5.3 3.8s-.1 2.5-.3 3.8c-.2 1.6-1.3 2.7-2.9 2.8-2.1.2-4.3.4-6.6.4s-4.5-.2-6.6-.4c-1.6-.1-2.7-1.2-2.9-2.8-.2-1.3-.3-2.5-.3-3.8s.1-2.5.3-3.8ZM10 9v6l5-3Z",
  facebook: "M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2Z",
  linkedin: "M4 9h4v12H4ZM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h4v2c.6-1.1 2-2.2 4-2.2 3.3 0 4 2.1 4 5V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4Z",
  send: "m22 2-7 20-4-9-9-4Zm0 0L11 13",
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, className, size = 24 }: IconProps & { name: IconName }) {
  const filled = name === "star" || name === "play";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 1 : 1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
