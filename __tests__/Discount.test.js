import Order from '../src/models/Order';
import DiscountService from '../src/services/DiscountService';
import { DateFormatter } from '../src/utils/DateFormatter';

describe('Order - applyDiscounts 메서드( 할인 로직 )', () => {
  let order;
  let discountService;

  beforeEach(() => {
    order = new Order();
    discountService = new DiscountService();
  });

  test('모든 메뉴를 포함한 할인을 적용합니다.( 증정이벤트 확인 )', () => {
    const menuItems = [
      { price: 6000, category: 'APPETIZERS', name: '양송이수프', quantity: 1 },
      { price: 5500, category: 'APPETIZERS', name: '타파스', quantity: 1 },
      { price: 8000, category: 'APPETIZERS', name: '시저샐러드', quantity: 1 },
      { price: 55000, category: 'MAINS', name: '티본스테이크', quantity: 1 },
      { price: 54000, category: 'MAINS', name: '바비큐립', quantity: 1 },
      { price: 35000, category: 'MAINS', name: '해산물파스타', quantity: 1 },
      { price: 25000, category: 'MAINS', name: '크리스마스파스타', quantity: 1 },
      { price: 15000, category: 'DESSERTS', name: '초코케이크', quantity: 1 },
      { price: 5000, category: 'DESSERTS', name: '아이스크림', quantity: 1 },
      { price: 3000, category: 'DRINKS', name: '제로콜라', quantity: 1 },
      { price: 60000, category: 'DRINKS', name: '레드와인', quantity: 1 },
      { price: 25000, category: 'DRINKS', name: '샴페인', quantity: 1 },
    ];
    menuItems.forEach((item) => {
      order.addMenuItem(item, item.quantity);
    });
    const testDate = DateFormatter.createDateFromDay(11);
    const discountResults = discountService.applyDiscounts(order, testDate);

    const expectedDiscounts = {
      '크리스마스 디데이 할인': 2000,
      '평일 할인': 4046,
      '증정 이벤트': 25000,
    };

    expect(discountResults).toEqual(expectedDiscounts);
  });

  test('주말 날짜에 대한 할인을 적용합니다.', () => {
    order.addMenuItem({ price: 55000, category: 'MAINS', name: '티본스테이크' }, 1);
    const weekendDate = DateFormatter.createDateFromDay(15);
    const discountResults = discountService.applyDiscounts(order, weekendDate);
    const expectedDiscounts = {
      '주말 할인': 2023,
      '크리스마스 디데이 할인': 2400,
    };

    expect(discountResults).toEqual(expectedDiscounts);
  });

  test('요구 사항에 지정된 특별 할인 날짜에 대한 할인을 적용합니다.', () => {
    order.addMenuItem({ price: 15000, category: 'DESSERTS', name: '초코케이크' }, 1);
    const specialDate = DateFormatter.createDateFromDay(25);
    const discountResults = discountService.applyDiscounts(order, specialDate);

    const expectedDiscounts = {
      '특별 할인': 1000,
      '크리스마스 디데이 할인': 3400,
      '평일 할인': 2023,
    };

    expect(discountResults).toEqual(expectedDiscounts);
  });

  test('평일 날짜에 대한 할인을 적용합니다.', () => {
    order.addMenuItem({ price: 5000, category: 'DESSERTS', name: '아이스크림' }, 2);
    const weekdayDate = DateFormatter.createDateFromDay(11);
    const discountResults = discountService.applyDiscounts(order, weekdayDate);

    const expectedDiscounts = {
      '평일 할인': 4046,
      '크리스마스 디데이 할인': 2000,
    };

    expect(discountResults).toEqual(expectedDiscounts);
  });

  test('최소 주문 금액 미달 시 할인이 적용되지 않습니다.', () => {
    order.addMenuItem({ price: 5500, category: 'APPETIZERS', name: '타파스' }, 1);
    const testDate = DateFormatter.createDateFromDay(11);
    const discountResults = discountService.applyDiscounts(order, testDate);

    expect(discountResults).toEqual({});
  });
});
