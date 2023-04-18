import React from "react";
import { adminMenu } from "../Data/data";
import "../styles/LayoutStyle.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  //logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công");
    window.location.reload();
    navigate("/login");
  };

  //Go home
  const goHome = () => {
    navigate("/");
  };

  //user menu
  const userMenu = [
    {
      name: "Trang chủ",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Đăng ký lắp đặt điện",
      path: "/apply-customer",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Chỉ số điện",
      path: `/customer/score-month/${user?._id}`,
      icon: "fa-solid fa-calendar-days",
    },
    {
      name: "Hồ sơ",
      path: `/customer/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Đổi mật khẩu",
      path: "/update-password",
      icon: "fa-solid fa-key",
    },
    {
      name: "Thông báo",
      path: "/notification",
      icon: "fa-solid fa-bell",
    },
  ];

  // ======== Staff Menu
  const staffMenu = [
    {
      name: "Trang chủ",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Lịch làm việc",
      path: `/staff/staff-schedule/${user?._id}`,
      icon: "fa-solid fa-briefcase",
    },
    {
      name: "Ghi điện",
      path: `/staff/electric-note/${user?._id}`,
      icon: "fa-solid fa-bolt",
    },
    {
      name: "Cập nhật hồ sơ",
      path: "/apply-staff",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Hồ sơ",
      path: `/staff/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Đổi mật khẩu",
      path: "/update-password",
      icon: "fa-solid fa-key",
    },
    {
      name: "Thông báo",
      path: "/notification",
      icon: "fa-solid fa-bell",
    },
  ];
  // ======== Staff Menu

  //redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isStaff
    ? staffMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 onClick={goHome} style={{ cursor: "pointer" }}>
                CÔNG TY ĐIỆN CẦN THƠ
              </h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Đăng xuất</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i class="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
