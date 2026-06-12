import React from 'react';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, ProgressBar, Tag } from '../components/Shared';

const StudentAttendance = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Attendance Records
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Track your presence across all enrolled courses.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 24 }}>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.green + "15", padding: 14, borderRadius: 12 }}>
            <CheckCircle size={24} color={C.green} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Overall Attendance</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>88%</div>
          </div>
        </div>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.blue + "15", padding: 14, borderRadius: 12 }}>
            <Calendar size={24} color={C.blue} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Classes Attended</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>94</div>
          </div>
        </div>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.red + "15", padding: 14, borderRadius: 12 }}>
            <XCircle size={24} color={C.red} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Classes Missed</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>12</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Course-wise Attendance" subtitle="Detailed breakdown of your attendance per subject" />
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 10 }}>
          {MOCK.subjectAtt.map(sub => {
            const pct = Math.round((sub.present / sub.total) * 100);
            return (
              <div key={sub.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: sub.color }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{sub.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: C.t2 }}>
                    <span style={{ fontWeight: 600, color: pct >= 75 ? C.green : C.amber }}>{pct}%</span> 
                    <span style={{ color: C.t3, margin: "0 6px" }}>|</span> 
                    {sub.present}/{sub.total} classes
                  </div>
                </div>
                <ProgressBar pct={pct} color={sub.color} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
