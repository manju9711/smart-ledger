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

 // 🔥 GET COMPANY ID CORRECT WAY
const getCompanyId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return Number(user?.company_id);
};

// 🔥 FETCH PRODUCTS
const fetchProducts = async () => {
  try {
    const company_id = getCompanyId(); // ✅ FIXED

    if (!company_id) {
      console.log("Company ID missing");
      return;
    }

    const res = await api.get(`/product/get.php?company_id=${company_id}`);

    if (res.data.status) {
      setProducts(res.data.data);
    } else {
      console.log(res.data.message);
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
        <table className="w-full text-sm text-left border-collapse">

  <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
    <tr>
      <th className="p-3 text-left">Name</th>
      <th className="p-3 text-left">Category</th>
      <th className="p-3 text-center">Price</th>
      <th className="p-3 text-center">Stock</th>
      <th className="p-3 text-center">GST</th>
      <th className="p-3 text-center">Barcode</th>
      <th className="p-3 text-center">Actions</th>
    </tr>
  </thead>

  <tbody>
    {currentData.map((p) => (
      <tr key={p.id} className="border-t hover:bg-gray-50">

        <td className="p-3">{p.product_name}</td>

        <td className="p-3">
          {p.category_name || "No Category"}
        </td>

        <td className="p-3 text-center font-medium">
          ₹{p.price}
        </td>

        <td className="p-3 text-center">
          {p.stock}
        </td>

        <td className="p-3 text-center">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            {p.gst_percentage}%
          </span>
        </td>

        <td className="p-3 text-center">
          <div className="flex flex-col items-center">
            <Barcode value={p.barcode || "NA"} width={1} height={40} />
            <span className="text-xs mt-1">{p.barcode}</span>
          </div>
        </td>

        <td className="p-3">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => navigate(`/products/edit/${p.id}`)}
              className="bg-blue-100 hover:bg-blue-200 p-2 rounded"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-100 hover:bg-red-200 p-2 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>

      </tr>
    ))}
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