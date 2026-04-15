// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api, { API_BASE_URL } from "../../services/api";
// import html2pdf from "html2pdf.js";

// const DESIGNS = [
//   { id: "original",   label: "Original" },
//   { id: "classic",    label: "Classic" },
//   { id: "modern",     label: "Modern" },
//   { id: "bold",       label: "Bold" },
//   { id: "minimal",    label: "Minimal" },
//   { id: "corporate",  label: "Corporate" },
//   { id: "stripe",     label: "Stripe" },
// ];

// const COLORS = [
//   "#7c3aed","#2563eb","#16a34a","#dc2626",
//   "#ea580c","#0891b2","#db2777","#4b5563",
//   "#9333ea","#059669","#e11d48","#0284c7",
// ];

// /* ─── PRINT STYLES (injected once) ──────────────────────────────────────── */
// const PRINT_CSS = `
//   @media print {
//     body * { visibility: hidden !important; }
//     #invoice, #invoice * { visibility: visible !important; }
//     #invoice { position: fixed; top:0; left:0; width:100%; }
//     .no-print { display:none !important; }
//   }
// `;

// /* ═══════════════════════════════════════════════════════════════════════════
//    DESIGN RENDERERS
//    Each receives: { invoice, company, color, logoUrl }
//    Must return JSX that is clean for print (no box-shadow, no blur).
// ═══════════════════════════════════════════════════════════════════════════ */

// /* ── 0. Original ────────────────────────────────────────────────────────── */
// function DesignOriginal({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"'Times New Roman',serif",  color:"#1a1a1a", fontSize:13 }}>

//       {/* 🔥 ACTION BUTTONS */}
//       {/* <div className="flex gap-2 mb-4">
//         <button onClick={() => window.print()} className="bg-blue-600 text-white px-3 py-1 rounded">Print</button>
//         <button onClick={downloadPDF} className="bg-green-600 text-white px-3 py-1 rounded">PDF</button>
//         <button onClick={shareWhatsApp} className="bg-green-500 text-white px-3 py-1 rounded">WhatsApp</button>
//       </div> */}

//       {/* 🎨 COLOR DOT PICKER */}
//       {/* <div className="flex gap-2 mb-4 flex-wrap">
//         {colors.map((c) => (
//           <div
//             key={c}
//             onClick={() => setColor(c)}
//             className={`w-6 h-6 rounded-full cursor-pointer border-2 transition
//               ${color === c ? "scale-125 border-black" : "border-gray-300"}`}
//             style={{ backgroundColor: c }}
//           ></div>
//         ))}
//       </div> */}

//       {/* 📄 INVOICE */}
//       <div
//         id="invoice"
//         // className="border-t-4"
//         // style={{ borderColor: color }}
//       >

//         {/* HEADER */}
//         <div className="flex justify-between items-start border-b pb-4">
//           <div>
//             <h1 className="font-bold text-lg">{company?.company_name}</h1>
//             <p className="text-sm">{company?.company_address}</p>
//             <p className="text-sm">Phone: {company?.phone}</p>
//             <p className="text-sm">GSTIN: {company?.gstin}</p>
//             <p className="text-sm">
//   GST: {company?.gst_type }
// </p>
//           </div>

//           {company?.logo && (
//             <img
//               src={`${API_BASE_URL}${company.logo}`}
//               alt="logo"
//               className="w-20 h-20 object-cover"
//             />
//           )}
//         </div>

//         {/* TITLE */}
//         <h2 className="text-center font-semibold text-lg mt-4" style={{ color }}>
//           Tax Invoice
//         </h2>

//         {/* BILL DETAILS */}
//         <div className="flex justify-between mt-4 text-sm">
//           <div>
//             <p className="font-semibold">Bill To</p>
//             <p>{invoice.customer_name}</p>
//             <p>{invoice.customer_phone}</p>
//           </div>

//           <div className="text-right">
//             <p className="font-semibold">Invoice Details</p>
//             <p>Invoice No.: {invoice.invoice_no}</p>
//             <p>Date: {today}</p>
//           </div>
//         </div>

//         {/* TABLE */}
//         <table className="w-full mt-4 border text-sm">
//           <thead style={{ backgroundColor: color, color: "#fff" }}>
//             <tr>
//               <th className="border p-2">#</th>
//               <th className="border p-2">Item Name</th>
//               <th className="border p-2">Qty</th>
//               <th className="border p-2">Price</th>
//               <th className="border p-2">GST</th>
//               <th className="border p-2">Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {invoice.products.map((p, i) => {
//               const amount = p.price * p.qty;
//               const gstAmount = (amount * p.gst) / 100;

//               return (
//                 <tr key={i}>
//                   <td className="border p-2 text-center">{i + 1}</td>
// <td className="border p-2">
//   {p.display_name || `${p.name} `}
// </td>                  <td className="border p-2 text-center">{p.qty}</td>
//                   <td className="border p-2 text-right">₹{p.price}</td>
//                   <td className="border p-2 text-right">
//                     ₹{gstAmount.toFixed(2)} <br />
//                     <span className="text-xs">({p.gst}%)</span>
//                   </td>
//                   <td className="border p-2 text-right">
//                     ₹{(amount + gstAmount).toFixed(2)}
//                   </td>
//                 </tr>
//               );
//             })}

//             {/* TOTAL */}
//             <tr className="font-semibold">
//               <td colSpan="2" className="border p-2 text-right">Total</td>
//               <td className="border p-2 text-center">
//                 {invoice.products.reduce((s, p) => s + p.qty, 0)}
//               </td>
//               <td></td>
//               <td className="border p-2 text-right">₹{invoice.gst_total}</td>
//               <td className="border p-2 text-right">₹{invoice.total_amount}</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* SUMMARY */}
//         <div className="flex justify-end mt-6 text-sm">
//           <div className="w-1/3">

//             <div className="flex justify-between">
//               <span>Sub Total</span>
//               <span>₹{invoice.sub_total}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>GST</span>
//               <span>₹{invoice.gst_total}</span>
//             </div>

//             <div
//               className="flex justify-between mt-4 px-2 py-1 font-semibold"
//               style={{ backgroundColor: color, color: "#fff" }}
//             >
//               <span className="pb-2">Total</span>
//               <span className="pb-2">₹{invoice.total_amount}</span>
//             </div>

           

//             {/* <div className="flex justify-between">
//               <span>Balance</span>
//               <span>₹{invoice.balance_amount}</span>
//             </div> */}

//             <div className="flex justify-between mt-1">
//               <span>Payment</span>
//               <span className="font-semibold uppercase">
//                 {invoice.payment_method}
//               </span>
//             </div>

// <div className="flex justify-between px-2 py-2 font-bold text-xl mb-2"
//      style={{ color: color }}>
//   <span>Paid</span>
//   <span>₹{invoice.paid_amount}</span>
// </div>
//           </div>
//         </div>

//         {/* SIGN */}
//         {/* <div className="flex justify-end mt-10">
//           <div className="border-2 border-dashed p-6 text-center w-40">
//             <p className="text-sm mb-6">Authorized</p>
//             <p className="text-xs">Signature</p>
//           </div>
//         </div> */}

//       </div>
//     </div>
//     // <div style={{ fontFamily:"Arial,sans-serif", color:"#111", fontSize:13, borderTop:`4px solid ${color}` }}>
//     //   {/* Header */}
//     //   <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:"1px solid #ddd", paddingBottom:14, marginBottom:14, paddingTop:16 }}>
//     //     <div style={{ display:"flex", alignItems:"center", gap:14 }}>
//     //       {logoUrl && (
//     //         <img src={logoUrl} alt="logo" style={{ height:64, width:64, objectFit:"contain", border:"1px solid #eee", borderRadius:6, padding:3 }} />
//     //       )}
//     //       <div>
//     //         <div style={{ fontWeight:700, fontSize:18 }}>{company?.company_name}</div>
//     //         <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{company?.company_address}</div>
//     //         <div style={{ fontSize:11, color:"#555" }}>Phone: {company?.phone}</div>
//     //         <div style={{ fontSize:11, color:"#555" }}>GSTIN: {company?.gstin}</div>
//     //       </div>
//     //     </div>
//     //     <div style={{ textAlign:"right" }}>
//     //       <div style={{ fontWeight:600, fontSize:16, color }}>Tax Invoice</div>
//     //       <div style={{ fontSize:11, marginTop:4 }}>Invoice No.: <b>{invoice.invoice_no}</b></div>
//     //       <div style={{ fontSize:11 }}>Date: {today}</div>
//     //     </div>
//     //   </div>

//     //   {/* Bill Details */}
//     //   <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:14 }}>
//     //     <div>
//     //       <div style={{ fontWeight:600, marginBottom:2 }}>Bill To</div>
//     //       <div>{invoice.customer_name}</div>
//     //       <div style={{ color:"#555" }}>{invoice.customer_phone}</div>
//     //     </div>
//     //   </div>

