const retry = require('../lib/retry');

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

let counter = 0;
const mockFn = jest.fn(() => {
  // A function that succeeds in the third call
  counter += 1;
  if (counter < 3) {
    throw new Error('this function will succeed a third time');
  }
  return true;
});
const delayedMockFn = async () => {
  sleep(0);
  mockFn();
};

beforeEach(() => {
  counter = 0;
  mockFn.mockClear();
});

it('executes given function and retry if failed', async () => {
  await retry(mockFn, {
    retries: 3,
  });
  expect(mockFn).toHaveBeenCalledTimes(3);
});

it('thorws an error when try count exceeds tryLimit', async () => {
  await expect(
    retry(mockFn, {
      retries: 2,
    })
  ).rejects.toThrowError('failed 2 times');
  expect(mockFn).toHaveBeenCalledTimes(2);
});

it('executes given async function and retry if failed', async () => {
  await retry(delayedMockFn, {
    retries: 3,
  });
  expect(mockFn).toHaveBeenCalledTimes(3);
});
