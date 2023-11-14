import { OrderConstants } from './constants/OrderConstants';

export default class Order {
  #menuItems;

  #totalAmount;

  #discountAmount;

  #gift;

  #discountDetails;

  constructor() {
    this.#menuItems = new Map();
    this.#totalAmount = 0;
    this.#discountAmount = 0;
    this.#gift = null;
    this.#discountDetails = {};
  }

  applyDiscounts(discountService, date) {
    const discountResults = discountService.applyDiscounts(this, date);
    this.setDiscountDetails(discountResults);
    this.checkForGift();
  }

  addMenuItem(menuItem, quantity) {
    this.#menuItems.set(menuItem.name, { ...menuItem, quantity });
    this.#totalAmount += menuItem.price * quantity;
  }

  addDiscountDetail(discountName, discountAmount) {
    this.#discountDetails[discountName] =
      (this.#discountDetails[discountName] || 0) + discountAmount;
    this.#discountAmount += discountAmount;
  }

  setDiscountDetails(discountDetails) {
    this.#discountDetails = { ...discountDetails };
    this.#discountAmount = Object.values(this.#discountDetails).reduce(
      (sum, amount) => sum + amount,
      0,
    );
  }

  getFormattedDiscountDetails() {
    const discountEntries = Object.entries(this.#discountDetails);
    if (discountEntries.length === 0) {
      return '없음';
    }
    return discountEntries
      .map(([name, amount]) => `${name}: -${amount.toLocaleString()}원`)
      .join('\n');
  }

  checkForGift() {
    if (this.#totalAmount >= OrderConstants.GIFT_THRESHOLD_AMOUNT) {
      this.#gift = `${OrderConstants.GIFT_NAME} ${OrderConstants.GIFT_QUANTITY}개`;
    }
  }

  getTotalAmount() {
    return this.#totalAmount;
  }

  getFinalAmount() {
    const giftDiscount = this.#discountDetails[OrderConstants.GIFT_EVENT_TITLE] || 0;
    return this.#totalAmount - (this.#discountAmount - giftDiscount);
  }

  setDiscountAmount(discountAmount) {
    this.#discountAmount = discountAmount;
  }

  getDiscountAmount() {
    return this.#discountAmount;
  }

  getItems() {
    return Array.from(this.#menuItems.values());
  }

  getGift() {
    return this.#gift;
  }
}
