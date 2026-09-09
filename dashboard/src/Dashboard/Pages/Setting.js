import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData, fetchAdminResult, increaseMoney } from '../utils/adminSlice';
import Swal from 'sweetalert2';

const Setting = () => {
  const dispatch = useDispatch();
  const {adminResultData } = useSelector((store) => store.admin);

  const [formData, setFormData] = useState({
    usdt2: '',
    usdt: '',
    telegram: '',
    usdt3: '',  
    usdtImg: '',  
    usdtImg2: '',  
    usdtImg3: '',  
  });

  const [moneyForm, setMoneyForm] = useState({
    userId: '',
    type: 'increase',
    money: ''
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMoneyChange = (e) => {
    const { name, value } = e.target;
    setMoneyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsSubmit = () => {
    dispatch(fetchAdminResult(formData))
      .unwrap()
      .then((res) => {
        Swal.fire("Success!", res.message || 'Settings updated successfully!', "success");
      })
      .catch((err) => {
        Swal.fire("Error!", err.message || 'Failed to update settings.', "error");
      });
  };

  const handleMoneySubmit = () => {
    if (!moneyForm.userId || !moneyForm.money) {
      return Swal.fire("Warning!", "Please fill in all money fields.", "warning");
    }

    dispatch(increaseMoney(moneyForm))
      .unwrap()
      .then((res) => {
        Swal.fire("Success!", res.message || "Money updated successfully.", "success");
        setMoneyForm({ userId: '', type: 'increase', money: '' }); // Reset form
      })
      .catch((err) => {
        Swal.fire("Error!", err.message || "Failed to update money.", "error");
      });
  };

// 1️⃣ Call API only once on component mount
useEffect(() => {
  dispatch(fetchAdminData());
}, [dispatch]);

// 2️⃣ Update formData only when adminResultData changes
useEffect(() => {
  if (adminResultData) {
    setFormData(prev => ({
      ...prev,
      usdt2: adminResultData.usdt2,
      usdt: adminResultData.usdt,
      telegram: adminResultData.telegram,
      usdt3: adminResultData.usdt3,
      usdtImg: adminResultData.usdtImg,
      usdtImg2: adminResultData.usdtImg2,
      usdtImg3: adminResultData.usdtImg3,
    }));
  }
}, [adminResultData]);

  

  return (
    <div className="container mx-auto text-[#FF9F00]">
      <h2 className="text-2xl font-bold bg-[#FF9F00] text-white py-3 px-4 rounded-md shadow-md text-center">
        Settings
      </h2>

      {/* Increase | Decrease Section */}
      <div className="bg-white w-full p-5 mt-6 rounded-lg shadow-lg border border-[#FF9F00]">
        <h3 className="text-center font-semibold text-[#FF9F00]">Increase | Decrease For Members</h3>
        <input
          type="number"
          name="userId"
          placeholder="Enter Account ID"
          value={moneyForm.userId}
          onChange={handleMoneyChange}
          className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full mt-3"
        />
        <select
          name="type"
          value={moneyForm.type}
          onChange={handleMoneyChange}
          className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full mt-3"
        >
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>
        <input
          type="number"
          name="money"
          placeholder="Amount"
          value={moneyForm.money}
          onChange={handleMoneyChange}
          className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full mt-3"
        />
        <button
          onClick={handleMoneySubmit}
          className="mt-4 px-6 py-2 bg-[#FF9F00] text-white rounded-md font-semibold hover:bg-orange-600 w-full"
        >
          Submit
        </button>
      </div>

      {/* Telegram & USD Section */}
      <div className="bg-white w-full p-5 mt-6 rounded-lg shadow-lg border border-[#FF9F00]">
        <h2 className="text-xl font-semibold text-[#FF9F00] text-center">Telegram & USD</h2>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            placeholder="Enter Telegram Link"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          <input
            type="text"
            name="usdt"
            value={formData.usdt}
            onChange={handleChange}
            placeholder="Enter USDT"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          <input
            type="text"
            name="usdt2"
            value={formData.usdt2}
            onChange={handleChange}
            placeholder="Enter USDT2"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          <input
            type="text"
            name="usdt3"
            value={formData.usdt3}
            onChange={handleChange}
            placeholder="Enter USDT3"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />

          <input
            type="text"
            name="usdtImg"
            value={formData.usdtImg}
            onChange={handleChange}
            placeholder="Enter USDT QR "
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          <input
            type="text"
            name="usdtImg2"
            value={formData.usdtImg2}
            onChange={handleChange}
            placeholder="Enter USDT QR 2"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          
          <input
            type="text"
            name="usdtImg3"
            value={formData.usdtImg3}
            onChange={handleChange}
            placeholder="Enter USDT QR 3"
            className="py-2 px-3 rounded-md border border-[#FF9F00] text-black w-full"
          />
          <button
            onClick={handleSettingsSubmit}
            className="mt-4 px-6 py-2 bg-[#FF9F00] text-white rounded-md font-semibold hover:bg-orange-600 w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
