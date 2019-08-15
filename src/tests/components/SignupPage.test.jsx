import React from 'react';
import { shallow } from 'enzyme';
import SignupPage from '../../components/SignupPage.jsx';

test('should render SignupPage correctly', () => {
  const wrapper = shallow(<SignupPage />);
  expect(wrapper).toMatchSnapshot();
});
