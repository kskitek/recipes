import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useGetRecipe, saveRecipe } from "./recipiesDao";
import { Input, TextArea } from "./Editable";

function Recipe({isNew}) {
  let { recipeId } = useParams();
  const [ recipe, setRecipe, error ] = useGetRecipe(recipeId);
  useEffect(() => {
     document.title = recipe.name;
  }, [recipe]);

  return (
    <div>
      {error && error}
      {recipe && <Details recipe={recipe} setRecipe={setRecipe}/>}
    </div>
  )
}

function Details({recipe, setRecipe}) {
  const [ editMode, setEditMode ] = useState(false);
  const [ edited, setEdited ] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const onChange = ({target}) => {
    // TODO why do I need to spread recipes?
    setRecipe({
      ...recipe,
      [target.name]: target.value,
    });
    setEdited(true);
  }

  return (
    <div className="details">
      <div className="titleRow">
        <HomeLink/> | <Input name="name" className="title" value={recipe.name} onChange={onChange}/>
        {edited && <button onClick={() => saveRecipe(recipe)}>Save</button>}
        <button onClick={toggleEditMode}>Edit</button>
      </div>
      {editMode && <Input name="url" className="url" value={recipe.url} onChange={onChange}/>}
      {!editMode && <a href={recipe.url}>{recipe.url}</a>}
      <Ingridients ingridients={recipe.ingridients} editMode={editMode}/>
      {editMode && <TextArea name="description" className="description" value={recipe.description} onChange={onChange}/>}
      {!editMode && <Description description={recipe.description}/>}
    </div>
  );
}

  // TODO ingridient.name should not be a key
function Ingridients({ingridients, editMode}) {
  /* const ingridients = !props.ingridients ? [] : props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>) */
  /* const ingridients = props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>) */

  return (
    <div className="ingridientList">
      <p className="header">Ingridients:</p>
      {ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>)}
      {editMode && <button className="ingridient">New ingridient</button>}
    </div>
  )
}

function Ingridient({ingridient}) {
  const ingridientText= `${ingridient.name} - ${ingridient.quantity} ${ingridient.unit}`;
  return (
    <li className="ingridient" key={ingridient.name}>{ingridientText}</li>
  );
}

function Description({description}) {
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
