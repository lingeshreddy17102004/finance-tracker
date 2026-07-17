function DashboardCards({ transactions }) {

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="cards">

      <div className="card">
        <h2>Total Balance</h2>
        <h1>₹{balance}</h1>
      </div>

      <div className="card">
        <h2>Total Income</h2>
        <h1>₹{income}</h1>
      </div>

      <div className="card">
        <h2>Total Expense</h2>
        <h1>₹{expense}</h1>
      </div>

    </div>
  );
}

export default DashboardCards;