import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./../../components/Layout";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { Col, DatePicker, Input, Row, message } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const SetElectricNote = () => {
  const params = useParams();
  const [customer, setCustomer] = useState();
  const dispatch = useDispatch();

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

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/staff/setElectricNote",
        { ...values, customerId: params.customerId, staffId: params.staffId },
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
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getCustomerInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <>
        <>
          <br />
          <div className="card m-5" style={{ cursor: "pointer" }}>
            <div className="card-header text-center">
              <b>Cập nhật chỉ số điện thàng háng</b>
            </div>
            <div className="card-body">
              <Row>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  {customer && (
                    <div>
                      <p>
                        <b>Họ tên: </b> {customer.fullName}
                      </p>
                      <p>
                        <b>SĐT: </b> {customer.phone}
                      </p>
                      <p>
                        <b>Căn cước công dân: </b> {customer.cccd}
                      </p>
                      <p>
                        <b>Email: </b> {customer.email}
                      </p>
                      <p>
                        <b>Địa chỉ: </b> {customer.numberHouse}, {customer.road}
                        , {customer.ward}, {customer.district}
                      </p>
                      <p>
                        <b>Mục đích sử dụng: </b> {customer.purpose}
                      </p>
                    </div>
                  )}
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <Form
                    layout="vertical"
                    className="m-3"
                    onFinish={handleFinish}
                  >
                    <FormItem
                      label="Thời gian:"
                      name="date"
                      required
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        picker="month"
                        placeholder="Chọn tháng"
                      ></DatePicker>
                    </FormItem>
                    <FormItem
                      label="Chỉ số điện:   "
                      name="score"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input
                        type="text"
                        placeholder="Nhập vào chỉ số điện tháng này"
                      />
                    </FormItem>
                    <button className="btn btn-primary form-btn" type="submit">
                      Ghi điện
                    </button>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </>
      </>
    </Layout>
  );
};

export default SetElectricNote;
