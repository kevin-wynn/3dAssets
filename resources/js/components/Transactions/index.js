import React from "react"
import { useTable, useRowSelect } from "react-table"

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef()
  const resolvedRef = ref || defaultRef

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
})

const renderBalanceCell = ({ value }) => {
  if (value > 0) {
    return <div className="text green">{value}</div>
  } else {
    return <div className="text red">{value}</div>
  }
}

const renderInflowCell = ({ value }) => {
  if (value) {
    return <div className="pill green">{value}</div>
  } else {
    return <div></div>
  }
}

const renderOutflowCell = ({ value }) => {
  if (value) {
    return <div className="pill red">{value}</div>
  } else {
    return <div></div>
  }
}

export function TransactionsTable({ columns_BAK, data_BAK }) {
  const data = React.useMemo(
    () => [
      {
        date: new Date().toLocaleDateString(),
        payee: "Capital One",
        category: "Capital One Quicksilver",
        memo: "",
        outflow: 100.0,
        inflow: "",
        balance: -3901.7
      },
      {
        date: new Date().toLocaleDateString(),
        payee: "HEB",
        category: "Groceries",
        memo: "",
        outflow: 113.53,
        inflow: "",
        balance: 4001.7
      },
      {
        date: new Date("7-1-2020").toLocaleDateString(),
        payee: "Us",
        category: "Salary",
        memo: "",
        outflow: "",
        inflow: 4115.23,
        balance: 4115.23
      }
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
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
        Header: "Memo",
        accessor: "memo"
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
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className="checkbox">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div className="checkbox">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ])
    }
  )

  return (
    <table cellSpacing="0" cellPadding="0" className="b-table" {...getTableProps()}>
      <thead className="b-table-header">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")} </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="b-table-body" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr className={row.isSelected ? "selected" : ""} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
