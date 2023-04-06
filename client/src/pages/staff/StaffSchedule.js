import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

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
    <Layout>
      <br />
      <h1 className="text-center m-3">Lịch làm việc</h1>
      <div className="m-4">
        <Table columns={columns} dataSource={schedules} />
      </div>
    </Layout>
  );
};

export default StaffSchedule;
