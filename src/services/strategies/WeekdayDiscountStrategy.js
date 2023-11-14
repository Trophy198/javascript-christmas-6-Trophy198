import IDiscountStrategy from './IDiscountStrategy';
import { DiscountStrategyConstants } from './constants/DiscountStrategyConstants';

export default class WeekdayDiscountStrategy extends IDiscountStrategy {
  applyDiscount(order, date) {
    const dayOfWeek = date.getDay();
    const isWeekday = dayOfWeek >= 0 && dayOfWeek <= 4;

    if (isWeekday) {
      const DESSERT_DISCOUNT = 2023;
      const discountAmount = order
        .getItems()
        .filter((item) => item.category === 'DESSERTS')
        .reduce((total, item) => total + item.quantity * DESSERT_DISCOUNT, 0);
      return { name: DiscountStrategyConstants.WEEKDAY_DISCOUNT, amount: discountAmount };
    }
    return { name: DiscountStrategyConstants.WEEKDAY_DISCOUNT, amount: 0 };
  }
}
