import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";

import Layout from "./../../components/Layout";
import axios from "axios";
import { Button, Card, Col, Row, Table, Typography, message } from "antd";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  const params = useParams();

  const getScheduleStaff = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getScheduleAdmin",
        { staffId: params.staffId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setSchedules(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/deteleSchedule",
        { _id: record._id },
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
    getScheduleStaff();
  }, []);
  const columns_schedule = [
    {
      title: "Nhân viên",
      dataIndex: "fullName",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.fullName}</Title>
          <p>{record.phone}</p>
        </div>
      ),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "begin",
      render: (text, record) => (
        <p>{moment(record.begin).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end",
      render: (text, record) => (
        <p>{moment(record.end).format("DD-MM-YYYY")}</p>
      ),
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
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center">
          <Link to={`/admin/schedule/updateschedule/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Cập nhật
            </Button>
          </Link>
          &nbsp; &nbsp;
          <Button className="tag-badge" onClick={() => handleDelete(record)}>
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
              title="Lịch làm việc cá nhân"
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns_schedule}
                  dataSource={schedules}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default Schedule;
