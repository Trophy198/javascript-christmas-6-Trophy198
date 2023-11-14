import { Console } from '@woowacourse/mission-utils';
import { OutputMessages } from './constants/OutputMessages';

export default class OutputView {
  static printWelcomeMessage() {
    Console.print(OutputMessages.WELCOME_MESSAGE);
  }

  static printDay(date) {
    const day = date.getDate();
    Console.print(OutputMessages.EVENT_PREVIEW(day));
  }

  static printOrderDetails(order) {
    this.printMenuItems(order.getItems());
    this.printTotalAmount(order.getTotalAmount());
    this.printGift(order.getGift());
    this.printDiscountDetails(order);
    this.printTotalDiscountAmount(order);
    this.printFinalAmount(order.getFinalAmount());
  }

  static printMenuItems(menuItems) {
    Console.print(OutputMessages.ORDER_MENU_TITLE);
    menuItems.forEach((item) => {
      Console.print(`${item.name} ${item.quantity}개`);
    });
  }

  static printTotalAmount(totalAmount) {
    Console.print(`${OutputMessages.TOTAL_AMOUNT_TITLE}\n${totalAmount.toLocaleString()}원`);
  }

  static printDiscountDetails(order) {
    Console.print(OutputMessages.DISCOUNT_DETAILS_TITLE);
    const discountDetails = order.getFormattedDiscountDetails();
    Console.print(discountDetails);
  }

  static printTotalDiscountAmount(order) {
    const totalDiscountAmount = order.getDiscountAmount();
    const formattedAmount =
      totalDiscountAmount === 0
        ? totalDiscountAmount.toLocaleString()
        : `-${totalDiscountAmount.toLocaleString()}`;
    Console.print(`${OutputMessages.TOTAL_DISCOUNT_AMOUNT_TITLE}\n${formattedAmount}원`);
  }

  static printGift(gift) {
    Console.print(`${OutputMessages.GIFT_TITLE}\n${gift || '없음'}`);
  }

  static printFinalAmount(finalAmount) {
    Console.print(`${OutputMessages.FINAL_AMOUNT_TITLE}\n${finalAmount.toLocaleString()}원`);
  }

  static printBadge(customer) {
    const badge = customer.getBadge();
    Console.print(`${OutputMessages.EVENT_BADGE_TITLE}\n${badge || '없음'}`);
  }

  static printErrorMessage(message) {
    Console.print(`${message}\n`);
  }
}
