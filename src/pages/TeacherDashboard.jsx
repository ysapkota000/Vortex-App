import React from 'react';
import { Users, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { SectionHead, Tag } from '../components/Shared';

const TeacherDashboard = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Welcome back, {user.name.split(" ")[1]}!
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Here's your overview for today.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 24 }}>
        <StatCard icon={Users} label="Total Students" value="116" color={C.blue} trend="+4 this week" />
        <StatCard icon={BookOpen} label="Active Classes" value="3" color={C.blue} />
        <StatCard icon={Clock} label="Pending Grades" value="12" color={C.amber} trend="Requires attention" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Today's Classes" subtitle="Your schedule for the day" />
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK.teacherClasses.map((cls, idx) => (
              <div key={idx} style={{ 
                display: "flex", alignItems: "center", gap: 14, 
                padding: "12px", background: C.bg, borderRadius: 12, border: `1px solid ${C.border}` 
              }}>
                <div style={{ background: cls.color + "15", padding: 12, borderRadius: 10, color: cls.color, fontWeight: 600, fontSize: 13 }}>
                  {cls.t.split("–")[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>{cls.s}</div>
                  <div style={{ color: C.t3, fontSize: 12 }}>{cls.section} • {cls.room}</div>
                </div>
                <Tag color={cls.color}>{cls.students} students</Tag>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <SectionHead title="Recent Assignments" subtitle="Latest submissions" />
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK.teacherAssignments.slice(0, 3).map((a) => (
              <div key={a.id} className="card-hover" style={{ 
                display: "flex", alignItems: "center", justifyContent: "space-between", 
                padding: "12px", borderBottom: `1px solid ${C.border}` 
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>{a.title}</div>
                  <div style={{ color: C.t3, fontSize: 12 }}>{a.section} • Due {a.dueDate}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: C.blue, fontSize: 15 }}>{a.submissions}/{a.total}</div>
                  <div style={{ color: C.t3, fontSize: 11 }}>Submitted</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
