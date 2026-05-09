// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { FileText, Search, ChevronLeft, ChevronRight, Eye, Receipt } from "lucide-react";

// // ── inject styles once ────────────────────────────────────────────────────────
// function useStyles() {
//   useEffect(() => {
//     const id = "reports-styles";
//     if (document.getElementById(id)) return;
//     const s = document.createElement("style");
//     s.id = id;
//     s.innerHTML = `
//       @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//       .rp * { box-sizing: border-box; }
//       @keyframes rp-in  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
//       @keyframes rp-spin { to{transform:rotate(360deg)} }
//       .rp-row { transition: background .15s; cursor: pointer; }
//       .rp-row:hover td { background: #f5f7ff !important; }
//       .rp-row:hover .rp-view-btn { opacity: 1 !important; transform: scale(1) !important; }
//       .rp-view-btn { transition: all .18s; }
//       .rp-pg-btn { transition: all .18s; }
//       .rp-pg-btn:hover:not(:disabled) { background: #e0e7ff !important; color: #4338ca !important; }
//       .rp-search:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,.1) !important; }
//       .rp-card { animation: rp-in .4s ease both; }
//     `;
//     document.head.appendChild(s);
//     return () => document.head.removeChild(s);
//   }, []);
// }

// export default function Reports() {
//   useStyles();
//   const navigate = useNavigate();
//   const font = "'Plus Jakarta Sans', sans-serif";

//   const [invoices, setInvoices]     = useState([]);
//   const [search, setSearch]         = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading]       = useState(true);

//   const recordsPerPage = 10;

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user?.company_id) return;
//         const res = await api.post("/invoice/get_all_invoice.php", { company_id: user.company_id });
//         if (res.data.status) setInvoices(res.data.data);
//       } catch (err) { console.error(err); }
//       finally { setLoading(false); }
//     };
//     fetchInvoices();
//   }, []);

//   // search filter
//   const filtered = invoices.filter(inv =>
//     inv.invoice_no?.toLowerCase().includes(search.toLowerCase()) ||
//     inv.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
//     inv.customer_phone?.includes(search)
//   );

//   // pagination on filtered
//   const totalPages      = Math.ceil(filtered.length / recordsPerPage);
//   const indexOfFirst    = (currentPage - 1) * recordsPerPage;
//   const currentInvoices = filtered.slice(indexOfFirst, indexOfFirst + recordsPerPage);

//   const goTo   = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));
//   const pages  = Array.from({ length: totalPages }, (_, i) => i + 1);

//   // reset page on search
//   const handleSearch = (v) => { setSearch(v); setCurrentPage(1); };

//   // ── render ─────────────────────────────────────────────────────────────────
//   return (
//     <div className="rp" style={{ fontFamily: font, padding: "22px 26px" }}>

//       {/* ── Page header (matches Products page style) ── */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//           <div style={{ fontSize: 28 }}>🧾</div>
//           <div>
//             <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e1b4b" }}>Invoice Reports</h1>
//             <p style={{ margin: "2px 0 0", fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>
//               View and manage all your invoices
//             </p>
//           </div>
//         </div>

//         {/* Total / Showing pills — matches Products page */}
//         <div style={{ display: "flex", gap: 10 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: "1.5px solid #e0e7ff", borderRadius: 12, padding: "8px 16px" }}>
//             <span style={{ fontSize: 15, fontWeight: 800, color: "#4338ca" }}>{invoices.length}</span>
//             <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>Total</span>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: "1.5px solid #e0e7ff", borderRadius: 12, padding: "8px 16px" }}>
//             <span style={{ fontSize: 15, fontWeight: 800, color: "#4338ca" }}>{filtered.length}</span>
//             <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280" }}>Showing</span>
//           </div>
//         </div>
//       </div>

