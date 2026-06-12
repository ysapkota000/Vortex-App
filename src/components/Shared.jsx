import React from 'react';
import { C } from '../utils/theme';

export const Tag = ({ children, color }) => (
  <span className="tag" style={{ background: color + "18", color, border: `1px solid ${color}30` }}>
    {children}
  </span>
);

export const Avatar = ({ name, size = 40, color = C.blue }) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: "12px", background: color + "20",
      border: `1px solid ${color}40`, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color,
      flexShrink: 0
    }}>
      {initials}
    </div>
  );
};

export const ProgressBar = ({ pct, color = C.blue }) => (
  <div className="progress-bar">
    <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
  </div>
);

export const SectionHead = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
    <div>
      <h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Empty = ({ message }) => (
  <div style={{ padding: "40px 0", textAlign: "center", color: C.t3, fontSize: 14 }}>
    {message}
  </div>
);
