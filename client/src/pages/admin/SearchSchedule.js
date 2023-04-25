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

const SearchSchedule = () => {
  //handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { staffId: record._id, userId: record.userId, status: status },
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
      title: "Nhân viên",
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
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialization",
      render: (text, record) => (
        <div className="avatar-info">
          <Title level={5}>{record.specialization}</Title>
          <p>{record.level}</p>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <Link to={`/admin/schedule/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Xem Lịch làm việc
            </Button>
          </Link>
          &nbsp; &nbsp;
          <Link to={`/admin/schedule/setschedule/${record._id}`}>
            <Button className="">Xếp lịch</Button>
          </Link>
        </div>
      ),
    },
  ];
  const [data, setData] = useState();

  const handleSearch = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/search-staff",
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
                      { value: "address", label: "Địa chỉ" },
                      { value: "level", label: "Trình độ" },
                      { value: "specialization", label: "Chuyên môn" },
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
              extra={<h6 className="font-semibold m-0">Nhân viên</h6>}
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

export default SearchSchedule;
