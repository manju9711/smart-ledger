

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  // 🔹 Validation
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePassword = () => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // 🔹 API
  const loginUser = (data) => {
    return api.post("/auth/login.php", data);
  };

  const handleLogin = async () => {
    // final validation
    validateEmail();
    validatePassword();

    const hasError =
      !email ||
      !password ||
      errors.email ||
      errors.password;

    if (hasError) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser({ email, password });
      const data = res.data;

      if (data.status === "success") {
        alert("Login success ✅");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">SmartLedger</h2>

        {/* Email */}
        <input
          className="w-full p-3 border rounded mb-1"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>
        )}

        {/* Password */}
        <input
          className="w-full p-3 border rounded mb-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
        >
          Login
        </button>

        <p
          className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </div>
    </div>
  );
}