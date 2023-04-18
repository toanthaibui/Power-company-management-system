import React, { useEffect, useState } from "react";
import "../../styles/PrintBill.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Layout from "./../../components/Layout";
import { Button, Card, Col, Row, Table } from "antd";
import Main from "../../components/layout/Main";

const Bill = () => {
  const [electric, setElectric] = useState();
  const [customer, setCustomer] = useState();
  const [bill, setBill] = useState();

  const params = useParams();

  const getElectricInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getElectricInfo",
        { electricId: params.electricId },
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

  const getBillByElectric = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getBillByElectric",
        { electricId: params.electricId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setBill(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerById",
        { customerId: params.customerId },
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

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getElectricInfo();
    getCustomerInfo();
    getBillByElectric();
  }, []);
  return (
    <Main>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0"> Chi tiết hóa đơn</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            {" "}
            <div>
              <p>
                <b>Ngày tạo hóa đơn: </b>{" "}
                {moment(bill?.updatedAt).format("DD-MM-YYYY")}
              </p>
              <p>
                <b>Ngày ghi điện: </b>
                {moment(electric?.date).format("DD-MM-YYYY")}
              </p>
              <p>
                <b>Chỉ số điện: </b> {electric?.score} kWh
              </p>
              <p>
                <b>Giá dịch vụ: </b> {VND.format(bill?.price / electric?.score)}
              </p>
              <p>
                <b>Tổng thanh toán: </b> {VND.format(bill?.price)}
              </p>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Thông tin khách hàng </h6>}
          >
            <div>
              <p>
                <b>Họ tên: </b> {customer?.fullName}
              </p>
              <p>
                <b>SĐT: </b> {customer?.phone}
              </p>
              <p>
                <b>Căn cước công dân: </b> {customer?.cccd}
              </p>
              <p>
                <b>Email: </b> {customer?.email}
              </p>
              <p>
                <b>Địa chỉ: </b> {customer?.numberHouse}, {customer?.road},{" "}
                {customer?.ward}, {customer?.district}
              </p>
              <p>
                <b>Mục đích sử dụng: </b> {customer?.purpose}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default Bill;
