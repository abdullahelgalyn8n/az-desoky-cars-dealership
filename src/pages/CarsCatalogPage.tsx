import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, Scale, Car } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRANDS_LIST } from '../data/carsData';
import { filterAndSortCars, CarFilters, formatNumber } from '../utils/carUtils';
import { CarCard } from '../components/CarCard';

export const CarsCatalogPage: React.FC = () => {
  const { cars, compareIds } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialBrand = searchParams.get('brand') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedBodyType, setSelectedBodyType] = useState('all');
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minYear, setMinYear] = useState<number>(0);
  const [firstOwnerOnly, setFirstOwnerOnly] = useState(false);
  const [factoryPaintOnly, setFactoryPaintOnly] = useState(false);
  const [sortBy, setSortBy] = useState<CarFilters['sortBy']>('featured');
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);

  useEffect(() => {
    const b = searchParams.get('brand');
    const q = searchParams.get('q');
    if (b) setSelectedBrand(b);
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const filteredCars = filterAndSortCars(cars, {
    searchQuery,
    brand: selectedBrand,
    bodyType: selectedBodyType,
    maxPrice: maxPrice > 0 ? maxPrice : undefined,
    minYear: minYear > 0 ? minYear : undefined,
    firstOwnerOnly,
    factoryPaintOnly,
    sortBy,
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedBodyType('all');
    setMaxPrice(0);
    setMinYear(0);
    setFirstOwnerOnly(false);
    setFactoryPaintOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">اشتري عربيتك</h1>
          <p className="text-sm font-semibold text-slate-700 mt-1.5">
            كل العربيات مفحوصة فنياً بـ 150 نقطة وقانونياً ومعتمدة من مهندسين دسوقي
          </p>
        </div>

        <div className="flex items-center gap-3">
          {compareIds.length > 0 && (
            <Link
              to="/compare"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
            >
              <Scale className="w-4 h-4" />
              <span>مقارنة السيارات المحددة ({compareIds.length})</span>
            </Link>
          )}
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-extrabold transition-colors whitespace-nowrap shrink-0"
          >
            <Car className="w-4 h-4" />
            <span>عايز تبيع عربيتك؟</span>
          </Link>
        </div>
      </div>

      {/* Search & Controls Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن عربية بالماركة، الموديل، سنة الصنع، أو المنطقة..."
              aria-label="ابحث عن عربية"
              className="w-full pr-11 pl-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
            />
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sort-cars" className="text-xs font-extrabold text-slate-700 whitespace-nowrap">
              الترتيب حسب:
            </label>
            <select
              id="sort-cars"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as CarFilters['sortBy'])}
              className="px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
            >
              <option value="featured">الأحدث والمميزة</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
              <option value="year-desc">سنة الصنع: الأحدث أولاً</option>
              <option value="mileage-asc">الكيلومترات: الأقل عداداً</option>
              <option value="score-desc">تقييم الفحص: الأعلى درجة</option>
            </select>

            <button
              type="button"
              onClick={() => setShowFiltersPanel((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                showFiltersPanel
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>فلتر متقدم</span>
            </button>
          </div>
        </div>

        {/* Expanded Filter Controls */}
        {showFiltersPanel && (
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Brand Filter */}
            <div>
              <label htmlFor="filter-brand" className="block text-xs font-extrabold text-slate-800 mb-1.5">
                الماركة
              </label>
              <select
                id="filter-brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
              >
                <option value="all">كل الماركات ({cars.length})</option>
                {BRANDS_LIST.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nameAr} ({b.nameEn})
                  </option>
                ))}
              </select>
            </div>

            {/* Body Type Filter */}
            <div>
              <label htmlFor="filter-body" className="block text-xs font-extrabold text-slate-800 mb-1.5">
                نوع الهيكل
              </label>
              <select
                id="filter-body"
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
              >
                <option value="all">كل الفئات</option>
                <option value="SUV">SUV رياضية متعددة الاستخدامات</option>
                <option value="كروس أوفر">كروس أوفر</option>
                <option value="سيدان">سيدان</option>
                <option value="هاتشباك">هاتشباك</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div>
              <label htmlFor="filter-price" className="block text-xs font-extrabold text-slate-800 mb-1.5">
                الحد الأقصى للسعر
              </label>
              <select
                id="filter-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
              >
                <option value={0}>كل الأسعار</option>
                <option value={800000}>حتى 800,000 جنيه</option>
                <option value={1000000}>حتى 1,000,000 جنيه</option>
                <option value={1300000}>حتى 1,300,000 جنيه</option>
                <option value={1600000}>حتى 1,600,000 جنيه</option>
                <option value={2000000}>حتى 2,000,000 جنيه</option>
              </select>
            </div>

            {/* Min Year Filter */}
            <div>
              <label htmlFor="filter-year" className="block text-xs font-extrabold text-slate-800 mb-1.5">
                سنة الصنع
              </label>
              <select
                id="filter-year"
                value={minYear}
                onChange={(e) => setMinYear(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
              >
                <option value={0}>كل الموديلات</option>
                <option value={2026}>2026 فقط</option>
                <option value={2025}>2025 فما فوق</option>
                <option value={2023}>2023 فما فوق</option>
                <option value={2021}>2021 فما فوق</option>
                <option value={2019}>2019 فما فوق</option>
              </select>
            </div>

            {/* Checkboxes & Reset */}
            <div className="flex flex-col justify-between gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 pt-1">
                <input
                  type="checkbox"
                  checked={firstOwnerOnly}
                  onChange={(e) => setFirstOwnerOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-600"
                />
                <span>مالك أول من الزيرو فقط</span>
              </label>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-sm font-bold text-slate-800">
        <p className="tabular-nums">
          إجمالي النتائج المطابقة: <span className="text-red-600 font-black">{formatNumber(filteredCars.length)}</span> عربية متاحة
        </p>
        {selectedBrand !== 'all' && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-extrabold text-red-600 hover:underline"
          >
            إلغاء فلتر الماركة ({selectedBrand})
          </button>
        )}
      </div>

      {/* Cars Grid or Empty State */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-xl font-black text-slate-900">لا توجد سيارات مطابقة لمعايير البحث الحالية</p>
          <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
            جرب تغيير الماركة أو زيادة الحد الأقصى للسعر لاستعراض المزيد من السيارات المفحوصة.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors"
          >
            عرض جميع السيارات ({cars.length})
          </button>
        </div>
      )}
    </div>
  );
};
