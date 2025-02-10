import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import InputField from "../components/InputField";
import { registerUser } from "../utils/api";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
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
    
        if (!formData.role) {
            setError("Please select a role.");
            setLoading(false);
            return;
        }
    
        console.log("Sending Data:", formData); // Debugging: Check if role is included
    
        try {
            const res = await registerUser(formData);
            console.log("Response:", res.data); // Debugging: Check backend response
    
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    
        setLoading(false);
    };
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-5">Sign Up</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={FiUser}
                        error={error && !formData.name}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={FiMail}
                        error={error && !formData.email}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        icon={FiLock}
                        error={error && !formData.password}
                    />

                    {/* Role Selection Dropdown */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">Select Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select Role --</option>
                            <option value="hire">Hire</option>
                            <option value="employee">Employee</option>
                            <option value="team">Team</option>
                        </select>
                        {error && !formData.role && <p className="text-red-500 text-sm mt-1">Please select a role.</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button className="flex w-full items-center justify-center gap-2 p-3 border rounded-md">
                    <FcGoogle size={24} /> Sign up with Google
                </button>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
