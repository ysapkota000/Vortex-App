import React, { useState } from 'react';
import { Megaphone, Plus, Calendar, Send } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, Tag } from '../components/Shared';
import Modal from '../components/Modal';

const EMPTY = { title: '', body: '', priority: 'normal' };

const TeacherAnnouncements = ({ user }) => {
  const [notices, setNotices] = useState(MOCK.notices.slice(0, 3));
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const handlePost = () => {
    const newNotice = {
      id: Date.now(),
      title: form.title || 'Untitled Announcement',
      body: form.body || '',
      priority: form.priority,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: user?.name || 'Faculty',
    };
    setNotices([newNotice, ...notices]);
    setModal(false);
    setForm(EMPTY);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>Announcements</h1>
          <p style={{ color: C.t3, marginTop: 4 }}>Post notices and updates for your students.</p>
        </div>
        <button className="btn" onClick={() => { setForm(EMPTY); setModal(true); }} style={{ background: C.blue, color: '#fff', border: 'none' }}>
          <Plus size={16} /> New Announcement
        </button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Recent Announcements" subtitle={`${notices.length} posted`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
          {notices.map(notice => (
            <div key={notice.id} className="card-sm card-hover"
              style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ background: C.blueL, borderRadius: 12, padding: 12, flexShrink: 0 }}>
                <Megaphone size={20} color={C.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.t1, margin: 0 }}>{notice.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.t3, fontSize: 12, flexShrink: 0, marginLeft: 12 }}>
                    <Calendar size={12} /> {notice.date}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.65, margin: '6px 0 10px' }}>{notice.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Tag color={notice.priority === 'high' ? C.red : C.blue}>{notice.priority} Priority</Tag>
                  <span style={{ fontSize: 12, color: C.t3 }}>by <strong style={{ color: C.t2 }}>{notice.author}</strong></span>
                </div>
              </div>
            </div>
          ))}
          {notices.length === 0 && <div style={{ padding: '40px 0', textAlign: 'center', color: C.t3 }}>No announcements yet.</div>}
        </div>
      </div>

      {/* New Announcement Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="New Announcement">
        <div className="form-field">
          <label>Title</label>
          <input className="input" placeholder="e.g. Midterm results published" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="form-field">
          <label>Message</label>
          <textarea className="input" rows={4} placeholder="Write your announcement..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
        </div>
        <div className="form-field">
          <label>Priority</label>
          <select className="input" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn" onClick={handlePost} style={{ background: C.blue, color: '#fff' }}><Send size={14} /> Post Announcement</button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAnnouncements;
