import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Profile() {
  const { user, setUser, refreshUser } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [file, setFile] = useState(null);

  if (!user) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", editName);
    form.append("email", editEmail);
    if (file) form.append("avatar", file);

    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      "http://localhost:3000/api/auth/update",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUser(data);
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <img
            src={
              user.avatar ||
              "https://res.cloudinary.com/demo/image/upload/v169653/profile-default.png"
            }
            alt="avatar"
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full text-xs shadow"
          >
            ✏️
          </button>
        </div>

        <h1 className="text-xl font-semibold mt-4">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-sm font-semibold text-darkText mb-6">Account</h2>

        <div className="grid gap-6">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm font-medium text-darkText">{user.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-darkText">{user.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Member Since</p>
            <p className="text-sm font-medium text-darkText">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium w-max"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-xs text-gray-600">Name</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Email</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 block">Avatar</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-primary text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
