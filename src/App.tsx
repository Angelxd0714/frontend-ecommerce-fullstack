import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Customer } from './pages/customer';
import { ProductComponent } from './pages/product';
import { Transactions } from './pages/transactions';
import { Checkout } from './pages/checkout-card';
import { CheckoutSummary } from './pages/checkout-summary';
import Layout from './components/Layout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCarrito } from './store/slices/productSlice';
import { loadTransaction } from './store/slices/transactionSlice';
import { Result } from './pages/result';
import { NotFound } from './pages/not-found';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCarrito());
    dispatch(loadTransaction());
   
  }, [dispatch]);
  return (
   
     <Layout>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerCheckout" element={<Customer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductComponent />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/checkout-summary" element={<CheckoutSummary />} />
        <Route path="/payment-success" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
   
    </Layout>
    
  );
}

export default App;