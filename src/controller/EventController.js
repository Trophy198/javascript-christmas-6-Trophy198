import InputView from '../views/InputView';
import OutputView from '../views/OutputView';
import OrderService from '../services/OrderService';
import DiscountService from '../services/DiscountService';
import Customer from '../models/Customer';
import { DateFormatter } from '../utils/DateFormatter';

export default class EventController {
  #orderService;

  #customer;

  #discountService;

  constructor() {
    this.#orderService = new OrderService();
    this.#customer = new Customer();
    this.#discountService = new DiscountService();
  }

  async start() {
    OutputView.printWelcomeMessage();
    await this.handleOrderProcess();
  }

  async handleOrderProcess() {
    try {
      const inputDate = await this.getDateFromUser();
      await this.handleMenuOrderProcess(inputDate);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.handleOrderProcess();
    }
  }

  async getDateFromUser() {
    const day = await InputView.readDate();
    return DateFormatter.createDateFromDay(day);
  }

  async handleMenuOrderProcess(inputDate) {
    try {
      const inputMenuItems = await InputView.readMenu();
      const order = this.#orderService.createOrder(inputDate, inputMenuItems);
      order.applyDiscounts(this.#discountService, inputDate);
      this.#customer.addOrder(order);
      this.#customer.calculateBadge();
      OutputView.printDay(inputDate);
      OutputView.printOrderDetails(order);
      OutputView.printBadge(this.#customer);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.handleMenuOrderProcess(inputDate);
    }
  }
}
