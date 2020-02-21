import React from 'react';
import { Mode } from './Mode';
import { Words } from './Words';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MODE, CHANGE_WORDS_SETTINGS } from '../../../reducers/actions';

export const Settings = () => {
  const { mode, words } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const handleModeChange = e => {
    const { value } = e.target;
    dispatch(CHANGE_MODE(value));
  };

  const handleWordsSettings = obj => {
    dispatch(CHANGE_WORDS_SETTINGS(obj));
  }

  return (
    <main className="page page--play">
      <form>
        <Mode
          options={['words', 'phrases', 'categories']}
          selectedOption={mode}
          onChange={handleModeChange}
        />
        <Words onChange={handleWordsSettings} settings={words} />

        {/* <label>
          words
          <input type="radio" name="mode" />
        </label>
        <label>
          phrases
          <input type="radio" name="mode" />
        </label>
        <label>
          categories
          <input type="radio" name="mode" />
        </label> */}
      </form>
    </main>
  );
};
