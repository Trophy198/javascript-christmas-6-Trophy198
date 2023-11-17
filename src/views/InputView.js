import { Console } from '@woowacourse/mission-utils';
import { InputMessages } from './constants/InputMessages';
import { InputValidator } from '../validators/InputValidator';

export default class InputView {
  static async readDate() {
    while (true) {
      try {
        const input = await Console.readLineAsync(InputMessages.DATE_PROMPT);
        return InputValidator.Day.validateDay(input);
      } catch (error) {
        Console.print(`${error.message}\n`);
      }
    }
  }

  static async readMenu() {
    while (true) {
      try {
        const input = await Console.readLineAsync(InputMessages.MENU_PROMPT);
        return InputValidator.Menu.validateMenu(input);
      } catch (error) {
        Console.print(`${error.message}\n`);
      }
    }
  }
}
