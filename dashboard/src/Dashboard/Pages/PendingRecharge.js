import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getPendingRecharge } from "../utils/userSlice";
import { approveRecharge } from "../utils/adminSlice";


const initialData = [
  { id: 1, account: "John Doe", type: "Recharge", amount: "$50", utrNo: "UTR123456", time: "2023-10-01 10:00", orderId: "ORD001", status: "Pending" },
  { id: 2, account: "Jane Smith", type: "Recharge", amount: "$75", utrNo: "UTR654321", time: "2023-10-01 11:00", orderId: "ORD002", status: "Approved" },
  { id: 3, account: "Alice Johnson", type: "Recharge", amount: "$100", utrNo: "UTR789012", time: "2023-10-01 12:00", orderId: "ORD003", status: "Pending" },
  { id: 4, account: "Bob Brown", type: "Recharge", amount: "$200", utrNo: "UTR345678", time: "2023-10-01 13:00", orderId: "ORD004", status: "Rejected" },
  { id: 5, account: "Charlie Davis", type: "Recharge", amount: "$150", utrNo: "UTR901234", time: "2023-10-01 14:00", orderId: "ORD005", status: "Pending" },
];



const PendingRecharge = () => {
  const [searchData, setSearchData] = useState("");
  const [tableData, setTableData] = useState(initialData);
 const dispatch = useDispatch();
 const [pageno, setPage] = useState(1);
 const [pageto, setPageto] = useState(10);



 const { pendingRecharge,approveRechargeSuccess } = useSelector((store) => store.user);

 
  useEffect(() => {
     dispatch(getPendingRecharge({ pageno, pageto }));
   }, [pageno, pageto, dispatch]);
 

   const handleApprove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to approve this recharge?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      });
  
      if (result.isConfirmed) {
        await dispatch(approveRecharge({ orderId: id, status: 1 })).unwrap(); // Ensure Redux action completes
        Swal.fire("Approved!", "The recharge has been approved successfully.", "success");
        dispatch(getPendingRecharge({ pageno, pageto }));
      }
    } catch (error) {
      console.error("Error approving recharge:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff9933",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        await dispatch(approveRecharge({ orderId: id, status: 2 })).unwrap(); // Ensure Redux action completes
        Swal.fire("Deleted!", "The record has been deleted successfully.", "success");
        dispatch(getPendingRecharge({ pageno, pageto }));
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };
  

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Header Section */}
      <h2 className="text-2xl font-semibold p-4 text-white bg-[#ff9933] rounded-md text-center shadow-md">
        Pending Recharge
      </h2>

      <div className="mb-4 mt-10">
        <input
          type="text"
          placeholder="Enter Phone Number to search"
          className="w-full p-2 rounded border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white p-4 rounded-md mt-4 shadow-lg border border-[#ff9933]">
        <table className="min-w-full border border-[#ff9933] text-black">
          <thead>
            <tr className="bg-[#ff9933] text-white">
              {["#", "User ID", "Type", "Amount", "UTR No", "Time", "Order ID", "Status", "Action"].map((heading, index) => (
                <th key={index} className="border border-white px-4 py-3 text-center font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pendingRecharge?.map((data, index) => (
              <tr key={data.id} className="hover:bg-[#ffe5cc] transition-all">
                <td className="border border-[#ff9933] px-4 py-3 text-center">{index + 1}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.userId}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.type}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.amount}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.utrNo}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.date}</td>
                <td className="border border-[#ff9933] px-4 py-3 text-center">{data.orderId}</td>
                <td
                  className={`border border-[#ff9933] px-4 py-3 text-center font-semibold ${
                    data.status === "Approved"
                      ? "text-green-500"
                      : data.status === "Rejected"
                      ? "text-red-500"
                      : "text-[#ff9933]"
                  }`}
                >
                  {data.status}
                </td>
                
                                <td className="border border-[#ff9933] px-4 py-3 flex justify-center gap-2">
                                  {data.status === 0 && (
                                    <button
                                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center justify-center w-8 h-8 transition-all"
                                      onClick={() => handleApprove(data.orderId)}
                                    >
                                      <AiOutlineCheck size={18} />
                                    </button>
                                  )}
                                  <button
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center justify-center w-8 h-8 transition-all"
                                    onClick={() => handleDelete(data.orderId)}
                                  >
                                    <AiOutlineDelete size={18} />
                                  </button>
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRecharge;
