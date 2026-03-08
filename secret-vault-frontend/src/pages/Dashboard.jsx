import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import AddSecretModal from './AddSecretModal'; 

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Fetch secrets wrapped in useCallback to stabilize the function
  const fetchSecrets = useCallback(async () => {
    if (!token || !user?.username) return;
    
    setLoading(true);
    try {
      // API call matches your backend /api/secrets/... because axiosConfig handles /api
      const response = await API.get(`/secrets/user/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Defensive check: Ensure response is an array before setting state
      if (Array.isArray(response.data)) {
        setSecrets(response.data);
      } else {
        setSecrets([]);
      }
    } catch (error) {
      console.error("Sync Error: Could not retrieve vault data", error);
      setSecrets([]); // Reset to empty array on error to prevent .map crash
    } finally {
      setLoading(false);
    }
  }, [user?.username, token]);

  // 2. Handle deleting a secret
  const handleDelete = async (id) => {
    if (window.confirm("ARE YOU SURE? THIS ACTION WILL PERMANENTLY DESTROY THIS DATA.")) {
      try {
        await API.delete(`/secrets/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSecrets();
      } catch (error) {
        console.error("Deletion Error:", error);
        alert("ACCESS DENIED: Could not destroy the record.");
      }
    }
  };

  // Trigger fetch on mount or when user changes
  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

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
          <span className="text-gray-400 font-mono text-sm">
            Agent: <span className="text-white uppercase">{user?.username || 'Unknown'}</span>
          </span>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-tighter"
          >
            Terminate Session
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">Secure Files</h2>
          <p className="text-gray-500">Accessing encrypted storage for agent {user?.username}...</p>
        </header>

        {loading ? (
          <div className="text-center py-20 text-blue-500 animate-pulse font-mono">
            DECRYPTING DATA...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Map through secrets safely */}
            {Array.isArray(secrets) && secrets.map((secret) => (
              <div 
                key={secret.id} 
                className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-blue-500 transition-colors relative group overflow-hidden"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(secret.id);
                  }}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-all transform hover:scale-125 z-10"
                  title="Destroy Entry"
                >
                  🗑️
                </button>

                <div className="text-blue-500 mb-4 font-mono text-xs">
                  ID: {String(secret.id).padStart(3, '0')}-SECURE
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400">
                  {secret.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 italic pr-4">
                  {secret.content}
                </p>
              </div>
            ))}

            {/* Add New Secret Card */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-900 border border-gray-800 p-6 rounded-xl border-dashed flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white transition-all cursor-pointer min-h-[160px]"
            >
              <span className="text-4xl mb-2">+</span>
              <span className="font-bold tracking-widest text-xs uppercase">Add New Secret</span>
            </div>
          </div>
        )}

        {!loading && secrets.length === 0 && (
          <div className="mt-10 text-center text-gray-600 border border-gray-800 p-10 rounded-xl">
            NO SECRETS FOUND IN VAULT. START BY ADDING ONE ABOVE.
          </div>
        )}
      </main>

      <AddSecretModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSecretAdded={fetchSecrets} 
      />
    </div>
  );
};

export default Dashboard;