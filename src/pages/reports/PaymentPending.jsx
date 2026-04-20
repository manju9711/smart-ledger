import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PaymentPending() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await api.post("/invoice/get_pending_invoice.php", {
      company_id: user.company_id
    });

    if (res.data.status) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markPaid = async (invoice_no) => {
    await api.post("/invoice/mark_as_paid.php", { invoice_no });

    alert("Payment Completed ✅");

    fetchData(); // refresh
  };

  return (
    <div style={{ padding: 20 }}>

      <h2 style={{ marginBottom: 20 }}>💰 Pending Payments</h2>

      <table style={{ width:"100%", background:"#fff", borderRadius:10 }}>
        <thead>
          <tr style={{ background:"#eef2ff" }}>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i}>

              <td>{item.invoice_no}</td>
              <td>{item.customer_name}</td>
              <td>{item.customer_phone}</td>
              <td>₹{item.total_amount}</td>

              <td>
                <button
                  onClick={()=>markPaid(item.invoice_no)}
                  style={{
                    background:"green",
                    color:"#fff",
                    border:"none",
                    padding:"6px 12px",
                    borderRadius:6,
                    cursor:"pointer"
                  }}
                >
                  Confirm Paid
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}