export default class ChristmasDiscountStrategy {
  apply(order) {
    const orderDate = order.date;
    if (this.isWithinDateRange(orderDate, new Date('2023-12-01'), new Date('2023-12-25'))) {
      const daysSinceStart = this.calculateDaysSinceStart(orderDate, new Date('2023-12-01'));
      const discountAmount = 1000 + daysSinceStart * 100;
      order.addDiscount('크리스마스 디데이 할인', discountAmount);
    }
  }

  isWithinDateRange(date, start, end) {
    return date >= start && date <= end;
  }

  calculateDaysSinceStart(date, start) {
    return Math.floor((date - start) / (24 * 60 * 60 * 1000));
  }
}
