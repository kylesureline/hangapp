import React from 'react';
import { shallow } from 'enzyme';
import { Stats } from '../../../components/DashboardModules/Stats.jsx';
import { player } from '../../fixtures/player';

test('should render Stats correctly', () => {
  const wrapper = shallow(<Stats stats={player.stats} />);
  expect(wrapper).toMatchSnapshot();
});