//       {/* ── Search bar (matches Products page) ── */}
//       <div style={{ position: "relative", marginBottom: 18 }}>
//         <Search size={16} color="#6366f1" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
//         <input
//           className="rp-search"
//           value={search}
//           onChange={e => handleSearch(e.target.value)}
//           placeholder="Search invoices by number, customer or phone..."
//           style={{
//             width: "100%", padding: "12px 16px 12px 44px",
//             background: "#fff", border: "1.5px solid #e0e7ff",
//             borderRadius: 14, fontSize: 14, color: "#1e1b4b",
//             fontFamily: font, outline: "none",
//             boxShadow: "0 1px 6px rgba(99,102,241,.05)",
//           }}
//         />
//       </div>

//       {/* ── Table card ── */}
//       <div className="rp-card" style={{
//         background: "#fff", borderRadius: 20,
//         border: "1.5px solid #e0e7ff",
//         overflow: "hidden",
//         boxShadow: "0 2px 16px rgba(99,102,241,.07)",
//         marginBottom: 18,
//       }}>

//         {/* Blue top accent bar — same as Products page */}
//         <div style={{ height: 4, background: "linear-gradient(90deg, #4338ca, #6366f1, #818cf8)" }} />

//         {/* Table */}
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: font }}>

//             {/* Head — matches Products page indigo header */}
//             <thead>
//               <tr style={{ background: "#eef2ff" }}>
//                 {["#", "Invoice No", "Customer", "Phone", "Total Amount", "Action"].map((h, i) => (
//                   <th key={i} style={{
//                     padding: "12px 18px", textAlign: i === 5 ? "center" : "left",
//                     fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
//                     textTransform: "uppercase", color: "#4338ca",
//                     borderBottom: "1.5px solid #e0e7ff",
//                   }}>
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={6} style={{ padding: "52px 20px", textAlign: "center" }}>
//                     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#6366f1", fontWeight: 600, fontSize: 14 }}>
//                       <span style={{ width: 18, height: 18, border: "2.5px solid #c7d2fe", borderTopColor: "#6366f1", borderRadius: "50%", display: "inline-block", animation: "rp-spin .8s linear infinite" }} />
//                       Loading invoices…
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentInvoices.length > 0 ? (
//                 currentInvoices.map((inv, i) => {
//                   const rowNum = indexOfFirst + i + 1;
//                   return (
//                     <tr key={i} className="rp-row" onClick={() => navigate(`/invoice/${inv.invoice_no}`)}
//                       style={{ borderBottom: "1px solid #f3f4f6" }}>

//                       {/* # */}
//                       <td style={{ padding: "14px 18px", background: "#fff" }}>
//                         <div style={{ width: 28, height: 28, borderRadius: 8, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#4338ca" }}>
//                           {String(rowNum).padStart(2, "0")}
//                         </div>
//                       </td>

//                       {/* Invoice No — indigo like Products page */}
//                       <td style={{ padding: "14px 18px", background: "#fff" }}>
//                         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                           <div style={{ width: 32, height: 32, borderRadius: 10, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                             <Receipt size={14} color="#4338ca" />
//                           </div>
//                           <span style={{ fontSize: 13.5, fontWeight: 700, color: "#4338ca" }}>{inv.invoice_no}</span>
//                         </div>
//                       </td>

//                       {/* Customer */}
//                       <td style={{ padding: "14px 18px", background: "#fff" }}>
//                         <div style={{ fontSize: 14, fontWeight: 600, color: "#1e1b4b" }}>{inv.customer_name}</div>
//                       </td>

//                       {/* Phone */}
//                       <td style={{ padding: "14px 18px", background: "#fff" }}>
//                         <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{inv.customer_phone}</span>
//                       </td>

//                       {/* Amount — green like Products OK badge */}
//                       <td style={{ padding: "14px 18px", background: "#fff" }}>
//                         <span style={{ fontSize: 15, fontWeight: 800, color: "#15803d" }}>
//                           ₹{Number(inv.total_amount).toLocaleString()}
//                         </span>
//                       </td>

//                       {/* Action */}
//                       <td style={{ padding: "14px 18px", background: "#fff", textAlign: "center" }}>
//                         <button
//                           className="rp-view-btn"
//                           onClick={e => { e.stopPropagation(); navigate(`/invoice/${inv.invoice_no}`); }}
//                           style={{
//                             display: "inline-flex", alignItems: "center", gap: 6,
//                             background: "#eef2ff", border: "1.5px solid #c7d2fe",
//                             color: "#4338ca", borderRadius: 10, padding: "7px 14px",
//                             fontSize: 12.5, fontWeight: 700, cursor: "pointer",
//                             fontFamily: font, opacity: 0.85, transform: "scale(0.97)",
//                           }}
//                         >
//                           <Eye size={13} /> View
//                         </button>
//                       </td>

//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={6} style={{ padding: "52px 20px", textAlign: "center", background: "#fff" }}>
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
//                       <FileText size={32} color="#c7d2fe" />
//                       <span style={{ fontSize: 14, color: "#9ca3af", fontWeight: 500 }}>
//                         {search ? "No invoices match your search" : "No invoices found"}
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ── Pagination ── */}
//       {totalPages > 1 && (
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

