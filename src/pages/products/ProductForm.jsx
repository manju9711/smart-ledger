//api integration
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Barcode from "react-barcode";
// import api from "../../services/api";

// export default function ProductForm() {
//   const navigate = useNavigate();

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

//   // 🔥 SAVE PRODUCT
//   const handleSubmit = async () => {
//     try {
//       const res = await api.post("/product/add.php", {
//         product_name: form.name,
//         price: form.price,
//         stock: form.stock,
//         gst_percentage: form.gst,
//         barcode: form.barcode,
//       });

//       if (res.data.status) {
//         alert("Product Added ✅");
//         navigate("/products");
//       } else {
//         alert(res.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
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

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//       >
//         Save Product
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import api from "../../services/api";

export default function ProductForm() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    gst: "",
    barcode: "",
    category_id: "",
  });

  const getCompanyId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return Number(user?.company_id);
};

 const fetchCategories = async () => {
  try {
    const company_id = getCompanyId(); // ✅ FIXED

    if (!company_id) {
      console.log("Company ID missing");
      return;
    }

    const res = await api.get(`/category/get_all.php?company_id=${company_id}`);

    if (res.data.status) {
      setCategories(res.data.data);
    } else {
      console.log(res.data.message);
    }

  } catch (err) {
    console.error("Category fetch error:", err);
  }
};

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateBarcode = () => {
    const code = "PRD" + Math.floor(100000 + Math.random() * 900000);
    setForm({ ...form, barcode: code });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/product/add.php", {
        product_name: form.name,
        category_id: form.category_id,
        company_id: getCompanyId(),
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

      <input placeholder="Product Name"
        className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* 🔥 CATEGORY */}
      <select
  className="w-full p-3 border mb-3"
  value={form.category_id}
  onChange={(e) =>
    setForm({ ...form, category_id: e.target.value })
  }
>
  <option value="">Select Category</option>

  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

      <input type="number" placeholder="Price"
        className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input type="number" placeholder="Stock"
        className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <select className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, gst: e.target.value })}
      >
        <option value="">GST %</option>
        <option value="5">5%</option>
        <option value="12">12%</option>
        <option value="18">18%</option>
      </select>

      <div className="flex gap-2 mb-3">
        <input value={form.barcode}
          className="w-full p-3 border"
          onChange={(e) => setForm({ ...form, barcode: e.target.value })}
        />

        <button onClick={generateBarcode}
          className="bg-indigo-600 text-white px-4">
          Auto
        </button>
      </div>

      {form.barcode && <Barcode value={form.barcode} />}

      <button onClick={handleSubmit}
        className="bg-blue-600 text-white w-full p-3 mt-3">
        Save Product
      </button>
    </div>
  );
}