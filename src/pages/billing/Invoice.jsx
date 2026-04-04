// export default function Invoice() {
//   return (
//     <div className="p-8 max-w-3xl mx-auto bg-white shadow print:shadow-none">
      
//       <h1 className="text-2xl font-bold text-center mb-4">
//         SmartLedger Invoice
//       </h1>

//       <div className="flex justify-between mb-4">
//         <div>
//           <p>Shop Name</p>
//           <p>GST: 33XXXXX</p>
//         </div>

//         <div>
//           <p>Invoice #: 001</p>
//           <p>Date: 02-04-2026</p>
//         </div>
//       </div>

//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Name</th>
//             <th>Qty</th>
//             <th>Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr className="text-center">
//             <td>Product A</td>
//             <td>2</td>
//             <td>₹100</td>
//             <td>₹200</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="text-right mt-4">
//         <p>Subtotal: ₹200</p>
//         <p>GST: ₹36</p>
//         <p className="font-bold text-lg">Total: ₹236</p>
//       </div>

//       <button
//         onClick={() => window.print()}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Print
//       </button>
//     </div>
//   );
// }

//api integration
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api, { API_BASE_URL } from "../../services/api";

// export default function InvoicePreview() {
//   const { invoiceNo } = useParams();

//   const [invoice, setInvoice] = useState(null);

//   // 🔥 Fetch Invoice Data
//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const res = await api.get(
//           `/invoice/get_invoice_by_id.php?id=${invoiceNo}`
//         );

//         if (res.data.status) {
//           setInvoice(res.data.data);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchInvoice();
//   }, [invoiceNo]);

//  if (!invoice) {
//   return <div className="p-6 text-red-500">Invoice not found ❌</div>;
// }

//   const today = new Date().toLocaleDateString();

//   return (
//     <div className="bg-gray-200 min-h-screen p-6 flex justify-center">
      
//       {/* Invoice Container */}
//       <div className="bg-white w-[800px] p-6 shadow-md">

//         {/* HEADER */}
//         <div className="flex justify-between items-start border-b pb-4">
//           <div>
//             {/* 🔥 Replace later with company API */}
//             <h1 className="font-bold text-lg">SmartLedger</h1>
//             <p className="text-sm">Chennai</p>
//             <p className="text-sm">Phone: 9876543210</p>
//             <p className="text-sm">GSTIN: XXXXXXXX</p>
//           </div>

//           {/* LOGO */}
//           <img
//             src="https://via.placeholder.com/80"
//             alt="logo"
//             className="w-20 h-20 object-cover"
//           />
//         </div>

//         {/* TITLE */}
//         <h2 className="text-center font-semibold text-lg text-purple-600 mt-4">
//           Tax Invoice
//         </h2>

//         {/* BILL DETAILS */}
//         <div className="flex justify-between mt-4 text-sm">
//           <div>
//             <p className="font-semibold">Bill To</p>
//             <p>{invoice.customer_name}</p>
//             <p>{invoice.customer_phone}</p>
//           </div>

//           <div className="text-right">
//             <p className="font-semibold">Invoice Details</p>
//             <p>Invoice No.: {invoice.invoice_no}</p>
//             <p>Date: {today}</p>
//           </div>
//         </div>

//         {/* TABLE */}
//         <table className="w-full mt-4 border text-sm">
//           <thead className="bg-purple-200">
//             <tr>
//               <th className="border p-2">#</th>
//               <th className="border p-2">Item Name</th>
//               <th className="border p-2">Qty</th>
//               <th className="border p-2">Price</th>
//               <th className="border p-2">GST</th>
//               <th className="border p-2">Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {invoice.products.map((p, i) => {
//               const amount = p.price * p.qty;
//               const gstAmount = (amount * p.gst) / 100;

//               return (
//                 <tr key={i}>
//                   <td className="border p-2 text-center">{i + 1}</td>
//                   <td className="border p-2">{p.name}</td>
//                   <td className="border p-2 text-center">{p.qty}</td>
//                   <td className="border p-2 text-right">₹{p.price}</td>

//                   <td className="border p-2 text-right">
//                     ₹{gstAmount.toFixed(2)} <br />
//                     <span className="text-xs">({p.gst}%)</span>
//                   </td>

//                   <td className="border p-2 text-right">
//                     ₹{(amount + gstAmount).toFixed(2)}
//                   </td>
//                 </tr>
//               );
//             })}

//             {/* TOTAL ROW */}
//             <tr className="font-semibold">
//               <td colSpan="2" className="border p-2 text-right">
//                 Total
//               </td>
//               <td className="border p-2 text-center">
//                 {invoice.products.reduce((s, p) => s + p.qty, 0)}
//               </td>
//               <td className="border p-2"></td>
//               <td className="border p-2 text-right">
//                 ₹{invoice.gst_total}
//               </td>
//               <td className="border p-2 text-right">
//                 ₹{invoice.total_amount}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {/* BOTTOM */}
//         <div className="flex justify-between mt-6 text-sm">

