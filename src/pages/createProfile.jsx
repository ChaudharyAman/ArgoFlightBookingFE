import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  if (!user) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const { data } = await axios.put(
        "/api/auth/avatar",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser((prev) => ({ ...prev, avatar: data.avatar }));
      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center mb-10">

        <div className="relative">
          <img
            src={user.avatar || "https://via.placeholder.com/120"}
            className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
          />

          <label className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full cursor-pointer text-xs">
            <input type="file" className="hidden" onChange={handleImageUpload} />
            ✎
          </label>
        </div>

        <h1 className="text-xl font-semibold mt-3">{user.name}</h1>
        <p className="text-slate-500 text-sm">{user.email}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-sm font-semibold text-darkText mb-4">
          Account Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div>
            <p className="text-xs text-slate-500 mb-1">Name</p>
            <p className="text-slate-800">{user.name}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">Email</p>
            <p className="text-slate-800">{user.email}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">Member Since</p>
            <p className="text-slate-800">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-1">Role</p>
            <p className="text-slate-800">{user.role.toUpperCase()}</p>
          </div>
        </div>

        {uploading && <p className="text-xs text-blue-500 mt-3">Uploading...</p>}
      </div>
    </div>
  );
}
