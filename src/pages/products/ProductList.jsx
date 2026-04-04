// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Barcode from "react-barcode";

// export default function ProductList() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const products = [
//     { name: "Soap", price: 50, stock: 100, gst: 18, barcode: "PRD123456" },
//     { name: "Rice", price: 80, stock: 200, gst: 5, barcode: "PRD654321" },
//   ];

//   const filtered = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-bold">Products</h1>

//         <button
//           onClick={() => navigate("/products/add")}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <div className="bg-white rounded shadow overflow-auto">
//         <table className="w-full">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3">Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>GST</th>
//               <th>Barcode</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((p, i) => (
//               <tr key={i} className="text-center border-t">
//                 <td className="p-3">{p.name}</td>
//                 <td>₹{p.price}</td>
//                 <td>{p.stock}</td>

//                 {/* GST COLUMN */}
//                 <td>
//                   <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
//                     {p.gst}%
//                   </span>
//                 </td>

//                 <td>
//                   <div className="flex flex-col items-center">
//                     <Barcode
//                       value={p.barcode}
//                       width={1}
//                       height={40}
//                       fontSize={10}
//                     />
//                     <span className="text-xs">{p.barcode}</span>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//api integration
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Barcode from "react-barcode";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/get.php");
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

  const filtered = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase())
  );
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
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
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
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">GST</th>
              <th className="px-6 py-3 text-center">Barcode</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">

                <td className="px-6 py-4 font-medium text-gray-800">
                  {p.product_name}
                </td>

                <td className="px-6 py-4">₹{p.price}</td>

                <td className="px-6 py-4">{p.stock}</td>
                

                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {p.gst_percentage}%
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <Barcode
                      value={p.barcode || "NA"}
                      width={1}
                      height={40}
                      fontSize={10}
                    />
                    <span className="text-xs">{p.barcode}</span>
                  </div>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">

  {/* EDIT */}
  <button
    onClick={() => navigate(`/products/edit/${p.id}`)}
    className="p-2 bg-blue-50 text-blue-600 rounded"
  >
    <Pencil size={18} />
  </button>

  {/* DELETE */}
  <button
    onClick={() => handleDelete(p.id)}
    className="p-2 bg-red-50 text-red-600 rounded"
  >
    <Trash2 size={18} />
  </button>

</td>

              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}