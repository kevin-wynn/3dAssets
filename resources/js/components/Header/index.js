import React, { useState } from "react"

export function Header({
  viewTransactions,
  setViewTransactions,
  viewBudgets,
  setViewBudgets
}) {
  const changeViewTransactions = () => {
    setViewTransactions(true)
    setViewBudgets(false)
  }

  const changeViewBudgets = () => {
    setViewTransactions(false)
    setViewBudgets(true)
  }
  return (
    <div className="header">
      <h1>
        Budgeteer
        <span className="nav">
          <a
            onClick={changeViewTransactions}
            className={`nav-item ${viewTransactions ? "active" : ""}`}
          >
            Transactions
          </a>
          <a
            onClick={changeViewBudgets}
            className={`nav-item ${viewBudgets ? "active" : ""}`}
          >
            Budgets
          </a>
        </span>
      </h1>
    </div>
  )
}
