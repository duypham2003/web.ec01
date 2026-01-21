
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'phones', name: 'Điện thoại', icon: 'smartphone' },
  { id: 'laptops', name: 'Laptop', icon: 'laptop_mac' },
  { id: 'components', name: 'Linh kiện', icon: 'memory' },
  { id: 'accessories', name: 'Phụ kiện', icon: 'headset' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Air M2 13-inch 256GB',
    brand: 'APPLE',
    category: 'Laptop',
    price: 24990000,
    oldPrice: 27000000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5e_l2jLxeFoKdm2AYu--SNpUsgBDnTuyM2jWGF3B0wWdOsw7vSXBgGPRg0-xZih0N4vWhazoDDtyz_ipeMCN7Le7CbtM7RLy3TLo4iYSM8I41EMKes4k8p-G64fIL-eyk9vuZevpKon_vE_KrwniputYMCzOndDjS7wk3DCIETdfK9SQo2zu4CLtyWDD9y7wDEOkMg0AFNHvPn5cA_n3oHzqULxvX-g9hzmSEtc-mpLKgs29HyhEqAkVvEV14HH_vFJ6WeGnqt2Y',
    rating: 4.9,
    reviews: 120,
    isNew: true
  },
  {
    id: '2',
    name: 'Nvidia ASUS ROG Strix RTX 4090',
    brand: 'LINH KIỆN',
    category: 'Linh kiện',
    price: 48500000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdS2_orxllFBHEt5xG53UWxxt0SEF2-6_ClWKCEoPHXsvoCDweH91DNhHg-lZmAroVM7_CH3se76alzAhbxdkaM1OHrYwdkF43zOxyVisnqPgT6rnoLfqZ0-pgvalhx2cwN7zNPsTDyVVh_Jg3svBWtSM6YNpXX8DrzoWE-BJPf62FYF5F7XjAtkWZXiFWnSWRKVvsuqJ39Q97GAhZUmCJVVBkyZve9Wm9Hl6wNqgtPKLlbv2IpECfynETl1vz_MOdhdVct292BD8',
    rating: 5.0,
    reviews: 42,
    isHot: true
  },
  {
    id: '3',
    name: 'iPad Pro M2 11-inch WiFi 128GB',
    brand: 'APPLE',
    category: 'Máy tính bảng',
    price: 21490000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFypGGBU6HL_XryFWSBSalIibk8oSH-ssfhC_9Y-08R3KGYC7-guUlqOsGkVMvjFS7uJb5SOP2mY28dI9rjtTmxrUWZCYi6U-_E7RdtIbHXWq4Qf0ui6-z9k2BOybEiAcUPm-2N2VbD0l-rYh1UuxRaDvzMaruAYbEh1nRix62Dn7pNdHzSRQE2zneEkTPXvohHQ8_TuQpnW7TIwUg-wS5pz95fymJD2jcyzV2exoV74sk1C9kuPwDlvSoocNrDxGX_PaC_wJRrEo',
    rating: 4.8,
    reviews: 85
  },
  {
    id: '4',
    name: 'Marshall Major IV Bluetooth',
    brand: 'PHỤ KIỆN',
    category: 'Phụ kiện',
    price: 3490000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCATyd6yjlYY_Bem4oGftcVmwc14tlo5Li3riTDdmYzbaMAW5uhAfj2U_b3egVfgpdltoAYScc9YH5p10_x-2y9zJ34y8Bk7bjOVhbTjlIvECepXgZ9qUOR1L-Ru91LlwFtUM6wHIdNIJl803CxJZ7QNYmlHQBh4x0Jjy1ZN9y_WQrpE2Ed471YoVnEBmQSZdoQa1P2VZDdZwsAprz_o_1qB_wEh0yg-8k31UsQrQ59b632Zw7fRIql_KQ84mEwSkHXxNf7wHXr154',
    rating: 4.7,
    reviews: 56,
    discount: 15
  }
];
