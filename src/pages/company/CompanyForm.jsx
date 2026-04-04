// import { useState } from "react";

// export default function CompanyForm() {
//   const [form, setForm] = useState({
//     name: "",
//     code: "",
//     address: "",
//     logo: null,
//   });

//   return (
//     <div className="max-w-xl bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add Company</h2>

//       <input
//         placeholder="Company Name"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />

//       <input
//         placeholder="Company Code"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, code: e.target.value })}
//       />

//       <textarea
//         placeholder="Company Address"
//         className="w-full p-3 border mb-3 rounded"
//         onChange={(e) => setForm({ ...form, address: e.target.value })}
//       />

//       <input
//         type="file"
//         className="w-full mb-4"
//         onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
//       />

//       {form.logo && (
//         <img
//           src={URL.createObjectURL(form.logo)}
//           alt="logo"
//           className="h-20 mb-4"
//         />
//       )}

//       <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//         Save Company
//       </button>
//     </div>
//   );
// }
//api integration
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CompanyForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    gstin: "",
    phone: "",
    logo: null,
  });

  // 🔥 convert image → base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    try {
      let base64Logo = "";

      if (form.logo) {
        base64Logo = await convertToBase64(form.logo);
      }

      const res = await api.post("/company/add_company.php", {
        company_name: form.name,
        company_code: form.code,
        company_address: form.address,
        gstin: form.gstin,
        phone: form.phone,
        logo: base64Logo,
      });

      if (res.data.status) {
        alert("Company Added ✅");
        navigate("/company");
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
      <h2 className="text-xl font-bold mb-4">Add Company</h2>

      <input placeholder="Company Name" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Company Code" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, code: e.target.value })} />

      <textarea placeholder="Address" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <input placeholder="GSTIN" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, gstin: e.target.value })} />

      <input placeholder="Phone Number" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, phone: e.target.value })} />

      <input type="file" className="w-full mb-3"
        onChange={(e) => setForm({ ...form, logo: e.target.files[0] })} />

      {form.logo && (
        <img
          src={URL.createObjectURL(form.logo)}
          alt="preview"
          className="h-20 mb-3"
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 w-full rounded"
      >
        Save Company
      </button>
    </div>
  );
}