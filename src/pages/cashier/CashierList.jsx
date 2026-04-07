import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CashierList() {
  const [cashiers, setCashiers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchCashiers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await api.post("/cashier/get_cashiers.php", {
      company_id: user.company_id
    });

    if (res.data.status) {
      setCashiers(res.data.data);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cashier?")) return;

    const res = await api.post("/cashier/delete_cashier.php", { id });

    if (res.data.status) {
      setCashiers(prev => prev.filter(c => c.id !== id));
    }
  };

  // 🔍 FILTER
  const filtered = cashiers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Cashiers</h1>

        <button
          onClick={() => navigate("/cashier/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow"
        >
          + Add Cashier
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search cashier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
      />

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-3 bg-gray-100 px-6 py-3 font-semibold text-gray-600">
          <span>Name</span>
          <span>Email</span>
          <span className="text-center">Actions</span>
        </div>

        {/* TABLE BODY */}
        {filtered.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-3 px-6 py-4 border-t items-center"
          >
            <span className="font-medium text-gray-700">{c.name}</span>
            <span className="text-gray-600">{c.email}</span>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate(`/cashier/edit/${c.id}`)}
                className="bg-blue-100 text-blue-600 p-2 rounded-lg"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => handleDelete(c.id)}
                className="bg-red-100 text-red-600 p-2 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <p className="text-center py-6 text-gray-400">
            No cashiers found
          </p>
        )}
      </div>
    </div>
  );
}