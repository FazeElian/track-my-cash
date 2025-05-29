import {  Route, Routes } from "react-router-dom"

// Header component for company landing page
import { Header } from "./components/company/Header"

// Home view
import HomeView from "./views/HomeView"

// Users module views
import RegisterView from "./views/auth/RegisterView"
import LoginView from "./views/auth/LoginView"
import ForgotPasswordView from "./views/auth/ForgotPasswordView"
import ConfirmAccountView from "./views/auth/ConfirmAccountView"
import ValidateCodeView from "./views/auth/ValidateCodeView"
import ResetPasswordView from "./views/auth/ResetPasswordView"

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