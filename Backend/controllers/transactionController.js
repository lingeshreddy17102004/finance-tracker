import Transaction from "../models/Transaction.js";

//  Add Transaction
export const addTransaction = async (req, res) => {
  try {
    const data = await Transaction.create({
    ...req.body,
    user: req.user.id,
});
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({
    user: req.user.id
}).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id,
});

if (!transaction) {
  return res.status(404).json({
    message: "Transaction not found",
  });
}
res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//  Summary (Balance)
export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
  user: req.user.id,
});
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};