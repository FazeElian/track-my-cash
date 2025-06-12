import {  Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

// Base components
import { Header } from "./components/company/Header"
import { AdminLayout } from "./components/admin/AdminLayout"

// Loading component
import Loading from "./components/admin/Loading"

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
const GoalsView = lazy(() => import("./views/admin/goals/GoalsView"))
const NotificationsView = lazy(() => import("./views/admin/NotificationsView"))
const AccountView = lazy(() => import("./views/admin/account/AccountView"))
const EditAccountInfoView = lazy(() => import("./views/admin/account/EditAccountInfoView"))

export default function Router() {
  return (
    <Suspense fallback={<Loading />}>
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
          <Route path="goals" element={<GoalsView />} />
          <Route path="notifications" element={<NotificationsView />} />
          <Route path="account" element={<AccountView />} />
          <Route path="account/edit" element={<EditAccountInfoView />} />
        </Route>
      </Routes>
    </Suspense>
  )
}