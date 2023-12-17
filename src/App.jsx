import { Routes, Route, Outlet } from "react-router-dom";
import RegistrationForm from "./pages/registrationForm";
import Residents from "./pages/residents";
import LoginPage from "./pages/login";
import ResidentLoginPage from "./pages/login/ResidentLogin";
import RegisterPage from "./pages/register";
import LandingPage from "./pages/landingPage/LandingPage";
import ConfirmationPage from "./pages/confimationPage";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ResidentDashboard from "./pages/dashboards/ResidentDashboard";
import AdminLayout from "./layouts/Auth";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/confirmation-page" element={<ConfirmationPage />} />
        <Route path="/resident-registration" element={<RegistrationForm />} />

        {/* Login pages */}
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/resident-login" element={<ResidentLoginPage />} />

        {/* Admin pages */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          }
        >
          <Route path="resident-list-page" element={<RegistrationForm />} />
          <Route path="add-new-resident" element={<Residents />} />
        </Route>

        {/* Resident pages */}
        <Route path="/resident-dashboard" element={<ResidentDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
