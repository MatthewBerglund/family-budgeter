import { getUKFormattedEuros } from './helpers';

describe('getUKFormattedEuros', () => {
  it('should throw an error if no argument is passed', () => {
    function passZeroArgs() {
      getUKFormattedEuros();
    }
    expect(passZeroArgs).toThrowError('undefined is not an integer');
  });
  it('should throw an error if passed a value that is not an integer', () => {
    function passString() {
      getUKFormattedEuros('any string');
    }
    function passFloat() {
      getUKFormattedEuros(1.1);
    }
    expect(passString).toThrowError('any string is not an integer');
    expect(passFloat).toThrowError('1.1 is not an integer');
  });
  it('should throw an error if passed more than one argument', () => {
    function passMoreThanOneArg() {
      getUKFormattedEuros(100, 200);
    }
    expect(passMoreThanOneArg).toThrowError(
      'Only one argument may be passed to the function.'
    );
  });
  test('if passed 0, it should return the string "€0.00"', () => {
    const amount = 0;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€0.00');
  });
  test('if passed 1, it should return the string "€0.01"', () => {
    const amount = 1;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€0.01');
  });
  test('if passed 12, it should return the string "€0.12"', () => {
    const amount = 12;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€0.12');
  });
  test('if passed 123, it should return the string "€1.23"', () => {
    const amount = 123;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€1.23');
  });
  test('if passed 1234, it should return the string "€12.34"', () => {
    const amount = 1234;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€12.34');
  });
  test('if passed 12345, it should return the string "€123.45"', () => {
    const amount = 12345;
    const result = getUKFormattedEuros(amount);
    expect(result).toBe('€123.45');
  });
});
