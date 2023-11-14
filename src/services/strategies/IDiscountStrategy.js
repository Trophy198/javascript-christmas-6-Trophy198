export default class IDiscountStrategy {
  applyDiscount(order, date) {
    throw new Error('[ERROR] 하위 클래스에서 applyDiscount 메서드를 구현해야 합니다.');
  }
}
