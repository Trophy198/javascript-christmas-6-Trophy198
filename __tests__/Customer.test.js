import Customer from '../src/models/Customer';
import Order from '../src/models/Order';

describe('Customer 클래스', () => {
  let customer;

  beforeEach(() => {
    customer = new Customer();
  });

  test('주문이 없을 때, 뱃지 계산 결과는 null이 된다.', () => {
    customer.calculateBadge();
    expect(customer.getBadge()).toBeNull();
  });

  test('적절한 할인 금액에 따라 올바른 뱃지가 할당된다.', () => {
    const order = new Order();
    order.setDiscountAmount(10000);
    customer.addOrder(order);
    customer.calculateBadge();
    expect(customer.getBadge()).toBe('트리');
  });

  test('여러 주문을 추가했을 때, 총 할인 금액에 따른 뱃지가 할당된다.', () => {
    const order1 = new Order();
    order1.setDiscountAmount(3000);
    const order2 = new Order();
    order2.setDiscountAmount(2000);
    customer.addOrder(order1);
    customer.addOrder(order2);
    customer.calculateBadge();
    expect(customer.getBadge()).toBe('별');
  });

  test('할인 금액이 5000원 이하일 때 뱃지는 null로 표시된다.', () => {
    const order = new Order();
    order.setDiscountAmount(4000);
    customer.addOrder(order);
    customer.calculateBadge();
    expect(customer.getBadge()).toBeNull();
  });
});
