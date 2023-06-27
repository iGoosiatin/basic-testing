import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

const TEST_BALANCE = 100;
const OVER_BALANCE = 101;
const NEW_BALANCE = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    expect(myAccount.getBalance()).toBe(TEST_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const overdraft = myAccount.withdraw.bind(myAccount, OVER_BALANCE);
    expect(overdraft).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const otherAccount = getBankAccount(TEST_BALANCE);
    const overdraft = myAccount.transfer.bind(
      myAccount,
      OVER_BALANCE,
      otherAccount,
    );
    expect(overdraft).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const selfTransfer = myAccount.transfer.bind(myAccount, 50, myAccount);
    expect(selfTransfer).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    myAccount.deposit(1);
    expect(myAccount.getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    myAccount.withdraw(1);
    expect(myAccount.getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const otherAccount = getBankAccount(TEST_BALANCE);
    myAccount.transfer(1, otherAccount);

    expect(myAccount.getBalance()).toBe(99);
    expect(otherAccount.getBalance()).toBe(101);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Simulate successful fetch
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(NEW_BALANCE)
      .mockReturnValueOnce(1);
    const myAccount = getBankAccount(TEST_BALANCE);
    const result = await myAccount.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(NEW_BALANCE);

    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(NEW_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(null);

    const syncBalance = myAccount.synchronizeBalance.bind(myAccount);
    expect(syncBalance).rejects.toThrow(SynchronizationFailedError);
  });
});
