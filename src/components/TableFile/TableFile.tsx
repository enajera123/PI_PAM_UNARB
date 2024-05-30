import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { showDeleteConfirmation, showCustomAlert } from "@/utils/alerts";

export type TableProps = {
  headers: Array<string>;
  data: Array<any>;
  itemsPerPage: number;
  resetPagination?: number;
  keys: Array<string>;
  addButtonUrl?: string;
  deleteFunction: (id: number) => void;
};

const TableFile = ({
  data,
  headers,
  itemsPerPage,
  resetPagination,
  addButtonUrl,
  deleteFunction,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleBtnPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBtnNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (resetPagination) {
      setCurrentPage(1);
    }
  }, [resetPagination, setCurrentPage]);

  const handleDelete = (id: number) => {
    showDeleteConfirmation().then((result) => {
      if (result.isConfirmed) {
        deleteFunction && deleteFunction(id);
        showCustomAlert(
          "¡Eliminado!",
          "El elemento ha sido eliminado.",
          "success"
        );
      }
    });
  };

  return (
    <>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b-2 border-gray-200 bg-dark-red text-left text-sm leading-4 text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-dark-red text-left text-sm leading-4 text-white uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="even:bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100"
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 border-b border-gray-200 rounded-lg"
                >
                  {row[header]}
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200 rounded-lg">
                <button
                  className="flex items-center justify-center bg-white text-dark-gray rounded-xl px-2 border border-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => handleDelete(rowIndex)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 w-full">
        <div className="flex space-x-4">
          {data.length > 0 && (
            <>
              <button
                className="flex items-center text-sm justify-center px-6 py-2 text-white bg-dark-red hover:bg-red-gradient rounded-full cursor-pointer shadow-md"
                onClick={handleBtnPrevious}
              >
                <MdArrowBackIosNew />
                Anteriores
              </button>
              <button
                className="flex items-center text-sm justify-center px-6 py-2 text-white bg-dark-red rounded-full hover:bg-red-gradient cursor-pointer shadow-md z-10"
                onClick={handleBtnNext}
              >
                Siguientes
                <MdArrowForwardIos />
              </button>
              <div className="relative">
                <div
                  className="absolute flex text-sm items-center justify-center text-medium-gray pl-16 pr-8 py-2 bg-dark-gray font-bold rounded-full shadow-md"
                  style={{
                    top: "50%",
                    left: "100%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {currentPage}/{totalPages}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-10 w-full">
        {addButtonUrl && (
          <Link href={addButtonUrl}>
            <button className="flex text-white items-center px-6 py-2 rounded-lg bg-dark-red hover:bg-red-gradient">
              Agregar
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default TableFile;
