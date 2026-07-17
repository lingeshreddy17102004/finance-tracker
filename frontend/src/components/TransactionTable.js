import API from "../services/api";
import { toast } from "react-toastify";
function TransactionTable({
  transactions,
  fetchTransactions,
  setSelectedTransaction,
  setShowModal,
}) {

  const deleteTransaction = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/transactions/${id}`);

      toast.success("Transaction Deleted Successfully");

      fetchTransactions();

    } catch (error) {

      alert(error.response?.data?.message || "Delete Failed");

    }
  };

  return (
    <div className="table-container">

      <h2>Transactions</h2>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6">No Transactions Found</td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item._id}>

                <td>
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>{item.category}</td>

                <td>{item.description}</td>

                <td>₹{item.amount}</td>

                <td>{item.type}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedTransaction(item);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(item._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TransactionTable;