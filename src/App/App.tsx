import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "src/layouts/MainLayout";
import { AdminHomePage } from "src/pages/AdminHomePage";
import { HomePage } from "src/pages/HomePage";
import { LoginPage } from "src/pages/LoginPage";
import { LogoutPage } from "src/pages/LogoutPage/LogoutPage";
import "./App.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
