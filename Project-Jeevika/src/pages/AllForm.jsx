import { useState } from "react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Login from "../assets/Login.png";

export default function AuthPage() {
  const [formType, setFormType] = useState("hire");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 p-6">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Left Side - Form Section */}
        <div className="flex-1 flex flex-col justify-center p-12">
          <div className="flex justify-center gap-3 mb-6">
            {["hire", "employee", "team"].map((type) => (
              <button
                key={type}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                  formType === type
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFormType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
            {isSignUp ? "Sign Up" : "Login"} as {formType}
          </h2>

          <form className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <button
              type="submit"
              className="w-full p-3 text-white bg-blue-600 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="flex w-full items-center justify-center gap-2 p-3 border rounded-lg shadow-sm hover:bg-gray-100 transition">
            <FcGoogle size={24} /> Login with Google
          </button>

          <p className="mt-5 text-center text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        {/* Right Side - Image Section */}
        <div className="relative  flex-1 hidden md:flex items-center justify-center bg-blue-100 overflow-hidden rounded-r-2xl">
          <img
            src={Login}
            alt="Auth Illustration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
          <div className=" relative inset-0 bg-black bg-opacity-20 rounded-r-2xl"></div>
        </div>
      </div>
    </div>
  );
}
