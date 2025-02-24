import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { UserOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, SolutionOutlined } from "@ant-design/icons";
import { submitWorkerProfile } from "../utils/api";

const { Option } = Select;

const WorkerProfilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation

  // Form Submission Handler
  const handleSubmit = async (values) => {
    console.log("📝 Form Submitted Values:", values);
    setLoading(true);

    try {
      const response = await submitWorkerProfile(values);
      console.log("✅ API Response:", response);
      message.success("Form submitted successfully!");
      form.resetFields();
      navigate("/dashboard"); // Redirect to Dashboard after submission
    } catch (error) {
      console.error("❌ API Error:", error);
      message.error("Failed to submit the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4">Worker Profile Form</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: "",
            gender: "",
            dob: null,
            mobile: "",
            aadhar: "",
            workCategory: "",
            experience: "",
            expectedSalary: "",
            workType: "",
            currentCity: "",
            pincode: "",
          }}
        >
          {/* Full Name */}
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Enter your name" prefix={<UserOutlined />} />
          </Form.Item>

          {/* Gender */}
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          {/* Date of Birth */}
          <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please select your date of birth" }]}>
            <DatePicker className="w-full" placeholder="Select DOB" />
          </Form.Item>

          {/* Mobile Number */}
          <Form.Item
            label="mobile"
            name="mobile"
            rules={[{ required: true, message: "Please enter your mobile number" }]}
          >
            <Input placeholder="Enter your mobile number" prefix={<UserOutlined />} />
          </Form.Item>


          {/* Aadhar Card Number */}
          <Form.Item
            label="Aadhar Card Number"
            name="aadhar"
            rules={[{ pattern: /^\d{12}$/, message: "Invalid Aadhar number" }]}
          >
            <Input placeholder="Enter your Aadhar number" prefix={<IdcardOutlined />} />
          </Form.Item>

          {/* Work Category */}
          <Form.Item label="Work Category" name="workCategory" rules={[{ required: true, message: "Please select a work category" }]}>
            <Select placeholder="Select Work Category">
              <Option value="plumber">Plumber</Option>
              <Option value="electrician">Electrician</Option>
              <Option value="driver">Driver</Option>
              <Option value="carpenter">Carpenter</Option>
            </Select>
          </Form.Item>

          {/* Experience Level */}
          <Form.Item label="Experience Level" name="experience" rules={[{ required: true, message: "Please select experience level" }]}>
            <Select placeholder="Select Experience Level">
              <Option value="fresher">Fresher</Option>
              <Option value="1-3 years">1-3 Years</Option>
              <Option value="3-5 years">3-5 Years</Option>
              <Option value="5+ years">5+ Years</Option>
            </Select>
          </Form.Item>

          {/* Expected Salary */}
          <Form.Item label="Expected Salary (₹)" name="expectedSalary" rules={[{ required: true, message: "Please enter expected salary" }]}>
            <Input placeholder="Enter expected salary" prefix={<SolutionOutlined />} />
          </Form.Item>

          {/* Current City */}
          <Form.Item label="Current City" name="currentCity" rules={[{ required: true, message: "Please enter your city" }]}>
            <Input placeholder="Enter your city" prefix={<HomeOutlined />} />
          </Form.Item>

          {/* Pincode */}
          <Form.Item
            label="Pincode"
            name="pincode"
            rules={[
              { required: true, message: "Please enter your pincode" },
              { pattern: /^[0-9]{6}$/, message: "Invalid pincode" },
            ]}
          >
            <Input placeholder="Enter your pincode" />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-between">
            <Button onClick={() => navigate(-1)} danger>
              Back
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
