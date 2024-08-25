import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout } from "src/layouts/MainLayout";
import { HomePage } from "src/pages/HomePage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

