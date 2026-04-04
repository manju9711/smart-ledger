// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, PieChart, Pie, Cell
// } from "recharts";

// export default function Dashboard() {

//   const [stats, setStats] = useState({
//     total_sales: 0,
//     total_products: 0,
//     low_stock: 0,
//     monthly_sales: [],
//     top_product: "",
//     top_qty: 0,
//     out_of_stock: 0
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     const basic = await api.get("/dashboard/get_stats.php");
//     const analytics = await api.get("/dashboard/get_analytics.php");

//     if (basic.data.status && analytics.data.status) {
//       setStats({
//         ...basic.data.data,
//         ...analytics.data.data
//       });
//     }
//   };

//   // 🔥 PIE DATA
//   const pieData = [
//     {
//       name: stats.top_product || "Top Product",
//       value: stats.top_qty || 0
//     },
//     {
//       name: "Out of Stock",
//       value: stats.out_of_stock || 0
//     },
//     {
//       name: "Months",
//       value: stats.monthly_sales.length || 0
//     }
//   ];

//   // const COLORS = ["#f59e0b", "#ef4444", "#3b82f6"];
//   const COLORS = ["#f59e0b", "#ef4444", "#3b82f6"];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* 🔥 TOP CARDS */}
//       <div className="grid grid-cols-3 gap-6 mb-6">

//         <div className="bg-green-200 p-6 rounded-xl shadow">
//           <h2>Total Sales</h2>
//           <p className="text-2xl font-bold text-green-700">
//             ₹{stats.total_sales}
//           </p>
//         </div>

//         <div className="bg-blue-200 p-6 rounded-xl shadow">
//           <h2>Total Products</h2>
//           <p className="text-2xl font-bold text-blue-700">
//             {stats.total_products}
//           </p>
//         </div>

//         <div className="bg-red-200 p-6 rounded-xl shadow">
//           <h2>Low Stock</h2>
//           <p className="text-2xl font-bold text-red-600">
//             {stats.low_stock}
//           </p>
//         </div>

//       </div>

//       {/* 🔥 CHART SECTION */}
//       <div className="grid grid-cols-2 gap-6">

//         {/* 📊 BAR CHART */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="mb-4 font-semibold">Monthly Sales</h2>

//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={stats.monthly_sales}>
              
//               {/* GRID REMOVE → clean look */}
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />

//               {/* 🎨 GRADIENT */}
//               <defs>
//                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
//                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
//                 </linearGradient>
//               </defs>

//               <Bar
//                 dataKey="total"
//                 fill="url(#colorSales)"
//                 radius={[10, 10, 0, 0]}
//                 barSize={40}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 🥧 PIE CHART */}
//        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">

//   <h2 className="mb-4 font-semibold text-lg">Analytics</h2>


//   <PieChart width={280} height={260}>
//     <Pie
//       data={pieData}
//       cx="50%"
//       cy="50%"
//       innerRadius={50}  
//       outerRadius={90}
//       paddingAngle={3}
//       dataKey="value"
//     >
//       {pieData.map((_, index) => (
//         <Cell key={index} fill={COLORS[index]} />
//       ))}
//     </Pie>
//   </PieChart>

 
//   <div className="mt-4 w-full space-y-2 text-sm">

//     <div className="flex justify-between bg-yellow-50 p-2 rounded">
//       <span>🔥 Top Product</span>
//       <span className="font-semibold">
//         {stats.top_product} ({stats.top_qty})
//       </span>
//     </div>

//     <div className="flex justify-between bg-red-50 p-2 rounded">
//       <span>📉 Out of Stock</span>
//       <span className="font-semibold text-red-600">
//         {stats.out_of_stock}
//       </span>
//     </div>

//     <div className="flex justify-between bg-blue-50 p-2 rounded">
//       <span>📊 Months Tracked</span>
//       <span className="font-semibold text-blue-600">
//         {stats.monthly_sales.length}
//       </span>
//     </div>

//   </div>

// </div>

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total_sales: 0,
    total_products: 0,
    low_stock: 0,
    monthly_sales: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const basic = await api.get("/dashboard/get_stats.php");
      const analytics = await api.get("/dashboard/get_analytics.php");

      if (basic.data.status && analytics.data.status) {
        setStats({
          ...basic.data.data,
          monthly_sales: analytics.data.data.monthly_sales
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-gray-700">Total Sales</h2>
          <p className="text-2xl font-bold text-green-700">
            ₹{stats.total_sales}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-gray-700">Total Products</h2>
          <p className="text-2xl font-bold text-blue-700">
            {stats.total_products}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-xl shadow">
          <h2 className="text-gray-700">Low Stock</h2>
          <p className="text-2xl font-bold text-red-600">
            {stats.low_stock}
          </p>
        </div>

      </div>

      {/* 🔥 FULL WIDTH BAR CHART */}
      <div className="grid grid-cols-1">
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="mb-4 font-semibold text-lg">
            Monthly Sales
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stats.monthly_sales}>

              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none"
                }}
              />

              {/* 🎨 Gradient */}
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                </linearGradient>
              </defs>

              <Bar
                dataKey="total"
                fill="url(#colorSales)"
                radius={[12, 12, 0, 0]}
                barSize={50}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}