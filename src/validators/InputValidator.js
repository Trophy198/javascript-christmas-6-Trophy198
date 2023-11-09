export const InputValidator = {
  Day: {
    validateDay(input) {
      const dayPattern = /^\d+$/;

      if (!dayPattern.test(input)) {
        throw new Error('[ERROR] 입력값은 숫자만 포함해야 합니다.');
      }

      const day = parseInt(input, 10);
      if (day < 1 || day > 31) {
        throw new Error('[ERROR] 날짜는 1 이상 31 이하의 숫자여야 합니다.');
      }

      return day;
    },
  },

  Menu: {
    validateMenu(input) {
      const menuSelections = input.split(',');
      const selectionPattern = /^[가-힣]+-\d+$/;
      menuSelections.forEach((selection) => {
        const trimmedSelection = selection.trim();
        if (!selectionPattern.test(trimmedSelection)) {
          throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
        }
      });

      return menuSelections.map((selection) => selection.trim());
    },
  },
};
