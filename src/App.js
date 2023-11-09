import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./component/layout/Layout";
import ProductList from "./product/productlist/ProductList";
import CreateProduct from "./product/createproduct/CreateProduct";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import EditProduct from "./product/editproduct/EditProduct";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/edit/:productId" element={<EditProduct />} />
          </Routes>
        </Layout>
      </Provider>
    </Router>
  );
}

export default App;
