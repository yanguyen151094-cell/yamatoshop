import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    commission: number;
    badge?: string;
    category?: string;
    rating: number;
    reviews: number;
    sold: number;
    shopeeLink?: string;
    tiktokLink?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const shopeeUrl = product.shopeeLink || "https://shopee.vn";
  const tiktokUrl = product.tiktokLink || "https://www.tiktok.com/shop";

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: "75%" }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full whitespace-nowrap">
              -{discount}%
            </span>
          )}
        </div>
        {/* Commission Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
            HH {product.commission}%
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`ri-star-${star <= Math.floor(product.rating) ? "fill" : "line"} text-amber-400 text-xs`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-base font-bold text-gray-900">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
            <span className="text-xs text-gray-400 line-through ml-1.5">
              {product.originalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <span className="text-xs text-gray-400">Đã bán {product.sold.toLocaleString()}</span>
        </div>

        {/* Affiliate Buttons */}
        <div className="flex gap-2 mt-auto" onClick={(e) => e.preventDefault()}>
          <a
            href={shopeeUrl}
            target="_blank"
            rel="nofollow noopener"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-orange-500 text-white text-xs font-semibold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-bag-2-line text-sm" />
            Shopee
          </a>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="nofollow noopener"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-tiktok-line text-sm" />
            TikTok
          </a>
        </div>
      </div>
    </Link>
  );
}
