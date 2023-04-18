import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import Main from "../../components/layout/Main";

import { Button, Card, Col, message, Row, Table } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const BillDetail = () => {
  const [electric, setElectric] = useState();
  const [customer, setCustomer] = useState();
  const [bill, setBill] = useState();
  const [staff, setStaff] = useState();

  const params = useParams();
  const getBillByDetail = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getBillByDetail",
        { billId: params.billId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setBill(res.data.bill);
        setStaff(res.data.staff);
        setCustomer(res.data.customer);
        setElectric(res.data.electric);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillByDetail();
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Main>
      <Row gutter={[24, 0]} className="m-5">
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Thông tin khách hàng</h6>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            extra={<span>Người nhận</span>}
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
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông tin hóa đơn</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
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
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Thông tin nhân viên</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            extra={<span>Người tạo</span>}
          >
            <div>
              <p>
                <b>Họ tên: </b> {staff?.fullName}
              </p>
              <p>
                <b>SĐT: </b> {staff?.phone}
              </p>
              <p>
                <b>Căn cước công dân: </b> {staff?.cccd}
              </p>
              <p>
                <b>Email: </b> {staff?.email}
              </p>
              <p>
                <b>Địa chỉ: </b> {staff?.address}
              </p>
              <p>
                <b>Chuyên môn: </b> {staff?.specialization}
              </p>
              <p>
                <b>Trình độ: </b> {staff?.level}
              </p>
              <p>
                <b>Kinh nghiệm: </b> {staff?.experience}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default BillDetail;
