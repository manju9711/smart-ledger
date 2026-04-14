// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../../services/api";

// // export default function Billing() {
// //   const [rows, setRows] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [activeIndex, setActiveIndex] = useState(null);

// //   const [customer, setCustomer] = useState({ name: "", phone: "" });

// //   const [payment, setPayment] = useState({
// //     method: "cash",
// //     received: 0,
// //   });

// //   const navigate = useNavigate();

// //   // 🔥 Fetch products
// // const fetchProducts = async () => {
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   if (!user?.company_id) {
// //     alert("Company ID missing");
// //     return;
// //   }

// //   const res = await api.get("/product/get.php", {
// //     params: { company_id: user.company_id }
// //   });

// //   console.log("PRODUCT LIST 👉", res.data);

// //   if (res.data.status) {
// //     setProducts(res.data.data);
// //   }
// // };
// //   useEffect(() => {
// //     fetchProducts();
// // setRows([{ name: "", price: 0, qty: 1, gst: 0, unit: "", unit_value: 100 }]);
// //   }, []);

// //   // 🔍 Search
// //   const handleSearch = (value, index) => {
// //     updateRow(index, "name", value);

// //     if (!value) {
// //       setSuggestions(products);
// //       return;
// //     }
// // const filtered = products.filter((p) =>
// //   p.stock > 0 && // 🔥 stock check
// //   p.product_name.toLowerCase().includes(value.toLowerCase())
// // );

// //     setSuggestions(filtered);
// //     setActiveIndex(index);
// //   };

// //   // ✅ Select product
// // const selectProduct = async (product, index) => {
// //  const user = JSON.parse(localStorage.getItem("user"));

// // const res = await api.get("/product/get_by_id.php", {
// //   params: {
// //     id: product.id,
// //     company_id: user.company_id
// //   }
// // });

// //   if (res.data.status) {
// //     const p = res.data.data;

// //     const updated = [...rows];

// //     // ✅ update current row
// // updated[index] = {
// //   product_id: p.id, // 🔥 IMPORTANT FIX
// //   name: p.product_name,
// //   price: Number(p.price),
// //   gst: Number(p.gst_percentage),
// //   qty: 1,
// //   unit: p.unit,
// //   unit_value: 1
// // };

// //     // ✅ check last row filled or not
// //     const lastRow = updated[updated.length - 1];

// //     if (
// //       lastRow.name &&
// //       lastRow.name.trim() !== "" &&
// //       lastRow.price > 0
// //     ) {
// //       // 🔥 only then add new row
// //       updated.push({ name: "", price: 0, qty: 1, gst: 0 });
// //     }

// //     setRows(updated);
// //     setSuggestions([]);
// //     setActiveIndex(null);
// //   }
// // };

// // const updateRow = (i, field, value) => {
// //   let updated = [...rows];

// //   // 🔥 find product stock
// // const product = products.find((p) => p.id === updated[i].product_id);

// //   if (field === "unit_value") {
// //   updated[i][field] = Number(value);
// // } else {
// //   updated[i][field] = value;
// // }

// //   if (field === "qty" && product) {
// //     if (value > product.stock) {
// //       alert(`Only ${product.stock} items available in stock`);
// //       value = product.stock; // auto correct
// //     }
// //   }

// //   updated[i][field] = value;

// //   // remove extra empty rows
// //   updated = updated.filter(
// //     (r, index) =>
// //       r.name ||
// //       index === updated.length - 1
// //   );

// //   setRows(updated);
// // };

// //   // 💰 Calculation
// // const subtotal = rows.reduce(
// //   (s, r) => s + r.price * r.qty,
// //   0
// // );

// // const gstTotal = rows.reduce(
// //   (s, r) =>
// //     s + (r.price * r.qty * r.gst) / 100,
// //   0
// // );

// //   const total = subtotal + gstTotal;
// //   useEffect(() => {
// //   setPayment((prev) => ({
// //     ...prev,
// //     received: total
// //   }));
// // }, [total]);
// //   const balance = payment.received - total;
// // const validProducts = rows.filter(
// //   (r) =>
// //     r.name &&
// //     r.name.trim() !== "" &&
// //     r.price > 0 &&
// //     r.qty > 0
// // );
// //   // 🚀 Generate invoice
// // // const handleGenerate = async () => {

// // //   // ✅ VALIDATION FIRST
// // //   if (!customer.name.trim()) {
// // //     alert("Customer name required");
// // //     return;
// // //   }

// // //   if (!/^[0-9]{10}$/.test(customer.phone)) {
// // //     alert("Enter valid 10 digit phone number");
// // //     return;
// // //   }

// // //   const validProducts = rows.filter(
// // //     (r) =>
// // //       r.name &&
// // //       r.name.trim() !== "" &&
// // //       r.price > 0 &&
// // //       r.qty > 0
// // //   );

// // //   if (validProducts.length === 0) {
// // //     alert("Add at least one product");
// // //     return;
// // //   }

// // //   // 🚀 API CALL AFTER VALIDATION
// // //   const res = await api.post("/invoice/create_invoice.php", {
// // //     customer_name: customer.name,
// // //     customer_phone: customer.phone,
// // //     products: validProducts,
// // //     sub_total: subtotal,
// // //     gst_total: gstTotal,
// // //     total_amount: total,
// // //     paid_amount: payment.received,
// // //     balance_amount: balance,
// // //     payment_method: payment.method,
// // //   });

// // //   if (res.data.status) {
// // //     navigate(`/invoice/${res.data.invoice_no}`);
// // //   }
// // // };


// // const handleGenerate = async () => {

// //   const user = JSON.parse(localStorage.getItem("user")); // 🔥 ADD THIS

// //   if (!user?.company_id) {
// //     alert("Company ID missing!");
// //     return;
// //   }

// //   const res = await api.post("/invoice/create_invoice.php", {
// //     company_id: user.company_id, // 🔥 ADD THIS
// //     customer_name: customer.name,
// //     customer_phone: customer.phone,
// //     products: validProducts,
// //     sub_total: subtotal,
// //     gst_total: gstTotal,
// //     total_amount: total,
// //     paid_amount: payment.received,
// //     balance_amount: balance,
// //     payment_method: payment.method,
// //   });

// //   if (res.data.status) {
// //     navigate(`/invoice/${res.data.invoice_no}`);
// //   }
// // };


// //  return (
// //   <div className="p-6 bg-gray-100 min-h-screen">

// //     {/* HEADER */}
// //     <div className="flex justify-between mb-6">
// //       <div>
// //         <h1 className="text-3xl font-bold text-indigo-600">SmartLedger</h1>
// //         <p className="text-gray-500">Invoice Billing</p>
// //       </div>
// //     </div>

// //     {/* CUSTOMER */}
// //     <div className="bg-white p-4 rounded-xl shadow mb-6">
// //       <h2 className="font-semibold mb-3 text-gray-700">Billing To</h2>

// //       <div className="flex gap-4">
// //         <input
// //           placeholder="Customer Name"
// //           className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400"
// //           onChange={(e) =>
// //             setCustomer({ ...customer, name: e.target.value })
// //           }
// //         />
// //         <input
// //           placeholder="Phone Number"
// //           className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400"
// //           onChange={(e) =>
// //             setCustomer({ ...customer, phone: e.target.value })
// //           }
// //         />
// //       </div>
// //     </div>

// //     {/* TABLE */}
// //     <div className="bg-white rounded-xl shadow overflow-visible">
// //       <table className="w-full">
// //         <thead className="bg-indigo-50 text-gray-700">
// //           <tr>
// //             <th className="p-3 text-left">Item</th>
// //             <th>Qty</th>
// //             <th>Price</th>
// //             <th>GST</th>
// //             <th>Amount</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {rows.map((r, i) => (
// //             <tr key={i} className="border-t hover:bg-gray-50">
// // <td className="p-2 relative">

// //   {/* PRODUCT INPUT */}
// //   <div className="flex gap-2">

// //     <input
// //       value={r.name}
// //       onFocus={() => {
// //         const availableProducts = products.filter((p) => p.stock > 0);
// //         setSuggestions(availableProducts);
// //         setActiveIndex(i);
// //       }}
// //       onChange={(e) =>
// //         handleSearch(e.target.value, i)
// //       }
// //       className="border p-2 w-full rounded"
// //       placeholder="Search product..."
// //     />

// //     {/* 🔥 UNIT INPUT SIDE */}
// //     {r.name && (
// //       <>
// //        {/* <input
// //   type="number"
// //   value={r.unit_value || 100}
// //   onChange={(e) =>
// //     updateRow(i, "unit_value", e.target.value)
// //   }
// //   className="w-16 border rounded text-center"
// // /> */}

// // <input
// //   type="text"
// //   value={r.unit}
// //   readOnly
// //   className="w-12 border bg-gray-100"
// // />
// //       </>
// //     )}

// //   </div>

// //   {/* DROPDOWN */}
// //   {activeIndex === i && suggestions.length > 0 && (
// //     <div className="absolute bg-white border w-full z-[9999] max-h-40 overflow-y-auto rounded shadow-lg">
// //       {suggestions.map((s) => (
// //         <div
// //           key={s.id}
// //           onClick={() => {
// //             if (s.stock > 0) selectProduct(s, i);
// //           }}
// //           className="p-2 hover:bg-indigo-100 cursor-pointer"
// //         >
// //           {s.product_name}
// //         </div>
// //       ))}
// //     </div>
// //   )}

// // </td>

// //              <td>
// //   <div className="flex items-center gap-1 justify-center">

// //     {/* 🔥 UNIT VALUE INPUT */}
// // <td>
// //   <input
// //     type="number"
// //     value={r.qty}
// //     onChange={(e) =>
// //       updateRow(i, "qty", Number(e.target.value))
// //     }
// //     className="w-16 border rounded text-center"
// //   />
// // </td>


// //   </div>
// // </td>

// //               <td className="text-center font-medium text-green-600">
// //                 ₹{r.price}
// //               </td>

// //               <td className="text-center">{r.gst}%</td>

// //               <td className="text-center font-semibold">
// //                 ₹{((r.price * r.qty * r.gst) / 100).toFixed(2)}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>

// //     {/* SUMMARY */}
// //     <div className="mt-6 flex justify-end">
// //       <div className="bg-white p-5 rounded-xl shadow w-96">

// //         <div className="flex justify-between mb-2">
// //           <span>Sub Total</span>
// //           <span>₹{subtotal}</span>
// //         </div>

// //         <div className="flex justify-between mb-2">
// //           <span>GST</span>
// //           <span>₹{gstTotal}</span>
// //         </div>

// //         <div className="flex justify-between font-bold text-lg border-t pt-2">
// //           <span>Total</span>
// //           <span className="text-indigo-600">₹{total}</span>
// //         </div>

// //         {/* PAYMENT */}
// //         <select
// //           className="w-full border p-2 rounded mt-3"
// //           onChange={(e) =>
// //             setPayment({ ...payment, method: e.target.value })
// //           }
// //         >
// //           <option value="cash">Cash</option>
// //           <option value="upi">UPI</option>
// //           <option value="card">Card</option>
// //         </select>

// //         <input
// //   type="number"
// //   value={payment.received}   // ✅ ADD THIS
// //   className="w-full border p-2 rounded mt-2"
// //   onChange={(e) =>
// //     setPayment({
// //       ...payment,
// //       received: Number(e.target.value),
// //     })
// //   }
// // />

// //         {/* <div className="flex justify-between mt-2 font-semibold">
// //           <span>Balance</span>
// //           <span
// //             className={balance < 0 ? "text-red-500" : "text-green-600"}
// //           >
// //             ₹{balance}
// //           </span>
// //         </div> */}

// //         <button
// //           onClick={handleGenerate}
// //           className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
// //         >
// //           Generate Invoice
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );
// // }

// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// /* ── Global CSS ─────────────────────────────────────────────────────────── */
// const GLOBAL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

//   @keyframes slideDown  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
//   @keyframes slideUp    { from{opacity:0;transform:translateY(10px)}  to{opacity:1;transform:none} }
//   @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
//   @keyframes toastIn    { from{opacity:0;transform:translateX(120px)} to{opacity:1;transform:none} }
//   @keyframes toastOut   { from{opacity:1;transform:none} to{opacity:0;transform:translateX(120px)} }
//   @keyframes spin       { to{transform:rotate(360deg)} }
//   @keyframes rowPop     { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:none} }
//   @keyframes pulse      { 0%,100%{opacity:1} 50%{opacity:.55} }

//   * { box-sizing:border-box; margin:0; padding:0; }

//   body { font-family:'Outfit',sans-serif; }

//   .bill-input {
//     width:100%; background:rgba(248,250,255,0.9);
//     border:1.5px solid #e2e8f0; border-radius:10px;
//     padding:9px 13px; color:#1e293b; font-size:14px;
//     font-family:'Outfit',sans-serif; outline:none;
//     transition:all .2s;
//   }
//   .bill-input:focus {
//     border-color:#6366f1 !important;
//     box-shadow:0 0 0 3px rgba(99,102,241,.12) !important;
//     background:#fff !important;
//   }
//   .bill-input::placeholder { color:#94a3b8; }

//   .row-enter { animation:rowPop .25s ease both; }

//   .qty-btn {
//     width:28px; height:28px; border-radius:8px; border:none;
//     background:linear-gradient(135deg,#6366f1,#818cf8);
//     color:#fff; font-size:16px; cursor:pointer; display:flex;
//     align-items:center; justify-content:center; flex-shrink:0;
//     transition:all .15s;
//   }
//   .qty-btn:hover { transform:scale(1.1); box-shadow:0 4px 12px rgba(99,102,241,.4); }
//   .qty-btn:active { transform:scale(.95); }

//   .del-btn {
//     width:30px; height:30px; border-radius:8px; border:none;
//     background:rgba(239,68,68,.08); color:#ef4444; cursor:pointer;
//     display:flex; align-items:center; justify-content:center;
//     transition:all .15s; font-size:16px; flex-shrink:0;
//   }
//   .del-btn:hover { background:rgba(239,68,68,.18); transform:scale(1.1); }

//   .gen-btn {
//     width:100%; padding:14px; border:none; border-radius:14px;
//     background:linear-gradient(135deg,#4f46e5,#6366f1,#818cf8);
//     color:#fff; font-size:15px; font-weight:700;
//     font-family:'Outfit',sans-serif; cursor:pointer;
//     box-shadow:0 8px 24px rgba(99,102,241,.35);
//     transition:all .22s; letter-spacing:.02em;
//   }
//   .gen-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(99,102,241,.45); }
//   .gen-btn:active { transform:translateY(0); }
//   .gen-btn:disabled { opacity:.65; cursor:not-allowed; transform:none; }

//   .suggest-item { 
//     padding:10px 14px; cursor:pointer; 
//     font-family:'Outfit',sans-serif; font-size:13.5px; color:#334155;
//     transition:background .15s; border-bottom:1px solid #f1f5f9;
//     display:flex; justify-content:space-between; align-items:center;
//   }
//   .suggest-item:hover { background:#eef2ff; }
//   .suggest-item:last-child { border-bottom:none; }
// `;

