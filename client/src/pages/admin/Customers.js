import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
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

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = [
    {
      title: "Tên",
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
          {record.status === "0" ? <h>Chưa chấp nhận</h> : <h>Chấp nhận</h>}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "0" ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "1")}
              >
                Đồng ý
              </button>
              <br />
              <br />
              <button
                className="btn btn-danger"
                onClick={() => handleAccountStatus(record, "2")}
              >
                Từ Chối
              </button>
            </div>
          ) : (
            <Link to={`/print/${record.userId}`}>
              <button className="btn btn-secondary">Lập biên bản</button>
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Customers</h1>
      <Table columns={columns} dataSource={customers} />
    </Layout>
  );
};

export default Customers;
