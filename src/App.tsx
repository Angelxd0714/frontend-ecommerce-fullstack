import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Customer } from './pages/customer';
import { ProductComponent } from './pages/product';
import { Transactions } from './pages/transactions';
import { Checkout } from './pages/checkout';
import Layout from './components/Layout';

function App() {
  return (
   
     <Layout>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerCheckout" element={<Customer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductComponent />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
   
    </Layout>
    
  );
}

export default App;