import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api,{API_BASE_URL} from "../../services/api";

export default function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    gstin: "",
    phone: "",
    logo: null,
    preview: ""
  });

  // base64 convert
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // 🔥 fetch single company
  const fetchCompany = async () => {
  try {
    const res = await api.post("/company/get_company_by_id.php", {
      id: id
    });

    if (res.data.status) {
      const c = res.data.data;

      setForm({
        name: c.company_name || "",
        code: c.company_code || "",
        address: c.company_address || "",
        gstin: c.gstin || "",
        phone: c.phone || "",
        logo: null,
        preview: c.logo || ""
      });
    } else {
      alert("Company not found");
    }

  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchCompany();
  }, []);

  // 🔥 update
  const handleUpdate = async () => {
    try {
      let base64Logo = "";

      if (form.logo) {
        base64Logo = await convertToBase64(form.logo);
      }

      const res = await api.post("/company/update_company.php", {
        id,
        company_name: form.name,
        company_code: form.code,
        company_address: form.address,
        gstin: form.gstin,
        phone: form.phone,
        logo: base64Logo,
      });

      if (res.data.status) {
        alert("Updated Successfully ✅");
        navigate("/company");
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Company</h2>

      <input value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border mb-3" />

      <input value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        className="w-full p-3 border mb-3" />

      <textarea value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full p-3 border mb-3" />

      <input value={form.gstin}
        onChange={(e) => setForm({ ...form, gstin: e.target.value })}
        className="w-full p-3 border mb-3" />

      <input value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full p-3 border mb-3" />

      <input type="file"
        onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
        className="mb-3" />

      {/* Preview */}
     {form.logo ? (
  <img
    src={URL.createObjectURL(form.logo)}
    className="h-20 mb-3"
    alt="new"
  />
) : form.preview && (
  <img
    src={`${API_BASE_URL}/${form.preview}`}
    className="h-20 mb-3"
    alt="old"
  />
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