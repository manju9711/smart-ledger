import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function EditCashier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchCashier = async () => {
    const res = await api.post("/cashier/get_cashier_by_id.php", { id });

    if (res.data.status) {
      setForm({
        name: res.data.data.name,
        email: res.data.data.email,
        password: ""
      });
    }
  };

  useEffect(() => {
    fetchCashier();
  }, []);

  const handleUpdate = async () => {
    const res = await api.post("/cashier/update_cashier.php", {
      id,
      name: form.name,
      email: form.email,
      password: form.password
    });

    if (res.data.status) {
      alert("Updated ✅");
      navigate("/cashier");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-6">

      {/* CARD */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 text-gray-700">
          Edit Cashier
        </h1>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl focus:outline-none"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl focus:outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="New Password (optional)"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl focus:outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Update Cashier
          </button>

        </div>
      </div>
    </div>
  );
}