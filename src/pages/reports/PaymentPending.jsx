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

//   // ✅ DATE FORMAT FIX
//   const formatDate = (date) => {
//     if (!date) return "-";

//     const d = new Date(date.replace(" ", "T"));

//     return d.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short"
//     });
//   };

//   // ✅ WHATSAPP REMINDER
//   const sendReminder = (phone, name, amount, dueDate) => {

//     const msg = `Hi ${name},

// Your payment ₹${amount} is due on ${formatDate(dueDate)}.

// Kindly pay on time. Thank you!`;

//     const url = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;

//     window.open(url, "_blank");
//   };

//   // ✅ MARK PAID
//  const markPaid = async (invoice_no) => {
//   const res = await api.post("/invoice/mark_as_paid.php", { invoice_no });

//   if (res.data.status) {
//     alert("Payment Completed ✅");

//     // 🔥 remove row immediately
//     setData(prev =>
//       prev.filter(item => item.invoice_no !== invoice_no)
//     );
//   }
// };

//   return (
//     <div style={{ padding: 24, fontFamily: "sans-serif" }}>

//       {/* HEADER */}
//       <h2 style={{ marginBottom: 20 }}>💰 Pending Payments</h2>

//       {/* TABLE */}
//       <div style={{
//         background: "#fff",
//         borderRadius: 12,
//         overflow: "hidden",
//         border: "1px solid #e5e7eb"
//       }}>

//         <table style={{ width: "100%", borderCollapse: "collapse" }}>

//           {/* HEADER */}
//           <thead>
//             <tr style={{ background: "#eef2ff" }}>
//               <th style={th}>Invoice</th>
//               <th style={th}>Customer</th>
//               <th style={th}>Phone</th>
//               <th style={th}>Amount</th>
//               <th style={th}>Due Date</th>
//               <th style={th}>Status</th>
//               <th style={th}>Reminder</th>
//               <th style={th}>Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan={8} style={{ padding: 30, textAlign: "center" }}>
//                   No Pending Payments
//                 </td>
//               </tr>
//             ) : data.map((item, i) => {

//               const today = new Date();
//               const due = item.due_date
//                 ? new Date(item.due_date.replace(" ", "T"))
//                 : null;

//               const diff = due
//                 ? (due - today) / (1000 * 60 * 60 * 24)
//                 : null;

//               const isOverdue = diff !== null && diff < 0;

//               const showReminder =
//                 item.payment_type === "credit" &&
//                 Number(item.balance_amount) > 0 &&
//                 item.due_date;

//               return (
//                 <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>

//                   <td style={tdBlue}>{item.invoice_no}</td>

//                   <td style={td}>{item.customer_name}</td>

//                   <td style={tdLight}>{item.customer_phone}</td>

//                   <td style={tdGreen}>
//                     ₹{Number(item.balance_amount || item.total_amount).toLocaleString()}
//                   </td>

//                   <td style={td}>
//                     {item.due_date ? formatDate(item.due_date) : "-"}
//                   </td>

//                   {/* STATUS */}
//                   <td style={td}>
//                     <span style={{
//                       color: isOverdue ? "#dc2626" : "#f97316",
//                       fontWeight: 600
//                     }}>
//                       {isOverdue ? "Overdue" : "Pending"}
//                     </span>
//                   </td>

//                   {/* REMINDER */}
//                   <td style={td}>
//                     {showReminder ? (
//                       <button
//                         onClick={() =>
//                           sendReminder(
//                             item.customer_phone,
//                             item.customer_name,
//                             item.balance_amount || item.total_amount,
//                             item.due_date
//                           )
//                         }
//                         style={{
//                           background: "#22c55e",
//                           color: "#fff",
//                           border: "none",
//                           padding: "6px 12px",
//                           borderRadius: 6,
//                           cursor: "pointer",
//                           fontWeight: 600
//                         }}
//                       >
//                         Send
//                       </button>
//                     ) : (
//                       <span style={{ color: "#9ca3af" }}>—</span>
//                     )}
//                   </td>

