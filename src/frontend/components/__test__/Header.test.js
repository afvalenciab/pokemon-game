import React from 'react';
import { create } from 'react-test-renderer';
import { render,shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../Header';

configure({ adapter: new Adapter() });

describe('Header Testing', () => {
  test('Match Snapshot', () => {
    const header = create(<Header />);
    expect(header.toJSON()).toMatchSnapshot();
  });

  test('Header has .home--title class', () => {
    const header = shallow(<Header />);
    const headerElem = header.find('header');
    expect(headerElem.hasClass('home--title')).toBe(true);
  });

  test('header has 1 img tag', () => {
    const header = render(<Header />);
    expect(header.find('img')).toHaveLength(1);
  });
});