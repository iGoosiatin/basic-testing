import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 9, b: 9, action: Action.Divide, expected: 1 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: 2, action: '&', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(`Test table, case: %s`, ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
