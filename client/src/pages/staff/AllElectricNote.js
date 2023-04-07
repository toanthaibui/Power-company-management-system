import axios from "axios";
import Layout from "./../../components/Layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Table, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const AllElectricNote = () => {
  const params = useParams();
  const [customer, setCustomer] = useState();
  const [electric, setElectric] = useState([]);
  const dispatch = useDispatch();
  //getUsers
  const getElectricCustomer = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getElectricCustomer",
        { customerId: params.customerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setElectric(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerById",
        { customerId: params.customerId },
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

  const handleSetBill = async (record) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/staff/setBill",
        { electricId: record._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getElectricCustomer();
    getCustomerInfo();
  }, []);

  const columns = [
    {
      title: "Tháng",
      dataIndex: "date",
      render: (text, record) => <p>{moment(record.date).format("MM-YYYY")}</p>,
    },
    {
      title: "Chỉ số điện",
      dataIndex: "score",
    },
    {
      title: "Hóa đơn",
      dataIndex: "status",
      render: (text, record) => (
        <div>{record.status === "0" ? <h>Chưa tạo</h> : <h>Đã tạo</h>}</div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status === "0" ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => handleSetBill(record)}
              >
                Tạo hóa đơn
              </button>
            </div>
          ) : (
            <div>
              <Link>
                <button className="btn btn-info">In hóa đơn</button>
              </Link>
            </div>
          )}
          <br />
          <Link>
            <button className="btn btn-secondary">Xem hóa đơn</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">Chỉ số điện hàng tháng</h1>
      <Row className="m-5">
        <Col flex={2}>
          <br />
          <br />
          {customer && (
            <div>
              <p>
                <b>Họ tên: </b> {customer.fullName}
              </p>
              <p>
                <b>SĐT: </b> {customer.phone}
              </p>
              <p>
                <b>Căn cước công dân: </b> {customer.cccd}
              </p>
              <p>
                <b>Email: </b> {customer.email}
              </p>
              <p>
                <b>Địa chỉ: </b> {customer.numberHouse}, {customer.road},{" "}
                {customer.ward}, {customer.district}
              </p>
              <p>
                <b>Mục đích sử dụng: </b> {customer.purpose}
              </p>
            </div>
          )}
        </Col>
        <Col flex={10}>
          <Table className="m-5" columns={columns} dataSource={electric} />
        </Col>
      </Row>
    </Layout>
  );
};

export default AllElectricNote;
