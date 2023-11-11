import OrderService from './domain/services/OrderService';
import DiscountService from './domain/services/DiscountService';
import EventPlannerController from './controllers/EventPlannerController';

export default class App {
  async run() {
    const orderService = new OrderService();
    const discountService = new DiscountService();

    const eventPlannerController = new EventPlannerController(orderService, discountService);
    await eventPlannerController.start();
  }
}
