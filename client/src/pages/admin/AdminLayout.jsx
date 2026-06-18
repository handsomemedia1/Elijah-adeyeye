import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  HiOutlineHome, HiOutlineCog,
  HiOutlineMail, HiOutlineLogout, HiOutlineAcademicCap,
  HiOutlinePencilAlt, HiOutlineGlobeAlt
} from 'react-icons/hi';
import './Admin.css';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="admin">
      <aside className="admin__sidebar glass">
        <div className="admin__sidebar-header">
          <span className="gradient-text" style={{ fontSize: '1.75rem', fontWeight: 900 }}>EA</span>
          <span className="admin__sidebar-label">Admin</span>
        </div>

        <nav className="admin__nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlineHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/writing" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlinePencilAlt /> Writing
          </NavLink>
          <NavLink to="/admin/elitech" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlineGlobeAlt /> Elitech Hub
          </NavLink>
          <NavLink to="/admin/publications" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlineAcademicCap /> Publications
          </NavLink>
          <NavLink to="/admin/messages" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlineMail /> Messages
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`}>
            <HiOutlineCog /> Settings
          </NavLink>
        </nav>

        <div className="admin__sidebar-footer">
          <p className="admin__user-email">{user?.email}</p>
          <button onClick={handleSignOut} className="admin__signout-btn">
            <HiOutlineLogout /> Sign Out
          </button>
        </div>
      </aside>

      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  );
}
