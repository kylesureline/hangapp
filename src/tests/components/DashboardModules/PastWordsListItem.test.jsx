import React from 'react';
import { shallow } from 'enzyme';
import { PastWordsListItem } from '../../../components/DashboardModules/PastWordsListItem.jsx';
import { player } from '../../fixtures/player';

test('should render PastWordsListItem correctly', () => {
  const wrapper = shallow(<PastWordsListItem {...player.pastGames[2]}/>);
  expect(wrapper).toMatchSnapshot();
});
