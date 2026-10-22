import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DesokyLogo } from './DesokyLogo';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { compareIds } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/cars', label: 'اشتري عربية' },
    { to: '/sell', label: 'بيع عربيتك' },
    { to: '/inspection', label: 'خدمة الفحص' },
    { to: '/about', label: 'من نحن' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand Title (single line) */}
        <Link
          to="/"
          aria-label="DESOKY للسيارات - الصفحة الرئيسية"
          className="whitespace-nowrap shrink-0 focus:outline-none"
        >
          <DesokyLogo variant="light" />
        </Link>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-7 text-sm font-bold">
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                  active
                    ? 'text-red-600 border-red-600'
                    : 'text-slate-800 border-transparent hover:text-red-600 hover:border-red-600/40'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/login"
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 shadow-xs"
          >
            {compareIds.length > 0 ? `طلباتي (${compareIds.length})` : 'تسجيل الدخول'}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-bold ${
                  active ? 'bg-red-50 text-red-700' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
            <Link
              to="/compare"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200"
            >
              مقارنة السيارات ({compareIds.length})
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
            >
              تواصل معانا
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
