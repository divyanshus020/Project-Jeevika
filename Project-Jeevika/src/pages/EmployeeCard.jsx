// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Spin, Alert } from "antd";
// import { getEmployees } from "../utils/api"; // Assuming you have an API function for fetching employees

// const EmployeeCard = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await getEmployees();
//         setEmployees(response.data);
//       } catch (err) {
//         setError("Failed to load employees. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) return <Spin size="large" className="flex justify-center" />;
//   if (error) return <Alert message={error} type="error" showIcon className="m-4" />;

//   return (
//     <div className="p-4">
//       <Row gutter={[16, 16]}>
//         {employees.map((employee) => (
//           <Col xs={24} sm={12} md={8} lg={6} key={employee.id}>
//             <Card title={employee.name} bordered={false} className="shadow-md">
//               <p><strong>Job Role:</strong> {employee.jobRole}</p>
//               <p><strong>Experience:</strong> {employee.workExperience} years</p>
//               <p><strong>Expected Salary:</strong> ${employee.expectedSalary}</p>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default EmployeeCard;
