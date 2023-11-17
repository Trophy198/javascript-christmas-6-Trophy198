import { MenuConstants } from '../constants/MenuConstants';

export default class Menu {
  #items;

  constructor() {
    this.#items = new Map();
    this.#initializeMenu();
  }

  #initializeMenu() {
    Object.keys(MenuConstants).forEach((category) => {
      Object.entries(MenuConstants[category]).forEach(([itemName, price]) => {
        this.#items.set(itemName, { price, category });
      });
    });
  }

  getItem(name) {
    const menuItem = this.#items.get(name);
    if (!menuItem) {
      return null;
    }
    return { ...menuItem, name };
  }
}
