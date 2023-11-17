import ChristmasDiscountStrategy from './strategies/ChristmasDiscountStrategy';
import WeekdayDiscountStrategy from './strategies/WeekdayDiscountStrategy';
import WeekendDiscountStrategy from './strategies/WeekendDiscountStrategy';
import SpecialDiscountStrategy from './strategies/SpecialDiscountStrategy';
import GiftChampagneStrategy from './strategies/GiftChampagneStrategy';

export default class DiscountService {
  #strategies;

  constructor() {
    this.#strategies = {
      christmas: new ChristmasDiscountStrategy(),
      special: new SpecialDiscountStrategy(),
      weekday: new WeekdayDiscountStrategy(),
      weekend: new WeekendDiscountStrategy(),
      giftChampagne: new GiftChampagneStrategy(),
    };
  }

  applyDiscounts(order, date) {
    const MINIMUM_AMOUNT_FOR_DISCOUNTS = 10000;
    if (order.getTotalAmount() >= MINIMUM_AMOUNT_FOR_DISCOUNTS) {
      const discountResults = this.calculateTotalDiscounts(order, date);
      const totalDiscountAmount = this.calculateTotalDiscountAmount(discountResults);
      order.setDiscountAmount(totalDiscountAmount);
      return discountResults;
    }
    return {};
  }

  calculateTotalDiscounts(order, date) {
    const discountResults = {};
    Object.keys(this.#strategies).forEach((strategyKey) => {
      const strategy = this.#strategies[strategyKey];
      const discountResult = strategy.applyDiscount(order, date);
      if (discountResult.amount > 0) {
        discountResults[discountResult.name] = discountResult.amount;
      }
    });
    return discountResults;
  }

  calculateTotalDiscountAmount(discountResults) {
    return Object.values(discountResults).reduce((sum, amount) => sum + amount, 0);
  }
}
