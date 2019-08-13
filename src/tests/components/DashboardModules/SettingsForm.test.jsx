import React from 'react';
import { shallow } from 'enzyme';
import { SettingsForm } from '../../../components/DashboardModules/SettingsForm.jsx';

let setTheme, wrapper;

beforeEach(() => {
  setTheme = jest.fn();
  wrapper = shallow(
    <SettingsForm
      settings={{ theme: 'light' }}
      setTheme={setTheme}
    />
  );
});

test('should render SettingsForm correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle theme change correctly', () => {
  const e = { target: { value: 'dark' } };
  wrapper.find('#dark').prop('onChange')(e);
  expect(setTheme).toHaveBeenCalledWith(e.target.value);
});
