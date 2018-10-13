# retry.js

A library for retrying code.

## install

not published to npm yet.

## example

```js
someMethod() {
  // retry "dynamic import" of webpack for unstable network.
  const Hoge = await retry(() => import('hoge-js')), {
    retries: 5,    // call `() => import('hoge-js')` 5 times (including first calling)
    delayMs: 3000, // retry interval (milliseconds)
  });
}
```    
