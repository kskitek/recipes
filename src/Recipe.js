import { useParams } from "react-router-dom";
import { useGetRecipe } from "./recipiesDao";

function Recipe(props) {
  let { recipeId } = useParams();
  console.log("!!");

  const [ recipe, error ] = useGetRecipe(recipeId);

  return (
    <div>
      {error && error}
      {recipe && <Details recipe={recipe}/>}
    </div>
  )
}

function Details(props) {
  const recipe = props.recipe;
  return (
    <>
      <p className="title">{recipe.name}</p>
      <a href={recipe.url}>{recipe.url}</a>
      <Ingridients ingridients={recipe.ingridients}/>
      <p className="description">{recipe.description}</p>
    </>
  );
}

// TODO ingridient.name should not be a key

function Ingridients(props) {
  const ingridients = props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>)
  return (
    <div className="ingridientList">
      <p>Ingridients:</p>
      {ingridients}
    </div>
  )
}

function Ingridient(props) {
  const ingridient = props.ingridient;
  return (
    <li key={ingridient.name}>{ingridient.name} - {ingridient.quantity} {ingridient.unit}</li>
  );
}


export { Recipe };
