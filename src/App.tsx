import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import CategoryPage from "./pages/Products/CategoryPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

class App extends React.Component {
  render() {
    return (
      <div className="app__wrapper">
        <div className="app__header">
          <Header />
        </div>
        <div className="app__content">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <div className="app__footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
