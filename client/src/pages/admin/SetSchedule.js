import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, Input, Row, Select, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const SetSchedule = () => {
  const params = useParams();
  const [staffs, setStaffs] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //
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

  const getStaffs = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllStaffs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setStaffs(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sta = staffs.filter((item) => item._id === params.staffId);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const districtName = district.find(
        (item) => item.district_id === values.districtnon
      );
      const wardName = ward.find((item) => item.ward_id === values.wardnon);
      const info = staffs.find((item) => item._id === params.staffId);
      const res = await axios.post(
        "/api/v1/admin/set-schedule",
        {
          ...values,
          staffId: params.staffId,
          district: districtName.district_name,
          ward: wardName.ward_name,
          fullName: info.fullName,
          phone: info.phone,
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
    getDistrict();
    getStaffs();
  }, []);

  return (
    <Layout>
      <>
        {sta?.map((item, idx) => (
          <>
            <br />
            <div className="card m-5" style={{ cursor: "pointer" }}>
              <div className="card-header text-center">
                <b>Xếp lịch làm việc nhân viên</b>
              </div>
              <div className="card-body">
                <Row>
                  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                    <p>
                      <b>Họ tên: </b> {item.fullName}
                    </p>
                    <p>
                      <b>SĐT: </b> {item.phone}
                    </p>
                    <p>
                      <b>Căn cước công dân: </b> {item.cccd}
                    </p>
                    <p>
                      <b>Email: </b> {item.email}
                    </p>
                    <p>
                      <b>Địa chỉ: </b> {item.address}
                    </p>
                    <p>
                      <b>Chuyên môn: </b> {item.specialization}
                    </p>
                    <p>
                      <b>Trình độ: </b> {item.level}
                    </p>
                    <p>
                      <b>Kinh nghiệm: </b> {item.experience}
                    </p>
                  </Col>
                  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                    <Form
                      layout="vertical"
                      className="m-3"
                      onFinish={handleFinish}
                    >
                      <FormItem
                        label="Ngày bắt đầu"
                        name="begin"
                        required
                        rules={[{ required: true }]}
                      >
                        <Input type="date" placeholder="Chọn ngày bắt đầu" />
                      </FormItem>
                      <FormItem
                        label="Ngày kết thúc"
                        name="end"
                        required
                        rules={[{ required: true }]}
                      >
                        <Input type="date" placeholder="Chọn ngày kết thúc" />
                      </FormItem>
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
                      <button
                        className="btn btn-primary form-btn"
                        type="submit"
                      >
                        Thêm
                      </button>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        ))}
      </>
    </Layout>
  );
};

export default SetSchedule;