//     //   {/* Table */}
//     //   <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//     //     <thead style={{ background:color, color:"#fff" }}>
//     //       <tr>
//     //         {["#","Item Name","Qty","Price","GST","Amount"].map(h => (
//     //           <th key={h} style={{ padding:"8px 10px", textAlign: h==="Item Name"||h==="#" ? "left" : "right", border:"1px solid rgba(255,255,255,.2)" }}>{h}</th>
//     //         ))}
//     //       </tr>
//     //     </thead>
//     //     <tbody>
//     //       {invoice.products.map((p, i) => {
//     //         const base = p.price * p.qty;
//     //         const gstAmt = (base * p.gst) / 100;
//     //         return (
//     //           <tr key={i}>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"center" }}>{i+1}</td>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px" }}>{p.display_name || `${p.name} `}</td>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>{p.qty}</td>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>₹{p.price}</td>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>
//     //               ₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#888"}}>({p.gst}%)</span>
//     //             </td>
//     //             <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right", fontWeight:600 }}>₹{(base+gstAmt).toFixed(2)}</td>
//     //           </tr>
//     //         );
//     //       })}
//     //       {/* Totals row */}
//     //       <tr style={{ fontWeight:600, background:"#f9f9f9" }}>
//     //         <td colSpan={2} style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>Total</td>
//     //         <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>{invoice.products.reduce((s,p)=>s+p.qty,0)}</td>
//     //         <td style={{ border:"1px solid #ddd" }}></td>
//     //         <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>₹{invoice.gst_total}</td>
//     //         <td style={{ border:"1px solid #ddd", padding:"7px 10px", textAlign:"right" }}>₹{invoice.total_amount}</td>
//     //       </tr>
//     //     </tbody>
//     //   </table>

//     //   {/* Summary */}
//     //   <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18 }}>
//     //     <div style={{ width:"33%" }}>
//     //       <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
//     //         <span>Sub Total</span><span>₹{invoice.sub_total}</span>
//     //       </div>
//     //       <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
//     //         <span>GST</span><span>₹{invoice.gst_total}</span>
//     //       </div>
//     //       <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 8px", fontWeight:600, fontSize:15, background:color, color:"#fff", marginTop:6 }}>
//     //         <span>Total</span><span>₹{invoice.total_amount}</span>
//     //       </div>
//     //       <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:13 }}>
//     //         <span style={{ color:"#555" }}>Payment</span>
//     //         <span style={{ fontWeight:600, textTransform:"uppercase" }}>{invoice.payment_method}</span>
//     //       </div>
//     //       <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:16, fontWeight:700, color }}>
//     //         <span>Paid</span><span>₹{invoice.paid_amount}</span>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

// /* ── 1. Classic ─────────────────────────────────────────────────────────── */
// function DesignClassic({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"'Times New Roman',serif", color:"#1a1a1a", fontSize:13 }}>
//       {/* Header */}
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:`3px double ${color}`, paddingBottom:14, marginBottom:14 }}>
//         <div>
//           {logoUrl && <img src={logoUrl} alt="logo" style={{ height:52, marginBottom:8, objectFit:"contain" }} />}
//           <div style={{ fontWeight:700, fontSize:18 }}>{company?.company_name}</div>
//           <div style={{ fontSize:11, color:"#555" }}>{company?.company_address}</div>
//           <div style={{ fontSize:11, color:"#555" }}>Ph: {company?.phone} &nbsp;|&nbsp; GSTIN: {company?.gstin}</div>
//           <p style={{ fontSize:11, color:"#555" }}>
//             GST: {company?.gst_type}
//           </p>
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ fontSize:22, fontWeight:700, color, letterSpacing:1 }}>TAX INVOICE</div>
//           <div style={{ fontSize:11, marginTop:4 }}>No: <b>{invoice.invoice_no}</b></div>
//           <div style={{ fontSize:11 }}>Date: <b>{today}</b></div>
//         </div>
//       </div>

//       {/* Bill To */}
//       <div style={{ marginBottom:14 }}>
//         <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#888", marginBottom:3 }}>Billed To</div>
//         <div style={{ fontWeight:700 }}>{invoice.customer_name}</div>
//         <div style={{ fontSize:11 }}>{invoice.customer_phone}</div>
//       </div>

//       {/* Table */}
//       <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//         <thead>
//           <tr style={{ background:color, color:"#fff" }}>
//             {["#","Item","Qty","Price","GST","Amount"].map(h => (
//               <th key={h} style={{ padding:"7px 10px", textAlign: h==="Item"||h==="#" ? "left" : "right", borderBottom:`2px solid ${color}` }}>{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {invoice.products.map((p, i) => {
//             const base = p.price * p.qty;
//             const gstAmt = (base * p.gst) / 100;
//             return (
//               <tr key={i} style={{ background: i%2===0 ? "#fafafa" : "#fff" }}>
//                 <td style={{ padding:"6px 10px", borderBottom:"1px solid #eee" }}>{i+1}</td>
//                 <td style={{ padding:"6px 10px", borderBottom:"1px solid #eee" }}>{p.display_name || `${p.name} `}</td>
//                 <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>{p.qty}</td>
//                 <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>₹{p.price}</td>
//                 <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10}}>({p.gst}%)</span></td>
//                 <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee", fontWeight:600 }}>₹{(base+gstAmt).toFixed(2)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Summary */}
//       <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
//         <table style={{ fontSize:12, width:220 }}>
//           <tbody>
//             <tr><td style={{ padding:"4px 0", color:"#555" }}>Sub Total</td><td style={{ textAlign:"right", padding:"4px 0" }}>₹{invoice.sub_total}</td></tr>
//             <tr><td style={{ padding:"4px 0", color:"#555" }}>GST</td><td style={{ textAlign:"right", padding:"4px 0" }}>₹{invoice.gst_total}</td></tr>
//             <tr style={{ borderTop:`2px solid ${color}` }}>
//               <td style={{ padding:"6px 0", fontWeight:700, fontSize:14 }}>Total</td>
//               <td style={{ textAlign:"right", fontWeight:700, fontSize:14, color }}>₹{invoice.total_amount}</td>
//             </tr>
//             <tr><td style={{ padding:"4px 0", color:"#555" }}>Payment</td><td style={{ textAlign:"right", textTransform:"uppercase", fontWeight:600 }}>{invoice.payment_method}</td></tr>
//             <tr><td style={{ padding:"4px 0", color:"#555" }}>Paid</td><td style={{ textAlign:"right", fontWeight:700, color }}>₹{invoice.paid_amount}</td></tr>
//           </tbody>
//         </table>
//       </div>

//       <div style={{ marginTop:24, borderTop:`1px solid #ddd`, paddingTop:10, fontSize:10, color:"#aaa", textAlign:"center" }}>
//         Thank you for your business!
//       </div>
//     </div>
//   );
// }

// /* ── 2. Modern ──────────────────────────────────────────────────────────── */
// function DesignModern({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", color:"#1e293b", fontSize:13 }}>
//       {/* Top accent bar */}
//       <div style={{ height:5, background:color, marginBottom:0 }} />

//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 0 14px", borderBottom:"1px solid #e2e8f0" }}>
//         <div>
//           {logoUrl && <img src={logoUrl} alt="logo" style={{ height:44, marginBottom:6, objectFit:"contain" }} />}
//           <div style={{ fontWeight:700, fontSize:16, color:"#0f172a" }}>{company?.company_name}</div>
//           <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{company?.company_address}</div>
//           <div style={{ fontSize:11, color:"#64748b" }}>Ph: {company?.phone} &nbsp;·&nbsp; GSTIN: {company?.gstin}</div>
//         <p  style={{ fontSize:11, color:"#64748b" }}>
//   GST: {company?.gst_type}
// </p>
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ display:"inline-block", background:color, color:"#fff", fontWeight:700, fontSize:13, padding:"5px 18px", borderRadius:20, letterSpacing:1 }}>TAX INVOICE</div>
//           <div style={{ fontSize:11, marginTop:8, color:"#475569" }}>Invoice No: <b style={{color:"#0f172a"}}>{invoice.invoice_no}</b></div>
//           <div style={{ fontSize:11, color:"#475569" }}>Date: <b style={{color:"#0f172a"}}>{today}</b></div>
//         </div>
//       </div>

//       {/* Bill To */}
//       <div style={{ margin:"14px 0", padding:"10px 14px", background:"#f8fafc", borderLeft:`3px solid ${color}`, borderRadius:"0 6px 6px 0" }}>
//         <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:3 }}>Bill To</div>
//         <div style={{ fontWeight:600, fontSize:14 }}>{invoice.customer_name}</div>
//         <div style={{ fontSize:12, color:"#64748b" }}>{invoice.customer_phone}</div>
//       </div>

//       {/* Table */}
//       <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//         <thead>
//           <tr>
//             {["#","Item","Qty","Price","GST","Amount"].map(h => (
//               <th key={h} style={{ padding:"8px 10px", textAlign: h==="Item"||h==="#" ? "left" : "right", background:"#f1f5f9", color:"#475569", fontSize:10, textTransform:"uppercase", letterSpacing:.5, borderBottom:`2px solid ${color}` }}>{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {invoice.products.map((p, i) => {
//             const base = p.price * p.qty;
//             const gstAmt = (base * p.gst) / 100;
//             return (
//               <tr key={i}>
//                 <td style={{ padding:"7px 10px", borderBottom:"1px solid #f1f5f9", color:"#94a3b8" }}>{i+1}</td>
//                 <td style={{ padding:"7px 10px", borderBottom:"1px solid #f1f5f9", fontWeight:500 }}>{p.display_name || `${p.name} `}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>{p.qty}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>₹{p.price}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#94a3b8"}}>({p.gst}%)</span></td>
//                 <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9", fontWeight:600, color }}>₹{(base+gstAmt).toFixed(2)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Summary */}
//       <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
//         <div style={{ width:230 }}>
//           {[["Sub Total", `₹${invoice.sub_total}`],["GST", `₹${invoice.gst_total}`]].map(([k,v]) => (
//             <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12, color:"#64748b" }}>
//               <span>{k}</span><span style={{color:"#0f172a"}}>{v}</span>
//             </div>
//           ))}
//           <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, padding:"8px 12px", background:color, borderRadius:8, color:"#fff", fontWeight:700, fontSize:15 }}>
//             <span>Grand Total</span><span>₹{invoice.total_amount}</span>
//           </div>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:12, color:"#64748b", marginTop:4 }}>
//             <span>Payment Method</span><span style={{textTransform:"uppercase",fontWeight:600,color:"#0f172a"}}>{invoice.payment_method}</span>
//           </div>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:13, fontWeight:700, color }}>
//             <span>Paid</span><span>₹{invoice.paid_amount}</span>
//           </div>
//         </div>
//       </div>

