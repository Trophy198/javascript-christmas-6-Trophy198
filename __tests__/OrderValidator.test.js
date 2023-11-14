import OrderValidator from '../src/validators/OrderValidator';
import Menu from '../src/models/Menu';
import { ValidatorConstants } from '../src/validators/constants/ValidatorConstants';

describe('OrderValidator 클래스', () => {
  let mockMenu;

  beforeEach(() => {
    mockMenu = new Menu();
    jest.spyOn(mockMenu, 'getItem').mockImplementation((name) => {
      switch (name) {
        case '티본스테이크':
          return { name, price: 55000, category: 'MAINS' };
        case '제로콜라':
          return { name, price: 3000, category: 'DRINKS' };
        default:
          return null;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateOrderItems 메서드', () => {
    test('유효한 주문 항목에 대해 예외가 발생하지 않아야 한다', () => {
      const orderItems = [{ name: '티본스테이크', quantity: 1 }];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).not.toThrow();
    });

    test('존재하지 않는 메뉴 항목에 대해 예외가 발생해야 한다', () => {
      const orderItems = [{ name: '미지의메뉴', quantity: 1 }];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });

    test('음료만 포함된 주문 시 예외가 발생해야 한다', () => {
      const orderItems = [{ name: '제로콜라', quantity: 2 }];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).toThrow(
        new Error(ValidatorConstants.ONLY_BEVERAGE_ERROR),
      );
    });

    test('주문 항목의 총 수량이 20개를 초과하는 경우 예외가 발생해야 한다', () => {
      const orderItems = new Array(21).fill({ name: '티본스테이크', quantity: 1 });
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });
    test('주문 항목의 총 수량이 20개 이하인 경우 예외가 발생하지 않아야 한다', () => {
      const orderItems = new Array(20).fill({ name: '티본스테이크', quantity: 1 });
      expect(() => OrderValidator.validateTotalQuantity(orderItems)).not.toThrow();
    });

    test('주문 수량이 0 이하인 경우 예외가 발생해야 한다', () => {
      const orderItems = [{ name: '티본스테이크', quantity: 0 }];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });

    test('수량이 1 이상인 경우 예외가 발생하지 않아야 한다', () => {
      const item = { name: '티본스테이크', quantity: 1 };
      expect(() => OrderValidator.validateQuantity(item)).not.toThrow();
    });

    test('중복된 메뉴 항목이 포함된 경우 예외가 발생해야 한다', () => {
      const orderItems = [
        { name: '티본스테이크', quantity: 1 },
        { name: '티본스테이크', quantity: 1 },
      ];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });

    test('음식과 음료가 혼합된 유효한 주문은 예외가 발생하지 않아야 한다', () => {
      const orderItems = [
        { name: '티본스테이크', quantity: 1 },
        { name: '제로콜라', quantity: 2 },
      ];
      expect(() => OrderValidator.validateOrderItems(orderItems, mockMenu)).not.toThrow();
    });
  });

  describe('validateMenuItem 메서드', () => {
    test('존재하는 메뉴 아이템에 대해 예외가 발생하지 않아야 한다', () => {
      const item = { name: '티본스테이크', quantity: 1 };
      expect(() => OrderValidator.validateMenuItem(item, mockMenu, new Set())).not.toThrow();
    });

    test('중복된 메뉴 아이템이 포함된 경우 예외가 발생해야 한다', () => {
      const item = { name: '티본스테이크', quantity: 1 };
      const itemNames = new Set(['티본스테이크']);
      expect(() => OrderValidator.validateMenuItem(item, mockMenu, itemNames)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });
  });
});
