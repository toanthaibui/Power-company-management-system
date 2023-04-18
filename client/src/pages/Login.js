import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message,
} from "antd";
import signinbg from "../assets/images/bia.jpg";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import logo from "../assets/images/logo.png";
import axios from "axios";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("api/v1/user/login", values);
      //   window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Đăng nhập thành công");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <img className="m-1" width="50" height="50" src={logo} alt="" />
          <div className="header-col header-brand m-2">
            <h2>CÔNG TY ĐIỆN CẦN THƠ</h2>
          </div>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">
                  <Button>
                    <b>Đăng nhập</b>
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/register">
                  <Button>
                    <b>Đăng ký</b>
                  </Button>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Title className="mb-15">Đăng nhập</Title>
              <Title className="font-regular text-muted" level={5}>
                Nhập vào email và mật khẩu của bạn
              </Title>
              <Form
                onFinish={onfinishHandler}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
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
                  className="username"
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Nhập vào địa chỉ email của bạn!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Ghi nhớ
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Chưa có tài khoản?{" "}
                  <Link to="/register" className="text-dark font-bold">
                    Đăng ký
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <b className="copyright"> Copyright © 2023 by Bùi Thái Toàn </b>
        </Footer>
      </Layout>
    </>
  );
};

export default Login;
