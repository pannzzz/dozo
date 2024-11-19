import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HowToPage from './pages/HowToPage';
import Login from './pages/Login';
import Register from './pages/Register';
import FindGiftPage from './pages/FindGiftPage';
import Carrito from './components/carritocomponent';
import MoreDetails from './components/MoreDetails';
import Pagos from './pages/pagos';
import MisPedidos from './components/MisPedidos';
import { CartProvider } from './components/CartContext';
import { FilterProvider } from './components/FilterContext'; // Importa el contexto de filtros
import DetallesPedido from './pages/DetallesPedido';
import './App.css';

const App = () => {
  return (
    <CartProvider>
      <FilterProvider> {/* Proveedor del filtro */}
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/howto" element={<HowToPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/findgift" element={<FindGiftPage />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/pagos" element={<Pagos />} />
              <Route path="/detalles/:id" element={<MoreDetails />} />
              <Route path="/mispedidos" element={<MisPedidos />} />
              <Route path="/detalles-pedido/:id" element={<DetallesPedido />} />
            </Routes>
          </div>
        </Router>
      </FilterProvider>
    </CartProvider>
  );
};

export default App;
