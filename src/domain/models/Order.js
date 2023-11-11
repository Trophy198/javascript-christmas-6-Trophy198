export default class Order {
  constructor(menuItems, date) {
    this.menuItems = menuItems;
    this.date = date;
    this.discounts = [];
    this.gifts = [];
    this.badge = null;
  }

  addDiscount(description, amount) {
    this.discounts.push({ description, amount });
  }

  calculateTotalDiscount() {
    return this.discounts.reduce((total, discount) => total + discount.amount, 0);
  }

  addGift(gift) {
    this.gifts.push(gift);
  }

  setBadge(badge) {
    this.badge = badge;
  }

  calculateInitialTotalPrice() {
    return this.menuItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateDiscountExcludingGifts() {
    return this.discounts
      .filter((discount) => discount.description !== '증정 이벤트')
      .reduce((total, discount) => total + discount.amount, 0);
  }

  calculateFinalPrice() {
    const totalPriceBeforeDiscount = this.calculateInitialTotalPrice();
    const discountExcludingGifts = this.calculateDiscountExcludingGifts();
    return totalPriceBeforeDiscount - discountExcludingGifts;
  }
}
