import React from 'react';
import { create } from 'react-test-renderer';
import Footer from '../Footer';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Footer testing', () => {
  test('Match Snapshot', () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });

  test('footer has 2 button tags', () => {
    const footer = render(<Footer />);
    expect(footer.find('button')).toHaveLength(2);
  });

  test('Footer has 1 img tag', () => {
    const footer = render(<Footer />);
    expect(footer.find('img')).toHaveLength(1);
  });
});