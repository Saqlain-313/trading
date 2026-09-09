import React, { useEffect, useState } from 'react';

import {  useDispatch, useSelector } from 'react-redux';
import { MdContentCopy } from "react-icons/md";
import { createPromocode, getPromocode } from '../utils/promoCodeSlice';
import Swal from 'sweetalert2';

const giftcodeData = [
  { id: "QHVX6VN9KM3E4MK", creator: "8437335082", amount: "1.000", status: "not used yet", time: "2024/05/21 - 19:06:31" },
  { id: "DSSWJLIUYF9N9X0DL", creator: "8437335082", amount: "500", status: "not used yet", time: "2024/05/24 - 04:55:40" },
  { id: "1NQERQU7ROUQOCZN", creator: "8437335082", amount: "50", status: "not used yet", time: "2024/05/26 - 10:11:15" },
  { id: "XVSJMRU6UOSA3ISJ", creator: "8437335082", amount: "1.300", status: "not used yet", time: "2024/06/18 - 09:20:00" },
  { id: "TEZ72TKYG1TYCE7V", creator: "8437335082", amount: "20", status: "not used yet", time: "2024/06/18 - 09:26:48" },
  { id: "0YVBH2ICLZ8HN4L1", creator: "8437335082", amount: "20", status: "not used yet", time: "2024/06/18 - 09:26:57" },
  { id: "20240711SNR36N9U7ENPDZ", creator: "997001616", amount: "10", status: "not used yet", time: "2024/07/11 - 06:11:03" },
];



const GiftCode = () => {
   const[code , setCode]  = useState();
   const[percent , setPercent] = useState();
   const[recharge , setRecharge]   =  useState();
 const dispatch=useDispatch()

   const token = localStorage.getItem("token");
  const {promocodeData}=useSelector((state)=>state.promo)



   const  submitgiftcodeData = async()=>{
   
  await dispatch(createPromocode({code:code,percent:percent,deposit:recharge})).then((res)=>{

  if(res.payload.success){
            Swal.fire("Approved!", res.payload.message, "success");
  }else{
     Swal.fire("Error!", res.payload.message, "error");
  }
})
   }
   const copyToClipCode = (data) => {
    navigator.clipboard.writeText(data).then(() => {
      Swal.fire("Approved!", "Promo code copy successfully", "success");
    }).catch(err => {
      console.error('Failed to copy the text: ', err);
      });
     }

   useEffect(()=>{
    dispatch(getPromocode())
   },[])
   
   if(giftcodeData === null)
   {
       return <div>Loading...</div>
   }
   
  return (
    <div className="container mx-auto text-[#FF9F00]">
      <h2 className="text-2xl font-bold bg-[#FF9F00] text-white py-3 px-4 rounded-md shadow-md text-center">
        Giftcode Management
      </h2>

      {/* Form Section */}
      <div className="bg-white w-full p-5 mt-4 rounded-lg shadow-lg border border-[#FF9F00]">
        <div className="flex flex-col gap-3">
          <label className="font-semibold text-[#FF9F00]">Promo Code </label>
          <input
            type="text"
            placeholder="Enter Write code"
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
          />
          <label className="font-semibold text-[#FF9F00]">Promo Code Amount</label>
          <input
            type="number"
            placeholder="Enter percent"
            value={percent}
            onChange={(e)=>setPercent(e.target.value)}
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
          />

          <label className="font-semibold text-[#FF9F00]">Recharge</label>
          <input
            type="number"
            placeholder="Enter deposit"
            value={recharge}
            onChange={(e)=>setRecharge(e.target.value)}
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF9F00]"
             />

          
        </div>
        <button className="mt-4 px-6 py-2 bg-[#FF9F00] text-white rounded-md font-semibold hover:bg-orange-600 transition shadow-md"  onClick={submitgiftcodeData}>
          Submit
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white mt-10 rounded-lg border border-[#FF9F00] shadow-lg">
        <h3 className="text-white bg-[#FF9F00] py-3 px-4 text-lg font-semibold rounded-t-lg">
          Promo Code
        </h3>
        <table className="min-w-full border border-[#FF9F00] rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#FF9F00] text-white">
              <th className="py-3 px-5 border-b text-left">ID</th>
              <th className="py-3 px-5 border-b text-left">code</th>
              <th className="py-3 px-5 border-b text-left">Amount</th>
              <th className="py-3 px-5 border-b text-left">percent</th>
              <th className="py-3 px-5 border-b text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {promocodeData?.length > 0 ? (
              promocodeData?.map((item, index) => (
                <tr key={index} className="text-black border-b hover:bg-orange-100 transition">
                  <td className="py-3 px-5">{item.id}</td>
                  <td className="py-3 px-5 flex items-center gap-2 ">{item.code} <MdContentCopy onClick={()=>copyToClipCode(item.code)}  className='cursor-pointer'/></td>
                  <td className="py-3 px-5">₹{item.deposit}</td>
                  <td className="py-3 px-5">{item.percent}%</td>
                  <td className="py-3 px-5">{item.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">
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

export default GiftCode;
