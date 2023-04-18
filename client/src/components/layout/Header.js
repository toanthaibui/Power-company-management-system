import { useEffect } from "react";

import { Row, Col, Breadcrumb, Badge, Dropdown, List, Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const Header = ({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => window.scrollTo(0, 0));

  const not = user?.notification;
  const menu = (
    <div style={{ padding: "5%", backgroundColor: "silver" }}>
      <List
        min-width="100%"
        className="header-notifications-dropdown "
        itemLayout="horizontal"
        dataSource={not}
        renderItem={(item) => (
          <List.Item>
            <span>{item.message}</span>
          </List.Item>
        )}
      />
      <Link to="/notification" style={{ color: "black" }}>
        <b>Xem tất cả</b>
      </Link>
    </div>
  );

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Home</NavLink>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item> */}
          </Breadcrumb>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small" count={user && user.notification.length}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="/notification"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {bell}
              </a>
            </Dropdown>
          </Badge>
          <Input
            className="header-search"
            placeholder="Nhập vào từ khóa..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};

export default Header;
