import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, message, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

const ApplyStaff = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-staff",
        { ...values, userId: user._id },
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
      message.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Thông tin nhân viên</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details</h4>
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
              <Input type="text" placeholder="Nhập vào số điện thoại của bạn" />
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
              <Input type="text" placeholder="Nhập vào chuyện môn của bạn" />
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
                <Option value="Phổ thông">Phổ thông</Option>
                <Option value="Trung cấp">Trung cấp</Option>
                <Option value="Cao đẳng">Cao đẳng</Option>
                <Option value="Đại học">Đại học</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Cập nhật
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyStaff;
