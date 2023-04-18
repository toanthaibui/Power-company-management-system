import React from "react";
import Layout from "../components/Layout";
import Main from "../components/layout/Main";

import "../styles/RegisterStyles.css";
import { Card, Col, Form, Input, Row, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const RegisterStaff = () => {
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/registerstaff", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Đăng ký thành công");
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
    <Main>
      <Card
        bordered={false}
        className="criclebox mb-24"
        title="Tạo tài khoản nhân viên"
      >
        <div className="form-container-staff">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form-staff"
          >
            <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" required />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true }]}
            >
              <Input type="password" required />
            </Form.Item>
            <button className="btn btn-primary" type="submit">
              Đăng ký
            </button>
          </Form>
        </div>
        <br />
        <br />
      </Card>
    </Main>
  );
};

export default RegisterStaff;
