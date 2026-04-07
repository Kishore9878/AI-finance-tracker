import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AddTransaction = () => {
  const [accounts, setAccounts] = useState([]);

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    account: "",
    category: "",
    date: "",
    description: "",
    recurring: false,
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await API.get("/accounts");
      setAccounts(res.data);

      // set default account
      const defaultAcc = res.data.find((a) => a.isDefault);
      if (defaultAcc) {
        setForm((prev) => ({
          ...prev,
          account: defaultAcc._id,
        }));
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transactions", form);
      alert("Transaction Added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        
        {/* 🔥 Title */}
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Add Transaction
        </h1>

        {/* 🤖 Scan Button */}
        <button className="w-full py-3 rounded-lg text-white mb-6 bg-gradient-to-r from-pink-500 to-purple-500">
          📸 Scan Receipt with AI
        </button>

        {/* 🧾 Form */}
        <form className="bg-white p-6 rounded-xl shadow-sm space-y-5" onSubmit={handleSubmit}>
          
          {/* Type */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Type
            </label>
            <select
              className="w-full border p-3 rounded-lg"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Amount + Account */}
          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Amount
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border p-3 rounded-lg"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Account
              </label>
              <select
                className="w-full border p-3 rounded-lg"
                value={form.account}
                onChange={(e) =>
                  setForm({ ...form, account: e.target.value })
                }
              >
                {accounts.map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.name} (₹{acc.balance})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Category
            </label>
            <select
              className="w-full border p-3 rounded-lg"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Salary</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full border p-3 rounded-lg"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              className="w-full border p-3 rounded-lg"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Recurring */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">
                Recurring Transaction
              </p>
              <p className="text-xs text-gray-400">
                Set up a recurring schedule
              </p>
            </div>

            <input
              type="checkbox"
              checked={form.recurring}
              onChange={(e) =>
                setForm({ ...form, recurring: e.target.checked })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button className="px-6 py-2 bg-black text-white rounded-lg">
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;