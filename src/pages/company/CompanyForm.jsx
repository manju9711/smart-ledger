import { useState } from "react";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    logo: null,
  });

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Company</h2>

      <input
        placeholder="Company Name"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Company Code"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, code: e.target.value })}
      />

      <textarea
        placeholder="Company Address"
        className="w-full p-3 border mb-3 rounded"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input
        type="file"
        className="w-full mb-4"
        onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
      />

      {form.logo && (
        <img
          src={URL.createObjectURL(form.logo)}
          alt="logo"
          className="h-20 mb-4"
        />
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save Company
      </button>
    </div>
  );
}