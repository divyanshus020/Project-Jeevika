import React, { useState } from "react";
import { FormOutlined, UserOutlined, RightOutlined, LeftOutlined, TeamOutlined } from "@ant-design/icons";
import PopupForm from "./PopupForm"; // Import Popup Form

const DashboardSidebar = ({ userRole }) => {
  const [visible, setVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sidebar menu items
  const sidebarItems = [
    {
      key: "form",
      label: "Form",
      icon: <FormOutlined className="mr-2" />,
      onClick: () => setIsFormOpen(true), // Directly open modal
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

      {/* Popup Form */}
      <PopupForm visible={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default DashboardSidebar;
