import { Routes, Route } from "react-router-dom";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Categories from "../pages/admin/Categories";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={<h1>Smart Click Computers</h1>}
      />

      {/* Admin Login */}
      <Route
        path="/admin/login"
        element={<Login />}
      />

      {/* Protected Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;