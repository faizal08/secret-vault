import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api/axiosConfig';

const AddSecretModal = ({ isOpen, onClose, onSecretAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user, token } = useSelector((state) => state.auth);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sending to your new SecretController endpoint
            await API.post('/secrets/add', 
                { 
                    title, 
                    content, 
                    username: user.username 
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            onSecretAdded(); // Refresh the list in Dashboard
            onClose(); // Close the modal
            setTitle('');
            setContent('');
        } catch (error) {
            console.error("Error saving secret:", error);
            alert("Vault Error: Could not secure data.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-2xl">
                <h3 className="text-xl font-bold text-blue-500 mb-4 tracking-widest">NEW ENCRYPTED ENTRY</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text"
                        className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Entry Title"
                        required
                    />
                    <textarea 
                        className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white h-32 outline-none focus:border-blue-500"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Secret Content..."
                        required
                    />
                    <div className="flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-800 p-3 rounded-lg font-bold">CANCEL</button>
                        <button type="submit" className="flex-1 bg-blue-600 p-3 rounded-lg font-bold">SECURE</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSecretModal;