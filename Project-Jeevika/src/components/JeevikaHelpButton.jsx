import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import io from "socket.io-client";

const { TextArea } = Input;
const socket = io("http://localhost:8080");

const JeevikaHelpButton = ({ company }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [helpMessage, setHelpMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setHelpMessage("");
  };

  const handleSubmit = () => {
    if (!helpMessage.trim()) {
      message.error("Please enter a message");
      return;
    }

    if (!company) {
      message.error("Company information not found. Please log in again.");
      return;
    }

    setIsSubmitting(true);

    // Prepare data to send via socket
    const helpRequestData = {
      companyId: company._id,
      companyName: company.companyName,
      message: helpMessage,
      timestamp: new Date().toISOString(),
      status: "pending", // Initial status
      contactInfo: {
        email: company.email,
        phone: company.mobileNumber
      }
    };

    // Emit the help request event to the server
    socket.emit("help_request", helpRequestData);

    // Listen for acknowledgment from the server
    socket.once("help_request_received", (response) => {
      setIsSubmitting(false);
      if (response.success) {
        message.success("Your request has been submitted. Our team will assist you soon!");
        setHelpMessage("");
        setIsModalVisible(false);
      } else {
        message.error("Failed to submit your request. Please try again later.");
      }
    });

    // Set a timeout in case the server doesn't respond
    setTimeout(() => {
      if (isSubmitting) {
        setIsSubmitting(false);
        message.info("Request submitted. You'll receive assistance soon.");
        setHelpMessage("");
        setIsModalVisible(false);
      }
    }, 5000);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 rounded-md flex items-center"
      >
        <span className="mr-1">🔍</span> Jeevika Help
      </Button>

      <Modal
        title="Jeevika Help - Find Your Ideal Employee"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Submit Request
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p>
            Need help finding the right employee? Describe your requirements below and our team will assist you in finding the perfect match for your business.
          </p>
          <TextArea
            rows={6}
            value={helpMessage}
            onChange={(e) => setHelpMessage(e.target.value)}
            placeholder="Describe your requirements, preferred skills, experience level, and any other details that would help us find the right employee for you..."
            maxLength={1000}
            showCount
          />
          <p className="text-sm text-gray-500">
            Our team will review your request and get back to you with suitable candidates.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default JeevikaHelpButton;
