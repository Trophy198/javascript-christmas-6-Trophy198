import { InputValidator } from '../src/validators/InputValidator';
import { ValidatorConstants } from '../src/validators/constants/ValidatorConstants';

describe('InputValidator 테스트', () => {
  describe('Day.validateDay 메서드 검증', () => {
    test.each([
      ['5', 5],
      ['31', 31],
      ['1', 1],
    ])('유효한 날짜 입력에 대해 검증한다.', (input, expectedResult) => {
      expect(InputValidator.Day.validateDay(input)).toBe(expectedResult);
    });

    test.each([['0'], ['32'], ['-1'], ['abc'], ['10.5']])(
      '유효하지 않은 날짜 입력에 대해 오류가 발생한다.',
      (input) => {
        expect(() => InputValidator.Day.validateDay(input)).toThrow(
          new Error(ValidatorConstants.INVALID_DATE_ERROR),
        );
      },
    );
  });

  describe('Menu.validateMenu 메서드 검증', () => {
    test('유효한 메뉴 입력에 대해 검증한다.', () => {
      const input = '티본스테이크-1,바비큐립-2';
      const expectedResult = [
        { name: '티본스테이크', quantity: 1 },
        { name: '바비큐립', quantity: 2 },
      ];
      expect(InputValidator.Menu.validateMenu(input)).toEqual(expectedResult);
    });

    test('메뉴 입력에서 양 끝에 공백이 있으면 공백을 제거하고 메뉴를 만든다.', () => {
      const input = '  티본스테이크-1   ,  바비큐립-2  ';
      const expectedResult = [
        { name: '티본스테이크', quantity: 1 },
        { name: '바비큐립', quantity: 2 },
      ];
      expect(InputValidator.Menu.validateMenu(input)).toEqual(expectedResult);
    });

    test('메뉴 이름과 갯수 사이에 공백이 있는 경우 오류가 발생한다.', () => {
      const input = '티본스테이크 - 1';
      expect(() => InputValidator.Menu.validateMenu(input)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });

    test.each([
      ['티본스테이크,바비큐립-2'],
      ['티본스테이크-'],
      ['-1'],
      ['티본스테이크-1.5'],
      ['티본스테이크-abc'],
    ])('유효하지 않은 메뉴 입력에 대해 오류가 발생한다.', (input) => {
      expect(() => InputValidator.Menu.validateMenu(input)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });

    test('여러 개의 메뉴가 쉼표 없이 연속해서 입력된 경우 오류가 발생한다.', () => {
      const input = '티본스테이크-1바비큐립-2';
      expect(() => InputValidator.Menu.validateMenu(input)).toThrow(
        new Error(ValidatorConstants.INVALID_ORDER_ERROR),
      );
    });
  });
});
