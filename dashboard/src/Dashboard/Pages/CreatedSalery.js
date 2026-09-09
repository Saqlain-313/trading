import React from 'react';

const data = [
  { phone: '7498335717', amount: 12000, type: 'daily', time: '31/07/2024, 08:40:30 pm' },
  { phone: '9769968608', amount: 1300, type: 'daily', time: '31/07/2024, 08:40:16 pm' },
  { phone: '9769968608', amount: 1300, type: 'daily', time: '30/07/2024, 11:30:57 pm' },
  { phone: '7498335717', amount: 12000, type: 'daily', time: '30/07/2024, 11:30:42 pm' },
  { phone: '7667849563', amount: 1000, type: 'daily', time: '28/07/2024, 06:56:48 pm' },
  { phone: '9769968608', amount: 1300, type: 'daily', time: '28/07/2024, 06:55:18 pm' },
  { phone: '7498335717', amount: 12000, type: 'daily', time: '28/07/2024, 06:54:18 pm' },
  { phone: '7498335717', amount: 12000, type: 'daily', time: '27/07/2024, 04:24:54 pm' },
];

const CreatedSalary = () => {
  return (
    <div className="container mx-auto text-[#FF9F00]">
      <h2 className="text-2xl font-bold bg-[#FF9F00] text-white py-3 px-4 rounded-md shadow-md text-center">
        Created Salary Record
      </h2>

      {/* Form Section */}
      <div className="bg-white w-full p-5 mt-4 rounded-lg shadow-lg border border-[#FF9F00]">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#FF9F00]">Phone Number</label>
          <input
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
            type="text"
            placeholder="Enter Mobile Number"
          />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <label className="font-semibold text-[#FF9F00]">Amount</label>
          <input
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
            type="number"
            placeholder="Enter Amount"
          />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <label className="font-semibold text-[#FF9F00]">Type</label>
          <select className="py-2 px-3 rounded-md border border-[#FF9F00] text-black focus:outline-none">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
        <button className="mt-5 px-6 py-2 bg-[#FF9F00] text-white rounded-md font-semibold hover:bg-orange-600 transition shadow-md">
          Submit
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white mt-10 rounded-lg border border-[#FF9F00] shadow-lg">
        <h3 className="text-white bg-[#FF9F00] py-3 px-4 text-lg font-semibold rounded-t-lg">
          Salary Records Table
        </h3>
        <table className="min-w-full border border-[#FF9F00] rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#FF9F00] text-white">
              <th className="py-3 px-5 border-b text-left">Phone</th>
              <th className="py-3 px-5 border-b text-left">Amount</th>
              <th className="py-3 px-5 border-b text-left">Type</th>
              <th className="py-3 px-5 border-b text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-black border-b hover:bg-orange-100 transition">
                  <td className="py-3 px-5">{item.phone}</td>
                  <td className="py-3 px-5">₹{item.amount.toFixed(2)}</td>
                  <td className="py-3 px-5">{item.type}</td>
                  <td className="py-3 px-5">{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatedSalary;
