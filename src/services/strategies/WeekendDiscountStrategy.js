import IDiscountStrategy from './IDiscountStrategy';
import { DiscountStrategyConstants } from './constants/DiscountStrategyConstants';

export default class WeekendDiscountStrategy extends IDiscountStrategy {
  applyDiscount(order, date) {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

    if (isWeekend) {
      const MAIN_DISCOUNT = 2023;
      const discountAmount = order
        .getItems()
        .filter((item) => item.category === 'MAINS')
        .reduce((total, item) => total + item.quantity * MAIN_DISCOUNT, 0);

      return { name: DiscountStrategyConstants.WEEKEND_DISCOUNT, amount: discountAmount };
    }

    return { name: DiscountStrategyConstants.WEEKEND_DISCOUNT, amount: 0 };
  }
}
