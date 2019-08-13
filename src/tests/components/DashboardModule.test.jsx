import React from 'react';
import { shallow } from 'enzyme';
import { DashboardModule } from '../../components/DashboardModule.jsx';
import { Stats } from '../../components/DashboardModules/Stats.jsx';

test('should render DashboardModule with the Stats module correctly', () => {
  const wrapper = shallow(
    <DashboardModule
      component={Stats}
      className={'stats'}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