// /* ── Toast ──────────────────────────────────────────────────────────────── */
// function Toast({ toasts }) {
//   return (
//     <div style={{ position:"fixed", top:20, right:20, zIndex:99999, display:"flex", flexDirection:"column", gap:10 }}>
//       {toasts.map(t => (
//         <div key={t.id} style={{
//           display:"flex", alignItems:"center", gap:10,
//           background: t.type === "success"
//             ? "linear-gradient(135deg,#059669,#10b981)"
//             : t.type === "error"
//             ? "linear-gradient(135deg,#dc2626,#ef4444)"
//             : "linear-gradient(135deg,#d97706,#f59e0b)",
//           color:"#fff", borderRadius:12, padding:"13px 18px",
//           fontWeight:600, fontSize:13.5,
//           boxShadow:"0 8px 28px rgba(0,0,0,.18)",
//           animation:"toastIn .35s cubic-bezier(.4,0,.2,1) both",
//           fontFamily:"'Outfit',sans-serif", minWidth:260, maxWidth:340,
//         }}>
//           <span style={{
//             width:22, height:22, borderRadius:6,
//             background:"rgba(255,255,255,.22)",
//             display:"flex", alignItems:"center", justifyContent:"center",
//             fontSize:12, fontWeight:900, flexShrink:0,
//           }}>
//             {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "!"}
//           </span>
//           <span style={{ flex:1 }}>{t.msg}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ── Main ───────────────────────────────────────────────────────────────── */
// export default function Billing() {
//   const [rows, setRows]           = useState([emptyRow()]);
//   const [products, setProducts]   = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [customer, setCustomer]   = useState({ name: "", phone: "" });
//   const [payment, setPayment]     = useState({ method: "cash", received: 0 });
//   const [generating, setGenerating] = useState(false);
//   const [toasts, setToasts]       = useState([]);
//   const suggestRef                = useRef(null);
//   const navigate                  = useNavigate();

//   function emptyRow() {
//     return { product_id: null, name: "", price: 0, qty: 1, gst: 0, unit: "", stock: 0 };
//   }

//   /* ── Toast helper ── */
//   const showToast = (msg, type = "error") => {
//     const id = Date.now() + Math.random();
//     setToasts(p => [...p, { id, msg, type }]);
//     setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
//   };

//   /* ── Fetch products ── */
//   useEffect(() => {
//     const s = document.createElement("style");
//     s.innerHTML = GLOBAL_CSS;
//     document.head.appendChild(s);
//     return () => document.head.removeChild(s);
//   }, []);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user?.company_id) return;
//     api.get("/product/get.php", { params: { company_id: user.company_id } })
//        .then(r => { if (r.data.status) setProducts(r.data.data); });
//   }, []);

//   /* ── Close suggestions on outside click ── */
//   useEffect(() => {
//     const handler = (e) => {
//       if (suggestRef.current && !suggestRef.current.contains(e.target)) {
//         setSuggestions([]); setActiveIndex(null);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* ── Auto-update received when total changes ── */
//   const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
//   const gstTotal = rows.reduce((s, r) => s + (r.price * r.qty * r.gst) / 100, 0);
//   const total    = subtotal + gstTotal;
//   const balance  = payment.received - total;

//   useEffect(() => {
//     setPayment(p => ({ ...p, received: parseFloat(total.toFixed(2)) }));
//   }, [total]);

//   /* ── Search ── */
//   const handleSearch = (value, index) => {
//     updateRow(index, "name", value);
//     const filtered = value
//       ? products.filter(p => p.stock > 0 && p.product_name.toLowerCase().includes(value.toLowerCase()))
//       : products.filter(p => p.stock > 0);
//     setSuggestions(filtered);
//     setActiveIndex(index);
//   };

//   /* ── Select product ── */
//   const selectProduct = async (product, index) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const res  = await api.get("/product/get_by_id.php", {
//       params: { id: product.id, company_id: user.company_id }
//     });
//     if (!res.data.status) return;
//     const p = res.data.data;

//     const updated = [...rows];
//     updated[index] = {
//       product_id: p.id,
//       name:  p.product_name,
//       price: Number(p.price),
//       gst:   Number(p.gst_percentage),
//       qty:   1,
//       unit:  p.unit,
//       stock: Number(p.stock),
//     };

//     // add empty row if last filled
//     const last = updated[updated.length - 1];
//     if (last.name && last.price > 0) {
//       updated.push(emptyRow());
//     }

//     setRows(updated);
//     setSuggestions([]);
//     setActiveIndex(null);
//   };

//   /* ── Update row ── */
//   const updateRow = (i, field, value) => {
//     const updated = [...rows];

//     if (field === "qty") {
//       const num = Number(value);
//       if (updated[i].stock && num > updated[i].stock) {
//         showToast(`Only ${updated[i].stock} items in stock!`, "warning");
//         updated[i][field] = updated[i].stock;
//       } else {
//         updated[i][field] = num < 1 ? 1 : num;
//       }
//     } else {
//       updated[i][field] = value;
//     }

//     setRows(updated);
//   };

//   /* ── Delete row ── */
//   const deleteRow = (i) => {
//     if (rows.length === 1) { setRows([emptyRow()]); return; }
//     setRows(rows.filter((_, idx) => idx !== i));
//   };

//   /* ── Valid rows ── */
//   const validRows = rows.filter(r => r.name && r.price > 0 && r.qty > 0);

//   /* ── Generate ── */
//   const handleGenerate = async () => {
//     // Validation
//     if (!customer.name.trim()) {
//       showToast("Customer name is required!", "error"); return;
//     }
//     if (!/^[0-9]{10}$/.test(customer.phone)) {
//       showToast("Enter a valid 10-digit phone number!", "error"); return;
//     }
//     if (validRows.length === 0) {
//       showToast("Add at least one product!", "error"); return;
//     }
//     if (payment.received <= 0) {
//       showToast("Enter received amount!", "error"); return;
//     }

//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user?.company_id) { showToast("Company ID missing!", "error"); return; }

//     setGenerating(true);
//     try {
//       const res = await api.post("/invoice/create_invoice.php", {
//         company_id:     user.company_id,
//         customer_name:  customer.name,
//         customer_phone: customer.phone,
//         products:       validRows,
//         sub_total:      parseFloat(subtotal.toFixed(2)),
//         gst_total:      parseFloat(gstTotal.toFixed(2)),
//         total_amount:   parseFloat(total.toFixed(2)),
//         paid_amount:    payment.received,
//         balance_amount: parseFloat(balance.toFixed(2)),
//         payment_method: payment.method,
//       });
//       if (res.data.status) {
//         showToast("Invoice generated!", "success");
//         setTimeout(() => navigate(`/invoice/${res.data.invoice_no}`), 800);
//       } else {
//         showToast(res.data.message || "Something went wrong", "error");
//       }
//     } catch {
//       showToast("Server error. Try again!", "error");
//     }
//     setGenerating(false);
//   };

//   /* ── Row amount = price*qty + gst ── */
//   const rowAmount = (r) => {
//     const base    = r.price * r.qty;
//     const gstAmt  = (base * r.gst) / 100;
//     return base + gstAmt;
//   };

//   /* ─────────────────────────────── RENDER ─────────────────────────────── */
//   return (
//     <div style={{ minHeight:"100vh", background:"#f1f5fb", fontFamily:"'Outfit',sans-serif" }}>
//       <Toast toasts={toasts}/>

