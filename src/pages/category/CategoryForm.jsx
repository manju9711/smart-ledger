import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CategoryForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const company_id = localStorage.getItem("company_id"); // 🔥

  const handleSubmit = async () => {
    if (!name) {
      alert("Enter category name");
      return;
    }

    try {
      const res = await api.post("/category/create.php", {
        name,
        company_id,
      });

      if (res.data.status) {
        alert("Category Added ✅");
        navigate("/categories");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        className="w-full p-3 border mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full p-3 rounded"
      >
        Save Category
      </button>
    </div>
  );
}