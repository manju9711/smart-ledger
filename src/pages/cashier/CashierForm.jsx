import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CashierForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // admin login

      const res = await api.post("/auth/register.php", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "cashier",
        company_id: user.company_id   // 🔥 IMPORTANT
      });

      if (res.data.status) {
        alert("Cashier Created ✅");
        navigate("/cashier");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Cashier</h2>

      <input placeholder="Name"
        className="w-full p-3 border mb-3"
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input placeholder="Email"
        className="w-full p-3 border mb-3"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <input type="password" placeholder="Password"
        className="w-full p-3 border mb-3"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 w-full rounded"
      >
        Create Cashier
      </button>
    </div>
  );
}