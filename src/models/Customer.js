export default class Customer {
  #orders;

  #badge;

  static BADGE_CRITERIA = [
    { name: '산타', amount: 20000 },
    { name: '트리', amount: 10000 },
    { name: '별', amount: 5000 },
  ];

  constructor() {
    this.#orders = [];
    this.#badge = null;
  }

  addOrder(order) {
    this.#orders.push(order);
  }

  calculateBadge() {
    const totalDiscount = this.#orders.reduce((sum, order) => sum + order.getDiscountAmount(), 0);
    const badge = Customer.BADGE_CRITERIA.find((badgeName) => totalDiscount >= badgeName.amount);
    this.#badge = badge ? badge.name : null;
  }

  getBadge() {
    return this.#badge;
  }
}
