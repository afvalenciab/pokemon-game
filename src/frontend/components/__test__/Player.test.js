import React from 'react';
import { create } from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProviderMock from '../../__mocks__/ProviderMock';
import Player from '../Player';

configure({ adapter: new Adapter() });

describe('Player testing', () => {
  test('Match snaptshot', () => {
    const player = create(
      <ProviderMock>
        <Player />
      </ProviderMock>
    );
    expect(player.toJSON()).toMatchSnapshot();
  });

  test('Calls and execute preventDefault function onSubmit form', () => {
    const preventDefault = jest.fn();
    const player = mount(
      <ProviderMock>
        <Player />
      </ProviderMock>
    );
    player.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalledTimes(1);
    player.unmount();
  });
});