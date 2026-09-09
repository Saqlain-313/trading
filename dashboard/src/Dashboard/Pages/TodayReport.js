import React from 'react';

const data = [
  {
    id: 410,
    account: '9766467557',
    type: 'MOMO',
    amount: 110,
    utr: '421362840401',
    time: '2024-07-31 4:36:10 PM',
    status: 'Success',
    statusColor: 'text-green-500',
  },
  {
    id: 411,
    account: '9766467558',
    type: 'BANK',
    amount: 200,
    utr: '421362840402',
    time: '2024-07-31 5:15:20 PM',
    status: 'Pending',
    statusColor: 'text-yellow-500',
  },
  {
    id: 412,
    account: '9766467559',
    type: 'MOMO',
    amount: 150,
    utr: '421362840403',
    time: '2024-07-31 6:10:45 PM',
    status: 'Failed',
    statusColor: 'text-red-500',
  },
];

const ReportTable = () => {
  return (
    <div className="p-6 text-[#FF9F00]">
      <h1 className="text-2xl font-bold bg-[#FF9F00] text-white py-3 px-4 rounded-md shadow-md text-center">
        Today Report
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <select className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF9F00]">
          <option>Recharge</option>
        </select>
        <input
          type="date"
          className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
        />
        <button className="px-6 py-2 bg-[#FF9F00] text-white rounded-md font-semibold hover:bg-orange-600 transition shadow-md w-full md:w-auto">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-[#FF9F00] rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-[#FF9F00] text-white">
            <tr>
              <th className="border border-[#FF9F00] p-3">#</th>
              <th className="border border-[#FF9F00] p-3">Account</th>
              <th className="border border-[#FF9F00] p-3">Type</th>
              <th className="border border-[#FF9F00] p-3">Amount</th>
              <th className="border border-[#FF9F00] p-3">UTR</th>
              <th className="border border-[#FF9F00] p-3">Time</th>
              <th className="border border-[#FF9F00] p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center text-black bg-white hover:bg-[#FFF3E0] transition">
                <td className="border border-[#FF9F00] p-3">{item.id}</td>
                <td className="border border-[#FF9F00] p-3">{item.account}</td>
                <td className="border border-[#FF9F00] p-3">{item.type}</td>
                <td className="border border-[#FF9F00] p-3">{item.amount}</td>
                <td className="border border-[#FF9F00] p-3">{item.utr}</td>
                <td className="border border-[#FF9F00] p-3">{item.time}</td>
                <td className={`border border-[#FF9F00] p-3 font-semibold ${item.statusColor}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
