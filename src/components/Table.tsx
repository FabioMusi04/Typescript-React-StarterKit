import { ReactNode, useEffect, useState } from "react";
import axiosInstance from "../../ts/axiosInstance";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loading from "./Loading";
import { BackOfficeSections } from "../../ts/types";
import { JSX } from "react/jsx-runtime";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface TableProps<T> {
  initialData: T[];
  type?: keyof typeof BackOfficeSections;
  ignoreFields?: string[];
  setAlert?: (alert: {
    message: string;
    type: "success" | "error";
    onClose: () => void;
  }) => void;
}

export const Table = <T extends object>({
  initialData,
  type = "default",
  ignoreFields = [],
  setAlert,
}: TableProps<T>) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const [data, setData] = useState<T[]>(initialData);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [editModal, setEditModal] = useState({
    isOpen: false,
    initialData: {},
    onSave: () => {},
    onClose: () => {},
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `/${type}?page=${paginationState.currentPage}&limit=${paginationState.itemsPerPage}`
        );
        setData(response.data.docs);
        setTotalPages(response.data.totalPages);
        setPaginationState({
          ...paginationState,
          currentPage: response.data.currentPage,
        });
        setLoading(false);
      } catch (error) {
        if (setAlert) {
          setAlert({
            message: (error as Error).message,
            type: "error",
            onClose: () =>
              setAlert({ message: "", type: "success", onClose: () => {} }),
          });
        }
      }
    }
    fetchData();
  }, [paginationState.itemsPerPage, paginationState.currentPage, type]);

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaginationState({
      ...paginationState,
      itemsPerPage: Number(event.target.value),
      currentPage: 1,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return (
      <div className="text-primary text-center p-4">No data available</div>
    );
  }

  const tableHeaders = Object.keys(data[0]).filter(
    (key) => !ignoreFields.includes(key)
  );

  return (
    <div className="flex justify-center w-full mx-auto">
      <div className="w-full max-w-4xl p-6 bg-third">
        <div className="w-full mx-auto flex justify-between items-center mb-4">
          <div className="text-sm text-secondary">
            Page {paginationState.currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="limit" className="text-sm text-secondary">
              Items per page:
            </label>
            <select
              id="limit"
              value={paginationState.itemsPerPage}
              onChange={handleLimitChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: "50vh" }}
        >
          <table className="relative bg-primary border border-gray-200 min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider border-r whitespace-nowrap"
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </th>
                ))}
                <th className="sticky right-0 bg-gray-50 px-4 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider border-l whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {tableHeaders.map((header, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className="px-4 py-3 text-center text-sm text-secondary border-r whitespace-nowrap"
                    >
                      {(() => {
                        const value = item[header as keyof T];
                        let displayValue:
                          | string
                          | number
                          | boolean
                          | JSX.Element
                          | Iterable<ReactNode>
                          | null
                          | undefined;
                        if (
                          typeof value === "object" &&
                          value !== null &&
                          !Array.isArray(value)
                        ) {
                          displayValue =
                            (value as { _id?: string })._id || "[object]";
                        } else if (Array.isArray(value)) {
                          displayValue = value.join(", ");
                        } else if (typeof value === "boolean") {
                          displayValue = value ? "Yes" : "No";
                        } else {
                          displayValue = value as string;
                          if (!displayValue) {
                            displayValue = "-";
                          }

                          const extensions = [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "svg",
                          ];
                          for (const ext of extensions) {
                            if (
                              displayValue
                                .toString()
                                .toLocaleLowerCase()
                                .includes(ext)
                            ) {
                                displayValue = (
                                <div className="flex justify-center">
                                  <img
                                  src={displayValue.toString()}
                                  alt="Image"
                                  className="w-10 h-10 object-cover rounded-full"
                                  />
                                </div>
                                );
                              break;
                            }
                          }
                        }
                        return displayValue;
                      })()}
                    </td>
                  ))}
                  <td className="sticky right-0 bg-secondary px-4 py-3 text-center text-sm text-secondary border-l whitespace-nowrap">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => {
                          console.log("Edit", item);
                          setEditModal({
                            isOpen: true,
                            initialData: item,
                            onSave: () => console.log(data),
                            onClose: () =>
                              setEditModal({ ...editModal, isOpen: false }),
                          });
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() =>
              setPaginationState((prev) => ({
                ...prev,
                currentPage: Math.max(1, prev.currentPage - 1),
              }))
            }
            disabled={paginationState.currentPage === 1}
            className={`px-4 py-2 border rounded ${
              paginationState.currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-secondary">
            Page {paginationState.currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setPaginationState((prev) => ({
                ...prev,
                currentPage: Math.min(totalPages, prev.currentPage + 1),
              }))
            }
            disabled={paginationState.currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              paginationState.currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
