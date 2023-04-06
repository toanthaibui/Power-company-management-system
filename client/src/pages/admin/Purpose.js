import { Col, Form, Input, message, Row, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "./../../components/Layout";
const Purpose = () => {
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/admin/postPurpose",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const onfinishHandlerUpdate = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/admin/updatePrice",
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  const [prices, setPrices] = useState([]);

  //getUsers
  const getPrices = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllPrices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setPrices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceStatus = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changePriceStatus",
        { priceId: record._id },
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

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Giá dịch vụ",
      dataIndex: "price",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger"
            onClick={() => handlePriceStatus(record)}
          >
            Xóa
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getPrices();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Quản lý giá dịch vụ</h1>
      <br />
      <br />
      <br />
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <h4 className="text-center">Thêm dịch vụ</h4>
          <Form layout="vertical" onFinish={onfinishHandler} className="m-3">
            <FormItem
              label="Tên dịch vụ"
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nhập tên dịch vụ" />
            </FormItem>
            <FormItem
              label="Giá dịch vụ"
              name="price"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nhập tên dịch vụ" />
            </FormItem>
            <button className="btn btn-primary form-btn" type="submit">
              Thêm
            </button>
          </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }}>
          <h4 className="text-center">Bảng các dịch vụ</h4>
          <Table dataSource={prices} columns={columns}></Table>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <h4 className="text-center">Cập nhật giá dịch vụ</h4>
          <Form
            layout="vertical"
            onFinish={onfinishHandlerUpdate}
            className="m-3"
          >
            <FormItem
              label="Tên dịch vụ"
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn loại dịch vụ">
                {prices?.map((item, idx) => (
                  <Option value={item.name} key={idx}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="Giá dịch vụ"
              name="price"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nhập tên dịch vụ" />
            </FormItem>
            <button className="btn btn-primary form-btn" type="submit">
              Cập nhật
            </button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default Purpose;
