// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Billing() {
//   const [rows, setRows] = useState([]);
//   const [barcode, setBarcode] = useState("");
//   const [gstEnabled, setGstEnabled] = useState(true);

//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//   });

//   const today = new Date().toLocaleDateString();

//   // Dummy product fetch
//   const getProductByBarcode = (code) => {
//     return {
//       name: "Item " + code,
//       price: 100,
//       gst: 18,
//     };
//   };

//   // Barcode add
//   const handleAddByBarcode = () => {
//     if (!barcode) return;

//     const p = getProductByBarcode(barcode);

//     setRows([
//       ...rows,
//       {
//         name: p.name,
//         price: p.price,
//         qty: 1,
//         gst: p.gst,
//       },
//     ]);

//     setBarcode("");
//   };

//   // Manual add
//   const addEmptyRow = () => {
//     setRows([
//       ...rows,
//       { name: "", price: 0, qty: 1, gst: 0 },
//     ]);
//   };

//   const updateRow = (index, field, value) => {
//     const updated = [...rows];
//     updated[index][field] = value;
//     setRows(updated);
//   };

//   const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
//   const gstTotal = gstEnabled
//     ? rows.reduce((s, r) => s + (r.price * r.qty * r.gst) / 100, 0)
//     : 0;

//   const total = subtotal + gstTotal;

//   const navigate = useNavigate();
//   const handleGenerateInvoice = () => {
//     navigate('/invoice');
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <div className="flex justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Invoice</h1>
//           <p className="text-sm text-gray-500">Date: {today}</p>
//         </div>
//       </div>

//       {/* CUSTOMER */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="font-semibold mb-2">Billing To</h2>

//         <div className="flex gap-4">
//           <input
//             placeholder="Customer Name"
//             className="border p-2 rounded w-full"
//             value={customer.name}
//             onChange={(e) =>
//               setCustomer({ ...customer, name: e.target.value })
//             }
//           />

//           <input
//             placeholder="Phone Number"
//             className="border p-2 rounded w-full"
//             value={customer.phone}
//             onChange={(e) =>
//               setCustomer({ ...customer, phone: e.target.value })
//             }
//           />
//         </div>
//       </div>

//       {/* BARCODE + ADD */}
//       <div className="flex gap-2 mb-4">
//         <input
//           value={barcode}
//           onChange={(e) => setBarcode(e.target.value)}
//           placeholder="Scan Barcode"
//           className="border p-3 w-full rounded"
//         />
//         <button
//           onClick={handleAddByBarcode}
//           className="bg-blue-600 text-white px-4 rounded"
//         >
//           Scan Add
//         </button>

//         <button
//           onClick={addEmptyRow}
//           className="bg-green-600 text-white px-4 rounded"
//         >
//           + Add Item
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-200 text-sm">
//             <tr>
//               <th className="p-3">Item Name</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>GST</th>
//               <th>Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((r, i) => {
//               const amount = r.price * r.qty;
//               return (
//                 <tr key={i} className="text-center border-t">
//                   <td className="p-2">
//                     <input
//                       value={r.name}
//                       onChange={(e) =>
//                         updateRow(i, "name", e.target.value)
//                       }
//                       className="border p-1 w-full"
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={r.qty}
//                       onChange={(e) =>
//                         updateRow(i, "qty", Number(e.target.value))
//                       }
//                       className="w-16 border text-center"
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={r.price}
//                       onChange={(e) =>
//                         updateRow(i, "price", Number(e.target.value))
//                       }
//                       className="w-20 border text-center"
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="number"
//                       value={r.gst}
//                       onChange={(e) =>
//                         updateRow(i, "gst", Number(e.target.value))
//                       }
//                       className="w-16 border text-center"
//                     />
//                   </td>

//                   <td>₹{amount}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* SUMMARY */}
//       <div className="mt-6 flex justify-end">
//         <div className="bg-white p-4 rounded shadow w-80">

//           <div className="flex justify-between">
//             <span>Sub Total</span>
//             <span>₹{subtotal}</span>
//           </div>

