import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import axios from "axios";
import Main from "../../components/layout/Main";

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
  const { Title } = Typography;

  const columns = [
    {
      title: "Dịch vụ",
      dataIndex: "name",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.name}</Title>
          <p>{VND.format(record.price)}</p>
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Button
            className="tag-badge"
            onClick={() => handlePriceStatus(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getPrices();
  }, []);
  return (
    <Main>
      <Row gutter={[24, 0]} className="m-5">
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Thêm dịch vụ</h6>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
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
                <Input type="text" placeholder="Nhập giá dịch vụ" />
              </FormItem>
              <button className="btn btn-primary form-btn" type="submit">
                Thêm
              </button>
            </Form>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Bảng dịch vụ</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <div className="table-responsive">
              <Table dataSource={prices} columns={columns}></Table>
            </div>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Cập nhật giá dịch vụ</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
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
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default Purpose;
