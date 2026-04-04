// import { useState } from "react";
// import Barcode from "react-barcode";

// export default function ProductForm() {
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     gst: "",
//     barcode: "",
//   });

//   const generateBarcode = () => {
//     const code = "PRD" + Math.floor(100000 + Math.random() * 900000);
//     setForm({ ...form, barcode: code });
//   };

//   return (
//     <div className="max-w-xl bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add Product</h2>

//       <input
//         placeholder="Product Name"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//       />

//       <input
//         type="number"
//         placeholder="Stock"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, stock: e.target.value })}
//       />

//       {/* GST FIELD */}
//       <select
//         className="w-full p-3 border mb-3 rounded"
//         value={form.gst}
//         onChange={(e) => setForm({ ...form, gst: e.target.value })}
//       >
//         <option value="">Select GST %</option>
//         <option value="0">0%</option>
//         <option value="5">5%</option>
//         <option value="12">12%</option>
//         <option value="18">18%</option>
//         <option value="28">28%</option>
//       </select>

//       {/* Barcode */}
//       <div className="flex gap-2 mb-3">
//         <input
//           placeholder="Barcode"
//           value={form.barcode}
//           className="w-full p-3 border rounded"
//           onChange={(e) => setForm({ ...form, barcode: e.target.value })}
//         />

//         <button
//           onClick={generateBarcode}
//           className="bg-indigo-600 text-white px-4 rounded"
//         >
//           Auto
//         </button>
//       </div>

//       {form.barcode && (
//         <div className="mb-4 text-center">
//           <Barcode value={form.barcode} />
//         </div>
//       )}

//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Save Product
//       </button>
//     </div>
//   );
// }

//api integration
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import api from "../../services/api";

export default function ProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    gst: "",
    barcode: "",
  });

  const generateBarcode = () => {
    const code = "PRD" + Math.floor(100000 + Math.random() * 900000);
    setForm({ ...form, barcode: code });
  };

  // 🔥 SAVE PRODUCT
  const handleSubmit = async () => {
    try {
      const res = await api.post("/product/add.php", {
        product_name: form.name,
        price: form.price,
        stock: form.stock,
        gst_percentage: form.gst,
        barcode: form.barcode,
      });

      if (res.data.status) {
        alert("Product Added ✅");
        navigate("/products");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        placeholder="Product Name"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        type="number"
        placeholder="Stock"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <select
        className="w-full p-3 border mb-3 rounded"
        value={form.gst}
        onChange={(e) => setForm({ ...form, gst: e.target.value })}
      >
        <option value="">Select GST %</option>
        <option value="0">0%</option>
        <option value="5">5%</option>
        <option value="12">12%</option>
        <option value="18">18%</option>
        <option value="28">28%</option>
      </select>

      <div className="flex gap-2 mb-3">
        <input
          placeholder="Barcode"
          value={form.barcode}
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, barcode: e.target.value })}
        />

        <button
          onClick={generateBarcode}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Auto
        </button>
      </div>

      {form.barcode && (
        <div className="mb-4 text-center">
          <Barcode value={form.barcode} />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Product
      </button>
    </div>
  );
}