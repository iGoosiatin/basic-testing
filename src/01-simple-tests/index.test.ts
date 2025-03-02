import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(result).toBe(4);
  });

  test('should substract two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 2, action: Action.Subtract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 3, action: Action.Multiply });
    expect(result).toBe(9);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 4, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 5,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(25);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 8, b: '4', action: 'Magic' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 8, b: '4', action: Action.Divide });
    expect(result).toBeNull();
  });
});
