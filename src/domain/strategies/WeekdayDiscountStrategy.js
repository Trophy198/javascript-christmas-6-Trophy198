export default class WeekdayDiscountStrategy {
  apply(order) {
    const dayOfWeek = order.date.getDay();
    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
      order.menuItems
        .filter((item) => item.category === 'desserts')
        .forEach((item) => {
          const discountAmount = 2023 * item.quantity;
          order.addDiscount('평일 디저트 할인', discountAmount);
        });
    }
  }
}
