import {  Route, Routes } from "react-router-dom"
import { lazy } from "react"

// Base components
import { Header } from "./components/company/Header"
import { AdminLayout } from "./components/admin/AdminLayout"

// Home view
const HomeView = lazy(() => import("./views/HomeView"))

// Users module views
const RegisterView = lazy(() => import("./views/auth/RegisterView"))
const LoginView = lazy(() => import("./views/auth/LoginView"))
const ForgotPasswordView = lazy(() => import("./views/auth/ForgotPasswordView"))
const ConfirmAccountView = lazy(() => import("./views/auth/ConfirmAccountView"))
const ValidateCodeView = lazy(() => import("./views/auth/ValidateCodeView"))
const ResetPasswordView = lazy(() => import("./views/auth/ResetPasswordView"))

// Admin views
const DashboardView = lazy(() => import("./views/admin/DashboardView"))
const CategoriesView = lazy(() => import("./views/admin/categories/CategoriesView"))
const TransactionsView = lazy(() => import("./views/admin/transactions/TransactionsView"))
const NotificationsView = lazy(() => import("./views/admin/NotificationsView"))
const ProfileView = lazy(() => import("./views/admin/ProfileView"))

export default function Router() {
  return (
    <Routes>
      {/* Index */}
      <Route element={<Header />}>
        <Route index element={<HomeView />} />
      </Route>

      {/* Users */}
      <Route path="/auth/register" element={<RegisterView />} />
      <Route path="/auth/login" element={<LoginView />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
      <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
      <Route path="/auth/validate-code" element={<ValidateCodeView />} />
      <Route path="/auth/reset-password/:code" element={<ResetPasswordView />} />

      {/* Admin */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index path="dashboard" element={<DashboardView />} />
        <Route path="categories" element={<CategoriesView />} />
        <Route path="transactions" element={<TransactionsView />} />
        <Route path="notifications" element={<NotificationsView />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>
    </Routes>
  )
}