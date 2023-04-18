import React from "react";
import {
  Layout,
  Menu,
  Button,
  Card,
  Form,
  Input,
  Checkbox,
  message,
  Typography,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
const { Title } = Typography;

const { Header, Footer, Content } = Layout;
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Đăng ký thành công");
        navigate("/login");
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
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="3">
                <Link to="/login">
                  <Button>
                    <b>Đăng nhập</b>
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/register">
                  <Button>
                    <b>Đăng ký</b>
                  </Button>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Công Ty Điện Cần Thơ</Title>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h2 className="text-center">Đăng Ký</h2>}
            bordered="false"
          >
            <Form name="basic" onFinish={onfinishHandler} className="row-col">
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Nhập vào tên của bạn!" }]}
              >
                <Input type="text" placeholder="Tên" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Nhập vào địa chỉ email của bạn!",
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Nhập vào mật khẩu!" }]}
              >
                <Input type="password" placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  Tôi đồng ý với các{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Điều khoản và Điều kiện
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="font-bold text-dark">
                Đăng nhập
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <p className="copyright"> Copyright © 2023 by Bùi Thái Toàn. </p>
        </Footer>
      </div>
    </>
  );
};

export default Register;
