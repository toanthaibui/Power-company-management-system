import React from "react";
import { useNavigate } from "react-router-dom";

const StaffList = ({ staff }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/staff/book-appointment/${staff._id}`)}
      >
        <div className="card-header">
          Dr. {staff.firstName} {staff.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {staff.specialization}
          </p>
          <p>
            <b>Experience</b> {staff.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {staff.level}
          </p>
        </div>
      </div>
    </>
  );
};

export default StaffList;
