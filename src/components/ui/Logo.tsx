function Monogram({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ color, flex: "none" }}>
      <path d="M79.9,26.6 A38,38 0 1 0 79.9,73.4" fill="none" stroke="currentColor" strokeWidth={10} strokeLinecap="round" />
      <line x1={56} y1={50} x2={80} y2={50} stroke="var(--lime)" strokeWidth={10} strokeLinecap="round" />
      <path d="M67.3,36.5 A22,22 0 1 0 67.3,63.5" fill="none" stroke="currentColor" strokeWidth={6.5} strokeLinecap="round" />
    </svg>
  );
}

function Seal({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ color, flex: "none" }}>
      <rect x={4} y={4} width={92} height={92} rx={26} fill="currentColor" />
      <path d="M75.4,30 A32,32 0 1 0 75.4,70" fill="none" stroke="var(--white)" strokeWidth={8} strokeLinecap="round" />
      <line x1={54} y1={50} x2={78} y2={50} stroke="var(--lime)" strokeWidth={8} strokeLinecap="round" />
      <path d="M65.6,38.6 A18,18 0 1 0 65.6,61.4" fill="none" stroke="var(--white)" strokeWidth={5.5} strokeLinecap="round" />
    </svg>
  );
}

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon" | "seal";
  tone?: "positive" | "negative";
  tagline?: boolean;
  size?: number;
}

export function Logo({ variant = "horizontal", tone = "positive", tagline = false, size = 56 }: LogoProps) {
  const isNegative = tone === "negative";
  const monogramColor = isNegative ? "var(--white)" : "var(--purple-700)";
  const wordmarkColor = isNegative ? "var(--white)" : "var(--purple-950)";
  const cardosoColor = isNegative ? "var(--purple-200)" : "var(--purple-600)";
  const dotColor = isNegative ? "var(--lime)" : "var(--lime-600)";
  const taglineColor = isNegative ? "rgba(255,255,255,0.78)" : "var(--ink-500)";

  if (variant === "icon") return <Monogram size={size} color={monogramColor} />;
  if (variant === "seal") return <Seal size={size} color={monogramColor} />;

  const isVertical = variant === "vertical";
  return (
    <div
      data-testid="logo"
      style={{ display: "flex", flexDirection: isVertical ? "column" : "row", alignItems: "center", gap: size * 0.28 }}
    >
      <Monogram size={size} color={monogramColor} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: isVertical ? "center" : "flex-start" }}>
        <span
          data-testid="logo-wordmark"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.46, letterSpacing: "-0.02em", color: wordmarkColor }}
        >
          Gabriella{" "}
          <span style={{ fontWeight: 300, color: cardosoColor }}>Cardoso</span>
          <span style={{ color: dotColor, fontWeight: 600 }}>.</span>
        </span>
        {tagline && (
          <span
            data-testid="logo-tagline"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: size * 0.11, letterSpacing: "0.22em", color: taglineColor, textTransform: "uppercase", marginTop: size * 0.14 }}
          >
            Tráfego · Estratégia · Inteligência Artificial
          </span>
        )}
      </div>
    </div>
  );
}
