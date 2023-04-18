import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout";
import Main from "../components/layout/Main";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  List,
  message,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [customers, setCustomers] = useState([]);
  //getUsers
  const getCustomers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllCustomers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCustomers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { Title } = Typography;

  //handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatusCustomer",
        { customerId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

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
      title: "CCCD",
      dataIndex: "cccd",
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
    },
    {
      title: "Phường/Xã",
      dataIndex: "ward",
    },
    {
      title: "Đường",
      dataIndex: "road",
    },
    {
      title: "Số nhà",
      dataIndex: "numberHouse",
    },
    {
      title: "Mục đích sử dụng",
      dataIndex: "purpose",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {record.status === "0" ? (
            <Button className="tag-badge">Chờ duyệt</Button>
          ) : (
            <Button type="primary" className="tag-primary">
              Đã duyệt
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "0" ? (
            <div className="text-center">
              <Button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "1")}
              >
                Đồng ý
              </Button>
              &nbsp; &nbsp;
              <Button
                className="btn btn-danger"
                onClick={() => handleAccountStatus(record, "2")}
              >
                Từ Chối
              </Button>
            </div>
          ) : (
            <Link to={`/print/${record.userId}`}>
              <div className="ant-employed">
                <Button>Lập biên bản</Button>
              </div>
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <Main>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">Billing Information</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          ></Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Your Transactions</h6>}
          ></Card>
        </Col>
      </Row>
    </Main>
  );
};

export default SignIn;
