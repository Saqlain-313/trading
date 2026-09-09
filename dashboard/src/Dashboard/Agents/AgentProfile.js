import React from 'react';

// Sample data for Withdrawal history
const withdrawalHistory = [
  { id: 1, amount: 200, bank: 'Bank A', status: 'Completed', time: '2024-08-09 14:22' },
  { id: 2, amount: 150, bank: 'Bank B', status: 'Pending', time: '2024-08-08 10:15' },
  { id: 3, amount: 300, bank: 'Bank C', status: 'Failed', time: '2024-08-07 16:40' },
];

// Sample data for Agent profile
const agentProfile = {
  name: 'Agent007',
  id: 'AGT12345',
  totalClients: 50,
  commissionEarned: 2000,
};

const Profile = () => {
  return (
    <div className="p-6 bg-white text-gray-900">
      <div className="flex flex-col md:flex-row gap-4 bg-orange-100 p-4 rounded-lg shadow-lg">
        {/* User Profile */}
        <div className="w-full md:w-1/3 p-4 bg-orange-200 rounded-lg">
          <div className="flex flex-col items-center mb-4">
            <img className="w-16 h-16 rounded-full bg-white p-1" src="https://ui-avatars.com/api/?name=👤&background=FFFFFF&color=FF9F00" alt="User Avatar" />
            <h2 className="text-xl font-bold text-orange-800 mt-2">Member64708</h2>
            <p className="text-gray-700">ID: 96116</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="flex justify-between border-b p-2"><span>Surplus:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b p-2"><span>Total Withdrawals:</span> <span>0.0</span></p>
            <p className="flex justify-between border-b p-2"><span>IP:</span> <span>130.131.313.340</span></p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white mt-4 p-2 rounded w-full">User Panel</button>
          </div>
        </div>
        
        {/* Agent Profile */}
        <div className="w-full md:w-1/3 p-4 bg-orange-300 rounded-lg">
          <h3 className="text-xl font-bold text-orange-900 text-center">Agent Profile</h3>
          <p className="flex justify-between border-b p-2"><span>Name:</span> <span>{agentProfile.name}</span></p>
          <p className="flex justify-between border-b p-2"><span>ID:</span> <span>{agentProfile.id}</span></p>
          <p className="flex justify-between border-b p-2"><span>Total Clients:</span> <span>{agentProfile.totalClients}</span></p>
          <p className="flex justify-between border-b p-2"><span>Commission Earned:</span> <span>${agentProfile.commissionEarned}</span></p>
          <button className="bg-orange-700 hover:bg-orange-800 text-white mt-4 p-2 rounded w-full">Agent Panel</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
