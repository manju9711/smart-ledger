import { useNavigate } from "react-router-dom";

export default function CompanyList() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "ABC Traders",
      code: "CMP001",
      address: "Chennai",
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Companies</h1>

        <button
          onClick={() => navigate("/company/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </button>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c, i) => (
            <tr key={i} className="text-center">
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>{c.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}