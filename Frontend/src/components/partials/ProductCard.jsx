import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    _id,
    title,
    image,
    brand,
    actual_price,
    selling_price,
    color,
    model,
  } = product;

  return (
    <Link
      to={`/product/${_id}`}
      className="group rounded-xl bg-white/10 backdrop-blur-lg p-4 hover:scale-[1.02] transition-all duration-300 border border-white/10 shadow-xl"
    >
      <div className="relative w-full h-52 overflow-hidden rounded-lg bg-white/5">
        <img
          src={image}
          alt={title}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1 text-white">
        <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
        <p className="text-xs text-gray-300">{brand} • {model}</p>
        <p className="text-xs text-gray-400">Color: {color}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-pink-500">₹{selling_price}</span>
          <span className="text-sm line-through text-gray-400">₹{actual_price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