//       <div style={{ marginTop:20, fontSize:10, color:"#cbd5e1", textAlign:"center", borderTop:"1px solid #f1f5f9", paddingTop:8 }}>
//         Thank you for your business · {company?.company_name}
//       </div>
//     </div>
//   );
// }

// /* ── 3. Bold ────────────────────────────────────────────────────────────── */
// function DesignBold({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"Arial,sans-serif", color:"#111", fontSize:13 }}>
//       {/* Full-color header block */}
//       <div style={{ background:color, color:"#fff", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <div>
//           {logoUrl && <img src={logoUrl} alt="logo" style={{ height:44, marginBottom:6, }} />}
//           <div style={{ fontWeight:700, fontSize:20 }}>{company?.company_name}</div>
//           <div style={{ fontSize:11, opacity:.85, marginTop:2 }}>{company?.company_address}</div>
//           <div style={{ fontSize:11, opacity:.85 }}>Ph: {company?.phone} · GSTIN: {company?.gstin}</div>
//         <p  style={{ fontSize:11, opacity:.85 }}>
//   GST: {company?.gst_type }
// </p>
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ fontWeight:900, fontSize:28, letterSpacing:2, opacity:.9 }}>INVOICE</div>
//           <div style={{ fontSize:12, marginTop:4 }}>#{invoice.invoice_no}</div>
//           <div style={{ fontSize:12 }}>{today}</div>
//         </div>
//       </div>

//       <div style={{ padding:"0 24px" }}>
//         {/* Bill To */}
//         <div style={{ margin:"16px 0 14px", display:"flex", justifyContent:"space-between" }}>
//           <div>
//             <div style={{ fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#888", marginBottom:3 }}>Bill To</div>
//             <div style={{ fontWeight:700, fontSize:15 }}>{invoice.customer_name}</div>
//             <div style={{ fontSize:12, color:"#555" }}>{invoice.customer_phone}</div>
//           </div>
//         </div>

//         {/* Table */}
//         <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//           <thead>
//             <tr style={{ borderBottom:`3px solid ${color}` }}>
//               {["#","Item","Qty","Price","GST","Amount"].map(h => (
//                 <th key={h} style={{ padding:"7px 8px", textAlign: h==="Item"||h==="#" ? "left" : "right", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:.5, color:"#333" }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.products.map((p, i) => {
//               const base = p.price * p.qty;
//               const gstAmt = (base * p.gst) / 100;
//               return (
//                 <tr key={i} style={{ borderBottom:"1px solid #eee" }}>
//                   <td style={{ padding:"7px 8px", color:"#aaa" }}>{i+1}</td>
//                   <td style={{ padding:"7px 8px", fontWeight:600 }}>{p.display_name || `${p.name} `}</td>
//                   <td style={{ padding:"7px 8px", textAlign:"right" }}>{p.qty}</td>
//                   <td style={{ padding:"7px 8px", textAlign:"right" }}>₹{p.price}</td>
//                   <td style={{ padding:"7px 8px", textAlign:"right" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#aaa"}}>({p.gst}%)</span></td>
//                   <td style={{ padding:"7px 8px", textAlign:"right", fontWeight:700 }}>₹{(base+gstAmt).toFixed(2)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Summary */}
//         <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
//           <table style={{ fontSize:12, width:220 }}>
//             <tbody>
//               <tr><td style={{padding:"3px 0",color:"#666"}}>Sub Total</td><td style={{textAlign:"right",padding:"3px 0"}}>₹{invoice.sub_total}</td></tr>
//               <tr><td style={{padding:"3px 0",color:"#666"}}>GST</td><td style={{textAlign:"right",padding:"3px 0"}}>₹{invoice.gst_total}</td></tr>
//             </tbody>
//           </table>
//         </div>
//         <div style={{ display:"flex", justifyContent:"flex-end", marginTop:6 }}>
//           <div style={{ background:color, color:"#fff", padding:"10px 20px", fontSize:16, fontWeight:700, borderRadius:6, display:"flex", justifyContent:"space-between", width:220 }}>
//             <span>Total</span><span>₹{invoice.total_amount}</span>
//           </div>
//         </div>
//         <div style={{ display:"flex", justifyContent:"flex-end", marginTop:6, fontSize:12 }}>
//           <div style={{ width:220, display:"flex", justifyContent:"space-between", color:"#555" }}>
//             <span>{invoice.payment_method?.toUpperCase()} · Paid</span>
//             <span style={{ fontWeight:700, color }}> ₹{invoice.paid_amount}</span>
//           </div>
//         </div>

//         <div style={{ marginTop:22, borderTop:"1px solid #eee", paddingTop:8, fontSize:10, color:"#bbb", textAlign:"center" }}>
//           Thank you for choosing {company?.company_name}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── 4. Minimal ─────────────────────────────────────────────────────────── */
// function DesignMinimal({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", color:"#222", fontSize:13 }}>
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
//         <div>
//           {logoUrl && <img src={logoUrl} alt="logo" style={{ height:40, marginBottom:6, objectFit:"contain" }} />}
//           <div style={{ fontWeight:600, fontSize:17 }}>{company?.company_name}</div>
//         </div>
//         <div style={{ textAlign:"right", color:"#888", fontSize:12 }}>
//           <div style={{ fontWeight:700, fontSize:20, color, letterSpacing:2, textTransform:"uppercase" }}>Invoice</div>
//           <div>#{invoice.invoice_no}</div>
//           <div>{today}</div>
//         </div>
//       </div>

//       <div style={{ height:1, background:"#eee", marginBottom:16 }} />

//       <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:20 }}>
//         <div>
//           <div style={{ color:"#aaa", fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>From</div>
//           <div style={{ color:"#555" }}>{company?.company_address}</div>
//           <div style={{ color:"#555" }}>{company?.phone}</div>
//           <div style={{ color:"#555" }}>GSTIN: {company?.gstin}</div>
//           <div  style={{ color:"#555" }}>
//   GST: {company?.gst_type}
// </div>
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ color:"#aaa", fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Bill To</div>
//           <div style={{ fontWeight:600 }}>{invoice.customer_name}</div>
//           <div style={{ color:"#555" }}>{invoice.customer_phone}</div>
//         </div>
//       </div>

//       <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//         <thead>
//           <tr style={{ borderBottom:`2px solid ${color}` }}>
//             {["Item","Qty","Price","GST","Amount"].map(h => (
//               <th key={h} style={{ padding:"6px 8px", textAlign: h==="Item" ? "left" : "right", fontSize:10, textTransform:"uppercase", letterSpacing:.5, color:"#aaa", fontWeight:400 }}>{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {invoice.products.map((p, i) => {
//             const base = p.price * p.qty;
//             const gstAmt = (base * p.gst) / 100;
//             return (
//               <tr key={i} style={{ borderBottom:"1px solid #f3f3f3" }}>
//                 <td style={{ padding:"8px 8px" }}>{p.display_name || `${p.name} `}</td>
//                 <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>{p.qty}</td>
//                 <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>₹{p.price}</td>
//                 <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>₹{gstAmt.toFixed(2)}</td>
//                 <td style={{ padding:"8px 8px", textAlign:"right", fontWeight:600 }}>₹{(base+gstAmt).toFixed(2)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <div style={{ display:"flex", justifyContent:"flex-end", marginTop:20 }}>
//         <div style={{ width:200 }}>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", color:"#aaa", fontSize:12 }}><span>Sub Total</span><span>₹{invoice.sub_total}</span></div>
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", color:"#aaa", fontSize:12 }}><span>GST</span><span>₹{invoice.gst_total}</span></div>
//           <div style={{ height:1, background:"#eee", margin:"8px 0" }} />
//           <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:15, color }}><span>Total</span><span>₹{invoice.total_amount}</span></div>
//           <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:12, color:"#aaa" }}><span>Paid ({invoice.payment_method})</span><span style={{color:"#222"}}>₹{invoice.paid_amount}</span></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── 5. Corporate ───────────────────────────────────────────────────────── */
// function DesignCorporate({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"Georgia,'Times New Roman',serif", color:"#1a1a1a", fontSize:13 }}>
//       {/* Header band */}
//       <div style={{ borderTop:`6px solid ${color}`, borderBottom:`2px solid ${color}`, padding:"14px 0 12px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//         <div>
//           {logoUrl && <img src={logoUrl} alt="logo" style={{ height:46, objectFit:"contain" }} />}
//         </div>
//         <div style={{ textAlign:"center" }}>
//           <div style={{ fontWeight:700, fontSize:18, letterSpacing:1, color }}>{company?.company_name}</div>
//           <div style={{ fontSize:11, color:"#777" }}>{company?.company_address} · Ph: {company?.phone}</div>
//           <div style={{ fontSize:11, color:"#777" }}>GSTIN: {company?.gstin}</div>
//              <p className="text-sm" style={{ fontSize:11, color:"#777" }}>
//   GST: {company?.gst_type
//   }
// </p>
//           {/* <p className="text-sm">
//   GST: {company?.gst_type === "with_gst" ? "Applicable" : "Not Applicable"}
// </p> */}
//         </div>
//         <div style={{ textAlign:"right" }}>
//           <div style={{ fontWeight:700, fontSize:14, letterSpacing:2, color }}>TAX INVOICE</div>
//           <div style={{ fontSize:11, marginTop:4 }}>No: <b>{invoice.invoice_no}</b></div>
//           <div style={{ fontSize:11 }}>Date: {today}</div>
//         </div>
//       </div>

