import React from 'react';
import { Mode } from './Mode';
import { Dictionary } from './Dictionary';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_MODE, CHANGE_DICTIONARY_SETTINGS } from '../../../reducers/actions';

export const Settings = () => {
  const { mode, dictionary } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const handleModeChange = e => {
    const { value } = e.target;
    dispatch(CHANGE_MODE(value));
  };

  const handleWordsSettings = obj => {
    dispatch(CHANGE_DICTIONARY_SETTINGS(obj));
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
          <Dictionary
            onChange={handleWordsSettings}
            dictionary={dictionary}
          />
        )}
      </form>
    </main>
  );
};
