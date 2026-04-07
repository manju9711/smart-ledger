// import { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   Package,
//   ReceiptText,
//   BarChart3,
//   Building2,
//   Settings,
//   ShieldCheck,
//   LogOut
// } from "lucide-react";

// export default function MainLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [hoveredPath, setHoveredPath] = useState(null);

//   // 🔥 GET LOGGED-IN USER
//   const user = JSON.parse(localStorage.getItem("user"));

//   // 🔥 LOGOUT FUNCTION
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
//     { name: "Products", path: "/products", icon: <Package size={20} /> },
//     { name: "Billing", path: "/billing", icon: <ReceiptText size={20} /> },
//     { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
//     { name: "Company", path: "/company", icon: <Building2 size={20} /> },
//     { name: "Cashiers", path: "/Register", icon: <Building2 size={20} /> },
//   ];

//   return (
//     <div className="flex h-screen bg-[#f0f4f9] overflow-hidden">

//       {/* SIDEBAR */}
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         className="w-72 m-4 rounded-3xl bg-gradient-to-br from-[#1f8cff] to-[#4338ca] p-6 text-white shadow-2xl shadow-indigo-200 flex flex-col relative overflow-hidden"
//       >
//         {/* BG Effects */}
//         <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
//         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-2xl" />

//         {/* LOGO */}
//         <div className="flex items-center gap-3 mb-12 px-2">
//           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
//             <ShieldCheck size={22} color="#1f8cff" />
//           </div>
//           <h2 className="text-2xl font-black tracking-tight">
//             Smart<span className="opacity-80">Ledger</span>
//           </h2>
//         </div>

//         {/* MENU */}
//         <nav className="flex-1 space-y-2 relative">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <motion.div
//                 key={item.path}
//                 onMouseEnter={() => setHoveredPath(item.path)}
//                 onMouseLeave={() => setHoveredPath(null)}
//                 onClick={() => navigate(item.path)}
//                 whileHover={{ scale: 1.02, x: 5 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-colors z-10 ${
//                   isActive
//                     ? "text-blue-700"
//                     : "text-white/80 hover:text-blue-600"
//                 }`}
//               >
//                 {/* ACTIVE BG */}
//                 <AnimatePresence>
//                   {(isActive || hoveredPath === item.path) && (
//                     <motion.div
//                       layoutId="active-pill"
//                       className="absolute inset-0 rounded-2xl -z-10 shadow-sm bg-white"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     />
//                   )}
//                 </AnimatePresence>

//                 <span
//                   className={`${
//                     isActive || hoveredPath === item.path
//                       ? "text-blue-600"
//                       : "text-inherit"
//                   }`}
//                 >
//                   {item.icon}
//                 </span>

//                 <span className="font-semibold">{item.name}</span>

//                 {/* ACTIVE INDICATOR */}
//                 {isActive && (
//                   <motion.div
//                     layoutId="3d-bar"
//                     className="absolute right-0 w-1.5 h-6 bg-blue-400 rounded-l-full"
//                   />
//                 )}
//               </motion.div>
//             );
//           })}
//         </nav>

//         {/* 🔥 USER PROFILE + LOGOUT */}
//         <div className="mt-auto pt-6 border-t border-white/10">

//           <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">

//             {/* AVATAR */}
//             <div className="w-10 h-10 rounded-full bg-indigo-300 flex items-center justify-center font-bold text-indigo-900">
//               {user?.username?.charAt(0)?.toUpperCase() || "U"}
//             </div>

//             {/* USER INFO */}
//             <div className="flex-1 overflow-hidden">
//               <p className="text-sm font-bold truncate">
//                 {user?.username || "User"}
//               </p>
//               <p className="text-xs text-white/60 truncate">
//                 {user?.email || "user@mail.com"}
//               </p>
//             </div>

//             {/* LOGOUT */}
//             <button
//               onClick={handleLogout}
//               className="p-2 bg-red-500 hover:bg-red-600 rounded-lg"
//             >
//               <LogOut size={16} />
//             </button>

//           </div>

//         </div>

//       </motion.div>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 h-screen overflow-auto bg-gray-100 p-2">
//         <div className="min-h-full">
//           <Outlet />
//         </div>
//       </main>

//     </div>
//   );
// }

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ReceiptText,
  BarChart3,
  Building2,
  Settings,
  ShieldCheck,
  LogOut
} from "lucide-react";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  // 🔥 GET USER
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 🔥 ROLE BASED MENU
  const menuItems = [
    // COMMON
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },

    // ADMIN ONLY
    ...(role === "admin"
      ? [
          { name: "Products", path: "/products", icon: <Package size={20} /> },
          { name: "Billing", path: "/billing", icon: <ReceiptText size={20} /> },
          { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
          { name: "Cashiers", path: "/Register", icon: <Building2 size={20} /> },
          { name: "Profile", path: "/profile", icon: <Settings size={20} /> }
        ]
      : []),

    // SUPERADMIN ONLY
    ...(role === "superadmin"
      ? [
          { name: "Company", path: "/company", icon: <Building2 size={20} /> }
        ]
      : []),

    // CASHIER ONLY
    ...(role === "cashier"
      ? [
          { name: "Billing", path: "/billing", icon: <ReceiptText size={20} /> },
          { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> }
        ]
      : [])
  ];

  return (
    <div className="flex h-screen bg-[#f0f4f9] overflow-hidden">

      {/* SIDEBAR */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 m-4 rounded-3xl bg-gradient-to-br from-[#1f8cff] to-[#4338ca] p-6 text-white shadow-2xl flex flex-col relative"
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <ShieldCheck size={22} color="#1f8cff" />
          </div>
          <h2 className="text-xl font-bold">
            Smart<span className="opacity-80">Ledger</span>
          </h2>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
                  isActive ? "bg-white text-blue-600" : "text-white/80"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </motion.div>
            );
          })}
        </nav>

        {/* 🔥 USER PROFILE */}
        <div className="mt-auto pt-5 border-t border-white/20">

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* USER INFO */}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs truncate text-white/70">
                {user?.email}
              </p>
              <p className="text-[10px] text-white/40">
                {user?.role}
              </p>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-lg"
            >
              <LogOut size={16} />
            </button>

          </div>

        </div>

      </motion.div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
}