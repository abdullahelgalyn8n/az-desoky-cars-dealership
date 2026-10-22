import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Trash2, PlusCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/carUtils';

export const ComparePage: React.FC = () => {
  const { cars, compareIds, toggleCompare, clearCompare } = useApp();

  const comparedCars = cars.filter((c) => compareIds.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <Scale className="w-7 h-7 text-red-600" />
            <span>مقارنة السيارات المفحوصة</span>
          </h1>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            قارن بين المواصفات، الأسعار، وتقارير فحص دسوقي جنباً إلى جنب (حتى 3 سيارات)
          </p>
        </div>

        {comparedCars.length > 0 && (
          <div className="flex items-center gap-3">
            <Link
              to="/cars"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-extrabold"
            >
              إضافة سيارة أخرى
            </Link>
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-extrabold"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح الكل</span>
            </button>
          </div>
        )}
      </div>

      {comparedCars.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <PlusCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-black text-slate-900">قائمة المقارنة فارغة حالياً</h2>
          <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
            اختر أيقونة الميزان على أي سيارة في المعرض لإضافتها إلى جدول المقارنة الفورية.
          </p>
          <Link
            to="/cars"
            className="inline-block px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
          >
            تصفح السيارات المعروضة
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-5 w-48 bg-slate-50 text-sm font-black text-slate-900 align-top">
                  المواصفات والبيانات
                </th>
                {comparedCars.map((car) => (
                  <th key={car.id} className="p-5 align-top border-r border-slate-200 w-72">
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={car.image}
                          alt={car.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/cars/${car.slug}`}
                          className="text-base font-black text-slate-900 hover:text-red-600"
                          dir="ltr"
                        >
                          {car.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleCompare(car.id)}
                          className="text-xs font-bold text-red-600 hover:underline shrink-0"
                        >
                          حذف
                        </button>
                      </div>
                      <p className="text-lg font-black text-red-600 tabular-nums">
                        {formatNumber(car.price)} <span className="text-xs text-slate-700">جنيه</span>
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">درجة فحص دسوقي</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-black text-emerald-700 tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      {car.overallScore}% ({car.reportCode})
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">الماركة والموديل</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.brandAr} · {car.model}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">سنة الصنع</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900 tabular-nums">
                    {car.year}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">الكيلومترات</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900 tabular-nums">
                    {formatNumber(car.mileage)} كم
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">حالة الدهان</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.paintCondition}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">سجل الصيانة</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.agencyMaintenance}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">المحرك والقوة</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.engineSpecs.cc} · {car.engineSpecs.horsepower}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">نوع الهيكل واللون</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.bodyType} · {car.color}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">مكان المعاينة</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200 font-bold text-slate-900">
                    {car.locationAr}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-slate-50 font-extrabold text-slate-800">الإجراء</td>
                {comparedCars.map((car) => (
                  <td key={car.id} className="p-4 border-r border-slate-200">
                    <Link
                      to={`/cars/${car.slug}`}
                      className="block w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-center text-xs font-extrabold transition-colors"
                    >
                      عرض التقرير وحجز معاينة
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
