import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Upload, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { BRANDS_LIST, BRAND_MODELS } from '../data/carsData';
import { estimateCarValuation, formatNumber, validateEgyptianPhone } from '../utils/carUtils';
import { useApp, SellCarSubmission } from '../context/AppContext';

export const SellCarPage: React.FC = () => {
  const { submitSellCar } = useApp();

  const [firstOwner, setFirstOwner] = useState<'نعم' | 'لا'>('نعم');
  const [maintenance, setMaintenance] = useState<'نعم كلها' | 'مش كلها' | 'بره التوكيل'>('نعم كلها');
  const [paint, setPaint] = useState<'فبريكا بالكامل' | 'مدهونة كلياً' | 'دهان جزئي'>('فبريكا بالكامل');

  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('Hyundai');
  const [model, setModel] = useState('Tucson');
  const [year, setYear] = useState<number>(2023);
  const [mileage, setMileage] = useState<number>(45000);
  const [askingPrice, setAskingPrice] = useState<string>('1450000');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [publishToCatalog, setPublishToCatalog] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<SellCarSubmission | null>(null);

  const availableModels = BRAND_MODELS[brand] || ['أخرى'];

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    const models = BRAND_MODELS[newBrand] || ['موديل قياسي'];
    setModel(models[0]);
  };

  const valuation = estimateCarValuation({
    brand,
    year: Number(year) || 2022,
    mileage: Number(mileage) || 50000,
    firstOwner,
    maintenance,
    paint,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const names = Array.from(files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ownerName.trim()) {
      setErrorMsg('يرجى كتابة الاسم بالكامل.');
      return;
    }
    if (!validateEgyptianPhone(phone)) {
      setErrorMsg('يرجى إدخال رقم موبايل مصري صحيح (11 رقم يبدأ بـ 01).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('يرجى إدخال العنوان (المنطقة - المدينة) لتحديد موعد المعاينة.');
      return;
    }
    const numericPrice = Number(askingPrice);
    if (!numericPrice || numericPrice < 100000) {
      setErrorMsg('يرجى إدخال السعر المطلوب بشكل صحيح.');
      return;
    }

    const record = submitSellCar(
      {
        firstOwner,
        maintenance,
        paint,
        ownerName: ownerName.trim(),
        phone: phone.trim(),
        brand,
        model,
        year: Number(year),
        mileage: Number(mileage),
        askingPrice: numericPrice,
        address: address.trim(),
        notes: notes.trim(),
      },
      publishToCatalog
    );

    setSubmittedRecord(record);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
          <Car className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">بيع عربيتك</h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700">
          سجّل بيانات عربيتك وهنبعتلك مهندس فحص. لو العربية مناسبة لمعايير دسوقي هتنزل على الموقع وتتباع بأفضل سعر.
        </p>
      </div>

      {submittedRecord ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-600 p-8 text-center space-y-5 max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">تم استلام طلب بيع عربيتك بنجاح!</h2>
          <p className="text-sm font-bold text-slate-700">
            رقم طلب المتابعة: <span className="text-red-600 font-black tabular-nums">{submittedRecord.trackingCode}</span>
          </p>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-right text-sm space-y-2">
            <p className="font-bold text-slate-900">
              السيارة: <span dir="ltr">{submittedRecord.brand} {submittedRecord.model} {submittedRecord.year}</span>
            </p>
            <p className="font-bold text-slate-800 tabular-nums">
              السعر المطلوب: {formatNumber(submittedRecord.askingPrice)} جنيه · الكيلومترات: {formatNumber(submittedRecord.mileage)} كم
            </p>
            <p className="font-bold text-emerald-800">
              الحالة: {submittedRecord.status}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/cars"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-extrabold transition-colors"
            >
              مشاهدة السيارات المعروضة
            </Link>
            <button
              type="button"
              onClick={() => setSubmittedRecord(null)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-extrabold transition-colors"
            >
              تسجيل سيارة أخرى
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Card (8 Cols) */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-sm font-bold text-red-800">
                {errorMsg}
              </div>
            )}

            {/* 3 Quick Condition Selectors (High Contrast) */}
            <div className="space-y-5 pb-6 border-b border-slate-200">
              <div>
                <label className="block text-sm font-black text-slate-900 mb-2.5">
                  هل انت مالك أول للعربية؟ <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['نعم', 'لا'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFirstOwner(opt)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-extrabold border transition-colors ${
                        firstOwner === opt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-900 mb-2.5">
                  هل صيانة العربية تتم في التوكيل؟ <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['نعم كلها', 'مش كلها', 'بره التوكيل'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMaintenance(opt)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-extrabold border transition-colors ${
                        maintenance === opt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-900 mb-2.5">
                  هل العربية فبريكا بالكامل؟ <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['فبريكا بالكامل', 'دهان جزئي', 'مدهونة كلياً'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPaint(opt)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-extrabold border transition-colors ${
                        paint === opt
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal & Vehicle Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="sell-name" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الاسم بالكامل *
                </label>
                <input
                  id="sell-name"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="اسمك بالكامل"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="sell-phone" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  رقم الموبايل *
                </label>
                <input
                  id="sell-phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold text-right focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="sell-brand" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الماركة *
                </label>
                <select
                  id="sell-brand"
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
                <label htmlFor="sell-model" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الموديل *
                </label>
                <select
                  id="sell-model"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="sell-year" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  سنة الصنع *
                </label>
                <input
                  id="sell-year"
                  type="number"
                  min={2005}
                  max={2026}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold tabular-nums focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="sell-km" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  الكيلومترات *
                </label>
                <input
                  id="sell-km"
                  type="number"
                  min={0}
                  step={1000}
                  value={mileage}
                  onChange={(e) => setMileage(Number(e.target.value))}
                  placeholder="50000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold tabular-nums focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="sell-price" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  السعر المطلوب (جنيه) *
                </label>
                <input
                  id="sell-price"
                  type="number"
                  min={100000}
                  step={5000}
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  placeholder="احرص على كتابة سعر عادل"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-bold tabular-nums focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sell-address" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                العنوان (المنطقة - المدينة) *
              </label>
              <input
                id="sell-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="مثال: مدينة نصر - القاهرة"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
              />
            </div>

            <div>
              <label htmlFor="sell-notes" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                ملاحظات إضافية
              </label>
              <textarea
                id="sell-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أي تفاصيل تانية عن العربية، الفئة، الكماليات، أو تاريخ الرخصة..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-500 text-sm font-semibold focus:bg-white"
              />
            </div>

            {/* Upload Car Photos */}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-1.5">
                صور العربية
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-red-500 rounded-2xl p-6 bg-slate-50 hover:bg-red-50/30 cursor-pointer transition-colors text-center">
                <Upload className="w-7 h-7 text-slate-600 mb-2" />
                <span className="text-sm font-extrabold text-slate-800">اضغط لرفع صور العربية</span>
                <span className="text-xs font-semibold text-slate-600 mt-1">
                  يفضل صور واضحة من كل الزوايا ومن الداخل
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {uploadedFiles.length > 0 && (
                <p className="text-xs font-bold text-emerald-700 mt-2">
                  تم إرفاق {uploadedFiles.length} صور: {uploadedFiles.join('، ')}
                </p>
              )}
            </div>

            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={publishToCatalog}
                onChange={(e) => setPublishToCatalog(e.target.checked)}
                className="w-4 h-4 rounded text-red-600"
              />
              <span>إدراج السيارة مباشرة في معرض السيارات لاختبار ظهورها الفوري</span>
            </label>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base transition-colors shadow-xs"
            >
              إرسال طلب البيع
            </button>
          </form>

          {/* Left Column (RTL): Instant Valuation Assistant & Selling Benefits (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            <div className="bg-[#0B192C] text-white rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-400 text-xs font-extrabold">
                <Sparkles className="w-4 h-4" />
                <span>تقييم استرشادي فوري</span>
              </div>
              <h2 className="text-xl font-black">السعر المتوقع لعربيتك</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                بناءً على بيانات ({brand} {model} {year}) وحالة الدهان ({paint}):
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-slate-300">النطاق السعري العادل بالسوق:</p>
                <p className="text-lg font-black text-white tabular-nums">
                  {formatNumber(valuation.minEstimate)} – {formatNumber(valuation.maxEstimate)} جنيه
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">السعر الموصى به للبيع السريع:</span>
                  <button
                    type="button"
                    onClick={() => setAskingPrice(String(valuation.fairPrice))}
                    className="font-black text-red-400 hover:underline tabular-nums"
                  >
                    {formatNumber(valuation.fairPrice)} جنيه (تطبيق)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span>مميزات البيع مع DESOKY</span>
              </h3>
              <ul className="space-y-3 text-xs font-bold text-slate-700 leading-relaxed">
                <li>1. فحص فني وتصوير احترافي داخل استوديو دسوقي.</li>
                <li>2. تسويق عربيتك لآلاف المشترين الجادين يومياً.</li>
                <li>3. نتولى كل مكالمات واستفسارات المشترين والمعاينات.</li>
                <li>4. ضمان أمان التحويل البنكي أو النقدي وعقود البيع الرسمية.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
