import React from 'react';
import { shallow } from 'enzyme';
import { GamePage } from '../../components/GamePage.jsx';

test('should render GamePage correctly', () => {
  const wrapper = shallow(<GamePage />);
  expect(wrapper).toMatchSnapshot();
});
