import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FormOutlined, UserOutlined, RightOutlined, LeftOutlined, TeamOutlined } from "@ant-design/icons";

const DashboardSidebar = ({ userRole }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); // React Router Navigation

  // Determine which form to show based on user role
  const getFormRoute = () => {
    if (userRole === "employee") return "/worker-profile";
    if (userRole === "hire") return "/company-profile";
    return "/"; // Default route
  };

  // Sidebar menu items
  const sidebarItems = [
    {
      key: "form",
      label: "Form",
      icon: <FormOutlined className="mr-2" />,
      onClick: () => navigate(getFormRoute()), // Redirect based on role
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined className="mr-2" />,
      onClick: () => console.log("Profile Clicked"),
    },
    ...(userRole === "hire"
      ? [
          {
            key: "employees",
            label: "Employees",
            icon: <TeamOutlined className="mr-2" />,
            onClick: () => console.log("Employees Clicked"),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-[70px] z-50 bg-white shadow-md p-2 rounded-full transition-all duration-300 ${
          visible ? "left-[260px]" : "left-4"
        }`}
        onClick={() => setVisible(!visible)}
      >
        {visible ? <LeftOutlined /> : <RightOutlined />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 w-[250px] bg-white shadow-md transition-transform duration-300 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "70px", height: "calc(100vh - 70px)", zIndex: 1000 }}
      >
        <div className="h-full flex flex-col bg-white shadow-lg">
          {/* Sidebar Header */}
          <div className="p-4 text-xl font-semibold text-center border-b bg-white">
            Dashboard
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-grow">
            <ul className="space-y-2 p-4">
              {sidebarItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={item.onClick}
                    className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-100"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
