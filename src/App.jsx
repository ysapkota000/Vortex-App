import React, { useState } from 'react';
import { MOCK } from './data/mockData';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/StudentDashboard';
import StudentAttendance from './pages/StudentAttendance';
import StudentAssignments from './pages/StudentAssignments';
import StudentSchedule from './pages/StudentSchedule';
import StudentGrades from './pages/StudentGrades';
import StudentNotices from './pages/StudentNotices';

import TeacherDashboard from './pages/TeacherDashboard';
import TeacherAttendance from './pages/TeacherAttendance';
import TeacherAssignments from './pages/TeacherAssignments';
import TeacherStudents from './pages/TeacherStudents';
import TeacherAnnouncements from './pages/TeacherAnnouncements';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminNotices from './pages/AdminNotices';
import AdminSettings from './pages/AdminSettings';

import { C } from './utils/theme';
import { GraduationCap, Users, Shield, ChevronRight } from 'lucide-react';

// Mock views for other tabs (to be implemented in real files)
const Placeholder = ({ title }) => (
  <div className="card" style={{ padding: 40, textAlign: "center" }}>
    <h2 className="syne" style={{ color: C.t1 }}>{title}</h2>
    <p style={{ color: C.t3, marginTop: 10 }}>This module is being structured into its own file.</p>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dash");

  React.useEffect(() => {
    const handlePopState = () => {
      setUser(null);
      setActiveTab("dash");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleLogin = (rData) => {
    setUser(rData);
    window.history.pushState({ loggedIn: true }, "");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("dash");
    // Go back in history if we pushed state, otherwise just clear it
    if (window.history.state?.loggedIn) {
      window.history.back();
    }
  };

  if (!user) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 1000 }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ display: "inline-flex", background: C.blue, borderRadius: 16, padding: 12, marginBottom: 20 }}>
              <GraduationCap size={40} color="#fff" />
            </div>
            <h1 className="syne" style={{ fontSize: 36, fontWeight: 800, color: C.t1 }}>Vortex</h1>
            <p style={{ color: C.t3, fontSize: 16, marginTop: 8 }}>Smart College Management System</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { role: "student", icon: GraduationCap, title: "Student Portal", desc: "View grades, attendance, and submit assignments.", data: MOCK.student },
              { role: "teacher", icon: Users, title: "Faculty Portal", desc: "Manage classes, mark attendance, and grade students.", data: MOCK.teacher },
              { role: "admin", icon: Shield, title: "Admin Panel", desc: "System administration, user management, and analytics.", data: MOCK.admin }
            ].map(r => (
              <div key={r.role} onClick={() => handleLogin(r.data)} className="card role-card" style={{ padding: 32, textAlign: "center", borderTop: `3px solid ${C.blue}` }}>
                <div style={{ display: "inline-flex", background: C.blueL, borderRadius: "50%", padding: 20, marginBottom: 24 }}>
                  <r.icon size={32} color={C.blue} />
                </div>
                <h3 className="syne" style={{ fontSize: 20, fontWeight: 700, color: C.t1, marginBottom: 12 }}>{r.title}</h3>
                <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.6, marginBottom: 24 }}>{r.desc}</p>
                <button className="btn" style={{ width: "100%", background: C.blue, color: "#fff", boxShadow: `0 4px 18px ${C.blue}44`, fontWeight: 700 }}>
                  Login as {r.role.charAt(0).toUpperCase() + r.role.slice(1)} <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (user.role === "student") {
      switch (activeTab) {
        case "dash": return <StudentDashboard user={user} />;
        case "att": return <StudentAttendance user={user} />;
        case "assign": return <StudentAssignments user={user} />;
        case "sched": return <StudentSchedule user={user} />;
        case "grades": return <StudentGrades user={user} />;
        case "notices": return <StudentNotices user={user} />;
        default: return <StudentDashboard user={user} />;
      }
    }
    
    if (user.role === "teacher") {
      switch (activeTab) {
        case "dash": return <TeacherDashboard user={user} />;
        case "att": return <TeacherAttendance user={user} />;
        case "assign": return <TeacherAssignments user={user} />;
        case "students": return <TeacherStudents user={user} />;
        case "announce": return <TeacherAnnouncements user={user} />;
        default: return <TeacherDashboard user={user} />;
      }
    }

    if (user.role === "admin") {
      switch (activeTab) {
        case "dash": return <AdminDashboard user={user} />;
        case "users": return <AdminUsers user={user} />;
        case "courses": return <AdminCourses user={user} />;
        case "notices": return <AdminNotices user={user} />;
        case "settings": return <AdminSettings user={user} />;
        default: return <AdminDashboard user={user} />;
      }
    }

    return <Placeholder title={`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`} />;
  };

  return (
    <DashboardLayout user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
