import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingBetList } from "../utils/adminSlice";

const PendingBettingHistory = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [pageno, setPageno] = useState(1);
  const [pageto] = useState(10); // Number of records per page

  const { PendingBetList, loading } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(getPendingBetList({ pageno, pageto }));
  }, [pageno, pageto, dispatch]);

  // Ensure PendingBetList is valid and extract data array
  const betData = PendingBetList?.data || [];

  

  // Filter betting data based on search (searching by orderId or userId)
  const filteredData = betData.filter((bet) => {
    const orderId = bet.orderId?.toString().toLowerCase() || "";
    const userId = bet.userId?.toString().toLowerCase() || "";
    return orderId.includes(searchData.toLowerCase()) || userId.includes(searchData.toLowerCase());
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto text-[#FF9F00]">
      <h2 className="text-2xl font-bold bg-[#FF9F00] text-white py-2 px-4 rounded mb-4">
        Betting History
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Order ID or User ID to search"
          className="w-full p-2 rounded border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-[#FF9F00] rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#FF9F00] text-white">
              <th className="py-2 px-4 border border-[#ff9933]">Order ID</th>
              <th className="py-2 px-4 border border-[#ff9933]">User ID</th>
              <th className="py-2 px-4 border border-[#ff9933]">Bet Amount</th>
              <th className="py-2 px-4 border border-[#ff9933]">Bet Type</th>
              <th className="py-2 px-4 border border-[#ff9933]">Trade Type</th>
              <th className="py-2 px-4 border border-[#ff9933]">Status</th>
              <th className="py-2 px-4 border border-[#ff9933]">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((bet, index) => (
                <tr key={index} className="text-black text-center border-b hover:bg-orange-100 transition">
                  <td className="py-2 px-4 border-b">{bet.orderId}</td>
                  <td className="py-2 px-4 border-b">{bet.userId}</td>
                  <td className="py-2 px-4 border-b">₹{bet.amount}</td>
                  <td className="py-2 px-4 border-b">{bet.bet}</td>
                  <td className="py-2 px-4 border-b">{bet.tradeType}</td>
                  <td className="py-2 px-4 border-b">{bet.status === 0 ? "Pending" : "Completed"}</td>
                  <td className="py-2 px-4 border-b">{new Date(bet.time).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-2 border rounded ${pageno === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#FF9F00] text-white"}`}
          onClick={() => setPageno((prev) => Math.max(prev - 1, 1))}
          disabled={pageno === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{pageno}</span>
       
        <button
       
    
       className={`px-4 py-2 mx-2 border rounded ${filteredData.length < 10 ? "opacity-50 cursor-not-allowed" : "bg-[#FF9F00] text-white"}`}
          onClick={() => setPageno((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingBettingHistory;
