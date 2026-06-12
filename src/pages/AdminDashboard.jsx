import React from 'react';
import { Users, GraduationCap, Building, Activity } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { C, TT } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { SectionHead } from '../components/Shared';

const AdminDashboard = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Admin Dashboard
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          System overview and quick analytics.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard icon={Users} label="Total Students" value="1,310" color={C.blue} trend="+5% YOY" />
        <StatCard icon={GraduationCap} label="Faculty" value="142" color={C.blue} />
        <StatCard icon={Building} label="Departments" value="8" color={C.blue} />
        <StatCard icon={Activity} label="System Status" value="Online" color={C.green} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Enrollment Trends" subtitle="Students enrolled per year" />
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MOCK.enrollmentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEnr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="y" tick={{ fill: C.t3, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.t3, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...TT} formatter={(v) => [v, "Students"]} />
              <Area type="monotone" dataKey="s" stroke={C.blue} strokeWidth={3} fillOpacity={1} fill="url(#colorEnr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Recent Activity" subtitle="System audit logs" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MOCK.recentActivity.map((log, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 13, color: C.t1, fontWeight: 500, lineHeight: 1.4 }}>{log.text}</div>
                  <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
