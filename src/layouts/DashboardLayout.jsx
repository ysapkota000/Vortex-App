import React, { useState } from 'react';
import { 
  LogOut, Bell, Search, Menu, GraduationCap, 
  Home, ClipboardCheck, BookOpen, Calendar, 
  Award, Megaphone, Users, FileText, BarChart2, Settings
} from 'lucide-react';
import { C } from '../utils/theme';
import { Avatar } from '../components/Shared';

const DashboardLayout = ({ user, activeTab, setActiveTab, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = {
    student: [
      { id: "dash", label: "Dashboard", icon: Home },
      { id: "att", label: "Attendance", icon: ClipboardCheck },
      { id: "assign", label: "Assignments", icon: BookOpen },
      { id: "sched", label: "Schedule", icon: Calendar },
      { id: "grades", label: "Grades", icon: Award },
      { id: "notices", label: "Notices", icon: Megaphone },
    ],
    teacher: [
      { id: "dash", label: "Dashboard", icon: Home },
      { id: "att", label: "Mark Attendance", icon: ClipboardCheck },
      { id: "assign", label: "Assignments", icon: BookOpen },
      { id: "students", label: "My Students", icon: Users },
      { id: "announce", label: "Announcements", icon: Megaphone },
    ],
    admin: [
      { id: "dash", label: "Dashboard", icon: BarChart2 },
      { id: "users", label: "User Management", icon: Users },
      { id: "courses", label: "Courses & Depts", icon: BookOpen },
      { id: "notices", label: "Campus Notices", icon: Megaphone },
      { id: "settings", label: "System Settings", icon: Settings },
    ]
  };

  return (
    <div style={{ display: "flex", height: "100%", background: C.bg }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 80, background: C.sb, 
        borderRight: `1px solid ${C.border}`, display: "flex", 
        flexDirection: "column", transition: "width 0.3s ease", overflow: "hidden"
      }}>
        <div style={{ padding: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: C.blue, borderRadius: 10, padding: 8 }}>
            <GraduationCap color="#fff" size={22} />
          </div>
          {sidebarOpen && <span className="syne" style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>Vortex</span>}
        </div>

        <div style={{ flex: 1, padding: "0 14px", marginTop: 10 }}>
          <div className="section-label" style={{ padding: "0 12px 10px", opacity: sidebarOpen ? 1 : 0 }}>Menu</div>
          {menuItems[user.role].map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className={`nav-item ${activeTab === item.id ? "nav-active" : ""}`}>
              <item.icon size={19} />
              {sidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>

        <div style={{ padding: 14, borderTop: `1px solid ${C.border}` }}>
          <div className="nav-item" style={{ color: C.red }} onClick={onLogout}>
            <LogOut size={19} />
            {sidebarOpen && <span>Logout / Home</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <header style={{ height: 70, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 30px", background: C.bg, zIndex: 10 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: C.t2, cursor: "pointer", marginRight: 20 }}>
            <Menu size={20} />
          </button>
          
          <div style={{ position: "relative", width: 300 }}>
            <Search size={16} color={C.t3} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input className="input" placeholder="Search anything..." style={{ paddingLeft: 38, height: 40, background: "rgba(255,255,255,0.03)" }} />
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={C.t2} />
              <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: C.red, borderRadius: "50%", border: `2px solid ${C.bg}` }} />
            </div>
            <div className="divider" style={{ height: 24, width: 1, borderLeft: `1px solid ${C.border}` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{user.name}</div>
                <div style={{ fontSize: 11, color: C.t3, textTransform: "capitalize" }}>{user.role} Portal</div>
              </div>
              <Avatar name={user.name} size={38} color={C.blue} />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main style={{ flex: 1, overflowY: "auto", padding: "30px 40px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
