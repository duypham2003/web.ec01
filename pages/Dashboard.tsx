
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';
import { PRODUCTS } from '../constants';

interface DashboardProps {
  orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const navigate = useNavigate();

  // Metrics Calculations
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const aov = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  // Bar Chart Data (Product by category)
  const categoryCount = PRODUCTS.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(categoryCount) as number[]);

  return (
    <div className="pb-32 min-h-screen bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-border-dark flex items-center p-4 justify-between">
        <h2 className="text-white text-lg font-bold flex-1 font-display uppercase tracking-widest">Hệ thống Dashboard</h2>
        <button className="flex size-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">refresh</span>
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* AOV Card */}
        <section className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 size-32 bg-white/10 rounded-full blur-3xl"></div>
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Giá trị đơn hàng TB (AOV)</p>
          <h3 className="text-3xl font-bold text-white tracking-tighter">
            {(aov / 1000000).toFixed(3)}.000đ
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +12%
            </span>
            <span className="text-white/50 text-[10px]">So với tháng trước</span>
          </div>
        </section>

        {/* Top 3 Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-dark border border-border-dark p-4 rounded-2xl">
            <span className="material-symbols-outlined text-primary mb-2">shopping_bag</span>
            <p className="text-slate-500 text-[10px] font-bold uppercase">Tổng đơn hàng</p>
            <p className="text-xl font-bold text-white">{orders.length}</p>
          </div>
          <div className="bg-surface-dark border border-border-dark p-4 rounded-2xl">
            <span className="material-symbols-outlined text-green-500 mb-2">inventory_2</span>
            <p className="text-slate-500 text-[10px] font-bold uppercase">Sản phẩm</p>
            <p className="text-xl font-bold text-white">{PRODUCTS.length}</p>
          </div>
        </div>

        {/* Product Distribution Bar Chart */}
        <section className="bg-surface-dark border border-border-dark rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider">Phân bổ sản phẩm</h3>
            <span className="text-[10px] text-slate-500">Theo danh mục</span>
          </div>
          <div className="flex items-end justify-between h-40 gap-4 pt-4">
            {Object.entries(categoryCount).map(([cat, count]: [string, any]) => (
              <div key={cat} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/20 rounded-t-lg relative group" 
                  style={{ height: `${(count / maxCount) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary">
                    {count}
                  </div>
                  <div className="absolute inset-0 bg-primary opacity-40 rounded-t-lg group-hover:opacity-80 transition-opacity"></div>
                </div>
                <span className="text-[9px] text-slate-500 font-bold rotate-45 origin-left whitespace-nowrap mt-2">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Revenue Pie Chart (CSS simulation) */}
        <section className="bg-surface-dark border border-border-dark rounded-2xl p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Cơ cấu doanh thu</h3>
          <div className="flex items-center gap-8">
            <div 
              className="size-32 rounded-full shadow-inner border-[12px] border-white/5"
              style={{ 
                background: `conic-gradient(#158dc1 0% 65%, #22c55e 65% 85%, #f59e0b 85% 100%)` 
              }}
            ></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-500 font-bold">LAPTOP</p>
                  <p className="text-xs font-bold">65%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-500 font-bold">ĐIỆN THOẠI</p>
                  <p className="text-xs font-bold">20%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-500 font-bold">KHÁC</p>
                  <p className="text-xs font-bold">15%</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
