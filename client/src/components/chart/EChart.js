/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const EChart = ({ total }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { Title, Paragraph } = Typography;

  const pr = total?.price;

  const sum = total?.sum;

  const monthnew = total?.monthnew;

  const items = [
    {
      Title: sum?.map(function (e) {
        return VND.format(e.totalAmount);
      }),
      user: "Tổng doanh thu",
    },
    {
      Title: sum?.map(function (e) {
        return e.count;
      }),
      user: "Số hóa đơn",
    },
    {
      Title: monthnew?.map(function (e) {
        return VND.format(e.totalAmount);
      }),
      user: monthnew?.map(function (e) {
        return "Tháng " + e._id.month + "/" + e._id.year;
      }),
    },
    {
      Title: monthnew?.map(function (e) {
        return e.count;
      }),
      user: "Số hóa đơn",
    },
  ];

  const eChart = {
    series: [
      {
        name: "Doanh thu",
        data: pr?.map(function (e) {
          return e.totalAmount;
        }),
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: pr?.map(function (e) {
          return e._id.month + "/" + e._id.year;
        }),
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return VND.format(val);
          },
        },
      },
    },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Thống kê doanh thu</Title>
        <br /> <br />
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default EChart;
