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
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const DonutChartArea = ({ total }) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { Title, Paragraph } = Typography;

  const customer = total?.price_area;

  const donutChart = {
    series:
      customer?.map(function (e) {
        return e.totalAmount;
      }) || [],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: customer?.map(function (e) {
        return e._id.district;
      }),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê doanh thu theo Quận/Huyện</Title>
        </div>
      </div>
      <br />
      <br />
      <ReactApexChart
        options={donutChart.options}
        series={donutChart.series}
        type="donut"
        height={380}
        width={"100%"}
      />
    </>
  );
};

export default DonutChartArea;
