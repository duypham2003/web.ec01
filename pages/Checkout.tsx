
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  addOrder: (order: Order) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, addOrder }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    province: 'Hà Nội',
    address: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 35000 : 0;
  const discount = subtotal > 10000000 ? 550000 : 0;
  const total = subtotal + shipping - discount;

  const handleOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    const newOrder: Order = {
      id: `TS-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('vi-VN'),
      items: [...cart],
      total: total,
      status: 'processing',
      customerInfo: {
        name: form.name,
        phone: form.phone,
        address: `${form.address}, ${form.province}`,
      },
      paymentMethod: paymentMethod === 'cod' ? 'Tiền mặt' : paymentMethod === 'bank' ? 'Chuyển khoản' : 'Ví điện tử',
    };

    addOrder(newOrder);
    alert("Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.");
    navigate('/orders');
  };

  return (
    <div className="pb-32 min-h-screen bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border-dark flex items-center p-4 justify-between">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-white text-lg font-bold flex-1 text-center font-display uppercase tracking-widest">Thanh toán</h2>
        <div className="w-10"></div>
      </header>

      <div className="p-4 space-y-6">
        {/* 1. Customer Info */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-primary">
            <span className="material-symbols-outlined">person</span>
            <h3 className="font-bold uppercase text-xs tracking-wider">Thông tin khách hàng</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-surface-dark border border-border-dark rounded-xl p-1">
              <input 
                type="text" 
                placeholder="Họ và tên" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-600"
              />
            </div>
            <div className="bg-surface-dark border border-border-dark rounded-xl p-1">
              <input 
                type="tel" 
                placeholder="Số điện thoại" 
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="w-full bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-600"
              />
            </div>
            <div className="bg-surface-dark border border-border-dark rounded-xl p-1">
              <input 
                type="email" 
                placeholder="Email (không bắt buộc)" 
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-600"
              />
            </div>
          </div>
        </section>

        {/* 2. Shipping Address */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-primary">
            <span className="material-symbols-outlined">local_shipping</span>
            <h3 className="font-bold uppercase text-xs tracking-wider">Địa chỉ nhận hàng</h3>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-4 space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 bg-black/20 rounded-lg p-1 border border-white/5">
                <select 
                  value={form.province}
                  onChange={(e) => setForm({...form, province: e.target.value})}
                  className="w-full bg-transparent border-none text-xs text-slate-300 focus:ring-0"
                >
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                  <option>Cần Thơ</option>
                </select>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-1 border border-white/5">
              <textarea 
                placeholder="Địa chỉ cụ thể (Số nhà, tên đường, phường/xã...)" 
                rows={2}
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-600 resize-none"
              />
            </div>
          </div>
        </section>

        {/* 3. Payment Methods */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-primary">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <h3 className="font-bold uppercase text-xs tracking-wider">Phương thức thanh toán</h3>
          </div>
          <div className="space-y-3">
            {[
              { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: 'payments' },
              { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: 'account_balance' },
              { id: 'wallet', name: 'Ví điện tử (Momo, ZaloPay)', icon: 'account_balance_wallet' },
            ].map((method) => (
              <button 
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  paymentMethod === method.id 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-surface-dark border-border-dark text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">{method.icon}</span>
                  <span className="text-sm font-semibold">{method.name}</span>
                </div>
                {paymentMethod === method.id && (
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Order Summary */}
        <section className="bg-surface-dark border border-border-dark rounded-2xl p-4">
          <h3 className="font-bold text-sm mb-4 border-b border-white/5 pb-2">Tóm tắt đơn hàng</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-slate-400">{item.name} x{item.quantity}</span>
                <span>{((item.price * item.quantity) / 1000000).toFixed(3)}.000đ</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Tạm tính</span>
              <span>{(subtotal / 1000000).toFixed(3)}.000đ</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Phí vận chuyển</span>
              <span>35.000đ</span>
            </div>
            <div className="flex justify-between text-primary font-bold pt-2 text-lg">
              <span>Tổng cộng</span>
              <span>{(total / 1000000).toFixed(3)}.000đ</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 pb-8 glass-nav border-t border-white/10 z-[60]">
        <button 
          onClick={handleOrder}
          className="w-full bg-primary text-white font-bold h-14 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          XÁC NHẬN ĐẶT HÀNG <span className="material-symbols-outlined">shopping_bag</span>
        </button>
        <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-4 opacity-30"></div>
      </div>
    </div>
  );
};

export default Checkout;
