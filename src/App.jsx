import { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Checkout from "./components/Checkout";
import ProductView from "./components/ProductView";

const App = () => {


  const [basketData, setBasketData] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [orderError, setOrderError] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    const { data: products } = await commerce.products.list({ limit: 200 });
    const { data: categories } = await commerce.categories.list({ limit: 50 });
    const productsPerCategory = categories.reduce((acc, category) => {
      return [
        ...acc,
        {
          ...category,
          productsData: products.filter((product) =>
              product.categories.find((cat) => cat.id === category.id)
          ),
        },
      ];
    }, []);

    setCategories(productsPerCategory);
  };

  const fetchBasketData = async () => {
    const response = await commerce.cart.retrieve();
    setBasketData(response);
  };
  const addProduct = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setBasketData(response);
  };

  const RemoveItemFromBasket = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setBasketData(response);
  };
  const handleEmptyBasket = async () => {
    const response = await commerce.cart.empty();
    setBasketData(response);
  };

  const updateProduct = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setBasketData(response);
  };

  const refreshBasket = async () => {
    const newBasketData = await commerce.cart.refresh();
    setBasketData(newBasketData);
  };

  const handleCheckout = async (checkoutId, orderData) => {
    try {
      setOrderInfo(orderData);

      refreshBasket();
    } catch (error) {
      setOrderError(
          (error.data && error.data.error && error.data.error.message) ||
          "An error occurred"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBasketData();

  }, []);

  window.dataLayer = window.dataLayer || []

  return (
      <Router>
        <div>
          <CssBaseline />
          <NavBar
              basketItems={basketData?.total_unique_items}
              totalCost={
                  (basketData?.subtotal &&
                      basketData?.subtotal.formatted_with_symbol) ||
                  "00.00"
              }
          />
          <Routes>
            <Route exact path="/" element={<Products categories={categories} addProduct={addProduct} />}/>
            <Route exact path="/basket" element={
              <Basket
                  basketData={basketData}
                  updateProduct={updateProduct}
                  handleEmptyBasket={handleEmptyBasket}
                  RemoveItemFromBasket={RemoveItemFromBasket}
              />}/>

            <Route exact path="/checkout" element={
              <Checkout
                  orderInfo={orderInfo}
                  orderError={orderError}
                  basketData={basketData}
                  handleCheckout={handleCheckout}
              />}/>

            <Route exact path="/product-view/:id" element={
              <ProductView addProduct={addProduct}/>}/>
          </Routes>

          <Footer />
        </div>
      </Router>
  );
};

export default App;