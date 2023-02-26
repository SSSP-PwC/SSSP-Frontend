import React, { useState, useEffect } from 'react';

function PopulatedTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