//       {/* ── Top Header ── */}
//       <div style={{
//         background:"linear-gradient(135deg,#312e81 0%,#4338ca 50%,#6366f1 100%)",
//         padding:"22px 32px 60px", position:"relative", overflow:"hidden",
//       }}>
//         {/* decorative circles */}
//         {[{s:200,t:-60,r:-50,op:.08},{s:120,t:10,r:160,op:.06},{s:70,b:-20,l:80,op:.07}].map((c,i)=>(
//           <div key={i} style={{
//             position:"absolute", top:c.t, right:c.r, bottom:c.b, left:c.l,
//             width:c.s, height:c.s, borderRadius:"50%",
//             background:`rgba(255,255,255,${c.op})`, pointerEvents:"none",
//           }}/>
//         ))}
//         <div style={{ position:"relative" }}>
//           <h1 style={{ fontSize:28, fontWeight:900, color:"#fff", fontFamily:"'Syne',sans-serif", letterSpacing:"-.02em" }}>
//             Invoice Billing
//           </h1>
//           <p style={{ fontSize:13.5, color:"rgba(255,255,255,.65)", marginTop:3, fontWeight:400 }}>
//             Create and manage customer invoices
//           </p>
//         </div>
//       </div>

//       {/* ── Content ── */}
//       <div style={{ padding:"0 28px 40px", marginTop:-38 }}>

//         {/* ── Customer Card ── */}
//         <div style={{
//           background:"#fff", borderRadius:20,
//           boxShadow:"0 4px 24px rgba(99,102,241,.1), 0 1px 4px rgba(0,0,0,.05)",
//           border:"1.5px solid rgba(199,210,254,.5)",
//           padding:"22px 24px", marginBottom:18,
//           animation:"slideDown .4s ease both",
//         }}>
//           <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
//             <div style={{
//               width:28, height:28, borderRadius:8,
//               background:"linear-gradient(135deg,#4338ca,#6366f1)",
//               display:"flex", alignItems:"center", justifyContent:"center",
//               boxShadow:"0 4px 10px rgba(99,102,241,.35)",
//             }}>
//               <span style={{ color:"#fff", fontSize:13 }}>👤</span>
//             </div>
//             <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
//               Bill To
//             </span>
//           </div>

//           <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
//             <div>
//               <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
//                 Customer Name *
//               </label>
//               <input
//                 className="bill-input"
//                 placeholder="Enter customer name"
//                 value={customer.name}
//                 onChange={e => setCustomer({...customer, name: e.target.value})}
//               />
//             </div>
//             <div>
//               <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
//                 Phone Number *
//               </label>
//               <input
//                 className="bill-input"
//                 placeholder="10-digit phone"
//                 value={customer.phone}
//                 maxLength={10}
//                 onChange={e => setCustomer({...customer, phone: e.target.value.replace(/\D/g,"").slice(0,10)})}
//               />
//             </div>
//           </div>
//         </div>

//         {/* ── Products Card ── */}
//         <div style={{
//           background:"#fff", borderRadius:20,
//           boxShadow:"0 4px 24px rgba(99,102,241,.1), 0 1px 4px rgba(0,0,0,.05)",
//           border:"1.5px solid rgba(199,210,254,.5)",
//           marginBottom:18, overflow:"visible",
//           animation:"slideDown .4s ease .05s both",
//         }}>
//           {/* Card header */}
//           <div style={{
//             padding:"18px 24px 14px",
//             borderBottom:"1.5px solid #f1f5f9",
//             display:"flex", alignItems:"center", justifyContent:"space-between",
//           }}>
//             <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//               <div style={{
//                 width:28, height:28, borderRadius:8,
//                 background:"linear-gradient(135deg,#4338ca,#6366f1)",
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 boxShadow:"0 4px 10px rgba(99,102,241,.35)",
//               }}>
//                 <span style={{ color:"#fff", fontSize:13 }}>📦</span>
//               </div>
//               <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
//                 Products
//               </span>
//             </div>
//             <span style={{
//               fontSize:11.5, fontWeight:700, color:"#6366f1",
//               background:"#eef2ff", borderRadius:20, padding:"4px 12px",
//               border:"1px solid #c7d2fe",
//             }}>
//               {validRows.length} item{validRows.length !== 1 ? "s" : ""}
//             </span>
//           </div>

//           {/* Table header */}
//           <div style={{
//             display:"grid",
//             gridTemplateColumns:"2fr 110px 100px 90px 100px 36px",
//             gap:8, padding:"10px 20px",
//             background:"#f8faff",
//             borderBottom:"1.5px solid #f1f5f9",
//           }}>
//             {["Product", "Qty", "Price (₹)", "GST %", "Amount (₹)", ""].map((h,i) => (
//               <span key={i} style={{
//                 fontSize:10.5, fontWeight:700, color:"#6366f1",
//                 letterSpacing:".09em", textTransform:"uppercase",
//                 textAlign: i > 0 ? "center" : "left",
//               }}>{h}</span>
//             ))}
//           </div>

//           {/* Rows */}
//           <div style={{ padding:"8px 12px" }} ref={suggestRef}>
//             {rows.map((r, i) => (
//               <div key={i} className="row-enter" style={{
//                 display:"grid",
//                 gridTemplateColumns:"2fr 110px 100px 90px 100px 36px",
//                 gap:8, alignItems:"center",
//                 padding:"8px",
//                 borderBottom: i < rows.length - 1 ? "1px dashed #e2e8f0" : "none",
//                 borderRadius:12,
//                 background: r.name ? "rgba(238,242,255,.3)" : "transparent",
//                 transition:"background .2s",
//               }}>

//                 {/* Product search */}
//                 <div style={{ position:"relative" }}>
//                   <input
//                     className="bill-input"
//                     value={r.name}
//                     placeholder="Search product..."
//                     onFocus={() => {
//                       setSuggestions(products.filter(p => p.stock > 0));
//                       setActiveIndex(i);
//                     }}
//                     onChange={e => handleSearch(e.target.value, i)}
//                     style={{ fontSize:13.5 }}
//                   />
//                   {/* unit badge */}
//                   {r.unit && (
//                     <span style={{
//                       position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
//                       fontSize:10.5, fontWeight:700, color:"#6366f1",
//                       background:"#eef2ff", borderRadius:6, padding:"2px 7px",
//                     }}>{r.unit}</span>
//                   )}

//                   {/* Suggestions */}
//                   {activeIndex === i && suggestions.length > 0 && (
//                     <div style={{
//                       position:"absolute", top:"calc(100% + 6px)", left:0, right:0,
//                       background:"#fff", border:"1.5px solid #c7d2fe",
//                       borderRadius:12, zIndex:9999, maxHeight:200, overflowY:"auto",
//                       boxShadow:"0 12px 40px rgba(99,102,241,.2)",
//                       animation:"slideDown .2s ease both",
//                     }}>
//                       {suggestions.map(s => (
//                         <div key={s.id} className="suggest-item"
//                           onMouseDown={() => selectProduct(s, i)}>
//                           <span style={{ fontWeight:600 }}>{s.product_name}</span>
//                           <span style={{
//                             fontSize:11.5, color: s.stock < 5 ? "#ef4444" : "#059669",
//                             fontWeight:700, background: s.stock < 5 ? "#fef2f2" : "#f0fdf4",
//                             borderRadius:6, padding:"2px 8px",
//                           }}>
//                             Stock: {s.stock}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Qty */}
//                 <div style={{ display:"flex", alignItems:"center", gap:5, justifyContent:"center" }}>
//                   <button className="qty-btn" onClick={() => updateRow(i, "qty", Math.max(1, r.qty - 1))}>−</button>
//                   <input
//                     type="number"
//                     className="bill-input"
//                     value={r.qty}
//                     min={1}
//                     onChange={e => updateRow(i, "qty", e.target.value)}
//                     style={{ textAlign:"center", width:44, padding:"8px 4px", fontSize:14, fontWeight:700 }}
//                   />
//                   <button className="qty-btn" onClick={() => updateRow(i, "qty", r.qty + 1)}>+</button>
//                 </div>

