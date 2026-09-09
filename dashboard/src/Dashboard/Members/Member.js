// import React, { useEffect, useState } from "react";
// import { FaUser, FaLock } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { getAllUser } from "../utils/userSlice";
// import { blockUser } from "../utils/adminSlice";

// const Member = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const dispatch = useDispatch();

//   const { allUsers } = useSelector((store) => store.user);
//   const { blockUserSuccess } = useSelector((store) => store.admin);

//   useEffect(() => {
//     dispatch(getAllUser());
//   }, [dispatch]);



//   const handleLockClick = async (userId,status) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "Do you want to block this user?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#ff9933",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, block it!",
//       });

//       if (result.isConfirmed) {
//         await dispatch(blockUser( {userId, status} )).unwrap();
//         Swal.fire("Blocked!", "The user has been blocked successfully.", "success");
//         dispatch(getAllUser()); // Refresh user list
//       }
//     } catch (error) {
//       console.error("Error blocking user:", error);
//       Swal.fire("Error!", "Something went wrong. Please try again.", "error");
//     }
//   };

//   if (!allUsers) return <div>Loading...</div>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold text-orange-600 mb-6">Member List</h2>

//       <input
//         type="text"
//         placeholder="Search for a member"
//         className="border focus:outline-none border-orange-400 p-3 rounded-md bg-white focus:ring focus:ring-orange-500 text-gray-700 w-full"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
//         <table className="min-w-full bg-orange-100 border border-orange-300 rounded-lg">
//           <thead>
//             <tr className="bg-orange-500 text-white">
//               <th className="py-2 border border-orange-300">S no.</th>
//               <th className="py-2 border border-orange-300">User ID</th>
//               <th className="py-2 border border-orange-300">Position</th>
//               <th className="py-2 border border-orange-300">Amount</th>
//               <th className="py-2 border border-orange-300">Password</th>
//               <th className="py-2 border border-orange-300">Status</th>
//               <th className="py-2 border border-orange-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allUsers.map((item, index) => (
//               <tr key={item.userId} className="text-center text-orange-700">
//                 <td className="py-2 border border-orange-300">{index + 1}</td>
//                 <td className="py-2 border border-orange-300">{item.userId}</td>
//                 <td className="py-2 border border-orange-300">{item.role === "ADMIN" ? "ADMIN" : "USER"}</td>
//                 <td className="py-2 border border-orange-300">{item.money}</td>
//                 <td className="py-2 border border-orange-300">{item.password ? "123456" : "null"}</td>
//                 <td className="py-2 border border-orange-300">
//                   <span className={`px-2 py-1 rounded ${item.status === "1" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
//                     {item.status === "1" ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//                 <td className="py-2 border border-orange-300 flex justify-center space-x-2">
//                   <Link to={`/profile/${item.userId}`}>
//                     <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
//                       <FaUser className="mr-1" /> Profile
//                     </button>
//                   </Link>
//                  {item.status===0?(
//                    <button
//                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
//                    onClick={() => handleLockClick(item.userId,2)}
//                  >
//                    <FaLock className="mr-1" /> Lock
//                  </button>
//                  ):(
//                   <button
//                   className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
//                   onClick={() => handleLockClick(item.userId,0)}
//                 >
//                   <FaLock className="mr-1" /> Unblock
//                 </button>
//                  )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         <button
//           className={`px-4 py-2 mx-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#FF9F00] text-white"}`}
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="px-4 py-2">{currentPage}</span>
       
//         <button
       
    
//        className={`px-4 py-2 mx-2 border rounded ${allUsers.length < 10 ? "opacity-50 cursor-not-allowed" : "bg-[#FF9F00] text-white"}`}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Member;


import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllUser } from "../utils/userSlice";
import { blockUser } from "../utils/adminSlice";

const Member = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  const { allUsers } = useSelector((store) => store.user);
  const { blockUserSuccess } = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleLockClick = async (userId, status) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to block this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block it!",
      });

      if (result.isConfirmed) {
        await dispatch(blockUser({ userId, status })).unwrap();
        Swal.fire("Blocked!", "The user has been blocked successfully.", "success");
        dispatch(getAllUser()); // Refresh user list
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  if (!allUsers) return <div>Loading...</div>;

  // Filtered data based on search
  const filteredUsers = allUsers.filter((user) =>
    String(user.userId).toLowerCase().includes(searchTerm.toLowerCase())

  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-orange-600 mb-6">Member List</h2>

      <input
        type="text"
        placeholder="Search for a member"
        className="border focus:outline-none border-orange-400 p-3 rounded-md bg-white focus:ring focus:ring-orange-500 text-gray-700 w-full"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to page 1 when search changes
        }}
      />

      <div className="overflow-x-auto mt-6 rounded-lg shadow-md">
        <table className="min-w-full bg-orange-100 border border-orange-300 rounded-lg">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="py-2 border border-orange-300">S no.</th>
              <th className="py-2 border border-orange-300">User ID</th>
              <th className="py-2 border border-orange-300">Position</th>
              <th className="py-2 border border-orange-300">Amount</th>
              <th className="py-2 border border-orange-300">Password</th>
              <th className="py-2 border border-orange-300">Status</th>
              <th className="py-2 border border-orange-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item, index) => (
              <tr key={item.userId} className="text-center text-orange-700">
                <td className="py-2 border border-orange-300">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 border border-orange-300">{item.userId}</td>
                <td className="py-2 border border-orange-300">
                  {item.role === "ADMIN" ? "ADMIN" : "USER"}
                </td>
                <td className="py-2 border border-orange-300">{item.money}</td>
                <td className="py-2 border border-orange-300">
                  {item.password ? "123456" : "null"}
                </td>
                <td className="py-2 border border-orange-300">
                  <span
                    className={`px-2 py-1 rounded ${
                      item.status === "1"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.status === "1" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-2 border border-orange-300 flex justify-center space-x-2">
                  <Link to={`/profile/${item.userId}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                      <FaUser className="mr-1" /> Profile
                    </button>
                  </Link>
                  {item.status === 0 ? (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => handleLockClick(item.userId, 2)}
                    >
                      <FaLock className="mr-1" /> Lock
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                      onClick={() => handleLockClick(item.userId, 0)}
                    >
                      <FaLock className="mr-1" /> Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-[#FF9F00] text-white"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 font-medium text-orange-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage >= totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-[#FF9F00] text-white"
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Member;
