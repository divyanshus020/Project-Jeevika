import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { UserOutlined, ShopOutlined, LinkOutlined } from "@ant-design/icons";

const DashboardStats = ({ employeeCount, companyCount, connectionCount }) => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Employees" value={employeeCount} prefix={<UserOutlined />} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Total Companies" value={companyCount} prefix={<ShopOutlined />} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Total Connections" value={connectionCount} prefix={<LinkOutlined />} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardStats;
