import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import axios from "axios";
import { Card, Col, Row, Typography } from "antd";
import Echart from "../../components/chart/EChart";
import LineChart from "../../components/chart/LineChart";
import DonutChart from "../../components/chart/DonutChart";
import DonutChartPurpose from "../../components/chart/DonutChartPurpose";
import DonutChartStatus from "../../components/chart/DonutChartStatus";
import EChartArea from "../../components/chart/EChartArea";
import DonutChartArea from "../../components/chart/DonutChartArea";

const Statistical = () => {
  const [total, setTotal] = useState([]);
  const getTotal = async () => {
    try {
      const res = await axios.get("/api/v1/admin/total", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setTotal(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const count = [
    {
      today: "Tổng số khách hàng",
      title: total.customer,
      icon: "fa-solid fa-user-group",
    },
    {
      today: "Tổng số nhân viên",
      title: total.staff,
      icon: "fa-solid fa-user-gear",
    },
    {
      today: "Tổng số tài khoản",
      title: total.user,
      icon: "fa-solid fa-user-large",
    },
    {
      today: "Tổng số hóa đơn",
      title: total.bill,
      icon: "fa-solid fa-money-bill",
    },
  ];
  const { Title, Text } = Typography;

  return (
    <Main>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>{c.title}</Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">
                        <i className={c.icon}></i>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChartArea total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <DonutChartArea total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <DonutChart total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <DonutChartPurpose total={total} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <DonutChartStatus total={total} />
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default Statistical;
