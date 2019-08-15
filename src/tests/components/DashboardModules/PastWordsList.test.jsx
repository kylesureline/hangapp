import React from 'react';
import { shallow } from 'enzyme';
import { PastWordsList } from '../../../components/DashboardModules/PastWordsList.jsx';
import { player } from '../../fixtures/player';

test('should render PastWordsList with no past games correctly', () => {
  const wrapper = shallow(<PastWordsList pastGames={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PastWordsList with past games correctly', () => {
  const wrapper = shallow(<PastWordsList pastGames={player.pastGames} />);
  expect(wrapper).toMatchSnapshot();
});
