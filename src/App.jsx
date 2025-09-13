import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="" element={<LoginPage />} />
        {/* outras rotas */}
      </Routes>
    </BrowserRouter>
  );
}
