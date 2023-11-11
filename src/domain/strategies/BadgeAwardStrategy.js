const GIFT_CHAMPAGNE_PRICE = 25000;

export default class BadgeAwardStrategy {
  apply(order) {
    const totalDiscounts = order.calculateTotalDiscount();
    const totalBenefits =
      totalDiscounts + (order.gifts.includes('샴페인') ? GIFT_CHAMPAGNE_PRICE : 0);

    if (totalBenefits >= 20000) {
      order.setBadge('산타');
    } else if (totalBenefits >= 10000) {
      order.setBadge('트리');
    } else if (totalBenefits >= 5000) {
      order.setBadge('별');
    }
  }
}
