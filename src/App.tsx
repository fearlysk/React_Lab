import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Cart from "./pages/Products/Cart/Cart";
import ThankYou from "./pages/Products/Cart/ThankYou";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <ErrorBoundary>
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
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}

export default App;
