import { Console } from '@woowacourse/mission-utils';

export default class OutputView {
  static printWelcomeMessage() {
    Console.print('안녕하세요! 우테코 식장 12월 이벤트 플래너 입니다.');
  }

  static printShowEventBenefits(day) {
    Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  }

  static printMenu() {
    Console.print('<주문 메뉴>');
  }
  // 할인 전 총주문 금액

  // 증정 메뉴

  // 혜택 내역

  // 총혜택 금액

  // 할인 후 예상 결제 금액

  // 12월 이벤트 배지

  static printErrorMessage(message) {
    Console.print(message);
  }
}
