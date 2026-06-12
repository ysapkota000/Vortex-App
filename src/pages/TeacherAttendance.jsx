import React, { useState, useMemo } from 'react';
import { Check, X, Search, Calendar, ChevronDown, Save, CheckCircle } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';

const today = new Date().toISOString().split('T')[0];

const TeacherAttendance = ({ user }) => {
  const [selectedClass, setSelectedClass] = useState(MOCK.teacherClasses[0]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(today);
  // attendanceLog: { [date_section]: { [studentId]: 'present' | 'absent' } }
  const [attendanceLog, setAttendanceLog] = useState({});
  const [saved, setSaved] = useState(false);

  const logKey = `${date}_${selectedClass.section}`;
  const dayLog = attendanceLog[logKey] || {};

  const students = MOCK.teacherStudents
    .filter(s => s.section === selectedClass.section)
    .filter(s => s.n.toLowerCase().includes(search.toLowerCase()));

  const markAll = (status) => {
    const next = { ...dayLog };
    students.forEach(s => { next[s.id] = status; });
    setAttendanceLog(prev => ({ ...prev, [logKey]: next }));
    setSaved(false);
  };

  const mark = (id, status) => {
    setAttendanceLog(prev => ({
      ...prev,
      [logKey]: { ...dayLog, [id]: status },
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const presentCount = students.filter(s => dayLog[s.id] === 'present').length;
  const absentCount = students.filter(s => dayLog[s.id] === 'absent').length;
  const unmarkedCount = students.length - presentCount - absentCount;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Mark Attendance
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Record daily attendance by section and date.
        </p>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {MOCK.teacherClasses.map((cls, idx) => {
          const active = selectedClass.section === cls.section;
          return (
            <button
              key={idx}
              className="btn"
              onClick={() => { setSelectedClass(cls); setSaved(false); }}
              style={{
                background: active ? cls.color : C.bg,
                color: active ? '#fff' : C.t2,
                border: `1px solid ${active ? cls.color : C.border}`,
                fontWeight: active ? 700 : 500,
                transition: 'all 0.18s',
              }}
            >
              {cls.s} &nbsp;·&nbsp; <span style={{ opacity: 0.85 }}>{cls.section}</span>
            </button>
          );
        })}
      </div>

      {/* Date + Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Date Picker */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: '10px 16px',
        }}>
          <Calendar size={16} color={C.blue} />
          <span style={{ fontSize: 13, color: C.t2, fontWeight: 500 }}>Date:</span>
          <input
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setSaved(false); }}
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: C.t1, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          />
        </div>

        {/* Stats chips */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ background: C.green + '18', border: `1px solid ${C.green}40`, borderRadius: 10, padding: '8px 16px', fontSize: 13, color: C.green, fontWeight: 600 }}>
            ✓ Present: {presentCount}
          </div>
          <div style={{ background: C.red + '18', border: `1px solid ${C.red}40`, borderRadius: 10, padding: '8px 16px', fontSize: 13, color: C.red, fontWeight: 600 }}>
            ✗ Absent: {absentCount}
          </div>
          <div style={{ background: C.t3 + '18', border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 16px', fontSize: 13, color: C.t3, fontWeight: 600 }}>
            — Unmarked: {unmarkedCount}
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button className="btn" onClick={() => markAll('present')}
            style={{ background: C.green + '20', color: C.green, border: `1px solid ${C.green}40`, fontSize: 13 }}>
            Mark All Present
          </button>
          <button className="btn" onClick={() => markAll('absent')}
            style={{ background: C.red + '20', color: C.red, border: `1px solid ${C.red}40`, fontSize: 13 }}>
            Mark All Absent
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <SectionHead title={`${selectedClass.section} — ${selectedClass.s}`} subtitle={`${students.length} students enrolled`} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 230 }}>
              <Search size={14} color={C.t3} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="input"
                placeholder="Search students..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
              />
            </div>
            <button
              className="btn"
              onClick={handleSave}
              style={{
                background: saved ? C.green : C.blue,
                color: '#fff', border: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'background 0.2s',
              }}
            >
              {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save</>}
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>ID</th>
                <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>Name</th>
                <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>Overall Att.</th>
                <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13, textAlign: 'center' }}>
                  Status for {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </th>
                <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const status = dayLog[s.id];
                const isPresent = status === 'present';
                const isAbsent = status === 'absent';
                return (
                  <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}` }} className="card-hover">
                    <td style={{ padding: '14px 16px', color: C.t3, fontSize: 13 }}>{s.id}</td>
                    <td style={{ padding: '14px 16px', color: C.t1, fontSize: 14, fontWeight: 600 }}>{s.n}</td>
                    <td style={{ padding: '14px 16px', color: C.t2, fontSize: 14 }}>{s.att}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {status ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          background: isPresent ? C.green + '20' : C.red + '20',
                          color: isPresent ? C.green : C.red,
                          borderRadius: 20, padding: '4px 14px',
                          fontSize: 12, fontWeight: 700,
                        }}>
                          {isPresent ? <Check size={12} /> : <X size={12} />}
                          {isPresent ? 'Present' : 'Absent'}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12, color: C.t3, fontStyle: 'italic' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <button
                          className="btn"
                          onClick={() => mark(s.id, 'present')}
                          style={{
                            background: isPresent ? C.green : C.green + '20',
                            color: isPresent ? '#fff' : C.green,
                            padding: '6px 14px', border: 'none',
                            fontWeight: isPresent ? 700 : 500,
                            transition: 'all 0.15s',
                          }}
                        >
                          <Check size={14} /> Present
                        </button>
                        <button
                          className="btn"
                          onClick={() => mark(s.id, 'absent')}
                          style={{
                            background: isAbsent ? C.red : C.red + '20',
                            color: isAbsent ? '#fff' : C.red,
                            padding: '6px 14px', border: 'none',
                            fontWeight: isAbsent ? 700 : 500,
                            transition: 'all 0.15s',
                          }}
                        >
                          <X size={14} /> Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 32, textAlign: 'center', color: C.t3, fontSize: 14 }}>
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
