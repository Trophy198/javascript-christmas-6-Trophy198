export default class GiftEventStrategy {
  apply(order) {
    const GIFT_CHAMPAGNE = { name: '샴페인', price: 25000 };
    if (order.calculateInitialTotalPrice() >= 120000) {
      order.addGift(GIFT_CHAMPAGNE);
      order.addDiscount('증정 이벤트', GIFT_CHAMPAGNE.price);
    }
  }
}
