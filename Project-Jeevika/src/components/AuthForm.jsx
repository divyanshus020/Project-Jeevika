import { useState } from "react";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import { registerUser, loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ isSignUp }) {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = isSignUp ? await registerUser(formData) : await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-5">
        {isSignUp ? "Sign Up" : "Login"}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 p-3 border rounded-md">
        <FcGoogle size={24} /> Login with Google
      </button>
    </div>
  );
}
