import React from 'react';
import { shallow } from 'enzyme';
import { SettingsForm } from '../../../components/DashboardModules/SettingsForm.jsx';

let startSetTheme, wrapper;

beforeEach(() => {
  startSetTheme = jest.fn();
  wrapper = shallow(
    <SettingsForm
      settings={{ theme: 'light' }}
      startSetTheme={startSetTheme}
    />
  );
});

test('should render SettingsForm correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle theme change correctly', () => {
  const e = { target: { value: 'dark' } };
  wrapper.find('#dark').prop('onChange')(e);
  expect(startSetTheme).toHaveBeenCalledWith(e.target.value);
});