import React from 'react'

export function Header({
  viewTransactions,
  setViewTransactions,
  viewBudgets,
  setViewBudgets,
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
        Budgateer
        <span className="nav">
          <button
            onClick={changeViewTransactions}
            className={`nav-item ${viewTransactions ? 'active' : ''}`}
          >
            Transactions
          </button>
          <button
            onClick={changeViewBudgets}
            className={`nav-item ${viewBudgets ? 'active' : ''}`}
          >
            Budgets
          </button>
        </span>
      </h1>
    </div>
  )
}
