import React, { useEffect, useState } from "react";
import "../../styles/PrintBill.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Main from "../../components/layout/Main";

import Layout from "./../../components/Layout";
import { Button, Card, Col, Row, Table } from "antd";

const BillCustomer = () => {
  const [electric, setElectric] = useState();
  const [staff, setStaff] = useState();
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

  const getStaffById = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getStaffById",
        { staffId: params.staffId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setStaff(res.data.data);
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
    getStaffById();
    getBillByElectric();
  }, []);
  return (
    <Main>
      <h1 className="text-center">
        Hóa Đơn {moment(electric?.date).format("MM-YYYY")}
      </h1>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0"> Chi tiết hóa đơn</h6>]}
            bodyStyle={{ paddingTop: "0" }}
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
        <Col span={12}>
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Thông tin nhân viên </h6>}
            extra={
              <div>
                <Button>Người ghi điện và tạo hóa đơn</Button>
              </div>
            }
          >
            <div>
              <p>
                <b>Họ tên: </b> {staff?.fullName}
              </p>
              <p>
                <b>SĐT: </b> {staff?.phone}
              </p>

              <p>
                <b>Email: </b> {staff?.email}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Main>
  );
};

export default BillCustomer;
