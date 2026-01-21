
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 35000 : 0;
  const discount = subtotal > 10000000 ? 550000 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border-dark flex items-center p-4 justify-between">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold flex-1 text-center font-display uppercase tracking-widest">Giỏ hàng</h2>
        <div className="w-10"></div>
      </header>

      {/* Item List */}
      <main className="flex-1 overflow-y-auto pb-[280px]">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] p-8 text-center opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">shopping_cart_off</span>
            <p className="text-lg font-bold">Giỏ hàng của bạn đang trống</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 text-primary font-bold flex items-center gap-2"
            >
              Tiếp tục mua sắm <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-surface-dark border border-border-dark rounded-xl p-3 flex gap-4">
                <div className="size-24 rounded-lg bg-[#252525] shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-white text-sm font-bold line-clamp-2 leading-snug pr-2">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-500">
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                    <p className="text-primary font-bold text-sm mt-1">{(item.price / 1000000).toFixed(3)}.000đ</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Số lượng</p>
                    <div className="flex items-center bg-black/40 rounded-lg border border-border-dark overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-white/10"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="px-3 text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-white/10"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex flex-col items-center gap-4 pt-4">
              <button 
                onClick={() => navigate('/')}
                className="text-slate-400 text-sm font-medium flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span> Tiếp tục mua sắm
              </button>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                Thanh toán ngay <span className="material-symbols-outlined">payments</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Checkout Summary Footer */}
      {cart.length > 0 && (
        <section className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-nav border-t border-border-dark z-50">
          <div className="p-4 space-y-2 text-sm border-b border-border-dark/50">
            <div className="flex justify-between items-center text-slate-400">
              <span>Tổng tiền hàng ({cart.reduce((a, b) => a + b.quantity, 0)} món)</span>
              <span className="text-white">{(subtotal / 1000000).toFixed(3)}.000đ</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Phí vận chuyển</span>
              <span className="text-white">35.000đ</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between items-center text-slate-400">
                <span>Giảm giá</span>
                <span className="text-green-500">-{(discount / 1000).toFixed(0)}.000đ</span>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-medium">Tổng thanh toán</span>
                <span className="text-primary text-xl font-bold">{(total / 1000000).toFixed(3)}.000đ</span>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="bg-primary hover:bg-primary/90 active:scale-95 transition-all text-white px-8 h-12 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Thanh toán <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
            <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2 opacity-30"></div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
