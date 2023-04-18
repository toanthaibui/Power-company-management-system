import { Card, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import Layout from "./../../components/Layout";
import Main from "../../components/layout/Main";

import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/customer/update-password",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Đổi mật khẩu thành công");
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
      <Card bordered={false} className="criclebox mb-24" title="Đổi mật khẩu">
        <div className="form-container-staff">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="register-form-staff"
          >
            <FormItem
              label="Mật khẩu hiện tại"
              name="password"
              rules={[{ required: true }]}
            >
              <Input type="password" required />
            </FormItem>
            <FormItem
              label="Mật khẩu mới"
              name="newpassword"
              rules={[{ required: true }]}
            >
              <Input type="password" required />
            </FormItem>
            <FormItem
              label="Nhập lại mật khẩu mới"
              name="newpasswordcheck"
              rules={[{ required: true }]}
            >
              <Input type="password" required />
            </FormItem>
            <button className="btn btn-primary" type="submit">
              Đổi mật khẩu
            </button>
          </Form>
        </div>
        <br />
        <br />
      </Card>
    </Main>
  );
};

export default UpdatePassword;
