import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import Main from "../../components/layout/Main";

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
import { Link, useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

const SearchCustomer = () => {
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
  const { Title } = Typography;

  useEffect(() => {
    handleSearch();
  }, []);

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "fullName",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.fullName}</Title>
          <p>{record.email}</p>
        </div>
      ),
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
      title: "Địa chỉ",
      dataIndex: "address",
      render: (text, record) => (
        <span>
          {record.numberHouse}, {record.road}, {record.ward}, {record.district}
        </span>
      ),
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
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          {record.status === "0" ? (
            <div>
              <Button
                className="tag-primary"
                type="primary"
                onClick={() => handleAccountStatus(record, "1")}
              >
                Đồng ý
              </Button>
              &nbsp; &nbsp;
              <Button
                className="tag-badge"
                onClick={() => handleAccountStatus(record, "2")}
              >
                Từ Chối
              </Button>
            </div>
          ) : (
            <Link to={`/print/${record.userId}`}>
              <Button className="tag-primary" type="primary">
                Lập biên bản
              </Button>
            </Link>
          )}
        </div>
      ),
    },
  ];

  const [data, setData] = useState();

  const handleSearch = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/search-customer",
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={false}
              bodyStyle={{ paddingTop: 0 }}
              className="header-solid h-full  ant-list-yes"
              title={<h6 className="font-semibold m-0">Thông tin tìm kiếm</h6>}
            >
              <Form className="text-center" onFinish={handleSearch}>
                <FormItem name="field">
                  <Select
                    placeholder="Tìm kiếm theo"
                    options={[
                      { value: "", label: "Tất cả" },
                      { value: "fullName", label: "Họ tên" },
                      { value: "phone", label: "SĐT" },
                      { value: "email", label: "Email" },
                      { value: "cccd", label: "Căn cước công dân" },
                      { value: "ward", label: "Phường/Xã" },
                      { value: "district", label: "Quận/Huyện" },
                      { value: "purpose", label: "Mục đích sử dụng" },
                      { value: "status", label: "Trạng thái (1 - 0)" },
                    ]}
                  />
                </FormItem>
                <FormItem name="keyword">
                  <Input
                    className="text-center"
                    placeholder="Nhập vào từ khóa"
                  />
                </FormItem>
                <button className="btn btn-primary" type="submit">
                  Tìm kiếm
                </button>
              </Form>
            </Card>
          </Col>
          <Col span={24} md={16} className="mb-24">
            <Card
              className="header-solid h-full"
              bordered={false}
              title={[
                <h6 className="font-semibold m-0">Danh sách tìm kiếm</h6>,
              ]}
              bodyStyle={{ paddingTop: "0" }}
              extra={<h6 className="font-semibold m-0">Khách hàng</h6>}
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={data}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default SearchCustomer;
