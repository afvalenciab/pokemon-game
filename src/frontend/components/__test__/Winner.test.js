import React from 'react';
import { create } from 'react-test-renderer';
import Winner from '../Winner';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Winner testing', () => {
  test('Match Snapshot', () => {
    const winner = create(<Winner />);
    expect(winner.toJSON()).toMatchSnapshot();
  });

  test('section has .winner__container class', () => {
    const winner = shallow(<Winner />);
    const winnerElm = winner.find('section');
    expect(winnerElm.hasClass('winner__container')).toBe(true);
  });
});