// // import { useEffect, useState } from "react";
// // import api from "../../services/api";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer
// // } from "recharts";

// // export default function Dashboard() {

// //   const [stats, setStats] = useState({
// //     total_sales: 0,
// //     total_products: 0,
// //     low_stock: 0,
// //     monthly_sales: []
// //   });

// //   useEffect(() => {
// //     fetchStats();
// //   }, []);

// //   const fetchStats = async () => {
// //     try {
// //       const basic = await api.get("/dashboard/get_stats.php");
// //       const analytics = await api.get("/dashboard/get_analytics.php");

// //       if (basic.data.status && analytics.data.status) {
// //         setStats({
// //           ...basic.data.data,
// //           monthly_sales: analytics.data.data.monthly_sales
// //         });
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

// //       {/* 🔥 TOP CARDS */}
// //       <div className="grid grid-cols-3 gap-6 mb-6">

// //         <div className="bg-green-100 p-6 rounded-xl shadow">
// //           <h2 className="text-gray-700">Total Sales</h2>
// //           <p className="text-2xl font-bold text-green-700">
// //             ₹{stats.total_sales}
// //           </p>
// //         </div>

// //         <div className="bg-blue-100 p-6 rounded-xl shadow">
// //           <h2 className="text-gray-700">Total Products</h2>
// //           <p className="text-2xl font-bold text-blue-700">
// //             {stats.total_products}
// //           </p>
// //         </div>

// //         <div className="bg-red-100 p-6 rounded-xl shadow">
// //           <h2 className="text-gray-700">Low Stock</h2>
// //           <p className="text-2xl font-bold text-red-600">
// //             {stats.low_stock}
// //           </p>
// //         </div>

// //       </div>

// //       {/* 🔥 FULL WIDTH BAR CHART */}
// //       <div className="grid grid-cols-1">
// //         <div className="bg-white p-6 rounded-xl shadow">

// //           <h2 className="mb-4 font-semibold text-lg">
// //             Monthly Sales
// //           </h2>

// //           <ResponsiveContainer width="100%" height={350}>
// //             <BarChart data={stats.monthly_sales}>

// //               <XAxis dataKey="month" />
// //               <YAxis />

// //               <Tooltip
// //                 contentStyle={{
// //                   borderRadius: "10px",
// //                   border: "none"
// //                 }}
// //               />

// //               {/* 🎨 Gradient */}
// //               <defs>
// //                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
// //                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
// //                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
// //                 </linearGradient>
// //               </defs>

// //               <Bar
// //                 dataKey="total"
// //                 fill="url(#colorSales)"
// //                 radius={[12, 12, 0, 0]}
// //                 barSize={50}
// //               />

// //             </BarChart>
// //           </ResponsiveContainer>

// //         </div>
// //       </div>

// //     </div>
// //   );
// // }


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

//   const [lowStockProducts, setLowStockProducts] = useState([]); // 👈 new state

//   useEffect(() => {
//     fetchStats();
//     fetchLowStockProducts(); // 👈 call
//   }, []);

//   // 🔹 existing stats API
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

//   // 🔥 NEW: get products + filter low stock
//   const fetchLowStockProducts = async () => {
//     try {
//       const res = await api.get("/product/get.php");

//       if (res.data.status) {
//         // 👇 filter (stock <= 5 nu assume pannuren)
//         const lowStock = res.data.data.filter(p => p.stock <= 5);

//         setLowStockProducts(lowStock);
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
//             {lowStockProducts.length} {/* 👈 dynamic */}
//           </p>
//         </div>

//       </div>

//       {/* 🔥 BAR CHART */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">

//         <h2 className="mb-4 font-semibold text-lg">
//           Monthly Sales
//         </h2>

//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart data={stats.monthly_sales}>

//             <XAxis dataKey="month" />
//             <YAxis />

//             <Tooltip
//               contentStyle={{
//                 borderRadius: "10px",
//                 border: "none"
//               }}
//             />

//             <defs>
//               <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
//                 <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
//               </linearGradient>
//             </defs>

//             <Bar
//               dataKey="total"
//               fill="url(#colorSales)"
//               radius={[12, 12, 0, 0]}
//               barSize={50}
//             />

//           </BarChart>
//         </ResponsiveContainer>

//       </div>

//       {/* 🔥 LOW STOCK TABLE */}
//       <div className="bg-white p-6 rounded-xl shadow">

//         <h2 className="mb-4 font-semibold text-lg text-red-600">
//           Low Stock Products
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">

//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm">
//                 <th className="p-3">#</th>
//                 <th className="p-3">Product Name</th>
//                 <th className="p-3">Price</th>
//                 <th className="p-3">Stock</th>
//               </tr>
//             </thead>

//             <tbody>
//               {lowStockProducts.length > 0 ? (
//                 lowStockProducts.map((item, index) => (
//                   <tr key={item.id} className="border-b hover:bg-gray-50">

//                     <td className="p-3">{index + 1}</td>

//                     <td className="p-3 font-medium">
//                       {item.product_name}
//                     </td>

