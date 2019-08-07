import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../components/Signup.jsx';

test('should render Signup component correctly', () => {
  const wrapper = shallow(<Signup />);
  expect(wrapper).toMatchSnapshot();
});
