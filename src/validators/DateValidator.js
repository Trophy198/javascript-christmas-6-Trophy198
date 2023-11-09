export default class DateValidator {
  static validateDay(input) {
    const dayPattern = /^\d+$/;

    if (!dayPattern.test(input)) {
      throw new Error('[ERROR] 입력값은 숫자만 포함해야 합니다.');
    }

    const day = parseInt(input, 10);
    if (day < 1 || day > 31) {
      throw new Error('[ERROR] 날짜는 1 이상 31 이하의 숫자여야 합니다.');
    }

    return day;
  }
}
