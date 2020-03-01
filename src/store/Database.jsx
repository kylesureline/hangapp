import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_WORD_WITH_DEF, ADD_RECIPE } from '../reducers/actions';
import { fetchData, isOnline, formatWordObj, saveToLS } from '../utils';
import { MAX_TO_CACHE } from '../db/globals';

export const Database = ({ children }) => {
  const settings = useSelector(state => state.settings);
  const { dictionary: dictionaryDB, categories: categoriesDB } = useSelector(state => state.db);
  const { withDef, withoutDef } = dictionaryDB;
  const { recipes } = categoriesDB;

  const dispatch = useDispatch();

  // fetches definitions and stores them in localStorage
  useEffect(() => {
    let length = (Math.floor(Math.random() * 1000) + 1000);
    let isUnmounted = false;
    let interval = setInterval(() => {
      // don't try to fetch if offline
      if(isOnline() && withDef.length < MAX_TO_CACHE) {
        const word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
        fetchData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`)
          .then(data => {
            if(!isUnmounted) {
              if(!data.every(e => typeof e === 'string')) {
                // some words have multiple meanings
                // choose one at random
                const { fl: wordType, shortdef: defs } = data[Math.floor(Math.random() * data.length)];
                const def = defs[Math.floor(Math.random() * defs.length)];

                // console.log(word, wordType, def);
                if(withDef.length < MAX_TO_CACHE) {
                  // addToCache({word: [word], wordType, def});
                  dispatch(ADD_WORD_WITH_DEF(formatWordObj(word, wordType, def)));
                }
              }
            }
          })
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    }
  }, [withDef, withoutDef, dispatch]);

  useEffect(() => {
    let length = (Math.floor(Math.random() * 1000) + 1000);
    let isUnmounted = false;
    let interval = setInterval(() => {
      // don't try to fetch if offline
      if(isOnline() && recipes.length < MAX_TO_CACHE) {
        fetchData(`https://www.themealdb.com/api/json/v1/1/random.php`)
          .then(data => {
            if(!isUnmounted) {
              const {
                strMeal,
                strCategory,
                strArea,
                strInstructions,
                strMealThumb,
                strSource
              } = data.meals[0];
              // const keys = Object.keys(data.meals[0]);

              const ingredients = [...Array(20)].map((_, i) => {
                if(!!data.meals[0][`strMeasure${i}`]) {
                  return [data.meals[0][`strMeasure${i}`], data.meals[0][`strIngredient${i}`]];
                } else {
                  return null;
                }
              }).filter(ingredient => !!ingredient);

              const game = {
                words: strMeal.toLowerCase().split(' '),
                tags: [strCategory, strArea],
                instructions: strInstructions,
                picture: strMealThumb,
                url: strSource,
                ingredients,
                category: 'recipe',
              };

              if(recipes.length < MAX_TO_CACHE) {
                dispatch(ADD_RECIPE(game));
              }
            }
          })
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    }
  }, [recipes, dispatch]);

  // sync to localStorage
  useEffect(() => {
    saveToLS('db-dictionary-withDef', withDef);
  }, [withDef]);
  useEffect(() => {
    saveToLS('db-categories-recipes', recipes);
  }, [recipes]);
  useEffect(() => {
    saveToLS('settings', settings);
  }, [settings])

  return children;
}
