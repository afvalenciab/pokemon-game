import React from 'react';
import { create } from 'react-test-renderer';
import CarouselItem from '../CarouselItem';
import ProviderMock from '../../__mocks__/ProviderMock';

describe('CarouselItem testing', () => {
  test('Match Snapshot', () => {
    const carouselItem = create(
      <ProviderMock>
        <CarouselItem />
      </ProviderMock>
    );
    expect(carouselItem.toJSON()).toMatchSnapshot();
  });
});