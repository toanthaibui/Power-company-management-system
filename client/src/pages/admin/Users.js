import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import Main from "../../components/layout/Main";

import axios from "axios";
import { Button, Card, Col, message, Row, Table, Typography } from "antd";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { Title } = Typography;
  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatusUser",
        { email: record.email },
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
    getUsers();
  }, []);

  //antd table col
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phân loại",
      dataIndex: "isStaff",
      render: (text, record) => (
        <Title level={5}>{record.isStaff ? "Nhân viên" : "Khách hàng"}</Title>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <Button
            className="tag-badge"
            onClick={() => handleAccountStatus(record)}
          >
            Xóa
          </Button>
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
              title="Danh sách tài khoản"
              extra={
                <Link to="/admin/users/search-user">
                  <Button className="btn btn-primary">
                    Tìm kiếm tài khoản
                  </Button>
                </Link>
              }
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={users}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default Users;
