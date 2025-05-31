// components/AdminLogin.jsx
import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "govadmin" && password === "securepass123") {
      onLogin();
    } else {
      alert("Incorrect credentials");
    }
  };

  return (
    <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-gray-800">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
