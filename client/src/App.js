import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterStaff from "./pages/RegisterStaff";
import ApplyStaff from "./pages/ApplyStaff";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Staffs from "./pages/admin/Staffs";
import Profile from "./pages/staff/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import StaffAppointments from "./pages/staff/StaffAppointments";
import UpdatePassword from "./pages/customer/UpdatePassword";
import ApplyCustomer from "./pages/ApplyCustomer";
import Customers from "./pages/admin/Customers";
import ProfileCustomer from "./pages/customer/ProfileCustomer";
import Print from "./pages/Print";
import Purpose from "./pages/admin/Purpose";
import Schedule from "./pages/admin/Schedule";
import SetSchedule from "./pages/admin/SetSchedule";
import UpdateSchedule from "./pages/admin/UpdateSchedule";
import StaffSchedule from "./pages/staff/StaffSchedule";
import ElectricNote from "./pages/staff/ElectricNote";
import SetElectricNote from "./pages/staff/SetElectricNote";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-staff"
              element={
                <ProtectedRoute>
                  <ApplyStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/staffs"
              element={
                <ProtectedRoute>
                  <Staffs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/purpose"
              element={
                <ProtectedRoute>
                  <Purpose />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/schedule"
              element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/staff-schedule/:userId"
              element={
                <ProtectedRoute>
                  <StaffSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile/:id"
              element={
                <ProtectedRoute>
                  <ProfileCustomer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/book-appointment/:staffId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/electric-note/:userId"
              element={
                <ProtectedRoute>
                  <ElectricNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/set-electric-note/:customerId/:staffId"
              element={
                <ProtectedRoute>
                  <SetElectricNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registerstaff"
              element={
                <ProtectedRoute>
                  <RegisterStaff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/print/:id"
              element={
                <ProtectedRoute>
                  <Print />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/schedule/setschedule/:staffId"
              element={
                <ProtectedRoute>
                  <SetSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/schedule/updateschedule/:id"
              element={
                <ProtectedRoute>
                  <UpdateSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff-appointments"
              element={
                <ProtectedRoute>
                  <StaffAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply-customer"
              element={
                <ProtectedRoute>
                  <ApplyCustomer />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
