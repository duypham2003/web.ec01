
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../constants';
import { Product } from '../types';

interface HomeProps {
  addToCart: (product: Product) => void;
  cartCount: number;
}

const BANNERS = [
  {
    id: 'b1',
    title: 'iPhone 15 Pro Max',
    subtitle: 'Khung Titan bền bỉ',
    tag: 'SẢN PHẨM MỚI',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz9gXbwXQpV-SiaA8L_QbSrgl2uqfbZRzWjdziIgCKd0GZ9kS8bHlkefVR7PmCClQNRDQG9z5gFYHDJiIaEigZZuBxpRjGMyxayKZCJEdIvElgcX7Wh67n28IjrywHnAg63pYWWjSY0G0yxV8mjKb6MEzY7Yx_Zqcm7IbRTjTiVPjsj8gU2O6ZzqKzTC5dgViT3AG4zmYh-KheQdeHOKNIzLJ2P48PKmTJOe8UHHRjRc0uuYimNdcjnDmbItx9foUY4e8ydTQN5Mk',
    color: 'from-slate-900 to-slate-800'
  },
  {
    id: 'b2',
    title: 'RTX 4090 Monster',
    subtitle: 'Sức mạnh đồ họa đỉnh cao',
    tag: 'LINH KIỆN HOT',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdS2_orxllFBHEt5xG53UWxxt0SEF2-6_ClWKCEoPHXsvoCDweH91DNhHg-lZmAroVM7_CH3se76alzAhbxdkaM1OHrYwdkF43zOxyVisnqPgT6rnoLfqZ0-pgvalhx2cwN7zNPsTDyVVh_Jg3svBWtSM6YNpXX8DrzoWE-BJPf62FYF5F7XjAtkWZXiFWnSWRKVvsuqJ39Q97GAhZUmCJVVBkyZve9Wm9Hl6wNqgtPKLlbv2IpECfynETl1vz_MOdhdVct292BD8',
    color: 'from-blue-900 to-indigo-950'
  }
];

const Home: React.FC<HomeProps> = ({ addToCart, cartCount }) => {
  const navigate = useNavigate();
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-nav border-b border-white/10 pt-3 pb-2 px-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-primary">TechStore</h1>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 text-slate-300 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] flex items-center justify-center text-white rounded-full font-bold border-2 border-background-dark">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 text-slate-300">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
        
        {/* Horizontal Menu */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-6 pb-2 text-sm font-semibold whitespace-nowrap">
          <span className="text-primary relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full">Trang chủ</span>
          <span className="text-slate-400">Điện thoại</span>
          <span className="text-slate-400">Laptop</span>
          <span onClick={() => navigate('/components')} className="text-slate-400 cursor-pointer">Linh kiện</span>
          <span className="text-slate-400">Phụ kiện</span>
        </div>

        {/* Search */}
        <div className="mt-2">
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 text-slate-400 material-symbols-outlined text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm iPhone, MacBook..." 
              className="w-full bg-surface-dark border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </header>

      {/* Hero Slideshow Banners */}
      <div className="px-4 py-4">
        <div className="relative overflow-hidden rounded-2xl aspect-[21/9] bg-slate-900 shadow-xl border border-white/5">
          <div 
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeBanner * 100}%)` }}
          >
            {BANNERS.map((banner) => (
              <div 
                key={banner.id}
                className={`min-w-full h-full relative flex items-center px-5 bg-gradient-to-r ${banner.color} cursor-pointer`}
                onClick={() => navigate('/components')}
              >
                <div className="relative z-10 w-3/5">
                  <span className="text-primary font-bold text-[9px] tracking-[0.2em] uppercase block mb-1">{banner.tag}</span>
                  <h2 className="text-white text-xl font-bold leading-tight mb-1">{banner.title}</h2>
                  <p className="text-slate-300 text-[10px] opacity-80">{banner.subtitle}</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2/5 flex items-center justify-center p-2">
                   <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="h-4/5 object-contain drop-shadow-2xl scale-125 transform" 
                   />
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-2 left-5 flex gap-1.5">
            {BANNERS.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${activeBanner === idx ? 'w-4 bg-primary' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-2">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-lg font-bold">Danh mục nổi bật</h3>
          <span className="text-primary text-xs font-semibold">Xem tất cả</span>
        </div>
        <div className="grid grid-cols-4 gap-3 px-4">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => navigate('/components')}>
              <div className="w-full aspect-square bg-surface-dark border border-border-dark rounded-2xl flex items-center justify-center text-primary transition-all group-active:scale-90">
                <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              </div>
              <span className="text-[11px] font-medium text-center text-slate-300">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-4">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-lg font-bold">Sản phẩm mới nhất</h3>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-4">
          {PRODUCTS.map(product => (
            <div key={product.id} className="bg-surface-dark border border-border-dark rounded-2xl p-3 flex flex-col shadow-sm group">
              <div 
                className="relative bg-[#1c2326] rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product.image} alt={product.name} className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/60 hover:text-red-500 transition-colors z-10">
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </button>
                {product.isHot && <div className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">HOT</div>}
                {product.discount && <div className="absolute top-2 left-2 bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold">-{product.discount}%</div>}
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wider">{product.brand}</p>
                <h4 
                  className="text-sm font-bold text-white mb-2 line-clamp-2 min-h-[40px] cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h4>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="text-primary font-bold text-sm">{(product.price / 1000000).toFixed(3)}.000đ</span>
                  {product.oldPrice && <span className="text-[10px] text-slate-500 line-through">{(product.oldPrice / 1000000).toFixed(3)}.000đ</span>}
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-all active:scale-90"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
