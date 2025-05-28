import {  Route, Routes } from "react-router-dom"

// Header component for company landing page
import { Header } from "./components/company/Header"

// Home view
import HomeView from "./views/HomeView"

export default function Router() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route index element={<HomeView />} />
      </Route>
    </Routes>
  )
}