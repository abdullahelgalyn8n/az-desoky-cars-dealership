import { CarItem } from '../data/carsData';

export interface CarFilters {
  searchQuery?: string;
  brand?: string;
  bodyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
  firstOwnerOnly?: boolean;
  factoryPaintOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'score-desc';
}

export function filterAndSortCars(cars: CarItem[], filters: CarFilters): CarItem[] {
  const q = (filters.searchQuery || '').trim().toLowerCase();

  const filtered = cars.filter((car) => {
    if (q) {
      const searchable = `${car.title} ${car.brand} ${car.brandAr} ${car.model} ${car.year} ${car.locationAr} ${car.bodyType}`.toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (filters.brand && filters.brand !== 'all' && car.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    if (filters.bodyType && filters.bodyType !== 'all' && car.bodyType !== filters.bodyType) {
      return false;
    }
    if (typeof filters.minPrice === 'number' && filters.minPrice > 0 && car.price < filters.minPrice) {
      return false;
    }
    if (typeof filters.maxPrice === 'number' && filters.maxPrice > 0 && car.price > filters.maxPrice) {
      return false;
    }
    if (typeof filters.minYear === 'number' && filters.minYear > 0 && car.year < filters.minYear) {
      return false;
    }
    if (typeof filters.maxMileage === 'number' && filters.maxMileage > 0 && car.mileage > filters.maxMileage) {
      return false;
    }
    if (filters.firstOwnerOnly && !car.firstOwner) {
      return false;
    }
    if (filters.factoryPaintOnly && car.paintCondition !== 'فبريكا بالكامل') {
      return false;
    }
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'year-desc':
      sorted.sort((a, b) => b.year - a.year || a.mileage - b.mileage);
      break;
    case 'mileage-asc':
      sorted.sort((a, b) => a.mileage - b.mileage);
      break;
    case 'score-desc':
      sorted.sort((a, b) => b.overallScore - a.overallScore);
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || Number(a.id) - Number(b.id));
      break;
  }

  return sorted;
}

export interface InstallmentResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyInstallment: number;
  totalPayable: number;
}

export function calculateInstallment(params: {
  price: number;
  downPaymentPercent: number;
  years: number;
  annualInterestRate?: number;
}): InstallmentResult {
  const { price, downPaymentPercent, years, annualInterestRate = 16.5 } = params;
  const clampedPercent = Math.min(80, Math.max(10, downPaymentPercent));
  const clampedYears = Math.min(7, Math.max(1, years));
  const downPaymentAmount = Math.round((price * clampedPercent) / 100);
  const loanAmount = Math.max(0, price - downPaymentAmount);
  const totalInterest = loanAmount * (annualInterestRate / 100) * clampedYears;
  const totalLoanWithInterest = loanAmount + totalInterest;
  const months = clampedYears * 12;
  const monthlyInstallment = months > 0 ? Math.round(totalLoanWithInterest / months) : 0;

  return {
    downPaymentAmount,
    loanAmount,
    monthlyInstallment,
    totalPayable: downPaymentAmount + totalLoanWithInterest,
  };
}

export function estimateCarValuation(params: {
  brand: string;
  year: number;
  mileage: number;
  firstOwner: 'نعم' | 'لا';
  maintenance: 'نعم كلها' | 'مش كلها' | 'بره التوكيل';
  paint: 'فبريكا بالكامل' | 'دهان جزئي' | 'مدهونة كلياً';
}): { minEstimate: number; maxEstimate: number; fairPrice: number } {
  const brandBaseMap: Record<string, number> = {
    'Mercedes-Benz': 2100000,
    'BMW': 2300000,
    'Cupra': 1750000,
    'Skoda': 1550000,
    'Peugeot': 1400000,
    'Citroen': 1350000,
    'Hyundai': 1350000,
    'Kia': 1350000,
    'Toyota': 1400000,
    'Honda': 1450000,
    'Nissan': 1250000,
    'Jetour': 1350000,
    'SEAT': 1150000,
    'Opel': 1200000,
    'Baic': 1150000,
    'MG': 1000000,
    'Chery': 920000,
    'Chevrolet': 950000,
    'Renault': 900000,
    'Soueast': 1100000,
    'Lada': 520000,
  };

  const base = brandBaseMap[params.brand] || 1100000;
  const ageYears = Math.max(0, 2026 - (params.year || 2022));
  const ageFactor = Math.max(0.45, 1 - ageYears * 0.055);

  const kmPenalty = Math.min(0.28, Math.max(0, (params.mileage || 0) / 10000) * 0.015);
  const ownerBonus = params.firstOwner === 'نعم' ? 1.03 : 0.97;
  const maintMultiplier =
    params.maintenance === 'نعم كلها' ? 1.04 : params.maintenance === 'مش كلها' ? 0.99 : 0.94;
  const paintMultiplier =
    params.paint === 'فبريكا بالكامل' ? 1.05 : params.paint === 'دهان جزئي' ? 0.94 : 0.84;

  const rawFair = base * (ageFactor - kmPenalty) * ownerBonus * maintMultiplier * paintMultiplier;
  const fairPrice = Math.max(250000, Math.round(rawFair / 10000) * 10000);
  const minEstimate = Math.round((fairPrice * 0.95) / 5000) * 5000;
  const maxEstimate = Math.round((fairPrice * 1.05) / 5000) * 5000;

  return { minEstimate, maxEstimate, fairPrice };
}

export function validateEgyptianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^01[0125]\d{8}$/.test(cleaned);
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}
