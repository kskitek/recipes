import { useRecipesFinder } from './recipiesDao.js'
import { Link } from "react-router-dom";

function RecipiesList() {
  const [ recipes, error ] = useRecipesFinder("student");

  return (
    <div className="list">
    {error && error}
    {recipes && recipes.map(ListElement)}
    </div>
  );
}

function ListElement(recipe) {
  console.log(recipe);
  return (
    <Link key={recipe.id} to={"/recipes/"+recipe.id} >
      <li key={recipe.id}>{recipe.name}</li>
    </Link>
  );
}

export { RecipiesList };
