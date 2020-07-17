import React from "react"
import {
  useTable,
  useRowSelect
} from "react-table"
import Dinero from "dinero.js"

const IndeterminateCheckbox = React.forwardRef(({
  indeterminate,
  ...rest
}, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return ( <
    >
    <
    input type = "checkbox"
    ref = {
      resolvedRef
    } {
      ...rest
    }
    /> <
    />
  )
})

const returnText = (color, value) => {
  return <div className = {
    `text ${color}`
  } > {
    value
  } < /div>
}

const returnPill = (color, value) => {
  return <div className = {
    `pill ${color}`
  } > {
    value
  } < /div>
}

const renderBalanceCell = ({
  value
}) => {
  const number = Number(value.replace(/[^0-9.-]+/g, ""))
  if (number > 0) {
    return returnText("green", value)
  } else {
    return returnText("red", value)
  }
}

const renderInflowCell = ({
  value
}) => {
  if (value) {
    return returnPill("green", value)
  } else {
    return <div > < /div>
  }
}

const renderOutflowCell = ({
  value
}) => {
  if (value) {
    return returnPill("red", value)
  } else {
    return <div > < /div>
  }
}

export function TransactionsTable({
  columns_BAK,
  data_BAK
}) {
  const amounts = {
    co: {
      outflow: Dinero({
        amount: -10000,
        currency: "USD"
      }),
      balance: Dinero({
        amount: 390170,
        currency: "USD"
      })
    },
    heb: {
      outflow: Dinero({
        amount: -11353,
        currency: "USD"
      }),
      balance: Dinero({
        amount: 400170,
        currency: "USD"
      })
    },
    salary: {
      inflow: Dinero({
        amount: -411523,
        currency: "USD"
      }),
      balance: Dinero({
        amount: 411523,
        currency: "USD"
      })
    }
  }
  const data = React.usenotes(
    () => [{
        date: new Date().toLocaleDateString(),
        payee: "Capital One",
        category: "Capital One Quicksilver",
        notes: "",
        outflow: amounts["co"].outflow.toFormat("$0,0.00"),
        inflow: "",
        balance: amounts["co"].balance.toFormat("$0,0.00")
      },
      {
        date: new Date().toLocaleDateString(),
        payee: "HEB",
        category: "Groceries",
        notes: "",
        outflow: amounts["heb"].outflow.toFormat("$0,0.00"),
        inflow: "",
        balance: amounts["heb"].balance.toFormat("$0,0.00")
      },
      {
        date: new Date("7-1-2020").toLocaleDateString(),
        payee: "Us",
        category: "Salary",
        notes: "",
        outflow: "",
        inflow: amounts["salary"].inflow.toFormat("$0,0.00"),
        balance: amounts["salary"].balance.toFormat("$0,0.00")
      }
    ],
    []
  )

  const columns = React.usenotes(
    () => [{
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Payee",
        accessor: "payee"
      },
      {
        Header: "Category",
        accessor: "category"
      },
      {
        Header: "notes",
        accessor: "notes"
      },
      {
        Header: "Outflow",
        accessor: "outflow",
        Cell: renderOutflowCell
      },
      {
        Header: "Inflow",
        accessor: "inflow",
        Cell: renderInflowCell
      },
      {
        Header: "Balance",
        accessor: "balance",
        Cell: renderBalanceCell
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: {
      selectedRowIds
    }
  } = useTable({
      columns,
      data
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [{
          id: "selection",
          Header: ({
            getToggleAllRowsSelectedProps
          }) => ( <
            div className = "checkbox" >
            <
            IndeterminateCheckbox {
              ...getToggleAllRowsSelectedProps()
            }
            /> <
            /div>
          ),
          Cell: ({
            row
          }) => ( <
            div className = "checkbox" >
            <
            IndeterminateCheckbox {
              ...row.getToggleRowSelectedProps()
            }
            /> <
            /div>
          )
        },
        ...columns
      ])
    }
  )

  return ( <
    div >
    <
    h2 className = "page-title" > Transactions < /h2> <
    table cellSpacing = "0"
    cellPadding = "0"
    className = "b-table" {
      ...getTableProps()
    } >
    <
    thead className = "b-table-header" > {
      headerGroups.map((headerGroup) => ( <
        tr {
          ...headerGroup.getHeaderGroupProps()
        } > {
          headerGroup.headers.map((column) => ( <
            th {
              ...column.getHeaderProps()
            } > {
              column.render("Header")
            } < /th>
          ))
        } <
        /tr>
      ))
    } <
    /thead> <
    tbody className = "b-table-body" {
      ...getTableBodyProps()
    } > {
      rows.map((row) => {
        prepareRow(row)
        return ( <
          tr className = {
            row.isSelected ? "selected" : ""
          } {
            ...row.getRowProps()
          } >
          {
            row.cells.map((cell) => {
              return <td {
                ...cell.getCellProps()
              } > {
                cell.render("Cell")
              } < /td>
            })
          } <
          /tr>
        )
      })
    } <
    /tbody> <
    /table> <
    /div>
  )
}