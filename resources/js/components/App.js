import React from "react"
import ReactDOM from "react-dom"
import { TransactionsTable } from "./Transactions"

function App() {
  return (
    <div className="app">
      <h1>Budgeteer</h1>
      <TransactionsTable />
    </div>
  )
}

export default App

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"))
}
