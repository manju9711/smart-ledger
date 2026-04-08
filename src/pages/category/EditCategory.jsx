import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  // 🔥 FETCH SINGLE
  const fetchCategory = async () => {
    const res = await api.get(`/category/get_by_id.php?id=${id}`);

    if (res.data.status) {
      setName(res.data.data.name);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (!name) {
      alert("Enter category name");
      return;
    }

    const res = await api.post("/category/update.php", {
      id,
      name,
    });

    if (res.data.status) {
      alert("Updated Successfully ✅");
      navigate("/categories");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border mb-4"
        placeholder="Category Name"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white w-full p-3"
      >
        Update Category
      </button>
    </div>
  );
}