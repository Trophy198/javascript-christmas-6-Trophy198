import EventController from './controller/EventController';

export default class App {
  async run() {
    const eventController = new EventController();
    await eventController.start();
  }
}
