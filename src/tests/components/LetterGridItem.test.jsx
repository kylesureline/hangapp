import React from 'react';
import { shallow } from 'enzyme';
import { LetterGridItem } from '../../components/LetterGridItem.jsx';

test('should render LetterGridItem not disabled correctly', () => {
  const wrapper = shallow(<LetterGridItem letter="a" guessedLetters={['z']} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render LetterGridItem disabled correctly', () => {
  const wrapper = shallow(<LetterGridItem letter="z" guessedLetters={['z']} />);
  expect(wrapper).toMatchSnapshot();
});

test('should handleGuess correctly', () => {
  const handleGuess = jest.fn();
  const wrapper = shallow(<LetterGridItem handleGuess={handleGuess} letter="a" guessedLetters={['z']} />);
  wrapper.find('button').simulate('click');
  expect(handleGuess).toHaveBeenCalled();
});
