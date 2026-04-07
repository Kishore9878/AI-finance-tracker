import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

// 📊 Summary
export const getDashboardData = async (req, res) => {
  const userId = req.user._id;

   const defaultAccount = await Account.findOne({
    user: req.user._id,
    isDefault: true,
  });

  if (!defaultAccount) {
    return res.status(400).json({ message: "No default account set" });
  }

  const transactions = await Transaction.find({ user: userId,account: defaultAccount._id });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  const balance = totalIncome - totalExpense;

  res.json({ totalIncome, totalExpense, balance });
};

// 🥧 Category Breakdown (👉 YOUR FUNCTION GOES HERE)
export const getCategoryBreakdown = async (req, res) => {
  const userId = req.user._id;

  const defaultAccount = await Account.findOne({
    user: req.user._id,
    isDefault: true,
  });

  if (!defaultAccount) {
    return res.status(400).json({ message: "No default account set" });
  }

  const data = await Transaction.aggregate([
    { $match: { user: userId, account: defaultAccount._id, type: "expense" } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  res.json(data);
};

// 📈 Monthly Data
export const getMonthlyData = async (req, res) => {
  const userId = req.user._id;

  const defaultAccount = await Account.findOne({
    user: req.user._id,
    isDefault: true,
  });

  if (!defaultAccount) {
    return res.status(400).json({ message: "No default account set" });
  }

  const data = await Transaction.aggregate([
    { $match: { user: userId, account: defaultAccount._id } },
    {
      $group: {
        _id: { $month: "$date" },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
          },
        },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  res.json(data);
};