//                   {/* ACTION */}
//                   <td style={td}>
//                     <button
//                       onClick={() => markPaid(item.invoice_no)}
//                       style={{
//                         background: "#16a34a",
//                         color: "#fff",
//                         border: "none",
//                         padding: "6px 12px",
//                         borderRadius: 6,
//                         cursor: "pointer",
//                         fontWeight: 600
//                       }}
//                     >
//                       Confirm Paid
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }

// // 🎨 STYLES
// const th = {
//   padding: "12px",
//   textAlign: "left",
//   fontSize: 12,
//   color: "#4338ca",
//   fontWeight: 700
// };

// const td = {
//   padding: "14px"
// };

// const tdLight = {
//   padding: "14px",
//   color: "#6b7280"
// };

// const tdGreen = {
//   padding: "14px",
//   color: "#15803d",
//   fontWeight: 700
// };

// const tdBlue = {
//   padding: "14px",
//   color: "#4338ca",
//   fontWeight: 600
// };


//new update

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PaymentPending() {

  const [data, setData] = useState([]);

  // ✅ FETCH DATA

  const fetchData = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const res = await api.post(
      "/invoice/get_pending_invoice.php",
      {
        company_id: user.company_id
      }
    );

    if (res.data.status) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ DATE FORMAT

  const formatDate = (date) => {

    if (!date) return "-";

    const d = new Date(date.replace(" ", "T"));

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  };

  // ✅ WHATSAPP REMINDER

  const sendReminder = (
    phone,
    name,
    amount,
    dueDate
  ) => {

    const msg = `Hi ${name},

Your payment ₹${amount} is due on ${formatDate(dueDate)}.

Kindly pay on time. Thank you!`;

    const url =
      `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
  };

  // ✅ MARK PAID

  const markPaid = async (
    invoice_no,
    pay_amount
  ) => {

    const res = await api.post(
      "/invoice/mark_as_paid.php",
      {
        invoice_no,
        pay_amount
      }
    );

    if (res.data.status) {

      alert(res.data.message);

      fetchData();
    }
  };

  return (

    <div
      style={{
        padding: 24,
        fontFamily: "sans-serif",
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22
        }}
      >

        <h2
          style={{
            margin: 0,
            color: "#1e293b"
          }}
        >
          💰 Pending Payments
        </h2>

        <div
          style={{
            background: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            fontWeight: 700,
            color: "#4338ca"
          }}
        >
          Total Pending : ₹
          {data
            .reduce(
              (sum, item) =>
                sum + Number(item.balance_amount),
              0
            )
            .toLocaleString()}
        </div>

      </div>

      {/* TABLE */}

      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 14px rgba(0,0,0,.04)"
        }}
      >

        <div style={{ overflowX: "auto" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 1300
            }}
          >

            {/* HEADER */}

            <thead>

              <tr
                style={{
                  background: "#eef2ff"
                }}
              >

                <th style={th}>Invoice</th>

                <th style={th}>Customer</th>

                <th style={th}>Phone</th>

                <th style={th}>Total</th>

                <th style={th}>Paid</th>

                <th style={th}>Pending</th>

                <th style={th}>Limit</th>

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

                  <td
                    colSpan={11}
                    style={{
                      padding: 40,
                      textAlign: "center",
                      color: "#64748b",
                      fontWeight: 600
                    }}
                  >
                    No Pending Payments
                  </td>

                </tr>

              ) : data.map((item, i) => {

                const today = new Date();

                const due = item.due_date
                  ? new Date(
                      item.due_date.replace(" ", "T")
                    )
                  : null;

                const diff = due
                  ? (due - today) /
                    (1000 * 60 * 60 * 24)
                  : null;

                const isOverdue =
                  diff !== null && diff < 0;

                const showReminder =
                  item.payment_type === "credit" &&
                  Number(item.balance_amount) > 0 &&
                  item.due_date;

                const returnAmount =
                  Number(item.pay_amount || 0) >
                  Number(item.balance_amount)
                    ? Number(item.pay_amount) -
                      Number(item.balance_amount)
                    : 0;

                return (

                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        "1px solid #f1f5f9"
                    }}
                  >

                    {/* INVOICE */}

                    <td style={tdBlue}>
                      {item.invoice_no}
                    </td>

                    {/* CUSTOMER */}

                    <td style={td}>
                      {item.customer_name}
                    </td>

                    {/* PHONE */}

                    <td style={tdLight}>
                      {item.customer_phone}
                    </td>

                    {/* TOTAL */}

                    <td style={td}>
                      ₹
                      {Number(
                        item.total_amount
                      ).toLocaleString()}
                    </td>

                    {/* PAID */}

                    <td
                      style={{
                        padding: "14px",
                        color: "#16a34a",
                        fontWeight: 700
                      }}
                    >
                      ₹
                      {Number(
                        item.paid_amount_total
                      ).toLocaleString()}
                    </td>

                    {/* PENDING */}

                    <td
                      style={{
                        padding: "14px",
                        color: "#dc2626",
                        fontWeight: 700
                      }}
                    >
                      ₹
                      {Number(
                        item.balance_amount
                      ).toLocaleString()}
                    </td>

                    {/* LIMIT */}

                    <td
                      style={{
                        padding: "14px",
                        color: "#7c3aed",
                        fontWeight: 700
                      }}
                    >
                      ₹
                      {Number(
                        item.credit_limit
                      ).toLocaleString()}
                    </td>

                    {/* DUE DATE */}

                    <td style={td}>
                      {item.due_date
                        ? formatDate(item.due_date)
                        : "-"}
                    </td>

                    {/* STATUS */}

                    <td style={td}>

                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          background:
                            isOverdue
                              ? "#fee2e2"
                              : "#fef3c7",
                          color:
                            isOverdue
                              ? "#dc2626"
                              : "#d97706"
                        }}
                      >
                        {isOverdue
                          ? "Overdue"
                          : "Pending"}
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
                              item.balance_amount,
                              item.due_date
                            )
                          }
                          style={{
                            background: "#22c55e",
                            color: "#fff",
                            border: "none",
                            padding: "8px 14px",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontWeight: 700
                          }}
                        >
                          Send
                        </button>

                      ) : (

                        <span
                          style={{
                            color: "#9ca3af"
                          }}
                        >
                          —
                        </span>

                      )}

                    </td>

                    {/* ACTION */}

                    <td style={td}>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8
                        }}
                      >

                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={
                            item.pay_amount || ""
                          }
                          onChange={(e) => {

                            const updated = [
                              ...data
                            ];

                            updated[i].pay_amount =
                              e.target.value;

                            setData(updated);
                          }}
                          style={{
                            padding: "8px 10px",
                            border:
                              "1px solid #d1d5db",
                            borderRadius: 8,
                            width: 140
                          }}
                        />

                        {/* RETURN */}

                        {returnAmount > 0 && (

                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#dc2626"
                            }}
                          >
                            Return ₹
                            {returnAmount.toLocaleString()}
                          </div>

                        )}

                       
<button
  onClick={() => {

    // ❌ EMPTY CHECK

    if (
      !item.pay_amount ||
      Number(item.pay_amount) <= 0
    ) {

      alert("Please enter payment amount");

      return;
    }

    markPaid(
      item.invoice_no,
      item.pay_amount
    );
  }}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700
  }}
>
  Confirm Paid
</button>



                      </div>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

// 🎨 STYLES

const th = {
  padding: "14px",
  textAlign: "left",
  fontSize: 12,
  color: "#4338ca",
  fontWeight: 700,
  whiteSpace: "nowrap"
};

const td = {
  padding: "14px",
  whiteSpace: "nowrap"
};

const tdLight = {
  padding: "14px",
  color: "#6b7280",
  whiteSpace: "nowrap"
};

const tdBlue = {
  padding: "14px",
  color: "#4338ca",
  fontWeight: 700,
  whiteSpace: "nowrap"
};

