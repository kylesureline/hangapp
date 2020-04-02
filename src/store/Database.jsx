import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_WORD_WITH_DEF, ADD_CATEGORY } from "../reducers/actions";
import { fetchData, isOnline, formatWordObj, saveToLS } from "../utils";
import { MAX_TO_CACHE } from "../db/globals";
import { ServiceWorker } from "./ServiceWorker";

export const Database = ({ children }) => {
  const settings = useSelector(state => state.settings);
  const { dictionary: dictionaryDB, categories: categoriesDB } = useSelector(
    state => state.db
  );
  const { withDef, withoutDef } = dictionaryDB;
  const { recipes, dogs, cats } = categoriesDB;

  const dispatch = useDispatch();

  /***********************************************

    M-W.com

  ***********************************************/
  useEffect(() => {
    let length = Math.floor(Math.random() * 1000) + 200;
    let isUnmounted = false;
    let interval = setInterval(() => {
      // don't try to fetch if offline
      if (isOnline() && withDef.length < MAX_TO_CACHE) {
        const word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
        fetchData(
          `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`
        ).then(data => {
          if (!isUnmounted) {
            if (!data.every(e => typeof e === "string")) {
              // some words have multiple meanings
              // choose one at random
              const { fl: wordType, shortdef: defs } = data[
                Math.floor(Math.random() * data.length)
              ];
              const def = defs[Math.floor(Math.random() * defs.length)];

              // console.log(word, wordType, def);
              if (withDef.length < MAX_TO_CACHE) {
                // addToCache({word: [word], wordType, def});
                dispatch(ADD_WORD_WITH_DEF(formatWordObj(word, wordType, def)));
              }
            }
          }
        });
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    };
  }, [withDef, withoutDef, dispatch]);

  /***********************************************

    themealdb.com

  ***********************************************/
  useEffect(() => {
    let length = Math.floor(Math.random() * 1000) + 200;
    let isUnmounted = false;
    let interval = setInterval(() => {
      // don't try to fetch if offline
      if (isOnline() && recipes.length < MAX_TO_CACHE) {
        fetchData(`https://www.themealdb.com/api/json/v1/1/random.php`).then(
          data => {
            if (!isUnmounted) {
              const {
                strMeal,
                strCategory,
                strArea,
                strInstructions,
                strMealThumb,
                strSource
              } = data.meals[0];
              // const keys = Object.keys(data.meals[0]);

              const ingredients = [...Array(20)]
                .map((_, i) => {
                  if (!!data.meals[0][`strMeasure${i}`]) {
                    return [
                      data.meals[0][`strMeasure${i}`],
                      data.meals[0][`strIngredient${i}`]
                    ];
                  } else {
                    return null;
                  }
                })
                .filter(ingredient => !!ingredient);

              const game = {
                words: strMeal.toLowerCase().split(" "),
                tags: [strCategory, strArea],
                instructions: strInstructions,
                picture: strMealThumb,
                url: strSource,
                ingredients,
                category: "recipe"
              };

              // skip recipes with non letters or duplicates
              if (
                recipes.length < MAX_TO_CACHE &&
                /^[a-z]+$/.test(game.words.join(" ")) &&
                (!recipes.length ||
                  !!recipes.find(
                    recipe => recipe.words.join(" ") !== game.words.join(" ")
                  ))
              ) {
                dispatch(ADD_CATEGORY("recipes", game));
              }
            }
          }
        );
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    };
  }, [recipes, dispatch]);

  /***********************************************

    thedogapi.com

  ***********************************************/
  useEffect(() => {
    let length = Math.floor(Math.random() * 1000) + 200;
    let isUnmounted = false;
    let interval = setInterval(() => {
      // don't try to fetch if offline
      if (isOnline() && dogs.length < MAX_TO_CACHE) {
        fetchData(`https://api.thedogapi.com/v1/breeds`).then(data => {
          if (!isUnmounted) {
            // format data
            let formatted = data.map(
              ({ name, bred_for, breed_group, temperament }) => ({
                words: name.toLowerCase().split(" "),
                category: "dog",
                bredFor: bred_for || breed_group || temperament || ""
              })
            );

            // console.log(formatted[0]);

            const needed = MAX_TO_CACHE - dogs.length;

            for (let i = 0; i < needed; i++) {
              let found =
                formatted[Math.floor(Math.random() * formatted.length)];
              formatted = formatted.filter(
                dog => dog.words.join(" ") !== found.words.join(" ")
              );
              dispatch(ADD_CATEGORY("dogs", found));
            }
          }
        });
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    };
  }, [dogs, dispatch]);

  /***********************************************

    thecatapi.com

  ***********************************************/
  useEffect(() => {
    let length = Math.floor(Math.random() * 1000) + 200;
    let isUnmounted = false;
    let headers = new Headers();
    headers.append("x-api-key", "55577270-6cfe-43a3-b38c-b095bc8c7f24");

    let interval = setInterval(() => {
      // don't try to fetch if offline
      if (isOnline() && cats.length < MAX_TO_CACHE) {
        fetchData("https://api.thecatapi.com/v1/breeds", headers).then(data => {
          if (!isUnmounted) {
            let formatted = data.map(({ name, temperament, description }) => ({
              words: name.toLowerCase().split(" "),
              temperament,
              description,
              category: "cat"
            }));

            const needed = MAX_TO_CACHE - cats.length;

            for (let i = 0; i < needed; i++) {
              let found =
                formatted[Math.floor(Math.random() * formatted.length)];
              formatted = formatted.filter(
                cat => cat.words.join(" ") !== found.words.join(" ")
              );
              dispatch(ADD_CATEGORY("cats", found));
            }
          }
        });
      }
    }, length);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    };
  }, [cats, dispatch]);

  // sync to localStorage
  useEffect(() => {
    saveToLS("db-dictionary-withDef", withDef);
  }, [withDef]);
  useEffect(() => {
    saveToLS("db-categories-recipes", recipes);
  }, [recipes]);
  useEffect(() => {
    saveToLS("db-categories-dogs", dogs);
  }, [dogs]);
  useEffect(() => {
    saveToLS("settings", settings);
  }, [settings]);

  return <ServiceWorker>{children}</ServiceWorker>;
};
