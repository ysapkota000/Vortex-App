import React, { useState } from 'react';
import { Megaphone, Plus, Calendar, Edit, Trash2, Send } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, Tag } from '../components/Shared';
import Modal from '../components/Modal';

const EMPTY = { title: '', body: '', priority: 'normal' };

const AdminNotices = () => {
  const [notices, setNotices] = useState(MOCK.notices);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setForm(EMPTY); setModal('add'); };
  const openEdit = (n) => { setSelected(n); setForm({ title: n.title, body: n.body, priority: n.priority }); setModal('edit'); };
  const openDelete = (n) => { setSelected(n); setModal('delete'); };
  const close = () => { setModal(null); setSelected(null); };

  const handleAdd = () => {
    const newNotice = {
      id: notices.length + 1,
      title: form.title || 'Untitled Notice',
      body: form.body || '',
      priority: form.priority,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Admin Office',
    };
    setNotices([newNotice, ...notices]);
    close();
  };

  const handleEdit = () => {
    setNotices(notices.map(n => n.id === selected.id ? { ...n, ...form } : n));
    close();
  };

  const handleDelete = () => {
    setNotices(notices.filter(n => n.id !== selected.id));
    close();
  };

  const priorityColor = (p) => p === 'high' ? C.red : p === 'normal' ? C.blue : C.green;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>Campus Notices</h1>
          <p style={{ color: C.t3, marginTop: 4 }}>Broadcast announcements to the entire campus.</p>
        </div>
        <button className="btn" onClick={openAdd} style={{ background: C.blue, color: '#fff', border: 'none' }}>
          <Plus size={16} /> Post Notice
        </button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="All Notices" subtitle={`${notices.length} published`} />
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
                <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.65, margin: '6px 0 12px' }}>{notice.body}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tag color={priorityColor(notice.priority)}>{notice.priority} Priority</Tag>
                    <span style={{ fontSize: 12, color: C.t3 }}>by <strong style={{ color: C.t2 }}>{notice.author}</strong></span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost" title="Edit" onClick={() => openEdit(notice)} style={{ padding: 6 }}><Edit size={15} color={C.t2} /></button>
                    <button className="btn btn-ghost" title="Delete" onClick={() => openDelete(notice)} style={{ padding: 6 }}><Trash2 size={15} color={C.red} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {notices.length === 0 && <div style={{ padding: '40px 0', textAlign: 'center', color: C.t3 }}>No notices posted yet.</div>}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={modal === 'add'} onClose={close} title="Post New Notice">
        <div className="form-field">
          <label>Notice Title</label>
          <input className="input" placeholder="e.g. Final Exam Schedule Released" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="form-field">
          <label>Message Body</label>
          <textarea className="input" rows={4} placeholder="Write the notice content..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
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
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn" onClick={handleAdd} style={{ background: C.blue, color: '#fff' }}><Send size={14} /> Publish Notice</button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={modal === 'edit'} onClose={close} title="Edit Notice">
        <div className="form-field">
          <label>Notice Title</label>
          <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="form-field">
          <label>Message Body</label>
          <textarea className="input" rows={4} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
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
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn" onClick={handleEdit} style={{ background: C.blue, color: '#fff' }}>Save Changes</button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal open={modal === 'delete'} onClose={close} title="Delete Notice" width={420}>
        <div className="confirm-danger">
          Delete notice: <strong style={{ color: C.t1 }}>"{selected?.title}"</strong>? This cannot be undone.
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete}><Trash2 size={14} /> Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminNotices;
