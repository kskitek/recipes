import { useParams } from "react-router-dom";
import { useGetRecipe } from "./recipiesDao";

function Recipe(props) {
  let { recipeId } = useParams();
  console.log("!!");

  const [ recipe, error ] = useGetRecipe(recipeId);

  return (
    <div>
      {error && error}
      {recipe && JSON.stringify(recipe)}
    </div>
  )
}

export { Recipe };
