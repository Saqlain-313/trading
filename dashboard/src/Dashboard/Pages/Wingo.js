


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPendingBetList, fetchAdminResult } from "../utils/adminSlice";
import Swal from 'sweetalert2';


const Wingo = () => {
  const dispatch = useDispatch();
  const [pageno, setPageno] = useState(1);
  const [formData, setFormData] = useState({
    result: '',
  });

  const [enabled, setEnabled] = useState(false);
 
  const pageto = 10;
  const { 
    PendingBetList, 
    totalMoneyDown, 
    totalMoneyUp, 
    totalMoney, 
    totalBets,
    loading ,
    control
  } = useSelector((store) => store.admin);

    const handleChange = (e) => {
      const { name, value } = e.target;
   
      // Allow only digits 0-9
      if (name === "result" && !/^[0-9]*$/.test(value)) {
        return; // ignore input if it’s not a digit
      }
    
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
       

    const handleSettingsSubmit = (e) => {
      e.preventDefault(); 
    
      const { result } = formData;
    
      if (!/^[0-9]$/.test(result)) {
        Swal.fire("Invalid Input", "Please enter a single digit between 0 and 9.", "warning");
        return;
      }
    
      dispatch(fetchAdminResult(formData))
        .unwrap()
        .then((res) => {
          Swal.fire("Success!", res.message || 'Settings updated successfully!', "success");
        })
        .catch((err) => {
          Swal.fire("Error!", err.message || 'Failed to update settings.', "error");
        });
    };


    const handleChangetoggle = async () => {
      try {
        const newControlStatus = !enabled;
    
        const payload = {
          control: newControlStatus ? 'Random' : 'Control',
          result: newControlStatus ? -2 : -1,
        };
    
        // Call Redux action with correct control + result values
        await dispatch(fetchAdminResult(payload)).unwrap();
    
        // Update local toggle state
        setEnabled(newControlStatus);
    
        Swal.fire("Success!", `Mode changed to ${payload.control}`, "success");
      } catch (err) {
        Swal.fire("Error!", err.message || 'Failed to update control status', "error");
      }
    };
    

  
   
    useEffect(() => {
      setEnabled(control || false);
    }, [control]);



  useEffect(() => {
    // const socket = new WebSocket('wss://trading.codehello.site');
    const socket = new WebSocket("ws://localhost:4000");
    

    socket.onopen = () => {
      dispatch(getPendingBetList({ pageno, pageto }));
      console.log("✅ WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === "betDataUpdated") {
        dispatch(getPendingBetList({ pageno, pageto }));
      }
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected");
    };

    return () => socket.close();
  }, [pageno, dispatch]);



  const betData = PendingBetList?.data || [];

  

  const stats = [
    { id: 1, title: "UP BETS", value: `₹${totalMoneyUp}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
    { id: 2, title: "DOWN BETS", value: `₹${totalMoneyDown}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
    { id: 3, title: "TOTAL VOLUME", value: `₹${totalMoney}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
    
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Trade Dashboard</h1>
          <p className="text-gray-600">Monitor and manage all Trade activities</p>
        </div>
        
        <form  className="mt-4 md:mt-0 flex gap-2">
         
          <input
            type="text"
            name="result"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            
            value={formData.result}
            onChange={handleChange}
            placeholder="Enter Trade Result"
            
          />
          <button 
            type="submit"
            onClick={handleSettingsSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
           Submit
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className={`${stat.bg} rounded-xl shadow-lg overflow-hidden text-white`}>
            <div className="p-6">
              <p className="text-sm font-medium opacity-80">{stat.title}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          </div>
        ))}

<div className="flex items-center gap-4">
      {/* Toggle Section - Fixed */}
      <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-4">
      {/* Toggle Button */}
      <div
        onClick={handleChangetoggle}
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          enabled ? 'bg-orange-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </div>

      {/* Label */}
      <div
        className={`px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300 ${
          enabled ? 'bg-orange-600' : 'bg-gray-500'
        }`}
      >
        {enabled ? 'Random' : 'Control'}
      </div>
    </div>

     
    </div>
      </div>

     



      {/* Betting Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Pending Bets</h2>
          <span className="text-sm text-gray-500">{betData.length} records</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {betData.length > 0 ? (
                betData.map((bet, index) => (
                  <tr key={index} className="hover:bg-orange-500 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bet.orderId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.userId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-semibold">₹{bet.amount || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bet.bet === 'UP' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {bet.bet || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.tradeType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        bet.status === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {bet.status === 0 ? "Pending" : "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bet.time ? new Date(bet.time).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No pending bets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPageno(pageno - 1)}
              disabled={pageno === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPageno(pageno + 1)}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{pageno}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPageno(pageno - 1)}
                  disabled={pageno === 1}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    pageno === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPageno(pageno + 1)}
                  className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wingo;





// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPendingBetList, fetchAdminResult, updateControlStatus } from "../utils/adminSlice";
// import Swal from 'sweetalert2';

// const Wingo = () => {
//   const dispatch = useDispatch();
//   const [pageno, setPageno] = useState(1);
//   const [formData, setFormData] = useState({
//     result: '',
//   });
  
//   const pageto = 10;

//   const { 
//     PendingBetList, 
//     totalMoneyDown, 
//     totalMoneyUp, 
//     totalMoney, 
//     totalBets,
//     loading,
//     control // assuming this comes from your Redux store
//   } = useSelector((store) => store.admin);

//   const [enabled, setEnabled] = useState(control || false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Allow only digits 0-9
//     if (name === "result" && !/^[0-9]*$/.test(value)) {
//       return; // ignore input if it's not a digit
//     }
  
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSettingsSubmit = (e) => {
//     e.preventDefault(); 
  
//     const { result } = formData;
  
//     if (!/^[0-9]$/.test(result)) {
//       Swal.fire("Invalid Input", "Please enter a single digit between 0 and 9.", "warning");
//       return;
//     }
  
//     dispatch(fetchAdminResult(formData))
//       .unwrap()
//       .then((res) => {
//         Swal.fire("Success!", res.message || 'Settings updated successfully!', "success");
//       })
//       .catch((err) => {
//         Swal.fire("Error!", err.message || 'Failed to update settings.', "error");
//       });
//   };
  
//   const handleChangetoggle = async () => {
//     try {
//       const newControlStatus = !enabled;
//       await dispatch(updateControlStatus(newControlStatus)).unwrap();
//       setEnabled(newControlStatus);
//       Swal.fire("Success!", `Mode changed to ${newControlStatus ? 'Random' : 'Control'}`, "success");
//     } catch (err) {
//       Swal.fire("Error!", err.message || 'Failed to update control status', "error");
//     }
//   };

//   useEffect(() => {
//     dispatch(getPendingBetList({ pageno, pageto }));
//   }, [pageno, dispatch]);

//   // Sync local state with Redux state when control changes
//   useEffect(() => {
//     setEnabled(control || false);
//   }, [control]);

//   const betData = PendingBetList?.data || [];
  
//   const stats = [
//     { id: 1, title: "UP BETS", value: `₹${totalMoneyUp}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
//     { id: 2, title: "DOWN BETS", value: `₹${totalMoneyDown}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
//     { id: 3, title: "TOTAL VOLUME", value: `₹${totalMoney}`, bg: "bg-gradient-to-r from-orange-400 to-orange-600" },
//   ];

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       {/* Header and other components remain the same until the toggle section */}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat) => (
//           <div key={stat.id} className={`${stat.bg} rounded-xl shadow-lg overflow-hidden text-white`}>
//             <div className="p-6">
//               <p className="text-sm font-medium opacity-80">{stat.title}</p>
//               <p className="text-2xl font-bold mt-2">{stat.value}</p>
//             </div>
//           </div>
//         ))}

//         {/* Toggle Section - Fixed */}
//         <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-4">
//           <div
//             onClick={handleChangetoggle}
//             className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
//               enabled ? 'bg-orange-600' : 'bg-gray-300'
//             }`}
//           >
//             <div
//               className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
//                 enabled ? 'translate-x-6' : 'translate-x-0'
//               }`}
//             />
//           </div>

//           <div
//             className={`px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all duration-300 ${
//               enabled ? 'bg-orange-600' : 'bg-gray-500'
//             }`}
//           >
//             {enabled ? 'Random' : 'Control'}
//           </div>
//         </div>
//       </div>

//       {/* Rest of the component remains the same */}

      

      
//     </div>
//   );
// };

// export default Wingo;