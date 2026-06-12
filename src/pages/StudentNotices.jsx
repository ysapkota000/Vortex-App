import React from 'react';
import { Bell, AlertTriangle, Info, Calendar } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';

const StudentNotices = ({ user }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return C.red;
      case 'normal': return C.blue;
      case 'low': return C.green;
      default: return C.t2;
    }
  };

  const getPriorityIcon = (priority, color) => {
    switch (priority) {
      case 'high': return <AlertTriangle size={20} color={color} />;
      case 'normal': return <Info size={20} color={color} />;
      case 'low': return <Bell size={20} color={color} />;
      default: return <Bell size={20} color={color} />;
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Campus Notices
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Stay updated with the latest announcements.
        </p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Recent Announcements" subtitle="Important updates from the administration" />
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {MOCK.notices.map(notice => {
            const color = getPriorityColor(notice.priority);
            return (
              <div
                key={notice.id}
                className="card-sm card-hover"
                style={{ padding: 20, display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <div style={{ background: color + "15", borderRadius: 12, padding: 12, flexShrink: 0 }}>
                  {getPriorityIcon(notice.priority, color)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: C.t1, margin: 0 }}>
                      {notice.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.t3, fontSize: 12 }}>
                      <Calendar size={12} /> {notice.date}
                    </div>
                  </div>
                  
                  <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.6, marginBottom: 12, margin: "8px 0" }}>
                    {notice.body}
                  </p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ 
                      fontSize: 12, 
                      fontWeight: 600, 
                      color: color, 
                      background: color + "15",
                      padding: "4px 10px",
                      borderRadius: 12,
                      textTransform: "capitalize"
                    }}>
                      {notice.priority} Priority
                    </span>
                    <span style={{ fontSize: 12, color: C.t3 }}>
                      Posted by <strong>{notice.author}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentNotices;
