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
// //api integration
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function Billing() {
//   const [rows, setRows] = useState([]);
//   const [barcode, setBarcode] = useState("");
//   const [gstEnabled, setGstEnabled] = useState(true);

//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//   });

//   const [products, setProducts] = useState([]);
// const [suggestions, setSuggestions] = useState([]);
// const [activeIndex, setActiveIndex] = useState(null);

//   const today = new Date().toLocaleDateString();

//   // Dummy product fetch
 

//   const fetchProducts = async () => {
//   try {
//     const res = await api.post("/product/get.php");
//     if (res.data.status) {
//       setProducts(res.data.data);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, []);

//   const getProductByBarcode = async (code) => {
//   try {
//     const res = await api.post("/product/get_by_barcode.php", {
//       barcode: code,
//     });

//     if (res.data.status) {
//       return res.data.data;
//     } else {
//       alert("Product not found");
//       return null;
//     }
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// const handleSearch = (value, index) => {
//   updateRow(index, "name", value);

//   if (!value) {
//     setSuggestions(products); // 🔥 empty na full list
//     return;
//   }

//   const filtered = products.filter((p) =>
//     p.product_name.trim().toLowerCase().includes(value.trim().toLowerCase())
//   );

//   setSuggestions(filtered);
//   setActiveIndex(index);
// };

// const selectProduct = async (product, index) => {
//   try {
//     const res = await api.post("/product/get_by_id.php", {
//       id: product.id,
//     });

//     if (res.data.status) {
//       const p = res.data.data;

//       const updated = [...rows];
//       updated[index] = {
//         ...updated[index],
//         name: p.product_name,
//         price: Number(p.price),
//         gst: Number(p.gst_percentage),
//         qty: 1,
//       };

//       setRows(updated);
//       setSuggestions([]);
//       setActiveIndex(null);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

//   // Barcode add
//  const handleAddByBarcode = async () => {
//   if (!barcode) return;

//   const p = await getProductByBarcode(barcode);
//   if (!p) return;

//   setRows([
//     ...rows,
//     {
//       name: p.product_name,
//       price: Number(p.price),
//       qty: 1,
//       gst: Number(p.gst_percentage),
//     },
//   ]);

//   setBarcode("");
// };

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
//  const handleGenerateInvoice = async () => {
//   try {
//     const res = await api.post("/invoice/create_invoice.php", {
//       customer_name: customer.name,
//       customer_phone: customer.phone,
//       products: rows,
//       sub_total: subtotal,
//       gst_total: gstTotal,
//       total_amount: total,
//       paid_amount: total, // simple case
//       balance_amount: 0,
//       payment_method: "cash",
//     });

//     if (res.data.status) {
//       // 🔥 pass invoice id or number
//       navigate(`/invoice/${res.data.invoice_no}`);
//     } else {
//       alert(res.data.message);
//     }

//   } catch (err) {
//     console.error(err);
//   }
// };

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
// <div className="bg-white rounded shadow overflow-visible">
//             <table className="w-full">
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
//                  <td className="p-2 relative">
//  <input
//   value={r.name}
//   onFocus={() => {
//     setSuggestions(products);   // 🔥 show all products
//     setActiveIndex(i);
//   }}
//   onChange={(e) => handleSearch(e.target.value, i)}
//   className="border p-1 w-full"
//   placeholder="Search product..."
// />

//   {/* Suggestions */}
//   {activeIndex === i && suggestions.length > 0 && (
// <div className="absolute bg-white border w-full max-h-40 overflow-y-auto z-[9999] shadow-lg">      {suggestions.map((s) => (
//         <div
//           key={s.id}
//           onClick={() => selectProduct(s, i)}
//           className="p-2 hover:bg-gray-200 cursor-pointer text-left"
//         >
//           {s.product_name}
//         </div>
//       ))}
//     </div>
//   )}
// </td>

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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Billing() {
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const [payment, setPayment] = useState({
    method: "cash",
    received: 0,
  });

  const navigate = useNavigate();

  // 🔥 Fetch products
  const fetchProducts = async () => {
    const res = await api.post("/product/get.php");
    if (res.data.status) {
      setProducts(res.data.data);
    }
  };

  useEffect(() => {
    fetchProducts();
    setRows([{ name: "", price: 0, qty: 1, gst: 0 }]); // first row
  }, []);

  // 🔍 Search
  const handleSearch = (value, index) => {
    updateRow(index, "name", value);

    if (!value) {
      setSuggestions(products);
      return;
    }

    const filtered = products.filter((p) =>
      p.product_name.trim().toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
    setActiveIndex(index);
  };

  // ✅ Select product
const selectProduct = async (product, index) => {
  const res = await api.post("/product/get_by_id.php", {
    id: product.id,
  });

  if (res.data.status) {
    const p = res.data.data;

    const updated = [...rows];

    // ✅ update current row
    updated[index] = {
      id: p.id,
      name: p.product_name,
      price: Number(p.price),
      gst: Number(p.gst_percentage),
      qty: 1,
    };

    // ✅ check last row filled or not
    const lastRow = updated[updated.length - 1];

    if (
      lastRow.name &&
      lastRow.name.trim() !== "" &&
      lastRow.price > 0
    ) {
      // 🔥 only then add new row
      updated.push({ name: "", price: 0, qty: 1, gst: 0 });
    }

    setRows(updated);
    setSuggestions([]);
    setActiveIndex(null);
  }
};

 const updateRow = (i, field, value) => {
  let updated = [...rows];
  updated[i][field] = value;

  // 🔥 remove duplicate empty rows
  updated = updated.filter(
    (r, index) =>
      r.name ||
      index === updated.length - 1 // keep only one empty row
  );

  setRows(updated);
};

  // 💰 Calculation
  const subtotal = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const gstTotal = rows.reduce(
    (s, r) => s + (r.price * r.qty * r.gst) / 100,
    0
  );
  const total = subtotal + gstTotal;
  const balance = payment.received - total;
const validProducts = rows.filter(
  (r) =>
    r.name &&
    r.name.trim() !== "" &&
    r.price > 0 &&
    r.qty > 0
);
  // 🚀 Generate invoice
  const handleGenerate = async () => {
    const res = await api.post("/invoice/create_invoice.php", {
      customer_name: customer.name,
      customer_phone: customer.phone,
      products: validProducts,
      sub_total: subtotal,
      gst_total: gstTotal,
      total_amount: total,
      paid_amount: payment.received,
      balance_amount: balance,
      payment_method: payment.method,
    });
if (!customer.name.trim()) {
  alert("Customer name required");
  return;
}

if (!/^[0-9]{10}$/.test(customer.phone)) {
  alert("Enter valid 10 digit phone number");
  return;
}

if (validProducts.length === 0) {
  alert("Add at least one product");
  return;
}
    if (res.data.status) {
      navigate(`/invoice/${res.data.invoice_no}`);
    }
  };

 return (
  <div className="p-6 bg-gray-100 min-h-screen">

    {/* HEADER */}
    <div className="flex justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-indigo-600">SmartLedger</h1>
        <p className="text-gray-500">Invoice Billing</p>
      </div>
    </div>

    {/* CUSTOMER */}
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3 text-gray-700">Billing To</h2>

      <div className="flex gap-4">
        <input
          placeholder="Customer Name"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />
        <input
          placeholder="Phone Number"
          className="border p-2 rounded w-full focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />
      </div>
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-xl shadow overflow-visible">
      <table className="w-full">
        <thead className="bg-indigo-50 text-gray-700">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>GST</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-2 relative">
                <input
                  value={r.name}
                  onFocus={() => {
                    setSuggestions(products);
                    setActiveIndex(i);
                  }}
                  onChange={(e) =>
                    handleSearch(e.target.value, i)
                  }
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-400"
                  placeholder="Search product..."
                />

                {/* DROPDOWN */}
                {activeIndex === i && suggestions.length > 0 && (
                  <div className="absolute bg-white border w-full z-[9999] max-h-40 overflow-y-auto rounded shadow-lg">
                    {suggestions.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => selectProduct(s, i)}
                        className="p-2 hover:bg-indigo-100 cursor-pointer"
                      >
                        {s.product_name}
                      </div>
                    ))}
                  </div>
                )}
              </td>

              <td>
                <input
                  type="number"
                  value={r.qty}
                  onChange={(e) =>
                    updateRow(i, "qty", Number(e.target.value))
                  }
                  className="w-16 border rounded text-center"
                />
              </td>

              <td className="text-center font-medium text-green-600">
                ₹{r.price}
              </td>

              <td className="text-center">{r.gst}%</td>

              <td className="text-center font-semibold">
                ₹{r.price * r.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* SUMMARY */}
    <div className="mt-6 flex justify-end">
      <div className="bg-white p-5 rounded-xl shadow w-96">

        <div className="flex justify-between mb-2">
          <span>Sub Total</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>GST</span>
          <span>₹{gstTotal}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span className="text-indigo-600">₹{total}</span>
        </div>

        {/* PAYMENT */}
        <select
          className="w-full border p-2 rounded mt-3"
          onChange={(e) =>
            setPayment({ ...payment, method: e.target.value })
          }
        >
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

        {/* <input
          type="number"
          placeholder="Received Amount"
          className="w-full border p-2 rounded mt-2"
          onChange={(e) =>
            setPayment({
              ...payment,
              received: Number(e.target.value),
            })
          }
        />

        <div className="flex justify-between mt-2 font-semibold">
          <span>Balance</span>
          <span
            className={balance < 0 ? "text-red-500" : "text-green-600"}
          >
            ₹{balance}
          </span>
        </div> */}

        <button
          onClick={handleGenerate}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
        >
          Generate Invoice
        </button>
      </div>
    </div>
  </div>
);
}