import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);
    expect(setTimeout).toBeCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    expect(setInterval).toBeCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 100);

    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('index.ts');

    expect(joinSpy).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    const content = await readFileAsynchronously('non_existing_file.txt');
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = await readFileAsynchronously('index.ts');
    expect(typeof content).toBe('string');
  });
});
