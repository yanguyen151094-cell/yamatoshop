import { RouteObject } from "react-router-dom";
import HomePage from "../pages/home/page";
import ProductsPage from "../pages/products/page";
import ProductDetailPage from "../pages/product-detail/page";
import AffiliatePage from "../pages/affiliate/page";
import CartPage from "../pages/cart/page";
import ContactPage from "../pages/contact/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/detail/page";
import PaymentPage from "../pages/payment/page";
import PolicyPage from "../pages/policy/page";
import DienThoaiPage from "../pages/dien-thoai/page";
import LamDepPage from "../pages/lam-dep/page";
import SucKhoePage from "../pages/suc-khoe/page";
import ThuCungPage from "../pages/thu-cung/page";
import ThoiTrangPage from "../pages/thoi-trang/page";
import NhaCuaPage from "../pages/nha-cua/page";
import GiaoDucPage from "../pages/giao-duc/page";
import DonHangPage from "../pages/don-hang/page";
import NotFound from "../pages/NotFound";

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:id", element: <ProductDetailPage /> },
  { path: "/dien-thoai", element: <DienThoaiPage /> },
  { path: "/lam-dep", element: <LamDepPage /> },
  { path: "/suc-khoe", element: <SucKhoePage /> },
  { path: "/thu-cung", element: <ThuCungPage /> },
  { path: "/thoi-trang", element: <ThoiTrangPage /> },
  { path: "/nha-cua", element: <NhaCuaPage /> },
  { path: "/giao-duc", element: <GiaoDucPage /> },
  { path: "/affiliate", element: <AffiliatePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/don-hang", element: <DonHangPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/policy", element: <PolicyPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
