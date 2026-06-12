import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';

const TeacherStudents = ({ user }) => {
  const [selectedSection, setSelectedSection] = useState('all');
  const [search, setSearch] = useState('');

  const sections = ['all', ...MOCK.teacherClasses.map(c => c.section)];

  const filtered = MOCK.teacherStudents
    .filter(s => selectedSection === 'all' || s.section === selectedSection)
    .filter(s => s.n.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));

  // Group by section for 'all' view
  const grouped = selectedSection === 'all'
    ? MOCK.teacherClasses.map(cls => ({
        cls,
        students: filtered.filter(s => s.section === cls.section),
      })).filter(g => g.students.length > 0)
    : null;

  const getAttColor = (att) => {
    const num = parseInt(att);
    if (num >= 90) return C.green;
    if (num >= 75) return C.amber;
    return C.red;
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          My Students
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          View student performance metrics, organized by section.
        </p>
      </div>

      {/* Section filter tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {sections.map(sec => {
          const cls = MOCK.teacherClasses.find(c => c.section === sec);
          const active = selectedSection === sec;
          return (
            <button
              key={sec}
              className="btn"
              onClick={() => setSelectedSection(sec)}
              style={{
                background: active ? (cls?.color || C.blue) : C.bg,
                color: active ? '#fff' : C.t2,
                border: `1px solid ${active ? (cls?.color || C.blue) : C.border}`,
                fontWeight: active ? 700 : 500,
                transition: 'all 0.18s',
              }}
            >
              {sec === 'all' ? 'All Sections' : (
                <>
                  {cls?.s} &nbsp;·&nbsp; {sec}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', width: 280, marginBottom: 20 }}>
        <Search size={14} color={C.t3} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          className="input"
          placeholder="Search by name or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: 34, height: 38, fontSize: 13 }}
        />
      </div>

      {/* All sections grouped view */}
      {selectedSection === 'all' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {grouped.map(({ cls, students }) => (
            <div className="card" key={cls.section} style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ background: cls.color + '20', borderRadius: 10, padding: 10 }}>
                  <Users size={18} color={cls.color} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>{cls.section} — {cls.s}</div>
                  <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{students.length} students · {cls.room}</div>
                </div>
              </div>
              <StudentTable students={students} getAttColor={getAttColor} />
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 24 }}>
          {(() => {
            const cls = MOCK.teacherClasses.find(c => c.section === selectedSection);
            return (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ background: cls.color + '20', borderRadius: 10, padding: 10 }}>
                    <Users size={18} color={cls.color} />
                  </div>
                  <SectionHead
                    title={`${cls.section} — ${cls.s}`}
                    subtitle={`${filtered.length} student${filtered.length !== 1 ? 's' : ''} in this section`}
                  />
                </div>
                <StudentTable students={filtered} getAttColor={getAttColor} />
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

const StudentTable = ({ students, getAttColor }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${C.border}` }}>
          <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>ID</th>
          <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>Name</th>
          <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>Section</th>
          <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>Attendance</th>
          <th style={{ padding: '12px 16px', color: C.t2, fontSize: 13 }}>GPA</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id} style={{ borderBottom: `1px solid ${C.border}` }} className="card-hover">
            <td style={{ padding: '14px 16px', color: C.t3, fontSize: 13 }}>{s.id}</td>
            <td style={{ padding: '14px 16px', color: C.t1, fontSize: 14, fontWeight: 600 }}>{s.n}</td>
            <td style={{ padding: '14px 16px' }}>
              <span style={{
                background: C.blue + '18', color: C.blue,
                borderRadius: 8, padding: '3px 10px', fontSize: 12, fontWeight: 600,
              }}>{s.section}</span>
            </td>
            <td style={{ padding: '14px 16px' }}>
              <span style={{ color: getAttColor(s.att), fontWeight: 600, fontSize: 14 }}>{s.att}</span>
            </td>
            <td style={{ padding: '14px 16px', color: C.t1, fontSize: 14, fontWeight: 600 }}>{s.gpa}</td>
          </tr>
        ))}
        {students.length === 0 && (
          <tr>
            <td colSpan={5} style={{ padding: 28, textAlign: 'center', color: C.t3, fontSize: 14 }}>
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TeacherStudents;
