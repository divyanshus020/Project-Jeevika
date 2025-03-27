import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, useSearchParams  } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { resetPassword } from "../utils/api"; // API function

const ResetPassword = () => {
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // Extract the query parameters directly using searchParams.get
  const token = searchParams.get('token');
  const userType = searchParams.get('usertype');

  useEffect(() => {
    if (!token || !userType) {
      console.error("Required query parameters are missing!");
    }
  }, [token, userType]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const postData={
         password:values.newPassword, userType:userType 
      };
      console.log("Resetting password with:",postData);
  
      const response = await resetPassword(token,postData);

      console.log("Response from API:", response);

      if (response?.data?.success) {
        message.success("Password reset successfully! Redirecting to login...");
        navigate("/login"); // Redirect to login page
      } else {
        message.error(response?.data?.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // if (!token) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
  //       <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
  //         <h2 className="text-2xl font-bold text-red-600">Invalid Reset Link</h2>
  //         <p className="text-gray-600 mt-2">Please request a new password reset link.</p>
  //         <Button type="primary" className="mt-4" onClick={() => navigate("/")}>
  //           Go to Home
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {/* {userRole && <p className="text-center text-gray-600 mb-4">Role: {userRole}</p>} */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
