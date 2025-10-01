import { BrowserRouter as Router, Routes, Route } from "react-router";

import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import Home from "./pages/Dashboard/Home";
import Customers from "./pages/Dashboard/Customers";
import Products from "./pages/Dashboard/Products";
import Sales from "./pages/Dashboard/Sales";
import Benefits from "./pages/OtherPage/Benefits";

export default function App() {
  return (
    <>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
