import React, { createContext, useContext, useState, useEffect } from 'react';
import { CarItem, INITIAL_CARS, BRANDS_LIST } from '../data/carsData';

export interface SellCarSubmission {
  id: string;
  trackingCode: string;
  createdAt: string;
  firstOwner: 'نعم' | 'لا';
  maintenance: 'نعم كلها' | 'مش كلها' | 'بره التوكيل';
  paint: 'فبريكا بالكامل' | 'مدهونة كلياً' | 'دهان جزئي';
  ownerName: string;
  phone: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  askingPrice: number;
  address: string;
  notes: string;
  status: 'قيد المراجعة وتحديد موعد الفحص' | 'تمت الموافقة ونُشرت بالمعرض';
}

export interface InspectionBooking {
  id: string;
  bookingCode: string;
  createdAt: string;
  customerName: string;
  phone: string;
  brand: string;
  model: string;
  year: number;
  address: string;
  packageType: 'الفحص الأساسي (1,500 جنيه)' | 'الفحص المتقدم الشامل (2,200 جنيه)' | 'فحص السيارات الفارهة والـ VIP (3,000 جنيه)';
  preferredDate: string;
  notes: string;
  status: 'تم تأكيد الحجز - المهندس في انتظار الموعد';
}

export interface ViewingReservation {
  id: string;
  reservationCode: string;
  createdAt: string;
  carId: string;
  carTitle: string;
  carSlug: string;
  carPrice: number;
  customerName: string;
  phone: string;
  paymentMethod: 'كاش' | 'تقسيط بنكي';
  preferredTime: string;
  notes: string;
}

