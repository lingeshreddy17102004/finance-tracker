import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function TransactionModel({
  fetchTransactions,
  closeModal,
  transaction,
}) {

  const [formData, setFormData] = useState({
    amount: transaction?.amount || "",
    type: transaction?.type || "expense",
    category: transaction?.category || "",
    description: transaction?.description || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (transaction) {
        await API.put(`/transactions/${transaction._id}`, formData);
        toast.success("Transaction Updated Successfully");
      } else {
        await API.post("/transactions", formData);
        toast.success("Transaction Added Successfully");
      }

      fetchTransactions();
      closeModal();

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {transaction ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            {transaction ? "Update Transaction" : "Add Transaction"}
          </button>

          <button
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
}

export default TransactionModel;