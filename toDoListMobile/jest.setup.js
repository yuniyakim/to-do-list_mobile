import {remote} from 'webdriverio';

import capabilities from './capabilities.js';
import {beforeEach, afterEach, jest} from '@jest/globals';
jest.retryTimes(3);

let client: WebdriverIO.Browser;
let number = 0;
const config = {
  host: 'localhost',
  port: 4723,
  waitforTimeout: 60000,
  logLevel: 'error',
  capabilities: {
    ...capabilities,
  },
};

beforeAll(() => {
  console.info('[beforeAll] START testing!');
});

beforeEach(async () => {
  number += 1
  console.info(`[beforeEach] Retry ${number}`);
  client = await remote(config);
});

afterEach(async () => {
  await client.deleteSession();
});

afterAll(() => {
  console.info('[afterAll] END testing!');
});

export {client};
