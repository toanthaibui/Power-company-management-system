import React from "react";
import Layout from "./../components/Layout";
import Main from "../components/layout/Main";
import { Card, message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      window.location.reload();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //delete notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      window.location.reload();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  return (
    <Main>
      <Card bordered={false} className="criclebox  mb-24" title="Thông báo">
        <Tabs>
          <Tabs.TabPane tab="Chưa xem" key={0}>
            <div className="d-flex justify-content-end">
              <h4
                className="p-2 text-primary"
                onClick={handleMarkAllRead}
                style={{ cursor: "pointer" }}
              >
                Đánh dấu tất cả đã đọc
              </h4>
            </div>
            {user?.notification.map((notificationMgs) => (
              <div className="card" style={{ cursor: "pointer" }}>
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  <p>{notificationMgs.message}</p>
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã xem" key={1}>
            <div className="d-flex justify-content-end">
              <h4
                className="p-2 text-danger"
                onClick={handleDeleteAllRead}
                style={{ cursor: "pointer" }}
              >
                Xóa tất cả
              </h4>
            </div>
            {user?.seennotification.map((notificationMgs) => (
              <Card style={{ cursor: "pointer" }}>
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  <p>{notificationMgs.message}</p>
                </div>
                <p></p>
              </Card>
            ))}
          </Tabs.TabPane>
        </Tabs>
        <br />
        <br />
      </Card>
    </Main>
  );
};

export default NotificationPage;
