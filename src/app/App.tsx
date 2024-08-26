import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "src/layouts/AdminLayout";
import { MainLayout } from "src/layouts/MainLayout";
import { AdminHomePage } from "src/pages/AdminHomePage";
import { AdminProductPage } from "src/pages/AdminProductsPage";
import { HomePage } from "src/pages/HomePage";
import { LoginPage } from "src/pages/LoginPage";
import { LogoutPage } from "src/pages/LogoutPage/LogoutPage";
import "./App.css";
import "./Button.css";
import "./Form.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
