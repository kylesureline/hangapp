import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../components/Login.jsx';

const createMockStore = configureMockStore([thunk]);

test('should render Login component correctly', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
});
