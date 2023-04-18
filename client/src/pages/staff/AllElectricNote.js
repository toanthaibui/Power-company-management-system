import axios from "axios";
import Layout from "./../../components/Layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row, Table, message } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Main from "../../components/layout/Main";

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
            <Button
              className="btn btn-primary"
              onClick={() => handleSetBill(record)}
            >
              Tạo hóa đơn
            </Button>
          ) : (
            <Link to={`/staff/print-bill/${record._id}/${record.customerId}`}>
              <Button className="">In hóa đơn</Button>
            </Link>
          )}
          &nbsp; &nbsp;
          <Link to={`/staff/bill/${record._id}/${record.customerId}`}>
            <Button className="btn btn-secondary">Xem hóa đơn</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Main>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[
              <h6 className="font-semibold m-0">Chỉ số điện hàng tháng</h6>,
            ]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <div className="table-responsive">
              <Table
                className="ant-border-space"
                columns={columns}
                dataSource={electric}
              />
            </div>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Thông tin khách hàng</h6>}
          >
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
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default AllElectricNote;
