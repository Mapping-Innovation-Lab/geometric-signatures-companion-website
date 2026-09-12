import { ImageResponse } from "next/og";
import { SHORT_SITE_TITLE } from "@/content/site-copy";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%",
      background: "#f4f0e7", color: "#18212a", padding: "64px 76px" }}>
      <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#315f78" }}>
        <span style={{ fontSize: 40, marginRight: 24 }}>GS</span>
        A COMPANION TO THE PAPER
      </div>
      <div style={{ display: "flex", fontSize: 76, lineHeight: 1.08, marginTop: 48,
        maxWidth: 1020, letterSpacing: "-2px" }}>{SHORT_SITE_TITLE}</div>
      <div style={{ display: "flex", fontSize: 28, lineHeight: 1.4, marginTop: 30, maxWidth: 950 }}>
        A counterfactual embedding framework for detecting scientific revolutions
      </div>
      <div style={{ display: "flex", fontSize: 19, marginTop: "auto", paddingTop: 20,
        borderTop: "1px solid #c8c1b4", color: "#58636b" }}>
        Dimitris Ntounis · Ariel Schwartzman · Chris Chafe · Thomas A. Ryckman
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