//           {/* LEFT */}
//           <div className="w-1/2">
//             <p className="font-semibold">Invoice Amount In Words</p>
//             <p>-- Auto generate later --</p>

//             <p className="font-semibold mt-4">Terms And Conditions</p>
//             <p>Thank you for doing business with us.</p>
//           </div>

//           {/* RIGHT */}
//           <div className="w-1/3">
//             <div className="flex justify-between">
//               <span>Sub Total</span>
//               <span>₹{invoice.sub_total}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>GST</span>
//               <span>₹{invoice.gst_total}</span>
//             </div>

//             <div className="flex justify-between bg-purple-200 px-2 py-1 font-semibold">
//               <span>Total</span>
//               <span>₹{invoice.total_amount}</span>
//             </div>

//             <div className="flex justify-between mt-1">
//               <span>Paid</span>
//               <span>₹{invoice.paid_amount}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Balance</span>
//               <span>₹{invoice.balance_amount}</span>
//             </div>
//           </div>
//         </div>

//         {/* SIGN */}
//         <div className="flex justify-end mt-10">
//           <div className="border-2 border-dashed p-6 text-center w-40">
//             <p className="text-sm mb-6">Authorized</p>
//             <p className="text-xs">Signature</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { API_BASE_URL } from "../../services/api";

export default function InvoicePreview() {
  const { invoiceNo } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [company, setCompany] = useState(null);

  // 🔥 Fetch Invoice Data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(
          `/invoice/get_invoice_by_id.php?id=${invoiceNo}`
        );

        if (res.data.status) {
          setInvoice(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchInvoice();
  }, [invoiceNo]);

   useEffect(() => {
  const fetchCompany = async () => {
    try {
      const res = await api.post("/company/get_company_by_id.php", {
         id: invoice.company_id
      });

      if (res.data.status) {
        setCompany(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchCompany();
}, []);

 if (!invoice) {
  return <div className="p-6 text-red-500">Invoice not found ❌</div>;
}

  const today = new Date().toLocaleDateString();
 

  return (
    <div className="bg-gray-200 min-h-screen p-6 flex justify-center">
      
      {/* Invoice Container */}
      <div className="bg-white w-[800px] p-6 shadow-md">

        {/* HEADER */}
       {/* HEADER */}
<div className="flex justify-between items-start border-b pb-4">
  <div>
    <h1 className="font-bold text-lg">
      {company?.company_name || "Loading..."}
    </h1>

    <p className="text-sm">{company?.company_address}</p>

    <p className="text-sm">
      Phone: {company?.phone}
    </p>

    <p className="text-sm">
      GSTIN: {company?.gstin}
    </p>
  </div>

  {/* LOGO */}
  {company?.logo && (
    <img
      src={`${API_BASE_URL}${company.logo}`}
      alt="logo"
      className="w-20 h-20 object-cover"
    />
  )}
</div>

        {/* TITLE */}
        <h2 className="text-center font-semibold text-lg text-purple-600 mt-4">
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
          <thead className="bg-purple-200">
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
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2 text-center">{p.qty}</td>
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

            {/* TOTAL ROW */}
            <tr className="font-semibold">
              <td colSpan="2" className="border p-2 text-right">
                Total
              </td>
              <td className="border p-2 text-center">
                {invoice.products.reduce((s, p) => s + p.qty, 0)}
              </td>
              <td className="border p-2"></td>
              <td className="border p-2 text-right">
                ₹{invoice.gst_total}
              </td>
              <td className="border p-2 text-right">
                ₹{invoice.total_amount}
              </td>
            </tr>
          </tbody>
        </table>

        {/* BOTTOM */}
        <div className="flex justify-between mt-6 text-sm">

          {/* LEFT */}
          <div className="w-1/2">
            <p className="font-semibold">Invoice Amount In Words</p>
            <p>-- Auto generate later --</p>

            <p className="font-semibold mt-4">Terms And Conditions</p>
            <p>Thank you for doing business with us.</p>
          </div>

          {/* RIGHT */}
          <div className="w-1/3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{invoice.sub_total}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹{invoice.gst_total}</span>
            </div>

            <div className="flex justify-between bg-purple-200 px-2 py-1 font-semibold">
              <span>Total</span>
              <span>₹{invoice.total_amount}</span>
            </div>

            <div className="flex justify-between mt-1">
              <span>Paid</span>
              <span>₹{invoice.paid_amount}</span>
            </div>

            <div className="flex justify-between">
              <span>Balance</span>
              <span>₹{invoice.balance_amount}</span>
            </div>
          </div>
        </div>

        {/* SIGN */}
        <div className="flex justify-end mt-10">
          <div className="border-2 border-dashed p-6 text-center w-40">
            <p className="text-sm mb-6">Authorized</p>
            <p className="text-xs">Signature</p>
          </div>
        </div>

      </div>
    </div>
  );
}