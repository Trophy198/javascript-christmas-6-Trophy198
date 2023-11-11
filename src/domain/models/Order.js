export default class Order {
  constructor(menuItems, date) {
    this.menuItems = menuItems;
    this.date = date;
    this.discounts = [];
    this.gifts = [];
    this.badge = null;
  }

  calculateInitialTotalPrice() {
    return this.menuItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
