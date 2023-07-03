import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const TEST_VALUE = 123;
const TEST_ERROR_MESSAGE = 'My Error';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue(TEST_VALUE);
    expect(value).toBe(TEST_VALUE);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const throwMyError = throwError.bind(null, TEST_ERROR_MESSAGE);
    expect(throwMyError).toThrow(TEST_ERROR_MESSAGE);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
