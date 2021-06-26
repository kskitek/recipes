import { useRecipesFinder } from './recipiesDao.js'
import { Link, useHistory } from "react-router-dom";

function RecipiesList() {
  const [ recipes, error ] = useRecipesFinder("student");
  const history = useHistory();
  const newRecipe = () => history.push("/recipes/new");

  return (
    <>
      <p className="title">Sylwiowa książka przepisowa</p>
      <div className="button" onClick={newRecipe}>New</div>
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
