import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";

const ElectricNote = () => {
  const params = useParams();
  const [customer, setCustomer] = useState([]);
  const [staff, setStaff] = useState();

  const getStaffInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getStaffInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStaff(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerElectricNote = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getCustomerElectricNote",
        { userId: params.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setCustomer(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, record) => (
        <p>
          {record.numberHouse}, {record.road}, {record.ward}, {record.district}
        </p>
      ),
    },
    {
      title: "Mục đích sử dụng",
      dataIndex: "purpose",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Link to={`/staff/set-electric-note/${record.userId}/${staff._id}`}>
            <button className="btn btn-secondary">Ghi Điện</button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getCustomerElectricNote();
    getStaffInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center m-3">Ghi Điện</h1>
      <Table columns={columns} dataSource={customer} />
    </Layout>
  );
};

export default ElectricNote;
