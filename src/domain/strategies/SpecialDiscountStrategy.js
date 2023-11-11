export default class SpecialDiscountStrategy {
  apply(order) {
    const orderDate = order.date;
    if (this.isSpecialDay(orderDate)) {
      order.addDiscount('특별 할인', 1000);
    }
  }

  isSpecialDay(date) {
    return date.getDay() === 0 || date.getDate() === 25;
  }
}
