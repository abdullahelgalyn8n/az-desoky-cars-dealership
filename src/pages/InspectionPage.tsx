import React, { useState } from 'react';
import { ClipboardCheck, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRANDS_LIST, BRAND_MODELS } from '../data/carsData';
import { validateEgyptianPhone } from '../utils/carUtils';
import { useApp, InspectionBooking } from '../context/AppContext';

export const InspectionPage: React.FC = () => {
  const { submitInspectionBooking } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('Hyundai');
  const [model, setModel] = useState('Tucson');
  const [year, setYear] = useState<number>(2022);
  const [address, setAddress] = useState('');
  const [packageType, setPackageType] = useState<InspectionBooking['packageType']>(
    'الفحص الأساسي (1,500 جنيه)'
  );
  const [preferredDate, setPreferredDate] = useState('غداً - 12:00 ظهراً');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<InspectionBooking | null>(null);

  const availableModels = BRAND_MODELS[brand] || ['موديل قياسي'];

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    const models = BRAND_MODELS[newBrand] || ['موديل قياسي'];
    setModel(models[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال الاسم بالكامل.');
      return;
    }
    if (!validateEgyptianPhone(phone)) {
      setErrorMsg('يرجى إدخال رقم موبايل مصري صحيح (11 رقم يبدأ بـ 01).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('يرجى كتابة العنوان بالتفصيل لإرسال مهندس الفحص لمكانك.');
      return;
    }

    const booking = submitInspectionBooking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      brand,
      model,
      year: Number(year),
      address: address.trim(),
      packageType,
      preferredDate,
      notes: notes.trim(),
    });
    setConfirmedBooking(booking);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* 1. Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
          <ClipboardCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">خدمة الفحص</h1>
        <p className="text-base font-semibold text-slate-700 leading-relaxed">
          هتشتري عربية ومحتاج تتأكد من حالتها؟ مهندسينا هيفحصوها في مكانك فنياً وقانونياً بأحدث الأجهزة المعتمدة.
        </p>
        <div className="inline-block px-5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 font-black text-sm tabular-nums">
          الأسعار بتبدأ من 1,500 جنيه شامل الانتقال والتقرير المعتمد
        </div>
      </div>

      {/* 2. Three Steps Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-7 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <p className="text-xs font-extrabold text-red-600">الخطوة 1</p>
          <h2 className="text-lg font-black text-slate-900">سجّل طلب الفحص</h2>
          <p className="text-sm font-medium text-slate-700">
            ادخل بيانات العربية وعنوان تواجدها في القاهرة أو الجيزة والموعد المناسب ليك.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-7 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <p className="text-xs font-extrabold text-red-600">الخطوة 2</p>
          <h2 className="text-lg font-black text-slate-900">مهندس في مكانك</h2>
          <p className="text-sm font-medium text-slate-700">
            بنبعتلك مهندس فحص مختص مزود بأجهزة قياس الدهان الرقمية وجهاز فحص الأعطال بالكمبيوتر.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-7 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-xs font-extrabold text-red-600">الخطوة 3</p>
          <h2 className="text-lg font-black text-slate-900">تقرير شامل ومفصل</h2>
          <p className="text-sm font-medium text-slate-700">
            بتحصل على تقرير فحص فني وقانوني كامل يوضح حالة 150 نقطة والتقييم السعري العادل.
          </p>
        </div>
      </div>

      {/* 3. Inspection Packages Selection */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900">باقات الفحص المتاحة</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            اختر الباقة المناسبة لنوع السيارة التي ترغب في شرائها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'الفحص الأساسي (1,500 جنيه)' as const,
              title: 'الفحص الأساسي المعتمد',
              price: '1,500 جنيه',
              subtitle: 'مثالي للسيارات الاقتصادية والمتوسطة',
              points: [
                'فحص الشاسيه والقوائم والدواخل بالكامل',
                'قياس سمك الدهان بالجهاز الرقمي',
                'فحص المحرك والفتيس بالكمبيوتر OBD-II',
                'مراجعة الرخصة والأوراق القانونية',
              ],
            },
            {
              id: 'الفحص المتقدم الشامل (2,200 جنيه)' as const,
              title: 'الفحص المتقدم الشامل 150 نقطة',
              price: '2,200 جنيه',
              subtitle: 'الأكثر طلباً للسيارات الحديثة والـ SUV',
              points: [
                'كل مميزات الفحص الأساسي بالكامل',
                'تجربة قيادة فعلية لاختبار الفتيس والعفشة',
                'فحص التربو، التكييف، والضفيرة الكهربائية',
                'تقرير تسعير عادل وتقدير تكلفة أي صيانات',
              ],
            },
            {
              id: 'فحص السيارات الفارهة والـ VIP (3,000 جنيه)' as const,
              title: 'فحص السيارات الفارهة والهايبرد',
              price: '3,000 جنيه',
              subtitle: 'للسيارات الأوروبية الفارهة والكهربائية',
              points: [
                'كشف بأجهزة متخصصة للكنترولات الأوروبية',
                'فحص كفاءة بطاريات الهايبرد والكهرباء',
                'فحص أنظمة التعليق الهوائي والرادارات',
                'استشارة فنية وقانونية شاملة حتى كتابة العقد',
              ],
            },
          ].map((pkg) => {
            const active = packageType === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setPackageType(pkg.id)}
                className={`rounded-2xl p-6 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  active
                    ? 'bg-white border-red-600 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-black text-slate-900">{pkg.title}</h3>
                    <span className="text-lg font-black text-red-600 tabular-nums shrink-0">
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">{pkg.subtitle}</p>
                  <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                    {pkg.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setPackageType(pkg.id)}
                  className={`mt-6 w-full py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                    active
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {active ? 'الباقة المختارة حالياً' : 'اختيار هذه الباقة'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Booking Form Section ("اطلب فحص دلوقتي") */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">اطلب فحص دلوقتي</h2>
          <p className="text-xs font-bold text-slate-600 mt-1">
            املا بياناتك وهيكلمك مهندس الفحص خلال دقائق لتأكيد الموعد
          </p>
        </div>

        {confirmedBooking ? (
          <div className="bg-white rounded-3xl border-2 border-emerald-600 p-8 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">تم تأكيد حجز مهندس الفحص!</h3>
            <p className="text-sm font-bold text-slate-800 tabular-nums">
              رقم الحجز المرجعي: <span className="text-red-600 font-black">{confirmedBooking.bookingCode}</span>
            </p>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-right text-sm space-y-2">
              <p className="font-bold text-slate-900">
                العميل: {confirmedBooking.customerName} ({confirmedBooking.phone})
              </p>
              <p className="font-bold text-slate-800">
                السيارة المراد فحصها: {confirmedBooking.brand} {confirmedBooking.model} ({confirmedBooking.year})
              </p>
              <p className="font-bold text-slate-800">الباقة: {confirmedBooking.packageType}</p>
              <p className="font-bold text-slate-800">العنوان: {confirmedBooking.address}</p>
            </div>
            <button
              type="button"
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold"
            >
              طلب فحص سيارة أخرى
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-sm font-bold text-red-800">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="insp-name" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الاسم *
                </label>
                <input
                  id="insp-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="اسمك"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="insp-phone" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  رقم الموبايل *
                </label>
                <input
                  id="insp-phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold text-right focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="insp-brand" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  ماركة العربية *
                </label>
                <select
                  id="insp-brand"
                  value={brand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold focus:bg-white"
                >
                  {BRANDS_LIST.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.nameAr} ({b.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="insp-model" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الموديل *
                </label>
                <select
                  id="insp-model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold focus:bg-white"
                >
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="insp-year" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  سنة الصنع *
                </label>
                <input
                  id="insp-year"
                  type="number"
                  min={2000}
                  max={2026}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  placeholder="مثال: 2022"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold tabular-nums focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="insp-pkg" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  باقة الفحص المختارة
                </label>
                <select
                  id="insp-pkg"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as InspectionBooking['packageType'])}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold focus:bg-white"
                >
                  <option value="الفحص الأساسي (1,500 جنيه)">الفحص الأساسي (1,500 جنيه)</option>
                  <option value="الفحص المتقدم الشامل (2,200 جنيه)">الفحص المتقدم الشامل (2,200 جنيه)</option>
                  <option value="فحص السيارات الفارهة والـ VIP (3,000 جنيه)">فحص السيارات الفارهة والـ VIP (3,000 جنيه)</option>
                </select>
              </div>

              <div>
                <label htmlFor="insp-date" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الموعد المفضل للفحص
                </label>
                <input
                  id="insp-date"
                  type="text"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="insp-address" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                العنوان بالتفصيل *
              </label>
              <input
                id="insp-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المنطقة والعنوان بالتفصيل (في نطاق القاهرة والجيزة)"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="insp-notes" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                ملاحظات
              </label>
              <textarea
                id="insp-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي تفاصيل إضافية أو رقم تليفون البائع للتنسيق..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base transition-colors"
            >
              اطلب فحص
            </button>

            <p className="text-center text-xs font-bold text-slate-600">
              الخدمة متاحة في جميع مناطق القاهرة الكبرى والجيزة طوال أيام الأسبوع
            </p>
          </form>
        )}
      </section>
    </div>
  );
};
