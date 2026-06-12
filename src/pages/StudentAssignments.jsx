import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, Tag } from '../components/Shared';

const STATUS_COLOR = {
  submitted: C.green,
  pending: C.amber,
  late: C.red,
};
const STATUS_ICON = {
  submitted: <CheckCircle size={13} />,
  pending: <Clock size={13} />,
  late: <AlertCircle size={13} />,
};

const StudentAssignments = ({ user }) => {
  const subjects = [...new Set(MOCK.assignments.map(a => a.subject))];
  const [activeSubject, setActiveSubject] = useState('all');

  const filtered = activeSubject === 'all'
    ? MOCK.assignments
    : MOCK.assignments.filter(a => a.subject === activeSubject);

  // When showing all → group by subject
  const grouped = activeSubject === 'all'
    ? subjects.map(sub => ({
        subject: sub,
        items: filtered.filter(a => a.subject === sub),
      }))
    : null;

  const subjectColor = (sub) => {
    const palette = [C.blue, '#A78BFA', '#22D3EE', '#10B981', '#F59E0B'];
    return palette[subjects.indexOf(sub) % palette.length];
  };

  const AssignmentCard = ({ a }) => {
    const color = STATUS_COLOR[a.status] || C.blue;
    return (
      <div
        className="card-sm card-hover"
        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}
      >
        <div style={{ background: color + '15', borderRadius: 10, padding: 12, flexShrink: 0 }}>
          <BookOpen size={20} color={color} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 600, color: C.t1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {a.title}
          </div>
          <div style={{ fontSize: 13, color: C.t2, marginTop: 4 }}>
            {a.subject}
          </div>
        </div>

        <div style={{ textAlign: 'right', paddingRight: 20, borderRight: `1px solid ${C.border}`, minWidth: 100 }}>
          <div style={{ fontSize: 12, color: C.t3, marginBottom: 4 }}>Due Date</div>
          <div style={{ fontSize: 14, color: C.t1, fontWeight: 500 }}>{a.due}</div>
        </div>

        <div style={{ textAlign: 'right', minWidth: 110 }}>
          {a.grade ? (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>
                {a.points}<span style={{ fontSize: 12, color: C.t3 }}>/{a.max}</span>
              </div>
              <div style={{ fontSize: 12, color, fontWeight: 600, marginTop: 2 }}>
                Grade: {a.grade}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
              gap: 5, color,
            }}>
              {STATUS_ICON[a.status]}
              <span style={{ fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{a.status}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          Assignments
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Your coursework organized by subject.
        </p>
      </div>

      {/* Subject filter tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', ...subjects].map(sub => {
          const active = activeSubject === sub;
          const color = sub === 'all' ? C.blue : subjectColor(sub);
          return (
            <button
              key={sub}
              className="btn"
              onClick={() => setActiveSubject(sub)}
              style={{
                background: active ? color : C.bg,
                color: active ? '#fff' : C.t2,
                border: `1px solid ${active ? color : C.border}`,
                fontWeight: active ? 700 : 500,
                fontSize: 13,
                transition: 'all 0.18s',
              }}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          );
        })}
      </div>

      {/* All subjects grouped */}
      {activeSubject === 'all' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {grouped.map(({ subject, items }) => (
            <div className="card" key={subject} style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: subjectColor(subject), flexShrink: 0 }} />
                <div style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>{subject}</div>
                <span style={{
                  background: C.blue + '15', color: C.blue,
                  borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 600, marginLeft: 4,
                }}>
                  {items.length} task{items.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(a => <AssignmentCard key={a.id} a={a} />)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: subjectColor(activeSubject) }} />
            <SectionHead
              title={activeSubject}
              subtitle={`${filtered.length} assignment${filtered.length !== 1 ? 's' : ''}`}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(a => <AssignmentCard key={a.id} a={a} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
