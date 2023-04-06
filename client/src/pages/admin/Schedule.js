import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  const getSchedules = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllSchedules", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  useEffect(() => {
    getSchedules();
  }, []);
  const columns_schedule = [
    {
      title: "Họ Tên",
      dataIndex: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
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
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center">
          <Link to={`/admin/schedule/updateschedule/${record._id}`}>
            <button className="btn btn-success">Cập nhật</button>
          </Link>
          <p></p>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(record)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <br />
      <h1 className="text-center m-3">Lịch làm việc</h1>
      <div className="m-4">
        <Table columns={columns_schedule} dataSource={schedules} />
      </div>
    </Layout>
  );
};

export default Schedule;
