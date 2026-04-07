import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import AddAccountModal from "../components/AddAccountModal";

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔥 Fetch dashboard data (default account based)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);

        const catRes = await API.get("/dashboard/categories");
        setCategories(catRes.data);

        const txRes = await API.get("/transactions");
        setTransactions(txRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAccounts = async () => {
      try {
        const res = await API.get("/accounts");
        setAccounts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    fetchAccounts();
  }, []);

  const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

  const budget = 7000;
  const percent = Math.min((data.totalExpense / budget) * 100, 100);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6">
        {/* 🔥 Title */}
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Dashboard
        </h1>

        {/* 💰 Budget Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm text-gray-500">
            Monthly Budget (Default Account)
          </h2>

          <p className="text-sm mt-2">
            ₹{data.totalExpense} of ₹{budget} spent
          </p>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
            <div
              className="bg-black h-3 rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <p className="text-right text-xs mt-2 text-gray-400">
            {percent.toFixed(1)}% used
          </p>
        </div>

        {/* 📊 Grid Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          
          {/* 📋 Recent Transactions */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-4">
              Recent Transactions
            </h2>

            {transactions.slice(0, 5).map((t) => (
              <div
                key={t._id}
                className="flex justify-between py-3 border-b"
              >
                <div>
                  <p className="font-medium">
                    {t.description || t.category}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(t.date).toDateString()}
                  </p>
                </div>

                <p
                  className={
                    t.type === "expense"
                      ? "text-red-500 font-medium"
                      : "text-green-500 font-medium"
                  }
                >
                  ₹{t.amount}
                </p>
              </div>
            ))}
          </div>

          {/* 🥧 Expense Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
            <h2 className="font-semibold mb-4">
              Monthly Expense Breakdown
            </h2>

            {categories.length > 0 ? (
              <PieChart width={300} height={300}>
                <Pie
                  data={categories}
                  dataKey="total"
                  nameKey="_id"
                  outerRadius={100}
                >
                  {categories.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <p className="text-gray-400">
                No data available
              </p>
            )}
          </div>
        </div>

        {/* 💳 Bottom Cards */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* ➕ Add New Account */}
          <div
            onClick={() => setShowModal(true)}
            className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            + Add New Account
          </div>

          {/* 🏦 Accounts */}
          {accounts.map((acc) => (
            <div
              key={acc._id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{acc.name}</h2>

                {/* 🔥 Default Badge */}
                {acc.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold mt-2">
                ₹{acc.balance}
              </h1>

              <p className="text-xs text-gray-400">
                {acc.type} Account
              </p>

              {/* 🔥 Toggle Default */}
              <div
                onClick={async (e) => {
                  e.stopPropagation();
                  await API.put(`/accounts/default/${acc._id}`);
                  const res = await API.get("/accounts");
                  setAccounts(res.data);
                }}
                className={`w-10 h-5 rounded-full cursor-pointer transition ${
                  acc.isDefault ? "bg-black" : "bg-gray-300"
                }`}
                >
                <div
                  className={`h-5 w-5 bg-white rounded-full transition ${
                    acc.isDefault ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <span className="text-green-500">
                  ↑ ₹{acc.income || 0}
                </span>
                <span className="text-red-500">
                  ↓ ₹{acc.expense || 0}
                </span>
              </div>

              <button
                onClick={async (e) => {
                  e.stopPropagation();

                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this account?"
                  );

                  if (!confirmDelete) return;

                  try {
                    await API.delete(`/accounts/${acc._id}`);

                    // refresh accounts
                    const res = await API.get("/accounts");
                    setAccounts(res.data);

                  } catch (err) {
                    console.log(err);
                    alert("Failed to delete account");
                  }
                }}
                className="mt-4 text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL */}
      <AddAccountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        refresh={async () => {
          const res = await API.get("/accounts");
          setAccounts(res.data);
        }}
      />
    </div>
  );
};

export default Dashboard;