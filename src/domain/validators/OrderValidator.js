import { MENU_ITEMS } from '../../constants/Menu.js';

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
        throw new Error('[ERROR] 각 메뉴의 수량은 1 이상이어야 합니다.');
      }
    });
  }

  static validateNoDuplicates(orderItems) {
    const names = orderItems.map((item) => item.name);

    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
      throw new Error('[ERROR] 중복된 메뉴 이름이 있습니다.');
    }
  }

  static validateMenuExists(orderItems) {
    const allMenuItems = Object.values(MENU_ITEMS).flat();

    orderItems.forEach((item) => {
      if (!allMenuItems.some((menuItem) => menuItem.name === item.name)) {
        throw new Error('[ERROR] 메뉴판에 없는 메뉴가 포함되어 있습니다.');
      }
    });
  }

  static validateTotalQuantity(orderItems) {
    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 20) {
      throw new Error('[ERROR] 주문 가능한 메뉴 수량을 초과했습니다 (최대 20개).');
    }
  }

  static validateNotDrinksOnly(orderItems) {
    const drinkNames = MENU_ITEMS.drinks.map((drink) => drink.name);

    if (orderItems.every((item) => drinkNames.includes(item.name))) {
      throw new Error('[ERROR] 음료만으로는 주문할 수 없습니다.');
    }
  }
}
