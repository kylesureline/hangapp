import React from 'react';
import { shallow } from 'enzyme';
import { Answer } from '../../components/Answer.jsx';

test('should render Answer correctly', () => {
  const wrapper = shallow(
    <Answer
      word={'jazz'}
      type={'noun'}
      player={{
        guessedWord: ['j']
      }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
