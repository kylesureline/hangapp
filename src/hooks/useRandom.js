import { useSelector } from "react-redux";
import { formatWordObj } from "../utils";

export const useRandom = () => {
  const { dictionary: dictionaryDB, categories: categoriesDB } = useSelector(
    state => state.db
  );
  const { dictionary, categories } = useSelector(state => state.settings);
  // word banks:
  const { withDef, withoutDef } = dictionaryDB;

  // settings:
  const { skipWithoutDefinition, minLength } = dictionary;

  // for random words
  const getRandomWord = () => {
    const getWordWithDef = () => {
      if (!!withDef.length) {
        let foundWord = withDef[Math.floor(Math.random() * withDef.length)];
        let count = 1;
        while (foundWord.words[0].length < minLength && count < 200) {
          // prevent infinite loop
          foundWord = withDef[Math.floor(Math.random() * withDef.length)];
          count++;
        }
        if (!!foundWord && foundWord.words[0].length >= minLength) {
          return foundWord;
        }
      }
      return getWordWithoutDef();
    };

    const getWordWithoutDef = () => {
      let word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
      let count = 1;
      while (word.length < minLength && count < 200) {
        // prevent infinite loop
        word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
        count++;
      }
      return formatWordObj(word);
    };

    let word;
    if (skipWithoutDefinition) {
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

    if (cat === "recipes" && !!categoriesDB.recipes.length) {
      foundItem =
        categoriesDB.recipes[
          Math.floor(Math.random() * categoriesDB.recipes.length)
        ];
    } else if (cat === "dogs" && !!categoriesDB.dogs.length) {
      foundItem =
        categoriesDB.dogs[Math.floor(Math.random() * categoriesDB.dogs.length)];
    } else if (cat === "cats" && !!categoriesDB.cats.length) {
      foundItem =
        categoriesDB.cats[Math.floor(Math.random() * categoriesDB.cats.length)];
    }

    return foundItem || getRandomWord();
  };

  return {
    getRandomWord,
    getRandomCategory
  };
};
