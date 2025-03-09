import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShopOutlined } from '@ant-design/icons';

const DashboardStats = ({ employeeCount, companyCount }) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total Employees"
            value={employeeCount}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Total Companies"
            value={companyCount}
            prefix={<ShopOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardStats;
