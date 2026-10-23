
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";

import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Weddings from "../pages/Weddings";
import WeddingDetail from "../pages/WeddingDetail";

function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/bodas" element={<Weddings />} />
          <Route path="/bodas/:slug" element={<WeddingDetail />} />
          <Route path="/conocenos" element={<Portfolio />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
