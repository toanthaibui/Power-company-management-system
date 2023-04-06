import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./../../components/Layout";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { Col, Input, Row } from "antd";

const SetElectricNote = () => {
  const params = useParams();
  return (
    <Layout>
      <h1 className="text-center">Ghi điện</h1>
      <br />
      <Row>
        <Col xs={{ span: 5, offset: 9 }}>
          <Form layout="vertical" className="m-3">
            <FormItem
              label="Tên dịch vụ"
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nhập tên dịch vụ" />
            </FormItem>
            <FormItem
              label="Giá dịch vụ"
              name="price"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Nhập tên dịch vụ" />
            </FormItem>
            <button className="btn btn-primary form-btn" type="submit">
              Thêm
            </button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default SetElectricNote;
