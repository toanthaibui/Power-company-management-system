import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { useParams } from "react-router-dom";
import Main from "../../components/layout/Main";
import axios from "axios";
import moment from "moment";
import { Card, Col, Row, Table } from "antd";

const StaffSchedule = () => {
  const params = useParams();

  const [schedules, setSchedules] = useState([]);

  const getSchedules = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getSchedulesStaff",
        { userId: params.userId },
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

  const columns = [
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
  ];

  useEffect(() => {
    getSchedules();
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
              title="Lịch làm việc"
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
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

export default StaffSchedule;
