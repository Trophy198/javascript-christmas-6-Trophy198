import Menu from '../src/models/Menu';
import { MenuConstants } from '../src/constants/MenuConstants';

describe('Menu 클래스', () => {
  let menu;

  beforeEach(() => {
    menu = new Menu();
  });

  test('메뉴 항목이 올바르게 초기화되어야 한다.', () => {
    expect(menu.getItem('티본스테이크')).toEqual({
      name: '티본스테이크',
      price: 55000,
      category: 'MAINS',
    });
    expect(menu.getItem('시저샐러드')).toEqual({
      name: '시저샐러드',
      price: 8000,
      category: 'APPETIZERS',
    });
  });

  test('존재하지 않는 메뉴 항목에 대해 null을 반환해야 한다.', () => {
    expect(menu.getItem('양송이스프')).toBeNull();
    expect(menu.getItem('1234')).toBeNull();
    expect(menu.getItem('스테이크@')).toBeNull();
  });

  test('모든 메뉴 카테고리가 올바르게 로드되어야 한다.', () => {
    Object.keys(MenuConstants).forEach((category) => {
      Object.keys(MenuConstants[category]).forEach((itemName) => {
        const menuItem = menu.getItem(itemName);
        expect(menuItem).not.toBeNull();
        expect(menuItem.category).toBe(category);
      });
    });
  });

  test('각 메뉴 항목의 가격이 정확해야 함', () => {
    Object.keys(MenuConstants).forEach((category) => {
      Object.entries(MenuConstants[category]).forEach(([itemName, price]) => {
        const menuItem = menu.getItem(itemName);
        expect(menuItem.price).toBe(price);
      });
    });
  });
});
