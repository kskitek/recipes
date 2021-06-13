import firebase from 'firebase/app';
import 'firebase/firestore';
import { useState, useEffect } from "react";
import getConfig from './config';

var collection = undefined;
function getCollection() {
  if (collection === undefined) {
    // App init should be probably somewhere in the App.js or something...
    //  there can be only one initialized firebase app (unless the app in named)
    if (firebase.apps.length === 0) {
      firebase.initializeApp(getConfig().firebase);
      /* firebase.analytics(); */
    }

    var db = firebase.firestore();
    if (getConfig().firebase.useEmulator) {
      db.useEmulator("localhost", 8080);
    }
    collection = db.collection("recipes");
  }

  return collection;
}

function useRecipesFinder(author) {
  const [ recipes, setRecipes ] = useState(undefined);
  const [ error, setError ] = useState(undefined);

  // TODO pagination
  useEffect(() => {
    const unsubscribe = getCollection()
      .where("author", "==", author)
      /* .limit(10) */
      .onSnapshot(qs => {
        let recipes = [];
        qs.docs.forEach(doc => {
          const data = doc.data();
          recipes.push({name: data.name, id: doc.id});
        });

        setRecipes(recipes);
        setError(undefined);
      }, error => {
        console.error(error);
        setError("Unable to read recipes");
      });
   return () => {
      unsubscribe();
    }
  }, [ author ]);


  return [ recipes, error ];
}

function useGetRecipe(recipeId) {
  const [ recipe, setRecipe ] = useState({
    name: "",
    ingridients: []
  });
  const [ error, setError ] = useState(undefined);

  useEffect(() => {
    if (recipeId) {
      const unsubscribe = getCollection()
        .doc(recipeId)
        .onSnapshot(qs => {
          const recipe = qs.data();
          recipe.id = recipeId;
          setRecipe(recipe);
          setError(undefined);
        }, error => {
          console.error(error);
          setError("Unable to read games");
        });
      return () => {
        unsubscribe();
      }
    }
  }, [ recipeId ]);


  return [ recipe, setRecipe, error ];
}

function saveRecipe(recipe) {
  // TODO if id is empty use `set` instead of `update`
  console.log(recipe.id)
  getCollection()
    .doc(recipe.id)
    .update(recipe)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export { useRecipesFinder, useGetRecipe, saveRecipe };
