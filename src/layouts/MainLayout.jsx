// import { Outlet, useNavigate } from "react-router-dom";

// export default function MainLayout() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white p-5">
//         <h2 className="text-2xl font-bold mb-8">SmartLedger</h2>

//         <ul className="space-y-4">
//           <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Dashboard</li>
//           <li onClick={() => navigate("/products")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Products</li>
//           <li onClick={() => navigate("/billing")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Billing</li>
//           <li onClick={() => navigate("/reports")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Reports</li>
//           {/* <li onClick={() => navigate("/settings")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Settings</li> */}
//         <li onClick={() => navigate("/company")} className="cursor-pointer hover:bg-white/20 p-2 rounded">
//   Company
// </li>

// {/* <li onClick={() => navigate("/tax")} className="cursor-pointer hover:bg-white/20 p-2 rounded">
//   Tax
// </li> */}
        
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <Outlet />
//       </div>
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
  ShieldCheck
} from "lucide-react";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/products", icon: <Package size={20} /> },
    { name: "Billing", path: "/billing", icon: <ReceiptText size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { name: "Company", path: "/company", icon: <Building2 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#f0f4f9] overflow-hidden">
      {/* Sidebar Container */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 m-4 rounded-3xl bg-gradient-to-br from-[#1f8cff] to-[#4338ca] p-6 text-white shadow-2xl shadow-indigo-200 flex flex-col relative overflow-hidden"
      >
        {/* Decorative 3D Circles in Background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-2xl" />

        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
            <div className="w-6 h-6 bg-[#1f8cff] rounded-md" >                      <ShieldCheck size={24} color="white" />
</div>
          </div>

          <h2 className="text-2xl font-black tracking-tight">Smart<span className="opacity-80">Ledger</span></h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 relative">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                onMouseEnter={() => setHoveredPath(item.path)}
                onMouseLeave={() => setHoveredPath(null)}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-colors z-10 ${
  isActive 
    ? "text-blue-700" 
    : "text-white/80 hover:text-blue-600"
}`}
              >
                {/* Active/Hover Background Pill */}
              <AnimatePresence>
  {(isActive || hoveredPath === item.path) && (
    <motion.div
      layoutId="active-pill"
      className="absolute inset-0 rounded-2xl -z-10 shadow-sm bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  )}
</AnimatePresence>

<span className={`${isActive || hoveredPath === item.path ? "text-blue-600" : "text-inherit"}`}>                  {item.icon}
                </span>
                <span className="font-semibold">{item.name}</span>

                {/* 3D Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="3d-bar"
                    className="absolute right-0 w-1.5 h-6 bg-blue-400 rounded-l-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  />
                )}
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Profile/Settings Card */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-white/20 flex items-center justify-center font-bold text-indigo-900">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-xs text-white/50 truncate">admin@smartledger.com</p>
            </div>
            <Settings size={18} className="text-white/40 hover:rotate-90 transition-transform duration-500" />
          </div>
        </div>
      </motion.div>

      <main className="flex-1 h-screen overflow-auto bg-gray-100 p-2">
        {/*
           Optional inner-inner wrapper if you still want a card.
           If you want plain background for dashboard content, remove the div and 
           put <Outlet /> here.
        */}
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}