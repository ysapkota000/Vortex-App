import React from 'react';
import { Settings, Shield, Bell, Database } from 'lucide-react';
import { C } from '../utils/theme';
import { SectionHead } from '../components/Shared';

const AdminSettings = ({ user }) => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <h1 className="syne" style={{ fontSize: 24, fontWeight: 800, color: C.t1 }}>
          System Settings
        </h1>
        <p style={{ color: C.t3, marginTop: 4 }}>
          Configure core parameters of the management system.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <SectionHead title="General Settings" subtitle="Basic configuration" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Settings size={20} color={C.t2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>Academic Year</div>
                <div style={{ color: C.t3, fontSize: 12, marginTop: 2 }}>Current active academic session</div>
              </div>
              <select className="input" style={{ width: 150, height: 36, fontSize: 13 }}>
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Database size={20} color={C.t2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>Database Backup</div>
                <div style={{ color: C.t3, fontSize: 12, marginTop: 2 }}>Automated daily backups</div>
              </div>
              <button className="btn" style={{ background: C.cyan, color: "#fff", border: "none", height: 36 }}>Backup Now</button>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <SectionHead title="Security & Notifications" subtitle="Manage access and alerts" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Shield size={20} color={C.t2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>Two-Factor Authentication</div>
                <div style={{ color: C.t3, fontSize: 12, marginTop: 2 }}>Require 2FA for all admin accounts</div>
              </div>
              <div style={{ width: 40, height: 20, background: C.cyan, borderRadius: 10, position: "relative", cursor: "pointer" }}>
                <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} />
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Bell size={20} color={C.t2} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.t1, fontSize: 14 }}>Email Notifications</div>
                <div style={{ color: C.t3, fontSize: 12, marginTop: 2 }}>Send alerts for critical system events</div>
              </div>
              <div style={{ width: 40, height: 20, background: C.cyan, borderRadius: 10, position: "relative", cursor: "pointer" }}>
                <div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
