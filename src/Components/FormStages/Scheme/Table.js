import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";

const EditableCell = ({
  cell: { value: initialValue }, 
  row: { index }, 
  column: { id }, 
  updateMyData 
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => setValue(e.target.value);

  const handleBlur = () => updateMyData(index, id, value); 


  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={handleChange} onBlur={handleBlur} />;
};

const defaultColumn = {
  Cell: EditableCell
};
const Table = ({ columns, data, updateMyData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn, 
      updateMyData
    },
    useSortBy
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
         
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
