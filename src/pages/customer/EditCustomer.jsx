import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditCustomer() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    type: "regular",
    credit_enabled: 0,
    credit_limit: ""
  });

  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  /* FETCH */
 useEffect(() => {
  (async () => {
    try {
      const res = await api.post("/customer/get_customer_by_id.php", { id });

      if (res.data.status) {
        setForm(res.data.data);
      } else {
        alert("Customer not found");
      }
    } catch {
      alert("Error loading");
    }
  })();
}, [id]);

  /* UPDATE */
 const handleUpdate = async () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const company_id = Number(user?.company_id);

  if (!form.name.trim()) {
    alert("Name required");
    return;
  }

  if (!/^[0-9]{10}$/.test(form.phone)) {
    alert("Invalid phone");
    return;
  }

  setLoading(true);

  try {
    const res = await api.post("/customer/update.php", {
      id,
      company_id, // 🔥 IMPORTANT
      name: form.name,
      phone: form.phone,
      address: form.address,
      type: form.type,
      credit_enabled: form.credit_enabled,
      credit_limit: form.credit_enabled ? form.credit_limit : 0
    });

    if (res.data.status) {
      alert("Updated successfully!");
      navigate("/customer");
    } else {
      alert(res.data.message || "Update failed");
    }

  } catch {
    alert("Server error");
  }

  setLoading(false);
};

  return (
    <div style={{
      minHeight: "100vh",
      background: "#eef2f7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, sans-serif"
    }}>

      <div style={{
        width: 420,
        background: "#fff",
        borderRadius: 24,
        padding: 28,
        boxShadow: "0 20px 50px rgba(0,0,0,0.08)"
      }}>

        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Edit Customer</h2>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            Update customer details
          </p>

          <div style={{
            marginTop: 8,
            background: "#e0e7ff",
            color: "#1d4ed8",
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 600
          }}>
            Customer ID: #{id}
          </div>
        </div>

        <hr style={{ margin: "16px 0" }} />

        {/* NAME */}
        <label style={label}>Customer Name</label>
        <input
          value={form.name}
          onChange={e => set("name", e.target.value)}
          style={input}
        />

        {/* PHONE */}
        <label style={label}>Mobile</label>
        <input
          value={form.phone}
          onChange={e => set("phone", e.target.value)}
          style={input}
        />

        {/* ADDRESS */}
        <label style={label}>Address</label>
        <textarea
          value={form.address}
          onChange={e => set("address", e.target.value)}
          style={{ ...input, height: 70 }}
        />

        {/* TYPE */}
        <label style={label}>Customer Type</label>
        <select
          value={form.type}
          onChange={e => set("type", e.target.value)}
          style={input}
        >
          <option value="regular">Regular</option>
          <option value="wholesale">Wholesale</option>
          <option value="retail">Retail</option>
        </select>

        {/* CREDIT */}
        <label style={label}>Credit Enabled</label>
        <select
          value={form.credit_enabled}
          onChange={e => set("credit_enabled", Number(e.target.value))}
          style={input}
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>

        {/* CREDIT LIMIT */}
        {form.credit_enabled === 1 && (
          <>
            <label style={label}>Credit Limit</label>
            <input
              type="number"
              value={form.credit_limit}
              onChange={e => set("credit_limit", e.target.value)}
              style={input}
            />
          </>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 14,
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading ? "Updating..." : "💾 Update Customer"}
        </button>

        {/* BACK */}
        <button
          onClick={() => navigate("/customer")}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            cursor: "pointer",
            color: "#475569",
            fontWeight: 600
          }}
        >
          ← Back to Customers
        </button>

      </div>
    </div>
  );
}

/* STYLES */
const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 12,
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  outline: "none"
};

const label = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4,
  display: "block"
};