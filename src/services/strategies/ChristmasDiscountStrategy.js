import IDiscountStrategy from './IDiscountStrategy';
import { DiscountStrategyConstants } from './constants/DiscountStrategyConstants';
import { DateFormatter } from '../../utils/DateFormatter';

export default class ChristmasDiscountStrategy extends IDiscountStrategy {
  applyDiscount(order, date) {
    const START_DAY = 1;
    const END_DAY = 25;
    const startDate = DateFormatter.createDateFromDay(START_DAY);
    const endDate = DateFormatter.createDateFromDay(END_DAY);
    if (date >= startDate && date <= endDate) {
      const DISCOUNT_START_AMOUNT = 1000;
      const daysIntoDiscount = Math.floor((date - startDate) / (1000 * 3600 * 24));
      const discountAmount = DISCOUNT_START_AMOUNT + daysIntoDiscount * 100;
      const appliedDiscountAmount = Math.min(discountAmount, order.getTotalAmount());

      return { name: DiscountStrategyConstants.CHRISTMAS_DISCOUNT, amount: appliedDiscountAmount };
    }
    return { name: DiscountStrategyConstants.CHRISTMAS_DISCOUNT, amount: 0 };
  }
}