interface AppContextType {
  cars: CarItem[];
  favorites: string[];
  compareIds: string[];
  sellSubmissions: SellCarSubmission[];
  inspectionBookings: InspectionBooking[];
  viewingReservations: ViewingReservation[];
  toastMessage: string | null;
  toggleFavorite: (carId: string) => void;
  toggleCompare: (carId: string) => void;
  clearCompare: () => void;
  submitSellCar: (data: Omit<SellCarSubmission, 'id' | 'trackingCode' | 'createdAt' | 'status'>, publishImmediately?: boolean) => SellCarSubmission;
  submitInspectionBooking: (data: Omit<InspectionBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => InspectionBooking;
  submitViewingReservation: (data: Omit<ViewingReservation, 'id' | 'reservationCode' | 'createdAt'>) => ViewingReservation;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<CarItem[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_cars_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_CARS.length) {
          return parsed;
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_CARS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_favs_v1');
      return saved ? JSON.parse(saved) : ['1', '4', '21'];
    } catch {
      return ['1', '4', '21'];
    }
  });

  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_compare_v1');
      return saved ? JSON.parse(saved) : ['1', '4'];
    } catch {
      return ['1', '4'];
    }
  });

  const [sellSubmissions, setSellSubmissions] = useState<SellCarSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_sell_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inspectionBookings, setInspectionBookings] = useState<InspectionBooking[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_inspections_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [viewingReservations, setViewingReservations] = useState<ViewingReservation[]>(() => {
    try {
      const saved = localStorage.getItem('desoky_reservations_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_cars_v1', JSON.stringify(cars));
    } catch {}
  }, [cars]);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_favs_v1', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_compare_v1', JSON.stringify(compareIds));
    } catch {}
  }, [compareIds]);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_sell_v1', JSON.stringify(sellSubmissions));
    } catch {}
  }, [sellSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_inspections_v1', JSON.stringify(inspectionBookings));
    } catch {}
  }, [inspectionBookings]);

  useEffect(() => {
    try {
      localStorage.setItem('desoky_reservations_v1', JSON.stringify(viewingReservations));
    } catch {}
  }, [viewingReservations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const toggleFavorite = (carId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(carId);
      const next = exists ? prev.filter((id) => id !== carId) : [...prev, carId];
      showToast(exists ? 'تمت إزالة السيارة من المفضلة' : 'تمت إضافة السيارة إلى المفضلة');
      return next;
    });
  };

  const toggleCompare = (carId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(carId)) {
        showToast('تمت إزالة السيارة من قائمة المقارنة');
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        showToast('يمكنك مقارنة 3 سيارات كحد أقصى في نفس الوقت');
        return prev;
      }
      showToast('تمت إضافة السيارة إلى قائمة المقارنة');
      return [...prev, carId];
    });
  };

  const clearCompare = () => {
    setCompareIds([]);
    showToast('تم مسح قائمة المقارنة');
  };

  const submitSellCar = (
    data: Omit<SellCarSubmission, 'id' | 'trackingCode' | 'createdAt' | 'status'>,
    publishImmediately = true
  ): SellCarSubmission => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const submission: SellCarSubmission = {
      ...data,
      id: `sell-${Date.now()}`,
      trackingCode: `DSK-SELL-${num}`,
      createdAt: 'اليوم',
      status: publishImmediately ? 'تمت الموافقة ونُشرت بالمعرض' : 'قيد المراجعة وتحديد موعد الفحص',
    };

    setSellSubmissions((prev) => [submission, ...prev]);

    if (publishImmediately) {
      const brandObj = BRANDS_LIST.find((b) => b.id.toLowerCase() === data.brand.toLowerCase());
      const newCar: CarItem = {
        id: `${cars.length + 1}`,
        slug: `${data.brand.toLowerCase().replace(/\s+/g, '-')}-${data.model.toLowerCase().replace(/\s+/g, '-')}-${data.year}-${num}`,
        title: `${data.brand} ${data.model} ${data.year}`,
        brand: data.brand,
        brandAr: brandObj ? brandObj.nameAr : data.brand,
        model: data.model,
        year: data.year,
        price: data.askingPrice,
        mileage: data.mileage,
        transmission: 'أوتوماتيك',
        fuel: 'بنزين',
        bodyType: 'سيدان',
        color: 'رمادي ميتاليك',
        location: data.address,
        locationAr: data.address,
        image: '/assets/cars/car-1.jpg',
        featured: true,
        inspected: true,
        firstOwner: data.firstOwner === 'نعم',
        paintCondition: data.paint === 'فبريكا بالكامل' ? 'فبريكا بالكامل' : 'دهان تجميلي بسيط',
        agencyMaintenance: data.maintenance === 'نعم كلها' ? 'صيانات توكيل بالكامل' : 'صيانات منتظمة بمركز معتمد',
        overallScore: data.paint === 'فبريكا بالكامل' ? 97 : 92,
        reportCode: `DSK-2026-${num}`,
        inspectionDate: 'أكتوبر 2026',
        inspectorName: 'م. أحمد الدسوقي',
        inspectorNotes: data.notes || 'تم تسجيل السيارة وفحصها مبدئياً ضمن معايير دسوقي للجودة.',
        legalStatus: 'فحص قانوني ومروري سليم 100% - رخصة سارية',
        engineSpecs: {
          cc: '1600 سي سي',
          horsepower: '130 حصان',
          torque: '200 نيوتن.متر',
          cylinders: '4 سلندر',
          drivetrain: 'جر أمامي FWD',
          licenseExpiry: 'سارية',
          trafficUnit: `مرور ${data.address}`,
        },
        features: [
          'تمت المراجعة بواسطة فريق فحص دسوقي',
          'بصمة وتشغيل ذكي',
          'شاشة وسطية وكاميرا خلفية',
          'وسائد هوائية وفرامل ABS + EBD',
        ],
        inspectionSections: INITIAL_CARS[0].inspectionSections,
      };
      setCars((prev) => [newCar, ...prev]);
    }

    showToast(`تم تسجيل طلب بيع عربيتك بنجاح (${submission.trackingCode})`);
    return submission;
  };

  const submitInspectionBooking = (
    data: Omit<InspectionBooking, 'id' | 'bookingCode' | 'createdAt' | 'status'>
  ): InspectionBooking => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const booking: InspectionBooking = {
      ...data,
      id: `insp-${Date.now()}`,
      bookingCode: `DSK-INSP-${num}`,
      createdAt: 'اليوم',
      status: 'تم تأكيد الحجز - المهندس في انتظار الموعد',
    };
    setInspectionBookings((prev) => [booking, ...prev]);
    showToast(`تم تأكيد حجز الفحص بنجاح (${booking.bookingCode})`);
    return booking;
  };

  const submitViewingReservation = (
    data: Omit<ViewingReservation, 'id' | 'reservationCode' | 'createdAt'>
  ): ViewingReservation => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const reservation: ViewingReservation = {
      ...data,
      id: `res-${Date.now()}`,
      reservationCode: `DSK-VIEW-${num}`,
      createdAt: 'اليوم',
    };
    setViewingReservations((prev) => [reservation, ...prev]);
    showToast(`تم حجز موعد المعاينة بنجاح (${reservation.reservationCode})`);
    return reservation;
  };

  return (
    <AppContext.Provider
      value={{
        cars,
        favorites,
        compareIds,
        sellSubmissions,
        inspectionBookings,
        viewingReservations,
        toastMessage,
        toggleFavorite,
        toggleCompare,
        clearCompare,
        submitSellCar,
        submitInspectionBooking,
        submitViewingReservation,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
