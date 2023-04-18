import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Button, Card, Col, message, Row, Table } from "antd";
import Main from "../../components/layout/Main";

import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const BillAdmin = () => {
  const [bills, setBills] = useState([]);
  const getBills = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllBills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setBills(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    getBills();
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
  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Quản lý hóa đơn"
            >
              <div className="table-responsive">
                <Table
                  className="ant-border-space"
                  columns={columns}
                  dataSource={bills}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default BillAdmin;
