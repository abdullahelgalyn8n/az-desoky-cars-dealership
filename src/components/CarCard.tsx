import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, ShieldCheck, ArrowUpLeft } from 'lucide-react';
import { CarItem } from '../data/carsData';
import { formatNumber } from '../utils/carUtils';
import { useApp } from '../context/AppContext';

interface CarCardProps {
  car: CarItem;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { favorites, compareIds, toggleFavorite, toggleCompare } = useApp();
  const [imgError, setImgError] = useState(false);

  const isFav = favorites.includes(car.id);
  const isCompared = compareIds.includes(car.id);

  return (
    <article className="group bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all duration-150 hover:-translate-y-0.5 flex flex-col overflow-hidden">
      {/* Image Zone (68% visual weight) */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <Link to={`/cars/${car.slug}`} className="block w-full h-full focus:outline-none">
          {!imgError ? (
            <img
              src={car.image}
              alt={`${car.title} - ${car.brandAr} ${car.model}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-700 p-4 text-center">
              <span className="text-sm font-bold">{car.title}</span>
              <span className="text-xs text-slate-600 mt-1">{car.brandAr} · {car.model}</span>
            </div>
          )}

          {/* Top-right Unified Inspected Status Overlay (Flush right ribbon covers right edge cleanly) */}
          <div className="absolute top-2 right-0 min-w-[118px] py-1.5 px-3.5 bg-emerald-700 text-white rounded-l-lg text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>مفحوصة {car.overallScore}%</span>
          </div>
        </Link>

        {/* Top-left Quick Actions (Favorite & Compare) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleFavorite(car.id)}
            aria-label={isFav ? `إزالة ${car.title} من المفضلة` : `إضافة ${car.title} إلى المفضلة`}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isFav
                ? 'bg-red-600 text-white'
                : 'bg-white/95 text-slate-800 hover:bg-white border border-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(car.id)}
            aria-label={isCompared ? `إزالة ${car.title} من المقارنة` : `مقارنة ${car.title}`}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isCompared
                ? 'bg-slate-900 text-white'
                : 'bg-white/95 text-slate-800 hover:bg-white border border-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Zone */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Clean Unboxed Metadata Kicker (Zero-Pill Discipline) */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
            <div className="flex items-center gap-1.5 truncate">
              <span>{car.brandAr}</span>
              <span aria-hidden="true">·</span>
              <span>{car.bodyType}</span>
              <span aria-hidden="true">·</span>
              <span>{car.paintCondition}</span>
            </div>
            <span className="text-slate-700 shrink-0">{car.locationAr}</span>
          </div>

          {/* Primary Vehicle Name & Price Row */}
          <div className="flex items-baseline justify-between gap-2 mt-1">
            <Link
              to={`/cars/${car.slug}`}
              className="text-base font-extrabold text-slate-900 group-hover:text-red-600 transition-colors truncate"
               dir="ltr"
            >
              {car.title}
            </Link>
            <div className="text-left shrink-0">
              <span className="text-lg font-black text-red-700 tabular-nums">
                {formatNumber(car.price)}
              </span>
              <span className="text-xs font-bold text-slate-700 mr-1">جنيه</span>
            </div>
          </div>
        </div>

        {/* Clean High-Contrast Spec Row + Action */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2 tabular-nums">
            <span>{formatNumber(car.mileage)} كم</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span>{car.fuel}</span>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <span>{car.transmission}</span>
          </div>

          <Link
            to={`/cars/${car.slug}`}
            className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
          >
            <span>التفاصيل والتقرير</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
