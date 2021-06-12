import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipe } from "./recipiesDao";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";

function Recipe(props) {
  let { recipeId } = useParams();

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

  useEffect(() => {
     document.title = recipe.name;
  }, [recipe]);


  return (
    <div className="details">
      <p className="title"><HomeLink/> | {recipe.name}</p>
      <a href={recipe.url}>{recipe.url}</a>
      <Ingridients ingridients={recipe.ingridients}/>
      <Description description={recipe.description}/>
    </div>
  );
}

  // TODO ingridient.name should not be a key
function Ingridients(props) {
  const ingridients = props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>)
  return (
    <div className="ingridientList">
      <p className="header">Ingridients:</p>
      {ingridients}
    </div>
  )
}

function Ingridient(props) {
  const ingridient = props.ingridient;
  const ingridientText= `${ingridient.name} - ${ingridient.quantity} ${ingridient.unit}`;
  return (
    <li className="ingridient" key={ingridient.name}>{ingridientText}</li>
  );
}

function Description(props) {
  const description = props.description;

  return (
    <>
      <p className="header">Description:</p>
      <div className="description">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </>
  );
}

function HomeLink(props) {
  return (
    <Link to="/" >📖</Link>
  );
}

export { Recipe };
