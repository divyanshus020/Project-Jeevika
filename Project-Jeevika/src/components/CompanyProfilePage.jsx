import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  HomeOutlined, 
  GlobalOutlined, 
  PhoneOutlined, 
  BankOutlined, 
  FieldNumberOutlined, 
  FileTextOutlined, 
  ArrowLeftOutlined 
} from "@ant-design/icons";

const { Option } = Select;

const CompanyProfilePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Hook for navigation

  // Form Submission Handler (Just Console Logs for Now)
  const handleSubmit = (values) => {
    console.log("📝 Company Profile Data:", values);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
        <h2 className="text-2xl font-bold text-center flex-1">Company Profile Form</h2>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        
        {/* Company Name */}
        <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: "Enter company name" }]}>
          <Input placeholder="Enter company name" prefix={<BankOutlined />} />
        </Form.Item>

        {/* Industry */}
        <Form.Item label="Industry" name="industry" rules={[{ required: true, message: "Select an industry" }]}>
          <Select placeholder="Select Industry">
            <Option value="IT">IT & Software</Option>
            <Option value="Manufacturing">Manufacturing</Option>
            <Option value="Healthcare">Healthcare</Option>
            <Option value="Education">Education</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Construction">Construction</Option>
          </Select>
        </Form.Item>

        {/* Registration Number */}
        <Form.Item label="Company Registration Number" name="registrationNumber">
          <Input placeholder="Enter registration number" prefix={<FieldNumberOutlined />} />
        </Form.Item>

        {/* Address */}
        <Form.Item label="Company Address" name="address">
          <Input.TextArea rows={2} placeholder="Enter company address" prefix={<HomeOutlined />} />
        </Form.Item>

        {/* Website */}
        <Form.Item label="Company Website" name="website">
          <Input placeholder="Enter website URL" prefix={<GlobalOutlined />} />
        </Form.Item>

        {/* Contact Number */}
        <Form.Item label="Contact Number" name="contact">
          <Input placeholder="Enter contact number" prefix={<PhoneOutlined />} />
        </Form.Item>

        {/* Company Details & Past Work */}
        <Form.Item 
          label="Company Details & Past Work" 
          name="companyDescription"
          rules={[{ required: true, message: "Please provide company details & past work" }]}
        >
          <Input.TextArea rows={4} placeholder="Describe your company and past projects" prefix={<FileTextOutlined />} />
        </Form.Item>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyProfilePage;
