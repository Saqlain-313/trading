import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useDispatch, useSelector } from "react-redux";
import { allAgentUser } from "../utils/userSlice";
import { blockUser } from "../utils/adminSlice";

const Agent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const [pageno, setPage] = useState(1);
  const [pageto, setPageto] = useState(10);

  const { AllAgent = [] } = useSelector((store) => store.user);
  const { blockUserSuccess } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(allAgentUser({ pageno, pageto }));
  }, [pageno, pageto, dispatch, blockUserSuccess]);

  // Filtering Data Safely
  const filteredData = AllAgent.filter((item) =>
    (statusFilter === "All" || item?.status === statusFilter) &&
    (
      item?.mobile?.toString()?.includes(searchTerm) ||
      item?.role?.toString()?.includes(searchTerm) ||
      item?.referCode?.toString()?.includes(searchTerm) ||
      item?.referBy?.toString()?.includes(searchTerm)
    )
  );

  // Paginated Data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Block/Unblock
  const handleLockClick = async (userId, status) => {
    try {
      const action = status === 2 ? "block" : "unblock";
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `Do you want to ${action} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${action} it!`,
      });

      if (result.isConfirmed) {
        await dispatch(blockUser({ userId, status })).unwrap();
        Swal.fire(
          `${action === "block" ? "Blocked" : "Unblocked"}!`,
          `The user has been ${action}ed successfully.`,
          "success"
        );
        dispatch(allAgentUser({ pageno, pageto })); // Refresh user list
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  // Function to get status text
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Inactive";
      case 2:
        return "Blocked";
      default:
        return "Unknown";
    }
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-green-500";
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Agent List</h2>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search agents..."
          className="border focus:outline-none border-orange-400 p-3 rounded-md flex-1 bg-white focus:ring focus:border-orange-600 focus:ring-orange-500 text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
        <table className="min-w-full bg-orange-100 border border-orange-300 rounded-lg">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 border border-orange-300">S no.</th>
              <th className="py-2 border border-orange-300">User ID</th>
              <th className="py-2 border border-orange-300">Position</th>
              <th className="py-2 border border-orange-300">Amount</th>
              <th className="py-2 border border-orange-300">Status</th>
              <th className="py-2 border border-orange-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item?.id} className="text-center text-orange-700">
                <td className="py-2 border border-orange-300">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="py-2 border border-orange-300">{item?.userId}</td>
                <td className="py-2 border border-orange-300">{item?.role}</td>
                <td className="py-2 border border-orange-300">{item?.money}</td>
                <td className="py-2 border border-orange-300">
                  <span className={`px-2 py-1 rounded ${getStatusColor(item?.status)} text-white`}>
                    {getStatusText(item?.status)}
                  </span>
                </td>
                <td className="py-2 border border-orange-300 flex justify-center space-x-2">
                  <Link to={`/profile/${item.userId}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                      <FaUser className="mr-1" /> Profile
                    </button>
                  </Link>
                  {item.status === 2 ? (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => handleLockClick(item.userId, 0)}
                    >
                      <FaLock className="mr-1" /> Unblock
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => handleLockClick(item.userId, 2)}
                    >
                      <FaLock className="mr-1" /> Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all ${
            currentPage === 1
              ? "bg-orange-300 opacity-50"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all ${
            currentPage * itemsPerPage >= filteredData.length
              ? "bg-orange-300 opacity-50"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Agent;