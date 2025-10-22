import { useEffect, useState } from "react";
import {
  useNewStatement,
  useParticularValues,
  useStatement,
} from "../store/logisticsStore";

const LogisticsTable = () => {
  const [columns, setColumns] = useState(["Forwarder"]);
  const [newVendor, setNewVendor] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { particularvalue } = useParticularValues();
  const { setTableData } = useStatement();
  const { newstatement } = useNewStatement();

  const addColumn = () => {
    setSubmitted(true);
    if (newVendor.trim() == "") return;
    setColumns([...columns, newVendor.trim()]);
    setNewVendor("");
    setSubmitted(false);
  };
  const getIndex = (id) => id.split("_")[1];
  const handleChange = (rowIndex, colIndex, value, particular) => {
    setTableData((prev) => {
      const exists = prev.some(
        (row) => getIndex(row.id) === getIndex(rowIndex)
      );
      if (exists) {
        return prev.map((row) =>
          row.id === rowIndex
            ? {
                ...row,
                particulars: particular,
                forwarders: { ...row.forwarders, [colIndex]: value },
              }
            : row
        );
      } else {
        return [
          ...prev,
          {
            id: rowIndex,
            particulars: particular,
            forwarders: { [colIndex]: value },
          },
        ];
      }
    });
  };

  return (
    <div className="">
      <div className="flex gap-2 mb-2 text-center items-center">
        <div className="flex flex-col  w-64">
          <input
            type="text"
            value={newVendor}
            onChange={(e) => setNewVendor(e.target.value)}
            placeholder="Enter the forwarder name"
            className="border rounded-lg px-3 py-2 w-full"
          />
          <span className="text-red-500 text-xs text-start h-2">
            {submitted && newVendor.trim() === ""
              ? "Enter the Forwarder Name"
              : ""}
          </span>{" "}
        </div>
        <button
          onClick={addColumn}
          className=" px-2 py-1  bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          + Add Vendor
        </button>
      </div>
      <table
        className={`table  border border-gray-300 ${columns.length > 1 ? " w-3/4" : "w-1/3"} overflow-x-auto max-w-full text-sm`}
      >
        <thead className="text-center bg-gray-100">
          <tr className="border-b">
            {columns.map((column, index) => (
              <th key={index} className="p-2 ">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {particularvalue.map((particular, index) => {
            const rowIndex = `row_${index}`;
            return (
              <tr key={index} className="border-b text-center">
                <td className="px-4 py-2">{particular}</td>
                {columns.slice(1).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-l">
                    <input
                      type="text"
                      className={`w-1/2 px-2 py-1 text-center  font-semibold border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-400`}
                      onChange={(e) =>
                        handleChange(
                          rowIndex,
                          colIndex,
                          e.target.value,
                          particular
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {newstatement && (
        <div className="flex justify-end p-5 gap-4">
          <button
            type="submit"
            className="flex items-center font-semibold px-10 py-2 bg-blue-600 text-white rounded  shadow cursor-pointer"
          >
            Create
          </button>
          <button
            type="submit"
            className="flex items-center font-semibold px-10 py-2 bg-blue-600 text-white rounded  shadow cursor-pointer "
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default LogisticsTable;
