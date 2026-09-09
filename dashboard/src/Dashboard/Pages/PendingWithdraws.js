import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getPendingWithdrawal } from "../utils/userSlice";
import { approveWithdrawal } from "../utils/adminSlice";


const PendingWithdrawal = () => {
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const { pendingWithdrawal, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPendingWithdrawal({ pageno: currentPage, pageto: itemsPerPage }));
  }, [currentPage, dispatch]);

  // Filter withdrawals by search query
  const filteredData = pendingWithdrawal?.filter((data) => {
    const userId = data.userId?.toString().toLowerCase() || "";
    const orderId = data.orderId?.toString().toLowerCase() || "";
    const phone = data.phoneNumber?.toString().toLowerCase() || "";
    return (
      userId.includes(searchData.toLowerCase()) ||
      orderId.includes(searchData.toLowerCase()) ||
      phone.includes(searchData.toLowerCase())
    );
  }) || [];

  const handleApprove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this withdrawal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      });

      if (result.isConfirmed) {
        await dispatch(approveWithdrawal({ orderId: id, status: 1 })).unwrap();
        Swal.fire("Approved!", "The withdrawal has been approved.", "success");
        dispatch(getPendingWithdrawal({ pageno: currentPage, pageto: itemsPerPage }));
      }
    } catch (error) {
      Swal.fire("Error!", error?.message || "Something went wrong.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to reject this withdrawal?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
      });

      if (result.isConfirmed) {
        await dispatch(approveWithdrawal({ orderId: id, status: 2 })).unwrap();
        Swal.fire("Rejected!", "The withdrawal has been rejected.", "success");
        dispatch(getPendingWithdrawal({ pageno: currentPage, pageto: itemsPerPage }));
      }
    } catch (error) {
      Swal.fire("Error!", error?.message || "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-white bg-[#ff9933] p-4 rounded-lg text-center shadow-lg mb-6">
        Approve Withdrawal
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Phone Number, User ID, or Order ID to search"
          className="w-full p-3 rounded-lg border border-[#ff9933] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-[#ff9933]">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#ff9933] text-white">
              {["#", "ID", "Order ID", "User ID", "Amount", "Type", "USDT", "Status", "Date", "Actions"].map((head, i) => (
                <th
                  key={i}
                  className="px-6 py-4 text-left font-semibold uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr
                  key={data.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.orderId}
                  </td>
                  < td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.userId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    ₹{data.amount}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.type}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.usdt}
                  </td>
                  <td
                    className={`px-6 py-4 border-b border-gray-200 text-center font-semibold ${
                      data.status === 1
                        ? "text-green-600"
                        : data.status === -1
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {data.status === 1
                      ? "Approved"
                      : data.status === -1
                      ? "Rejected"
                      : "Pending"}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {new Date(data.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.status === 0 && (
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                          onClick={() => handleApprove(data.orderId)}
                        >
                          <AiOutlineCheck />
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          onClick={() => handleReject(data.orderId)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-[#ff9933] text-white hover:bg-[#e68300]"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#ff9933] text-white rounded hover:bg-[#e68300]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingWithdrawal;