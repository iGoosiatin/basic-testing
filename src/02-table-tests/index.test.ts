import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Substract, expected: 1 },
  { a: 2, b: 2, action: Action.Substract, expected: 0 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 9, b: 9, action: Action.Divide, expected: 1 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: '3', action: Action.Substract, expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: '1', b: 2, action: '&', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(`Test table, case: %s`, ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
