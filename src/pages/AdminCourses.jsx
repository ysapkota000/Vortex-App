import React, { useState } from 'react';
import { BookOpen, Plus, Building2, Users, X } from 'lucide-react';
import { C } from '../utils/theme';
import { MOCK } from '../data/mockData';
import { SectionHead } from '../components/Shared';
import Modal from '../components/Modal';

const EMPTY = { name: '', students: '', faculty: '' };

const AdminCourses = () => {
  const [departments, setDepartments] = useState(MOCK.departments);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const handleAdd = () => {
    const newDept = {
      id: departments.length + 1,
      name: form.name || 'New Department',
      students: parseInt(form.students) || 0,
      faculty: parseInt(form.faculty) || 0,
    };
    setDepartments([...departments, newDept]);
    setModal(false);
    setForm(EMPTY);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
    setDeleteModal(null);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>Courses & Departments</h1>
          <p style={{ color: C.t3, marginTop: 4 }}>Manage academic structure and program offerings.</p>
        </div>
        <button className="btn" onClick={() => { setForm(EMPTY); setModal(true); }} style={{ background: C.blue, color: '#fff', border: 'none' }}>
          <Plus size={16} /> New Department
        </button>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <SectionHead title="Active Departments" subtitle={`${departments.length} departments`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 16 }}>
          {departments.map(d => (
            <div key={d.id} className="card-sm" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: C.blueL, borderRadius: 12, padding: 16, flexShrink: 0 }}>
                <BookOpen size={24} color={C.blue} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.t1, marginBottom: 6 }}>{d.name}</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: C.t2 }}>
                    <Users size={13} color={C.t3} />
                    <strong style={{ color: C.t1 }}>{d.students}</strong> Students
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: C.t2 }}>
                    <Building2 size={13} color={C.t3} />
                    <strong style={{ color: C.t1 }}>{d.faculty}</strong> Faculty
                  </span>
                </div>
              </div>
              <button className="btn btn-ghost" title="Remove" onClick={() => setDeleteModal(d)} style={{ padding: 7, flexShrink: 0 }}>
                <X size={15} color={C.red} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title="Add New Department">
        <div className="form-field">
          <label>Department Name</label>
          <input className="input" placeholder="e.g. Computer Science" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Total Students</label>
            <input className="input" type="number" placeholder="0" value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))} />
          </div>
          <div className="form-field">
            <label>Faculty Members</label>
            <input className="input" type="number" placeholder="0" value={form.faculty} onChange={e => setForm(f => ({ ...f, faculty: e.target.value }))} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn" onClick={handleAdd} style={{ background: C.blue, color: '#fff' }}><Plus size={14} /> Create Department</button>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Remove Department" width={420}>
        <div className="confirm-danger">
          Remove department <strong style={{ color: C.t1 }}>{deleteModal?.name}</strong>? All related data will be unlinked.
        </div>
        <div className="form-actions">
          <button className="btn btn-ghost" onClick={() => setDeleteModal(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteModal.id)}>Remove</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCourses;
