import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Col, Row, Table, Typography } from "antd";
import Main from "../../components/layout/Main";

const ElectricNote = () => {
  const params = useParams();
  const [customer, setCustomer] = useState([]);
  const [staff, setStaff] = useState();

  const getStaffInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getStaffInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStaff(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerElectricNote = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getCustomerElectricNote",
        { userId: params.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setCustomer(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { Title } = Typography;

  const columns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.fullName}</Title>
          <p>{record.email}</p>
        </div>
      ),
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, record) => (
        <p>
          {record.numberHouse}, {record.road}, {record.ward}, {record.district}
        </p>
      ),
    },
    {
      title: "Mục đích sử dụng",
      dataIndex: "purpose",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center">
          <Link to={`/staff/set-electric-note/${record._id}/${staff._id}`}>
            <Button className="">Ghi Điện</Button>
          </Link>
          &nbsp; &nbsp;
          <Link to={`/staff/all-electric-note/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Chỉ số điện hàng tháng
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCustomerElectricNote();
    getStaffInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Ghi điện"
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={customer}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ElectricNote;
