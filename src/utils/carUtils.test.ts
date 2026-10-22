import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortCars,
  calculateInstallment,
  estimateCarValuation,
  validateEgyptianPhone,
} from './carUtils';
import { INITIAL_CARS } from '../data/carsData';

test('filterAndSortCars filters by brand and search query accurately', () => {
  const nissanCars = filterAndSortCars(INITIAL_CARS, { brand: 'Nissan' });
  assert.equal(nissanCars.length, 3);
  assert.ok(nissanCars.every((c) => c.brand === 'Nissan'));

  const searchRes = filterAndSortCars(INITIAL_CARS, { searchQuery: 'Ibiza' });
  assert.equal(searchRes.length, 2);
});

test('filterAndSortCars sorts by price ascending and descending', () => {
  const asc = filterAndSortCars(INITIAL_CARS, { sortBy: 'price-asc' });
  assert.ok(asc[0].price <= asc[1].price);
  assert.equal(asc[0].slug, 'lada-granta-2022');

  const desc = filterAndSortCars(INITIAL_CARS, { sortBy: 'price-desc' });
  assert.ok(desc[0].price >= desc[1].price);
  assert.equal(desc[0].slug, 'bmw-320i-2023');
});

test('calculateInstallment computes accurate down payment and monthly installment', () => {
  const res = calculateInstallment({
    price: 1000000,
    downPaymentPercent: 30,
    years: 3,
    annualInterestRate: 15,
  });
  assert.equal(res.downPaymentAmount, 300000);
  assert.equal(res.loanAmount, 700000);
  assert.ok(res.monthlyInstallment > 25000 && res.monthlyInstallment < 30000);
});

test('estimateCarValuation reflects condition multipliers', () => {
  const factoryVal = estimateCarValuation({
    brand: 'Hyundai',
    year: 2025,
    mileage: 20000,
    firstOwner: 'نعم',
    maintenance: 'نعم كلها',
    paint: 'فبريكا بالكامل',
  });
  const repaintedVal = estimateCarValuation({
    brand: 'Hyundai',
    year: 2025,
    mileage: 20000,
    firstOwner: 'لا',
    maintenance: 'بره التوكيل',
    paint: 'مدهونة كلياً',
  });
  assert.ok(factoryVal.fairPrice > repaintedVal.fairPrice);
  assert.ok(factoryVal.minEstimate < factoryVal.fairPrice);
  assert.ok(factoryVal.maxEstimate > factoryVal.fairPrice);
});

test('validateEgyptianPhone validates 11-digit Egyptian mobile numbers', () => {
  assert.equal(validateEgyptianPhone('01276111473'), true);
  assert.equal(validateEgyptianPhone('01012345678'), true);
  assert.equal(validateEgyptianPhone('01599887766'), true);
  assert.equal(validateEgyptianPhone('01312345678'), false);
  assert.equal(validateEgyptianPhone('12345'), false);
});
