const sleep = require('../lib/sleep');

jest.useFakeTimers();

it('waits given time (millisecond)', () => {
    sleep(1000);
    expect(setTimeout.mock.calls.length).toBe(1);
    expect(setTimeout.mock.calls[0][1]).toBe(1000);

    sleep(3000);
    expect(setTimeout.mock.calls.length).toBe(2);
    expect(setTimeout.mock.calls[1][1]).toBe(3000);
});