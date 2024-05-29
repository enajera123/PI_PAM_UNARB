"use client";

import React, { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { TableProps } from "./type";
import { showDeleteConfirmation, showCustomAlert } from "@/utils/alerts";

const Table = ({
  keys,
  desactivateRowFunction,
  doubleClickRowFunction,
  data,
  headers,
  itemsPerPage,
  resetPagination,
  actionColumn,
  deleteRowFunction,
  addButtonUrl,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const gridTemplateColumns =
    actionColumn === "none"
      ? `minmax(150px, 1fr) repeat(${headers.length - 2}, minmax(0, 1fr)) minmax(180px, 1fr)`
      : actionColumn === "delete"
      ? `minmax(150px, 1fr) repeat(${headers.length - 1}, minmax(0, 1fr)) minmax(0, 1fr)`
      : `minmax(150px, 1fr) repeat(${headers.length - 1}, minmax(0, 1fr)) minmax(210px, 1fr)`;

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

  const getDeactivateButtonText = (isActive: string) => {
    return isActive === "Activo" ? "Desactivar" : "Activar";
  };

  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

  const handleAddParticipantClick = (id: number) => {
    if (desactivateRowFunction) {
      desactivateRowFunction(id);
    }
    setIsDeleteDisabled(false);
  };

  const getAddedParticipantText = (isAdded: string) => {
    return isAdded === "Registered" ? "Agregado" : "Agregar al curso";
  };

  const handleDeleteItem = (id: number) => {
    showDeleteConfirmation().then((result) => {
      if (result.isConfirmed) {
        deleteRowFunction && deleteRowFunction(id);
        showCustomAlert("¡Eliminado!", "El elemento ha sido eliminado.", "success");
      }
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const renderButtons = (item: any) => {
    const buttonClass =
      "flex items-center justify-center bg-white text-dark-gray rounded-xl px-2 border border-gray-400 shadow-md hover:bg-gray-100 hover:text-gray-800";

    switch (actionColumn) {
      case "delete":
        return (
          <>
            <button
              className={buttonClass}
              onClick={() => handleDeleteItem(item.id)}
            >
              Eliminar
            </button>
          </>
        );
      case "delete-participants":
        return (
          <>
            <button
              className={buttonClass}
              onClick={() => handleDeleteItem(item.id)}
            >
              Eliminar
            </button>
            <Link href={{ pathname: "/participants", query: { courseId: item.id } }}>
              <button className={buttonClass}>Participantes</button>
            </Link>
          </>
        );
      case "delete-state":
        return (
          <>
            <button
              className={buttonClass}
              onClick={() => handleDeleteItem(item.id)}
            >
              Eliminar
            </button>
            <button
              className={`${buttonClass} w-28`}
              onClick={() =>
                desactivateRowFunction && desactivateRowFunction(item.id)
              }
            >
              {getDeactivateButtonText(item.state)}
            </button>
          </>
        );
      case "add-participant":
        return (
          <>
            <button
              className={buttonClass}
              onClick={() => handleDeleteItem(item.id)}
              disabled={isDeleteDisabled}
            >
              Eliminar
            </button>
            <button
              className={`${buttonClass} w-28`}
              onClick={() => handleAddParticipantClick(item.id)}
            >
              {getAddedParticipantText(item.state)}
            </button>
          </>
        );
      case "none":
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <div
            className="grid gap-x-2 text-xs text-white uppercase bg-dark-red dark:bg-medium-red dark:text-white"
            style={{ gridTemplateColumns }}
          >
            {headers.map((header) => (
              <div key={header} className="col-span-1 px-4 py-3 flex items-center justify-start">
                {header}
              </div>
            ))}
            {actionColumn !== "none" && (
              <div className="col-span-1 px-4 py-3 flex items-center justify-start">Acciones</div>
            )}
          </div>
          <div>
            {getCurrentPageData().map((item, index) => (
              <div
                onDoubleClick={() =>
                  doubleClickRowFunction && doubleClickRowFunction(item.id)
                }
                key={index}
                className="grid bg-white dark:bg-medium-gray border-2 border-dark-gray dark:border-gray-700 text-dark-gray hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full my-3 items-center"
                style={{ gridTemplateColumns }}
              >
                {keys.map((key, index) => (
                  <div
                    key={index}
                    className="col-span-1 px-4 py-2 overflow-hidden whitespace-nowrap"
                  >
                    {key === "view" ? (
                      isValidUrl(item.attachmentUrl) ? (
                        <a
                          href={item.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Ver archivo
                        </a>
                      ) : (
                        "URL no válida"
                      )
                    ) : (
                      <div className="overflow-hidden">{item[key]}</div>
                    )}
                  </div>
                ))}
                {actionColumn !== "none" && (
                  <div className="col-span-1 px-4 py-2">
                    <div className="flex gap-2">{renderButtons(item)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-10 w-full">
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
                  style={{ top: "50%", left: "100%", transform: "translate(-50%, -50%)" }}
                >
                  {currentPage}/{totalPages}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center">
          {addButtonUrl && (
            <Link href={addButtonUrl}>
              <button className="flex text-white items-center px-6 py-2 rounded-lg bg-dark-red hover:bg-red-gradient">
                Agregar
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
