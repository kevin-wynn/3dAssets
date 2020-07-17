import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Header } from "./Header"
import { TransactionsTable } from "./Transactions"
import { BudgetsTable } from "./Budgets"

function App() {
  const [viewTransactions, setViewTransactions] = useState(true)
  const [viewBudgets, setViewBudgets] = useState(false)
  return (
    <div className="app">
      <Header
        viewTransactions={viewTransactions}
        setViewTransactions={setViewTransactions}
        viewBudgets={viewBudgets}
        setViewBudgets={setViewBudgets}
      />
      {viewTransactions && <TransactionsTable />}
      {viewBudgets && <BudgetsTable />}
    </div>
  )
}

export default App

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"))
}
