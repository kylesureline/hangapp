import React from 'react';
import { shallow } from 'enzyme';
import { EndGameModal } from '../../components/EndGameModal.jsx';
import { player } from '../fixtures/player';

let startSetPlayer, wrapper;

const playerWithFinishedGame = {
  ...player,
  guessesRemaining: 5,
  guessedWord: player.answer.word.split('')
};

beforeEach(() => {
  startSetPlayer = jest.fn();
  wrapper = shallow(
    <div id="app">
      <EndGameModal
        guessedWord={playerWithFinishedGame.guessedWord}
        guessesRemaining={playerWithFinishedGame.guessesRemaining}
        answer={playerWithFinishedGame.answer}
        startSetPlayer={startSetPlayer}
      />
    </div>
  );
});

test('should render EndGameModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// need to deeply render?
// test('should startSetPlayer if closed', () => {
//   wrapper.find('#close-modal').simulate('click');
//   expect(startSetPlayer).toHaveBeenCalled();
// });
