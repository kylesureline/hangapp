import React from 'react';
import { shallow } from 'enzyme';
import { PastWords } from '../../../components/DashboardModules/PastWords.jsx';

test('should render PastWords correctly', () => {
  const wrapper = shallow(<PastWords />);
  expect(wrapper).toMatchSnapshot();
});
