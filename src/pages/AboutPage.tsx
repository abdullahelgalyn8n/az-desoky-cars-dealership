import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  HeartHandshake,
  TrendingUp,
  Wrench,
  Users,
  MapPin,
  Clock,
  Phone,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Banner (High Contrast) */}
      <section className="bg-[#0B192C] text-white py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-xs font-extrabold text-red-400 tracking-wide">من نحن</p>
          <h1 className="text-3xl sm:text-5xl font-black text-white">DESOKY للسيارات</h1>
          <p className="text-base sm:text-lg font-medium text-slate-200 max-w-2xl mx-auto">
            المعيار الذهبي للجودة في بيع وشراء وفحص السيارات المستعملة في مصر
          </p>
        </div>
      </section>

      {/* 2. Our Story ("قصتنا") + Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">قصتنا</h2>
            <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
              بدأنا DESOKY من فكرة بسيطة: إن أي حد يشتري عربية مستعملة لازم يكون متأكد 100% من حالتها. كتير ناس اتنصبت واشترت عربيات فيها مشاكل خفية في الشاسيه أو المحرك أو الأوراق، وده اللي خلانا نقرر نعمل حاجة مختلفة.
            </p>
            <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
              جمعنا فريق من أحسن المهندسين المختصين في فحص السيارات، وبنينا نظام فحص شامل من 150 نقطة يغطي كل حاجة من المحرك للكهرباء للأوراق القانونية. هدفنا إن كل عربية تنزل على الموقع تكون مفحوصة ومعتمدة بشفافية كاملة.
            </p>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              النهاردة، DESOKY بقت الوجهة الأولى لأي حد عايز يشتري أو يبيع عربية مستعملة بأمان وثقة في القاهرة والجيزة.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { num: '+500', label: 'عملية فحص فني تمت' },
              { num: '+350', label: 'عربية معتمدة اتباعت' },
              { num: '98%', label: 'نسبة رضا العملاء' },
              { num: '+50', label: 'مهندس فحص مختص' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-1.5"
              >
                <p className="text-3xl font-black text-red-600 tabular-nums">{stat.num}</p>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision ("مهمتنا ورؤيتنا") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">مهمتنا</h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
            نوفر تجربة شراء وبيع سيارات مستعملة آمنة وموثوقة من خلال فحص فني وقانوني شامل لكل عربية، ونساعد الناس ياخدوا قرارات صح مبنية على تقارير هندسية دقيقة.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">رؤيتنا</h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
            نكون المنصة الأولى والأكبر لبيع وشراء السيارات المستعملة المفحوصة في مصر والشرق الأوسط، ونغيّر ثقافة شراء العربيات المستعملة للأحسن.
          </p>
        </div>
      </section>

      {/* 4. Core Values ("قيمنا") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">قيمنا</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            المبادئ اللي بنشتغل بيها كل يوم في خدمة عملائنا
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'الأمانة والشفافية',
              desc: 'بنقول الحقيقة كاملة عن كل عربية في التقرير، مفيش أي تفصيلة مخفية.',
            },
            {
              icon: Award,
              title: 'الجودة أولاً',
              desc: 'معايير فحص صارمة ومهندسين مختصين لضمان أعلى جودة في كل سيارة.',
            },
            {
              icon: HeartHandshake,
              title: 'خدمة العميل',
              desc: 'راحة العميل ورضاه هي أولويتنا، بنكون معاك خطوة بخطوة لحد استلام العربية.',
            },
            {
              icon: TrendingUp,
              title: 'التطوير المستمر',
              desc: 'دايماً بنطور خدماتنا وأحدث أجهزة الفحص عشان نقدم أدق تجربة في مصر.',
            },
          ].map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">{val.title}</h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Our Team ("فريقنا") */}
      <section className="bg-[#0B192C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black">فريقنا</h2>
            <p className="text-sm font-medium text-slate-300 mt-1">
              فريق محترف ومتخصص في عالم السيارات والفحص الهندسي
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: Wrench,
                title: 'فريق الفحص الفني',
                desc: 'مهندسين مختصين في فحص المحركات والشاسيه والكمبيوتر',
              },
              {
                icon: Users,
                title: 'فريق المبيعات',
                desc: 'متخصصين في خدمة العملاء وتسهيل إجراءات المعاينة والشراء',
              },
              {
                icon: Target,
                title: 'فريق التسويق والتصوير',
                desc: 'بنوصل عربيتك لأكبر عدد من المشترين الجادين بأفضل عرض',
              },
              {
                icon: Eye,
                title: 'فريق الجودة القانونية',
                desc: 'مراجعة الرخص والتوكيلات وشهادات البيانات لضمان أمان الصفقة',
              },
            ].map((team) => {
              const Icon = team.icon;
              return (
                <div
                  key={team.title}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-white">{team.title}</h3>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">{team.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Our Journey ("رحلتنا") */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">رحلتنا</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            محطات النمو والتوسع منذ التأسيس
          </p>
        </div>

        <div className="space-y-4">
          {[
            { year: '2023', text: 'تأسيس DESOKY وبداية خدمات فحص السيارات الميدانية في القاهرة' },
            { year: '2024', text: 'إطلاق المنصة الإلكترونية المعتمدة لبيع وشراء السيارات المفحوصة' },
            { year: '2025', text: 'الوصول لأكثر من 500 عملية فحص فني و350 سيارة مباعة بنسبة رضا 98%' },
            { year: '2026', text: 'التوسع في خدمات التمويل والتقسيط وتغطية كافة مناطق القاهرة والجيزة' },
          ].map((item) => (
            <div
              key={item.year}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-black text-sm flex items-center justify-center shrink-0 tabular-nums">
                {item.year}
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-900">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Contact Info Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-2">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-600">الموقع ونطاق التغطية</p>
            <p className="text-base font-black text-slate-900">القاهرة والجيزة، مصر</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-2">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-600">ساعات العمل الرسمية</p>
            <p className="text-base font-black text-slate-900">السبت - الخميس: 9 ص - 9 م</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-2">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Phone className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-600">رقم التواصل المباشر</p>
            <a
              href="tel:01276111473"
              className="block text-base font-black text-slate-900 hover:text-red-600 tabular-nums"
              dir="ltr"
            >
              01276111473
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/cars"
            className="inline-block px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm transition-colors"
          >
            استعرض السيارات المفحوصة الآن
          </Link>
        </div>
      </section>
    </div>
  );
};