//           <div className="flex justify-between">
//             <span>GST</span>
//             <span>₹{gstTotal}</span>
//           </div>

//           <div className="flex justify-between font-bold text-lg mt-2">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>

//           <label className="block mt-2">
//             <input
//               type="checkbox"
//               checked={gstEnabled}
//               onChange={() => setGstEnabled(!gstEnabled)}
//             />{" "}
//             GST Enabled
//           </label>

//           <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded" onClick={handleGenerateInvoice}>
//             Generate Invoice
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//api integration
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Billing() {
  const [rows, setRows] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [gstEnabled, setGstEnabled] = useState(true);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  const today = new Date().toLocaleDateString();

  // Dummy product fetch
 
  const getProductByBarcode = async (code) => {
  try {
    const res = await api.post("/product/get_by_barcode.php", {
      barcode: code,
    });

    if (res.data.status) {
      return res.data.data;
    } else {
      alert("Product not found");
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

  // Barcode add
 const handleAddByBarcode = async () => {
  if (!barcode) return;

  const p = await getProductByBarcode(barcode);
  if (!p) return;

  setRows([
    ...rows,
    {
      name: p.product_name,
      price: Number(p.price),
      qty: 1,
      gst: Number(p.gst_percentage),
    },
  ]);

  setBarcode("");
};

  // Manual add
  const addEmptyRow = () => {
    setRows([
      ...rows,
      { name: "", price: 0, qty: 1, gst: 0 },
    ]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const gstTotal = gstEnabled
    ? rows.reduce((s, r) => s + (r.price * r.qty * r.gst) / 100, 0)
    : 0;

  const total = subtotal + gstTotal;

  const navigate = useNavigate();
 const handleGenerateInvoice = async () => {
  try {
    const res = await api.post("/invoice/create_invoice.php", {
      customer_name: customer.name,
      customer_phone: customer.phone,
      products: rows,
      sub_total: subtotal,
      gst_total: gstTotal,
      total_amount: total,
      paid_amount: total, // simple case
      balance_amount: 0,
      payment_method: "cash",
    });

    if (res.data.status) {
      // 🔥 pass invoice id or number
      navigate(`/invoice/${res.data.invoice_no}`);
    } else {
      alert(res.data.message);
    }

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm text-gray-500">Date: {today}</p>
        </div>
      </div>

      {/* CUSTOMER */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Billing To</h2>

        <div className="flex gap-4">
          <input
            placeholder="Customer Name"
            className="border p-2 rounded w-full"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
        </div>
      </div>

      {/* BARCODE + ADD */}
      <div className="flex gap-2 mb-4">
        <input
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Scan Barcode"
          className="border p-3 w-full rounded"
        />
        <button
          onClick={handleAddByBarcode}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Scan Add
        </button>

        <button
          onClick={addEmptyRow}
          className="bg-green-600 text-white px-4 rounded"
        >
          + Add Item
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="p-3">Item Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => {
              const amount = r.price * r.qty;
              return (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">
                    <input
                      value={r.name}
                      onChange={(e) =>
                        updateRow(i, "name", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={r.qty}
                      onChange={(e) =>
                        updateRow(i, "qty", Number(e.target.value))
                      }
                      className="w-16 border text-center"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={r.price}
                      onChange={(e) =>
                        updateRow(i, "price", Number(e.target.value))
                      }
                      className="w-20 border text-center"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={r.gst}
                      onChange={(e) =>
                        updateRow(i, "gst", Number(e.target.value))
                      }
                      className="w-16 border text-center"
                    />
                  </td>

                  <td>₹{amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SUMMARY */}
      <div className="mt-6 flex justify-end">
        <div className="bg-white p-4 rounded shadow w-80">

          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{gstTotal}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <label className="block mt-2">
            <input
              type="checkbox"
              checked={gstEnabled}
              onChange={() => setGstEnabled(!gstEnabled)}
            />{" "}
            GST Enabled
          </label>

          <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded" onClick={handleGenerateInvoice}>
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
}