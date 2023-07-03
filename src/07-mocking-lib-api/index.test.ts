import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const REQUEST_PATH = 'users';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(REQUEST_PATH);

    expect(axiosCreateSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi(REQUEST_PATH);

    expect(axiosGetSpy).toBeCalledWith(REQUEST_PATH);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('users');

    expect(data).toBe('mockedData');
  });
});
