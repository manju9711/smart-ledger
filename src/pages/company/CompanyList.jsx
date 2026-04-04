// import { useNavigate } from "react-router-dom";

// export default function CompanyList() {
//   const navigate = useNavigate();

//   const companies = [
//     {
//       name: "ABC Traders",
//       code: "CMP001",
//       address: "Chennai",
//     },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-bold">Companies</h1>

//         <button
//           onClick={() => navigate("/company/add")}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           + Add Company
//         </button>
//       </div>

//       <table className="w-full bg-white rounded shadow">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Name</th>
//             <th>Code</th>
//             <th>Address</th>
//           </tr>
//         </thead>

//         <tbody>
//           {companies.map((c, i) => (
//             <tr key={i} className="text-center">
//               <td>{c.name}</td>
//               <td>{c.code}</td>
//               <td>{c.address}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

//api integration
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";
import { Pencil, Trash2 } from "lucide-react";

export default function CompanyList() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/company/get_companies.php");
      if (res.data.status) {
        setCompanies(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      const res = await api.post("/company/delete_company.php", { id });

      if (res.data.status) {
        fetchCompanies();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Company List
        </h1>

        <button
          onClick={() => navigate("/company/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Company
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm text-left">
          
         <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
  <tr>
    <th className="px-6 py-3">Logo</th>
    <th className="px-6 py-3">Company</th>
    <th className="px-6 py-3">Code</th>
    <th className="px-6 py-3">GSTIN</th>
    <th className="px-6 py-3">Phone</th>
    <th className="px-6 py-3">Address</th>
    <th className="px-6 py-3 text-center">Actions</th>
  </tr>
</thead>

          <tbody className="divide-y">
  {companies.map((c) => (
    <tr key={c.id} className="hover:bg-gray-50 transition">

      {/* Logo */}
      <td className="px-6 py-4">
        {c.logo && (
          <img
             src={`${API_BASE_URL}${c.logo}`}
            className="h-10 w-10 object-cover rounded"
          />
        )}
      </td>

      {/* Name */}
      <td className="px-6 py-4 font-medium text-gray-800">
        {c.company_name}
      </td>

      {/* Code */}
      <td className="px-6 py-4">{c.company_code}</td>

      {/* GSTIN */}
      <td className="px-6 py-4">{c.gstin}</td>

      {/* Phone */}
      <td className="px-6 py-4">{c.phone}</td>

      {/* Address */}
      <td className="px-6 py-4">{c.company_address}</td>

      {/* Actions */}
      <td className="px-6 py-4 flex justify-center gap-3">

        <button
          onClick={() => navigate(`/company/edit/${c.id}`)}
          className="p-2 bg-blue-50 text-blue-600 rounded"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => handleDelete(c.id)}
          className="p-2 bg-red-50 text-red-600 rounded"
        >
          <Trash2 size={18} />
        </button>

      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}