import Order from '../src/models/Order';
import { MenuConstants } from '../src/constants/MenuConstants';

describe('Order 클래스', () => {
  let order;
  beforeEach(() => {
    order = new Order();
  });

  test('메뉴 항목 추가 및 총 금액 업데이트가 정확해야 한다', () => {
    order.addMenuItem({ name: '티본스테이크', price: MenuConstants.MAINS.티본스테이크 }, 1);
    expect(order.getTotalAmount()).toBe(MenuConstants.MAINS.티본스테이크);
  });

  test('할인 전 총 주문 금액이 120,000원 이상일 경우 샴페인을 증정해야 한다', () => {
    order.addMenuItem({ name: '바비큐립', price: MenuConstants.MAINS.바비큐립 }, 3);
    order.checkForGift();
    expect(order.getGift()).toBe('샴페인 1개');
  });

  test('다양한 메뉴 항목을 추가한 후 총 금액이 정확해야 한다.', () => {
    order.addMenuItem({ name: '티본스테이크', price: MenuConstants.MAINS.티본스테이크 }, 1);
    order.addMenuItem({ name: '아이스크림', price: MenuConstants.DESSERTS.아이스크림 }, 2);
    const expectedTotal = MenuConstants.MAINS.티본스테이크 + MenuConstants.DESSERTS.아이스크림 * 2;
    expect(order.getTotalAmount()).toBe(expectedTotal);
  });
});
