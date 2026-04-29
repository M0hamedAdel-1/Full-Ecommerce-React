import { OrbitProgress } from "react-loading-indicators";
const TableComponent = ({ headers, rows, pageIndex }) => {
  return (
    <div className="all_table">
        <div className="table_container overflow-x-scroll">
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header.label}</th>
                ))}
              </tr>
            </thead>

                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                        {headers.map((header, j) => (
                            <td key={j}>
                            {header.render
                                ? header.render(row, i, pageIndex)
                                : row[header.key]}
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            
      
          </table>
        </div>
    </div>
  );
};

export default TableComponent;
