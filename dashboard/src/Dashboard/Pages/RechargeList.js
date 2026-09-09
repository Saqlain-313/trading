import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getRechargeList, approveRecharge } from "../utils/adminSlice";

const RechargeList = () => {
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const { recharge } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(getRechargeList({ pageno: currentPage, pageto: itemsPerPage }));
  }, [currentPage, dispatch]);

  const filteredData = recharge.data?.filter(
    (data) =>
      data.userId?.toString().includes(searchData) ||
      data.orderId?.toString().includes(searchData) ||
      data.phoneNumber?.toString().includes(searchData)
  );

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve?",
      text: "Do you want to approve this recharge?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff9933",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      await dispatch(approveRecharge({ orderId: id, status: 1 }));
      dispatch(getRechargeList({ pageno: currentPage, pageto: itemsPerPage }));
      Swal.fire("Approved!", "", "success");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-white bg-[#ff9933] p-4 rounded-lg text-center shadow-lg mb-6">
        Recharge List
      </h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by User ID, Order ID, Phone"
          className="w-full p-3 rounded-lg border border-[#ff9933] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff9933] focus:border-transparent"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      {recharge.loading ? (
        <p className="text-center mt-6 text-[#ff9933]">Loading...</p>
      ) : filteredData?.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">No recharge records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-[#ff9933]">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#ff9933] text-white">
                {["#", "User  ID", "Type", "Amount", "UTR No", "Time", "Order ID", "Status"].map(
                  (heading, i) => (
                    <th
                      key={i}
                      className="px-6 py-4 text-left font-semibold uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.userId}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.type}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.amount}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.utrNo}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {new Date(data.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center">
                    {data.orderId}
                  </td>
                  <td
                    className={`px-6 py-4 border-b border-gray-200 text-center font-semibold ${
                      data.status === 1
                        ? "text-green-600"
                        : data.status === -1
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {data.status === 1
                      ? "Approved"
                      : data.status === -1
                      ? "Rejected"
                      : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-[#ff9933] text-white rounded-lg disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#ff9933] text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RechargeList;