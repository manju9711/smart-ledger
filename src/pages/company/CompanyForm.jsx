// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CompanyForm() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     code: "",
//     address: "",
//     gstin: "",
//     phone: "",
//     logo: null,
//   });

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result.split(",")[1]);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       let base64Logo = "";

//       if (form.logo) {
//         base64Logo = await convertToBase64(form.logo);
//       }

//       // 🔥 superadmin info (optional use)
//       const user = JSON.parse(localStorage.getItem("user"));

//       const payload = {
//         company_name: form.name,
//         company_code: form.code,
//         company_address: form.address,
//         gstin: form.gstin,
//         phone: form.phone,
//         logo: base64Logo,

//         // 🔥 AUTO ADMIN CREATE
//         owner_name: form.name + " Admin",
//         owner_email: form.code + "@admin.com",
//         owner_password: "123456"
//       };

//       const res = await api.post("/company/add_company.php", payload);

//       if (res.data.status === true) {
//         alert("Company + Admin Created ✅");

//         console.log("Company ID:", res.data.company_id);

//         navigate("/company");
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
//       <h2 className="text-xl font-bold mb-4">Add Company</h2>

//       <input placeholder="Company Name" className="w-full p-3 border mb-3"
//         onChange={(e) => setForm({ ...form, name: e.target.value })} />

//       <input placeholder="Company Code" className="w-full p-3 border mb-3"
//         onChange={(e) => setForm({ ...form, code: e.target.value })} />

//       <textarea placeholder="Address" className="w-full p-3 border mb-3"
//         onChange={(e) => setForm({ ...form, address: e.target.value })} />

//       <input placeholder="GSTIN" className="w-full p-3 border mb-3"
//         onChange={(e) => setForm({ ...form, gstin: e.target.value })} />

//      <input
//   placeholder="Phone Number"
//   className="w-full p-3 border mb-3"
//   value={form.phone}
//   onChange={(e) => {
//     // 🔥 only numbers + max 10 digits
//     const value = e.target.value.replace(/\D/g, "").slice(0, 10);
//     setForm({ ...form, phone: value });
//   }}
// />

//       <input type="file" className="w-full mb-3"
//         onChange={(e) => setForm({ ...form, logo: e.target.files[0] })} />

//       {form.logo && (
//         <img
//           src={URL.createObjectURL(form.logo)}
//           alt="preview"
//           className="h-20 mb-3"
//         />
//       )}

//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white p-3 w-full rounded"
//       >
//         Save Company
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
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

    // 🔥 NEW FIELDS
    owner_name: "",
    owner_email: "",
    owner_password: ""
  });

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
      // 🔥 VALIDATION
      if (form.phone.length !== 10) {
        alert("Phone number must be 10 digits ❌");
        return;
      }

      if (!form.owner_name || !form.owner_email || !form.owner_password) {
        alert("Owner details required ❌");
        return;
      }

      let base64Logo = "";

      if (form.logo) {
        base64Logo = await convertToBase64(form.logo);
      }

      const payload = {
        company_name: form.name,
        company_code: form.code,
        company_address: form.address,
        gstin: form.gstin,
        phone: form.phone,
        logo: base64Logo,

        // 🔥 FROM FORM
        owner_name: form.owner_name,
        owner_email: form.owner_email,
        owner_password: form.owner_password
      };

      const res = await api.post("/company/add_company.php", payload);

      if (res.data.status === true) {
        alert("Company + Admin Created ✅");
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

      {/* Company Fields */}
      <input placeholder="Company Name" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Company Code" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, code: e.target.value })} />

      <textarea placeholder="Address" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <input placeholder="GSTIN" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, gstin: e.target.value })} />

      <input
        placeholder="Phone Number"
        className="w-full p-3 border mb-3"
        value={form.phone}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 10);
          setForm({ ...form, phone: value });
        }}
      />

      <input type="file" className="w-full mb-3"
        onChange={(e) => setForm({ ...form, logo: e.target.files[0] })} />

      {form.logo && (
        <img
          src={URL.createObjectURL(form.logo)}
          alt="preview"
          className="h-20 mb-3"
        />
      )}

      {/* 🔥 OWNER DETAILS */}
      <h3 className="font-semibold mt-4 mb-2">Owner Details</h3>

      <input placeholder="Owner Name" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, owner_name: e.target.value })} />

      <input placeholder="Owner Email" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, owner_email: e.target.value })} />

      <input type="password" placeholder="Owner Password" className="w-full p-3 border mb-3"
        onChange={(e) => setForm({ ...form, owner_password: e.target.value })} />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 w-full rounded"
      >
        Save Company
      </button>
    </div>
  );
}