//           {/* Prev */}
//           <button className="rp-pg-btn" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}
//             style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#fff", border: "1.5px solid #e0e7ff", borderRadius: 10, fontFamily: font, fontSize: 13, fontWeight: 600, color: currentPage === 1 ? "#c4b5fd" : "#4338ca", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
//             <ChevronLeft size={15} /> Prev
//           </button>

//           {/* Page numbers */}
//           <div style={{ display: "flex", gap: 6 }}>
//             {pages.map(p => (
//               <button key={p} className="rp-pg-btn" onClick={() => goTo(p)}
//                 style={{
//                   width: 36, height: 36, borderRadius: 10, border: "1.5px solid",
//                   fontFamily: font, fontSize: 13, fontWeight: 700, cursor: "pointer",
//                   borderColor: currentPage === p ? "#6366f1" : "#e0e7ff",
//                   background: currentPage === p ? "#6366f1" : "#fff",
//                   color: currentPage === p ? "#fff" : "#4338ca",
//                 }}>
//                 {p}
//               </button>
//             ))}
//           </div>

//           {/* Next */}
//           <button className="rp-pg-btn" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages}
//             style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#fff", border: "1.5px solid #e0e7ff", borderRadius: 10, fontFamily: font, fontSize: 13, fontWeight: 600, color: currentPage === totalPages ? "#c4b5fd" : "#4338ca", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
//             Next <ChevronRight size={15} />
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Receipt,
  Download
} from "lucide-react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// ── inject styles ────────────────────────────────────────────────────────────

