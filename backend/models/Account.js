import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String, // Personal, Work
    balance: Number,
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    isDefault: {
    type: Boolean,
    default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);