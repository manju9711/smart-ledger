import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";
import html2pdf from "html2pdf.js";

export default function InvoicePreview() {
  const { invoiceNo } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);

  // 🎨 COLOR STATE
  const [color, setColor] = useState("#7c3aed");

  // 🎨 COLOR DOTS
  const colors = [
    "#7c3aed", "#2563eb", "#16a34a", "#dc2626",
    "#ea580c", "#0891b2", "#db2777", "#4b5563",
    "#9333ea", "#059669", "#e11d48", "#0284c7"
  ];

  // 🔥 Fetch Invoice
useEffect(() => {
  api
    .get(`/invoice/get_invoice_by_id.php?id=${invoiceNo}`)
    .then((res) => {
      if (res.data.status) {
        setInvoice(res.data.data);
        setCompany(res.data.data); // 🔥 SAME RESPONSE
      }
    });
}, [invoiceNo]);

  // 🔥 Fetch Company
 

  if (!invoice) return <div className="p-6">Loading...</div>;

  const today = new Date().toLocaleDateString();

  // 📄 PDF
  const downloadPDF = () => {
    const element = document.getElementById("invoice");
    html2pdf().from(element).save("invoice.pdf");
  };

  // 📲 WhatsApp
  const shareWhatsApp = () => {
    const msg = `Invoice No: ${invoice.invoice_no}
Amount: ₹${invoice.total_amount}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">

      {/* 🔥 ACTION BUTTONS */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-3 py-1 rounded">Print</button>
        <button onClick={downloadPDF} className="bg-green-600 text-white px-3 py-1 rounded">PDF</button>
        <button onClick={shareWhatsApp} className="bg-green-500 text-white px-3 py-1 rounded">WhatsApp</button>
      </div>

      {/* 🎨 COLOR DOT PICKER */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {colors.map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full cursor-pointer border-2 transition
              ${color === c ? "scale-125 border-black" : "border-gray-300"}`}
            style={{ backgroundColor: c }}
          ></div>
        ))}
      </div>

      {/* 📄 INVOICE */}
      <div
        id="invoice"
        className="bg-white w-[800px] p-6 shadow-md border-t-4"
        style={{ borderColor: color }}
      >

        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="font-bold text-lg">{company?.company_name}</h1>
            <p className="text-sm">{company?.company_address}</p>
            <p className="text-sm">Phone: {company?.phone}</p>
            <p className="text-sm">GSTIN: {company?.gstin}</p>
          </div>

          {company?.logo && (
            <img
              src={`${API_BASE_URL}${company.logo}`}
              alt="logo"
              className="w-20 h-20 object-cover"
            />
          )}
        </div>

        {/* TITLE */}
        <h2 className="text-center font-semibold text-lg mt-4" style={{ color }}>
          Tax Invoice
        </h2>

        {/* BILL DETAILS */}
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>{invoice.customer_name}</p>
            <p>{invoice.customer_phone}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">Invoice Details</p>
            <p>Invoice No.: {invoice.invoice_no}</p>
            <p>Date: {today}</p>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full mt-4 border text-sm">
          <thead style={{ backgroundColor: color, color: "#fff" }}>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoice.products.map((p, i) => {
              const amount = p.price * p.qty;
              const gstAmount = (amount * p.gst) / 100;

              return (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
<td className="border p-2">
  {p.display_name || `${p.name} (${p.unit_value}${p.unit})`}
</td>                  <td className="border p-2 text-center">{p.qty}</td>
                  <td className="border p-2 text-right">₹{p.price}</td>
                  <td className="border p-2 text-right">
                    ₹{gstAmount.toFixed(2)} <br />
                    <span className="text-xs">({p.gst}%)</span>
                  </td>
                  <td className="border p-2 text-right">
                    ₹{(amount + gstAmount).toFixed(2)}
                  </td>
                </tr>
              );
            })}

            {/* TOTAL */}
            <tr className="font-semibold">
              <td colSpan="2" className="border p-2 text-right">Total</td>
              <td className="border p-2 text-center">
                {invoice.products.reduce((s, p) => s + p.qty, 0)}
              </td>
              <td></td>
              <td className="border p-2 text-right">₹{invoice.gst_total}</td>
              <td className="border p-2 text-right">₹{invoice.total_amount}</td>
            </tr>
          </tbody>
        </table>

        {/* SUMMARY */}
        <div className="flex justify-end mt-6 text-sm">
          <div className="w-1/3">

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{invoice.sub_total}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{invoice.gst_total}</span>
            </div>

            <div
              className="flex justify-between mt-4 px-2 py-1 font-semibold"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              <span className="pb-2">Total</span>
              <span className="pb-2">₹{invoice.total_amount}</span>
            </div>

           

            {/* <div className="flex justify-between">
              <span>Balance</span>
              <span>₹{invoice.balance_amount}</span>
            </div> */}

            <div className="flex justify-between mt-1">
              <span>Payment</span>
              <span className="font-semibold uppercase">
                {invoice.payment_method}
              </span>
            </div>

<div className="flex justify-between px-2 py-2 font-bold text-xl mb-2"
     style={{ color: color }}>
  <span>Paid</span>
  <span>₹{invoice.paid_amount}</span>
</div>
          </div>
        </div>

        {/* SIGN */}
        {/* <div className="flex justify-end mt-10">
          <div className="border-2 border-dashed p-6 text-center w-40">
            <p className="text-sm mb-6">Authorized</p>
            <p className="text-xs">Signature</p>
          </div>
        </div> */}

      </div>
    </div>
  );
}