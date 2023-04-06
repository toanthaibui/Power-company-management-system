import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, message, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { Option } from "antd/es/mentions";

const ProfileCustomer = () => {
  const { user } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  const getDistrict = async () => {
    try {
      const res = await axios.get(
        "https://vapi.vnappmob.com/api/province/district/92"
      );
      setDistrict(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getWard = async (value) => {
    try {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${value}`
      );
      setWard(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const districtName = district.find(
        (item) => item.district_id === values.districtnon
      );
      const wardName = ward.find((item) => item.ward_id === values.wardnon);
      const res = await axios.post(
        "/api/v1/customer/updateProfileCustomer",
        {
          ...values,
          userId: user._id,
          district: districtName.district_name,
          ward: wardName.ward_name,
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
  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerInfo",
        { userId: params.id },
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

  const [prices, setPrices] = useState([]);

  //getUsers
  const getPrices = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllPrices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setPrices(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDistrict();
    getCustomerInfo();
    getPrices();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Thông tin đăng ký lắp đặt điện</h1>
      {customer && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...customer,
          }}
        >
          <h4 className="">Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Họ tên người yêu cầu:"
                name="fullName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Nhập vào họ tên của bạn" />
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Điện thoại di động:"
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
                label="Email:"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Nhập vào email của bạn" />
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Số chứng minh thư/CCCD:"
                name="cccd"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Nhập vào CCCD của bạn" />
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Quận/Huyện:"
                name="districtnon"
                required
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Chọn Quận/Huyện của bạn"
                  onChange={getWard}
                  allowClear
                >
                  {district?.map((item, idx) => (
                    <Option value={item.district_id} key={idx}>
                      {item.district_name}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Phường/Xã:"
                name="wardnon"
                required
                rules={[{ required: true }]}
              >
                <Select placeholder="Chọn Phường/Xã của bạn">
                  {ward.length !== 0 &&
                    ward?.map((item, idx) => (
                      <Option key={idx} value={item.ward_id}>
                        {item.ward_name}
                      </Option>
                    ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Đường/Phố:"
                name="road"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Nhập vào Đường/Phố của bạn" />
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Số nhà:"
                name="numberHouse"
                required
                rules={[{ required: false }]}
              >
                <Input type="text" placeholder="Nhập vào Số nhà của bạn" />
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <FormItem
                label="Mục đích sử dụng:"
                name="purpose"
                required
                rules={[{ required: true }]}
              >
                <Select placeholder="Nhập vào mục đích sử dụng của bạn">
                  {prices?.map((item, idx) => (
                    <Option key={idx} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Đăng ký
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default ProfileCustomer;
