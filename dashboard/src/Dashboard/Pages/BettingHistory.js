
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBetList } from "../utils/userSlice";

const BettingHistory = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const { betList } = useSelector((store) => store.user);
  console.log("Bet List Details:", betList);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getBetList({ pageno: currentPage, pageto: itemsPerPage }));
  }, [currentPage, dispatch]);

  // Filter the bet list based on User ID
  const filteredBets = Array.isArray(betList)
    ? betList.filter((bet) =>
        bet.userId.toString().includes(searchData.trim())
      )
    : [];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-[#FF9F00] mb-6">Betting History</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter User ID to search"
          className="w-full p-3 rounded-lg border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00] focus:border-transparent"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-[#FF9F00] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Bet Amount</th>
              <th className="py-3 px-4 text-left">Result</th>
              <th className="py-3 px-4 text-left">Winning Amount</th>
              <th className="py-3 px-4 text-left">Trade Type</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredBets.length > 0 ? (
              filteredBets.map((bet, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{bet.orderId}</td>
                  <td className="py-3 px-4">{bet.userId}</td>
                  <td className="py-3 px-4">{bet.amount}</td>
                  <td className="py-3 px-4">{bet.result}</td>
                  <td className="py-3 px-4">{bet.getAmount}</td>
                  <td className="py-3 px-4">{bet.tradeType}</td>
                  <td className="py-3 px-4">{bet.status}</td>
                  <td className="py-3 px-4">
                    {new Date(bet.time).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg transition-colors ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-[#FF9F00] text-white hover:bg-[#e68300]"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-[#FF9F00] font-medium">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#FF9F00] text-white rounded-lg hover:bg-[#e68300] transition-colors"
        >
          Next
        </button>








        
      </div>
    </div>
  );
};

export default BettingHistory;