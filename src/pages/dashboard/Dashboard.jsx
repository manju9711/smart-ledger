import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total_sales: 0,
    total_products: 0,
    low_stock: 0,
    monthly_sales: [],
    top_product: "",
    top_qty: 0,
    out_of_stock: 0
  });

  const fetchStats = async () => {
    try {
      // 🔥 combine both APIs
      const basic = await api.get("/dashboard/get_stats.php");
      const analytics = await api.get("/dashboard/get_analytics.php");

      if (basic.data.status && analytics.data.status) {
        setStats({
          ...basic.data.data,
          ...analytics.data.data
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* 💰 SALES */}
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2>Total Sales</h2>
          <p className="text-2xl font-bold text-green-700">
            ₹{stats.total_sales}
          </p>
        </div>

        {/* 📦 PRODUCTS */}
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2>Total Products</h2>
          <p className="text-2xl font-bold text-blue-700">
            {stats.total_products}
          </p>
        </div>

        {/* ⚠️ LOW STOCK */}
        <div className="bg-red-100 p-6 rounded-xl shadow">
          <h2>Low Stock</h2>
          <p className="text-2xl font-bold text-red-600">
            {stats.low_stock}
          </p>
        </div>

      </div>

      {/* 🔥 EXTRA CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* 🔥 TOP PRODUCT */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2>Top Selling Product</h2>
          <p className="text-xl font-bold">
            {stats.top_product || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            Sold: {stats.top_qty}
          </p>
        </div>

        {/* 📉 OUT OF STOCK */}
        <div className="bg-red-200 p-6 rounded-xl shadow">
          <h2>Out of Stock</h2>
          <p className="text-2xl font-bold text-red-700">
            {stats.out_of_stock}
          </p>
        </div>

        {/* 📊 MONTH COUNT */}
        <div className="bg-indigo-100 p-6 rounded-xl shadow">
          <h2>Months Tracked</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {stats.monthly_sales.length}
          </p>
        </div>

      </div>

      {/* 📊 MONTHLY SALES CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Monthly Sales</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthly_sales}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}