import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import StaffList from "../components/StaffList";
const HomePage = () => {
  const [staffs, setStaffs] = useState([]);
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllStaffs",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setStaffs(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>{staffs && staffs.map((staff) => <StaffList staff={staff} />)}</Row>
    </Layout>
  );
};

export default HomePage;
