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
  };

  return (
    <main className="page page--settings">
      <form>
        <Mode
          options={['dictionary', 'categories']}
          selectedOption={mode}
          onChange={handleModeChange}
        />
        {mode === 'dictionary' && (
          <Words
            onChange={handleWordsSettings}
            settings={words}
          />
        )}
      </form>
    </main>
  );
};
