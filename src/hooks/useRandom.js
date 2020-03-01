import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_WORDS_WITH_DEF, UPDATE_RECIPES } from '../reducers/actions';
import { formatWordObj } from '../utils';

export const useRandom = () => {
  const { dictionary: dictionaryDB, categories: categoriesDB } = useSelector(state => state.db);
  const { dictionary, categories } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  // word banks:
  const { withDef, withoutDef } = dictionaryDB;

  // settings:
  const { skipWithoutDefinition, minLength } = dictionary;

  // for random words
  const getRandomWord = () => {
    const getWordWithDef = () => {
      if(!!withDef.length) {
        let foundWord = withDef.find(({ words }) => words[0].length >= minLength);
        if(!!foundWord) {
          dispatch(UPDATE_WORDS_WITH_DEF(withDef.filter(({ words }) => words[0] !== foundWord.words[0])));
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

  const getRandomCategory = () => {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    let foundItem;

    if(cat === 'recipes') {
      foundItem = categoriesDB.recipes.shift();
      if(!!foundItem) dispatch(UPDATE_RECIPES(categoriesDB.recipes));
    }

    return foundItem || getRandomWord();
  }

  return {
    getRandomWord,
    getRandomCategory
  };
};
