import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({});
  const [image, setImage] = useState(
  localStorage.getItem("profileImage") || ""
  );
  const [editForm, setEditForm] = useState({
  name: "",
  email: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me"); // you can create this route
        setUser(res.data);

        setEditForm({  
        name: res.data.name,  
        email: res.data.email,  
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* 🔷 Cover */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* 🔷 Profile Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm -mt-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            
            {/* 👤 Avatar (Initials) */}
           <div className="relative">
            {image ? (
                <img
                src={image}
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
            ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white">
                {user.name?.charAt(0)}
                </div>
            )}

            {/* Upload button */}
            <input
                type="file"
                onChange={handleImageUpload}
                className="absolute bottom-0 right-0 text-xs"
            />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">
                Joined: {new Date(user.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Edit Profile
          </button>
        </div>

        {/* 🔷 Layout */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          
          {/* 🔹 Sidebar */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            
            {["overview", "settings", "security", "appearance"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer p-2 rounded-lg capitalize ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab}
              </div>
            ))}

            {/* 🚪 Logout */}
            <div
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="cursor-pointer p-2 rounded-lg text-red-500 hover:bg-red-50"
            >
              Logout
            </div>
          </div>

          {/* 🔹 Main Content */}
          <div className="col-span-3 bg-white p-6 rounded-xl shadow-sm">
            
            {/* 🧾 OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Profile Info</h2>

                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(user.createdAt).toDateString()}
                </p>
              </div>
            )}

            {/* ⚙️ SETTINGS */}
            {activeTab === "settings" && (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Account Settings</h2>

                <input
                className="w-full border p-3 rounded-lg"
                value={editForm.name}
                onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                }
                />

                <input
                className="w-full border p-3 rounded-lg"
                value={editForm.email}
                onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                }
                />

                <button
                onClick={async () => {
                    await API.put("/auth/update", editForm);
                    alert("Profile updated");
                }}
                className="bg-black text-white px-4 py-2 rounded-lg"
                >
                Save Changes
                </button>
            </div>
            )}

            {/* 🔐 SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Security</h2>

                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border p-3 rounded-lg"
                />

                <button className="bg-black text-white px-4 py-2 rounded-lg">
                  Change Password
                </button>
              </div>
            )}

            {/* 🎨 APPEARANCE */}
            {activeTab === "appearance" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Appearance</h2>

                <button className="px-4 py-2 border rounded-lg">
                  Toggle Dark Mode
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;