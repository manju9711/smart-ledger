// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";
// import Barcode from "react-barcode";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     gst: "",
//     barcode: "",
//   });

//   // 🔥 fetch single product
//   const fetchProduct = async () => {
//     try {
//       const res = await api.post("/product/get_by_id.php", { id });

//       if (res.data.status) {
//         const p = res.data.data;

//         setForm({
//           name: p.product_name,
//           price: p.price,
//           stock: p.stock,
//           gst: p.gst_percentage,
//           barcode: p.barcode || "",
//         });
//       } else {
//         alert("Product not found");
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   // 🔥 update
//   const handleUpdate = async () => {
//     try {
//       const res = await api.post("/product/update.php", {
//         id,
//         product_name: form.name,
//         price: form.price,
//         stock: form.stock,
//         gst_percentage: form.gst,
//         barcode: form.barcode,
//       });

//       if (res.data.status) {
//         alert("Updated Successfully ✅");
//         navigate("/products");
//       } else {
//         alert(res.data.message);
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-xl bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Edit Product</h2>

//       <input value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//         className="w-full p-3 border mb-3" />

//       <input value={form.price}
//         onChange={(e) => setForm({ ...form, price: e.target.value })}
//         className="w-full p-3 border mb-3" />

//       <input value={form.stock}
//         onChange={(e) => setForm({ ...form, stock: e.target.value })}
//         className="w-full p-3 border mb-3" />

//       <select value={form.gst}
//         onChange={(e) => setForm({ ...form, gst: e.target.value })}
//         className="w-full p-3 border mb-3"
//       >
//         <option value="">Select GST %</option>
//         <option value="0">0%</option>
//         <option value="5">5%</option>
//         <option value="12">12%</option>
//         <option value="18">18%</option>
//         <option value="28">28%</option>
//       </select>

//       <input value={form.barcode}
//         onChange={(e) => setForm({ ...form, barcode: e.target.value })}
//         className="w-full p-3 border mb-3" />

//       {form.barcode && (
//         <div className="text-center mb-3">
//           <Barcode value={form.barcode} />
//         </div>
//       )}

//       <button
//         onClick={handleUpdate}
//         className="bg-blue-600 text-white p-3 w-full rounded"
//       >
//         Update Product
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Barcode from "react-barcode";

export default function EditProduct() {
  const { id } = useParams();
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
    const company_id = getCompanyId();

    const res = await api.get(`/category/get_all.php?company_id=${company_id}`);

    if (res.data.status) {
      setCategories(res.data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

  // 🔥 FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const res = await api.get(`/product/get_by_id.php?id=${id}`);

      if (res.data.status) {
        const p = res.data.data;

        setForm({
          name: p.product_name,
          price: p.price,
          stock: p.stock,
          gst: p.gst_percentage,
          barcode: p.barcode || "",
          category_id: p.category_id,
        });
      } else {
        alert("Product not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  // 🔥 UPDATE
  const handleUpdate = async () => {
  try {
    const company_id = getCompanyId(); // ✅ FIXED

    const res = await api.post("/product/update.php", {
      id,
      product_name: form.name,
      category_id: form.category_id,
      company_id: company_id,
      price: form.price,
      stock: form.stock,
      gst_percentage: form.gst,
      barcode: form.barcode,
    });

    if (res.data.status) {
      alert("Updated Successfully ✅");
      navigate("/products");
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Product Name"
      />

      {/* 🔥 CATEGORY */}
      <select
        value={form.category_id}
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        className="w-full p-3 border mb-3"
      >
        <option>Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Price"
      />

      <input
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Stock"
      />

      <select
        value={form.gst}
        onChange={(e) => setForm({ ...form, gst: e.target.value })}
        className="w-full p-3 border mb-3"
      >
        <option value="">GST %</option>
        <option value="5">5%</option>
        <option value="12">12%</option>
        <option value="18">18%</option>
      </select>

      <input
        value={form.barcode}
        onChange={(e) => setForm({ ...form, barcode: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Barcode"
      />

      {form.barcode && (
        <div className="text-center mb-3">
          <Barcode value={form.barcode} />
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white p-3 w-full"
      >
        Update Product
      </button>
    </div>
  );
}