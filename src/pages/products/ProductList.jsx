//api integration
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import Barcode from "react-barcode";
// import { Pencil, Trash2 } from "lucide-react";

// export default function ProductList() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   // 🔥 PAGINATION STATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // 🔥 FETCH PRODUCTS
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/product/get.php");
//       if (res.data.status) {
//         setProducts(res.data.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 🔍 FILTER
//   const filtered = products.filter((p) =>
//     p.product_name.toLowerCase().includes(search.toLowerCase())
//   );

//   // 🔥 PAGINATION LOGIC
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;

//   const currentData = filtered.slice(indexOfFirst, indexOfLast);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;

//     try {
//       const res = await api.post("/product/delete.php", { id });

//       if (res.data.status) {
//         fetchProducts();
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-700">
//           Products
//         </h1>

//         <button
//           onClick={() => navigate("/products/add")}
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search product..."
//         className="w-full p-3 border rounded mb-4"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1); // 🔥 reset page
//         }}
//       />

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <table className="w-full text-sm text-left">

//           <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Price</th>
//               <th className="px-6 py-3">Stock</th>
//               <th className="px-6 py-3">GST</th>
//               <th className="px-6 py-3 text-center">Barcode</th>
//               <th className="px-6 py-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {currentData.map((p) => (
//               <tr key={p.id} className="hover:bg-gray-50 transition">

//                 <td className="px-6 py-4 font-medium text-gray-800">
//                   {p.product_name}
//                 </td>

//                 <td className="px-6 py-4">₹{p.price}</td>

//                 <td className="px-6 py-4">{p.stock}</td>

//                 <td className="px-6 py-4">
//                   <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
//                     {p.gst_percentage}%
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-center">
//                   <div className="flex flex-col items-center">
//                     <Barcode
//                       value={p.barcode || "NA"}
//                       width={1}
//                       height={40}
//                       fontSize={10}
//                     />
//                     <span className="text-xs">{p.barcode}</span>
//                   </div>
//                 </td>

//                 <td className="px-6 py-4 flex justify-center gap-3">
//                   <button
//                     onClick={() => navigate(`/products/edit/${p.id}`)}
//                     className="p-2 bg-blue-50 text-blue-600 rounded"
//                   >
//                     <Pencil size={18} />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="p-2 bg-red-50 text-red-600 rounded"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>

//               </tr>
//             ))}

//             {currentData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔥 PAGINATION UI */}
//       <div className="flex justify-between items-center mt-4">

//         <button
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <div className="flex gap-2">
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Barcode from "react-barcode";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const company_id = localStorage.getItem("company_id"); // 🔥 IMPORTANT

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get(`/product/get.php?company_id=${company_id}`);
      if (res.data.status) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 SEARCH
  const filtered = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 PAGINATION
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await api.post("/product/delete.php", { id });

      if (res.data.status) {
        fetchProducts();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Products
        </h1>

        <button
          onClick={() => navigate("/products/add")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        className="w-full p-3 border rounded mb-4"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th> {/* 🔥 NEW */}
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">GST</th>
              <th className="p-3 text-center">Barcode</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((p) => (
              <tr key={p.id} className="border-t">

                <td className="p-3">{p.product_name}</td>

                {/* 🔥 CATEGORY NAME */}
                <td className="p-3">{p.category_name}</td>

                <td className="p-3">₹{p.price}</td>
                <td className="p-3">{p.stock}</td>

                <td className="p-3">
                  <span className="bg-blue-100 px-2 rounded">
                    {p.gst_percentage}%
                  </span>
                </td>

                <td className="p-3 text-center">
                  <Barcode value={p.barcode || "NA"} width={1} height={40} />
                </td>

                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                    className="bg-blue-100 p-2 rounded"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-100 p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">

        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200"
        >
          Prev
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200"
        >
          Next
        </button>

      </div>

    </div>
  );
}