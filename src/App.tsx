import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Loader from "./components/UI/Loader/Loader";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const Products = lazy(() => import("./pages/Products/Products"));
const Cart = lazy(() => import("./pages/Products/Cart/Cart"));
const ThankYou = lazy(() => import("./pages/Products/Cart/ThankYou"));
const About = lazy(() => import("./pages/About/About"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/products" element={<Products />}>
                  <Route path=":category" element={<Products />} />
                </Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/thanks" element={<ThankYou />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default App;
