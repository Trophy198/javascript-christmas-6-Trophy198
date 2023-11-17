import { ValidatorConstants } from './constants/ValidatorConstants';

export const InputValidator = {
  Day: {
    validateDay(input) {
      const dayPattern = /^\d+$/;
      if (!dayPattern.test(input)) {
        throw new Error(ValidatorConstants.INVALID_DATE_ERROR);
      }
      const day = parseInt(input, 10);
      if (day < 1 || day > 31) {
        throw new Error(ValidatorConstants.INVALID_DATE_ERROR);
      }

      return day;
    },
  },

  Menu: {
    validateMenu(input) {
      const menuSelections = input.split(',');
      const selectionPattern = /^[가-힣]+-\d+$/;
      const validSelections = menuSelections.map((selection) => {
        const trimmedSelection = selection.trim();
        if (!selectionPattern.test(trimmedSelection)) {
          throw new Error(ValidatorConstants.INVALID_ORDER_ERROR);
        }
        const [name, quantity] = trimmedSelection.split('-');

        return { name, quantity: parseInt(quantity, 10) };
      });

      return validSelections;
    },
  },
};
