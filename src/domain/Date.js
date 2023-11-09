import DateValidator from '../validators/DateValidator.js';

export default class Date {
  #date;

  constructor(date) {
    this.#validate(date);
  }

  #validate(date) {
    const validatedDay = DateValidator.validateDay(date);
    this.#date = validatedDay;
  }

  getDate() {
    return this.#date;
  }
}
