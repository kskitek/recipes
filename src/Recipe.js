import { useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useGetRecipe, saveRecipe } from "./recipiesDao";
import { Input, TextArea } from "./Editable";
import { LoginContext } from "./Login";
import { useEditButton } from "./EditButton";

function Recipe({isNew}) {
  const { recipeId } = useParams();
  const [ recipe, setRecipe, error ] = useGetRecipe(recipeId);

  useEffect(() => {
    if (recipe) {
      document.title = recipe.name;
    } else {
      document.title = "Recipe not found";
    }
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
  const { user } = useContext(LoginContext);
  const history = useHistory();

  const onSave = async () => {
    const [newId, error] = await saveRecipe(recipe);
    if (newId) {
      history.replace(`/recipes/${newId}`);
    }
  };
  const { EditButton, editMode, setEdited } = useEditButton(onSave);

  const onChange = ({target}) => {
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
        <HomeLink/>
          <Input name="name" className="title" editMode={editMode}
           value={recipe.name} onChange={onChange}>
            <div>{recipe.name}</div>
          </Input>
        <EditButton/>
      </div>

      <Input name="url" className="url" editMode={editMode}
        value={recipe.url} onChange={onChange}>
        <a href={recipe.url}>{recipe.url}</a>
      </Input>

      <TempAndTime recipe={recipe} editMode={editMode} onChange={onChange}/>
      <Ingridients ingridients={recipe.ingridients} editMode={editMode} onChange={onChange}/>
      <Description description={recipe.description} editMode={editMode} onChange={onChange}/>
      <Notes notes={recipe.notes} editMode={editMode} onChange={onChange}/>
    </div>
  );
}

function TempAndTime({recipe, editMode, onChange}) {
  return (
    <div className="tempAndTime">
      <div>Temperature:</div>
      <Input name="temperature" editMode={editMode}
        value={recipe.temperature} onChange={onChange}>
          <div>{recipe.temperature}°C</div>
      </Input>
      <div>Time:</div>
      <Input name="time" editMode={editMode}
        value={recipe.time} onChange={onChange}>
          <div>{recipe.time}″</div>
      </Input>
    </div>
  )
}

function Ingridients({ingridients, editMode, onChange}) {
  const addNewIngridient = () => {
    ingridients.push({name: "", quantity: "", unit: ""});
    onChange({target: {
      name: "ingridients",
      value: ingridients
    }});
  };

  const onIngridientChange = (idx) => ({target}) => {
    ingridients[idx][target.name] = target.value;
    onChange({
      target: {
        name: "ingridients",
        value: ingridients
      }
    });
  };

  const onDelete = (idx) => {
    ingridients.splice(idx,1);
    onChange({
      target: {
        name: "ingridients",
        value: ingridients
      }
    });
  };

  return (
    <div className="ingridientList">
      <p className="header">Ingridients:</p>
      <hr/>
      <ul>{ingridients.map((i, idx) =>
        <Ingridient key={idx} ingridient={i} idx={idx}
          editMode={editMode} onChange={onIngridientChange(idx)}
          onDelete={() => onDelete(idx)}/>)}
      </ul>
      {editMode && <ul><div className="button dimmed ingridient" onClick={() => addNewIngridient()}>+</div></ul>}
    </div>
  )
}

function Ingridient({ingridient, idx, editMode, onChange, onDelete}) {
  const ingridientText= `${ingridient.quantity} [${ingridient.unit}] ${ingridient.name}`;

  return (
    <li className="ingridient" key={idx}>
      {!editMode && (
        <>
        <div>{ingridient.quantity}</div>
        <div>[{ingridient.unit}]</div>
        <div>{ingridient.name}</div>
        </>
      )}
      {editMode && (
        <>
        <div className="button dimmed" onClick={onDelete}><FontAwesomeIcon icon={faTrashAlt}/></div>
        <Input name="name" className="" editMode={editMode}
          value={ingridient.name} onChange={onChange}/>
        <Input name="quantity" className="" editMode={editMode}
          value={ingridient.quantity} onChange={onChange}/>
        <Input name="unit" className="" editMode={editMode}
          value={ingridient.unit} onChange={onChange}/>
        </>
      )}
    </li>
  );
}

function Description({description, editMode, onChange}) {
  return (
    <>
      <p className="header">Description:</p>
      <hr/>
      <div className="description">
        <TextArea name="description" className="description" editMode={editMode}
        value={description} onChange={onChange}>
        <ReactMarkdown>{description}</ReactMarkdown>
        </TextArea>
      </div>
    </>
  );
}

function Notes({notes, editMode, onChange}) {
  return (
    <div className="notesList">
      <p className="header">Notes:</p>
      <hr/>
      <ul>{notes.map((n, idx) => <li className="note" key={idx}>{n}</li>)}</ul>
    </div>
  )
}

function HomeLink(props) {
  return (
    <Link to="/" >📖</Link>
  );
}

export { Recipe };
