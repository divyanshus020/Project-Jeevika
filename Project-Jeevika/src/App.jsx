import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";

// Lazy load components for better performance
const Home = lazy(() => import("../src/pages/Home"));
const Employee = lazy(() => import("./pages/Employee"));
const Hire = lazy(() => import("./pages/Hire"));
const EmployeeDashboard = lazy(() => import("./pages/EmployeeDashbord"));
const Login = lazy(() => import("./pages/LoginPage"));
const CompanyDashboard = lazy(() => import("./pages/CompanyDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const RegisterEmployee = lazy(() => import("./pages/EmployeeRegister"));
const RegisterCompany = lazy(() => import("./pages/CompanyRegsiter"));
const EmployeeCard = lazy(() => import("./pages/EmployeeList"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
// Loading fallback component
const LoadingSpinner = () => <div>
  <Loader/>
</div>;

// Layout component with protected routes logic
const Layout = ({ children }) => {
  const location = useLocation();
  const protectedRoutes = ["/EmployeeDashboard", "/CompanyDashboard", "/AdminDashboard"];
  const hideNavBar = protectedRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Hire" element={<Hire />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/register">
              <Route path="employee" element={<RegisterEmployee />} />
              <Route path="company" element={<RegisterCompany />} />
            </Route>
            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/company">
              <Route path="employee-card" element={<EmployeeCard />} />
            </Route>
            <Route path="/reset-password/:token" element={<ResetPassword />} />

          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