//       {/* Bill To */}
//       <div style={{ marginBottom:14, padding:"8px 12px", border:`1px solid ${color}`, display:"inline-block", minWidth:200 }}>
//         <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color, marginBottom:3, fontWeight:700 }}>Billed To</div>
//         <div style={{ fontWeight:700, fontSize:14 }}>{invoice.customer_name}</div>
//         <div style={{ fontSize:11, color:"#555" }}>{invoice.customer_phone}</div>
//       </div>

//       <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//         <thead>
//           <tr style={{ background:color, color:"#fff" }}>
//             {["No.","Description","Qty","Unit Price","GST","Total"].map(h => (
//               <th key={h} style={{ padding:"8px 10px", textAlign: h==="Description"||h==="No." ? "left" : "right" }}>{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {invoice.products.map((p, i) => {
//             const base = p.price * p.qty;
//             const gstAmt = (base * p.gst) / 100;
//             return (
//               <tr key={i} style={{ borderBottom:"1px solid #ddd" }}>
//                 <td style={{ padding:"7px 10px" }}>{i+1}</td>
//                 <td style={{ padding:"7px 10px", fontWeight:600 }}>{p.display_name || `${p.name} `}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right" }}>{p.qty}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{p.price}</td>
//                 <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{gstAmt.toFixed(2)}<span style={{fontSize:10,color:"#aaa"}}> ({p.gst}%)</span></td>
//                 <td style={{ padding:"7px 10px", textAlign:"right", fontWeight:700 }}>₹{(base+gstAmt).toFixed(2)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           <tr style={{ borderTop:`2px solid ${color}`, fontWeight:700 }}>
//             <td colSpan={2} style={{ padding:"7px 10px" }}>Total</td>
//             <td style={{ padding:"7px 10px", textAlign:"right" }}>{invoice.products.reduce((s,p)=>s+p.qty,0)}</td>
//             <td></td>
//             <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{invoice.gst_total}</td>
//             <td style={{ padding:"7px 10px", textAlign:"right", color }}>₹{invoice.total_amount}</td>
//           </tr>
//         </tfoot>
//       </table>

//       <div style={{ display:"flex", justifyContent:"space-between", marginTop:20, alignItems:"flex-end" }}>
//         <div style={{ fontSize:11, color:"#777", maxWidth:300 }}>
//           <b>Payment Method:</b> {invoice.payment_method?.toUpperCase()}<br/>
//           Thank you for your business. Please retain this invoice for your records.
//         </div>
//         <div style={{ width:200 }}>
//           {[["Sub Total",`₹${invoice.sub_total}`],["GST",`₹${invoice.gst_total}`]].map(([k,v])=>(
//             <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", fontSize:12, color:"#555", borderBottom:"1px dotted #ddd" }}><span>{k}</span><span>{v}</span></div>
//           ))}
//           <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontWeight:700, fontSize:15, borderTop:`2px solid ${color}`, marginTop:4 }}>
//             <span style={{color}}>Total Paid</span><span style={{color}}>₹{invoice.paid_amount}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── 6. Stripe ──────────────────────────────────────────────────────────── */
// function DesignStripe({ invoice, company, color, logoUrl }) {
//   const today = new Date().toLocaleDateString("en-IN");
//   return (
//     <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", color:"#1e293b", fontSize:13 }}>
//       <div style={{ display:"flex", gap:0 }}>
//         {/* Left accent stripe */}
//         <div style={{ width:5, background:color, borderRadius:"4px 0 0 4px", flexShrink:0 }} />
//         <div style={{ flex:1, paddingLeft:18 }}>
//           {/* Header */}
//           <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:14, borderBottom:`1px solid #e2e8f0`, marginBottom:16 }}>
//             <div>
//               {logoUrl && <img src={logoUrl} alt="logo" style={{ height:40, marginBottom:6, objectFit:"contain" }} />}
//               <div style={{ fontWeight:700, fontSize:17, color:"#0f172a" }}>{company?.company_name}</div>
//               <div style={{ fontSize:11, color:"#64748b" }}>{company?.company_address}</div>
//               <div style={{ fontSize:11, color:"#64748b" }}>Ph: {company?.phone} · GSTIN: {company?.gstin}</div>
//             <p  style={{ fontSize:11, color:"#64748b" }}>
//   GST: {company?.gst_type}
// </p>
//             </div>
//             <div style={{ textAlign:"right" }}>
//               <div style={{ fontWeight:800, fontSize:22, color, textTransform:"uppercase", letterSpacing:1 }}>Invoice</div>
//               <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{invoice.invoice_no}</div>
//               <div style={{ fontSize:12, color:"#94a3b8" }}>{today}</div>
//             </div>
//           </div>

//           {/* Bill To */}
//           <div style={{ marginBottom:16 }}>
//             <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:4 }}>Bill To</div>
//             <div style={{ fontWeight:600, fontSize:14 }}>{invoice.customer_name}</div>
//             <div style={{ fontSize:12, color:"#64748b" }}>{invoice.customer_phone}</div>
//           </div>

//           {/* Table */}
//           <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
//             <thead>
//               <tr style={{ borderBottom:`2px solid ${color}` }}>
//                 {["Item","Qty","Price","GST","Amount"].map(h => (
//                   <th key={h} style={{ padding:"6px 8px", textAlign: h==="Item" ? "left" : "right", fontSize:10, textTransform:"uppercase", letterSpacing:.5, color:"#94a3b8", fontWeight:600 }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {invoice.products.map((p, i) => {
//                 const base = p.price * p.qty;
//                 const gstAmt = (base * p.gst) / 100;
//                 return (
//                   <tr key={i} style={{ borderBottom:"1px solid #f1f5f9" }}>
//                     <td style={{ padding:"8px 8px", fontWeight:500 }}>{p.display_name || `${p.name} `}</td>
//                     <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>{p.qty}</td>
//                     <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>₹{p.price}</td>
//                     <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#cbd5e1"}}>({p.gst}%)</span></td>
//                     <td style={{ padding:"8px 8px", textAlign:"right", fontWeight:700, color }}>₹{(base+gstAmt).toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* Summary */}
//           <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
//             <div style={{ width:240 }}>
//               {[["Sub Total",`₹${invoice.sub_total}`],["GST",`₹${invoice.gst_total}`]].map(([k,v])=>(
//                 <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12, color:"#64748b", borderBottom:"1px solid #f1f5f9" }}>
//                   <span>{k}</span><span style={{color:"#1e293b"}}>{v}</span>
//                 </div>
//               ))}
//               <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 6px", fontWeight:700, fontSize:15 }}>
//                 <span style={{color}}>Grand Total</span><span style={{color}}>₹{invoice.total_amount}</span>
//               </div>
//               <div style={{ fontSize:12, color:"#94a3b8", borderTop:"1px solid #f1f5f9", paddingTop:6 }}>
//                 <span style={{textTransform:"uppercase",fontWeight:600,color:"#475569"}}>{invoice.payment_method}</span> &nbsp;·&nbsp; Paid: <b style={{color:"#1e293b"}}>₹{invoice.paid_amount}</b>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── DESIGN MAP ─────────────────────────────────────────────────────────── */
// const DESIGN_COMPONENTS = {
//   original:  DesignOriginal,
//   classic:   DesignClassic,
//   modern:    DesignModern,
//   bold:      DesignBold,
//   minimal:   DesignMinimal,
//   corporate: DesignCorporate,
//   stripe:    DesignStripe,
// };

// /* ═══════════════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════ */
// export default function InvoicePreview() {
//   const { invoiceNo } = useParams();
//   const [invoice, setInvoice]     = useState(null);
//   const [company, setCompany]     = useState(null);
//   const [color, setColor]         = useState("#2563eb");
//   const [design, setDesign]       = useState("original");

//   useEffect(() => {
//     const s = document.createElement("style");
//     s.innerHTML = PRINT_CSS;
//     document.head.appendChild(s);
//     return () => document.head.removeChild(s);
//   }, []);

//   useEffect(() => {
//     api.get(`/invoice/get_invoice_by_id.php?id=${invoiceNo}`).then(res => {
//       if (res.data.status) {
//         setInvoice(res.data.data);
//         setCompany(res.data.data);
//       }
//     });
//   }, [invoiceNo]);

//   if (!invoice) return (
//     <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60vh", fontFamily:"sans-serif", color:"#94a3b8", fontSize:14 }}>
//       Loading invoice…
//     </div>
//   );

//   const logoUrl = company?.logo ? `${API_BASE_URL}${company.logo}` : null;

//   const downloadPDF = () => {
//     const element = document.getElementById("invoice");
//     html2pdf().set({ margin:10, filename:`invoice-${invoice.invoice_no}.pdf`, html2canvas:{ scale:2, useCORS:true }, jsPDF:{ unit:"mm", format:"a4" } }).from(element).save();
//   };

