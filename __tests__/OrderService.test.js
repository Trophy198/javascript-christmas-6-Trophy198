import OrderService from '../src/services/OrderService';
import Order from '../src/models/Order';

describe('OrderService', () => {
  let orderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  test('유효한 메뉴 항목으로 주문과 가격이 올바르게 책정 되어야한다.', () => {
    const menuItemsData = [
      { name: '양송이수프', quantity: 2 },
      { name: '티본스테이크', quantity: 1 },
    ];
    const order = orderService.createOrder(new Date(), menuItemsData);
    expect(order).toBeInstanceOf(Order);
    expect(order.getItems()).toHaveLength(2);
    expect(order.getTotalAmount()).toBe(6000 * 2 + 55000);
  });

  test('존재하지 않는 메뉴 항목으로 주문 시 오류가 발생해야 한다.', () => {
    const menuItemsData = [{ name: '양송이스프', quantity: 1 }];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('존재하는 메뉴 항목으로 주문 시 주문을 생성한다.', () => {
    const menuItemsData = [{ name: '양송이수프', quantity: 1 }];
    const order = orderService.createOrder(new Date(), menuItemsData);

    expect(order).toBeInstanceOf(Order);
    expect(order.getItems()).toHaveLength(1);
    expect(order.getItems()[0].name).toBe('양송이수프');
    expect(order.getItems()[0].quantity).toBe(1);
  });

  test('여러 메뉴 항목을 포함한 주문에서 일부 항목이 유효하지 않은 경우 오류가 발생해야 한다.', () => {
    const menuItemsData = [
      { name: '아이스크림', quantity: 2 },
      { name: '양송이수프', quantity: 1 },
      { name: '제로콜라', quantity: 3 },
      { name: '펩시', quantity: 1 },
    ];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('여러 메뉴 항목을 포함한 주문에서 모든 주문이 항목에 있는 경우 주문을 생성한다.', () => {
    const menuItemsData = [
      { name: '양송이수프', quantity: 1 },
      { name: '타파스', quantity: 1 },
      { name: '시저샐러드', quantity: 1 },
      { name: '티본스테이크', quantity: 1 },
      { name: '바비큐립', quantity: 1 },
      { name: '해산물파스타', quantity: 1 },
      { name: '크리스마스파스타', quantity: 1 },
      { name: '초코케이크', quantity: 1 },
      { name: '아이스크림', quantity: 1 },
      { name: '제로콜라', quantity: 1 },
      { name: '레드와인', quantity: 1 },
      { name: '샴페인', quantity: 1 },
    ];
    const order = orderService.createOrder(new Date(), menuItemsData);
    expect(order).toBeInstanceOf(Order);
    expect(order.getItems()).toHaveLength(menuItemsData.length);
    menuItemsData.forEach((item) => {
      const orderedItem = order.getItems().find((ordered) => ordered.name === item.name);
      expect(orderedItem).toBeDefined();
      expect(orderedItem.quantity).toBe(item.quantity);
    });
  });

  test('여러 메뉴 항목을 포함한 주문에서 주문의 수량이 요구 사항보다 많을 경우 오류가 발생해야 한다.', () => {
    const menuItemsData = [
      { name: '양송이수프', quantity: 3 },
      { name: '타파스', quantity: 1 },
      { name: '시저샐러드', quantity: 2 },
      { name: '티본스테이크', quantity: 1 },
      { name: '바비큐립', quantity: 1 },
      { name: '해산물파스타', quantity: 1 },
      { name: '크리스마스파스타', quantity: 2 },
      { name: '초코케이크', quantity: 2 },
      { name: '아이스크림', quantity: 2 },
      { name: '제로콜라', quantity: 2 },
      { name: '레드와인', quantity: 2 },
      { name: '샴페인', quantity: 2 },
    ];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('주문 항목의 수량이 0인경우 오류가 발생해야 한다.', () => {
    const menuItemsData = [{ name: '초코케이크', quantity: 0 }];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('주문 항목의 수량이 요구사항보다 많은 경우 오류가 발생해야 한다.', () => {
    const menuItemsData = [{ name: '티본스테이크', quantity: 21 }];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('중복된 메뉴 항목이 포함된 경우 오류가 발생해야 한다.', () => {
    const menuItemsData = [
      { name: '아이스크림', quantity: 2 },
      { name: '아이스크림', quantity: 1 },
    ];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });

  test('음료만 포함된 주문 시 오류가 발생해야 한다.', () => {
    const menuItemsData = [
      { name: '제로콜라', quantity: 2 },
      { name: '레드와인', quantity: 2 },
      { name: '샴페인', quantity: 2 },
    ];
    expect(() => {
      orderService.createOrder(new Date(), menuItemsData);
    }).toThrow();
  });
});
