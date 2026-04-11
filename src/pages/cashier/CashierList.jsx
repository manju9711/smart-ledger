// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import { Pencil, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function CashierList() {
//   const [cashiers, setCashiers] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const fetchCashiers = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const res = await api.post("/cashier/get_cashiers.php", {
//       company_id: user.company_id
//     });

//     if (res.data.status) {
//       setCashiers(res.data.data);
//     }
//   };

//   useEffect(() => {
//     fetchCashiers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this cashier?")) return;

//     const res = await api.post("/cashier/delete_cashier.php", { id });

//     if (res.data.status) {
//       setCashiers(prev => prev.filter(c => c.id !== id));
//     }
//   };

//   // 🔍 FILTER
//   const filtered = cashiers.filter(c =>
//     c.name.toLowerCase().includes(search.toLowerCase()) ||
//     c.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-700">Cashiers</h1>

//         <button
//           onClick={() => navigate("/cashier/add")}
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow"
//         >
//           + Add Cashier
//         </button>
//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search cashier..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
//       />

//       {/* TABLE CARD */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">

//         {/* TABLE HEADER */}
//         <div className="grid grid-cols-3 bg-gray-100 px-6 py-3 font-semibold text-gray-600">
//           <span>Name</span>
//           <span>Email</span>
//           <span className="text-center">Actions</span>
//         </div>

//         {/* TABLE BODY */}
//         {filtered.map((c) => (
//           <div
//             key={c.id}
//             className="grid grid-cols-3 px-6 py-4 border-t items-center"
//           >
//             <span className="font-medium text-gray-700">{c.name}</span>
//             <span className="text-gray-600">{c.email}</span>

//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={() => navigate(`/cashier/edit/${c.id}`)}
//                 className="bg-blue-100 text-blue-600 p-2 rounded-lg"
//               >
//                 <Pencil size={16} />
//               </button>

//               <button
//                 onClick={() => handleDelete(c.id)}
//                 className="bg-red-100 text-red-600 p-2 rounded-lg"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* EMPTY STATE */}
//         {filtered.length === 0 && (
//           <p className="text-center py-6 text-gray-400">
//             No cashiers found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pencil, Trash2, Search, UserPlus, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PER_PAGE = 5;

