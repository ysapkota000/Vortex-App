import React, { useState, useRef } from 'react';
import { BookOpen, Plus, Paperclip, X, FileText, Image, File } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, Tag } from '../components/Shared';
import Modal from '../components/Modal';

const EMPTY = { title: '', subject: '', section: 'CS-301', dueDate: '', maxPts: '100', files: [] };

const getFileIcon = (name) => {
  const ext = name.split('.').pop().toLowerCase();
  if (['jpg','jpeg','png','gif','webp'].includes(ext)) return <Image size={14} />;
  if (['pdf','doc','docx','txt'].includes(ext)) return <FileText size={14} />;
  return <File size={14} />;
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

const TeacherAssignments = ({ user }) => {
  const [assignments, setAssignments] = useState(MOCK.teacherAssignments);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    const mapped = arr.map(f => ({ name: f.name, size: f.size, type: f.type, file: f }));
    setForm(prev => ({ ...prev, files: [...prev.files, ...mapped] }));
  };

  const removeFile = (idx) => {
    setForm(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }));
  };

  const handleCreate = () => {
    const newA = {
      id: assignments.length + 1,
      title: form.title || 'Untitled Assignment',
      subject: form.subject || 'General',
      section: form.section,
      dueDate: form.dueDate || 'TBD',
      submissions: 0,
      total: 40,
      maxPts: parseInt(form.maxPts) || 100,
      status: 'active',
      fileCount: form.files.length,
    };
    setAssignments([newA, ...assignments]);
    setModal(false);
    setForm(EMPTY);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>Assignments</h1>
          <p style={{ color: C.t3, marginTop: 4 }}>Manage coursework and track submissions.</p>
        </div>
        <button className="btn" onClick={() => { setForm(EMPTY); setModal(true); }}
          style={{ background: C.blue, color: '#fff', border: 'none' }}>
          <Plus size={16} /> Create Assignment
        </button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="All Assignments" subtitle="Your created assignments across all sections" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {assignments.map(a => (
            <div key={a.id} className="card-sm card-hover"
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
              <div style={{ background: C.blueL, borderRadius: 10, padding: 12, flexShrink: 0 }}>
                <BookOpen size={20} color={C.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.t1 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: C.t2, marginTop: 3, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span>{a.subject} · {a.section}</span>
                  {(a.fileCount > 0) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: C.blue, fontSize: 12 }}>
                      <Paperclip size={12} /> {a.fileCount} file{a.fileCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right', paddingRight: 20, borderRight: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 12, color: C.t3, marginBottom: 3 }}>Due Date</div>
                <div style={{ fontSize: 14, color: C.t1, fontWeight: 500 }}>{a.dueDate}</div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 90 }}>
                <div style={{ fontSize: 12, color: C.t3, marginBottom: 3 }}>Submissions</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>
                  {a.submissions}<span style={{ fontSize: 12, color: C.t3 }}>/{a.total}</span>
                </div>
              </div>
              <div style={{ width: 72, textAlign: 'right' }}>
                <Tag color={a.status === 'active' ? C.green : C.t3}>{a.status}</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Create Assignment" width={580}>
        <div className="form-field">
          <label>Assignment Title</label>
          <input className="input" placeholder="e.g. ER Diagram — Hospital System"
            value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Subject</label>
            <input className="input" placeholder="e.g. Database Systems"
              value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          </div>
          <div className="form-field">
            <label>Section</label>
            <select className="input" value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))}>
              <option value="CS-301">CS-301</option>
              <option value="CS-302">CS-302</option>
              <option value="CS-305">CS-305</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Due Date</label>
            <input className="input" type="date" value={form.dueDate}
              onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          </div>
          <div className="form-field">
            <label>Max Points</label>
            <input className="input" type="number" placeholder="100" value={form.maxPts}
              onChange={e => setForm(f => ({ ...f, maxPts: e.target.value }))} />
          </div>
        </div>

        {/* File Upload */}
        <div className="form-field">
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Paperclip size={14} color={C.blue} /> Attach Files <span style={{ color: C.t3, fontWeight: 400 }}>(optional)</span>
          </label>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? C.blue : C.border}`,
              borderRadius: 12,
              padding: '20px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? C.blue + '08' : C.bg,
              transition: 'all 0.18s',
            }}
          >
            <Paperclip size={22} color={dragOver ? C.blue : C.t3} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 14, color: dragOver ? C.blue : C.t2, fontWeight: 500 }}>
              Drag &amp; drop files here, or <span style={{ color: C.blue, textDecoration: 'underline' }}>browse</span>
            </div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 4 }}>
              PDF, DOC, DOCX, PNG, JPG, ZIP, etc.
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={e => handleFiles(e.target.files)}
            />
          </div>

          {/* Attached Files List */}
          {form.files.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {form.files.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: '8px 12px',
                }}>
                  <span style={{ color: C.blue }}>{getFileIcon(f.name)}</span>
                  <span style={{ flex: 1, fontSize: 13, color: C.t1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </span>
                  <span style={{ fontSize: 11, color: C.t3, flexShrink: 0 }}>{formatBytes(f.size)}</span>
                  <button
                    onClick={() => removeFile(i)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}
                  >
                    <X size={14} color={C.red} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn" onClick={handleCreate} style={{ background: C.blue, color: '#fff' }}>
            <Plus size={14} /> Create Assignment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAssignments;
