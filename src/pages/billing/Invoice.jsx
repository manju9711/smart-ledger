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

export default function InvoicePreview() {
  return (
    <div className="bg-gray-200 min-h-screen p-6 flex justify-center">
      
      {/* Invoice Container */}
      <div className="bg-white w-[800px] p-6 shadow-md">

        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="font-bold text-lg">subisha</h1>
            <p className="text-sm">12,west street , surandai</p>
            <p className="text-sm">Phone no.: 9082080818</p>
            <p className="text-sm">Email: subi@gmail.com</p>
            <p className="text-sm">GSTIN: 33ABCDE1234F1Z2</p>
            <p className="text-sm">State: 33-Tamil Nadu</p>
          </div>

          <img
            src="https://via.placeholder.com/80"
            alt="logo"
            className="w-20 h-20 object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-center font-semibold text-lg text-purple-600 mt-4">
          Tax Invoice
        </h2>

        {/* Bill + Invoice Details */}
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p className="font-semibold">Bill To</p>
            <p>Subi</p>
          </div>

          <div className="text-right">
            <p className="font-semibold">Invoice Details</p>
            <p>Invoice No.: 1</p>
            <p>Date: 02-04-2026</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mt-4 border text-sm">
          <thead className="bg-purple-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">HSN/SAC</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price/Unit</th>
              <th className="border p-2">GST</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2 text-center">1</td>
              <td className="border p-2">Chocolate</td>
              <td className="border p-2"></td>
              <td className="border p-2 text-center">10</td>
              <td className="border p-2 text-right">₹100.00</td>
              <td className="border p-2 text-right">
                ₹400.00 <br />
                <span className="text-xs">(40%)</span>
              </td>
              <td className="border p-2 text-right">₹1,400.00</td>
            </tr>

            {/* Total Row */}
            <tr className="font-semibold">
              <td colSpan="3" className="border p-2 text-right">
                Total
              </td>
              <td className="border p-2 text-center">10</td>
              <td className="border p-2"></td>
              <td className="border p-2 text-right">₹400.00</td>
              <td className="border p-2 text-right">₹1,400.00</td>
            </tr>
          </tbody>
        </table>

        {/* Bottom Section */}
        <div className="flex justify-between mt-6 text-sm">
          
          {/* Left */}
          <div className="w-1/2">
            <p className="font-semibold">Invoice Amount In Words</p>
            <p>One Thousand Four Hundred Rupees only</p>

            <p className="font-semibold mt-4">Terms And Conditions</p>
            <p>Thank you for doing business with us.</p>
          </div>

          {/* Right */}
          <div className="w-1/3">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹1,000.00</span>
            </div>

            <div className="flex justify-between">
              <span>IGST@40.0%</span>
              <span>₹400.00</span>
            </div>

            <div className="flex justify-between bg-purple-200 px-2 py-1 font-semibold">
              <span>Total</span>
              <span>₹1,400.00</span>
            </div>

            <div className="flex justify-between mt-1">
              <span>Received</span>
              <span>₹500.00</span>
            </div>

            <div className="flex justify-between">
              <span>Balance</span>
              <span>₹900.00</span>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="flex justify-end mt-10">
          <div className="border-2 border-dashed p-6 text-center w-40">
            <p className="text-sm mb-6">For: subisha</p>
            <p className="text-xs">Authorized Signatory</p>
          </div>
        </div>

      </div>
    </div>
  );
}