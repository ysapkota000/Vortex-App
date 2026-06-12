import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';

const StudentSchedule = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Class Schedule
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Your weekly timetable and room assignments.
        </p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Weekly Timetable" subtitle="View your classes for the week" />
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 16 }}>
          {MOCK.schedule.map((dayData, idx) => (
            <div key={idx} style={{ 
              background: C.bg, 
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              overflow: "hidden" 
            }}>
              <div style={{ 
                padding: "12px 16px", 
                borderBottom: `1px solid ${C.border}`,
                background: C.gray + "30",
                textAlign: "center",
                fontWeight: 600,
                color: C.t1,
                fontSize: 14
              }}>
                {dayData.day}
              </div>
              
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                {dayData.slots.length > 0 ? dayData.slots.map((slot, sIdx) => (
                  <div key={sIdx} style={{
                    background: slot.c + "15",
                    borderLeft: `3px solid ${slot.c}`,
                    padding: "12px 10px",
                    borderRadius: "0 8px 8px 0"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 6 }}>
                      {slot.s}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.t2, fontSize: 11, marginBottom: 4 }}>
                      <Clock size={12} color={slot.c} /> {slot.t}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.t2, fontSize: 11 }}>
                      <MapPin size={12} color={slot.c} /> {slot.r}
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: "20px 0", textAlign: "center", color: C.t3, fontSize: 12 }}>
                    No classes
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
