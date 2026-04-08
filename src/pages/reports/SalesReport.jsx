import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Reports() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const navigate = useNavigate();

  // 🔥 Fetch invoices
 useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.company_id) {
        alert("Company missing");
        return;
      }

      const res = await api.post("/invoice/get_all_invoice.php", {
        company_id: user.company_id, // 🔥 IMPORTANT
      });

      if (res.data.status) {
        setInvoices(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchInvoices();
}, []);

  // 📄 Pagination Logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentInvoices = invoices.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(invoices.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        Invoice Reports
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-indigo-100">
            <tr>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Total Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentInvoices.map((inv, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium text-indigo-600">
                  {inv.invoice_no}
                </td>

                <td className="p-3">{inv.customer_name}</td>

                <td className="p-3">{inv.customer_phone}</td>

                <td className="p-3 font-semibold text-green-600">
                  ₹{inv.total_amount}
                </td>

              <td className="p-3 text-center">
  <span
    onClick={() => navigate(`/invoice/${inv.invoice_no}`)}
    className="text-blue-600 font-semibold underline cursor-pointer hover:text-blue-800"
  >
    View
  </span>
</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-between items-center mt-4">

        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}