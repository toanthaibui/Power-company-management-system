import React from "react";
import Layout from "../components/Layout";

import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
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
    <Layout>
      <h1 className="text-center">Tài Khoản Nhân Viên</h1>
      <>
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
      </>
    </Layout>
  );
};

export default RegisterStaff;
