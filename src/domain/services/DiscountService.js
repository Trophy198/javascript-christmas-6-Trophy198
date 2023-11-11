import ChristmasDiscountStrategy from '../strategies/ChristmasDiscountStrategy';
import WeekdayDiscountStrategy from '../strategies/WeekdayDiscountStrategy';
import WeekendDiscountStrategy from '../strategies/WeekendDiscountStrategy';
import SpecialDiscountStrategy from '../strategies/SpecialDiscountStrategy';
import GiftEventStrategy from '../strategies/GiftEventStrategy';
import BadgeAwardStrategy from '../strategies/BadgeAwardStrategy';

export default class DiscountService {
  constructor() {
    this.strategies = [
      new ChristmasDiscountStrategy(),
      new WeekdayDiscountStrategy(),
      new WeekendDiscountStrategy(),
      new SpecialDiscountStrategy(),
      new GiftEventStrategy(),
      new BadgeAwardStrategy(),
    ];
  }

  applyDiscounts(order) {
    const initialTotalPrice = order.calculateInitialTotalPrice();

    if (initialTotalPrice >= 10000) {
      this.strategies.forEach((strategy) => strategy.apply(order));
    }
  }
}
