const sleep = require('./sleep');

const retryPromise = (func, opts = {}) => {
  const options = {
    retries: 3,
    delayMs: 0,
    ...opts,
  };

  const retry = (tryCount = 1) =>
    new Promise(resolve => resolve(func())).catch(async () => {
      if (tryCount >= options.retries) {
        throw new Error(`failed ${options.retries} times`);
      }
      await sleep(options.delayMs);
      return retry(tryCount + 1);
    });

  return retry();
};

module.exports = retryPromise;
