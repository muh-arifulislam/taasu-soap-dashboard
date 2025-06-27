import React from "react";
import { NavLink } from "react-router-dom";
import { Home, User, Settings, LogOut } from "lucide-react";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Home", icon: <Home />, path: "/dashboard/home" },
  { label: "Profile", icon: <User />, path: "/dashboard/profile" },
  { label: "Settings", icon: <Settings />, path: "/dashboard/settings" },
  { label: "Logout", icon: <LogOut />, path: "/logout" },
];

const Sidebar: React.FC = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>Dashboard</div>
      <nav>
        <ul style={styles.list}>
          {sidebarItems.map((item) => (
            <li key={item.label} style={styles.listItem}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {}),
                })}
              >
                <span style={styles.icon}>{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#222",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2rem",
    letterSpacing: "2px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "1rem",
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
  activeLink: {
    background: "#444",
  },
  icon: {
    marginRight: "1rem",
    fontSize: "1.2rem",
  },
};

export default Sidebar;
