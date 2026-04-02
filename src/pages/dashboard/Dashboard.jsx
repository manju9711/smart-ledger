export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {["Sales", "Revenue", "Products", "Low Stock"].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h2>{item}</h2>
            <p className="text-xl font-bold mt-2">₹10,000</p>
          </div>
        ))}
      </div>
    </div>
  );
}