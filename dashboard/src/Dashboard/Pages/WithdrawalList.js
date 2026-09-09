


import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getWithdrawalList, approveRecharge } from "../utils/adminSlice";

const WithdrawalList = () => {
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const { data: withdrawalList, loading, error } = useSelector(
    (store) => store.admin.withdrawal
  );

  useEffect(() => {
    dispatch(getWithdrawalList({ pageno: currentPage, pageto: itemsPerPage }));
  }, [currentPage, dispatch]);

  // Filter data based on search input
  const filteredData = withdrawalList?.filter(
    (data) =>
      data.userId?.toString().includes(searchData) ||
      data.orderId?.toString().includes(searchData) ||
      data.phoneNumber?.toString().includes(searchData)
  );

  // Approve withdrawal
  const handleApprove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Approve Withdrawal?",
        text: "Are you sure you want to approve this?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      });

      if (result.isConfirmed) {
        await dispatch(approveRecharge({ orderId: id, status: 1 })).unwrap();
        Swal.fire("Approved!", "Withdrawal has been approved.", "success");
        dispatch(
          getWithdrawalList({ pageno: currentPage, pageto: itemsPerPage })
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to approve. Please try again.", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-white bg-[#ff9933] p-4 rounded-lg text-center shadow-lg mb-6">
        Withdrawal List
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Phone, User ID, Order ID"
          className="w-full p-3 rounded-lg border border-[#ff9933] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-[#ff9933]">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#ff9933] text-white">
              {[
                "ID",
                
                "Order ID",
                "User ID",
                "Amount",
                "Type",
                "USDT",
                "Status",
                "Date",
              ].map((heading, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-left font-semibold uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredData?.length > 0 ? (
              filteredData.map((data, index) => (
                <tr
                  key={data.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {index + 1}
                  </td>
                  
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.orderId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.userId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.amount}
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
                        ? "text-green-500"
                        : data.status === -1
                        ? "text-red-500"
                        : "text-[#ff9933]"
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-[#ff9933] text-white hover:bg-[#e68300]"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-[#ff9933] font-medium">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#ff9933] text-white rounded-lg hover:bg-[#e68300] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WithdrawalList;