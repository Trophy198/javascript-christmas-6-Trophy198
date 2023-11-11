import { MENU_ITEMS } from '../../constants/Menu';

export default class OrderValidator {
  static validateOrderItems(orderItems) {
    this.validateQuantities(orderItems);
    this.validateNoDuplicates(orderItems);
    this.validateMenuExists(orderItems);
    this.validateTotalQuantity(orderItems);
    this.validateNotDrinksOnly(orderItems);
  }

  static validateQuantities(orderItems) {
    orderItems.forEach((item) => {
      if (item.quantity < 1) {
        throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }
    });
  }

  static validateNoDuplicates(orderItems) {
    const names = orderItems.map((item) => item.name);

    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateMenuExists(orderItems) {
    const allMenuItems = Object.values(MENU_ITEMS).flat();

    orderItems.forEach((item) => {
      if (!allMenuItems.some((menuItem) => menuItem.name === item.name)) {
        throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
      }
    });
  }

  static validateTotalQuantity(orderItems) {
    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 20) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static validateNotDrinksOnly(orderItems) {
    const drinkNames = MENU_ITEMS.drinks.map((drink) => drink.name);

    if (orderItems.every((item) => drinkNames.includes(item.name))) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }
}
