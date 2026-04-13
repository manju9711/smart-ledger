import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";

export default function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    gstin: "",
    gst_type: "with_gst",
    phone: "",
    logo: null,
    preview: "",

    owner_name: "",
    owner_email: "",
    owner_password: ""
  });

  // 🔥 base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });
  };

  // 🔥 fetch
  const fetchCompany = async () => {
    try {
      const res = await api.post("/company/get_company_by_id.php", { id });

      if (res.data.status) {
        const c = res.data.data;

        setForm({
          name: c.company_name || "",
          code: c.company_code || "",
          address: c.company_address || "",
          gstin: c.gstin || "",
           gst_type: c.gst_type || "with_gst",
          phone: c.phone || "",
          logo: null,
          preview: c.logo || "",

          owner_name: c.owner_name || "",
          owner_email: c.owner_email || "",
          owner_password: ""
        });
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  // 🔥 phone validation
  const handlePhone = (value) => {
    const clean = value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, phone: clean });
  };

  // 🔥 update
  const handleUpdate = async () => {
    try {

      if (form.phone.length !== 10) {
        alert("Phone must be 10 digits");
        return;
      }

      let base64Logo = "";
      if (form.logo) {
        base64Logo = await convertToBase64(form.logo);
      }

      const validate = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gstRegex = /^[0-9A-Z]{15}$/;

  if (!form.name.trim()) return "Company name required";
  if (!form.code.trim()) return "Company code required";
  if (!form.address.trim()) return "Address required";

  if (form.gst_type === "with_gst") {
    if (!form.gstin) return "GSTIN required";
    if (!gstRegex.test(form.gstin)) return "Invalid GSTIN format";
  }

  if (form.phone.length !== 10) return "Phone must be 10 digits";

  if (!form.owner_name.trim()) return "Owner name required";

  if (!emailRegex.test(form.owner_email))
    return "Invalid email format";

  if (form.owner_password && form.owner_password.length < 6)
    return "Password must be at least 6 characters";

  return null;
};

      const res = await api.post("/company/update_company.php", {
        id,
        company_name: form.name,
        company_code: form.code,
        company_address: form.address,
        gstin: form.gstin,
        gst_type: form.gst_type,
        phone: form.phone,
        logo: base64Logo,

        owner_name: form.owner_name,
        owner_email: form.owner_email,
        owner_password: form.owner_password
      });

      if (res.data.status) {
        alert("Updated Successfully ✅");
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

      <h2 className="text-xl font-bold mb-4">Edit Company</h2>

      <input value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Company Name"
      />

      <input value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Company Code"
      />

      <textarea value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Address"
      />

      {form.gst_type === "with_gst" && (
  <input
    value={form.gstin}
    onChange={(e) => setForm({ ...form, gstin: e.target.value })}
    className="w-full p-3 border mb-3"
    placeholder="GSTIN"
  />
)}
{/* 
      <input value={form.gstin}
        onChange={(e) => setForm({ ...form, gstin: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="GSTIN"
      /> */}

<select
  value={form.gst_type}
  onChange={(e) => setForm({ ...form, gst_type: e.target.value })}
  className="w-full p-3 border mb-3"
>
  <option value="with_gst">With GST</option>
  <option value="without_gst">Without GST</option>
</select>

      <input value={form.phone}
        onChange={(e) => handlePhone(e.target.value)}
        className="w-full p-3 border mb-3"
        placeholder="Phone"
      />

      {/* 🔥 OWNER FIELDS */}
      <input value={form.owner_name}
        onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Owner Name"
      />

      <input value={form.owner_email}
        onChange={(e) => setForm({ ...form, owner_email: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="Owner Email"
      />

      <input type="password"
        onChange={(e) => setForm({ ...form, owner_password: e.target.value })}
        className="w-full p-3 border mb-3"
        placeholder="New Password (optional)"
      />

      {/* Logo */}
      <input type="file"
        onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
        className="mb-3"
      />

      {/* Preview */}
      {form.logo ? (
        <img src={URL.createObjectURL(form.logo)} className="h-20 mb-3" />
      ) : form.preview && (
        <img src={`${API_BASE_URL}/${form.preview}`} className="h-20 mb-3" />
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white p-3 w-full rounded"
      >
        Update Company
      </button>
    </div>
  );
}