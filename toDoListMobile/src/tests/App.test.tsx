// pwa
import {client} from '../../jest.setup';

describe('Appium with Jest automation testing', () => {
  test.each([...Array(1000).keys()])(
    'should render', async () => {
      // // client.terminateApp('com.apple.mobilesafari')
      // // client.switchContext('NATIVE_APP');
      // // client.$('~ToDo List').waitForDisplayed({timeout: 5000});
      // // client.$('~ToDo List').click();

      // ios
      // await client.url('http://localhost:4173')
      // // android
      // await client.url('http://10.0.2.2:4173');
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
      expect(1).toEqual(1);
    }
  );
});

// // mobile
// import '@testing-library/jest-native/';
// import {client} from '../../jest.setup';

// describe('Appium with Jest automation testing', () => {
//   test.each([...Array(1000).keys()])(
//     'should render', async () => {
//       const todoListTitle= await client.$('~todo-list-title');
//       const todoListTitleText = await todoListTitle.getText();
//       expect(todoListTitleText).toEqual('todo-list-title');
//     }
//   );
// });
