import IDiscountStrategy from './IDiscountStrategy';
import { DiscountStrategyConstants } from './constants/DiscountStrategyConstants';

export default class GiftChampagneStrategy extends IDiscountStrategy {
  applyDiscount(order) {
    const GIFT_THRESHOLD = 120000;
    const CHAMPAGNE_PRICE = 25000;
    if (order.getTotalAmount() >= GIFT_THRESHOLD) {
      return { name: DiscountStrategyConstants.GIFT_EVENT, amount: CHAMPAGNE_PRICE };
    }

    return { name: DiscountStrategyConstants.GIFT_EVENT, amount: 0 };
  }
}
