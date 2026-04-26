import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Pencil, Trash2, Search } from "lucide-react";

export default function CustomerList() {

  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
const fetchCustomers = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const company_id = Number(user?.company_id);

    const res = await api.get(`/customer/get_all_customer.php?company_id=${company_id}`);

    if (res.data.status) {
      setCustomers(res.data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchCustomers();
  }, []);

 const handleDelete = async (id) => {
  if (!window.confirm("Delete this customer?")) return;

  try {
    const res = await api.post("/customer/delete.php", { id });

    if (res.data.status) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    } else {
      alert(res.data.message);
    }
  } catch {
    alert("Server error");
  }
};

  const filtered = customers.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  const getInitial = (name) =>
    name ? name[0].toUpperCase() : "?";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#eef2f7",
      padding: "30px",
      fontFamily: "Inter, sans-serif"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <div>
          <h2 style={{ margin: 0 }}>Customers</h2>
          <p style={{ margin: "4px 0", color: "#64748b", fontSize: 13 }}>
            Manage your customers
          </p>
        </div>

        <button
          onClick={() => navigate("/customer/add")}
          style={{
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          + Add Customer
        </button>
      </div>

      {/* SEARCH */}
      <div style={{
        position: "relative",
        marginBottom: 20
      }}>
        <Search size={16} style={{
          position: "absolute",
          top: "50%",
          left: 12,
          transform: "translateY(-50%)",
          color: "#94a3b8"
        }} />

        <input
          placeholder="Search by name or mobile..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 12px 12px 36px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            outline: "none"
          }}
        />
      </div>

      {/* TABLE */}
      <div style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>

        {/* HEADER */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.2fr 2fr 1fr 1fr 1fr",
          padding: "14px 20px",
          background: "#3b82f6",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600
        }}>
          <span>Customer</span>
          <span>Mobile</span>
          <span>Address</span>
          <span>Type</span>
          <span>Credit</span>
          <span style={{ textAlign: "center" }}>Actions</span>
        </div>

        {/* ROWS */}
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
            No customers found
          </div>
        ) : (
          filtered.map(c => (
            <div key={c.id} style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 2fr 1fr 1fr 1fr",
              padding: "16px 20px",
              alignItems: "center",
              borderBottom: "1px solid #f1f5f9"
            }}>

              {/* NAME */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "#1d4ed8"
                }}>
                  {getInitial(c.name)}
                </div>

                <div>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>
                    ID #{c.id}
                  </div>
                </div>
              </div>

              {/* PHONE */}
              <div>{c.phone}</div>

              {/* ADDRESS */}
              <div style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {c.address}
              </div>

              {/* TYPE */}
              <div style={{
                background: "#eff6ff",
                color: "#2563eb",
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                width: "fit-content"
              }}>
                {c.type}
              </div>

              {/* CREDIT */}
              <div>
                {c.credit_enabled ? (
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>
                    Yes ₹{c.credit_limit}
                  </span>
                ) : (
                  <span style={{ color: "#ef4444" }}>No</span>
                )}
              </div>

              {/* ACTIONS */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 10
              }}>
                <button
                  onClick={() => navigate(`/customer/edit/${c.id}`)}
                  style={btnEdit}
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  style={btnDelete}
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* BUTTON STYLES */
const btnEdit = {
  background: "#eff6ff",
  border: "none",
  padding: 8,
  borderRadius: 8,
  cursor: "pointer",
  color: "#2563eb"
};

const btnDelete = {
  background: "#fee2e2",
  border: "none",
  padding: 8,
  borderRadius: 8,
  cursor: "pointer",
  color: "#dc2626"
};