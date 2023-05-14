import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import Main from "../../components/layout/Main";

import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Col,
  Form,
  Input,
  Row,
  message,
  Select,
  Table,
  Card,
  Button,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { Option } from "antd/es/mentions";
import moment from "moment";
import CustomerLineChart from "../../components/chart/CustomerLineChart";

const ScoreMonth = () => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { user } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [electric, setElectric] = useState([]);

  const [total, setTotal] = useState([]);
  const getTotal = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/price_month",
        { customerId: params.customerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setTotal(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerInfo",
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

  const getElectricCustomerUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getElectricCustomerUser",
        { userId: params.userId },
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

  const sum = total?.sum;

  useEffect(() => {
    getTotal();
    getElectricCustomerUser();
    getCustomerInfo();
    // eslint-disable-next-line
  }, []);
  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p>{moment(record.createdAt).format("HH:mm-DD-MM-YYYY")}</p>
      ),
    },
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
      title: "Giá",
      dataIndex: "price",
      render: (text, record) => <h>{VND.format(record.price)}</h>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {record.status === "0" ? (
            <h>Chưa thanh toán</h>
          ) : (
            <h>Đã thanh toán</h>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          <Link to={`/admin/bill-admin/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Chi tiết hóa đơn
            </Button>
          </Link>
          &nbsp; &nbsp;
          <Link to={`/staff/print-bill/${record._id}/${record.customerId}`}>
            <Button className="">Xem hóa đơn</Button>
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
              title="Hóa đơn điện hàng tháng"
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
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={4} className="mb-24">
            <br />
            <Row>
              <Card
                bordered={false}
                className="criclebox h-full text-center"
                title="Tổng giá hóa đơn"
              >
                <b>
                  {sum?.map(function (e) {
                    return VND.format(e.totalAmount);
                  })}
                </b>
              </Card>
            </Row>
            <br />
            <br />
            <Row>
              <Card
                bordered={false}
                className="criclebox h-full text-center"
                title="Tổng số hóa đơn"
              >
                <b>
                  {sum?.map(function (e) {
                    return e.count;
                  })}
                </b>
              </Card>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={20} className="mb-24">
            <Card
              bordered={false}
              className="criclebox h-full"
              title="Biểu đồ hóa đơn tiền điện hàng tháng"
            >
              <CustomerLineChart total={total} />
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ScoreMonth;
