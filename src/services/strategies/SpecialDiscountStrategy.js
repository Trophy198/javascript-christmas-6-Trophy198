import IDiscountStrategy from './IDiscountStrategy';
import { DiscountStrategyConstants } from './constants/DiscountStrategyConstants';

export default class SpecialDiscountStrategy extends IDiscountStrategy {
  applyDiscount(order, date) {
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;
    const isChristmas = date.getDate() === 25;

    if (isSunday || isChristmas) {
      return { name: DiscountStrategyConstants.SPECIAL_DISCOUNT, amount: 1000 };
    }

    return { name: DiscountStrategyConstants.SPECIAL_DISCOUNT, amount: 0 };
  }
}
