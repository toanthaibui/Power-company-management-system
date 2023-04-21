import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
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
} from "antd";
import Main from "../../components/layout/Main";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import FormItem from "antd/es/form/FormItem";

const SearchBill = () => {
  const handleDelete = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/deleteBill",
        { billId: record._id },
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p>{moment(record.createdAt).format("HH:mm-DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="">
          <Link to={`/admin/bill-admin/${record._id}`}>
            <Button className="tag-primary" type="primary">
              Chi tiết hóa đơn
            </Button>
          </Link>
          &nbsp; &nbsp;
          <Button className="tag-badge" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState();

  const handleSearch = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/search-bill",
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
                      { value: "price", label: "Giá" },
                      { value: "createdAt", label: "Thời gian" },
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

export default SearchBill;