//                 {/* Price */}
//                 <div style={{ textAlign:"center" }}>
//                   <span style={{
//                     fontSize:14.5, fontWeight:700, color:"#1e293b",
//                     display:"block",
//                   }}>
//                     {r.price > 0 ? `₹${r.price.toFixed(2)}` : <span style={{color:"#cbd5e1"}}>—</span>}
//                   </span>
//                   {r.qty > 1 && r.price > 0 && (
//                     <span style={{ fontSize:10.5, color:"#94a3b8" }}>
//                       ×{r.qty} = ₹{(r.price * r.qty).toFixed(2)}
//                     </span>
//                   )}
//                 </div>

//                 {/* GST % */}
//                 <div style={{ textAlign:"center" }}>
//                   {r.gst > 0 ? (
//                     <div>
//                       <span style={{
//                         fontSize:13, fontWeight:700, color:"#d97706",
//                         background:"#fef3c7", borderRadius:8,
//                         padding:"3px 10px", display:"inline-block",
//                         border:"1px solid #fde68a",
//                       }}>
//                         {r.gst}%
//                       </span>
//                       {r.price > 0 && (
//                         <span style={{ fontSize:10.5, color:"#94a3b8", display:"block", marginTop:2 }}>
//                           ₹{((r.price * r.qty * r.gst) / 100).toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                   ) : (
//                     <span style={{ color:"#cbd5e1", fontSize:13 }}>—</span>
//                   )}
//                 </div>

//                 {/* Row Total = price*qty + gst */}
//                 <div style={{ textAlign:"center" }}>
//                   {r.price > 0 ? (
//                     <span style={{
//                       fontSize:15, fontWeight:800, color:"#4338ca",
//                     }}>
//                       ₹{rowAmount(r).toFixed(2)}
//                     </span>
//                   ) : (
//                     <span style={{ color:"#cbd5e1" }}>—</span>
//                   )}
//                 </div>

//                 {/* Delete */}
//                 <button className="del-btn" onClick={() => deleteRow(i)}>×</button>
//               </div>
//             ))}
//           </div>

//           {/* Add row button */}
//           <div style={{ padding:"10px 20px 18px" }}>
//             <button
//               onClick={() => setRows([...rows, emptyRow()])}
//               style={{
//                 display:"flex", alignItems:"center", gap:7,
//                 background:"transparent", border:"1.5px dashed #c7d2fe",
//                 borderRadius:12, padding:"9px 18px", cursor:"pointer",
//                 color:"#6366f1", fontWeight:600, fontSize:13.5,
//                 fontFamily:"'Outfit',sans-serif", transition:"all .2s",
//               }}
//               onMouseEnter={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.style.borderColor="#818cf8";}}
//               onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#c7d2fe";}}
//             >
//               <span style={{ fontSize:18, lineHeight:1 }}>+</span> Add Product Row
//             </button>
//           </div>
//         </div>

//         {/* ── Summary + Payment ── */}
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:18, alignItems:"start" }}>

          

//           {/* Payment */}
//           <div style={{
//             background:"#fff", borderRadius:20,
//             boxShadow:"0 4px 24px rgba(99,102,241,.1)",
//             border:"1.5px solid rgba(199,210,254,.5)",
//             padding:"22px 24px",
//             animation:"slideUp .4s ease .15s both",
//           }}>
//             <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
//               <div style={{
//                 width:28, height:28, borderRadius:8,
//                 background:"linear-gradient(135deg,#4338ca,#6366f1)",
//                 display:"flex", alignItems:"center", justifyContent:"center",
//               }}>
//                 <span style={{ color:"#fff", fontSize:12 }}>💳</span>
//               </div>
//               <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
//                 Payment
//               </span>
//             </div>

//  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
//                 <span style={{ color:"#64748b", fontSize:14 }}>Sub Total <span style={{ fontSize:11, color:"#94a3b8" }}>(excl. GST)</span></span>
//                 <span style={{ fontWeight:700, color:"#1e293b", fontSize:14 }}>₹{subtotal.toFixed(2)}</span>
//               </div>


//                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
//                 <span style={{ color:"#64748b", fontSize:14 }}>GST Total</span>
//                 <span style={{ fontWeight:700, color:"#d97706", fontSize:14 }}>₹{gstTotal.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display:"flex", justifyContent:"space-between",
//                 background:"linear-gradient(135deg,#eef2ff,#e0e7ff)",
//                 borderRadius:12, padding:"12px 16px", marginTop:8,
//                 border:"1.5px solid #c7d2fe",
//               }}>
//                 <span style={{ fontWeight:800, color:"#312e81", fontSize:16 }}>Grand Total</span>
//                 <span style={{ fontWeight:900, color:"#4338ca", fontSize:18 }}>₹{total.toFixed(2)}</span>
//               </div>

              
//             {/* Payment method */}
//             <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
//               Payment Method
//             </label>
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
//               {[
//                 { val:"cash",  label:"💵 Cash" },
//                 { val:"upi",   label:"📲 UPI" },
//                 { val:"card",  label:"💳 Card" },
//               ].map(m => (
//                 <button key={m.val}
//                   onClick={() => setPayment(p => ({...p, method: m.val}))}
//                   style={{
//                     padding:"10px 6px", borderRadius:12, cursor:"pointer",
//                     fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700,
//                     border: payment.method === m.val ? "2px solid #6366f1" : "1.5px solid #e2e8f0",
//                     background: payment.method === m.val ? "linear-gradient(135deg,#eef2ff,#e0e7ff)" : "#f8faff",
//                     color: payment.method === m.val ? "#4338ca" : "#64748b",
//                     transition:"all .18s",
//                     boxShadow: payment.method === m.val ? "0 4px 12px rgba(99,102,241,.2)" : "none",
//                   }}
//                 >
//                   {m.label}
//                 </button>
//               ))}
//             </div>

//             {/* Received */}
//             <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
//               Amount Received (₹)
//             </label>
//             <input
//               type="number"
//               className="bill-input"
//               value={payment.received}
//               onChange={e => setPayment(p => ({...p, received: Number(e.target.value)}))}
//               style={{ fontSize:16, fontWeight:700, marginBottom:14 }}
//             />

//             {/* Balance */}
//             <div style={{
//               display:"flex", justifyContent:"space-between", alignItems:"center",
//               padding:"12px 16px", borderRadius:12, marginBottom:20,
//               background: balance < 0 ? "#fef2f2" : "#f0fdf4",
//               border: `1.5px solid ${balance < 0 ? "#fecaca" : "#bbf7d0"}`,
//             }}>
//               <span style={{ fontWeight:700, color: balance < 0 ? "#dc2626" : "#059669", fontSize:14 }}>
//                 {balance < 0 ? "Balance Due" : "Change Return"}
//               </span>
//               <span style={{ fontWeight:900, fontSize:16, color: balance < 0 ? "#dc2626" : "#059669" }}>
//                 ₹{Math.abs(balance).toFixed(2)}
//               </span>
//             </div>

