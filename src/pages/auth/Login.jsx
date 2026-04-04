

// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../../services/api";

// // export default function Login() {
// //   const navigate = useNavigate();

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [errors, setErrors] = useState({});

// //   // 🔹 Validation
// //   const validateEmail = () => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// //     if (!email) {
// //       setErrors((prev) => ({ ...prev, email: "Email is required" }));
// //     } else if (!emailRegex.test(email)) {
// //       setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
// //     } else {
// //       setErrors((prev) => ({ ...prev, email: "" }));
// //     }
// //   };

// //   const validatePassword = () => {
// //     if (!password) {
// //       setErrors((prev) => ({ ...prev, password: "Password is required" }));
// //     } else {
// //       setErrors((prev) => ({ ...prev, password: "" }));
// //     }
// //   };

// //   // 🔹 API
// //   const loginUser = (data) => {
// //     return api.post("/auth/login.php", data);
// //   };

// //   const handleLogin = async () => {
// //     // final validation
// //     validateEmail();
// //     validatePassword();

// //     const hasError =
// //       !email ||
// //       !password ||
// //       errors.email ||
// //       errors.password;

// //     if (hasError) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       const res = await loginUser({ email, password });
// //       const data = res.data;

// //       if (data.status === "success") {
// //         alert("Login success ✅");
// //         localStorage.setItem("user", JSON.stringify(data.user));
// //         navigate("/dashboard");
// //       } else {
// //         alert(data.message);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Server error");
// //     }
// //   };

// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-500">
// //       <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
// //         <h2 className="text-2xl font-bold mb-6 text-center">SmartLedger</h2>

// //         {/* Email */}
// //         <input
// //           className="w-full p-3 border rounded mb-1"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           onBlur={validateEmail}
// //         />
// //         {errors.email && (
// //           <p className="text-red-500 text-sm mb-3">{errors.email}</p>
// //         )}

// //         {/* Password */}
// //         <input
// //           className="w-full p-3 border rounded mb-1"
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           onBlur={validatePassword}
// //         />
// //         {errors.password && (
// //           <p className="text-red-500 text-sm mb-3">{errors.password}</p>
// //         )}

// //         <button
// //           onClick={handleLogin}
// //           className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700"
// //         >
// //           Login
// //         </button>

// //         <p
// //           className="text-center mt-4 text-sm text-blue-600 cursor-pointer"
// //           onClick={() => navigate("/register")}
// //         >
// //           Create account
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
// import api from "../../services/api";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     let error = "";
//     if (!email) error = "Email is required";
//     else if (!emailRegex.test(email)) error = "Invalid email format";
//     setErrors((prev) => ({ ...prev, email: error }));
//     return !error;
//   };

//   const validatePassword = () => {
//     let error = !password ? "Password is required" : "";
//     setErrors((prev) => ({ ...prev, password: error }));
//     return !error;
//   };

//   const handleLogin = async () => {
//     const isEmailValid = validateEmail();
//     const isPasswordValid = validatePassword();

//     if (!isEmailValid || !isPasswordValid) return;

//     setIsLoading(true);
//     try {
//       const res = await api.post("/auth/login.php", { email, password });
//       if (res.data.status === "success") {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         navigate("/dashboard");
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       alert("Server error. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f0f4f9] relative overflow-hidden">
//       {/* Dynamic Background Elements */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px]" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]" />

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 w-full max-w-md px-6"
//       >
//         <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
          
//           {/* Logo Section */}
//           <div className="flex flex-col items-center mb-10">
//             <motion.div 
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//               className="w-16 h-16 bg-gradient-to-tr from-[#1f8cff] to-[#4338ca] rounded-2xl flex items-center justify-center shadow-lg mb-4"
//             >
//               <ShieldCheck size={32} color="white" />
//             </motion.div>
//             <h2 className="text-3xl font-black text-gray-800 tracking-tight">Smart<span className="text-blue-600">Ledger</span></h2>
//             <p className="text-gray-500 text-sm mt-1">Welcome back! Please login.</p>
//           </div>

//           {/* Form */}
//           <div className="space-y-5">
//             {/* Email Input */}
//             <div className="relative">
//               <label className="text-xs font-bold text-gray-400 uppercase ml-4 mb-1 block">Email Address</label>
//               <div className="relative group">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//                 <input
//                   type="email"
//                   placeholder="name@company.com"
//                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
//                     errors.email ? "border-red-300 focus:border-red-500" : "border-transparent focus:border-blue-500 focus:bg-white"
//                   }`}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onBlur={validateEmail}
//                 />
//               </div>
//               {errors.email && <p className="text-red-500 text-xs mt-1 ml-4 italic">{errors.email}</p>}
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <div className="flex justify-between ml-4 mb-1">
//                 <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
//                 <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Forgot?</span>
//               </div>
//               <div className="relative group">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
//                     errors.password ? "border-red-300 focus:border-red-500" : "border-transparent focus:border-blue-500 focus:bg-white"
//                   }`}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onBlur={validatePassword}
//                 />
//               </div>
//               {errors.password && <p className="text-red-500 text-xs mt-1 ml-4 italic">{errors.password}</p>}
//             </div>

//             {/* Login Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleLogin}
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-[#1f8cff] to-[#4338ca] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group transition-all"
//             >
//               {isLoading ? (
//                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   Sign In
//                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </motion.button>
//           </div>

//           {/* Footer */}
//           <p className="text-center mt-8 text-gray-500 text-sm">
//             Don't have an account? 
//             <span 
//               className="text-blue-600 font-bold ml-1 cursor-pointer hover:underline"
//               onClick={() => navigate("/register")}
//             >
//               Create Account
//             </span>
//           </p>
//         </div>
        
//         {/* Subtle Bottom Credit */}
//         <p className="text-center mt-6 text-gray-400 text-xs font-medium tracking-widest uppercase">
//           Powered by SmartLedger v2.0
//         </p>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login.php", { email, password });
      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      } else { alert(res.data.message); }
    } catch (err) { alert("Server error"); } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f4f9] p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white my-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-[#1f8cff] to-[#4338ca] rounded-xl flex items-center justify-center shadow-md mb-3">
            <ShieldCheck size={24} color="white" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Smart<span className="text-blue-600">Ledger</span></h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1 block">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={18} />
              <input
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 rounded-xl outline-none text-sm transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between ml-2 mb-1 text-[10px] font-bold text-gray-400 uppercase">
              <span>Password</span>
              <span className="text-blue-600 cursor-pointer">Forgot?</span>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-blue-500 rounded-xl outline-none text-sm transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-[#1f8cff] to-[#4338ca] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign In"}
          </motion.button>
        </div>

        <p className="text-center mt-6 text-xs text-gray-500">
          New here? <span onClick={() => navigate("/register")} className="text-blue-600 font-bold cursor-pointer hover:underline ml-1">Create Account</span>
        </p>
      </motion.div>
    </div>
  );
}