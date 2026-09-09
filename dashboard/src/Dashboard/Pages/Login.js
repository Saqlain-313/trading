import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUser, loginUser, SendOtp } from "../utils/adminSlice"
import Modal from 'react-modal'; // or any other modal library you prefer

export default function LoginPage() {
    const { userInfo } = useSelector(
        (state) => state.admin
      );
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [otp, setOtp] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  const validateForm = () => {
    // Reset errors
    setErrors({ email: "", password: "" })

    // Simple validation
    let hasError = false
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
      hasError = true
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      hasError = true
    }

    if (!password) {
      newErrors.password = "Password is required"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return false
    }
    
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    dispatch(SendOtp({email: email}));

    // Show OTP modal instead of directly calling login API
    setShowOtpModal(true)
  }

  const handleOtpSubmit = () => {
    if (!otp || otp.length < 4) { // Assuming OTP is 4 digits
      alert("Please enter a valid OTP")
      return
    }

    setIsLoading(true)
    
    dispatch(loginUser({ email, password, otp })).then((res) => {
      setIsLoading(false)
      if (res?.payload?.success) {
        dispatch(getUser());
        alert(res.payload.message);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else {
        alert(res.payload.message);
      }
      setShowOtpModal(false)
    }).catch(() => {
      setIsLoading(false)
      setShowOtpModal(false)
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      <Modal
        isOpen={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
        contentLabel="OTP Verification"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">OTP Verification</h2>
          <p className="mb-4">Please enter the OTP sent to your email</p>
          
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            maxLength={6} // Assuming 6-digit OTP
          />
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowOtpModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleOtpSubmit}
              className="px-4 py-2 bg-gray-600 text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}