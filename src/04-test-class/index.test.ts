import { BankAccount, getBankAccount } from '.';

const TEST_BALANCE = 100;
const OVER_BALANCE = 101;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    expect(myAccount).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const overdraft = myAccount.withdraw.bind(myAccount, OVER_BALANCE);
    expect(overdraft).toThrow(
      `Insufficient funds: cannot withdraw more than ${TEST_BALANCE}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const otherAccount = getBankAccount(TEST_BALANCE);
    const overdraft = myAccount.transfer.bind(
      myAccount,
      OVER_BALANCE,
      otherAccount,
    );
    expect(overdraft).toThrow(
      `Insufficient funds: cannot withdraw more than ${TEST_BALANCE}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(TEST_BALANCE);
    const selfTransfer = myAccount.transfer.bind(myAccount, 50, myAccount);
    expect(selfTransfer).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    // Write your test here
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
