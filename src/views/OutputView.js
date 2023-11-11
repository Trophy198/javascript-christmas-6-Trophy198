import { Console } from '@woowacourse/mission-utils';

export default class OutputView {
  static printWelcomeMessage() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  }

  static printOrderDate(day) {
    Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  }

  static printOrderMenu(menuItems) {
    Console.print('<주문 메뉴>');
    menuItems.forEach((item) => {
      Console.print(`${item.name} ${item.quantity}개`);
    });
  }

  static printTotalPriceBeforeDiscount(totalPrice) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${totalPrice.toLocaleString()}원`);
  }

  static printGiftItem(giftItem) {
    Console.print('\n<증정 메뉴>');
    Console.print(giftItem ? `${giftItem.name} 1개` : '없음');
  }

  static printDiscountDetails(discounts) {
    Console.print('\n<혜택 내역>');
    if (discounts.length > 0) {
      discounts.forEach((discount) => {
        Console.print(`${discount.description}: -${discount.amount.toLocaleString()}원`);
      });
      return;
    }
    Console.print('없음');
  }

  static printTotalDiscountAmount(totalDiscount) {
    Console.print('\n<총혜택 금액>');
    const displayAmount = totalDiscount > 0 ? `-${totalDiscount.toLocaleString()}원` : '0원';
    Console.print(displayAmount);
  }

  static printFinalPriceAfterDiscount(finalPrice) {
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${finalPrice.toLocaleString()}원`);
  }

  static printEventBadge(badge) {
    Console.print('\n<12월 이벤트 배지>');
    Console.print(badge || '없음');
  }

  static printErrorMessage(message) {
    Console.print(message);
  }
}
