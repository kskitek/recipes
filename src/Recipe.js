import { useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { useGetRecipe, saveRecipe } from "./recipiesDao";
import { Input, TextArea } from "./Editable";
import { LoginContext } from "./Login";
import { useEditButton } from "./EditButton";
import { Notes } from "./Notes";
import { Ingridients } from "./Ingridients";

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
    if (error) {
      console.error(error);
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

      <div>
      <Input name="url" className="url" editMode={editMode}
        value={recipe.url} onChange={onChange}>
        <a href={recipe.url}>{recipe.url}</a>
      </Input>
      </div>

      <TempAndTime recipe={recipe} editMode={editMode} onChange={onChange}/>
      <Ingridients sections={recipe.ingridientSections} editMode={editMode} onChange={onChange}/>
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

function Description({description, editMode, onChange}) {
  return (
    <>
      <p className="header">Description:</p>
      <hr/>
      <TextArea name="description" className="description" editMode={editMode}
      value={description} onChange={onChange}>
        <ReactMarkdown className="description">{description}</ReactMarkdown>
      </TextArea>
    </>
  );
}

function HomeLink() {
  return (
    <Link to="/" >📖</Link>
  );
}

export { Recipe };
