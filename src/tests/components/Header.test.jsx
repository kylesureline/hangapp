import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header.jsx';

let openSidebar, wrapper;

beforeEach(() => {
  openSidebar = jest.fn();
  wrapper = shallow(
    <Header
      openSidebar={openSidebar}
    />
  );
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call open sidebar', () => {
  wrapper.find('.trigger-container').prop('onClick')();
  expect(openSidebar).toHaveBeenCalled();
});
