import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Car,
  ClipboardCheck,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Users,
  ChevronDown,
  ArrowLeft,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRANDS_LIST, TESTIMONIALS, FAQ_ITEMS } from '../data/carsData';
import { CarCard } from '../components/CarCard';

export const HomePage: React.FC = () => {
  const { cars } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-3');

  const categories = ['الكل', 'SUV', 'كروس أوفر', 'سيدان', 'هاتشباك'];

  const displayedCars = cars
    .filter((car) => (activeCategory === 'الكل' ? true : car.bodyType === activeCategory))
    .slice(0, 6);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/cars?q=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/cars');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section with High-Contrast Measured Scrim */}
      <section className="relative bg-[#0B192C] text-white overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full lg:w-2/3">
          <img
            src="/assets/brand/hero-bg.jpg"
            alt="معرض فحص السيارات المعتمدة DESOKY"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0B192C] via-[#0B192C]/75 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-bold text-red-400 tracking-wide">
              المنصة المعتمدة لبيع وشراء وفحص السيارات المستعملة في مصر
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              المعيار الذهبي <span className="text-red-500">للجودة</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-medium">
              بنفحص كل عربية فنياً بـ 150 نقطة وقانونياً بالكامل قبل ما تنزل عندنا. اشتري بأمان وثقة أو بيع عربيتك بسهولة وبأفضل سعر مع DESOKY.
            </p>

            {/* Primary & Secondary CTAs with High Contrast */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <Search className="w-5 h-5" />
                <span>اشتري عربية مفحوصة</span>
              </Link>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-base transition-colors whitespace-nowrap shrink-0"
              >
                <Car className="w-5 h-5" />
                <span>بيع عربيتك</span>
              </Link>
            </div>

            {/* Quick Search Bar inside Hero */}
            <form
              onSubmit={handleQuickSearch}
              className="mt-6 bg-white p-2 rounded-xl shadow-lg max-w-xl flex items-center gap-2 border border-slate-200"
            >
              <Search className="w-5 h-5 text-slate-500 mr-2 shrink-0" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="ابحث بالماركة أو الموديل (مثال: كاشكاي، توسان، سيفيك...)"
                aria-label="ابحث عن سيارة"
                className="w-full py-2 px-2 text-sm font-semibold text-slate-900 placeholder:text-slate-500 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                بحث فوري
              </button>
            </form>

            {/* High-Contrast Unboxed Trust Guarantees */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-200">
              <span>فحص فني شامل 150 نقطة</span>
              <span aria-hidden="true" className="text-red-400">·</span>
              <span>فحص قانوني ومروري معتمد</span>
              <span aria-hidden="true" className="text-red-400">·</span>
              <span>ضمان جودة الحالة</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Cars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">عربيات معروضة</h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              كلها مفحوصة ومعتمدة فنياً وقانونياً من مهندسين دسوقي ({cars.length} عربية متاحة الآن)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Interactive Category Filter */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link
              to="/cars"
              className="inline-flex items-center gap-1.5 text-sm font-extrabold text-red-600 hover:text-red-700 whitespace-nowrap shrink-0"
            >
              <span>عرض الكل ({cars.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
          >
            <span>تصفح جميع السيارات المعروضة ({cars.length} عربية)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Popular Brands Filter Section */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">أشهر الماركات عندنا</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1.5">
            اضغط على أي ماركة لاستعراض جميع سياراتها المفحوصة المتاحة فوراً
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {BRANDS_LIST.map((b) => {
              const count = cars.filter((c) => c.brand.toLowerCase() === b.id.toLowerCase()).length;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => navigate(`/cars?brand=${encodeURIComponent(b.id)}`)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-500 text-slate-900 hover:text-red-700 font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{b.nameAr}</span>
                  <span className="text-xs font-medium text-slate-600" dir="ltr">
                    ({b.nameEn} · {count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Services Section ("خدماتنا") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold text-red-600 mb-1">ماذا نقدم</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">خدماتنا المتكاملة</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1.5">
            حلول موثوقة لبيع وشراء وفحص السيارات المستعملة بأعلى معايير الأمان في مصر
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-5">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">01. اشتري عربية</h3>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                تصفح عربيات مفحوصة ومعتمدة مع تقارير فحص شاملة وصور حقيقية من داخل استوديو دسوقي مع إمكانية التقسيط أو الدفع الكاش.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/cars"
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-red-600 hover:text-red-700"
              >
                <span>تصفح المعرض الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-5">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">02. بيع عربيتك</h3>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                سجّل بيانات عربيتك واحصل على تقييم فوري، وهنبعتلك مهندس فحص وتصوير احترافي لبيع عربيتك بأفضل سعر.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-red-600 hover:text-red-700"
              >
                <span>اعرض عربيتك للبيع</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mb-5">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">03. خدمة الفحص</h3>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                لقيت عربية بره الموقع ومحتاج تفحصها قبل ما تشتريها؟ مهندسينا هيفحصوها في مكانك بأسعار تبدأ من 1,500 جنيه.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                to="/inspection"
                className="inline-flex items-center gap-1.5 text-sm font-extrabold text-red-600 hover:text-red-700"
              >
                <span>اطلب مهندس فحص</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works + Quantitative Proof Banner Adjacent */}
      <section className="space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-extrabold text-red-600 mb-1">إزاي بنشتغل</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              خطوات بسيطة للحصول على عربيتك
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1.5">
              عملية سهلة ومباشرة من أول ما تختار لحد ما تستلم المفتاح
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'اختار عربيتك',
                desc: 'تصفح العربيات المتاحة واختار اللي تناسبك من حيث الماركة والموديل والميزانية.',
              },
              {
                step: '02',
                title: 'راجع التقرير أو اطلب فحص',
                desc: 'اطلع على تقرير الفحص المعتمد من 150 نقطة أو احجز فحص في مكانك لأي عربية.',
              },
              {
                step: '03',
                title: 'تأكد من الحالة والمعاينة',
                desc: 'عاين العربية على الطبيعة مع مهندس الفحص المختص وتأكد من كل تفصيلة بنفسك.',
              },
              {
                step: '04',
                title: 'أتمم الصفقة بأمان',
                desc: 'بنساعدك في مراجعة العقود وإتمام عملية البيع والشراء ونقل الملكية بأمان تام.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-red-600 text-white font-black text-base flex items-center justify-center mx-auto tabular-nums">
                  {item.step}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="bg-[#0B192C] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">+500</p>
              <p className="text-sm font-bold text-slate-300 mt-1">عملية فحص فني وقانوني تمت</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">+350</p>
              <p className="text-sm font-bold text-slate-300 mt-1">عربية مفحوصة اتباعت بأمان</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-red-400 tabular-nums">98%</p>
              <p className="text-sm font-bold text-slate-300 mt-1">نسبة رضا العملاء الموثقة</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white tabular-nums">+50</p>
              <p className="text-sm font-bold text-slate-300 mt-1">مهندس فحص معتمد في القاهرة والجيزة</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why DESOKY ("ليه DESOKY؟") */}
      <section className="bg-[#0B192C] text-white py-16 -mt-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">ليه DESOKY؟</h2>
            <p className="text-sm font-medium text-slate-300 mt-1.5">
              المعيار الذهبي في بيع وشراء السيارات المستعملة في مصر
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">فحص فني شامل</h3>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                مهندسين مختصين بيفحصوا كل عربية فنياً بالتفصيل بأحدث أجهزة القياس والكمبيوتر.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">فحص قانوني ومروري</h3>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                بنتأكد إن الورق والملكية وأرقام الشاسيه والمحرك سليمة 100% قبل العرض على الموقع.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">فريق مبيعات محترف</h3>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                فريقنا بيساعدك في كل خطوة من المعاينة والتفاوض حتى كتابة العقود أو إجراءات التقسيط.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white">خدمة في مكانك</h3>
              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                بنوصلك في أي مكان في القاهرة والجيزة لإجراء الفحص الشامل في الموعد اللي يناسبك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials ("عملائنا بيقولوا إيه") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-extrabold text-red-600 mb-1">آراء عملائنا</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">عملائنا بيقولوا إيه</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1.5">
            تجارب حقيقية من عملاء اشتروا وباعوا وفحصوا عربياتهم مع DESOKY
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500" aria-label="تقييم 5 نجوم">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 font-black text-sm flex items-center justify-center shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-xs font-semibold text-slate-600">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion ("عندك سؤال؟") */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-extrabold text-red-600 mb-1">أسئلة شائعة</p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">عندك سؤال؟</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1.5">
            هنا هتلاقي إجابات واضحة لأكثر الأسئلة اللي بتتسأل
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base font-extrabold text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm font-medium text-slate-700 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Bottom Inspection Service CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-l from-red-700 to-red-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-5 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">خدمة الفحص المتنقل في مكانك</h2>
          <p className="text-sm sm:text-base font-medium text-red-50 max-w-xl mx-auto leading-relaxed">
            هتشتري عربية ومش متأكد من حالتها؟ مهندسينا هيفحصوها في مكانك فنياً وقانونياً بأحدث الأجهزة. الأسعار بتبدأ من 1,500 جنيه.
          </p>
          <div className="pt-2">
            <Link
              to="/inspection"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-red-700 hover:bg-slate-100 font-black text-sm transition-colors"
            >
              <span>اطلب فحص دلوقتي</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
