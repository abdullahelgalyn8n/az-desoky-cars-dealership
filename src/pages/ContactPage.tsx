import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { validateEgyptianPhone } from '../utils/carUtils';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('استفسار عن شراء سيارة');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('يرجى إدخال الاسم.');
      return;
    }
    if (!validateEgyptianPhone(phone)) {
      setError('يرجى إدخال رقم موبايل مصري صحيح.');
      return;
    }
    if (!message.trim()) {
      setError('يرجى كتابة رسالتك أو استفسارك.');
      return;
    }
    setSent(true);
    showToast('تم إرسال رسالتك بنجاح لفريق خدمة عملاء DESOKY');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">تواصل معانا</h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700">
          فريق خدمة عملاء ومهندسين DESOKY جاهز للرد على استفساراتك طوال أيام الأسبوع
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-lg font-black text-slate-900">قنوات الاتصال المباشر</h2>

            <a
              href="tel:01276111473"
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-red-50 border border-slate-200 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">الخط الساخن والمبيعات</p>
                <p className="text-lg font-black text-slate-900 tabular-nums" dir="ltr">
                  01276111473
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">خدمة واتساب الفورية</p>
                <p className="text-sm font-black text-slate-900 tabular-nums" dir="ltr">
                  +20 127 611 1473
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">مراكز المعاينة والفحص المتنقل</p>
                <p className="text-sm font-black text-slate-900">
                  مدينة نصر · التجمع الخامس · الشيخ زايد · المعادي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600">مواعيد العمل</p>
                <p className="text-sm font-black text-slate-900">السبت إلى الخميس: 9:00 ص – 9:00 م</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-2xl font-black text-slate-900">شكراً لتواصلك مع DESOKY!</h2>
              <p className="text-sm font-semibold text-slate-700">
                تم استلام رسالتك وسيقوم أحد مسؤولي خدمة العملاء بالاتصال بك خلال دقائق.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setName('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="text-xl font-black text-slate-900">أرسل لنا رسالة مباشرة</h2>
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-300 text-xs font-bold text-red-800">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                    الاسم بالكامل *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                    رقم الموبايل *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 text-right"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  موضوع الرسالة
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                >
                  <option value="استفسار عن شراء سيارة">استفسار عن شراء سيارة معروضة</option>
                  <option value="متابعة طلب فحص">متابعة طلب فحص فني</option>
                  <option value="بيع سيارة">استفسار عن بيع أو تقييم سيارة</option>
                  <option value="تقسيط وتمويل">استفسار عن أنظمة التقسيط البنكي</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-extrabold text-slate-900 mb-1.5">
                  تفاصيل الرسالة *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب استفسارك بالتفصيل..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-colors"
              >
                إرسال الرسالة
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
