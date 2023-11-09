import EventPlannerController from './controllers/EventPlannerController.js';

export default class App {
  async run() {
    const eventPlannerController = new EventPlannerController();
    await eventPlannerController.start();
  }
}
