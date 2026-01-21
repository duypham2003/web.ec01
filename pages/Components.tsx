
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

interface ComponentsProps {
  cartCount: number;
}

const Components: React.FC<ComponentsProps> = ({ cartCount }) => {
  const navigate = useNavigate();
  const componentProducts = PRODUCTS.filter(p => p.category === 'Linh kiện' || p.brand === 'LINH KIỆN');

  return (
    <div className="pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-white/10">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-white flex size-10 items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <h2 className="text-white text-lg font-bold flex-1 text-center font-display uppercase tracking-wider">Linh kiện điện tử</h2>
          <div className="flex w-10 items-center justify-end">
            <button onClick={() => navigate('/cart')} className="relative flex size-10 items-center justify-center text-white">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
        
        <div className="px-4 pb-3 space-y-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span onClick={() => navigate('/')} className="hover:text-primary transition-colors cursor-pointer">Trang chủ</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Linh kiện</span>
          </nav>
          
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-slate-400 material-symbols-outlined text-xl">search</span>
            <input 
              type="text" 
              placeholder="Tìm CPU, RAM, GPU..." 
              className="w-full bg-surface-dark border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar items-center">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-lg bg-primary/20 border border-primary px-4 text-primary text-sm font-bold">Tất cả</button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-lg bg-surface-dark border border-border-dark px-4 text-white text-sm">CPU <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span></button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-lg bg-surface-dark border border-border-dark px-4 text-white text-sm">GPU <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span></button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-1 rounded-lg bg-surface-dark border border-border-dark px-4 text-white text-sm">RAM <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span></button>
        </div>
      </header>

      {/* Product List */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-surface-dark px-4 py-2 rounded-xl border border-border-dark text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-primary text-xl">swap_vert</span> Sắp xếp
            </button>
            <button className="flex items-center gap-2 bg-surface-dark px-4 py-2 rounded-xl border border-border-dark text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-primary text-xl">filter_alt</span> Bộ lọc
            </button>
          </div>
          <p className="text-slate-400 text-xs">124 sản phẩm</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {componentProducts.map(p => (
            <div key={p.id} className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark flex flex-col" onClick={() => navigate(`/product/${p.id}`)}>
              <div className="relative aspect-square w-full bg-[#1e1e1e]">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-4" />
                {p.isNew && <div className="absolute top-3 left-3 bg-primary text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">New</div>}
                <button className="absolute top-3 right-3 size-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-lg text-white">favorite</span>
                </button>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase">{p.brand}</p>
                <h4 className="text-white text-sm font-bold mt-1 line-clamp-2 leading-snug">{p.name}</h4>
                <div className="flex items-center mt-2 gap-1">
                  <span className="material-symbols-outlined text-yellow-500 text-xs fill-1">star</span>
                  <span className="text-xs text-slate-300 font-medium">{p.rating}</span>
                </div>
                <div className="mt-auto pt-3">
                  <p className="text-primary font-bold text-base">{(p.price / 1000000).toFixed(3)}.000đ</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components;