function useStyles() {

  useEffect(() => {

    const id = "reports-styles";

    if (document.getElementById(id)) return;

    const s = document.createElement("style");

    s.id = id;

    s.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

      .rp * {
        box-sizing: border-box;
      }

      @keyframes rp-in {
        from {
          opacity: 0;
          transform: translateY(14px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }

      @keyframes rp-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .rp-row {
        transition: background .15s;
        cursor: pointer;
      }

      .rp-row:hover td {
        background: #f5f7ff !important;
      }

      .rp-row:hover .rp-view-btn {
        opacity: 1 !important;
        transform: scale(1) !important;
      }

      .rp-view-btn {
        transition: all .18s;
      }

      .rp-pg-btn {
        transition: all .18s;
      }

      .rp-pg-btn:hover:not(:disabled) {
        background: #e0e7ff !important;
        color: #4338ca !important;
      }

      .rp-search:focus {
        border-color: #6366f1 !important;
        box-shadow: 0 0 0 3px rgba(99,102,241,.1) !important;
      }

      .rp-card {
        animation: rp-in .4s ease both;
      }
    `;

    document.head.appendChild(s);

    return () => document.head.removeChild(s);

  }, []);
}

export default function Reports() {

  useStyles();

  const navigate = useNavigate();

  const font = "'Plus Jakarta Sans', sans-serif";

  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const recordsPerPage = 10;

  // ── fetch invoices ────────────────────────────────────────────────────────

  useEffect(() => {

    const fetchInvoices = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.company_id) return;

        const res = await api.post(
          "/invoice/get_all_invoice.php",
          {
            company_id: user.company_id
          }
        );

        if (res.data.status) {

          setInvoices(res.data.data);
        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

    fetchInvoices();

  }, []);

  // ── search filter ─────────────────────────────────────────────────────────

  const filtered = invoices.filter(inv =>

    inv.invoice_no?.toLowerCase().includes(search.toLowerCase()) ||

    inv.customer_name?.toLowerCase().includes(search.toLowerCase()) ||

    inv.customer_phone?.includes(search)
  );

  // ── pagination ────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  const indexOfFirst = (currentPage - 1) * recordsPerPage;

  const currentInvoices = filtered.slice(
    indexOfFirst,
    indexOfFirst + recordsPerPage
  );

  const goTo = (p) => {

    setCurrentPage(
      Math.max(1, Math.min(p, totalPages))
    );
  };

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  const handleSearch = (v) => {

    setSearch(v);

    setCurrentPage(1);
  };

  // ── excel download ────────────────────────────────────────────────────────

  const downloadExcel = () => {

    if (!startDate || !endDate) {

      alert("Please select start date and end date");

      return;
    }

    const start = new Date(startDate);

    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const filteredData = invoices.filter(inv => {

      const invoiceDate = new Date(
        inv.created_at || inv.date || inv.created_date
      );

      return invoiceDate >= start && invoiceDate <= end;
    });

    if (filteredData.length === 0) {

      alert("No reports found");

      return;
    }

    const excelData = filteredData.map((inv, index) => ({

      "S.No": index + 1,

      "Invoice No": inv.invoice_no,

      "Customer Name": inv.customer_name,

      "Phone Number": inv.customer_phone,

      "Total Amount": `₹${Number(inv.total_amount).toLocaleString()}`,

      "Created Date": inv.created_at || inv.date || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // column widths

    worksheet["!cols"] = [
      { wch: 10 },
      { wch: 22 },
      { wch: 30 },
      { wch: 20 },
      { wch: 18 },
      { wch: 25 }
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Invoice Report"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array"
      }
    );

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

    saveAs(
      blob,
      `invoice_report_${startDate}_to_${endDate}.xlsx`
    );
  };

  // ── render ────────────────────────────────────────────────────────────────

  return (

    <div
      className="rp"
      style={{
        fontFamily: font,
        padding: "22px 26px"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
          flexWrap: "wrap",
          gap: 16
        }}
      >

        {/* left */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >

          <div style={{ fontSize: 28 }}>
            🧾
          </div>

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: "#1e1b4b"
              }}
            >
              Invoice Reports
            </h1>

            <p
              style={{
                margin: "2px 0 0",
                fontSize: 13,
                color: "#9ca3af"
              }}
            >
              View and manage all your invoices
            </p>

          </div>

        </div>

        {/* right */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap"
          }}
        >

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              fontFamily: font,
              fontSize: 13,
              outline: "none"
            }}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1.5px solid #dbeafe",
              fontFamily: font,
              fontSize: 13,
              outline: "none"
            }}
          />

          <button
            onClick={downloadExcel}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#4338ca",
              border: "none",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: font,
              boxShadow: "0 2px 10px rgba(67,56,202,.2)"
            }}
          >
            <Download size={15} />
            Download
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div
        style={{
          position: "relative",
          marginBottom: 18
        }}
      >

        <Search
          size={16}
          color="#6366f1"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)"
          }}
        />

        <input
          className="rp-search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search invoices..."
          style={{
            width: "100%",
            padding: "12px 16px 12px 44px",
            background: "#fff",
            border: "1.5px solid #e0e7ff",
            borderRadius: 14,
            fontSize: 14,
            outline: "none"
          }}
        />

      </div>

      {/* TABLE */}

      <div
        className="rp-card"
        style={{
          background: "#fff",
          borderRadius: 20,
          border: "1.5px solid #e0e7ff",
          overflow: "hidden"
        }}
      >

        <div
          style={{
            height: 4,
            background:
              "linear-gradient(90deg,#4338ca,#6366f1,#818cf8)"
          }}
        />

        <div style={{ overflowX: "auto" }}>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >

            <thead>

              <tr style={{ background: "#eef2ff" }}>

                {[
                  "#",
                  "Invoice No",
                  "Customer",
                  "Phone",
                  "Amount",
                  "Action"
                ].map((h, i) => (

                  <th
                    key={i}
                    style={{
                      padding: "12px 18px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#4338ca",
                      borderBottom: "1px solid #dbeafe"
                    }}
                  >
                    {h}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    style={{
                      padding: "50px",
                      textAlign: "center"
                    }}
                  >
                    Loading...
                  </td>

                </tr>

              ) : currentInvoices.length > 0 ? (

                currentInvoices.map((inv, i) => {

                  const rowNum = indexOfFirst + i + 1;

                  return (

                    <tr
                      key={i}
                      className="rp-row"
                      onClick={() =>
                        navigate(`/invoice/${inv.invoice_no}`)
                      }
                    >

                      <td style={{ padding: "14px 18px" }}>
                        {rowNum}
                      </td>

                      <td style={{ padding: "14px 18px" }}>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                          }}
                        >

                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              background: "#eef2ff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Receipt
                              size={14}
                              color="#4338ca"
                            />
                          </div>

                          <span
                            style={{
                              fontWeight: 700,
                              color: "#4338ca"
                            }}
                          >
                            {inv.invoice_no}
                          </span>

                        </div>

                      </td>

                      <td style={{ padding: "14px 18px" }}>
                        {inv.customer_name}
                      </td>

                      <td style={{ padding: "14px 18px" }}>
                        {inv.customer_phone}
                      </td>

                      <td
                        style={{
                          padding: "14px 18px",
                          color: "#15803d",
                          fontWeight: 700
                        }}
                      >
                        ₹{Number(inv.total_amount).toLocaleString()}
                      </td>

                      <td style={{ padding: "14px 18px" }}>

                        <button
                          className="rp-view-btn"
                          onClick={(e) => {

                            e.stopPropagation();

                            navigate(`/invoice/${inv.invoice_no}`);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "#eef2ff",
                            border: "1px solid #c7d2fe",
                            color: "#4338ca",
                            borderRadius: 10,
                            padding: "7px 14px",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                        >
                          <Eye size={13} />
                          View
                        </button>

                      </td>

                    </tr>

                  );
                })

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    style={{
                      padding: "50px",
                      textAlign: "center"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10
                      }}
                    >

                      <FileText
                        size={32}
                        color="#c7d2fe"
                      />

                      <span
                        style={{
                          color: "#9ca3af"
                        }}
                      >
                        No invoices found
                      </span>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 18
          }}
        >

          {/* prev */}

          <button
            className="rp-pg-btn"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#fff",
              border: "1px solid #dbeafe",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            <ChevronLeft size={15} />
            Prev
          </button>

          {/* pages */}

          <div
            style={{
              display: "flex",
              gap: 6
            }}
          >

            {pages.map((p) => (

              <button
                key={p}
                onClick={() => goTo(p)}
                className="rp-pg-btn"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "1px solid #dbeafe",
                  background:
                    currentPage === p
                      ? "#4338ca"
                      : "#fff",
                  color:
                    currentPage === p
                      ? "#fff"
                      : "#4338ca",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {p}
              </button>

            ))}

          </div>

          {/* next */}

          <button
            className="rp-pg-btn"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#fff",
              border: "1px solid #dbeafe",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            Next
            <ChevronRight size={15} />
          </button>

        </div>

      )}

    </div>
  );
}