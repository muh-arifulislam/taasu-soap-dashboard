import React from "react";

type NavbarProps = {
  title?: string;
  onLogout?: () => void;
  userName?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  title = "Dashboard",
  onLogout,
  userName,
}) => {
  return (
    <nav
      style={{
        height: "60px",
        background: "#1a202c",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {userName && (
          <span style={{ fontSize: "1rem", opacity: 0.85 }}>
            Hello, {userName}
          </span>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              background: "#e53e3e",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
