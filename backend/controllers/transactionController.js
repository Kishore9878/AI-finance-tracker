import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

// ➕ Add Transaction
export const addTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

   const defaultAccount = await Account.findOne({
    user: req.user._id,
    isDefault: true,
  });

  if (!defaultAccount) {
    return res.status(400).json({ message: "No default account set" });
  }


  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    description,
    date,
    account: defaultAccount._id,
  });

  // 🔥 UPDATE ACCOUNT BALANCE
  if (type === "income") {
    defaultAccount.balance += amount;
    defaultAccount.income += amount;
  } else {
    defaultAccount.balance -= amount;
    defaultAccount.expense += amount;
  }

  await defaultAccount.save();

  res.status(201).json(transaction);
};

// 📥 Get All Transactions
export const getTransactions = async (req, res) => {
    const defaultAccount = await Account.findOne({
    user: req.user._id,
    isDefault: true,
  });

  if (!defaultAccount) {
    return res.status(400).json({ message: "No default account set" });
  }

  const transactions = await Transaction.find({ user: req.user._id,account: defaultAccount._id }).sort({ date: -1 });
  res.json(transactions);
};

// ❌ Delete Transaction
export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  if (transaction.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const account = await Account.findById(transaction.account);

  if (transaction.type === "income") {
    account.balance -= transaction.amount;
    account.income -= transaction.amount;
  } else {
    account.balance += transaction.amount;
    account.expense -= transaction.amount;
  }

  await account.save();

  await transaction.deleteOne();

  res.json({ message: "Transaction deleted" });
};