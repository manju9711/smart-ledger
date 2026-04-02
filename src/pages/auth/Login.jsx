import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">SmartLedger</h2>

        <input className="w-full p-3 border rounded mb-4" placeholder="Username" />
        <input className="w-full p-3 border rounded mb-4" type="password" placeholder="Password" />

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}