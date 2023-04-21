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

const ScoreMonth = () => {
  const { user } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [electric, setElectric] = useState([]);

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

  useEffect(() => {
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
      </div>
    </Main>
  );
};

export default ScoreMonth;
