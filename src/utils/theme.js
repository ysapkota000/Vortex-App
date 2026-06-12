export const C = {
  bg: "#07101F",
  sb: "#0C1526",
  card: "#0F1D35",
  cardHov: "#142240",
  border: "rgba(255,255,255,0.07)",
  borderHi: "rgba(255,255,255,0.14)",

  // Primary — use for all interactive elements, CTAs, active states
  blue: "#4A90E8",
  blueL: "rgba(74,144,232,0.12)",

  // Semantic — use strictly for meaning, not decoration
  green: "#10B981",   // success / good
  greenL: "rgba(16,185,129,0.10)",
  amber: "#F59E0B",   // warning / pending
  amberL: "rgba(245,158,11,0.10)",
  red: "#F87171",     // error / danger
  redL: "rgba(248,113,113,0.10)",

  // Chart-only — only for multi-series data visualisations
  purple: "#818CF8",
  cyan: "#22D3EE",
  orange: "#FB923C",

  // Text scale
  t1: "#F1F5F9",
  t2: "#94A3B8",
  t3: "#475569",
  t4: "#1E3050",
};

export const TT = {
  contentStyle: {
    background: C.card,
    border: `1px solid ${C.borderHi}`,
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
  itemStyle: { color: C.t1, fontSize: "13px" },
  cursor: { fill: "rgba(255,255,255,0.04)" },
};
