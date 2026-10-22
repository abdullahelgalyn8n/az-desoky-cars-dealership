import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ClipboardCheck, Car, CalendarCheck, UserCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CarCard } from '../components/CarCard';
import { formatNumber, validateEgyptianPhone } from '../utils/carUtils';

export const AccountPage: React.FC = () => {
  const {
    cars,
    favorites,
    sellSubmissions,
    inspectionBookings,
    viewingReservations,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'favorites' | 'requests' | 'login'>('favorites');
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [loggedUser, setLoggedUser] = useState<{ name: string; phone: string } | null>({
    name: 'عميل دسوقي المعتمد',
    phone: '01276111473',
  });
  const [loginError, setLoginError] = useState('');

  const favCars = cars.filter((c) => favorites.includes(c.id));
  const totalRequests =
    sellSubmissions.length + inspectionBookings.length + viewingReservations.length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!nameInput.trim() || !validateEgyptianPhone(phoneInput)) {
      setLoginError('يرجى إدخال الاسم ورقم موبايل مصري صحيح مكون من 11 رقم.');
      return;
    }
    setLoggedUser({ name: nameInput.trim(), phone: phoneInput.trim() });
    showToast(`مرحباً بك يا ${nameInput.trim()} في حسابك على DESOKY`);
    setActiveTab('requests');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-extrabold text-red-600">
            <UserCheck className="w-4 h-4" />
            <span>{loggedUser ? `مسجل الدخول: ${loggedUser.name}` : 'بوابة العملاء'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            حسابي، المفضلة، ومتابعة الطلبات
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            تابع جميع السيارات المحفوظة وطلبات الفحص والبيع وحجوزات المعاينة في مكان واحد
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              activeTab === 'favorites'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            السيارات المفضلة ({favCars.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              activeTab === 'requests'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            طلباتي وحجوزاتي ({totalRequests})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            بيانات الحساب
          </button>
        </div>
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              <span>السيارات المحفوظة في المفضلة ({favCars.length})</span>
            </h2>
            <Link to="/compare" className="text-xs font-extrabold text-red-600 hover:underline">
              الذهاب لصفحة المقارنة
            </Link>
          </div>

          {favCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
              <p className="text-base font-black text-slate-900">لم تقم بحفظ أي سيارات في المفضلة بعد</p>
              <Link
                to="/cars"
                className="inline-block px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-extrabold"
              >
                تصفح السيارات المتاحة
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Submitted Requests */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Viewing Reservations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base">
              <CalendarCheck className="w-5 h-5 text-red-600" />
              <h3>حجوزات المعاينة ({viewingReservations.length})</h3>
            </div>
            {viewingReservations.length === 0 ? (
              <p className="text-xs font-semibold text-slate-600">
                لا توجد حجوزات معاينة مسجلة حالياً. يمكنك حجز معاينة من صفحة أي سيارة.
              </p>
            ) : (
              <div className="space-y-3">
                {viewingReservations.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-black text-red-600 tabular-nums">{r.reservationCode}</p>
                    <Link to={`/cars/${r.carSlug}`} className="font-black text-slate-900 hover:underline block">
                      {r.carTitle}
                    </Link>
                    <p className="font-bold text-slate-700">
                      طريقة الدفع: {r.paymentMethod} · الموعد: {r.preferredTime}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inspection Bookings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base">
              <ClipboardCheck className="w-5 h-5 text-red-600" />
              <h3>طلبات الفحص المتنقل ({inspectionBookings.length})</h3>
            </div>
            {inspectionBookings.length === 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">لا توجد طلبات فحص مسجلة بعد.</p>
                <Link to="/inspection" className="inline-block text-xs font-extrabold text-red-600 underline">
                  اطلب فحص سيارة الآن
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {inspectionBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-black text-red-600 tabular-nums">{b.bookingCode}</p>
                    <p className="font-black text-slate-900">
                      {b.brand} {b.model} ({b.year})
                    </p>
                    <p className="font-bold text-slate-700">{b.packageType}</p>
                    <p className="font-bold text-emerald-700">{b.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sell Car Submissions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base">
              <Car className="w-5 h-5 text-red-600" />
              <h3>طلبات بيع السيارات ({sellSubmissions.length})</h3>
            </div>
            {sellSubmissions.length === 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-600">لم تقم بإرسال طلب بيع سيارة بعد.</p>
                <Link to="/sell" className="inline-block text-xs font-extrabold text-red-600 underline">
                  اعرض عربيتك للبيع الآن
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {sellSubmissions.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <p className="font-black text-red-600 tabular-nums">{s.trackingCode}</p>
                    <p className="font-black text-slate-900">
                      {s.brand} {s.model} ({s.year})
                    </p>
                    <p className="font-bold text-slate-700 tabular-nums">
                      السعر المطلوب: {formatNumber(s.askingPrice)} جنيه
                    </p>
                    <p className="font-bold text-emerald-700">{s.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Login / Update User Profile */}
      {activeTab === 'login' && (
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-black text-slate-900">تسجيل الدخول / تحديث بيانات العميل</h2>
          <p className="text-xs font-semibold text-slate-600">
            سجل اسمك ورقم موبايلك لربط جميع طلبات الفحص والمعاينات بحسابك مباشرة.
          </p>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs font-bold text-red-800">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} noValidate className="space-y-4">
            <div>
              <label htmlFor="acc-name" className="block text-xs font-extrabold text-slate-900 mb-1">
                الاسم بالكامل *
              </label>
              <input
                id="acc-name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="اكتب اسمك"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="acc-phone" className="block text-xs font-extrabold text-slate-900 mb-1">
                رقم الموبايل *
              </label>
              <input
                id="acc-phone"
                type="tel"
                dir="ltr"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="01xxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-colors"
            >
              حفظ وتسجيل الدخول
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
