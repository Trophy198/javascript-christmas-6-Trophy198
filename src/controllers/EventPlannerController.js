import DateModel from '../models/Date.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

export default class EventPlannerController {
  async start() {
    while (true) {
      try {
        const dateInput = await InputView.readDate();
        const dateModel = new DateModel(dateInput);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
}
