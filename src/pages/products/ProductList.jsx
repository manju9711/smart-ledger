import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Barcode from "react-barcode";

export default function ProductList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const products = [
    { name: "Soap", price: 50, stock: 100, gst: 18, barcode: "PRD123456" },
    { name: "Rice", price: 80, stock: 200, gst: 5, barcode: "PRD654321" },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>

        <button
          onClick={() => navigate("/products/add")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>GST</th>
              <th>Barcode</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="text-center border-t">
                <td className="p-3">{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>

                {/* GST COLUMN */}
                <td>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {p.gst}%
                  </span>
                </td>

                <td>
                  <div className="flex flex-col items-center">
                    <Barcode
                      value={p.barcode}
                      width={1}
                      height={40}
                      fontSize={10}
                    />
                    <span className="text-xs">{p.barcode}</span>
                  </div>
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