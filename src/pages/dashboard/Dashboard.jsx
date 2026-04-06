// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {

//   const [stats, setStats] = useState({
//     total_sales: 0,
//     total_products: 0,
//     low_stock: 0,
//     monthly_sales: []
//   });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const basic = await api.get("/dashboard/get_stats.php");
//       const analytics = await api.get("/dashboard/get_analytics.php");

//       if (basic.data.status && analytics.data.status) {
//         setStats({
//           ...basic.data.data,
//           monthly_sales: analytics.data.data.monthly_sales
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

//       {/* 🔥 TOP CARDS */}
//       <div className="grid grid-cols-3 gap-6 mb-6">

//         <div className="bg-green-100 p-6 rounded-xl shadow">
//           <h2 className="text-gray-700">Total Sales</h2>
//           <p className="text-2xl font-bold text-green-700">
//             ₹{stats.total_sales}
//           </p>
//         </div>

//         <div className="bg-blue-100 p-6 rounded-xl shadow">
//           <h2 className="text-gray-700">Total Products</h2>
//           <p className="text-2xl font-bold text-blue-700">
//             {stats.total_products}
//           </p>
//         </div>

//         <div className="bg-red-100 p-6 rounded-xl shadow">
//           <h2 className="text-gray-700">Low Stock</h2>
//           <p className="text-2xl font-bold text-red-600">
//             {stats.low_stock}
//           </p>
//         </div>

//       </div>

//       {/* 🔥 FULL WIDTH BAR CHART */}
//       <div className="grid grid-cols-1">
//         <div className="bg-white p-6 rounded-xl shadow">

//           <h2 className="mb-4 font-semibold text-lg">
//             Monthly Sales
//           </h2>

//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={stats.monthly_sales}>

//               <XAxis dataKey="month" />
//               <YAxis />

//               <Tooltip
//                 contentStyle={{
//                   borderRadius: "10px",
//                   border: "none"
//                 }}
//               />

//               {/* 🎨 Gradient */}
//               <defs>
//                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
//                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
//                 </linearGradient>
//               </defs>

//               <Bar
//                 dataKey="total"
//                 fill="url(#colorSales)"
//                 radius={[12, 12, 0, 0]}
//                 barSize={50}
//               />

//             </BarChart>
//           </ResponsiveContainer>

//         </div>
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

  const [lowStockProducts, setLowStockProducts] = useState([]); // 👈 new state

  useEffect(() => {
    fetchStats();
    fetchLowStockProducts(); // 👈 call
  }, []);

  // 🔹 existing stats API
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

  // 🔥 NEW: get products + filter low stock
  const fetchLowStockProducts = async () => {
    try {
      const res = await api.get("/product/get.php");

      if (res.data.status) {
        // 👇 filter (stock <= 5 nu assume pannuren)
        const lowStock = res.data.data.filter(p => p.stock <= 5);

        setLowStockProducts(lowStock);
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
            {lowStockProducts.length} {/* 👈 dynamic */}
          </p>
        </div>

      </div>

      {/* 🔥 BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

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

      {/* 🔥 LOW STOCK TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="mb-4 font-semibold text-lg text-red-600">
          Low Stock Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="p-3">#</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium">
                      {item.product_name}
                    </td>

                    <td className="p-3">
                      ₹{item.price}
                    </td>

                    <td className="p-3 text-red-600 font-semibold">
                      {item.stock}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No low stock products
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}