//   const shareWhatsApp = () => {
//     const msg = `Invoice No: ${invoice.invoice_no}\nAmount: ₹${invoice.total_amount}\nFrom: ${company?.company_name}`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
//   };

//   const ActiveDesign = DESIGN_COMPONENTS[design];

//   return (
//     <div style={{ minHeight:"100vh", background:"#f1f5f9", fontFamily:"'Segoe UI',Arial,sans-serif", padding:"24px 16px 40px" }}>

//       {/* ── Controls ── */}
//       <div className="no-print" style={{ maxWidth:800, margin:"0 auto 20px" }}>

//         {/* Action buttons */}
//         <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
//           {[
//             { label:"Print",     onClick: () => window.print(),  bg:"#1d4ed8" },
//             { label:"PDF",       onClick: downloadPDF,           bg:"#16a34a" },
//             { label:"WhatsApp",  onClick: shareWhatsApp,         bg:"#15803d" },
//           ].map(b => (
//             <button key={b.label} onClick={b.onClick} style={{
//               background:b.bg, color:"#fff", border:"none", borderRadius:8,
//               padding:"9px 22px", fontWeight:600, fontSize:13, cursor:"pointer",
//               fontFamily:"'Segoe UI',Arial,sans-serif",
//             }}>{b.label}</button>
//           ))}
//         </div>

//         {/* Design selector */}
//         <div style={{ marginBottom:14 }}>
//           <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:8, fontWeight:600 }}>
//             Choose Design
//           </div>
//           <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
//             {DESIGNS.map(d => (
//               <button key={d.id} onClick={() => setDesign(d.id)} style={{
//                 padding:"7px 18px", borderRadius:20, cursor:"pointer",
//                 fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:13, fontWeight:600,
//                 border: design === d.id ? `2px solid ${color}` : "1.5px solid #e2e8f0",
//                 background: design === d.id ? color : "#fff",
//                 color: design === d.id ? "#fff" : "#475569",
//                 transition:"all .15s",
//               }}>
//                 {d.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Color picker */}
//         <div>
//           <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:8, fontWeight:600 }}>
//             Choose Color
//           </div>
//           <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
//             {COLORS.map(c => (
//               <div key={c} onClick={() => setColor(c)} style={{
//                 width:26, height:26, borderRadius:"50%", background:c, cursor:"pointer",
//                 border: color === c ? "3px solid #1e293b" : "2px solid transparent",
//                 outline: color === c ? `2px solid ${c}` : "none",
//                 outlineOffset:2,
//                 transition:"transform .1s",
//                 transform: color === c ? "scale(1.2)" : "scale(1)",
//               }} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Invoice Paper ── */}
//       <div id="invoice" style={{
//         background:"#fff",
//         maxWidth:800,
//         margin:"0 auto",
//         padding:"30px 32px",
//         border:"1px solid #e2e8f0",
//       }}>
//         <ActiveDesign
//           invoice={invoice}
//           company={company}
//           color={color}
//           logoUrl={logoUrl}
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";
import html2pdf from "html2pdf.js";

const DESIGNS = [
  { id: "original",   label: "Original" },
  { id: "classic",    label: "Classic" },
  { id: "modern",     label: "Modern" },
  { id: "bold",       label: "Bold" },
  { id: "minimal",    label: "Minimal" },
  { id: "corporate",  label: "Corporate" },
  { id: "stripe",     label: "Stripe" },
  { id: "pos",        label: "POS Receipt" },
];

const COLORS = [
  "#7c3aed","#2563eb","#16a34a","#dc2626",
  "#ea580c","#0891b2","#db2777","#4b5563",
  "#9333ea","#059669","#e11d48","#0284c7",
];

/* ─── PRINT STYLES ───────────────────────────────────────────────────────── */
const PRINT_CSS = `
  @media print {
    body * { visibility: hidden !important; }
    #invoice, #invoice * { visibility: visible !important; }
    #invoice { position: fixed; top:0; left:0; width:100%; }
    .no-print { display:none !important; }
  }
`;

