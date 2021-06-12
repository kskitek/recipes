import { useRecipesFinder } from './recipiesDao.js'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from './Login';

function RecipiesList() {
  const [ recipes, error ] = useRecipesFinder("student");
  console.log(useContext(LoginContext));

  return (
    <>
      <p className="title">Sylwiowa książka przepisowa</p>
      <div className="recipesList">
      {error && error}
      {recipes && recipes.map(ListElement)}
      </div>
    </>
  );
}

function ListElement(recipe) {
  return (
    <Link key={recipe.id} to={"/recipes/"+recipe.id} >
      <li key={recipe.id}>{recipe.name}</li>
    </Link>
  );
}

export { RecipiesList };
