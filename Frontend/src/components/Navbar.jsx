import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
              JobBoard
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
            
            {!user ? (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-6 border-l border-slate-200 pl-6">
                <Link to="/create" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Create Job</Link>
                
                {/* User Profile Badge */}
                <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200 group hover:border-blue-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 leading-none">{user.name}</span>
                    <span className="text-[11px] text-slate-500 truncate max-w-[120px]">{user.email}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 font-medium text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 focus:outline-none p-2 rounded-lg hover:bg-slate-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 px-4 space-y-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Dashboard</Link>
          
          {!user ? (
            <div className="flex flex-col gap-2 px-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-600 font-medium">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-bold">Sign Up</Link>
            </div>
          ) : (
            <div className="space-y-4">
              <Link to="/create" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Create Job</Link>
              
              <div className="flex items-center gap-3 pt-6 px-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-800 text-lg leading-tight">{user.name}</p>
                  <p className="text-sm text-slate-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="px-2 pt-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}