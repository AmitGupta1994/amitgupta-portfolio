import "../globals.css";

import { StudioDocument, studioMetadata } from "../_studio/studioLayout";

// Prerendered and cleared on save, like the other sites; daily fallback.
export const revalidate = 86400;

export const generateMetadata = () => studioMetadata("creatives");

export default function CreativesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StudioDocument site="creatives">{children}</StudioDocument>;
}
