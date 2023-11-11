import { MENU_ITEMS } from '../../constants/Menu';
import MenuItem from '../models/MenuItem';
import Order from '../models/Order';
import OrderValidator from '../validators/OrderValidator';
import { convertToKSTDate } from '../../utils/DateUtils';

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
      const { price, category } = this.findMenuItemDetails(name);
      return new MenuItem({ name, price, quantity, category });
    });
  }

  findMenuItemDetails(name) {
    let menuItemDetails = null;
    Object.entries(MENU_ITEMS).forEach(([category, items]) => {
      const foundItem = items.find((item) => item.name === name);
      if (foundItem) {
        menuItemDetails = { ...foundItem, category };
      }
    });

    return menuItemDetails;
  }

  createOrder(menuInputs, day) {
    const date = convertToKSTDate(2023, 11, day);
    const menuItemsData = this.parseMenuInputs(menuInputs);

    OrderValidator.validateOrderItems(menuItemsData);

    const menuItems = this.createMenuItems(menuItemsData);

    return new Order(menuItems, date);
  }
}
