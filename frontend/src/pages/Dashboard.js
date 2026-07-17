import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import TransactionTable from "../components/TransactionTable";
import TransactionModel from "../components/TransactionModel";

import "../styles/dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
  try {
    setLoading(true);

    const res = await API.get("/transactions");
    setTransactions(res.data);

  } catch (err) {
    console.error(err);

  } finally {
    setLoading(false);
  }
};

  const filteredTransactions = transactions.filter((item) => {
  const matchesSearch =
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "all" || item.type === filter;

  return matchesSearch && matchesFilter;
});

if (loading) {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>Loading transactions...</h2>
      </div>
    </>
  );
}

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <DashboardCards transactions={transactions} />

        <button
          className="add-btn"
          onClick={() => {
    setSelectedTransaction(null);
    setShowModal(true);
}}
        >
          + Add Transaction
        </button>
    <input
  type="text"
  placeholder="Search by category or description..."
  className="search-box"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

    <select
  className="filter-box"
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="all">All Transactions</option>
  <option value="income">Income</option>
  <option value="expense">Expense</option>
</select>

    <TransactionTable
  transactions={filteredTransactions}
  fetchTransactions={fetchTransactions}
  setSelectedTransaction={setSelectedTransaction}
  setShowModal={setShowModal}
/>

        {showModal && (
          <TransactionModel
    fetchTransactions={fetchTransactions}
    closeModal={() => {
        setShowModal(false);
        setSelectedTransaction(null);
    }}
    transaction={selectedTransaction}
/>
        )}

      </div>
    </>
  );
}

export default Dashboard;