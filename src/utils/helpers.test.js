import {
  getUKFormattedEuros,
  getCurrentMonth,
  getUniqueMonths,
} from './helpers';

// Values and function for stubbing and resetting Date.now()
const realDateNow = Date.now.bind(global.Date);

function getDateNowStub(dateString) {
  const today = new Date(dateString);
  const dateNowStub = jest.fn(() => today.valueOf());
  return dateNowStub;
}

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

describe('getCurrentMonth', () => {
  afterEach(() => {
    global.Date.now = realDateNow;
  });

  test('if the current date is 2022-06-01, it should return "June 2022"', () => {
    const date = '2022-06-01';
    global.Date.now = getDateNowStub(date);

    const expected = 'June 2022';
    const actual = getCurrentMonth();

    expect(actual).toBe(expected);
  });

  test('if the current date is 2024-02-29, it should return "February 2024"', () => {
    const date = '2024-02-29';
    global.Date.now = getDateNowStub(date);

    const expected = 'February 2024';
    const actual = getCurrentMonth();

    expect(actual).toBe(expected);
  });

  test('if the current date is 2050-12-31, it should return "December 2050"', () => {
    const date = '2050-12-31';
    global.Date.now = getDateNowStub(date);

    const expected = 'December 2050';
    const actual = getCurrentMonth();

    expect(actual).toBe(expected);
  });
});

describe('getUniqueMonths', () => {
  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should throw an error if no argument is passed', () => {
    function passZeroArgs() {
      getUniqueMonths();
    }
    expect(passZeroArgs).toThrowError('undefined is not an array');
  });

  it('should throw an error if passed a value that is not an array', () => {
    function passString() {
      getUniqueMonths('any string');
    }
    function passObject() {
      getUniqueMonths({});
    }
    expect(passString).toThrowError('any string is not an array');
    expect(passObject).toThrowError('[object Object] is not an array');
  });

  it('should throw an error if passed more than one argument', () => {
    function passMoreThanOneArg() {
      getUniqueMonths([], []);
    }
    expect(passMoreThanOneArg).toThrowError(
      'Only one argument may be passed to the function.'
    );
  });

  it('should return a new array', () => {
    const inputArray = [];
    const outputArray = getUniqueMonths(inputArray);
    expect(outputArray).not.toBe(inputArray);
  });

  it('should return an array of strings in "Month YYYY" format', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [
      { title: 'Expense 1', date: '2022-04-01', amount: 100, id: 1 },
      { title: 'Expense 2', date: '2022-06-01', amount: 100, id: 2 },
    ];

    const expected = ['April 2022', 'June 2022'];
    const actual = getUniqueMonths(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should always return the current month', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [];

    const expected = ['April 2022'];
    const actual = getUniqueMonths(expenses);

    expect(actual).toStrictEqual(expected);
  });

  it('should not return duplicate months', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [
      { title: 'April 2022 expense 1', date: '2022-04-01', amount: 100, id: 1 },
      { title: 'April 2022 expense 2', date: '2022-04-02', amount: 100, id: 2 },
      { title: 'April 2021 expense', date: '2021-04-02', amount: 100, id: 3 },
    ];

    const expected = ['April 2021', 'April 2022'];
    const actual = getUniqueMonths(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should return months sorted from least to most recent', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [
      { title: 'Apr 2022 expense', date: '2022-04-01', amount: 100, id: 1 },
      { title: 'Jan 2022 expense', date: '2022-01-01', amount: 100, id: 2 },
      { title: 'Jan 2021 expense', date: '2021-01-01', amount: 100, id: 3 },
      { title: 'Dec 2021 expense', date: '2021-12-01', amount: 100, id: 4 },
    ];

    const expected = [
      'January 2021',
      'December 2021',
      'January 2022',
      'April 2022',
    ];
    const actual = getUniqueMonths(expenses);
    expect(actual).toStrictEqual(expected);
  });
});
