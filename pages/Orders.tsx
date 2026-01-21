
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const navigate = useNavigate();

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return { text: 'Đang xử lý', color: 'text-yellow-500 bg-yellow-500/10' };
      case 'shipped': return { text: 'Đang giao', color: 'text-blue-500 bg-blue-500/10' };
      case 'delivered': return { text: 'Đã giao', color: 'text-green-500 bg-green-500/10' };
      case 'cancelled': return { text: 'Đã hủy', color: 'text-red-500 bg-red-500/10' };
      default: return { text: 'N/A', color: 'text-slate-500 bg-slate-500/10' };
    }
  };

  return (
    <div className="pb-32 min-h-screen bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border-dark flex items-center p-4 justify-between">
        <button onClick={() => navigate('/')} className="flex size-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">home</span>
        </button>
        <h2 className="text-white text-lg font-bold flex-1 text-center font-display uppercase tracking-widest">Đơn hàng của tôi</h2>
        <div className="w-10"></div>
      </header>

      {/* Tabs Filter */}
      <div className="flex gap-4 px-4 py-3 overflow-x-auto no-scrollbar border-b border-white/5">
        <button className="text-primary text-xs font-bold whitespace-nowrap border-b-2 border-primary pb-2">Tất cả</button>
        <button className="text-slate-500 text-xs font-bold whitespace-nowrap pb-2">Đang xử lý</button>
        <button className="text-slate-500 text-xs font-bold whitespace-nowrap pb-2">Đã giao</button>
        <button className="text-slate-500 text-xs font-bold whitespace-nowrap pb-2">Đã hủy</button>
      </div>

      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">assignment_late</span>
            <p className="font-bold">Bạn chưa có đơn hàng nào</p>
            <button onClick={() => navigate('/')} className="text-primary mt-2 text-sm">Bắt đầu mua sắm ngay</button>
          </div>
        ) : (
          orders.map((order) => {
            const status = getStatusText(order.status);
            return (
              <div key={order.id} className="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-sm">
                {/* Order Meta */}
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{order.id}</p>
                    <p className="text-[10px] text-slate-500">{order.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${status.color}`}>
                    {status.text}
                  </span>
                </div>

                {/* Items Preview */}
                <div className="p-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="size-12 bg-black/20 rounded-lg shrink-0 p-1">
                        <img src={item.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-semibold truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-300">{(item.price / 1000000).toFixed(3)}.000đ</p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex justify-between items-center">
                  <div className="text-[10px] text-slate-400">
                    <p>PTTT: {order.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500">Tổng cộng</p>
                    <p className="text-sm font-bold text-primary">{(order.total / 1000000).toFixed(3)}.000đ</p>
                  </div>
                </div>
                
                <div className="px-4 py-2 flex gap-2 border-t border-white/5">
                    <button className="flex-1 py-2 text-[10px] font-bold text-slate-400 border border-border-dark rounded-lg hover:bg-white/5 transition-colors">
                        Xem chi tiết
                    </button>
                    {order.status === 'processing' && (
                        <button className="flex-1 py-2 text-[10px] font-bold text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                            Hủy đơn
                        </button>
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
