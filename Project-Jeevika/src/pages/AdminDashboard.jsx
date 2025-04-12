import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, message, Spin, Form, Modal, Button, notification } from "antd";
import { getAllEmployees, getAllCompanies } from "../utils/api";
import AdminNavbar from "../components/Admin/AdminNavbar";
import AdminHome from "../components/admin/AdminHome";
import EmployeeTable from "../components/admin/EmployeeTable";
import CompanyTable from "../components/admin/CompanyTable";
import CreateTeamModal from "../components/admin/CreateTeamModal";
import ProfileModal from "../components/admin/ProfileModal";
import DetailModal from "../components/admin/DetailModal";
import DashboardStats from "../components/admin/DashboardStats";
import ConnectTable from "../components/admin/ConnectTable";
import RequestModel from "../components/admin/RequestModel";
const { Content } = Layout;
// const socket = io("http://localhost:8080");

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  // const [notifications, setNotifications] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [createTeamModalVisible, setCreateTeamModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const [requestModelVisible, setRequestModelVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      try {
        const adminData = JSON.parse(sessionStorage.getItem("adminData") || "null");
        if (!adminData) {
          navigate("/");
          return;
        }
        setAdmin(adminData);
        await Promise.all([fetchEmployees(), fetchCompanies()]);
      } catch (error) {
        message.error("Failed to initialize dashboard");
      } finally {
        setLoading(false);
      }
    };
    initializeDashboard();

  }, [navigate]);



  const fetchEmployees = async () => {
    setDataLoading(true);
    try {
      const response = await getAllEmployees();
      // console.log("Employee Response:", response);
      const employeeData = Array.isArray(response.data.data) ? response.data.data : [];
      setEmployees(employeeData);
    } catch (error) {
      console.log("Employee Error:", error);
      message.error("Failed to fetch employees");
      setEmployees([]);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchCompanies = async () => {
    setDataLoading(true);
    try {
      const response = await getAllCompanies();
      // console.log("Companies Response:", response);
      const companyData = Array.isArray(response.data.data) ? response.data.data : [];
      setCompanies(companyData);
    } catch (error) {
      message.error("Failed to fetch companies");
      setCompanies([]);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    sessionStorage.clear(); // Clear all local storage data
    sessionStorage.clear(); // Clear session storage as well (if needed)
    setEmployees([]);
    setCompanies([]);
    setAdmin(null);
    message.success("Logged out successfully");
    navigate("/"); // Redirect to home/login
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setSelectedCompany(null);
    setDetailModalVisible(true);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setSelectedEmployee(null);
    setDetailModalVisible(true);
  };

  const handleOpenRequestModel = () => {
    setRequestModelVisible(true);
  };

  const handleRequestSubmit = async (values) => {
    try {
      // Here you would call your API to submit the request
      // For example: await submitRequest(values);
      message.success("Request submitted successfully");
      setRequestModelVisible(false);
    } catch (error) {
      message.error("Failed to submit request");
    }
  };

  const handleRequestCancel = () => {
    setRequestModelVisible(false);
  };

  return (
    <Layout className="w-full h-full bg-gray-100">
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        // notifications={notifications}
        fetchEmployees={fetchEmployees}
        fetchCompanies={fetchCompanies}
        setCreateTeamModalVisible={setCreateTeamModalVisible}
        setProfileModalVisible={setProfileModalVisible}
        handleLogout={handleLogout}
        handleOpenRequestModel={handleOpenRequestModel}
      />

      <Content className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <DashboardStats 
              employeeCount={employees.length} 
              companyCount={companies.length} 
              connectionCount={connectionCount} 
              onRequestClick={handleOpenRequestModel}
            />

            <div className="mt-6">
              {activeTab === "home" && <AdminHome admin={admin} />}
              {activeTab === "connect" && <ConnectTable />}
              {activeTab === "employee" && (
                <EmployeeTable
                  employees={employees}
                  dataLoading={dataLoading}
                  onEmployeeSelect={handleEmployeeSelect}
                  setDetailModalVisible={setDetailModalVisible}
                />
              )}
              {activeTab === "company" && (
                <CompanyTable
                  companies={companies}
                  dataLoading={dataLoading}
                  onCompanySelect={handleCompanySelect}
                  setDetailModalVisible={setDetailModalVisible}
                />
              )}

               {activeTab === "request" && <RequestModel />
                // <div className="flex justify-end mb-4">
                //   <Button 
                //     type="primary" 
                //     onClick={handleOpenRequestModel}
                //     className="bg-blue-500 hover:bg-blue-600"
                //   >
                //     Create New Request
                //   </Button>
                // </div>
              }
            </div>
          </>
        )}
      </Content>

      <CreateTeamModal
        visible={createTeamModalVisible}
        setVisible={setCreateTeamModalVisible}
        form={form}
        handleCreateTeam={async (values) => {
          try {
            await createTeam(values);
            message.success("Team created successfully");
            setCreateTeamModalVisible(false);
            form.resetFields();
            await fetchEmployees();
          } catch (error) {
            message.error("Failed to create team");
          }
        }}
      />

      <ProfileModal visible={profileModalVisible} setVisible={setProfileModalVisible} admin={admin} />

      <DetailModal
        visible={detailModalVisible}
        setVisible={setDetailModalVisible}
        selectedEmployee={selectedEmployee}
        selectedCompany={selectedCompany}
        setSelectedEmployee={setSelectedEmployee}
        setSelectedCompany={setSelectedCompany}
      />

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setLogoutModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" danger onClick={confirmLogout}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to logout? This will remove all your data from local storage.</p>
      </Modal>
    </Layout>
  );
};

export default AdminDashboard;