//             {/* Generate */}
//             <button className="gen-btn" onClick={handleGenerate} disabled={generating}>
//               {generating ? (
//                 <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
//                   <span style={{ width:16,height:16,border:"2.5px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
//                   Generating…
//                 </span>
//               ) : "🧾 Generate Invoice"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* ── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

  @keyframes slideDown  { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
  @keyframes slideUp    { from{opacity:0;transform:translateY(10px)}  to{opacity:1;transform:none} }
  @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
  @keyframes toastIn    { from{opacity:0;transform:translateX(120px)} to{opacity:1;transform:none} }
  @keyframes toastOut   { from{opacity:1;transform:none} to{opacity:0;transform:translateX(120px)} }
  @keyframes spin       { to{transform:rotate(360deg)} }
  @keyframes rowPop     { 0%{opacity:0;transform:translateX(-8px)} 100%{opacity:1;transform:none} }

  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Outfit',sans-serif; }

  .bill-input {
    width:100%; background:rgba(248,250,255,0.9);
    border:1.5px solid #e2e8f0; border-radius:10px;
    padding:9px 13px; color:#1e293b; font-size:14px;
    font-family:'Outfit',sans-serif; outline:none;
    transition:all .2s;
  }
  .bill-input:focus {
    border-color:#6366f1 !important;
    box-shadow:0 0 0 3px rgba(99,102,241,.12) !important;
    background:#fff !important;
  }
  .bill-input::placeholder { color:#94a3b8; }

  /* Remove number input spinners */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
  input[type=number] { -moz-appearance:textfield; }

  .row-enter { animation:rowPop .25s ease both; }

  .qty-btn {
    width:16px; height:16px; border-radius:8px; border:none;
    background:linear-gradient(135deg,#6366f1,#818cf8);
    color:#fff; font-size:16px; cursor:pointer; display:flex;
    align-items:center; justify-content:center; flex-shrink:0;
    transition:all .15s;
  }
  .qty-btn:hover { transform:scale(1.1); box-shadow:0 4px 12px rgba(99,102,241,.4); }
  .qty-btn:active { transform:scale(.95); }

  .del-btn {
    width:30px; height:30px; border-radius:8px; border:none;
    background:rgba(239,68,68,.08); color:#ef4444; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:all .15s; font-size:16px; flex-shrink:0;
  }
  .del-btn:hover { background:rgba(239,68,68,.18); transform:scale(1.1); }

  .gen-btn {
    width:100%; padding:14px; border:none; border-radius:14px;
    background:linear-gradient(135deg,#4f46e5,#6366f1,#818cf8);
    color:#fff; font-size:15px; font-weight:700;
    font-family:'Outfit',sans-serif; cursor:pointer;
    box-shadow:0 8px 24px rgba(99,102,241,.35);
    transition:all .22s; letter-spacing:.02em;
  }
  .gen-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(99,102,241,.45); }
  .gen-btn:active { transform:translateY(0); }
  .gen-btn:disabled { opacity:.65; cursor:not-allowed; transform:none; }

  .suggest-item {
    padding:10px 14px; cursor:pointer;
    font-family:'Outfit',sans-serif; font-size:13.5px; color:#334155;
    transition:background .15s; border-bottom:1px solid #f1f5f9;
    display:flex; justify-content:space-between; align-items:center;
  }
  .suggest-item:hover { background:#eef2ff; }
  .suggest-item:last-child { border-bottom:none; }
`;

/* ── SVG Icons ───────────────────────────────────────────────────────────── */
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconBox = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
);

const IconCard = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const IconReceipt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z"/>
    <line x1="9" y1="9" x2="15" y2="9"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
  </svg>
);

/* ── Toast ──────────────────────────────────────────────────────────────── */
function Toast({ toasts }) {
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:99999, display:"flex", flexDirection:"column", gap:10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display:"flex", alignItems:"center", gap:10,
          background: t.type === "success"
            ? "linear-gradient(135deg,#059669,#10b981)"
            : t.type === "error"
            ? "linear-gradient(135deg,#dc2626,#ef4444)"
            : "linear-gradient(135deg,#d97706,#f59e0b)",
          color:"#fff", borderRadius:12, padding:"13px 18px",
          fontWeight:600, fontSize:13.5,
          boxShadow:"0 8px 28px rgba(0,0,0,.18)",
          animation:"toastIn .35s cubic-bezier(.4,0,.2,1) both",
          fontFamily:"'Outfit',sans-serif", minWidth:260, maxWidth:340,
        }}>
          <span style={{
            width:22, height:22, borderRadius:6,
            background:"rgba(255,255,255,.22)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, fontWeight:900, flexShrink:0,
          }}>
            {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "!"}
          </span>
          <span style={{ flex:1 }}>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function Billing() {
  const [rows, setRows]               = useState([emptyRow()]);
  const [products, setProducts]       = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [customer, setCustomer]       = useState({ name: "", phone: "" });
  const [payment, setPayment]         = useState({ method: "cash", received:0 });
  const [generating, setGenerating]   = useState(false);
  const [toasts, setToasts]           = useState([]);
  const suggestRef                    = useRef(null);
  const navigate                      = useNavigate();

  function emptyRow() {
    return { product_id: null, name: "", price: 0, qty: 0, gst: 0, unit: "", stock: 0 };
  }

  const showToast = (msg, type = "error") => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };

  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = GLOBAL_CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.company_id) return;
    api.get("/product/get.php", { params: { company_id: user.company_id } })
       .then(r => { if (r.data.status) setProducts(r.data.data); });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) {
        setSuggestions([]); setActiveIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const gstTotal = rows.reduce((s, r) => s + (r.price * r.qty * r.gst) / 100, 0);
  const total    = subtotal + gstTotal;
  const received = parseFloat(payment.received) || 0;
  const balance  = received - total;

   useEffect(() => {
  setPayment((prev) => ({
    ...prev,
    received: total
  }));
}, [total]);
  const handleSearch = (value, index) => {
    updateRow(index, "name", value);
    const filtered = value
      ? products.filter(p => p.stock > 0 && p.product_name.toLowerCase().includes(value.toLowerCase()))
      : products.filter(p => p.stock > 0);
    setSuggestions(filtered);
    setActiveIndex(index);
  };

  const selectProduct = async (product, index) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res  = await api.get("/product/get_by_id.php", {
      params: { id: product.id, company_id: user.company_id }
    });
    if (!res.data.status) return;
    const p = res.data.data;

    const updated = [...rows];
    updated[index] = {
      product_id: p.id,
      name:  p.product_name,
      price: Number(p.price),
      gst:   Number(p.gst_percentage),
      qty:   1,
      unit:  p.unit,
      stock: Number(p.stock),
    };

    const last = updated[updated.length - 1];
    if (last.name && last.price > 0) updated.push(emptyRow());

    setRows(updated);
    setSuggestions([]);
    setActiveIndex(null);
  };

  const updateRow = (i, field, value) => {
    const updated = [...rows];
    if (field === "qty") {
      const num = Number(value);
      if (updated[i].stock && num > updated[i].stock) {
        showToast(`Only ${updated[i].stock} items in stock!`, "warning");
        updated[i][field] = updated[i].stock;
      } else {
        updated[i][field] = num < 0 ? 0 : num;
      }
    } else {
      updated[i][field] = value;
    }
    setRows(updated);
  };

  const deleteRow = (i) => {
    if (rows.length === 1) { setRows([emptyRow()]); return; }
    setRows(rows.filter((_, idx) => idx !== i));
  };

  const validRows = rows.filter(r => r.name && r.price > 0 && r.qty > 0);

  const handleGenerate = async () => {
    if (!customer.name.trim()) { showToast("Customer name is required!", "error"); return; }
    if (!/^[0-9]{10}$/.test(customer.phone)) { showToast("Enter a valid 10-digit phone number!", "error"); return; }
    if (validRows.length === 0) { showToast("Add at least one product!", "error"); return; }
    if (received <= 0) { showToast("Enter received amount!", "error"); return; }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.company_id) { showToast("Company ID missing!", "error"); return; }

    setGenerating(true);
    try {
      const res = await api.post("/invoice/create_invoice.php", {
        company_id:     user.company_id,
        customer_name:  customer.name,
        customer_phone: customer.phone,
        products:       validRows,
        sub_total:      parseFloat(subtotal.toFixed(2)),
        gst_total:      parseFloat(gstTotal.toFixed(2)),
        total_amount:   parseFloat(total.toFixed(2)),
        paid_amount:    received,
        balance_amount: parseFloat(balance.toFixed(2)),
        payment_method: payment.method,
      });
      if (res.data.status) {
        showToast("Invoice generated!", "success");
        setTimeout(() => navigate(`/invoice/${res.data.invoice_no}`), 800);
      } else {
        showToast(res.data.message || "Something went wrong", "error");
      }
    } catch {
      showToast("Server error. Try again!", "error");
    }
    setGenerating(false);
  };

  const rowAmount = (r) => {
    const base   = r.price * r.qty;
    const gstAmt = (base * r.gst) / 100;
    return base + gstAmt;
  };

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div style={{ minHeight:"100vh", background:"#f1f5fb", fontFamily:"'Outfit',sans-serif" }}>
      <Toast toasts={toasts}/>

      {/* ── Top Header ── */}
      <div style={{
        background:"linear-gradient(135deg,#312e81 0%,#4338ca 50%,#6366f1 100%)",
        padding:"22px 32px 60px", position:"relative", overflow:"hidden",
      }}>
        {[{s:200,t:-60,r:-50,op:.08},{s:120,t:10,r:160,op:.06},{s:70,b:-20,l:80,op:.07}].map((c,i)=>(
          <div key={i} style={{
            position:"absolute", top:c.t, right:c.r, bottom:c.b, left:c.l,
            width:c.s, height:c.s, borderRadius:"50%",
            background:`rgba(255,255,255,${c.op})`, pointerEvents:"none",
          }}/>
        ))}
        <div style={{ position:"relative" }}>
          <h1 style={{ fontSize:28, fontWeight:900, color:"#fff", fontFamily:"'Syne',sans-serif", letterSpacing:"-.02em" }}>
            Invoice Billing
          </h1>
          <p style={{ fontSize:13.5, color:"rgba(255,255,255,.65)", marginTop:3, fontWeight:400 }}>
            Create and manage customer invoices
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding:"0 28px 40px", marginTop:-38 }}>

        {/* ── Customer Card ── */}
        <div style={{
          background:"#fff", borderRadius:20,
          boxShadow:"0 4px 24px rgba(99,102,241,.1), 0 1px 4px rgba(0,0,0,.05)",
          border:"1.5px solid rgba(199,210,254,.5)",
          padding:"22px 24px", marginBottom:18,
          animation:"slideDown .4s ease both",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <div style={{
              width:28, height:28, borderRadius:8,
              background:"linear-gradient(135deg,#4338ca,#6366f1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 10px rgba(99,102,241,.35)",
            }}>
              <IconUser />
            </div>
            <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
              Bill To
            </span>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div>
              <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
                Customer Name *
              </label>
              <input
                className="bill-input"
                placeholder="Enter customer name"
                value={customer.name}
                onChange={e => setCustomer({...customer, name: e.target.value})}
              />
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
                Phone Number *
              </label>
              <input
                className="bill-input"
                placeholder="10-digit phone"
                value={customer.phone}
                maxLength={10}
                onChange={e => setCustomer({...customer, phone: e.target.value.replace(/\D/g,"").slice(0,10)})}
              />
            </div>
          </div>
        </div>

        {/* ── Products Card ── */}
        <div style={{
          background:"#fff", borderRadius:20,
          boxShadow:"0 4px 24px rgba(99,102,241,.1), 0 1px 4px rgba(0,0,0,.05)",
          border:"1.5px solid rgba(199,210,254,.5)",
          marginBottom:18, overflow:"visible",
          animation:"slideDown .4s ease .05s both",
        }}>
          {/* Card header */}
          <div style={{
            padding:"18px 24px 14px",
            borderBottom:"1.5px solid #f1f5f9",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:28, height:28, borderRadius:8,
                background:"linear-gradient(135deg,#4338ca,#6366f1)",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 4px 10px rgba(99,102,241,.35)",
              }}>
                <IconBox />
              </div>
              <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
                Products
              </span>
            </div>
            <span style={{
              fontSize:11.5, fontWeight:700, color:"#6366f1",
              background:"#eef2ff", borderRadius:20, padding:"4px 12px",
              border:"1px solid #c7d2fe",
            }}>
              {validRows.length} item{validRows.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Table header */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"2fr 110px 100px 90px 100px 36px",
            gap:8, padding:"10px 20px",
            background:"#f8faff",
            borderBottom:"1.5px solid #f1f5f9",
          }}>
            {["Product","Qty","Price (₹)","GST %","Amount (₹)",""].map((h,i) => (
              <span key={i} style={{
                fontSize:10.5, fontWeight:700, color:"#6366f1",
                letterSpacing:".09em", textTransform:"uppercase",
                textAlign: i > 0 ? "center" : "left",
              }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          <div style={{ padding:"8px 12px" }} ref={suggestRef}>
            {rows.map((r, i) => (
              <div key={i} className="row-enter" style={{
                display:"grid",
                gridTemplateColumns:"2fr 110px 100px 90px 100px 36px",
                gap:8, alignItems:"center",
                padding:"8px",
                borderBottom: i < rows.length - 1 ? "1px dashed #e2e8f0" : "none",
                borderRadius:12,
                background: r.name ? "rgba(238,242,255,.3)" : "transparent",
                transition:"background .2s",
              }}>

                {/* Product search */}
                <div style={{ position:"relative" }}>
                  <input
                    className="bill-input"
                    value={r.name}
                    placeholder="Search product..."
                    onFocus={() => {
                      setSuggestions(products.filter(p => p.stock > 0));
                      setActiveIndex(i);
                    }}
                    onChange={e => handleSearch(e.target.value, i)}
                    style={{ fontSize:13.5 }}
                  />
                  {/* {r.unit && (
                    <span style={{
                      position:"absolute", right:10, top:"50%", transform:"translateY(-50%)",
                      fontSize:10.5, fontWeight:700, color:"#6366f1",
                      background:"#eef2ff", borderRadius:6, padding:"2px 7px",
                    }}>{r.unit}</span>
                  )} */}
                  {activeIndex === i && suggestions.length > 0 && (
                    <div style={{
                      position:"absolute", top:"calc(100% + 6px)", left:0, right:0,
                      background:"#fff", border:"1.5px solid #c7d2fe",
                      borderRadius:12, zIndex:9999, maxHeight:200, overflowY:"auto",
                      boxShadow:"0 12px 40px rgba(99,102,241,.2)",
                      animation:"slideDown .2s ease both",
                    }}>
                      {suggestions.map(s => (
                        <div key={s.id} className="suggest-item"
                          onMouseDown={() => selectProduct(s, i)}>
                          <span style={{ fontWeight:600 }}>{s.product_name}</span>
                          <span style={{
                            fontSize:11.5, color: s.stock < 5 ? "#ef4444" : "#059669",
                            fontWeight:700, background: s.stock < 5 ? "#fef2f2" : "#f0fdf4",
                            borderRadius:6, padding:"2px 8px",
                          }}>
                            Stock: {s.stock}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Qty */}
                <div style={{ display:"flex", alignItems:"center", gap:5, justifyContent:"center" }}>
                  {/* <button className="qty-btn" onClick={() => updateRow(i, "qty", Math.max(1, r.qty - 1))}>−</button> */}
                 {/* Qty */}
<div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
  <input
    type="number"
    className="bill-input"
    value={r.qty}
    min={0}
    onChange={e => updateRow(i, "qty", e.target.value)}
    onWheel={e => e.target.blur()}
    style={{ textAlign:"center", width:70, padding:"8px 6px", fontSize:14, fontWeight:700 }}
  />
</div>
                  {/* <button className="qty-btn" onClick={() => updateRow(i, "qty", r.qty + 1)}>+</button> */}
                </div>

                {/* Price */}
                <div style={{ textAlign:"center" }}>
                  <span style={{ fontSize:14.5, fontWeight:700, color:"#1e293b", display:"block" }}>
                    {r.price > 0 ? `₹${r.price.toFixed(2)}` : <span style={{color:"#cbd5e1"}}>—</span>}
                  </span>
                  {r.qty > 1 && r.price > 0 && (
                    <span style={{ fontSize:10.5, color:"#94a3b8" }}>
                      ×{r.qty} = ₹{(r.price * r.qty).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* GST % */}
                <div style={{ textAlign:"center" }}>
                  {r.gst > 0 ? (
                    <div>
                      <span style={{
                        fontSize:13, fontWeight:700, color:"#d97706",
                        background:"#fef3c7", borderRadius:8,
                        padding:"3px 10px", display:"inline-block",
                        border:"1px solid #fde68a",
                      }}>
                        {r.gst}%
                      </span>
                      {r.price > 0 && (
                        <span style={{ fontSize:10.5, color:"#94a3b8", display:"block", marginTop:2 }}>
                          ₹{((r.price * r.qty * r.gst) / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span style={{ color:"#cbd5e1", fontSize:13 }}>—</span>
                  )}
                </div>

                {/* Row Total */}
                <div style={{ textAlign:"center" }}>
                  {r.price > 0 ? (
                    <span style={{ fontSize:15, fontWeight:800, color:"#4338ca" }}>
                      ₹{rowAmount(r).toFixed(2)}
                    </span>
                  ) : (
                    <span style={{ color:"#cbd5e1" }}>—</span>
                  )}
                </div>

                {/* Delete */}
                <button className="del-btn" onClick={() => deleteRow(i)}>×</button>
              </div>
            ))}
          </div>

          {/* Add row button */}
          <div style={{ padding:"10px 20px 18px" }}>
            <button
              onClick={() => setRows([...rows, emptyRow()])}
              style={{
                display:"flex", alignItems:"center", gap:7,
                background:"transparent", border:"1.5px dashed #c7d2fe",
                borderRadius:12, padding:"9px 18px", cursor:"pointer",
                color:"#6366f1", fontWeight:600, fontSize:13.5,
                fontFamily:"'Outfit',sans-serif", transition:"all .2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.style.borderColor="#818cf8";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="#c7d2fe";}}
            >
              <span style={{ fontSize:18, lineHeight:1 }}>+</span> Add Product Row
            </button>
          </div>
        </div>

        {/* ── Payment Card — right aligned ── */}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <div style={{
            background:"#fff", borderRadius:20,
            boxShadow:"0 4px 24px rgba(99,102,241,.1)",
            border:"1.5px solid rgba(199,210,254,.5)",
            padding:"22px 24px", width:400,
            animation:"slideUp .4s ease .15s both",
          }}>
            {/* Card header */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:18 }}>
              <div style={{
                width:28, height:28, borderRadius:8,
                background:"linear-gradient(135deg,#4338ca,#6366f1)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <IconCard />
              </div>
              <span style={{ fontWeight:700, fontSize:14, color:"#312e81", letterSpacing:".04em", textTransform:"uppercase" }}>
                Payment
              </span>
            </div>

            {/* Totals */}
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:14 }}>Sub Total <span style={{ fontSize:11, color:"#94a3b8" }}>(excl. GST)</span></span>
              <span style={{ fontWeight:700, color:"#1e293b", fontSize:14 }}>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ color:"#64748b", fontSize:14 }}>GST Total</span>
              <span style={{ fontWeight:700, color:"#d97706", fontSize:14 }}>₹{gstTotal.toFixed(2)}</span>
            </div>
            <div style={{
              display:"flex", justifyContent:"space-between",
              background:"linear-gradient(135deg,#eef2ff,#e0e7ff)",
              borderRadius:12, padding:"12px 16px", marginBottom:18,
              border:"1.5px solid #c7d2fe",
            }}>
              <span style={{ fontWeight:800, color:"#312e81", fontSize:16 }}>Grand Total</span>
              <span style={{ fontWeight:900, color:"#4338ca", fontSize:18 }}>₹{total.toFixed(2)}</span>
            </div>

            {/* Payment method */}
            <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
              Payment Method
            </label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
              {[
                { val:"cash", label:"Cash" },
                { val:"upi",  label:"UPI" },
                { val:"card", label:"Card" },
              ].map(m => (
                <button key={m.val}
                  onClick={() => setPayment(p => ({...p, method: m.val}))}
                  style={{
                    padding:"10px 6px", borderRadius:12, cursor:"pointer",
                    fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:700,
                    border: payment.method === m.val ? "2px solid #6366f1" : "1.5px solid #e2e8f0",
                    background: payment.method === m.val ? "linear-gradient(135deg,#eef2ff,#e0e7ff)" : "#f8faff",
                    color: payment.method === m.val ? "#4338ca" : "#64748b",
                    transition:"all .18s",
                    boxShadow: payment.method === m.val ? "0 4px 12px rgba(99,102,241,.2)" : "none",
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Amount Received — no spinner, no auto-fill */}
            <label style={{ fontSize:11, fontWeight:600, color:"#6366f1", letterSpacing:".08em", textTransform:"uppercase", display:"block", marginBottom:6 }}>
              Amount Received (₹)
            </label>
            <input
              type="number"
              className="bill-input"
              placeholder={`₹${total.toFixed(2)}`}
              value={payment.received}
              onChange={e => setPayment(p => ({...p, received: e.target.value}))}
              onWheel={(e) => e.target.blur()}
              style={{ fontSize:16, fontWeight:700, marginBottom:14 }}
            />

            {/* Balance */}
            {received > 0 && (
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"12px 16px", borderRadius:12, marginBottom:20,
                background: balance < 0 ? "#fef2f2" : "#f0fdf4",
                border: `1.5px solid ${balance < 0 ? "#fecaca" : "#bbf7d0"}`,
              }}>
                <span style={{ fontWeight:700, color: balance < 0 ? "#dc2626" : "#059669", fontSize:14 }}>
                  {balance < 0 ? "Balance Due" : "Change Return"}
                </span>
                <span style={{ fontWeight:900, fontSize:16, color: balance < 0 ? "#dc2626" : "#059669" }}>
                  ₹{Math.abs(balance).toFixed(2)}
                </span>
              </div>
            )}

            {/* Generate */}
            <button className="gen-btn" onClick={handleGenerate} disabled={generating}>
              {generating ? (
                <span style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center" }}>
                  <span style={{ width:16,height:16,border:"2.5px solid rgba(255,255,255,.4)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .7s linear infinite" }}/>
                  Generating…
                </span>
              ) : (
                <span style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}>
                  <IconReceipt /> Generate Invoice
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
