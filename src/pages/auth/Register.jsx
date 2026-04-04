// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/api";

// export default function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//  const handleRegister = async () => {
//     try {
//       const res = await registerUser({
//         username,
//         email,
//         password,
//       });

//       const data = res.data; // 👈 axios la .data

//       if (data.status === "success") {
//         alert("Registered successfully ✅");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           className="w-full p-3 border rounded mb-4"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

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
//           onClick={handleRegister}
//           className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
//         >
//           Register
//         </button>

//         <p
//           className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           Already have account? Login
//         </p>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api"; // 👈 common axios

// export default function Register() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 👇 register API here itself
//   const registerUser = (data) => {
//     return api.post("/auth/register.php", data);
//   };

//   const handleRegister = async () => {
//     try {
//       const res = await registerUser({
//         username,
//         email,
//         password,
//       });

//       const data = res.data;

//       if (data.status === "success") {
//         alert("Registered successfully ✅");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         <input
//           className="w-full p-3 border rounded mb-4"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

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
//           onClick={handleRegister}
//           className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
//         >
//           Register
//         </button>

//         <p
//           className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           Already have account? Login
//         </p>
//       </div>
//     </div>
//   );
// }

//validation
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  // 🔹 Validation functions
  const validateUsername = () => {
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

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
    } else if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // 🔹 API
  const registerUser = (data) => {
    return api.post("/auth/register.php", data);
  };

  const handleRegister = async () => {
    // final validation before submit
    validateUsername();
    validateEmail();
    validatePassword();

    if (errors.username || errors.email || errors.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await registerUser({
        username,
        email,
        password,
      });

      const data = res.data;

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

        {/* Username */}
        <input
          className="w-full p-3 border rounded mb-1"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={validateUsername}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-3">{errors.username}</p>
        )}

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




