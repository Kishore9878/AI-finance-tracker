import { useState } from "react";
import API from "../services/api";

const AddAccountModal = ({ isOpen, onClose, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    type: "current",
    balance: 0,
    isDefault: false,
  });

  if (!isOpen) return null;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await API.post("/accounts", form);
  //     refresh(); // reload accounts
  //     onClose(); // close modal
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending data:", form);

    const res = await API.post("/accounts", form);

    console.log("Response:", res.data);

    alert("Account Created ✅");

    refresh();
    onClose();

   
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert("Failed to create account ❌");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center">
      
      {/* Modal Box */}
      <div className="bg-white w-full max-w-3xl p-6 rounded-t-2xl animate-slideUp">
        
        <h2 className="text-xl font-semibold mb-4">
          Create New Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

        {/* 🔤 Account Name */}
        <div>
            <label className="block text-sm font-medium mb-1">
            Account Name
            </label>
            <input
            type="text"
            placeholder="e.g. Main Checking"
            className="w-full border p-3 rounded-lg"
            value={form.name}
            onChange={(e) =>
                setForm({ ...form, name: e.target.value })
            }
            required
            />
        </div>

        {/* 🏦 Account Type */}
        <div>
            <label className="block text-sm font-medium mb-1">
            Account Type
            </label>
            <select
            className="w-full border p-3 rounded-lg"
            value={form.type}
            onChange={(e) =>
                setForm({ ...form, type: e.target.value })
            }
            >
            <option value="current">Current</option>
            <option value="savings">Savings</option>
            </select>
        </div>

        {/* 💰 Initial Balance */}
        <div>
            <label className="block text-sm font-medium mb-1">
            Initial Balance
            </label>
            <input
            type="number"
            placeholder="0.00"
            className="w-full border p-3 rounded-lg"
            value={form.balance}
            onChange={(e) =>
                setForm({ ...form, balance: Number(e.target.value) })
            }
            />
        </div>

        {/* ⭐ Default */}
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium">Set as Default</p>
            <p className="text-xs text-gray-400">
                This account will be selected by default
            </p>
            </div>

            <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) =>
                setForm({ ...form, isDefault: e.target.checked })
            }
            />
        </div>

        {/* 🔘 Buttons */}
        <div className="flex justify-between mt-6">
            <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            >
            Cancel
            </button>

            <button className="px-6 py-2 bg-black text-white rounded-lg">
            Create Account
            </button>
        </div>

        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;