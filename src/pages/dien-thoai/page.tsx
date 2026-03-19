import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockProducts } from "../../mocks/products";
import { extraPhones } from "../../mocks/phones";
import { extraPhones2 } from "../../mocks/phones2";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import OrderPhoneModal from "./components/OrderPhoneModal";
import { useCart } from "../../context/CartContext";

const BRANDS = [
  { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
  { id: "apple", name: "Apple", icon: "ri-apple-line" },
  { id: "samsung", name: "Samsung", icon: "ri-smartphone-line" },
  { id: "xiaomi", name: "Xiaomi / POCO", icon: "ri-smartphone-line" },
  { id: "oppo", name: "OPPO", icon: "ri-smartphone-line" },
  { id: "vivo", name: "Vivo", icon: "ri-smartphone-line" },
  { id: "realme", name: "Realme", icon: "ri-smartphone-line" },
];

const PRICE_RANGES = [
  { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
  { id: "under5", label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { id: "5to10", label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { id: "10to20", label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { id: "20to30", label: "20 - 30 triệu", min: 20000000, max: 30000000 },
  { id: "over30", label: "Trên 30 triệu", min: 30000000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Phổ Biến Nhất" },
  { value: "price-asc", label: "Giá Thấp Đến Cao" },
  { value: "price-desc", label: "Giá Cao Đến Thấp" },
  { value: "newest", label: "Mới Nhất" },
  { value: "rating", label: "Đánh Giá Cao" },
];

const HIGHLIGHT_FEATURES = [
  { icon: "ri-shield-check-line", label: "Bảo hành 12 tháng", color: "text-emerald-600" },
  { icon: "ri-truck-line", label: "Giao hàng toàn quốc", color: "text-rose-500" },
  { icon: "ri-exchange-line", label: "Đổi trả 30 ngày", color: "text-amber-500" },
  { icon: "ri-secure-payment-line", label: "Thanh toán an toàn", color: "text-indigo-500" },
];

const PAGE_SIZE = 12;

const allPhoneProducts = [
  ...mockProducts.filter((p) => p.category === "Điện Thoại Di Động"),
  ...extraPhones,
  ...extraPhones2,
];

function matchBrand(name: string, brandId: string): boolean {
  const n = name.toLowerCase();
  switch (brandId) {
    case "apple":   return n.includes("iphone");
    case "samsung": return n.includes("samsung");
    case "xiaomi":  return n.includes("xiaomi") || n.includes("redmi") || n.includes("poco");
    case "oppo":    return n.includes("oppo");
    case "vivo":    return n.includes("vivo");
    case "realme":  return n.includes("realme");
    default:        return true;
  }
}

interface SelectedPhone {
  name: string;
  price: number;
}

function MobileCard({
  product,
  onOrder,
}: {
  product: (typeof mockProducts)[0];
  onOrder: (name: string, price: number) => void;
}) {
  const navigate = useNavigate();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const getBrand = (name: string) => {
    if (name.toLowerCase().includes("iphone"))  return "Apple";
    if (name.toLowerCase().includes("samsung")) return "Samsung";
    if (name.toLowerCase().includes("poco"))    return "POCO";
    if (name.toLowerCase().includes("xiaomi") || name.toLowerCase().includes("redmi")) return "Xiaomi";
    if (name.toLowerCase().includes("oppo"))    return "OPPO";
    if (name.toLowerCase().includes("vivo"))    return "Vivo";
    if (name.toLowerCase().includes("realme"))  return "Realme";
    return "";
  };

  const getSpecs = (name: string) => {
    const specs: string[] = [];
    if (name.includes("5G"))    specs.push("5G");
    if (name.includes("Pro"))   specs.push("Pro");
    if (name.includes("Ultra")) specs.push("Ultra");
    if (name.includes("Plus") || name.includes("+")) specs.push("Plus");
    if (name.includes("128GB")) specs.push("128GB");
    if (name.includes("256GB")) specs.push("256GB");
    if (name.includes("512GB")) specs.push("512GB");
    return specs.slice(0, 3);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image — click to navigate */}
      <div
        className="relative bg-gray-50 overflow-hidden cursor-pointer"
        style={{ paddingBottom: "80%" }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
              -{discount}%
            </span>
          )}
        </div>
        {/* Commission */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
            HH {product.commission}%
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-rose-500">{getBrand(product.name)}</span>
          <div className="flex items-center gap-0.5">
            <i className="ri-star-fill text-amber-400 text-xs" />
            <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>
        {/* Name — click to navigate */}
        <h3
          className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-rose-500 transition-colors"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {getSpecs(product.name).map((spec) => (
            <span
              key={spec}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-base font-bold text-gray-900">
                {product.price.toLocaleString("vi-VN")}₫
              </div>
              <div className="text-xs text-gray-400 line-through">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </div>
            </div>
            <span className="text-xs text-gray-400">Đã bán {product.sold.toLocaleString()}</span>
          </div>

          {/* Order button — completely independent, no Link parent */}
          <button
            type="button"
            onClick={() => onOrder(product.name, product.price)}
            className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <i className="ri-shopping-bag-3-line" />
            Đặt Hàng Ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DienThoaiPage() {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [orderModal, setOrderModal] = useState<SelectedPhone | null>(null);

  const mobileProducts = useMemo(() => allPhoneProducts, []);

  const filtered = useMemo(() => {
    let list = [...mobileProducts];
    if (selectedBrand !== "all") {
      list = list.filter((p) => matchBrand(p.name, selectedBrand));
    }
    const priceRange = PRICE_RANGES.find((r) => r.id === selectedPrice);
    if (priceRange && priceRange.id !== "all") {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "popular":    list.sort((a, b) => b.sold - a.sold); break;
    }
    return list;
  }, [mobileProducts, selectedBrand, selectedPrice, sortBy]);

  const displayed = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (type: "brand" | "price", value: string) => {
    if (type === "brand") setSelectedBrand(value);
    else setSelectedPrice(value);
    setVisibleCount(PAGE_SIZE);
  };

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mobileProducts.length };
    mobileProducts.forEach((p) => {
      const n = p.name.toLowerCase();
      if (n.includes("iphone"))                                       counts.apple   = (counts.apple   || 0) + 1;
      else if (n.includes("samsung"))                                 counts.samsung = (counts.samsung || 0) + 1;
      else if (n.includes("xiaomi") || n.includes("redmi") || n.includes("poco")) counts.xiaomi  = (counts.xiaomi  || 0) + 1;
      else if (n.includes("oppo"))                                    counts.oppo    = (counts.oppo    || 0) + 1;
      else if (n.includes("vivo"))                                    counts.vivo    = (counts.vivo    || 0) + 1;
      else if (n.includes("realme"))                                  counts.realme  = (counts.realme  || 0) + 1;
    });
    return counts;
  }, [mobileProducts]);

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      {/* Order Modal */}
      {orderModal && (
        <OrderPhoneModal
          productName={orderModal.name}
          productPrice={orderModal.price}
          onClose={() => setOrderModal(null)}
        />
      )}

      {/* Hero Banner */}
      <div className="relative pt-16 overflow-hidden">
        <div className="h-56 w-full relative" style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)" }}>
          <img
            src="https://readdy.ai/api/search-image?query=collection%20of%20flagship%20smartphones%20iPhone%20Samsung%20Xiaomi%20displayed%20beautifully%20on%20dark%20navy%20blue%20gradient%20background%20with%20soft%20lighting%20premium%20tech%20photography%20arrangement&width=1440&height=400&seq=300&orientation=landscape"
            alt="Điện thoại di động"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-white transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-white">Điện Thoại Di Động</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Điện Thoại Di Động</h1>
            <p className="text-white/70 text-sm">
              <strong className="text-white">{mobileProducts.length}</strong> sản phẩm &bull; iPhone, Samsung, Xiaomi, OPPO, Vivo, Realme
            </p>
            {/* Feature badges */}
            <div className="flex items-center gap-6 mt-4">
              {HIGHLIGHT_FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 flex items-center justify-center ${f.color}`}>
                    <i className={`${f.icon} text-sm`} />
                  </div>
                  <span className="text-white/80 text-xs whitespace-nowrap">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-3">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleFilterChange("brand", brand.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  selectedBrand === brand.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${brand.icon} text-sm`} />
                </div>
                {brand.name}
                <span className={`text-xs ${
                    selectedBrand === brand.id ? "text-white/60" : "text-gray-400"
                  }`}
                >
                  ({brandCounts[brand.id] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 sticky top-36">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-filter-3-line text-rose-500" />
                </div>
                Lọc Theo Giá
              </h3>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => handleFilterChange("price", range.id)}
                    className={`flex items-center gap-2.5 text-sm py-1.5 cursor-pointer transition-colors text-left whitespace-nowrap ${
                      selectedPrice === range.id
                        ? "text-rose-500 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedPrice === range.id
                          ? "border-rose-500 bg-rose-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPrice === range.id && (
                        <i className="ri-check-line text-white text-xs" />
                      )}
                    </span>
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Compare highlight */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="bg-rose-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center text-rose-500">
                      <i className="ri-gift-line text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-rose-600">Ưu Đãi Hôm Nay</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Hoàn tiền 5% khi mua điện thoại qua affiliate link của bạn
                  </p>
                </div>
              </div>

              {/* CTA order */}
              <button
                onClick={() => setOrderModal({ name: "", price: 0 })}
                className="w-full mt-4 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <i className="ri-phone-line" />
                Tư Vấn Ngay
              </button>

              {/* Reset */}
              <button
                onClick={() => {
                  setSelectedBrand("all");
                  setSelectedPrice("all");
                  setSortBy("popular");
                  setVisibleCount(PAGE_SIZE);
                }}
                className="w-full mt-2 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đặt Lại Bộ Lọc
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Sort row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                  <i className="ri-smartphone-line" />
                </div>
                <span className="text-sm text-gray-500">
                  Hiển thị <strong className="text-gray-700">{displayed.length}</strong>
                  <span className="text-gray-400"> / </span>
                  <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sắp xếp:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE); }}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Flash Sale banner */}
            <div className="bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl p-5 mb-6 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 flex items-center justify-center text-white">
                    <i className="ri-flashlight-line text-sm" />
                  </div>
                  <span className="text-white font-bold text-sm">Flash Sale Hôm Nay</span>
                </div>
                <p className="text-white/90 text-xs">Giảm đến 30% + đặt hàng trực tiếp không qua trung gian</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/20 text-white rounded-xl px-3 py-1 text-xs font-semibold whitespace-nowrap">Còn 4:23:15</div>
                <button
                  onClick={() => setOrderModal({ name: "Tư vấn điện thoại", price: 0 })}
                  className="bg-white text-rose-500 rounded-xl px-4 py-1.5 text-xs font-bold cursor-pointer whitespace-nowrap"
                >
                  Đặt Ngay
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -right-2 -top-8 w-20 h-20 bg-white/10 rounded-full" />
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-smartphone-line text-5xl text-gray-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-500">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc</p>
                <button
                  onClick={() => { setSelectedBrand("all"); setSelectedPrice("all"); setVisibleCount(PAGE_SIZE); }}
                  className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  Xem Tất Cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayed.map((product) => (
                    <MobileCard
                      key={product.id}
                      product={product}
                      onOrder={(name, price) => setOrderModal({ name, price })}
                    />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <p className="text-sm text-gray-400">
                      Đang hiển thị <strong className="text-gray-700">{displayed.length}</strong> / <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                        className="px-6 py-2.5 border border-gray-900 text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-1.5" />
                        Xem Thêm {Math.min(PAGE_SIZE, filtered.length - visibleCount)} Sản Phẩm
                      </button>
                      <button
                        onClick={() => setVisibleCount(filtered.length)}
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-list-check-3 mr-1.5" />
                        Xem Tất Cả {filtered.length} Sản Phẩm
                      </button>
                    </div>
                    {/* Progress bar */}
                    <div className="w-64 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(displayed.length / filtered.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* All shown message */}
                {!hasMore && filtered.length > 0 && (
                  <div className="mt-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                      <i className="ri-check-double-line" />
                      Đã hiển thị đầy đủ {filtered.length} sản phẩm
                    </span>
                  </div>
                )}
              </>
            )}

            {/* SEO block */}
            <div className="mt-10 bg-white rounded-2xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">
                Mua Điện Thoại Di Động Chính Hãng - Giá Tốt Nhất
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Khám phá bộ sưu tập <strong>điện thoại di động</strong> chính hãng đa dạng từ{" "}
                <strong>Apple iPhone</strong>, <strong>Samsung Galaxy</strong>, <strong>Xiaomi Redmi</strong>,{" "}
                <strong>OPPO</strong>, <strong>Vivo</strong>, <strong>Realme</strong> và nhiều thương hiệu khác.
                Tất cả sản phẩm bảo hành 12 tháng, đổi trả 30 ngày. Đặt hàng trực tiếp, nhận tư vấn qua Zalo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
