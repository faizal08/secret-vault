import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-800 p-4 bg-gray-900 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-blue-500 tracking-widest">VAULT_CORE</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Agent: <span className="text-white">{user?.username || 'Unknown'}</span></span>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold transition-all"
          >
            TERMINATE SESSION
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Secure Files</h2>
          <p className="text-gray-500">Accessing encrypted storage...</p>
        </header>

        {/* Placeholder for Secrets - We will map your API data here later */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="text-blue-500 mb-4 font-mono text-xs">ID: 001-ALPHA</div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400">Banking Credentials</h3>
            <p className="text-gray-400 text-sm">Last accessed: 2 hours ago</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl border-dashed flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all cursor-pointer">
            <span className="text-4xl mb-2">+</span>
            <span className="font-bold">ADD NEW SECRET</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;