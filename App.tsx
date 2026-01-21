
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Components from './pages/Components';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import { CartItem, Product, Order } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const hideBottomNav = location.pathname === '/checkout';

  return (
    <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-background-dark overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cartCount={cartCount} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} cartCount={cartCount} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/components" element={<Components cartCount={cartCount} />} />
          <Route path="/checkout" element={<Checkout cart={cart} addOrder={addOrder} />} />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/dashboard" element={<Dashboard orders={orders} />} />
        </Routes>
      </div>

      {/* Bottom Tab Bar */}
      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-nav border-t border-white/10 px-4 py-2 pb-6 z-50">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className={`flex flex-col items-center gap-1 flex-1 ${location.pathname === '/' ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-[9px] font-bold">Trang chủ</span>
            </button>
            <button 
              onClick={() => navigate('/components')}
              className={`flex flex-col items-center gap-1 flex-1 ${location.pathname === '/components' ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">category</span>
              <span className="text-[9px] font-medium">Danh mục</span>
            </button>
            <button 
              onClick={() => navigate('/orders')}
              className={`flex flex-col items-center gap-1 flex-1 ${location.pathname === '/orders' ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">assignment</span>
              <span className="text-[9px] font-medium">Đơn hàng</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className={`flex flex-col items-center gap-1 flex-1 ${location.pathname === '/dashboard' ? 'text-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-[9px] font-medium">Dashboard</span>
            </button>
            <button className="flex flex-col items-center gap-1 flex-1 text-slate-500">
              <span className="material-symbols-outlined">person</span>
              <span className="text-[9px] font-medium">Cá nhân</span>
            </button>
          </div>
          <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-3 opacity-30"></div>
        </nav>
      )}
    </div>
  );
};

export default App;
