import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import UserProvider from "./utils/UserContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Header />
        <div className="app__content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/products" element={<Products />}>
                  <Route path=":category" element={<Products />} />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