//                     <td className="p-3">
//                       ₹{item.price}
//                     </td>

//                     <td className="p-3 text-red-600 font-semibold">
//                       {item.stock}
//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-4 text-gray-500">
//                     No low stock products
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import {
  TrendingUp, Package, AlertTriangle,
  ArrowUpRight, ShoppingBag, BarChart2
} from "lucide-react";

// ── inject styles once ────────────────────────────────────────────────────────
function useStyles() {
  useEffect(() => {
    const id = "db-v4-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      .db * { box-sizing: border-box; }
      @keyframes db-up   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
      @keyframes db-spin { to{transform:rotate(360deg)} }
      @keyframes db-num  { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
      @keyframes db-bar  { from{transform:scaleY(0)} to{transform:scaleY(1)} }
      .db-card { transition: box-shadow .22s, transform .22s; }
      .db-card:hover { box-shadow: 0 8px 32px rgba(99,102,241,.13) !important; transform: translateY(-2px); }
      .db-row:hover td { background: #f8f7ff !important; }
      .db-row td { transition: background .15s; }
      .db-badge-danger { animation: db-num .5s ease both; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
}

// ── custom tooltip for chart ──────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1e1b4b", borderRadius: 12, padding: "10px 16px",
      boxShadow: "0 8px 24px rgba(0,0,0,.2)", border: "none",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#a5b4fc" }}>₹{Number(payload[0].value).toLocaleString()}</div>
    </div>
  );
}

// ── stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent, delay, prefix = "", suffix = "" }) {
  const accents = {
    green:  { bg: "#f0fdf4", icon: "#bbf7d0", iconFg: "#15803d", val: "#15803d", border: "#dcfce7", badge: "#22c55e" },
    blue:   { bg: "#eff6ff", icon: "#bfdbfe", iconFg: "#1d4ed8", val: "#1d4ed8", border: "#dbeafe", badge: "#3b82f6" },
    red:    { bg: "#fff1f2", icon: "#fecdd3", iconFg: "#be123c", val: "#be123c", border: "#ffe4e6", badge: "#f43f5e" },
    indigo: { bg: "#eef2ff", icon: "#c7d2fe", iconFg: "#4338ca", val: "#4338ca", border: "#e0e7ff", badge: "#6366f1" },
  };
  const c = accents[accent] || accents.indigo;

  return (
    <div className="db-card" style={{
      background: c.bg, border: `1.5px solid ${c.border}`,
      borderRadius: 18, padding: "22px 24px",
      animation: `db-up .45s ${delay}s ease both`,
      position: "relative", overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,.04)",
    }}>
      {/* top-right circle decoration */}
      <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: c.icon, opacity: .45, pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: c.icon, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} color={c.iconFg} strokeWidth={2.2} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: c.icon, borderRadius: 20, padding: "3px 10px" }}>
          <ArrowUpRight size={12} color={c.iconFg} />
          <span style={{ fontSize: 11, fontWeight: 700, color: c.iconFg }}>Live</span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 30, fontWeight: 900, color: c.val, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.1, animation: "db-num .5s ease both" }}>
          {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
        </div>
      </div>
    </div>
  );
}

