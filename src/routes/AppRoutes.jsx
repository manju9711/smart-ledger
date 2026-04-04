import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ProductList from "../pages/products/ProductList";
import ProductForm from "../pages/products/ProductForm";
import Billing from "../pages/billing/Billing";
import SalesReport from "../pages/reports/SalesReport";
import Settings from "../pages/settings/Settings";
import MainLayout from "../layouts/MainLayout";
import CompanyList from "../pages/company/CompanyList";
import CompanyForm from "../pages/company/CompanyForm";
import EditCompany from "../pages/company/EditCompany";
import TaxList from "../pages/tax/TaxList";
import TaxForm from "../pages/tax/TaxForm";
import Invoice from "../pages/billing/Invoice";
import EditProduct from "../pages/products/EditProduct";
import Reports from "../pages/reports/SalesReport";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/invoice/:invoiceNo" element={<Invoice/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/company" element={<CompanyList />} />
          <Route path="/company/add" element={<CompanyForm />} />
          <Route path="/company/edit/:id" element={<EditCompany />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/reports" element={<Reports />} />

<Route path="/tax" element={<TaxList />} />
<Route path="/tax/add" element={<TaxForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}