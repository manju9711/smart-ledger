// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { Pencil, Trash2 } from "lucide-react";

// export default function CategoryList() {
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState("");

//   const company_id = localStorage.getItem("company_id");

//   // 🔥 FETCH
//   const fetchCategories = async () => {
//     const res = await api.get(`/category/get_all.php?company_id=${company_id}`);
//     if (res.data.status) {
//       setCategories(res.data.data);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // 🔍 SEARCH
//   const filtered = categories.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // 🔥 DELETE
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this category?")) return;

//     const res = await api.post("/category/delete.php", { id });

//     if (res.data.status) {
//       fetchCategories();
//     } else {
//       alert(res.data.message);
//     }
//   };

//   return (
//     <div className="p-6">

//       {/* HEADER */}
//       <div className="flex justify-between mb-5">
//         <h1 className="text-2xl font-semibold">Categories</h1>

//         <button
//           onClick={() => navigate("/category/add")}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           + Add Category
//         </button>
//       </div>

//       {/* SEARCH */}
//       <input
//         placeholder="Search category..."
//         className="w-full p-3 border mb-4"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <div className="bg-white shadow rounded">
//         <table className="w-full">

//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((c) => (
//               <tr key={c.id} className="border-t">

//                 <td className="p-3">{c.name}</td>

//                 <td className="p-3 flex justify-center gap-3">
//                   <button
//                     onClick={() => navigate(`/categories/edit/${c.id}`)}
//                     className="bg-blue-100 p-2 rounded"
//                   >
//                     <Pencil size={16} />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(c.id)}
//                     className="bg-red-100 p-2 rounded"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>

//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="2" className="text-center p-4">
//                   No categories found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 GET COMPANY ID CORRECT WAY
  const getCompanyId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return Number(user?.company_id);
  };

  // 🔥 FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const company_id = getCompanyId();

      if (!company_id) {
        console.log("Company ID missing");
        return;
      }

      const res = await api.get(
        `/category/get_all.php?company_id=${company_id}`
      );

      if (res.data.status) {
        setCategories(res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔍 SEARCH FILTER
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 DELETE CATEGORY
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await api.post("/category/delete.php", { id });

      if (res.data.status) {
        fetchCategories(); // refresh list
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Delete error");
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold">Categories</h1>

        <button
          onClick={() => navigate("/category/add")} // ✅ FIXED
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search category..."
        className="w-full p-3 border mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t">

                <td className="p-3">{c.name}</td>

                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/category/edit/${c.id}`)}
                    className="bg-blue-100 p-2 rounded"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-100 p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}