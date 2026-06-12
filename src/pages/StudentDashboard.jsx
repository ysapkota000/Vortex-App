import React from 'react';
import { 
  BookOpen, Clock, ChevronRight
} from 'lucide-react';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

import { C, TT } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { SectionHead, Tag } from '../components/Shared';

const StudentDashboard = ({ user }) => {
  const upcoming = MOCK.assignments.filter(a => a.status === "pending").slice(0, 2);

  return (
    <div className="fade-in">

      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Welcome back, {user.name.split(" ")[0]}!
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Here's what's happening with your studies today.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard icon={BookOpen} label="Courses" value="5" color={C.blue} trend="+1 new" />
        <StatCard icon={Clock} label="Attendance" value="88%" color={C.green} trend="Good" />
        <StatCard icon={BookOpen} label="Notices" value="12" color={C.blue} />
        <StatCard icon={BookOpen} label="GPA" value={user.gpa} color={C.green} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 18 }}>

        {/* Attendance Chart */}
        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Attendance Overview" subtitle="Monthly presence percentage" />

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK.attendanceMonths} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>

              <defs>
                <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.blue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="m" tick={{ fill: C.t3, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.t3, fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />

              <Tooltip {...TT} formatter={(v) => [`${v}%`, "Attendance"]} />

              <Area
                type="monotone"
                dataKey="pct"
                stroke={C.blue}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPct)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Assignments" subtitle="Submission status" />

          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={MOCK.assignmentPie}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {MOCK.assignmentPie.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip {...TT} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            {MOCK.assignmentPie.map(e => (
              <div key={e.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: e.color }} />
                  <span style={{ fontSize: 13, color: C.t2 }}>{e.name}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="card" style={{ padding: 22, marginBottom: 18 }}>
        <SectionHead
          title="Upcoming Assignments"
          subtitle="Tasks requiring your attention"
          action={
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              View all <ChevronRight size={14} />
            </button>
          }
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {upcoming.map(a => (
            <div
              key={a.id}
              className="card-sm card-hover"
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}
            >
              <div style={{ background: C.blueL, borderRadius: 9, padding: 10 }}>
                <BookOpen size={17} color={C.blue} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.t1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {a.title}
                </div>
                <div style={{ fontSize: 12, color: C.t2, marginTop: 3 }}>
                  {a.subject}
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 500, marginBottom: 4 }}>
                  Due {a.due}
                </div>
                <Tag color={C.amber}>Pending</Tag>
              </div>

              <ChevronRight size={15} color={C.t3} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;