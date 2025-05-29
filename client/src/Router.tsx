import {  Route, Routes } from "react-router-dom"
import { lazy } from "react"

// Header component for company landing page
import { Header } from "./components/company/Header"

// Home view
const HomeView = lazy(() => import("./views/HomeView"))

// Users module views
const RegisterView = lazy(() => import("./views/auth/RegisterView"))
const LoginView = lazy(() => import("./views/auth/LoginView"))
const ForgotPasswordView = lazy(() => import("./views/auth/ForgotPasswordView"))
const ConfirmAccountView = lazy(() => import("./views/auth/ConfirmAccountView"))
const ValidateCodeView = lazy(() => import("./views/auth/ValidateCodeView"))
const ResetPasswordView = lazy(() => import("./views/auth/ResetPasswordView"))

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
    </Routes>
  )
}