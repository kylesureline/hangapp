import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header.jsx';

let toggleSidebar, wrapper;

beforeEach(() => {
  toggleSidebar = jest.fn();
  wrapper = shallow(
    <Header
      toggleSidebar={toggleSidebar}
    />
  );
});

test('should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call open sidebar', () => {
  wrapper.find('.trigger-container').prop('onClick')();
  expect(toggleSidebar).toHaveBeenCalled();
});
