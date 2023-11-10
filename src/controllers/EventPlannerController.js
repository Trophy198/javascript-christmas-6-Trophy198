import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import OrderService from '../domain/services/OrderService.js';

export default class EventPlannerController {
  constructor() {
    this.orderService = new OrderService();
  }

  async start() {
    OutputView.printWelcomeMessage();
    const day = await this.inputDay();
    const order = await this.createValidOrder();
  }

  async inputDay() {
    return InputView.readDate();
  }

  async inputMenu() {
    return InputView.readMenu();
  }

  async createValidOrder() {
    while (true) {
      try {
        const menuInputs = await this.inputMenu();
        return this.orderService.createOrder(menuInputs);
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
  // 주문처리 로직 추가 예정
}
