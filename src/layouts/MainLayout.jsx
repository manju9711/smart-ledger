import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">SmartLedger</h2>

        <ul className="space-y-4">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Dashboard</li>
          <li onClick={() => navigate("/products")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Products</li>
          <li onClick={() => navigate("/billing")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Billing</li>
          <li onClick={() => navigate("/reports")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Reports</li>
          <li onClick={() => navigate("/settings")} className="cursor-pointer hover:bg-white/20 p-2 rounded">Settings</li>
        <li onClick={() => navigate("/company")} className="cursor-pointer hover:bg-white/20 p-2 rounded">
  Company
</li>

{/* <li onClick={() => navigate("/tax")} className="cursor-pointer hover:bg-white/20 p-2 rounded">
  Tax
</li> */}
        
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}