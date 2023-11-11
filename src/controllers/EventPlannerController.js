import InputView from '../views/InputView';
import OutputView from '../views/OutputView';

export default class EventPlannerController {
  constructor(orderService, discountService) {
    this.orderService = orderService;
    this.discountService = discountService;
  }

  async start() {
    OutputView.printWelcomeMessage();
    const day = await this.promptForDay();
    const order = await this.promptForOrder(day);
    this.applyDiscountsAndDisplayOrder(order);
  }

  async promptForDay() {
    while (true) {
      try {
        return await InputView.readDate();
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async promptForOrder(day) {
    while (true) {
      try {
        const menuInputs = await InputView.readMenu();
        return this.orderService.createOrder(menuInputs, day);
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  applyDiscountsAndDisplayOrder(order) {
    // 할인 서비스 적용
    this.discountService.applyDiscounts(order);

    // 주문 날짜 출력
    OutputView.printOrderDate(order.date.getDate());

    // 주문 메뉴 출력
    OutputView.printOrderMenu(order.menuItems);

    // 할인 전 총주문 금액 출력
    const totalPriceBeforeDiscount = order.calculateInitialTotalPrice();
    OutputView.printTotalPriceBeforeDiscount(totalPriceBeforeDiscount);

    // 혜택 내역 출력
    const discounts = order.discounts.map((discount) => ({
      description: discount.description,
      amount: discount.amount,
    }));
    OutputView.printDiscountDetails(discounts);

    // 총혜택 금액 출력
    const totalDiscountAmount = order.calculateTotalDiscount();
    OutputView.printTotalDiscountAmount(totalDiscountAmount);

    // 증정 메뉴 출력
    const giftItem = order.gifts[0];
    OutputView.printGiftItem(giftItem);

    // 할인 후 예상 결제 금액 출력
    const finalPrice = totalPriceBeforeDiscount - order.calculateDiscountExcludingGifts();
    OutputView.printFinalPriceAfterDiscount(finalPrice);

    // 12월 이벤트 배지 출력
    OutputView.printEventBadge(order.badge);
  }
}
