import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_WORDS_WITH_DEF } from '../reducers/actions';
import { formatWordObj } from '../utils';

export const useRandom = () => {
  const { words } = useSelector(state => state.db);
  const { words: wordsSettings } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  // word banks:
  const { withDef, withoutDef } = words;

  // settings:
  const { skipWithoutDefinition, minLength } = wordsSettings;

  // for random words
  const getRandomWord = () => {
    const getWordWithDef = () => {
      if(!!withDef.length) {
        let foundWord = withDef.find(({ word }) => word[0].length >= minLength);
        if(!!foundWord) {
          dispatch(UPDATE_WORDS_WITH_DEF(withDef.filter(({ word }) => word[0] !== foundWord.word[0])));
          return foundWord;
        }
      }
      return getWordWithoutDef();
    };

    const getWordWithoutDef = () => {
      let word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
      while(word.length < minLength) {
        word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
      }
      return formatWordObj(word);
    };


    let word;
    if(skipWithoutDefinition) {
      // try to get a cached word
      word = getWordWithDef() || getWordWithoutDef();
    } else {
      word = getWordWithoutDef();
    }

    return word;
  };

  // TODO: implement random category item
  // const getRandomCategory = () => {
  //
  // }

  return {
    getRandomWord,
    // getRandomCategory
  };
};
