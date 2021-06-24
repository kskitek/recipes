import { useEffect, useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useGetRecipe, saveRecipe } from "./recipiesDao";
import { Input, TextArea } from "./Editable";
import { LoginContext } from "./Login";

function Recipe({isNew}) {
  const { recipeId } = useParams();
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
// TODO add spinner on load

function Details({recipe, setRecipe}) {
  const [ editMode, setEditMode ] = useState(false);
  const [ edited, setEdited ] = useState(false);
  const { user } = useContext(LoginContext);
  const history = useHistory();

  const toggleEditMode = async () => {
    if (editMode) {
      setEdited(false);
      const [newId, error] = await saveRecipe(recipe);
      if (newId) {
        history.replace(`/recipes/${newId}`);
      }
      console.log(error);
    }
    setEditMode(!editMode);
  };

  const onChange = ({target}) => {
    // TODO why do I need to spread recipes?
    setRecipe({
      ...recipe,
      author: user,
      [target.name]: target.value,
    });
    setEdited(true);
  };

  return (
    <div className="details">
      <div className="titleRow">
        <HomeLink/> | <Input name="name" className="title" value={recipe.name} onChange={onChange}/>
        <button onClick={toggleEditMode} disabled={editMode && !edited}>{editMode ? "Save" : "Edit"}</button>
      </div>
      {editMode && <Input name="url" className="url" value={recipe.url} onChange={onChange}/>}
      {!editMode && <a href={recipe.url}>{recipe.url}</a>}
      <Ingridients ingridients={recipe.ingridients} editMode={editMode} onChange={onChange}/>
      <Description description={recipe.description} editMode={editMode} onChange={onChange}/>
    </div>
  );
}

  // TODO ingridient.name should not be a key
function Ingridients({ingridients, editMode, onChange}) {
  /* const ingridients = !props.ingridients ? [] : props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>) */
  /* const ingridients = props.ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>) */
  const addNewIngridient = () => {
    ingridients.push({name: "", quantity: 0, unit: ""});
    onChange({target: {
      name: "ingridients",
      value: ingridients
    }});
  };

  return (
    <div className="ingridientList">
      <p className="header">Ingridients:</p>
      <ul>{ingridients.map(i => <Ingridient key={i.name} ingridient={i}/>)}</ul>
      {editMode && <button className="ingridient" onClick={() => addNewIngridient()}>New ingridient</button>}
    </div>
  )
}

function Ingridient({ingridient}) {
  const ingridientText= `${ingridient.name} - ${ingridient.quantity} ${ingridient.unit}`;
  return (
    <li className="ingridient" key={ingridient.name}>{ingridientText}</li>
  );
}

function Description({description, editMode, onChange}) {
  return (
    <>
      <p className="header">Description:</p>
      <div className="description">
        {editMode && <TextArea name="description" className="description" value={description} onChange={onChange}/>}
        {!editMode && <ReactMarkdown>{description}</ReactMarkdown>}
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
