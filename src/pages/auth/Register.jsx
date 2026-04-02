import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "http://localhost/smart-ledger-backend/api/auth/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, email, password })
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Registered successfully ✅");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p
          className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}