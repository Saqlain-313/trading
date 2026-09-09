import React, { useState } from "react";

const Turnover = () => {
  const [searchData, setSearchData] = useState("");

  const turnoverData = [
    {
      id: 3183,
      userid: "9499587229",
      sponsorid: "eGczr92959",
      totalDeposit: 0,
      totalWithdrawal: 0,
      totalBonus: 0,
      totalBets: "0.00",
      totalWin: "0.00",
      totalLoss: 0,
      currentBal: 0,
      totalPL: 0,
    },
    {
      id: 3182,
      userid: "9770737072",
      sponsorid: "VnfUv82919",
      totalDeposit: 0,
      totalWithdrawal: 0,
      totalBonus: 0,
      totalBets: "0.00",
      totalWin: "0.00",
      totalLoss: 0,
      currentBal: 0,
      totalPL: 0,
    },
    {
      id: 3181,
      userid: "9931143723",
      sponsorid: "QuNZG67235",
      totalDeposit: 100,
      totalWithdrawal: 0,
      totalBonus: 15,
      totalBets: "0.00",
      totalWin: "0.00",
      totalLoss: 0,
      currentBal: 115,
      totalPL: 0,
    },
    {
      id: 3180,
      userid: "9600703101",
      sponsorid: "dphUp53286",
      totalDeposit: 0,
      totalWithdrawal: 0,
      totalBonus: 0,
      totalBets: "0.00",
      totalWin: "0.00",
      totalLoss: 0,
      currentBal: 0,
      totalPL: 0,
    },
  ];

  const filterData = turnoverData.filter(
    (item) =>
      item.userid.includes(searchData) || item.sponsorid.includes(searchData)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-orange-600 mb-6">
        Turnover Report
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Enter the account to search"
        className="p-3 border border-orange-400 rounded-md w-full bg-white focus:ring focus:ring-orange-500 focus:outline-none text-gray-700"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
        <table className="min-w-full bg-orange-100 border border-orange-300 rounded-lg">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 border border-orange-300">#</th>
              <th className="py-2 border border-orange-300">Userid</th>
              <th className="py-2 border border-orange-300">Sponsorid</th>
              <th className="py-2 border border-orange-300">Total Deposit</th>
              <th className="py-2 border border-orange-300">Total Withdrawal</th>
              <th className="py-2 border border-orange-300">Total Bonus</th>
              <th className="py-2 border border-orange-300">Total Bets</th>
              <th className="py-2 border border-orange-300">Total Win</th>
              <th className="py-2 border border-orange-300">Total Loss</th>
              <th className="py-2 border border-orange-300">Current Bal.</th>
              <th className="py-2 border border-orange-300">Total P/L</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item) => (
              <tr key={item.id} className="text-center text-orange-700">
                <td className="py-2 border border-orange-300">{item.id}</td>
                <td className="py-2 border border-orange-300">{item.userid}</td>
                <td className="py-2 border border-orange-300">{item.sponsorid}</td>
                <td className="py-2 border border-orange-300">{item.totalDeposit}</td>
                <td className="py-2 border border-orange-300">{item.totalWithdrawal}</td>
                <td className="py-2 border border-orange-300">{item.totalBonus}</td>
                <td className="py-2 border border-orange-300">{item.totalBets}</td>
                <td className="py-2 border border-orange-300">{item.totalWin}</td>
                <td className="py-2 border border-orange-300">{item.totalLoss}</td>
                <td className="py-2 border border-orange-300">{item.currentBal}</td>
                <td className="py-2 border border-orange-300">{item.totalPL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Turnover;
