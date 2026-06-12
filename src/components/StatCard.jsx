import React from 'react';
import { C } from '../utils/theme';

export const StatCard = ({ icon: Icon, label, value, color, trend, sub }) => (
  <div className="card card-hover" style={{ padding: "18px 22px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
      <div style={{ background: color + "15", borderRadius: 10, padding: 10 }}>
        <Icon size={20} color={color} />
      </div>
      {trend && <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>{trend}</span>}
    </div>
    <div className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>{value}</div>
    <div style={{ fontSize: 12, color: C.t2, fontWeight: 500, marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: C.t3, marginTop: 4 }}>{sub}</div>}
  </div>
);
