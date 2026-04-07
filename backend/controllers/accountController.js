import Account from "../models/Account.js";

// Get all accounts
export const getAccounts = async (req, res) => {
  const accounts = await Account.find({ user: req.user._id });
  res.json(accounts);
};

// Create account
export const createAccount = async (req, res) => {
  const { name } = req.body;

  const account = await Account.create({
    user: req.user._id,
    name,
    balance: 0,
  });

  res.json(account);
};

// Set default account
export const setDefaultAccount = async (req, res) => {
  const userId = req.user._id;
  const accountId = req.params.id;

  // remove old default
  await Account.updateMany(
    { user: userId },
    { isDefault: false }
  );

  // set new default
  const updated = await Account.findByIdAndUpdate(
    accountId,
    { isDefault: true },
    { new: true }
  );

  res.json(updated);
};

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const deleteAccount = async (req, res) => {
  try {
    // 🔍 Find account
    const account = await Account.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // 🔥 ADD THIS HERE (IMPORTANT)
    if (account.isDefault) {
      return res.status(400).json({
        message: "Cannot delete default account",
      });
    }

    // 🗑 Delete account
    await account.deleteOne();

    res.json({ message: "Account deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};