import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Customer } from './pages/customer';
import { Product } from './pages/product';
import { Transactions } from './pages/transactions';
import Layout from './components/Layout';

function App() {
  return (
   
     <Layout>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/product" element={<Product />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
   
    </Layout>
    
  );
}

export default App;