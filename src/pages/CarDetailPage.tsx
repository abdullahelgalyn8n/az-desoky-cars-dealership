import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  Scale,
  Phone,
  Calculator,
  CalendarCheck,
  ArrowRight,
  FileText,
  MapPin,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateInstallment, formatNumber, validateEgyptianPhone } from '../utils/carUtils';
import { CarCard } from '../components/CarCard';

export const CarDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { cars, favorites, compareIds, toggleFavorite, toggleCompare, submitViewingReservation } = useApp();

  const car = cars.find((c) => c.slug === slug) || cars[0];

  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanYears, setLoanYears] = useState<number>(3);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'كاش' | 'تقسيط بنكي'>('كاش');
  const [preferredTime, setPreferredTime] = useState('غداً - الفترة المسائية (4 م - 8 م)');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [reservationResult, setReservationResult] = useState<string | null>(null);

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">السيارة غير موجودة</h1>
        <Link to="/cars" className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-xl">
          العودة لمعرض السيارات
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(car.id);
  const isCompared = compareIds.includes(car.id);

  const installment = calculateInstallment({
    price: car.price,
    downPaymentPercent,
    years: loanYears,
  });

  const similarCars = cars
    .filter((c) => c.id !== car.id && (c.bodyType === car.bodyType || c.brand === car.brand))
    .slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!customerName.trim()) {
      setFormError('يرجى إدخال الاسم بالكامل لتأكيد حجز المعاينة.');
      return;
    }
    if (!validateEgyptianPhone(phone)) {
      setFormError('يرجى إدخال رقم موبايل مصري صحيح مكون من 11 رقم يبدأ بـ 01.');
      return;
    }

    const res = submitViewingReservation({
      carId: car.id,
      carTitle: car.title,
      carSlug: car.slug,
      carPrice: car.price,
      customerName: customerName.trim(),
      phone: phone.trim(),
      paymentMethod,
      preferredTime,
      notes: notes.trim(),
    });
    setReservationResult(res.reservationCode);
    setCustomerName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Link to="/" className="hover:text-red-600">الرئيسية</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-red-600">اشتري عربية</Link>
          <span>/</span>
          <Link to={`/cars?brand=${encodeURIComponent(car.brand)}`} className="hover:text-red-600">
            {car.brandAr}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-black" dir="ltr">{car.title}</span>
        </div>

        <Link
          to="/cars"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-800 hover:text-red-600"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع السيارات</span>
        </Link>
      </div>

      {/* Contiguous Purchase & Gallery Split (Desktop 12-Col Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column (RTL): Image Showcase & Technical Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Showroom Image */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="relative aspect-[16/10] bg-slate-100">
              <img
                src={car.image}
                alt={car.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 right-2 min-w-[165px] bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>تقرير فحص معتمد {car.overallScore}%</span>
              </div>
            </div>

            {/* Key Highlights Bar below Photo */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xs font-bold text-slate-600">حالة الدهان</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">{car.paintCondition}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">الممشى (العداد)</p>
                <p className="text-sm font-black text-slate-900 mt-0.5 tabular-nums">
                  {formatNumber(car.mileage)} كم
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">سجل الصيانات</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">{car.agencyMaintenance}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">الملكية</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">
                  {car.firstOwner ? 'مالك أول من الزيرو' : 'رخصة سارية باسم المالك'}
                </p>
              </div>
            </div>
          </div>

          {/* 150-Point Certified Inspection Report Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold">
                  <FileText className="w-4 h-4" />
                  <span className="tabular-nums">رقم التقرير المعتمد: {car.reportCode}</span>
                  <span>·</span>
                  <span>تاريخ الفحص: {car.inspectionDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  تقرير فحص DESOKY الشامل (150 نقطة)
                </h2>
                <p className="text-xs font-bold text-slate-600">
                  تم الفحص بواسطة: {car.inspectorName} · {car.legalStatus}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-center shrink-0">
                <p className="text-2xl font-black text-emerald-800 tabular-nums">{car.overallScore}%</p>
                <p className="text-xs font-extrabold text-emerald-700">التقييم العام</p>
              </div>
            </div>

            {/* Engineer Summary Quote */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5">
              <p className="text-xs font-extrabold text-slate-900">ملخص مهندس الفحص المختص:</p>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {car.inspectorNotes}
              </p>
            </div>

            {/* 5 Inspection Pillars with Progress Bars */}
            <div className="space-y-4">
              {car.inspectionSections.map((sec) => (
                <div key={sec.name} className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h3 className="text-sm font-black text-slate-900">{sec.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-xs font-extrabold">
                      <span className="text-slate-600 tabular-nums">({sec.checkedPoints} نقطة فحص)</span>
                      <span className="text-emerald-700">{sec.status}</span>
                      <span className="text-slate-900 tabular-nums">{sec.score}%</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${sec.score}%` }}
                    />
                  </div>

                  <p className="text-xs font-medium text-slate-700 leading-relaxed">{sec.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Complete Technical Specifications Table */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-slate-900">المواصفات الفنية والبيانات الكاملة</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                { label: 'الماركة', value: `${car.brandAr} (${car.brand})` },
                { label: 'الموديل والفئة', value: car.model },
                { label: 'سنة الصنع', value: `${car.year}` },
                { label: 'الكيلومترات', value: `${formatNumber(car.mileage)} كم` },
                { label: 'ناقل الحركة', value: car.transmission },
                { label: 'نوع الوقود', value: car.fuel },
                { label: 'نوع الهيكل', value: car.bodyType },
                { label: 'اللون الخارجي', value: car.color },
                { label: 'سعة المحرك', value: car.engineSpecs.cc },
                { label: 'القوة الحصانية', value: car.engineSpecs.horsepower },
                { label: 'نظام الدفع', value: car.engineSpecs.drivetrain },
                { label: 'وحدة المرور والرخصة', value: `${car.engineSpecs.trafficUnit} (${car.engineSpecs.licenseExpiry})` },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2.5 border-b border-slate-100"
                >
                  <span className="font-bold text-slate-600">{row.label}</span>
                  <span className="font-extrabold text-slate-900 tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Key Features List */}
            <div className="pt-4">
              <h3 className="text-base font-black text-slate-900 mb-3">أبرز التجهيزات والكماليات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Left Column (RTL): Contiguous Purchase, Financing & Booking Module (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Primary Purchase Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>مكان المعاينة: {car.locationAr}</span>
                </span>
                <span className="tabular-nums">كود #{car.id}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900" dir="ltr">
                {car.title}
              </h1>
              <p className="text-xs font-bold text-slate-600">
                {car.brandAr} · {car.model} · {car.paintCondition}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
              <span className="text-xs font-extrabold text-slate-700">السعر النقدي (كاش):</span>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-red-600 tabular-nums">
                  {formatNumber(car.price)}
                </span>
                <span className="text-sm font-extrabold text-slate-800 mr-1.5">جنيه</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => toggleFavorite(car.id)}
                className={`py-2.5 px-4 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-colors ${
                  isFav
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-red-600' : ''}`} />
                <span>{isFav ? 'في المفضلة' : 'حفظ في المفضلة'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(car.id)}
                className={`py-2.5 px-4 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition-colors ${
                  isCompared
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'مضافة للمقارنة' : 'قارن العربية'}</span>
              </button>
            </div>

            <a
              href="tel:01276111473"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-red-400" />
              <span>اتصل مباشرة لفريق المبيعات: 01276111473</span>
            </a>
          </div>

          {/* Interactive Booking / Viewing Request Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-black text-slate-900">احجز موعد معاينة أو شراء</h2>
            </div>

            {reservationResult ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2">
                <p className="text-sm font-black">تم تأكيد طلب معاينة السيارة بنجاح!</p>
                <p className="text-xs font-bold tabular-nums">
                  كود الحجز الخاص بك: <span className="underline">{reservationResult}</span>
                </p>
                <p className="text-xs font-medium">
                  سيتواصل معك مسؤول مبيعات DESOKY خلال 30 دقيقة لتأكيد الموعد في {car.locationAr}.
                </p>
                <button
                  type="button"
                  onClick={() => setReservationResult(null)}
                  className="text-xs font-extrabold text-emerald-800 underline pt-1"
                >
                  حجز موعد آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5" noValidate>
                {formError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-xs font-bold text-red-800">
                    {formError}
                  </div>
                )}

                <div>
                  <label htmlFor="res-name" className="block text-xs font-extrabold text-slate-800 mb-1">
                    الاسم بالكامل *
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اكتب اسمك الثلاثي"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="res-phone" className="block text-xs font-extrabold text-slate-800 mb-1">
                    رقم الموبايل *
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="res-pay" className="block text-xs font-extrabold text-slate-800 mb-1">
                      طريقة الشراء المفضلة
                    </label>
                    <select
                      id="res-pay"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'كاش' | 'تقسيط بنكي')}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900"
                    >
                      <option value="كاش">شراء نقدي (كاش)</option>
                      <option value="تقسيط بنكي">تمويل وتقسيط بنكي</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="res-time" className="block text-xs font-extrabold text-slate-800 mb-1">
                      الموعد المناسب
                    </label>
                    <select
                      id="res-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900"
                    >
                      <option value="اليوم - الفترة المسائية">اليوم - مساءً</option>
                      <option value="غداً - الفترة الصباحية (10 ص - 3 م)">غداً - صباحاً</option>
                      <option value="غداً - الفترة المسائية (4 م - 8 م)">غداً - مساءً</option>
                      <option value="نهاية الأسبوع">عطلة نهاية الأسبوع</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-colors"
                >
                  تأكيد حجز المعاينة مجاناً
                </button>
              </form>
            )}
          </div>

          {/* Interactive Financing / Installment Calculator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-black text-slate-900">حاسبة التقسيط التقديرية</h2>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-800 mb-1">
                  <label htmlFor="dp-slider">نسبة المقدم ({downPaymentPercent}%)</label>
                  <span className="tabular-nums text-red-700">
                    {formatNumber(installment.downPaymentAmount)} جنيه
                  </span>
                </div>
                <input
                  id="dp-slider"
                  type="range"
                  min={10}
                  max={70}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-extrabold text-slate-800 mb-1.5">
                  <span>مدة التقسيط بالسنوات:</span>
                  <span className="tabular-nums">{loanYears} سنوات ({loanYears * 12} شهر)</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setLoanYears(yr)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                        loanYears === yr
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {yr} {yr === 1 ? 'سنة' : 'سنوات'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-300">القسط الشهري التقريبي</p>
                  <p className="text-[11px] text-slate-400">بالتعاون مع البنوك وشركات التمويل المعتمدة</p>
                </div>
                <div className="text-left">
                  <span className="text-xl font-black text-red-400 tabular-nums">
                    {formatNumber(installment.monthlyInstallment)}
                  </span>
                  <span className="text-xs font-bold text-slate-200 mr-1">جنيه / شهر</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Inspected Cars */}
      {similarCars.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">سيارات مشابهة مفحوصة</h2>
            <Link to="/cars" className="text-sm font-extrabold text-red-600 hover:underline">
              عرض كل السيارات
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
