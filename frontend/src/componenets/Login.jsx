import React, { useState } from "react";
import { url } from "../context/PlayerContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [resetEmail, setResetEmail] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordReset = () => {
    if (!resetEmail) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Password reset link sent to your email.");
    setIsReset(false);
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        toast.success("Signed in successfully!");
        localStorage.setItem("token", res.data.token);
        onLoginSuccess?.();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        toast.success("Account created! Please Verify and Sign In.");
        setIsSignUp(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-gray-800 px-10 py-8 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">
          {isSignUp ? "Sign Up" : isReset ? "Reset Password" : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {isSignUp
            ? "Create a new account"
            : isReset
              ? "Enter your email to reset password"
              : "Please enter your credentials"}
        </p>

        {isSignUp && (
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
        )}

        {!isReset && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </>
        )}

        {isReset && (
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Email to reset password"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isReset ? (
            <>
              <button
                onClick={handlePasswordReset}
                className="bg-orange-500 py-2 rounded text-white font-semibold"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setIsReset(false)}
                className="text-orange-400 text-sm underline"
              >
                Back to Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={isSignUp ? handleSignUp : handleSignIn}
                className="bg-orange-500 py-2 rounded text-white font-semibold"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>

              {!isSignUp && (
                <button
                  onClick={() => setIsReset(true)}
                  className="text-sm text-orange-400 underline"
                >
                  Forgot password?
                </button>
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setIsReset(false);
            }}
            className="text-orange-400 underline ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
