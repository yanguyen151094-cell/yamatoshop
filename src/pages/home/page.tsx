import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { mockProducts } from "../../mocks/products";
import { extraPhones } from "../../mocks/phones";
import ProductCard from "../../components/feature/ProductCard";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

const allProducts = [...mockProducts, ...extraPhones];

const FEATURED_IDS = ["p036", "p003", "2", "3", "p053", "p088", "p006", "4"];
const featuredProducts = FEATURED_IDS.map((id) => allProducts.find((p) => p.id === id)!).filter(Boolean);

const AFFILIATE_IDS = ["6", "4", "p013", "p022", "p007", "p026", "p034", "7"];
const affiliateProducts = AFFILIATE_IDS.map((id) => allProducts.find((p) => p.id === id)!).filter(Boolean);

const MEMBER_IMGS = [
  "https://placehold.co/60x60/eeeeee/999999?text=Anh+9",
  "https://placehold.co/60x60/eeeeee/999999?text=Anh+10",
  "https://placehold.co/60x60/eeeeee/999999?text=Anh+11",
  "https://placehold.co/60x60/eeeeee/999999?text=Anh+12",
  "https://placehold.co/60x60/eeeeee/999999?text=Anh+13",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <img
          src="https://placehold.co/1440x900/eeeeee/999999?text=Hinh+anh+1"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-white text-sm mb-6">
                <i className="ri-medal-line text-amber-400" />
                Hoa hồng lên đến 15% mỗi đơn hàng
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                Mua Sắm
                <span className="block font-light italic">Thông Minh</span>
                <span className="block text-rose-400">Kiếm Tiền Ngay</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                Khám phá hàng nghìn sản phẩm chất lượng cao. Tham gia chương trình affiliate và kiếm hoa hồng từ mỗi giới thiệu thành công.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap text-base">
                  Khám Phá Sản Phẩm <i className="ri-arrow-right-line" />
                </Link>
                <Link to="/affiliate" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap text-base">
                  <i className="ri-medal-line" /> Tham Gia Affiliate
                </Link>
              </div>
              <div className="flex flex-wrap gap-8 mt-12">
                {[{ value: "50K+", label: "Sản phẩm" }, { value: "15K+", label: "Đối tác affiliate" }, { value: "₫2.5 tỷ", label: "Hoa hồng đã trả" }].map((stat) => (
                  <div key={stat.label} className="text-white">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs">Cuộn xuống</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-10">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Danh Mục</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Khám Phá Theo Danh Mục</h2>
            <p className="text-gray-400 text-sm mt-1.5">7 danh mục sản phẩm chất lượng, hoa hồng hấp dẫn lên đến 15%</p>
          </div>
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-4 gap-4" style={{ gridTemplateRows: "250px 250px 210px" }}>
            {/* Điện Thoại — Large 2×2 */}
            <Link to="/dien-thoai" className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src="https://placehold.co/800x600/eeeeee/999999?text=Hinh+anh+2"
                alt="Điện Thoại Di Động"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-all duration-300" />
              <div className="absolute top-5 left-5">
                <div className="w-12 h-12 flex items-center justify-center bg-rose-500 rounded-2xl">
                  <i className="ri-smartphone-line text-white text-xl" />
                </div>
              </div>
              <div className="absolute top-5 right-5">
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full whitespace-nowrap border border-white/20">Sản phẩm riêng</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-rose-500/80 text-white text-xs font-semibold rounded-full whitespace-nowrap">156+ sản phẩm</span>
                      <span className="px-2 py-0.5 bg-emerald-500/80 text-white text-xs font-semibold rounded-full whitespace-nowrap">HH 6–13%</span>
                    </div>
                    <h3 className="text-white text-2xl font-bold leading-tight">Điện Thoại Di Động</h3>
                    <p className="text-white/70 text-sm mt-1">iPhone, Samsung, Xiaomi, OPPO, Vivo, Realme...</p>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-rose-500 transition-all duration-300 flex-shrink-0 ml-3">
                    <i className="ri-arrow-right-line text-white" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 4 small categories */}
            {[
              { to: "/lam-dep", img: "https://placehold.co/400x300/eeeeee/999999?text=Hinh+anh+3", icon: "ri-sparkling-line", color: "bg-pink-500", title: "Làm Đẹp & Chăm Sóc", sub: "Mỹ phẩm, skincare, nước hoa" },
              { to: "/thoi-trang", img: "https://placehold.co/400x300/eeeeee/999999?text=Hinh+anh+4", icon: "ri-t-shirt-line", color: "bg-amber-500", title: "Thời Trang & Phụ Kiện", sub: "Giày dép, túi xách, đồng hồ" },
              { to: "/suc-khoe", img: "https://placehold.co/400x300/eeeeee/999999?text=Hinh+anh+5", icon: "ri-heart-pulse-line", color: "bg-emerald-500", title: "Sức Khỏe & Wellness", sub: "Thực phẩm chức năng, y tế" },
              { to: "/nha-cua", img: "https://placehold.co/400x300/eeeeee/999999?text=Hinh+anh+6", icon: "ri-home-2-line", color: "bg-orange-500", title: "Nhà Cửa & Tiện Ích", sub: "Gia dụng, nội thất, tiện ích" },
            ].map((cat) => (
              <Link key={cat.to} to={cat.to} className="relative rounded-3xl overflow-hidden group cursor-pointer">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:from-black/90 transition-all duration-300" />
                <div className="absolute top-4 left-4">
                  <div className={`w-9 h-9 flex items-center justify-center ${cat.color} rounded-xl`}>
                    <i className={`${cat.icon} text-white text-sm`} />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-sm font-bold">{cat.title}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{cat.sub}</p>
                </div>
              </Link>
            ))}

            {/* Thú Cưng — wide */}
            <Link to="/thu-cung" className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
              <img src="https://placehold.co/800x300/eeeeee/999999?text=Hinh+anh+7" alt="Thú Cưng" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10 group-hover:from-black/85 transition-all duration-300" />
              <div className="absolute top-5 left-5"><div className="w-9 h-9 flex items-center justify-center bg-yellow-500 rounded-xl"><i className="ri-bear-smile-line text-white text-sm" /></div></div>
              <div className="absolute bottom-5 left-5">
                <h3 className="text-white text-lg font-bold">Pet & Thú Cưng</h3>
                <p className="text-white/65 text-sm mt-0.5">Thức ăn, đồ chơi, phụ kiện thú cưng</p>
              </div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-yellow-500 transition-all duration-300"><i className="ri-arrow-right-line text-white" /></div>
            </Link>

            {/* Giáo Dục — wide */}
            <Link to="/giao-duc" className="col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer">
              <img src="https://placehold.co/800x300/eeeeee/999999?text=Hinh+anh+8" alt="Giáo Dục" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10 group-hover:from-black/85 transition-all duration-300" />
              <div className="absolute top-5 left-5"><div className="w-9 h-9 flex items-center justify-center bg-indigo-500 rounded-xl"><i className="ri-graduation-cap-line text-white text-sm" /></div></div>
              <div className="absolute bottom-5 left-5">
                <h3 className="text-white text-lg font-bold">Số & Giáo Dục Online</h3>
                <p className="text-white/65 text-sm mt-0.5">Khóa học, phần mềm, công cụ số</p>
              </div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-indigo-500 transition-all duration-300"><i className="ri-arrow-right-line text-white" /></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Affiliate Banner ── */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 bg-rose-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="text-6xl font-bold mb-2">15%</div>
                <div className="text-rose-100 text-sm mb-1">Hoa Hồng Tối Đa</div>
                <div className="text-xl font-semibold mb-4">Kiếm Tiền Từ Giới Thiệu</div>
                <p className="text-rose-100 text-sm leading-relaxed mb-6">Chia sẻ link affiliate, nhận hoa hồng ngay khi bạn bè mua hàng thành công.</p>
                <Link to="/affiliate" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-500 rounded-full font-semibold text-sm hover:bg-rose-50 transition-all cursor-pointer whitespace-nowrap">
                  Đăng Ký Ngay <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden" style={{ transitionDelay: "150ms" }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="text-6xl font-bold mb-2">15K+</div>
                <div className="text-stone-400 text-sm mb-1">Đối Tác Đang Hoạt Động</div>
                <div className="text-xl font-semibold mb-4">Cộng Đồng Affiliate Lớn Mạnh</div>
                <p className="text-stone-400 text-sm leading-relaxed mb-6">Tham gia cùng hàng nghìn affiliate đang kiếm thu nhập thụ động mỗi ngày.</p>
                <div className="flex items-center gap-3">
                  {MEMBER_IMGS.map((src, i) => (
                    <img key={i} src={src} alt="Member" className="w-10 h-10 rounded-full object-cover object-top border-2 border-stone-700" />
                  ))}
                  <span className="text-stone-400 text-sm ml-1">+14,995 người</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex items-end justify-between mb-10">
            <div>
              <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Sản Phẩm</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Sản Phẩm Nổi Bật</h2>
              <p className="text-gray-400 text-sm mt-1">Tuyển chọn hàng đầu — từ flagship đến best-value</p>
            </div>
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400">
              Xem Tất Cả <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Editorial row 1: hero + 2 horizontal cards */}
          {featuredProducts.length >= 3 && (
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-3 gap-5 mb-5">
              <Link to={`/products/${featuredProducts[0].id}`} className="col-span-1 group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-50 flex flex-col" style={{ minHeight: 460 }}>
                <div className="relative flex-1 overflow-hidden">
                  <img src={featuredProducts[0].image} alt={featuredProducts[0].name} className="w-full h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {featuredProducts[0].badge && (
                    <span className="absolute top-4 left-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full whitespace-nowrap">{featuredProducts[0].badge}</span>
                  )}
                  <span className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">HH {featuredProducts[0].commission}%</span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-1">{featuredProducts[0].category}</p>
                  <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-3 group-hover:text-rose-500 transition-colors">{featuredProducts[0].name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (<i key={i} className={`text-xs ${i < Math.floor(featuredProducts[0].rating) ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-300"}`} />))}
                    <span className="text-xs text-gray-400 ml-1">({featuredProducts[0].reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold text-gray-900">{featuredProducts[0].price.toLocaleString("vi-VN")}₫</span>
                      <span className="block text-xs text-gray-400 line-through">{featuredProducts[0].originalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="w-9 h-9 flex items-center justify-center bg-gray-900 rounded-full text-white group-hover:bg-rose-500 transition-colors flex-shrink-0"><i className="ri-arrow-right-line text-sm" /></div>
                  </div>
                </div>
              </Link>

              <div className="col-span-2 flex flex-col gap-5">
                {featuredProducts.slice(1, 3).map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`} className="group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-50 flex flex-row items-center gap-4 p-4 flex-1">
                    <div className="relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-white">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      {product.badge && <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap leading-tight">{product.badge}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full whitespace-nowrap border border-emerald-100">HH {product.commission}%</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-rose-500 transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (<i key={j} className={`text-[10px] ${j < Math.floor(product.rating) ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-300"}`} />))}
                        <span className="text-[10px] text-gray-400 ml-1">({product.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                        <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Row 2: 5 standard cards */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-5 gap-5">
            {featuredProducts.slice(3, 8).map((product, i) => (
              <div key={product.id} style={{ transitionDelay: `${i * 80}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Affiliate Products ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex items-end justify-between mb-10">
            <div>
              <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">Affiliate Tốt Nhất</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Hoa Hồng Cao – Kiếm Nhiều Hơn</h2>
              <p className="text-gray-400 text-sm mt-1">Top sản phẩm được affiliater chọn nhiều nhất — hoa hồng từ 9% đến 15%</p>
            </div>
            <Link to="/affiliate" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap px-4 py-2 rounded-full">
              <i className="ri-medal-line" /> Tham Gia Ngay
            </Link>
          </div>

          {/* Hero affiliate + 2 stacked */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-4 gap-5 mb-5">
            {affiliateProducts[0] && (
              <Link to={`/products/${affiliateProducts[0].id}`} className="col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer" style={{ minHeight: 280 }}>
                <img src={affiliateProducts[0].image} alt={affiliateProducts[0].name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
                <div className="absolute top-5 right-5">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl">
                    <span className="text-white text-2xl font-black leading-none">{affiliateProducts[0].commission}%</span>
                    <span className="text-white/80 text-[9px] font-medium uppercase tracking-wider">hoa hồng</span>
                  </div>
                </div>
                {affiliateProducts[0].badge && (
                  <span className="absolute top-5 left-5 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full whitespace-nowrap">{affiliateProducts[0].badge}</span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/60 text-xs mb-1">{affiliateProducts[0].category}</p>
                  <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 mb-2">{affiliateProducts[0].name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white text-xl font-extrabold">{affiliateProducts[0].price.toLocaleString("vi-VN")}₫</span>
                      <span className="text-white/50 text-sm ml-2 line-through">{affiliateProducts[0].originalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 rounded-full text-xs font-bold hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-links-line" /> Lấy Link
                    </span>
                  </div>
                </div>
              </Link>
            )}
            <div className="col-span-2 grid grid-rows-2 gap-5">
              {affiliateProducts.slice(1, 3).map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="group relative rounded-3xl overflow-hidden cursor-pointer flex items-center gap-4 bg-white p-4 border border-gray-100">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-extrabold rounded-full whitespace-nowrap">HH {product.commission}%</span>
                      {product.badge && <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-xs font-semibold rounded-full whitespace-nowrap border border-rose-100">{product.badge}</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                      <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-emerald-500 group-hover:text-white transition-all flex-shrink-0">
                    <i className="ri-arrow-right-line text-sm text-gray-600 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom row: 5 affiliate cards */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-5 gap-5">
            {affiliateProducts.slice(3, 8).map((product, i) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-gray-100 hover:border-emerald-200 transition-all" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-emerald-500 text-white text-[11px] font-extrabold rounded-full whitespace-nowrap leading-tight">{product.commission}%</span>
                  </div>
                  {product.badge && <span className="absolute top-3 left-3 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap">{product.badge}</span>}
                </div>
                <div className="p-3.5">
                  <h3 className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (<i key={j} className={`text-[9px] ${j < Math.floor(product.rating) ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-300"}`} />))}
                  </div>
                  <span className="text-sm font-extrabold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
                  <div className="mt-2.5 w-full py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold text-center group-hover:bg-emerald-600 transition-colors whitespace-nowrap">
                    <i className="ri-links-line mr-1" />Lấy Link Affiliate
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Cách Hoạt Động</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Kiếm Tiền Chỉ 4 Bước</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "ri-user-add-line", title: "Đăng Ký", desc: "Tạo tài khoản affiliate miễn phí trong vài phút" },
              { step: "02", icon: "ri-links-line", title: "Lấy Link", desc: "Nhận link affiliate riêng cho mỗi sản phẩm" },
              { step: "03", icon: "ri-share-forward-line", title: "Chia Sẻ", desc: "Chia sẻ link lên mạng xã hội, blog, YouTube..." },
              { step: "04", icon: "ri-money-dollar-circle-line", title: "Nhận Tiền", desc: "Kiếm hoa hồng mỗi khi có đơn hàng thành công" },
            ].map((item, i) => (
              <div key={item.step} className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-rose-50 rounded-2xl mb-4">
                  <i className={`${item.icon} text-2xl text-rose-500`} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{item.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://placehold.co/1440x400/333333/666666?text=Hinh+anh+14"
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bắt đầu kiếm tiền ngay hôm nay</h2>
          <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto">Hơn 15,000 đối tác đang kiếm thu nhập thụ động mỗi ngày. Tại sao không phải bạn?</p>
          <Link to="/affiliate" className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white rounded-full text-base font-bold hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap">
            <i className="ri-medal-line text-lg" /> Tham Gia Miễn Phí Ngay <i className="ri-arrow-right-line text-lg" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
