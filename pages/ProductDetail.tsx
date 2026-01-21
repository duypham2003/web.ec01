
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  addToCart: (product: Product) => void;
  cartCount: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart, cartCount }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // For demo purposes, we'll find by ID or use a default one
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  return (
    <div className="pb-32">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-4 glass-nav border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xs font-bold uppercase tracking-widest opacity-80">Chi tiết sản phẩm</h2>
        <div className="flex gap-2">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
          <button 
            onClick={() => navigate('/cart')}
            className="relative flex items-center justify-center size-10 rounded-full hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-primary text-[10px] flex items-center justify-center rounded-full text-white font-bold">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative px-4 py-2">
        <div className="relative aspect-square">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <div className="size-1.5 rounded-full bg-white/30"></div>
            <div className="size-1.5 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-primary/30">Mới nhất 2024</span>
          <span className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
            <span className="material-symbols-outlined text-sm">star</span> {product.rating} ({product.reviews} đánh giá)
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2 leading-tight uppercase">{product.name}</h1>
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-bold text-primary tracking-tighter">{(product.price / 1000000).toFixed(3)}.000₫</p>
          {product.oldPrice && <p className="text-sm text-slate-400 line-through">{(product.oldPrice / 1000000).toFixed(3)}.000₫</p>}
        </div>
      </div>

      {/* Config Sections */}
      <div className="px-4 mt-8 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-primary mb-1">memory</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">CPU</p>
            <p className="text-xs font-semibold">M2/A17</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-primary mb-1">developer_board</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">GPU</p>
            <p className="text-xs font-semibold">RTX/Neural</p>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
            <span className="material-symbols-outlined text-primary mb-1">monitor</span>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Screen</p>
            <p className="text-xs font-semibold">OLED/Retina</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-70">Cấu hình RAM</h3>
          <div className="flex gap-3">
            <button className="flex-1 py-3 px-4 rounded-xl border-2 border-primary bg-primary/10 text-primary text-sm font-bold">8GB Unified</button>
            <button className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-slate-400 text-sm font-bold">16GB Unified</button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10">
        <h3 className="text-lg font-bold mb-3">Mô tả sản phẩm</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Phiên bản 2024 mang đến hiệu suất vượt trội cùng thiết kế mỏng nhẹ tinh tế. Khung nhôm nguyên khối bền bỉ kết hợp cùng hệ thống tản nhiệt thông minh mang lại trải nghiệm làm việc và giải trí tuyệt vời.
        </p>
      </div>

      {/* Bottom Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 pb-8 glass-nav border-t border-white/10 z-[60] flex gap-4">
        <button 
          onClick={() => addToCart(product)}
          className="flex items-center justify-center size-14 border border-primary/30 rounded-2xl text-primary active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
        <button 
          onClick={() => { addToCart(product); navigate('/cart'); }}
          className="flex-1 bg-primary text-white font-bold rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
        >
          <span className="text-sm uppercase tracking-wider">MUA NGAY</span>
          <span className="text-[10px] opacity-80 font-normal">Chuyển đến thanh toán</span>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
