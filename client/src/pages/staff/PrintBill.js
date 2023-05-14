import React, { useEffect, useRef, useState } from "react";
import "../../styles/PrintBill.css";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const PrintBill = () => {
  const componentRef = useRef();
  const [electric, setElectric] = useState();
  const [customer, setCustomer] = useState();
  const { user } = useSelector((state) => state.user);

  const params = useParams();

  const getElectricInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/staff/getElectricInfo",
        { electricId: params.electricId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setElectric(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerById",
        { customerId: params.customerId },
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Print success"),
  });

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    getElectricInfo();
    getCustomerInfo();
  }, []);
  if (user?.isStaff) {
    return (
      <>
        <button
          className="btn btn-primary print"
          style={{ margin: 20 }}
          onClick={handlePrint}
        >
          In hóa đơn
        </button>
        <div className="ticket timenew" ref={componentRef}>
          <h8>
            Ngày tạo hóa đơn: {moment(electric?.updatedAt).format("DD-MM-YYYY")}
          </h8>
          <br />
          <br />
          <p className="text-center">
            Công ty điện Cần Thơ
            <br />
            Địa chỉ: Xuân Khánh, Ninh Kiều
            <br />
            <b>HÓA ĐƠN TIỀN ĐIỆN</b>
            <br />
            <b>{moment(electric?.date).format("MM-YYYY")}</b>
          </p>
          <p>
            Khách hàng: {customer?.fullName}
            <br />
            Địa Chỉ: {customer?.numberHouse}, {customer?.road}, {customer?.ward}
            , {customer?.district}
            <br />
          </p>
          <table className="tablebill">
            <thead className="tablebill">
              <tr className="tablebill">
                <th className="quantity tablebill">Chỉ số</th>
                <th className="description tablebill">Hình thức</th>
                <th className="price tablebill">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="quantity tablebill">{electric?.score}</td>
                <td className="description tablebill">{customer?.purpose}</td>
                <td className="price tablebill">
                  {VND.format(electric?.price / electric?.score)}
                </td>
              </tr>
              <tr>
                <td className="quantity tablebill"></td>
                <td className="description tablebill">Tổng </td>
                <td className="price tablebill">
                  {VND.format(electric?.price)}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <br />
          <p>Liên hệ số điện thoại 123456 nếu có vấn đề</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button
          className="btn btn-primary print"
          style={{ margin: 20 }}
          onClick={handlePrint}
        >
          Xem hóa đơn
        </button>
        <div className="ticket timenew" ref={componentRef}>
          <h8>
            Ngày tạo hóa đơn: {moment(electric?.updatedAt).format("DD-MM-YYYY")}
          </h8>
          <br />
          <br />
          <p className="text-center">
            Công ty điện Cần Thơ
            <br />
            Địa chỉ: Xuân Khánh, Ninh Kiều
            <br />
            <b>HÓA ĐƠN TIỀN ĐIỆN</b>
            <br />
            <b>{moment(electric?.date).format("MM-YYYY")}</b>
          </p>
          <p>
            Khách hàng: {customer?.fullName}
            <br />
            Địa Chỉ: {customer?.numberHouse}, {customer?.road}, {customer?.ward}
            , {customer?.district}
            <br />
          </p>
          <table className="tablebill">
            <thead className="tablebill">
              <tr className="tablebill">
                <th className="quantity tablebill">Chỉ số</th>
                <th className="description tablebill">Hình thức</th>
                <th className="price tablebill">Giá</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="quantity tablebill">{electric?.score}</td>
                <td className="description tablebill">{customer?.purpose}</td>
                <td className="price tablebill">
                  {VND.format(electric?.price / electric?.score)}
                </td>
              </tr>
              <tr>
                <td className="quantity tablebill"></td>
                <td className="description tablebill">Tổng </td>
                <td className="price tablebill">
                  {VND.format(electric?.price)}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <br />
          <p>Liên hệ số điện thoại 123456 nếu có vấn đề</p>
        </div>
      </>
    );
  }
};

export default PrintBill;
