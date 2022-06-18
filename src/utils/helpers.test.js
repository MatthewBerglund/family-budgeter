import {
  getUKFormattedEuros,
  getCurrentMonth,
  getUniqueMonthsFromExpenses,
  convertCentsToEuros,
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

  it('should return a string representing a full euro amount in UK English', () => {
    expect(getUKFormattedEuros(0)).toBe('€0.00');
    expect(getUKFormattedEuros(1)).toBe('€0.01');
    expect(getUKFormattedEuros(12)).toBe('€0.12');
    expect(getUKFormattedEuros(123)).toBe('€1.23');
    expect(getUKFormattedEuros(1234)).toBe('€12.34');
    expect(getUKFormattedEuros(12345)).toBe('€123.45');
  });
});

describe('getCurrentMonth', () => {
  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should return the current month in "Month YYYY" format', () => {
    global.Date.now = getDateNowStub('2022-06-01');
    expect(getCurrentMonth()).toBe('June 2022');

    global.Date.now = getDateNowStub('2024-02-29');
    expect(getCurrentMonth()).toBe('February 2024');

    global.Date.now = getDateNowStub('2050-12-31');
    expect(getCurrentMonth()).toBe('December 2050');
  });
});

describe('getUniqueMonthsFromExpenses', () => {
  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should throw an error if no argument is passed', () => {
    function passZeroArgs() {
      getUniqueMonthsFromExpenses();
    }
    expect(passZeroArgs).toThrowError('undefined is not an array');
  });

  it('should throw an error if passed a value that is not an array', () => {
    function passString() {
      getUniqueMonthsFromExpenses('any string');
    }
    function passObject() {
      getUniqueMonthsFromExpenses({});
    }
    expect(passString).toThrowError('any string is not an array');
    expect(passObject).toThrowError('[object Object] is not an array');
  });

  it('should throw an error if passed more than one argument', () => {
    function passMoreThanOneArg() {
      getUniqueMonthsFromExpenses([], []);
    }
    expect(passMoreThanOneArg).toThrowError(
      'Only one argument may be passed to the function.'
    );
  });

  it('should return a new array', () => {
    const inputArray = [];
    const outputArray = getUniqueMonthsFromExpenses(inputArray);
    expect(outputArray).not.toBe(inputArray);
  });

  it('should return an array of strings in "Month YYYY" format', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [
      { title: 'Expense 1', date: '2022-04-01', amount: 100, id: 1 },
      { title: 'Expense 2', date: '2022-06-01', amount: 100, id: 2 },
    ];

    const expected = ['April 2022', 'June 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });

  it('should always return the current month', () => {
    global.Date.now = getDateNowStub('2022-04-01');
    const expenses = [];

    const expected = ['April 2022'];
    const actual = getUniqueMonthsFromExpenses(expenses);

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
    const actual = getUniqueMonthsFromExpenses(expenses);
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
    const actual = getUniqueMonthsFromExpenses(expenses);
    expect(actual).toStrictEqual(expected);
  });

  describe('convertCentsToEuros', () => {
    it('should throw an error if no argument is passed', () => {
      function passZeroArgs() {
        convertCentsToEuros();
      }
      expect(passZeroArgs).toThrowError('undefined is not an integer');
    });

    it('should throw an error if passed a value that is not an integer', () => {
      function passString() {
        convertCentsToEuros('any string');
      }
      function passFloat() {
        convertCentsToEuros(1.1);
      }
      expect(passString).toThrowError('any string is not an integer');
      expect(passFloat).toThrowError('1.1 is not an integer');
    });

    it('should throw an error if passed more than one argument', () => {
      function passMoreThanOneArg() {
        convertCentsToEuros(100, 200);
      }
      expect(passMoreThanOneArg).toThrowError(
        'Only one argument may be passed to the function.'
      );
    });

    it('should convert cents to full euros', () => {
      expect(convertCentsToEuros(0)).toBe('0.00');
      expect(convertCentsToEuros(1)).toBe('0.01');
      expect(convertCentsToEuros(12)).toBe('0.12');
      expect(convertCentsToEuros(100)).toBe('1.00');
      expect(convertCentsToEuros(123)).toBe('1.23');
      expect(convertCentsToEuros(1000)).toBe('10.00');
      expect(convertCentsToEuros(1234)).toBe('12.34');
      expect(convertCentsToEuros(10000)).toBe('100.00');
      expect(convertCentsToEuros(12345)).toBe('123.45');
    });
  });
});
