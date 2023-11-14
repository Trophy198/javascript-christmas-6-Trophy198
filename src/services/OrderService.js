import Order from '../models/Order';
import Menu from '../models/Menu';
import OrderValidator from '../validators/OrderValidator';

export default class OrderService {
  #menu;

  constructor() {
    this.#menu = new Menu();
  }

  createOrder(date, menuItemsData) {
    OrderValidator.validateOrderItems(menuItemsData, this.#menu);
    const order = new Order(date);

    menuItemsData.forEach(({ name, quantity }) => {
      const menuItem = this.#menu.getItem(name);
      if (menuItem) {
        order.addMenuItem({ ...menuItem, name }, quantity);
      }
    });

    return order;
  }
}
