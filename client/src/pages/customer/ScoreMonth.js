import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Col, Form, Input, Row, message, Select, Table } from "antd";
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
      title: "Tháng",
      dataIndex: "date",
      render: (text, record) => <p>{moment(record.date).format("MM-YYYY")}</p>,
    },
    {
      title: "Chỉ số điện",
      dataIndex: "score",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
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
      <Table className="m-5" columns={columns} dataSource={electric} />
    </Layout>
  );
};

export default ScoreMonth;
