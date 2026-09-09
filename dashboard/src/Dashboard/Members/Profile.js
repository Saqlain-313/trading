import React, { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postUserInfo, getWithdrawalList, postUserBet, postUserRecharge } from '../utils/userSlice';



const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
   const [pageno, setPage] = useState(1);
    const [pageto, setPageto] = useState(10);
  


  const { userInfo, loading, error, withdrawalList, userbet, rechargeList } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(postUserInfo(userId));
    dispatch(getWithdrawalList());
    dispatch(postUserRecharge({ userId, pageno, pageto })); // Pass pageno and pageto
    dispatch(postUserBet(userId));
  }, [dispatch, userId, pageno, pageto]);


  console.log("postUserRecharge",postUserRecharge);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">No user data found</div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-white text-[#FF9F00]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - User Profile */}
        <div className="w-full md:w-1/3 p-4 bg-[#FF9F00] text-white rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white text-orange-500 rounded-full p-2">
              <MdPerson className="text-3xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{userInfo.name || `Member${userInfo.userId}`}</h2>
              <p className="text-sm">ID: {userInfo.userId}</p>
              <p className="text-sm">Mobile: {userInfo.phone || 'Not available'}</p>
            </div>
          </div>

          <div className="bg-white text-[#FF9F00] p-4 rounded-lg shadow-md">
            <p className="flex justify-between border-b p-2">
              <span className="font-medium">Balance:</span>
              <span className="font-bold">₹{userInfo.money || '0.0'}</span>
            </p>
            <p className="flex justify-between border-b p-2">
              <span>Total Recharge:</span>
              <span>₹{rechargeList.reduce((acc, item) => acc + item.amount, 0) || '0.0'}</span>
            </p>
            <p className="flex justify-between border-b p-2">
              <span>Total Withdrawals:</span>
              <span>₹{withdrawalList.reduce((acc, item) => acc + item.amount, 0) || '0.0'}</span>
            </p>
            <p className="flex justify-between border-b p-2">
              <span>Referral Code:</span>
              <span className="font-mono">{userInfo.referCode || 'None'}</span>
            </p>
            <p className="flex justify-between border-b p-2">
              <span>Referred By:</span>
              <span>{userInfo.referBy || 'None'}</span>
            </p>
            <p className="flex justify-between border-b p-2">
              <span>Status:</span>
              <span className={`font-semibold ${userInfo.status === 1 ? 'text-green-600' : 'text-red-600'}`}>
                {userInfo.status === 1 ? "Active" : "Inactive"}
              </span>
            </p>
            <button className={`mt-4 p-2 rounded w-full text-white font-semibold transition ${
              userInfo.role === null ? "bg-[#D97706] hover:bg-[#B45309]" : "bg-purple-600 hover:bg-purple-700"
            }`}>
              {userInfo.role === null ? "USER" : "ADMIN"}
            </button>
          </div>
        </div>

        {/* Right Section - User Activity */}
        <div className="flex flex-col w-full space-y-6">
          {/* Withdrawal History */}
          <div className="bg-[#FF9F00] text-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-center mb-4">Withdrawal History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-[#FF9F00] rounded-md">
                <thead>
                  <tr className="bg-[#FF9F00] text-white">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Bank</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalList.length > 0 ? (
                    withdrawalList.map((item) => (
                      <tr key={item.id} className="border-b border-orange-100 hover:bg-orange-50">
                        <td className="p-3">{item.id}</td>
                        <td className="p-3">₹{item.amount}</td>
                        <td className="p-3">{item.bank}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">{item.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        No withdrawal records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recharge History */}
          <div className="bg-[#FF9F00] text-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-center mb-4">Recharge History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-[#FF9F00] rounded-md">
                <thead>
                  <tr className="bg-[#FF9F00] text-white">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {rechargeList?.length > 0 ? (
                    rechargeList.map((item, index) => (
                      <tr key={index} className="border-b border-orange-100 hover:bg-orange-50">
                        <td className="p-3">{item.id}</td>
                        <td className="p-3">₹{item.amount}</td>
                        <td className="p-3 font-mono">{item.code}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">{item.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        No recharge records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bet History */}
          <div className="bg-[#FF9F00] text-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-center mb-4">Bet History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-[#FF9F00] rounded-md">
                <thead>
                  <tr className="bg-[#FF9F00] text-white">
                    <th className="p-3 text-left">Periods</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userbet?.length > 0 ? (
                    userbet.map((item, index) => (
                      <tr key={index} className="border-b border-orange-100 hover:bg-orange-50">
                        <td className="p-3">{item.periods}</td>
                        <td className="p-3">₹{item.amount}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.type === 'Win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3">{item.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        No bet records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;