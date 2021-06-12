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
    <li key={recipe.id}>
      <Link key={recipe.id} to={"/recipes/"+recipe.id} >
        {recipe.name}
      </Link>
    </li>
  );
}

export { RecipiesList };