// ── stock badge ───────────────────────────────────────────────────────────────
function StockBadge({ stock }) {
  const color = stock === 0 ? "#be123c" : stock <= 2 ? "#c2410c" : "#b45309";
  const bg    = stock === 0 ? "#fff1f2" : stock <= 2 ? "#fff7ed" : "#fefce8";
  const border= stock === 0 ? "#fecdd3" : stock <= 2 ? "#fed7aa" : "#fef08a";
  return (
    <span style={{ background: bg, color, border: `1px solid ${border}`, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
      {stock === 0 ? "Out of stock" : `${stock} left`}
    </span>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  useStyles();
  const font = "'Plus Jakarta Sans', sans-serif";

  const [stats, setStats] = useState({ total_sales: 0, total_products: 0, low_stock: 0, monthly_sales: [] });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBar, setActiveBar] = useState(null);

  useEffect(() => { fetchStats(); fetchLowStockProducts(); }, []);

  const getCompanyId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.company_id;
};

 const fetchStats = async () => {
  try {
    const company_id = getCompanyId();

    const [basic, analytics] = await Promise.all([
      api.get(`/dashboard/get_stats.php?company_id=${company_id}`),
      api.get(`/dashboard/get_analytics.php?company_id=${company_id}`)
    ]);

    if (basic.data.status && analytics.data.status) {
      setStats({
        ...basic.data.data,
        monthly_sales: analytics.data.data.monthly_sales
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};
  
const fetchLowStockProducts = async () => {
  try {
    const company_id = getCompanyId();

    const res = await api.get(`/product/get.php?company_id=${company_id}`);

    if (res.data.status) {
      setLowStockProducts(
        res.data.data.filter(p => p.stock <= 5)
      );
    }
  } catch (e) {
    console.error(e);
  }
};

  // bar colors: highlight hovered bar
  const BAR_DEFAULT  = "#6366f1";
  const BAR_HOVER    = "#4f46e5";
  const BAR_INACTIVE = "#c7d2fe";

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300, gap: 10, color: "#6366f1", fontFamily: font }}>
      <span style={{ width: 20, height: 20, border: "2.5px solid #c7d2fe", borderTopColor: "#6366f1", borderRadius: "50%", display: "inline-block", animation: "db-spin .8s linear infinite" }} />
      Loading dashboard…
    </div>
  );

  return (
    <div className="db" style={{ fontFamily: font, }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24, animation: "db-up .35s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1e1b4b" }}>Dashboard</h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>
              Welcome back — here's what's happening today
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#eef2ff", border: "1.5px solid #e0e7ff", borderRadius: 12, padding: "8px 16px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,.2)" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#4338ca" }}>Live data</span>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard label="Total Sales"    value={stats.total_sales}    icon={TrendingUp}    accent="green" delay={0}    prefix="₹" />
        <StatCard label="Total Products" value={stats.total_products} icon={Package}       accent="blue"  delay={0.07} />
        <StatCard label="Low Stock"      value={lowStockProducts.length} icon={AlertTriangle} accent="red"   delay={0.14} suffix=" items" />
      </div>

      {/* ── Chart + Summary row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, marginBottom: 20 }}>

        {/* Bar Chart */}
        <div style={{
          background: "#fff", border: "1.5px solid #e0e7ff", borderRadius: 20,
          padding: "22px 24px", boxShadow: "0 2px 16px rgba(99,102,241,.07)",
          animation: "db-up .45s .18s ease both",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1e1b4b" }}>Monthly Sales</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Revenue overview this year</div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 size={18} color="#6366f1" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.monthly_sales} barSize={32}
              onMouseMove={state => { if (state.isTooltipActive) setActiveBar(state.activeTooltipIndex); else setActiveBar(null); }}
              onMouseLeave={() => setActiveBar(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: font, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: font }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v >= 1000 ? (v/1000).toFixed(0)+"k" : v}`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,.06)", radius: 8 }} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <Bar dataKey="total" radius={[10, 10, 0, 0]} fill="url(#barGrad)">
                {stats.monthly_sales.map((_, i) => (
                  <Cell key={i} fill={activeBar === null ? "url(#barGrad)" : activeBar === i ? BAR_HOVER : BAR_INACTIVE} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick summary panel */}
        <div style={{
          background: "linear-gradient(160deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%)",
          borderRadius: 20, padding: "24px 20px",
          display: "flex", flexDirection: "column", gap: 14,
          animation: "db-up .45s .22s ease both",
          boxShadow: "0 8px 32px rgba(99,102,241,.25)",
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>Quick Summary</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Business at a Glance</div>
          </div>

          {[
            { icon: TrendingUp,    label: "Total Revenue",  val: `₹${Number(stats.total_sales).toLocaleString()}`, color: "#a5b4fc" },
            { icon: Package,       label: "Products Listed",val: stats.total_products,                             color: "#7dd3fc" },
            { icon: ShoppingBag,   label: "Low Stock Alerts",val: `${lowStockProducts.length} items`,             color: "#fca5a5" },
          ].map(({ icon: Icon, label, val, color }, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.1)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,.14)", backdropFilter: "blur(6px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,.5)", letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>{val}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Low Stock Table ── */}
      <div style={{
        background: "#fff", border: "1.5px solid #ffe4e6", borderRadius: 20,
        overflow: "hidden", boxShadow: "0 2px 16px rgba(244,63,94,.07)",
        animation: "db-up .45s .28s ease both",
      }}>
        {/* Table header */}
        <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #fff1f2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "#fff1f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={16} color="#be123c" />
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#1e1b4b" }}>Low Stock Products</span>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3, marginLeft: 40 }}>Items with 5 or fewer units remaining</div>
          </div>
          {lowStockProducts.length > 0 && (
            <span style={{ background: "#fff1f2", color: "#be123c", border: "1.5px solid #fecdd3", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
              {lowStockProducts.length} alert{lowStockProducts.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["#", "Product Name", "Price", "Stock Status"].map((h, i) => (
                  <th key={i} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "#9ca3af", borderBottom: "1px solid #f3f4f6" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((item, i) => (
                  <tr key={item.id} className="db-row" style={{ borderBottom: "1px solid #fafafa" }}>
                    <td style={{ padding: "13px 20px", fontSize: 13, color: "#9ca3af", fontWeight: 600, background: "#fff" }}>
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td style={{ padding: "13px 20px", background: "#fff" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Package size={14} color="#7c3aed" />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b" }}>{item.product_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 600, color: "#374151", background: "#fff" }}>
                      ₹{Number(item.price).toLocaleString()}
                    </td>
                    <td style={{ padding: "13px 20px", background: "#fff" }}>
                      <StockBadge stock={Number(item.stock)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontSize: 14, background: "#fff" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <Package size={28} color="#d1d5db" />
                      All products are well stocked
                    </div>
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