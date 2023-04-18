import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import Main from "../../components/layout/Main";

import { Button, Card, Col, message, Row, Table, Typography } from "antd";
import { Link } from "react-router-dom";

const ScheduleStaff = () => {
  const [staffs, setStaffs] = useState([]);
  //getUsers
  const getStaffs = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllStaffs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setStaffs(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { staffId: record._id, userId: record.userId, status: status },
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
    getStaffs();
  }, []);

  const columns = [
    {
      title: "Nhân viên",
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
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialization",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.specialization}</Title>
          <p>{record.level}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/admin/schedule/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Lịch làm việc
            </Button>
          </Link>
          &nbsp; &nbsp;
          <Link to={`/admin/schedule/setschedule/${record._id}`}>
            <Button className="">Xếp lịch</Button>
          </Link>
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
              title="Lịch làm việc"
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={staffs}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ScheduleStaff;
