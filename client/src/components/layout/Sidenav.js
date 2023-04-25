import { Menu, message } from "antd";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidenav = ({ color }) => {
  const { user } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Đăng xuất thành công");
    window.location.reload();
    Navigate("/login");
  };

  const getCustomerInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/customer/getCustomerInfo",
        { userId: user._id },
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

  useEffect(() => {
    getCustomerInfo();
    // eslint-disable-next-line
  }, []);

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
      name: "Hóa đơn",
      path: `/customer/score-month/${user?._id}/${customer?._id}`,
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

  const adminMenu = [
    {
      name: "Trang chủ",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Quản lý nhân viên",
      path: "/admin/staffs",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Quản lý tài khoản",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Quản lý khách hàng",
      path: "/admin/customers",
      icon: "fa-solid fa-users",
    },
    {
      name: "Quản lý giá điện",
      path: "/admin/purpose",
      icon: "fa-solid fa-money-bill-transfer",
    },
    {
      name: "Quản lí hóa đơn",
      path: "/admin/bill-admin",
      icon: "fa-solid fa-money-bill",
    },
    {
      name: "Thống kê",
      path: "/admin/statistical",
      icon: "fa-solid fa-calculator",
    },
    {
      name: "Lịch làm việc",
      path: "/admin/schedule-staff",
      icon: "fa-solid fa-calendar-days",
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
    {
      name: "Tài khoản nhân viên",
      path: "/registerstaff",
      icon: "fa-solid fa-plus",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isStaff
    ? staffMenu
    : userMenu;

  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Công ty Điện Cần Thơ</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {SidebarMenu.map((menu) => {
          return (
            <>
              <Menu.Item>
                <NavLink to={menu.path}>
                  <span
                    className="icon"
                    style={{
                      background: page === "dashboard" ? color : "",
                    }}
                  >
                    <i className={menu.icon}></i>
                  </span>

                  <span className="label">{menu.name}</span>
                </NavLink>
              </Menu.Item>
            </>
          );
        })}
        <div onClick={handleLogout}>
          <Menu.Item>
            <NavLink to="/login">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>

              <span className="label">Đăng xuất</span>
            </NavLink>
          </Menu.Item>
        </div>
      </Menu>
    </>
  );
};

export default Sidenav;
