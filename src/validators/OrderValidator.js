import { ValidatorConstants } from './constants/ValidatorConstants';

export default class OrderValidator {
  static validateOrderItems(orderItems, menu) {
    const itemNames = new Set();
    orderItems.forEach((item) => {
      this.validateMenuItem(item, menu, itemNames);
      this.validateQuantity(item);
    });

    this.validateNonBeverageItems(orderItems, menu);
    this.validateTotalQuantity(orderItems);
  }

  static validateMenuItem(item, menu, itemNames) {
    if (!menu.getItem(item.name)) {
      throw new Error(ValidatorConstants.INVALID_ORDER_ERROR);
    }

    if (itemNames.has(item.name)) {
      throw new Error(ValidatorConstants.INVALID_ORDER_ERROR);
    }
    itemNames.add(item.name);
  }

  static validateQuantity(item) {
    if (item.quantity < 1) {
      throw new Error(ValidatorConstants.INVALID_ORDER_ERROR);
    }
  }

  static validateNonBeverageItems(orderItems, menu) {
    const hasNonBeverageItem = orderItems.some(
      (item) => menu.getItem(item.name).category !== 'DRINKS',
    );
    if (!hasNonBeverageItem) {
      throw new Error(ValidatorConstants.ONLY_BEVERAGE_ERROR);
    }
  }

  static validateTotalQuantity(orderItems) {
    const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity > 20) {
      throw new Error(ValidatorConstants.INVALID_ORDER_ERROR);
    }
  }
}
