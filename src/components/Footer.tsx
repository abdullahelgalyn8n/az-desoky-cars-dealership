import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { DesokyLogo } from './DesokyLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <DesokyLogo variant="dark" />
            </Link>
            <p className="text-xs font-bold text-red-400">المعيار الذهبي للجودة في مصر</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              المنصة المعتمدة الأولى لبيع وشراء وفحص السيارات المستعملة في مصر. كل عربية على المنصة مفحوصة فنياً بـ 150 نقطة وقانونياً بالكامل.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm font-medium text-slate-300">
              <li>
                <Link to="/cars" className="hover:text-white transition-colors">
                  اشتري عربية مفحوصة
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-white transition-colors">
                  بيع عربيتك بأفضل سعر
                </Link>
              </li>
              <li>
                <Link to="/inspection" className="hover:text-white transition-colors">
                  خدمة الفحص في مكانك
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors">
                  مقارنة السيارات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  من نحن وقصتنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">تواصل معانا</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li>
                <a
                  href="tel:01276111473"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-red-400 shrink-0" />
                  <span dir="ltr">01276111473</span>
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تواصل عبر واتساب أو الرسائل</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
                >
                  <span>متابعة طلبات الفحص والبيع</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Area & Hours */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">نطاق الخدمة ومواعيد العمل</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white">القاهرة والجيزة</p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    مدينة نصر · التجمع · الرحاب · المعادي · الشيخ زايد · 6 أكتوبر
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 pt-1">
                مواعيد العمل: السبت - الخميس من 9:00 صباحاً حتى 9:00 مساءً
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              معايير الفحص المعتمدة
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              الدعم وخدمة العملاء
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
