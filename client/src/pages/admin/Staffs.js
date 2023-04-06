import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
import { Link } from "react-router-dom";

const Staffs = () => {
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

  useEffect(() => {
    getStaffs();
  }, []);

  const columns = [
    {
      title: "Hộ tên",
      dataIndex: "fullName",
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialization",
    },
    {
      title: "Trình độ",
      dataIndex: "level",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-center">
          <button
            className="btn btn-danger"
            onClick={() => handleAccountStatus(record, "delete")}
          >
            Xóa
          </button>
          <p></p>
          <Link to={`/admin/schedule/setschedule/${record._id}`}>
            <button className="btn btn-success">Xếp lịch</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Staffs</h1>
      <Table columns={columns} dataSource={staffs} />
    </Layout>
  );
};

export default Staffs;