export default function CashierList() {
  const [cashiers, setCashiers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchCashiers = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await api.post("/cashier/get_cashiers.php", { company_id: user.company_id });
    if (res.data.status) setCashiers(res.data.data);
  };

  useEffect(() => { fetchCashiers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cashier?")) return;
    const res = await api.post("/cashier/delete_cashier.php", { id });
    if (res.data.status) setCashiers(prev => prev.filter(c => c.id !== id));
  };

  const filtered = cashiers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };

  const getInitials = (name) => name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "??";

  const avatarColors = [
    ["#dbeafe","#1d4ed8"], ["#ede9fe","#6d28d9"], ["#dcfce7","#15803d"],
    ["#fef3c7","#b45309"], ["#fce7f3","#be185d"], ["#e0f2fe","#0369a1"]
  ];
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .cl-root {
          font-family: 'DM Sans', sans-serif;
          padding: 2rem;
          min-height: 100vh;
          background: #f0f5ff;
          position: relative;
        }

        .cl-root::before {
          content: '';
          position: fixed;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 50%;
        }

        /* HEADER */
        .cl-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          animation: fadeDown 0.4s ease both;
        }

        .cl-title-group {}
        .cl-title {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #1e3a8a;
          margin: 0;
          letter-spacing: -0.4px;
        }
        .cl-title-sub {
          font-size: 13px;
          color: #93a3b8;
          margin: 3px 0 0;
        }

        .cl-add-btn {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 11px 20px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(37,99,235,0.4);
          transition: all 0.2s;
          position: relative; overflow: hidden;
        }
        .cl-add-btn::after {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.35s;
        }
        .cl-add-btn:hover::after { left: 100%; }
        .cl-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,99,235,0.45); }
        .cl-add-btn:active { transform: translateY(0); }

        /* STATS ROW */
        .cl-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
          animation: fadeDown 0.4s 0.05s ease both;
        }
        .cl-stat {
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.95);
          border-radius: 16px;
          padding: 1rem 1.25rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 10px rgba(37,99,235,0.07);
        }
        .cl-stat-label { font-size: 12px; color: #94a3b8; font-weight: 500; margin-bottom: 4px; }
        .cl-stat-value { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: #1e3a8a; }
        .cl-stat-sub { font-size: 11px; color: #22c55e; font-weight: 500; margin-top: 2px; }

        /* SEARCH BAR */
        .cl-search-wrap {
          position: relative;
          margin-bottom: 1.5rem;
          animation: fadeDown 0.4s 0.08s ease both;
        }
        .cl-search-icon {
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%);
          color: #93c5fd; pointer-events: none;
        }
        .cl-search {
          width: 100%;
          padding: 13px 16px 13px 46px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          background: rgba(255,255,255,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(37,99,235,0.06);
        }
        .cl-search::placeholder { color: #b0bec5; }
        .cl-search:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.12), 0 2px 8px rgba(37,99,235,0.08);
        }

        /* TABLE CARD */
        .cl-card {
          background: rgba(255,255,255,0.92);
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.95);
          box-shadow: 0 4px 24px rgba(37,99,235,0.1), 0 1px 3px rgba(37,99,235,0.06);
          overflow: hidden;
          backdrop-filter: blur(16px);
          animation: fadeUp 0.4s 0.1s ease both;
        }

        @keyframes fadeDown { from { opacity:0; transform:translateY(-14px);} to {opacity:1;transform:translateY(0);}}
        @keyframes fadeUp   { from { opacity:0; transform:translateY(14px); } to {opacity:1;transform:translateY(0);}}

        /* TABLE HEAD */
        .cl-thead {
          display: grid;
          grid-template-columns: 2fr 2.5fr 1fr;
          padding: 0 1.5rem;
          background: linear-gradient(to right, #eff6ff, #f0f9ff);
          border-bottom: 1.5px solid #e0ecff;
        }
        .cl-th {
          padding: 13px 0;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #3b82f6;
        }
        .cl-th:last-child { text-align: center; }

        /* ROWS */
        .cl-row {
          display: grid;
          grid-template-columns: 2fr 2.5fr 1fr;
          padding: 0 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
          transition: background 0.15s;
        }
        .cl-row:last-child { border-bottom: none; }
        .cl-row:hover { background: #f8fbff; }

        .cl-cell { padding: 14px 0; }

        .cl-name-wrap { display: flex; align-items: center; gap: 11px; }
        .cl-avatar {
          width: 36px; height: 36px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 12px; font-weight: 700;
          flex-shrink: 0;
        }
        .cl-name { font-weight: 500; font-size: 14px; color: #1e293b; }
        .cl-id-badge {
          font-size: 10px; color: #94a3b8;
          background: #f1f5f9; border-radius: 6px;
          padding: 1px 6px; margin-top: 2px;
          display: inline-block;
        }

        .cl-email { font-size: 13.5px; color: #64748b; }

        .cl-actions { display: flex; justify-content: center; gap: 8px; }

        .cl-btn-edit, .cl-btn-del {
          width: 34px; height: 34px; border-radius: 10px;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.18s;
        }
        .cl-btn-edit { background: #eff6ff; color: #2563eb; }
        .cl-btn-edit:hover { background: #2563eb; color: #fff; transform: scale(1.1); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
        .cl-btn-del { background: #fff1f2; color: #e11d48; }
        .cl-btn-del:hover { background: #e11d48; color: #fff; transform: scale(1.1); box-shadow: 0 4px 12px rgba(225,29,72,0.3); }

        /* EMPTY */
        .cl-empty {
          padding: 3.5rem 2rem;
          text-align: center;
        }
        .cl-empty-icon {
          width: 64px; height: 64px; border-radius: 20px;
          background: #eff6ff; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1rem;
        }
        .cl-empty-text { font-size: 15px; color: #94a3b8; font-weight: 500; }
        .cl-empty-sub { font-size: 13px; color: #b0bec5; margin-top: 4px; }

        /* PAGINATION */
        .cl-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-top: 1.5px solid #e0ecff;
          background: #f8fbff;
        }
        .cl-page-info { font-size: 12.5px; color: #64748b; }
        .cl-page-info b { color: #1e3a8a; }

        .cl-page-btns { display: flex; align-items: center; gap: 6px; }

        .cl-page-nav {
          width: 34px; height: 34px; border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff; color: #3b82f6;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.18s;
        }
        .cl-page-nav:hover:not(:disabled) { background: #2563eb; color: #fff; border-color: #2563eb; box-shadow: 0 3px 10px rgba(37,99,235,0.3); }
        .cl-page-nav:disabled { color: #d1d5db; cursor: not-allowed; background: #f8fafc; }

        .cl-page-num {
          min-width: 34px; height: 34px; border-radius: 10px;
          border: 1.5px solid transparent;
          background: transparent; color: #64748b;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; font-weight: 500;
          transition: all 0.15s; padding: 0 4px;
        }
        .cl-page-num:hover { background: #eff6ff; color: #2563eb; }
        .cl-page-num.active {
          background: linear-gradient(135deg, #1d4ed8, #3b82f6);
          color: #fff; border-color: transparent;
          box-shadow: 0 3px 10px rgba(37,99,235,0.35);
          font-family: 'Sora', sans-serif; font-weight: 600;
        }
        .cl-page-dots { color: #94a3b8; font-size: 13px; padding: 0 2px; }

        .cl-row-anim {
          animation: rowIn 0.25s ease both;
        }
        @keyframes rowIn { from {opacity:0;transform:translateX(-6px);} to {opacity:1;transform:none;} }
      `}</style>

      <div className="cl-root">

        {/* HEADER */}
        <div className="cl-header">
          <div className="cl-title-group">
            <h1 className="cl-title">Cashiers</h1>
            <p className="cl-title-sub">Manage your cashier accounts</p>
          </div>
          <button className="cl-add-btn" onClick={() => navigate("/cashier/add")}>
            <UserPlus size={16} />
            Add Cashier
          </button>
        </div>

        {/* STATS */}
        {/* <div className="cl-stats">
          <div className="cl-stat">
            <div className="cl-stat-label">Total Cashiers</div>
            <div className="cl-stat-value">{cashiers.length}</div>
            <div className="cl-stat-sub">↑ Active accounts</div>
          </div>
          <div className="cl-stat">
            <div className="cl-stat-label">Search Results</div>
            <div className="cl-stat-value">{filtered.length}</div>
            <div className="cl-stat-sub" style={{color:'#3b82f6'}}>matching records</div>
          </div>
          <div className="cl-stat">
            <div className="cl-stat-label">Current Page</div>
            <div className="cl-stat-value">{safePage} / {totalPages}</div>
            <div className="cl-stat-sub" style={{color:'#94a3b8'}}>{PER_PAGE} per page</div>
          </div>
        </div> */}

        {/* SEARCH */}
        <div className="cl-search-wrap">
          <Search size={16} className="cl-search-icon" />
          <input
            className="cl-search"
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="cl-card">
          <div className="cl-thead">
            <span className="cl-th">Cashier</span>
            <span className="cl-th">Email</span>
            <span className="cl-th" style={{textAlign:'center'}}>Actions</span>
          </div>

          {paginated.length > 0 ? paginated.map((c, i) => {
            const [bg, fg] = getColor(c.name);
            return (
              <div key={c.id} className="cl-row cl-row-anim" style={{animationDelay: `${i * 0.04}s`}}>
                <div className="cl-cell">
                  <div className="cl-name-wrap">
                    <div className="cl-avatar" style={{background: bg, color: fg}}>
                      {getInitials(c.name)}
                    </div>
                    <div>
                      <div className="cl-name">{c.name}</div>
                      <span className="cl-id-badge">ID #{c.id}</span>
                    </div>
                  </div>
                </div>
                <div className="cl-cell">
                  <span className="cl-email">{c.email}</span>
                </div>
                <div className="cl-cell cl-actions">
                  <button className="cl-btn-edit" onClick={() => navigate(`/cashier/edit/${c.id}`)} title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button className="cl-btn-del" onClick={() => handleDelete(c.id)} title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="cl-empty">
              <div className="cl-empty-icon"><Users size={28} color="#93c5fd" /></div>
              <p className="cl-empty-text">No cashiers found</p>
              <p className="cl-empty-sub">{search ? "Try a different search term" : "Add your first cashier to get started"}</p>
            </div>
          )}

          {/* PAGINATION */}
          {filtered.length > PER_PAGE && (
            <div className="cl-pagination">
              <span className="cl-page-info">
                Showing <b>{(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)}</b> of <b>{filtered.length}</b>
              </span>
              <div className="cl-page-btns">
                <button className="cl-page-nav" disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft size={15} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - safePage) <= 1)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push("...");
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "..." ? (
                      <span key={`dots-${idx}`} className="cl-page-dots">•••</span>
                    ) : (
                      <button
                        key={item}
                        className={`cl-page-num${item === safePage ? " active" : ""}`}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </button>
                    )
                  )
                }

                <button className="cl-page-nav" disabled={safePage === totalPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}