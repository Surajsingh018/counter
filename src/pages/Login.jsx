import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUsers, createDefaultMantra } from "../utils/storage";

export default function Login({ setCurrentUser }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!mobile || mobile.length !== 10) return alert("Enter valid mobile");
    let users = getUsers();

    if (!users[mobile]) {
      users[mobile] = {
        name,
        lastSelected: "radha",
        mantraData: createDefaultMantra(),
      };
      saveUsers(users);
    }

    setCurrentUser(mobile);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-80 text-center">
        <h2 className="text-2xl mb-4">🕉 Bhakti Login</h2>

        <input
          placeholder="Name"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Mobile Number"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-black py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
