import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, UserCheck } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead, Tag } from '../components/Shared';
import Modal from '../components/Modal';

const EMPTY_USER = { name: '', email: '', dept: '', role: 'student', status: 'active' };

const AdminUsers = ({ user }) => {
  const [tab, setTab] = useState('students');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState({ students: MOCK.allStudents, teachers: MOCK.allTeachers });
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_USER);

  const data = users[tab];
  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY_USER); setModal('add'); };
  const openEdit = (u) => { setSelected(u); setForm({ name: u.name, email: u.email, dept: u.dept, role: tab === 'students' ? 'student' : 'teacher', status: u.status }); setModal('edit'); };
  const openDelete = (u) => { setSelected(u); setModal('delete'); };
  const close = () => { setModal(null); setSelected(null); };

  const handleAdd = () => {
    const newUser = {
      id: `${tab === 'students' ? 'STU' : 'TCH'}-2025-${String(data.length + 1).padStart(3, '0')}`,
      name: form.name || 'New User',
      email: form.email || 'user@westcliff.edu',
      dept: form.dept || 'General',
      status: form.status,
      ...(tab === 'students' ? { year: '1st', attendance: '—', gpa: '—' } : { subjects: 1, students: 0 }),
    };
    setUsers(prev => ({ ...prev, [tab]: [newUser, ...prev[tab]] }));
    close();
  };

  const handleEdit = () => {
    setUsers(prev => ({
      ...prev,
      [tab]: prev[tab].map(u => u.id === selected.id ? { ...u, ...form } : u),
    }));
    close();
  };

  const handleDelete = () => {
    setUsers(prev => ({ ...prev, [tab]: prev[tab].filter(u => u.id !== selected.id) }));
    close();
  };

  const Field = ({ label, name, type = 'text', as, children }) => (
    <div className="form-field">
      <label>{label}</label>
      {as === 'select'
        ? <select className="input" value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}>{children}</select>
        : <input className="input" type={type} value={form[name]} placeholder={label} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} />
      }
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>User Management</h1>
          <p style={{ color: C.t3, marginTop: 4 }}>Manage students, faculty, and administrative staff.</p>
        </div>
        <button className="btn" onClick={openAdd} style={{ background: C.blue, color: '#fff', border: 'none' }}>
          <Plus size={16} /> Add New User
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {['students', 'teachers'].map(t => (
          <button key={t} className="btn" onClick={() => setTab(t)} style={{
            background: tab === t ? C.blue : 'transparent',
            color: tab === t ? '#fff' : C.t2,
            border: `1px solid ${tab === t ? C.blue : C.border}`,
          }}>
            {t === 'students' ? 'Students' : 'Faculty'}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <SectionHead title={`${tab === 'students' ? 'Student' : 'Faculty'} Directory`} subtitle={`Total: ${filtered.length}`} />
          <div style={{ position: 'relative', width: 250 }}>
            <Search size={14} color={C.t3} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input className="input" placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, height: 36, fontSize: 13 }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {['ID', 'Name', 'Department', 'Email', 'Status', 'Actions'].map((h, i) => (
                  <th key={h} style={{ padding: '12px 16px', color: C.t2, fontSize: 13, textAlign: i === 5 ? 'right' : 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} style={{ borderBottom: `1px solid ${C.border}` }} className="card-hover">
                  <td style={{ padding: '14px 16px', color: C.t3, fontSize: 12 }}>{u.id}</td>
                  <td style={{ padding: '14px 16px', color: C.t1, fontSize: 14, fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: '14px 16px', color: C.t2, fontSize: 14 }}>{u.dept}</td>
                  <td style={{ padding: '14px 16px', color: C.t3, fontSize: 13 }}>{u.email}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Tag color={u.status === 'active' ? C.green : C.red}>{u.status}</Tag>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                      <button className="btn btn-ghost" title="Edit" onClick={() => openEdit(u)} style={{ padding: 6 }}><Edit size={15} color={C.t2} /></button>
                      <button className="btn btn-ghost" title="Delete" onClick={() => openDelete(u)} style={{ padding: 6 }}><Trash2 size={15} color={C.red} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div style={{ padding: '40px 0', textAlign: 'center', color: C.t3 }}>No users found.</div>}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={modal === 'add'} onClose={close} title="Add New User">
        <div className="form-row">
          <Field label="Full Name" name="name" />
          <Field label="Email" name="email" type="email" />
        </div>
        <div className="form-row">
          <Field label="Department" name="dept" />
          <Field label="Status" name="status" as="select">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="probation">Probation</option>
          </Field>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn" onClick={handleAdd} style={{ background: C.blue, color: '#fff' }}><UserCheck size={15} /> Add User</button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={modal === 'edit'} onClose={close} title={`Edit — ${selected?.name}`}>
        <div className="form-row">
          <Field label="Full Name" name="name" />
          <Field label="Email" name="email" type="email" />
        </div>
        <div className="form-row">
          <Field label="Department" name="dept" />
          <Field label="Status" name="status" as="select">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="probation">Probation</option>
          </Field>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn" onClick={handleEdit} style={{ background: C.blue, color: '#fff' }}>Save Changes</button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal open={modal === 'delete'} onClose={close} title="Remove User" width={420}>
        <div className="confirm-danger">
          Are you sure you want to remove <strong style={{ color: C.t1 }}>{selected?.name}</strong>?
          This action cannot be undone.
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={close}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete}><Trash2 size={14} /> Remove User</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