/* ── 0. Original ─────────────────────────────────────────────────────────── */
function DesignOriginal({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"'Times New Roman',serif", color:"#1a1a1a", fontSize:13 }}>
      <div id="invoice">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="font-bold text-lg">{company?.company_name}</h1>
            <p className="text-sm">{company?.company_address}</p>
            <p className="text-sm">Phone: {company?.phone}</p>
            <p className="text-sm">GSTIN: {company?.gstin}</p>
            <p className="text-sm">GST: {company?.gst_type}</p>
          </div>
          {company?.logo && (
            <img src={`${API_BASE_URL}${company.logo}`} alt="logo" className="w-20 h-20 object-cover" />
          )}
        </div>

        <h2 className="text-center font-semibold text-lg mt-4" style={{ color }}>Tax Invoice</h2>

        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>{invoice.customer_name}</p>
            <p>{invoice.customer_phone}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Invoice Details</p>
            <p>Invoice No.: {invoice.invoice_no}</p>
            <p>Date: {today}</p>
          </div>
        </div>

        <table className="w-full mt-4 border text-sm">
          <thead style={{ backgroundColor: color, color: "#fff" }}>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((p, i) => {
              const amount = p.price * p.qty;
              const gstAmount = (amount * p.gst) / 100;
              return (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">{p.display_name || `${p.name}`}</td>
                  <td className="border p-2 text-center">{p.qty}</td>
                  <td className="border p-2 text-right">₹{p.price}</td>
                  <td className="border p-2 text-right">
                    ₹{gstAmount.toFixed(2)}<br /><span className="text-xs">({p.gst}%)</span>
                  </td>
                  <td className="border p-2 text-right">₹{(amount + gstAmount).toFixed(2)}</td>
                </tr>
              );
            })}
            <tr className="font-semibold">
              <td colSpan={2} className="border p-2 text-right">Total</td>
              <td className="border p-2 text-center">{invoice.products.reduce((s, p) => s + p.qty, 0)}</td>
              <td></td>
              <td className="border p-2 text-right">₹{invoice.gst_total}</td>
              <td className="border p-2 text-right">₹{invoice.total_amount}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6 text-sm">
          <div className="w-1/3">
            <div className="flex justify-between"><span>Sub Total</span><span>₹{invoice.sub_total}</span></div>
            <div className="flex justify-between"><span>GST</span><span>₹{invoice.gst_total}</span></div>
            <div className="flex justify-between mt-4 px-2 py-1 font-semibold" style={{ backgroundColor: color, color: "#fff" }}>
              <span className="pb-2">Total</span><span className="pb-2">₹{invoice.total_amount}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Payment</span>
              <span className="font-semibold uppercase">{invoice.payment_method}</span>
            </div>
            <div className="flex justify-between px-2 py-2 font-bold text-xl mb-2" style={{ color }}>
              <span>Paid</span><span>₹{invoice.paid_amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 1. Classic ──────────────────────────────────────────────────────────── */
function DesignClassic({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"'Times New Roman',serif", color:"#1a1a1a", fontSize:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:`3px double ${color}`, paddingBottom:14, marginBottom:14 }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:52, marginBottom:8, objectFit:"contain" }} />}
          <div style={{ fontWeight:700, fontSize:18 }}>{company?.company_name}</div>
          <div style={{ fontSize:11, color:"#555" }}>{company?.company_address}</div>
          <div style={{ fontSize:11, color:"#555" }}>Ph: {company?.phone} &nbsp;|&nbsp; GSTIN: {company?.gstin}</div>
          <div style={{ fontSize:11, color:"#555" }}>GST: {company?.gst_type}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:22, fontWeight:700, color, letterSpacing:1 }}>TAX INVOICE</div>
          <div style={{ fontSize:11, marginTop:4 }}>No: <b>{invoice.invoice_no}</b></div>
          <div style={{ fontSize:11 }}>Date: <b>{today}</b></div>
        </div>
      </div>

      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#888", marginBottom:3 }}>Billed To</div>
        <div style={{ fontWeight:700 }}>{invoice.customer_name}</div>
        <div style={{ fontSize:11 }}>{invoice.customer_phone}</div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ background:color, color:"#fff" }}>
            {["#","Item","Qty","Price","GST","Amount"].map(h => (
              <th key={h} style={{ padding:"7px 10px", textAlign: h==="Item"||h==="#" ? "left" : "right", borderBottom:`2px solid ${color}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const base = p.price * p.qty;
            const gstAmt = (base * p.gst) / 100;
            return (
              <tr key={i} style={{ background: i%2===0 ? "#fafafa" : "#fff" }}>
                <td style={{ padding:"6px 10px", borderBottom:"1px solid #eee" }}>{i+1}</td>
                <td style={{ padding:"6px 10px", borderBottom:"1px solid #eee" }}>{p.display_name || `${p.name}`}</td>
                <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>{p.qty}</td>
                <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>₹{p.price}</td>
                <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10}}>({p.gst}%)</span></td>
                <td style={{ padding:"6px 10px", textAlign:"right", borderBottom:"1px solid #eee", fontWeight:600 }}>₹{(base+gstAmt).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
        <table style={{ fontSize:12, width:220 }}>
          <tbody>
            <tr><td style={{ padding:"4px 0", color:"#555" }}>Sub Total</td><td style={{ textAlign:"right", padding:"4px 0" }}>₹{invoice.sub_total}</td></tr>
            <tr><td style={{ padding:"4px 0", color:"#555" }}>GST</td><td style={{ textAlign:"right", padding:"4px 0" }}>₹{invoice.gst_total}</td></tr>
            <tr style={{ borderTop:`2px solid ${color}` }}>
              <td style={{ padding:"6px 0", fontWeight:700, fontSize:14 }}>Total</td>
              <td style={{ textAlign:"right", fontWeight:700, fontSize:14, color }}>₹{invoice.total_amount}</td>
            </tr>
            <tr><td style={{ padding:"4px 0", color:"#555" }}>Payment</td><td style={{ textAlign:"right", textTransform:"uppercase", fontWeight:600 }}>{invoice.payment_method}</td></tr>
            <tr><td style={{ padding:"4px 0", color:"#555" }}>Paid</td><td style={{ textAlign:"right", fontWeight:700, color }}>₹{invoice.paid_amount}</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop:24, borderTop:`1px solid #ddd`, paddingTop:10, fontSize:10, color:"#aaa", textAlign:"center" }}>
        Thank you for your business!
      </div>
    </div>
  );
}

/* ── 2. Modern ───────────────────────────────────────────────────────────── */
function DesignModern({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", color:"#1e293b", fontSize:13 }}>
      <div style={{ height:5, background:color, marginBottom:0 }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 0 14px", borderBottom:"1px solid #e2e8f0" }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:44, marginBottom:6, objectFit:"contain" }} />}
          <div style={{ fontWeight:700, fontSize:16, color:"#0f172a" }}>{company?.company_name}</div>
          <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{company?.company_address}</div>
          <div style={{ fontSize:11, color:"#64748b" }}>Ph: {company?.phone} &nbsp;·&nbsp; GSTIN: {company?.gstin}</div>
          <div style={{ fontSize:11, color:"#64748b" }}>GST: {company?.gst_type}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ display:"inline-block", background:color, color:"#fff", fontWeight:700, fontSize:13, padding:"5px 18px", borderRadius:20, letterSpacing:1 }}>TAX INVOICE</div>
          <div style={{ fontSize:11, marginTop:8, color:"#475569" }}>Invoice No: <b style={{color:"#0f172a"}}>{invoice.invoice_no}</b></div>
          <div style={{ fontSize:11, color:"#475569" }}>Date: <b style={{color:"#0f172a"}}>{today}</b></div>
        </div>
      </div>

      <div style={{ margin:"14px 0", padding:"10px 14px", background:"#f8fafc", borderLeft:`3px solid ${color}`, borderRadius:"0 6px 6px 0" }}>
        <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:3 }}>Bill To</div>
        <div style={{ fontWeight:600, fontSize:14 }}>{invoice.customer_name}</div>
        <div style={{ fontSize:12, color:"#64748b" }}>{invoice.customer_phone}</div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr>
            {["#","Item","Qty","Price","GST","Amount"].map(h => (
              <th key={h} style={{ padding:"8px 10px", textAlign: h==="Item"||h==="#" ? "left" : "right", background:"#f1f5f9", color:"#475569", fontSize:10, textTransform:"uppercase", letterSpacing:.5, borderBottom:`2px solid ${color}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const base = p.price * p.qty;
            const gstAmt = (base * p.gst) / 100;
            return (
              <tr key={i}>
                <td style={{ padding:"7px 10px", borderBottom:"1px solid #f1f5f9", color:"#94a3b8" }}>{i+1}</td>
                <td style={{ padding:"7px 10px", borderBottom:"1px solid #f1f5f9", fontWeight:500 }}>{p.display_name || `${p.name}`}</td>
                <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>{p.qty}</td>
                <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>₹{p.price}</td>
                <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#94a3b8"}}>({p.gst}%)</span></td>
                <td style={{ padding:"7px 10px", textAlign:"right", borderBottom:"1px solid #f1f5f9", fontWeight:600, color }}>₹{(base+gstAmt).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
        <div style={{ width:230 }}>
          {[["Sub Total",`₹${invoice.sub_total}`],["GST",`₹${invoice.gst_total}`]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12, color:"#64748b" }}>
              <span>{k}</span><span style={{color:"#0f172a"}}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, padding:"8px 12px", background:color, borderRadius:8, color:"#fff", fontWeight:700, fontSize:15 }}>
            <span>Grand Total</span><span>₹{invoice.total_amount}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:12, color:"#64748b", marginTop:4 }}>
            <span>Payment Method</span><span style={{textTransform:"uppercase",fontWeight:600,color:"#0f172a"}}>{invoice.payment_method}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:13, fontWeight:700, color }}>
            <span>Paid</span><span>₹{invoice.paid_amount}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop:20, fontSize:10, color:"#cbd5e1", textAlign:"center", borderTop:"1px solid #f1f5f9", paddingTop:8 }}>
        Thank you for your business · {company?.company_name}
      </div>
    </div>
  );
}

/* ── 3. Bold ─────────────────────────────────────────────────────────────── */
function DesignBold({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"Arial,sans-serif", color:"#111", fontSize:13 }}>
      <div style={{ background:color, color:"#fff", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:44, marginBottom:6 }} />}
          <div style={{ fontWeight:700, fontSize:20 }}>{company?.company_name}</div>
          <div style={{ fontSize:11, opacity:.85, marginTop:2 }}>{company?.company_address}</div>
          <div style={{ fontSize:11, opacity:.85 }}>Ph: {company?.phone} · GSTIN: {company?.gstin}</div>
          <div style={{ fontSize:11, opacity:.85 }}>GST: {company?.gst_type}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontWeight:900, fontSize:28, letterSpacing:2, opacity:.9 }}>INVOICE</div>
          <div style={{ fontSize:12, marginTop:4 }}>#{invoice.invoice_no}</div>
          <div style={{ fontSize:12 }}>{today}</div>
        </div>
      </div>

      <div style={{ padding:"0 24px" }}>
        <div style={{ margin:"16px 0 14px" }}>
          <div style={{ fontWeight:700, fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#888", marginBottom:3 }}>Bill To</div>
          <div style={{ fontWeight:700, fontSize:15 }}>{invoice.customer_name}</div>
          <div style={{ fontSize:12, color:"#555" }}>{invoice.customer_phone}</div>
        </div>

        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:`3px solid ${color}` }}>
              {["#","Item","Qty","Price","GST","Amount"].map(h => (
                <th key={h} style={{ padding:"7px 8px", textAlign: h==="Item"||h==="#" ? "left" : "right", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:.5, color:"#333" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((p, i) => {
              const base = p.price * p.qty;
              const gstAmt = (base * p.gst) / 100;
              return (
                <tr key={i} style={{ borderBottom:"1px solid #eee" }}>
                  <td style={{ padding:"7px 8px", color:"#aaa" }}>{i+1}</td>
                  <td style={{ padding:"7px 8px", fontWeight:600 }}>{p.display_name || `${p.name}`}</td>
                  <td style={{ padding:"7px 8px", textAlign:"right" }}>{p.qty}</td>
                  <td style={{ padding:"7px 8px", textAlign:"right" }}>₹{p.price}</td>
                  <td style={{ padding:"7px 8px", textAlign:"right" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#aaa"}}>({p.gst}%)</span></td>
                  <td style={{ padding:"7px 8px", textAlign:"right", fontWeight:700 }}>₹{(base+gstAmt).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
          <table style={{ fontSize:12, width:220 }}>
            <tbody>
              <tr><td style={{padding:"3px 0",color:"#666"}}>Sub Total</td><td style={{textAlign:"right",padding:"3px 0"}}>₹{invoice.sub_total}</td></tr>
              <tr><td style={{padding:"3px 0",color:"#666"}}>GST</td><td style={{textAlign:"right",padding:"3px 0"}}>₹{invoice.gst_total}</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:6 }}>
          <div style={{ background:color, color:"#fff", padding:"10px 20px", fontSize:16, fontWeight:700, borderRadius:6, display:"flex", justifyContent:"space-between", width:220 }}>
            <span>Total</span><span>₹{invoice.total_amount}</span>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:6, fontSize:12 }}>
          <div style={{ width:220, display:"flex", justifyContent:"space-between", color:"#555" }}>
            <span>{invoice.payment_method?.toUpperCase()} · Paid</span>
            <span style={{ fontWeight:700, color }}>₹{invoice.paid_amount}</span>
          </div>
        </div>

        <div style={{ marginTop:22, borderTop:"1px solid #eee", paddingTop:8, fontSize:10, color:"#bbb", textAlign:"center" }}>
          Thank you for choosing {company?.company_name}
        </div>
      </div>
    </div>
  );
}

/* ── 4. Minimal ──────────────────────────────────────────────────────────── */
function DesignMinimal({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", color:"#222", fontSize:13 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:40, marginBottom:6, objectFit:"contain" }} />}
          <div style={{ fontWeight:600, fontSize:17 }}>{company?.company_name}</div>
        </div>
        <div style={{ textAlign:"right", color:"#888", fontSize:12 }}>
          <div style={{ fontWeight:700, fontSize:20, color, letterSpacing:2, textTransform:"uppercase" }}>Invoice</div>
          <div>#{invoice.invoice_no}</div>
          <div>{today}</div>
        </div>
      </div>

      <div style={{ height:1, background:"#eee", marginBottom:16 }} />

      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:20 }}>
        <div>
          <div style={{ color:"#aaa", fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>From</div>
          <div style={{ color:"#555" }}>{company?.company_address}</div>
          <div style={{ color:"#555" }}>{company?.phone}</div>
          <div style={{ color:"#555" }}>GSTIN: {company?.gstin}</div>
          <div style={{ color:"#555" }}>GST: {company?.gst_type}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ color:"#aaa", fontSize:10, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Bill To</div>
          <div style={{ fontWeight:600 }}>{invoice.customer_name}</div>
          <div style={{ color:"#555" }}>{invoice.customer_phone}</div>
        </div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ borderBottom:`2px solid ${color}` }}>
            {["Item","Qty","Price","GST","Amount"].map(h => (
              <th key={h} style={{ padding:"6px 8px", textAlign: h==="Item" ? "left" : "right", fontSize:10, textTransform:"uppercase", letterSpacing:.5, color:"#aaa", fontWeight:400 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const base = p.price * p.qty;
            const gstAmt = (base * p.gst) / 100;
            return (
              <tr key={i} style={{ borderBottom:"1px solid #f3f3f3" }}>
                <td style={{ padding:"8px 8px" }}>{p.display_name || `${p.name}`}</td>
                <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>{p.qty}</td>
                <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>₹{p.price}</td>
                <td style={{ padding:"8px 8px", textAlign:"right", color:"#888" }}>₹{gstAmt.toFixed(2)}</td>
                <td style={{ padding:"8px 8px", textAlign:"right", fontWeight:600 }}>₹{(base+gstAmt).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:20 }}>
        <div style={{ width:200 }}>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", color:"#aaa", fontSize:12 }}><span>Sub Total</span><span>₹{invoice.sub_total}</span></div>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", color:"#aaa", fontSize:12 }}><span>GST</span><span>₹{invoice.gst_total}</span></div>
          <div style={{ height:1, background:"#eee", margin:"8px 0" }} />
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, fontSize:15, color }}><span>Total</span><span>₹{invoice.total_amount}</span></div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:12, color:"#aaa" }}><span>Paid ({invoice.payment_method})</span><span style={{color:"#222"}}>₹{invoice.paid_amount}</span></div>
        </div>
      </div>
    </div>
  );
}

/* ── 5. Corporate ────────────────────────────────────────────────────────── */
function DesignCorporate({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"Georgia,'Times New Roman',serif", color:"#1a1a1a", fontSize:13 }}>
      <div style={{ borderTop:`6px solid ${color}`, borderBottom:`2px solid ${color}`, padding:"14px 0 12px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="logo" style={{ height:46, objectFit:"contain" }} />}
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:18, letterSpacing:1, color }}>{company?.company_name}</div>
          <div style={{ fontSize:11, color:"#777" }}>{company?.company_address} · Ph: {company?.phone}</div>
          <div style={{ fontSize:11, color:"#777" }}>GSTIN: {company?.gstin}</div>
          <div style={{ fontSize:11, color:"#777" }}>GST: {company?.gst_type}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontWeight:700, fontSize:14, letterSpacing:2, color }}>TAX INVOICE</div>
          <div style={{ fontSize:11, marginTop:4 }}>No: <b>{invoice.invoice_no}</b></div>
          <div style={{ fontSize:11 }}>Date: {today}</div>
        </div>
      </div>

      <div style={{ marginBottom:14, padding:"8px 12px", border:`1px solid ${color}`, display:"inline-block", minWidth:200 }}>
        <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color, marginBottom:3, fontWeight:700 }}>Billed To</div>
        <div style={{ fontWeight:700, fontSize:14 }}>{invoice.customer_name}</div>
        <div style={{ fontSize:11, color:"#555" }}>{invoice.customer_phone}</div>
      </div>

      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
        <thead>
          <tr style={{ background:color, color:"#fff" }}>
            {["No.","Description","Qty","Unit Price","GST","Total"].map(h => (
              <th key={h} style={{ padding:"8px 10px", textAlign: h==="Description"||h==="No." ? "left" : "right" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const base = p.price * p.qty;
            const gstAmt = (base * p.gst) / 100;
            return (
              <tr key={i} style={{ borderBottom:"1px solid #ddd" }}>
                <td style={{ padding:"7px 10px" }}>{i+1}</td>
                <td style={{ padding:"7px 10px", fontWeight:600 }}>{p.display_name || `${p.name}`}</td>
                <td style={{ padding:"7px 10px", textAlign:"right" }}>{p.qty}</td>
                <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{p.price}</td>
                <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{gstAmt.toFixed(2)}<span style={{fontSize:10,color:"#aaa"}}> ({p.gst}%)</span></td>
                <td style={{ padding:"7px 10px", textAlign:"right", fontWeight:700 }}>₹{(base+gstAmt).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr style={{ borderTop:`2px solid ${color}`, fontWeight:700 }}>
            <td colSpan={2} style={{ padding:"7px 10px" }}>Total</td>
            <td style={{ padding:"7px 10px", textAlign:"right" }}>{invoice.products.reduce((s,p)=>s+p.qty,0)}</td>
            <td></td>
            <td style={{ padding:"7px 10px", textAlign:"right" }}>₹{invoice.gst_total}</td>
            <td style={{ padding:"7px 10px", textAlign:"right", color }}>₹{invoice.total_amount}</td>
          </tr>
        </tfoot>
      </table>

      <div style={{ display:"flex", justifyContent:"space-between", marginTop:20, alignItems:"flex-end" }}>
        <div style={{ fontSize:11, color:"#777", maxWidth:300 }}>
          <b>Payment Method:</b> {invoice.payment_method?.toUpperCase()}<br/>
          Thank you for your business. Please retain this invoice for your records.
        </div>
        <div style={{ width:200 }}>
          {[["Sub Total",`₹${invoice.sub_total}`],["GST",`₹${invoice.gst_total}`]].map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", fontSize:12, color:"#555", borderBottom:"1px dotted #ddd" }}><span>{k}</span><span>{v}</span></div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontWeight:700, fontSize:15, borderTop:`2px solid ${color}`, marginTop:4 }}>
            <span style={{color}}>Total Paid</span><span style={{color}}>₹{invoice.paid_amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 6. Stripe ───────────────────────────────────────────────────────────── */
function DesignStripe({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  return (
    <div style={{ fontFamily:"'Segoe UI',Arial,sans-serif", color:"#1e293b", fontSize:13 }}>
      <div style={{ display:"flex", gap:0 }}>
        <div style={{ width:5, background:color, borderRadius:"4px 0 0 4px", flexShrink:0 }} />
        <div style={{ flex:1, paddingLeft:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:14, borderBottom:`1px solid #e2e8f0`, marginBottom:16 }}>
            <div>
              {logoUrl && <img src={logoUrl} alt="logo" style={{ height:40, marginBottom:6, objectFit:"contain" }} />}
              <div style={{ fontWeight:700, fontSize:17, color:"#0f172a" }}>{company?.company_name}</div>
              <div style={{ fontSize:11, color:"#64748b" }}>{company?.company_address}</div>
              <div style={{ fontSize:11, color:"#64748b" }}>Ph: {company?.phone} · GSTIN: {company?.gstin}</div>
              <div style={{ fontSize:11, color:"#64748b" }}>GST: {company?.gst_type}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:800, fontSize:22, color, textTransform:"uppercase", letterSpacing:1 }}>Invoice</div>
              <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>{invoice.invoice_no}</div>
              <div style={{ fontSize:12, color:"#94a3b8" }}>{today}</div>
            </div>
          </div>

          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:4 }}>Bill To</div>
            <div style={{ fontWeight:600, fontSize:14 }}>{invoice.customer_name}</div>
            <div style={{ fontSize:12, color:"#64748b" }}>{invoice.customer_phone}</div>
          </div>

          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ borderBottom:`2px solid ${color}` }}>
                {["Item","Qty","Price","GST","Amount"].map(h => (
                  <th key={h} style={{ padding:"6px 8px", textAlign: h==="Item" ? "left" : "right", fontSize:10, textTransform:"uppercase", letterSpacing:.5, color:"#94a3b8", fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.products.map((p, i) => {
                const base = p.price * p.qty;
                const gstAmt = (base * p.gst) / 100;
                return (
                  <tr key={i} style={{ borderBottom:"1px solid #f1f5f9" }}>
                    <td style={{ padding:"8px 8px", fontWeight:500 }}>{p.display_name || `${p.name}`}</td>
                    <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>{p.qty}</td>
                    <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>₹{p.price}</td>
                    <td style={{ padding:"8px 8px", textAlign:"right", color:"#64748b" }}>₹{gstAmt.toFixed(2)}<br/><span style={{fontSize:10,color:"#cbd5e1"}}>({p.gst}%)</span></td>
                    <td style={{ padding:"8px 8px", textAlign:"right", fontWeight:700, color }}>₹{(base+gstAmt).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
            <div style={{ width:240 }}>
              {[["Sub Total",`₹${invoice.sub_total}`],["GST",`₹${invoice.gst_total}`]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12, color:"#64748b", borderBottom:"1px solid #f1f5f9" }}>
                  <span>{k}</span><span style={{color:"#1e293b"}}>{v}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 6px", fontWeight:700, fontSize:15 }}>
                <span style={{color}}>Grand Total</span><span style={{color}}>₹{invoice.total_amount}</span>
              </div>
              <div style={{ fontSize:12, color:"#94a3b8", borderTop:"1px solid #f1f5f9", paddingTop:6 }}>
                <span style={{textTransform:"uppercase",fontWeight:600,color:"#475569"}}>{invoice.payment_method}</span> &nbsp;·&nbsp; Paid: <b style={{color:"#1e293b"}}>₹{invoice.paid_amount}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 7. POS Receipt ──────────────────────────────────────────────────────── */
function DesignPOS({ invoice, company, color, logoUrl }) {
  const today = new Date().toLocaleDateString("en-IN");
  const time  = new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });

  const S = {
    wrap:   { fontFamily:"'Courier New',Courier,monospace", fontSize:11, color:"#111", width:"100%", maxWidth:320, margin:"0 auto" },
    center: { textAlign:"center" },
    bold:   { fontWeight:"bold" },
    div:    { borderTop:"1px dashed #999", margin:"7px 0" },
    row:    { display:"flex", justifyContent:"space-between", margin:"2px 0" },
    sm:     { fontSize:10, color:"#444" },
    th:     { borderBottom:"1px dashed #999", padding:"3px 0", fontWeight:"bold", fontSize:10 },
    td:     { padding:"2px 0",  verticalAlign:"top", fontSize:10 },
    tdr:    { padding:"2px 0", textAlign:"right",  verticalAlign:"top", fontSize:10 },
    total:  { display:"flex", justifyContent:"space-between", fontWeight:"bold", fontSize:14, borderTop:"1px dashed #999", paddingTop:5, marginTop:5 },
    paid:   { fontSize:16, fontWeight:"bold", textAlign:"center", margin:"7px 0", letterSpacing:1 },
  };

  return (
    <div style={S.wrap}>

      {/* ── Shop Header ── */}
      {logoUrl && (
        <div style={{ textAlign:"center", marginBottom:6 }}>
          <img src={logoUrl} alt="logo" style={{ height:48, objectFit:"contain" }} />
        </div>
      )}
      <div style={{ ...S.center, ...S.bold, fontSize:15 }}>{company?.company_name}</div>
      <div style={{ ...S.center, ...S.sm }}>{company?.company_address}</div>
      <div style={{ ...S.center, ...S.sm }}>Ph: {company?.phone}</div>
      <div style={{ ...S.center, ...S.sm }}>GSTIN: {company?.gstin}</div>
      <div style={{ ...S.center, ...S.sm }}>GST: {company?.gst_type}</div>

      <div style={S.div} />

      {/* ── Invoice Meta ── */}
      <div style={{ ...S.center, ...S.bold, letterSpacing:2, fontSize:12 }}>*** TAX INVOICE ***</div>
      <div style={{ ...S.row, ...S.sm, marginTop:4 }}>
        <span>Bill No: {invoice.invoice_no}</span>
        <span>{today} {time}</span>
      </div>
      <div style={{ ...S.row, ...S.sm }}>
        <span>Customer: {invoice.customer_name}</span>
        <span>{invoice.customer_phone}</span>
      </div>

      <div style={S.div} />

      {/* ── Items Table ── */}
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <th style={{ ...S.th, textAlign:"left",  width:"40%" }}>Item</th>
            <th style={{ ...S.th, textAlign:"right", width:"10%" }}>Qty</th>
            <th style={{ ...S.th, textAlign:"right", width:"22%" }}>Rate</th>
            <th style={{ ...S.th, textAlign:"right", width:"28%" }}>Amt</th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((p, i) => {
            const base   = p.price * p.qty;
            const gstAmt = (base * p.gst) / 100;
            const total  = base + gstAmt;
            return (
              <>
                <tr key={`item-${i}`}>
                  <td style={S.td}>{p.display_name || p.name}</td>
                  <td style={S.tdr}>{p.qty}</td>
                  <td style={S.tdr}>₹{p.price}</td>
                  <td style={S.tdr}>₹{base.toFixed(2)}</td>
                </tr>
                {p.gst > 0 && (
                  <tr key={`gst-${i}`}>
                    <td colSpan={3} style={{ ...S.td, color:"#666", paddingLeft:6 }}>
                      GST @{p.gst}%: ₹{gstAmt.toFixed(2)}
                    </td>
                    <td style={{ ...S.tdr, fontWeight:"bold" }}>₹{total.toFixed(2)}</td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <div style={S.div} />

      {/* ── Summary ── */}
      <div style={{ ...S.row, ...S.sm }}><span>Items</span><span>{invoice.products.reduce((s,p)=>s+p.qty,0)}</span></div>
      <div style={{ ...S.row, ...S.sm }}><span>Sub Total</span><span>₹{invoice.sub_total}</span></div>
      <div style={{ ...S.row, ...S.sm }}><span>Total GST</span><span>₹{invoice.gst_total}</span></div>

      <div style={S.total}>
        <span>TOTAL</span>
        <span>₹{invoice.total_amount}</span>
      </div>

      <div style={S.div} />

      {/* ── Payment ── */}
      <div style={{ ...S.row, ...S.sm }}>
        <span>Mode</span>
        <span style={{ fontWeight:"bold", textTransform:"uppercase" }}>{invoice.payment_method}</span>
      </div>

      <div style={{ ...S.paid, color }}>
        *** PAID: ₹{invoice.paid_amount} ***
      </div>

      <div style={S.div} />

      {/* ── Footer ── */}
      <div style={{ ...S.center, ...S.sm }}>Thank You! Visit Again :)</div>
      <div style={{ ...S.center, fontSize:9, color:"#aaa", marginTop:4 }}>{company?.company_name}</div>
      <div style={{ ...S.center, fontSize:9, color:"#aaa", marginBottom:4 }}>
        {"- ".repeat(22)}
      </div>
    </div>
  );
}

/* ─── DESIGN MAP ─────────────────────────────────────────────────────────── */
const DESIGN_COMPONENTS = {
  original:  DesignOriginal,
  classic:   DesignClassic,
  modern:    DesignModern,
  bold:      DesignBold,
  minimal:   DesignMinimal,
  corporate: DesignCorporate,
  stripe:    DesignStripe,
  pos:       DesignPOS,
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function InvoicePreview() {
  const { invoiceNo } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);
  const [color,   setColor]   = useState("#2563eb");
  const [design,  setDesign]  = useState("original");

  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = PRINT_CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    api.get(`/invoice/get_invoice_by_id.php?id=${invoiceNo}`).then(res => {
      if (res.data.status) {
        setInvoice(res.data.data);
        setCompany(res.data.data);
      }
    });
  }, [invoiceNo]);

  if (!invoice) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60vh", fontFamily:"sans-serif", color:"#94a3b8", fontSize:14 }}>
      Loading invoice…
    </div>
  );

  const logoUrl = company?.logo ? `${API_BASE_URL}${company.logo}` : null;
  const isPOS   = design === "pos";

  const downloadPDF = () => {
    const element = document.getElementById("invoice");
    html2pdf().set({
      margin: isPOS ? 5 : 10,
      filename: `invoice-${invoice.invoice_no}.pdf`,
      html2canvas: { scale:2, useCORS:true },
      jsPDF: { unit:"mm", format: isPOS ? [80, 200] : "a4" },
    }).from(element).save();
  };

  const shareWhatsApp = () => {
    const msg = `Invoice No: ${invoice.invoice_no}\nAmount: ₹${invoice.total_amount}\nFrom: ${company?.company_name}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };

  const ActiveDesign = DESIGN_COMPONENTS[design];

  return (
    <div style={{ minHeight:"100vh", background:"#f1f5f9", fontFamily:"'Segoe UI',Arial,sans-serif", padding:"24px 16px 40px" }}>

      {/* ── Controls ── */}
      <div className="no-print" style={{ maxWidth:800, margin:"0 auto 20px" }}>

        {/* Action Buttons */}
        <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
          {[
            { label:"Print",    onClick: () => window.print(), bg:"#1d4ed8" },
            { label:"PDF",      onClick: downloadPDF,          bg:"#16a34a" },
            { label:"WhatsApp", onClick: shareWhatsApp,        bg:"#15803d" },
          ].map(b => (
            <button key={b.label} onClick={b.onClick} style={{
              background:b.bg, color:"#fff", border:"none", borderRadius:8,
              padding:"9px 22px", fontWeight:600, fontSize:13, cursor:"pointer",
              fontFamily:"'Segoe UI',Arial,sans-serif",
            }}>{b.label}</button>
          ))}
        </div>

        {/* Design Selector */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:8, fontWeight:600 }}>
            Choose Design
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {DESIGNS.map(d => (
              <button key={d.id} onClick={() => setDesign(d.id)} style={{
                padding:"7px 18px", borderRadius:20, cursor:"pointer",
                fontFamily:"'Segoe UI',Arial,sans-serif", fontSize:13, fontWeight:600,
                border:   design === d.id ? `2px solid ${color}` : "1.5px solid #e2e8f0",
                background: design === d.id ? color : "#fff",
                color:    design === d.id ? "#fff" : "#475569",
                transition:"all .15s",
              }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:1, color:"#94a3b8", marginBottom:8, fontWeight:600 }}>
            Choose Color
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {COLORS.map(c => (
              <div key={c} onClick={() => setColor(c)} style={{
                width:26, height:26, borderRadius:"50%", background:c, cursor:"pointer",
                border:       color === c ? "3px solid #1e293b" : "2px solid transparent",
                outline:      color === c ? `2px solid ${c}` : "none",
                outlineOffset:2,
                transition:   "transform .1s",
                transform:    color === c ? "scale(1.2)" : "scale(1)",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Invoice Paper ── */}
      <div
        id="invoice"
        style={{
          background: "#fff",
          maxWidth:   isPOS ? 360 : 800,
          margin:     "0 auto",
          padding:    isPOS ? "20px 18px" : "30px 32px",
          border:     isPOS ? "1px dashed #bbb" : "1px solid #e2e8f0",
        }}
      >
        <ActiveDesign
          invoice={invoice}
          company={company}
          color={color}
          logoUrl={logoUrl}
        />
      </div>
    </div>
  );
}