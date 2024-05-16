"use client"

import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { TableProps } from "./type";

const Table = ({ keys, data, headers, itemsPerPage, resetPagination, showEditColumn = false }: TableProps) => {

  const currentPageClass = 'flex items-center justify-center px-3 h-8 leading-tight text-medium-red bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-medium-red dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'

  const currentPageActiveClass = 'flex items-center justify-center px-3 h-8 leading-tight text-medium-red bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-medium-gray dark:border-gray-700 dark:text-medium-red dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer'


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

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

  return (
    <>
      <div className="flex flex-col">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-dark-red dark:bg-medium-red dark:text-white">
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
                {showEditColumn && <th scope="col" className="px-6 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((item, index) => (
                <tr
                  key={index}
                  className={`odd:bg-white odd:dark:bg-medium-gray  even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700 text-medium-red`}
                >
                  {keys.map((key) => (
                    <td key={key} className="px-6 py-4">
                      {item[key]}
                    </td>
                  ))}
                  {showEditColumn && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="bg-white text-dark-gray rounded-xl px-3 py-1 border border-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-800"
                          onClick={() => console.log("Eliminar", item)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="bg-white text-dark-gray rounded-xl px-3 py-1 border border-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-800"
                          onClick={() => console.log("Desactivar", item)}
                        >
                          Desactivar
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-8"
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <span
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-medium-red dark:border-medium-red dark:text-white dark:hover:bg-dark-red dark:hover:text-white cursor-pointer"
                onClick={() => handleBtnPrevious()}
              >
                <span className="sr-only">Previous</span>
                <MdArrowBackIosNew />
              </span>
            </li>
            {Array(totalPages)
              .fill(null)
              .map((_, index) => (
                <li key={index}>
                  <span
                    className={index + 1 === currentPage ? currentPageActiveClass : currentPageClass}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </span>
                </li>
              ))}
            <li>
              <span
                className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-white border border-medium-red rounded-e-lg hover:bg-gray-100 hover:text-white dark:bg-medium-red dark:border-medium-red dark:text-white dark:hover:bg-dark-red dark:hover:text-white cursor-pointer"
                onClick={() => handleBtnNext()}
              >
                <span className="sr-only">Next</span>
                <MdArrowForwardIos />
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Table;