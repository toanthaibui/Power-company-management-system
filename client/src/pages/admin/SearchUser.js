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
import { Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
const { Title } = Typography;

const SearchUser = () => {
  //handle account

  const handleAccountStatus = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatusUser",
        { email: record.email },
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
    handleSearch();
  }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phân loại",
      dataIndex: "isStaff",
      render: (text, record) => (
        <Title level={5}>{record.isStaff ? "Nhân viên" : "Khách hàng"}</Title>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <Button
            className="tag-badge"
            onClick={() => handleAccountStatus(record)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState();

  const handleSearch = async (values) => {
    try {
      if (values.field === "isStaff") {
        if (values.keyword === "Khách hàng") {
          values.keyword = false;
        } else {
          values.keyword = true;
        }
      }
      const res = await axios.post(
        "/api/v1/admin/search-user",
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
                      { value: "name", label: "Tên" },
                      { value: "email", label: "Email" },
                      {
                        value: "isStaff",
                        label: "Phân loại (Nhân viên - Khách hàng)",
                      },
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
              extra={<h6 className="font-semibold m-0">Tài khoản</h6>}
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

export default SearchUser;
