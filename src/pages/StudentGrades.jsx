import React from 'react';
import { Award, TrendingUp, Book } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';

const StudentGrades = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Grades & Transcript
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Review your academic performance and grades.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 24 }}>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.purple + "15", padding: 14, borderRadius: 12 }}>
            <Award size={24} color={C.purple} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Cumulative GPA</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>{user.gpa}</div>
          </div>
        </div>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.cyan + "15", padding: 14, borderRadius: 12 }}>
            <TrendingUp size={24} color={C.cyan} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Current Standing</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>Excellent</div>
          </div>
        </div>
        <div className="card" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: C.blue + "15", padding: 14, borderRadius: 12 }}>
            <Book size={24} color={C.blue} />
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.t3 }}>Total Credits</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.t1 }}>84</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Current Semester Grades" subtitle="Detailed view of your current courses" />
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", marginTop: 10 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                <th style={{ padding: "12px 16px", color: C.t2, fontSize: 13, fontWeight: 600 }}>Subject</th>
                <th style={{ padding: "12px 16px", color: C.t2, fontSize: 13, fontWeight: 600 }}>Assignments</th>
                <th style={{ padding: "12px 16px", color: C.t2, fontSize: 13, fontWeight: 600 }}>Midterm</th>
                <th style={{ padding: "12px 16px", color: C.t2, fontSize: 13, fontWeight: 600 }}>Participation</th>
                <th style={{ padding: "12px 16px", color: C.t2, fontSize: 13, fontWeight: 600, textAlign: "right" }}>Overall</th>
              </tr>
            </thead>
            <tbody>
              {MOCK.grades.map((g, idx) => (
                <tr key={idx} style={{ borderBottom: `1px solid ${C.border}` }} className="card-hover">
                  <td style={{ padding: "16px", color: C.t1, fontSize: 14, fontWeight: 600 }}>{g.subject}</td>
                  <td style={{ padding: "16px", color: C.t1, fontSize: 14 }}>{g.assignments || '-'}</td>
                  <td style={{ padding: "16px", color: C.t1, fontSize: 14 }}>{g.midterm || '-'}</td>
                  <td style={{ padding: "16px", color: C.t1, fontSize: 14 }}>{g.participation || '-'}</td>
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    <span style={{
                      background: C.green + "15",
                      color: C.green,
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 14,
                      fontWeight: 700
                    }}>
                      {g.overall || 'TBD'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;
