import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import Main from "../../components/layout/Main";

import { Button, Card, Col, message, Row, Table, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Customers = () => {
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
  const { Title } = Typography;

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = [
    {
      title: "Khách hàng",
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
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, record) => (
        <span>
          {record.numberHouse}, {record.road}, {record.ward}, {record.district}
        </span>
      ),
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
          {record.status === "0" ? <h>Chưa chấp nhận</h> : <h>Chấp nhận</h>}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          {record.status === "0" ? (
            <div>
              <Button
                className="tag-primary"
                type="primary"
                onClick={() => handleAccountStatus(record, "1")}
              >
                Đồng ý
              </Button>
              &nbsp; &nbsp;
              <Button
                className="tag-badge"
                onClick={() => handleAccountStatus(record, "2")}
              >
                Từ Chối
              </Button>
            </div>
          ) : (
            <div>
              <Link to={`/print/${record.userId}`}>
                <Button className="btn btn-info" type="primary">
                  Lập biên bản
                </Button>
              </Link>
              &nbsp; &nbsp;
              <Button
                className="tag-badge"
                onClick={() => handleAccountStatus(record, "2")}
              >
                Xóa
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh sách khách hàng"
              extra={
                <Link to="/admin/customers/search-customer">
                  <Button className="btn btn-primary">
                    Tìm kiếm khách hàng
                  </Button>
                </Link>
              }
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={customers}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default Customers;
