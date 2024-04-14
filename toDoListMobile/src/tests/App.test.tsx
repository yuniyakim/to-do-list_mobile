import '@testing-library/jest-native/';
import {client} from '../../jest.setup';

describe('Appium with Jest automation testing', () => {
  test.each([...Array(100).keys()])(
    'should render', async () => {
      const todoListTitle= await client.$('~todo-list-title');
      const todoListTitleText = await todoListTitle.getText();
      expect(todoListTitleText).toEqual('ToDo List');
    }
  );
});
