import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaDice, FaRegFlag, FaCheck, FaScaleBalanced } from "react-icons/fa6";
import { GiFlyingFlag } from "react-icons/gi";
import { MdBlock } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdminData, createAgent } from '../utils/adminSlice';

const BusnesMange = () => {
  const dispatch = useDispatch();
  const { allAdminData, createAgentSuccess } = useSelector((store) => store.admin);

  const [agentForm, setAgentForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchAllAdminData());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAgentForm((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAgentSubmit = (e) => {
    e.preventDefault();
  
    if (!agentForm.email || !agentForm.password) {
      alert("Please fill in both fields");
      return;
    }
  
    dispatch(createAgent(agentForm));
  };
  

  useEffect(() => {
    if (createAgentSuccess) {
      alert("Agent created successfully!");
      setAgentForm({ email: '', password: '' }); // Reset form
    }
  }, [createAgentSuccess]);

  return (
    <div className='text-gray-900'>
      <h2 className='text-2xl font-semibold text-orange-600'>Statistical Data</h2>

      

      {/* Statistics Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { icon: <IoPersonCircleOutline />, label: "Total Members", value: allAdminData?.totalActiveUser || 0 },
          { icon: <FaDice />, label: "Today Bets", value: allAdminData?.todayUser || 0 },
          { icon: <FaDice />, label: "Total Bets", value: allAdminData?.totalUserMoney || 0 },
          { icon: <FaRegFlag />, label: "Win Counts", value: allAdminData?.totalBetWin || 0 },
          { icon: <FaRegFlag />, label: "Wins", value: allAdminData?.totalBetWin || 0 },
          { icon: <GiFlyingFlag />, label: "Losses Count", value: allAdminData?.totalBetLoss || 0 },
          { icon: <GiFlyingFlag />, label: "Losses", value: allAdminData?.totalBetLoss || 0 },
          { icon: <MdBlock />, label: "Locked Account", value: allAdminData?.totalBlockUser || 0 },
          { icon: <FaCheck />, label: "Total Deposit", value: allAdminData?.totalRecharge || 0 },
          { icon: <FaCheck />, label: "Today Deposit", value: allAdminData?.todayRecharge || 0 },
          { icon: <BsBank2 />, label: "Total Withdrawals", value: allAdminData?.totalWithdrawal || 0 },
          { icon: <BsBank2 />, label: "Withdrawals Today", value: allAdminData?.todayWithdrawal || 0 },
          { icon: <FaScaleBalanced />, label: "Total P/L", value: (allAdminData?.totalRecharge || 0) - (allAdminData?.totalWithdrawal || 0) },
          { icon: <FaScaleBalanced />, label: "Today P/L", value: (allAdminData?.todayRecharge || 0) - (allAdminData?.todayWithdrawal || 0) },
          { icon: <FaScaleBalanced />, label: "Net Earning", value: (allAdminData?.totalRecharge || 0) - (allAdminData?.totalWithdrawal || 0) },
        ].map((item, index) => (
          <div key={index} className="p-4 rounded-lg flex gap-2 items-center bg-white shadow-md">
            <div className="text-4xl p-3 rounded text-orange-600">
              {item.icon}
            </div>
            <div className='flex flex-col gap-0'>
              <span className="text-lg font-semibold text-orange-600">{item.label}</span>
              <span className="text-xl font-bold text-orange-600">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Export Data Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-orange-600 mb-4">Export Data</h2>
        <ul className="space-y-2">
          {["Today Recharge", "Total Recharge", "Total Withdrawal", "Today Withdrawal", "Today Betting", "Total Betting"].map((label, index) => (
            <li key={index}>
              <button className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600">{label} Export</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Partner Account Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-orange-600 mb-4">Create Partner Account</h2>
        <form onSubmit={handleAgentSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-orange-600">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={agentForm.email}
              onChange={handleInputChange}
              className="mt-1 text-gray-900 bg-white block w-full border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-orange-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={agentForm.password}
              onChange={handleInputChange}
              className="mt-1 text-gray-900 bg-white block w-full border border-gray-400 rounded p-2 focus:outline-none focus:ring focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Initialize
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusnesMange;
