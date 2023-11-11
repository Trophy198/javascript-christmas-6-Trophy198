export default class WeekendDiscountStrategy {
  apply(order) {
    const dayOfWeek = order.date.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      order.menuItems
        .filter((item) => item.category === 'mains')
        .forEach((item) => {
          const discountAmount = 2023 * item.quantity;
          order.addDiscount('주말 메인 메뉴 할인', discountAmount);
        });
    }
  }
}
