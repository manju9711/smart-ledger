// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function PaymentPending() {

//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const res = await api.post("/invoice/get_pending_invoice.php", {
//       company_id: user.company_id
//     });

//     if (res.data.status) {
//       setData(res.data.data);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const markPaid = async (invoice_no) => {
//     await api.post("/invoice/mark_as_paid.php", { invoice_no });

//     alert("Payment Completed ✅");

//     fetchData(); // refresh
//   };

//   return (
//     <div style={{ padding: 20 }}>

//       <h2 style={{ marginBottom: 20 }}>💰 Pending Payments</h2>

//       <table style={{ width:"100%", background:"#fff", borderRadius:10 }}>
//         <thead>
//           <tr style={{ background:"#eef2ff" }}>
//             <th>Invoice</th>
//             <th>Customer</th>
//             <th>Phone</th>
//             <th>Amount</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((item, i) => (
//             <tr key={i}>

//               <td>{item.invoice_no}</td>
//               <td>{item.customer_name}</td>
//               <td>{item.customer_phone}</td>
//               <td>₹{item.total_amount}</td>

//               <td>
//                 <button
//                   onClick={()=>markPaid(item.invoice_no)}
//                   style={{
//                     background:"green",
//                     color:"#fff",
//                     border:"none",
//                     padding:"6px 12px",
//                     borderRadius:6,
//                     cursor:"pointer"
//                   }}
//                 >
//                   Confirm Paid
//                 </button>
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }

//manju
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PaymentPending() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await api.post("/invoice/get_pending_invoice.php", {
      company_id: user.company_id
    });

    if (res.data.status) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ DATE FORMAT FIX
  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date.replace(" ", "T"));

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  };

  // ✅ WHATSAPP REMINDER
  const sendReminder = (phone, name, amount, dueDate) => {

    const msg = `Hi ${name},

Your payment ₹${amount} is due on ${formatDate(dueDate)}.

Kindly pay on time. Thank you!`;

    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
  };

  // ✅ MARK PAID
 const markPaid = async (invoice_no) => {
  const res = await api.post("/invoice/mark_as_paid.php", { invoice_no });

  if (res.data.status) {
    alert("Payment Completed ✅");

    // 🔥 remove row immediately
    setData(prev =>
      prev.filter(item => item.invoice_no !== invoice_no)
    );
  }
};

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>

      {/* HEADER */}
      <h2 style={{ marginBottom: 20 }}>💰 Pending Payments</h2>

      {/* TABLE */}
      <div style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e5e7eb"
      }}>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          {/* HEADER */}
          <thead>
            <tr style={{ background: "#eef2ff" }}>
              <th style={th}>Invoice</th>
              <th style={th}>Customer</th>
              <th style={th}>Phone</th>
              <th style={th}>Amount</th>
              <th style={th}>Due Date</th>
              <th style={th}>Status</th>
              <th style={th}>Reminder</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 30, textAlign: "center" }}>
                  No Pending Payments
                </td>
              </tr>
            ) : data.map((item, i) => {

              const today = new Date();
              const due = item.due_date
                ? new Date(item.due_date.replace(" ", "T"))
                : null;

              const diff = due
                ? (due - today) / (1000 * 60 * 60 * 24)
                : null;

              const isOverdue = diff !== null && diff < 0;

              const showReminder =
                item.payment_type === "credit" &&
                Number(item.balance_amount) > 0 &&
                item.due_date;

              return (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>

                  <td style={tdBlue}>{item.invoice_no}</td>

                  <td style={td}>{item.customer_name}</td>

                  <td style={tdLight}>{item.customer_phone}</td>

                  <td style={tdGreen}>
                    ₹{Number(item.balance_amount || item.total_amount).toLocaleString()}
                  </td>

                  <td style={td}>
                    {item.due_date ? formatDate(item.due_date) : "-"}
                  </td>

                  {/* STATUS */}
                  <td style={td}>
                    <span style={{
                      color: isOverdue ? "#dc2626" : "#f97316",
                      fontWeight: 600
                    }}>
                      {isOverdue ? "Overdue" : "Pending"}
                    </span>
                  </td>

                  {/* REMINDER */}
                  <td style={td}>
                    {showReminder ? (
                      <button
                        onClick={() =>
                          sendReminder(
                            item.customer_phone,
                            item.customer_name,
                            item.balance_amount || item.total_amount,
                            item.due_date
                          )
                        }
                        style={{
                          background: "#22c55e",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontWeight: 600
                        }}
                      >
                        Send
                      </button>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>—</span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td style={td}>
                    <button
                      onClick={() => markPaid(item.invoice_no)}
                      style={{
                        background: "#16a34a",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      Confirm Paid
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}

// 🎨 STYLES
const th = {
  padding: "12px",
  textAlign: "left",
  fontSize: 12,
  color: "#4338ca",
  fontWeight: 700
};

const td = {
  padding: "14px"
};

const tdLight = {
  padding: "14px",
  color: "#6b7280"
};

const tdGreen = {
  padding: "14px",
  color: "#15803d",
  fontWeight: 700
};

const tdBlue = {
  padding: "14px",
  color: "#4338ca",
  fontWeight: 600
};