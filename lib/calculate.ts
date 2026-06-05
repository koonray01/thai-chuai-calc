export type CalculationResult = {
  governmentInput: number;
  governmentPay: number;
  maxPurchaseAmount: number;
  userPay: number;
  isOverDailyLimit: boolean;
};

export const SUBSIDY_RATE = 0.6;
export const USER_RATE = 0.4;
export const DAILY_GOVERNMENT_LIMIT = 200;

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateFromGovernmentLeft(governmentLeft: number): CalculationResult {
  const safeInput = Number.isFinite(governmentLeft) ? Math.max(governmentLeft, 0) : 0;
  const governmentPay = Math.min(safeInput, DAILY_GOVERNMENT_LIMIT);
  const maxPurchaseAmount = governmentPay / SUBSIDY_RATE;
  const userPay = maxPurchaseAmount * USER_RATE;

  return {
    governmentInput: roundMoney(safeInput),
    governmentPay: roundMoney(governmentPay),
    maxPurchaseAmount: roundMoney(maxPurchaseAmount),
    userPay: roundMoney(userPay),
    isOverDailyLimit: safeInput > DAILY_GOVERNMENT_LIMIT,
  };
}

export function calculateFromTotalPrice(totalPrice: number) {
  const safeTotalPrice = Number.isFinite(totalPrice) ? Math.max(totalPrice, 0) : 0;
  const governmentPay = Math.min(safeTotalPrice * SUBSIDY_RATE, DAILY_GOVERNMENT_LIMIT);
  const userPay = safeTotalPrice - governmentPay;

  return {
    totalPrice: roundMoney(safeTotalPrice),
    governmentPay: roundMoney(governmentPay),
    userPay: roundMoney(userPay),
    isOverDailyLimit: safeTotalPrice * SUBSIDY_RATE > DAILY_GOVERNMENT_LIMIT,
  };
}

export function formatBaht(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
