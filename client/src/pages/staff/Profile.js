import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, message, Select, Card } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import Main from "../../components/layout/Main";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [staff, setStaff] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/staff/updateProfile",
        {
          ...values,
          userId: user._id,
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  // update doc ==========

  // update staff

  // getStaff Details
  const getStaffInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getStaffInfo",
        { userId: params.id },
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

  useEffect(() => {
    getStaffInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Main>
      <Card
        bordered={false}
        className="criclebox  mb-24"
        title="Hồ sơ thông tin nhân viên"
      >
        {staff && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className=""
            initialValues={{
              ...staff,
            }}
          >
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Họ và tên: "
                  name="fullName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Nhập vào họ tên của bạn" />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Điện thoại di động: "
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    type="text"
                    placeholder="Nhập vào số điện thoại của bạn"
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Số chứng minh thư/CCCD: "
                  name="cccd"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Nhập vào CCCD của bạn" />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Email: "
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Nhập vào email của bạn" />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Địa chỉ: "
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Nhập vào địa chỉ của bạn" />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Chuyên môn: "
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input
                    type="text"
                    placeholder="Nhập vào chuyện môn của bạn"
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Kinh nghiệm: "
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <TextArea
                    type="text"
                    placeholder="Nhập kinh nghiệm của bạn"
                    rows={4}
                  />
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <FormItem
                  label="Trình độ: "
                  name="level"
                  required
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn trình độ của bạn">
                    <Option>Phổ thông</Option>
                    <Option>Trung cấp</Option>
                    <Option>Cao đẳng</Option>
                    <Option>Đại học</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  Cập nhật
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Card>
    </Main>
  );
};

export default Profile;
