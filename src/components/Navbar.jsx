import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1 text-sm font-medium ${
      isActive ? "text-primary" : "text-slate-500"
    }`;

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight text-darkText">
            Argo
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>

          {user && (
            <>
              <NavLink to="/bookings" className={navLinkClass}>
                My Bookings
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
            </>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-600 hover:text-primary"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-block text-sm px-4 py-2 rounded-full bg-primary text-white shadow-md"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-darkText">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>

              <Link to="/profile">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm cursor-pointer"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primarySoft flex items-center justify-center text-sm font-semibold text-primary cursor-pointer">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </Link>

              <button
                onClick={logout}
                className="text-xs text-slate-500 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
