// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await fetch(
//         "http://localhost/smart-ledger-backend/api/auth/login.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ email, password })
//         }
//       );

//       const data = await res.json();

//       if (data.status === "success") {
//         alert("Login success ✅");

//         // Save user (optional)
//         localStorage.setItem("user", JSON.stringify(data.user));

//         navigate("/dashboard");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">SmartLedger</h2>

//         <input
//           className="w-full p-3 border rounded mb-4"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="w-full p-3 border rounded mb-4"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
//         >
//           Login
//         </button>

//         <p
//           className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
//           onClick={() => navigate("/register")}
//         >
//           Create account
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // 👈 common axios

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👇 login API here itself
  const loginUser = (data) => {
    return api.post("/auth/login.php", data);
  };

  const handleLogin = async () => {
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