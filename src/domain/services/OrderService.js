import { MENU_ITEMS } from '../../constants/Menu.js';
import MenuItem from '../models/MenuItem.js';
import OrderValidator from '../validators/OrderValidator.js';

export default class OrderService {
  parseMenuInputs(menuInputs) {
    return menuInputs.map((input) => {
      const [name, quantityString] = input.split('-');
      const quantity = parseInt(quantityString, 10);
      return { name, quantity };
    });
  }

  createMenuItems(menuItemsData) {
    return menuItemsData.map(({ name, quantity }) => {
      const price = this.findPriceByName(name);
      return new MenuItem(name, price, quantity);
    });
  }

  findPriceByName(name) {
    const menuItem = Object.values(MENU_ITEMS)
      .flat()
      .find((item) => item.name === name);
    return menuItem.price;
  }

  createOrder(menuInputs) {
    const menuItemsData = this.parseMenuInputs(menuInputs);
    OrderValidator.validateOrderItems(menuItemsData);
    return this.createMenuItems(menuItemsData);
  }
}
