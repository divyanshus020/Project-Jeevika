import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, DatePicker, message } from "antd";
import { UserOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, SolutionOutlined } from "@ant-design/icons";
import { submitWorkerProfile } from "../utils/api";

const { Option } = Select;

const WorkerProfileForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Form Submission Handler
  const handleSubmit = async (values) => {
    console.log("📝 Form Submitted Values:", values); // Log form values before submission
    setLoading(true);

    try {
      const response = await submitWorkerProfile(values);
      console.log("✅ API Response:", response); // Log API response
      message.success("Form submitted successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("❌ API Error:", error); // Log API error
      message.error("Failed to submit the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Worker Profile Form" open={visible} onCancel={onClose} footer={null} centered>
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
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Section - Personal Details */}
          <div className="w-full md:w-1/2">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
              <Select placeholder="Select Gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Please select your date of birth" }]}
            >
              <DatePicker className="w-full" placeholder="Select DOB" />
            </Form.Item>

            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[
                { required: true, message: "Please enter your mobile number" },
                { pattern: /^[0-9]{10}$/, message: "Invalid mobile number" },
              ]}
            >
              <Input placeholder="Enter your mobile number" prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              label="Aadhar Card Number"
              name="aadhar"
              rules={[{ pattern: /^\d{12}$/, message: "Invalid Aadhar number" }]}
            >
              <Input placeholder="Enter your Aadhar number" prefix={<IdcardOutlined />} />
            </Form.Item>
          </div>

          {/* Right Section - Work Details */}
          <div className="w-full md:w-1/2">
            <Form.Item
              label="Work Category"
              name="workCategory"
              rules={[{ required: true, message: "Please select a work category" }]}
            >
              <Select placeholder="Select Work Category">
                <Option value="plumber">Plumber</Option>
                <Option value="electrician">Electrician</Option>
                <Option value="driver">Driver</Option>
                <Option value="carpenter">Carpenter</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Experience Level"
              name="experience"
              rules={[{ required: true, message: "Please select experience level" }]}
            >
              <Select placeholder="Select Experience Level">
                <Option value="fresher">Fresher</Option>
                <Option value="1-3 years">1-3 Years</Option>
                <Option value="3-5 years">3-5 Years</Option>
                <Option value="5+ years">5+ Years</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Expected Salary (₹)"
              name="expectedSalary"
              rules={[{ required: true, message: "Please enter expected salary" }]}
            >
              <Input placeholder="Enter expected salary" prefix={<SolutionOutlined />} />
            </Form.Item>

            <Form.Item
              label="Current City"
              name="currentCity"
              rules={[{ required: true, message: "Please enter your city" }]}
            >
              <Input placeholder="Enter your city" prefix={<HomeOutlined />} />
            </Form.Item>

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
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button type="primary" htmlType="submit" loading={loading} onClick={() => console.log("🚀 Submit Button Clicked")}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default WorkerProfileForm;
