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
  // TODO get by author or public using two separate queries
  useEffect(() => {
    const unsubscribe = getCollection()
      /* .where("author", "==", author) */
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
    url: "",
    public: false,
    ingridients: [],
    ingridientSections: [],
    description: "",
    notes: []
  });
  const [ error, setError ] = useState(undefined);

  useEffect(() => {
    if (recipeId) {
      const unsubscribe = getCollection()
        .doc(recipeId)
        .onSnapshot(qs => {
          if (qs.exists) {
            const recipe = qs.data();
            recipe.id = recipeId;
            setRecipe(recipe);
            setError(undefined);
          } else {
            setRecipe(undefined);
            setError("Recipe not found");
          }
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

async function saveRecipe(recipe) {
  try {
    if (recipe.id) {
      const result = getCollection()
        .doc(recipe.id)
        .update(recipe)
      return [result.id, undefined ];
    } else {
      const result = await getCollection().add(recipe)
      return [result.id, undefined ];
    }
  }
  catch(error) {
    console.error(error);
    return [recipe.id, error];
  }
}

export { useRecipesFinder, useGetRecipe, saveRecipe };
